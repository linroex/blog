import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Explicit live, read-only acceptance probe. No valid credentials, login codes,
// GitHub access, or accepted client registrations are used or printed.
const { vars: env, preview_urls } = JSON.parse(readFileSync(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));
assert.equal(preview_urls, false);
const origin = env.PUBLIC_ORIGIN;
const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
const request = (url, init = {}) => fetch(url, { ...init, redirect: 'manual', signal: AbortSignal.timeout(15_000) });
const paths = ['/mcp', '/health', '/authorize', '/callback', '/register', '/token', '/unlisted'];
for (const path of paths) {
  for (const headers of [{ Accept: 'application/json' }, { Accept: 'application/json',
    Authorization: 'Bearer retired-self-issued-token', 'Cf-Access-Authenticated-User-Email': env.ALLOWED_ACCESS_EMAIL,
    'Cf-Access-Jwt-Assertion': 'eyJhbGciOiJub25lIn0.e30.' }]) {
    const r = await request(origin + path, { headers });
    assert.equal(r.status, 401, `${path}: expected platform OAuth rejection`);
    const challenge = r.headers.get('www-authenticate') ?? '';
    const metadataURL = /resource_metadata="([^"]+)"/.exec(challenge)?.[1];
    assert.ok(metadataURL, `${path}: missing platform discovery challenge`);
    assert.equal(new URL(metadataURL).origin, origin);
  }
}
const authorization = await request(origin + '/.well-known/oauth-authorization-server');
assert.equal(authorization.status, 200);
const metadata = await authorization.json();
assert.equal(metadata.issuer, issuer);
assert.ok(metadata.code_challenge_methods_supported.includes('S256'));
assert.ok(metadata.grant_types_supported.includes('refresh_token'));
for (const field of ['authorization_endpoint', 'token_endpoint', 'registration_endpoint']) {
  assert.equal(new URL(metadata[field]).origin, issuer);
}
const resource = await (await request(origin + '/.well-known/oauth-protected-resource/mcp')).json();
assert.equal(resource.resource, origin + '/mcp');
assert.deepEqual(resource.authorization_servers, [issuer]);
for (const uri of ['http://localhost:8787/callback', 'http://127.0.0.1:8787/callback',
  'https://evil.example/callback', 'https://chatgpt.com.evil.example/connector/oauth/callback']) {
  const r = await request(metadata.registration_endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_name: 'Rejected callback verification', redirect_uris: [uri],
      response_types: ['code'], grant_types: ['authorization_code', 'refresh_token'], token_endpoint_auth_method: 'none',
      resource: origin + '/mcp' }) });
  const data = await r.json();
  assert.equal(r.status, 400, `Unapproved callback was accepted: ${uri}`);
  assert.equal(data.error, 'invalid_client_metadata');
  assert.match(data.error_description, /redirect_uri.*not allowed/i);
  assert.ok(!data.client_id);
}
console.log('Live edge checks passed: seven private paths, rejected bearer/spoofed identity, managed discovery, PKCE, refresh support and four denied callback registrations.');
console.log('Still verify the Access app/policy inventory, identity provider, token lifetimes, and real ChatGPT tools/read flow separately.');

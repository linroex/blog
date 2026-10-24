import assert from 'node:assert/strict';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

// Exercise the bundled Worker in the actual workerd runtime. No external account,
// real credentials, GitHub mutations or Cloudflare deployment are involved.
const origin = 'https://mcp.example.com';
const runtime = new Miniflare(convertV4MiniflareOptions({
  modules: true,
  scriptPath: new URL('../dist/index.js', import.meta.url).pathname,
  compatibilityDate: '2026-10-24',
  compatibilityFlags: ['nodejs_compat', 'global_fetch_strictly_public'],
  kvNamespaces: ['OAUTH_KV'],
  bindings: {
    PUBLIC_ORIGIN: origin, ALLOWED_GITHUB_USER_ID: '123', GITHUB_OWNER: 'test', GITHUB_REPO: 'blog',
    GITHUB_BRANCH: 'main', SITE_URL: 'https://blog.example.com', VALIDATION_WORKFLOW: 'mcp-validate.yaml',
    DEPLOY_WORKFLOW: 'hugo.yaml', CONFIRMATION_SECRET: 's'.repeat(64),
  },
}));
try {
  const call = (path, init) => runtime.dispatchFetch(`${origin}${path}`, init);
  assert.equal((await call('/health')).status, 200);
  const metadata = await (await call('/.well-known/oauth-protected-resource/mcp')).json();
  assert.equal(metadata.resource, `${origin}/mcp`);
  const authorization = await (await call('/.well-known/oauth-authorization-server')).json();
  assert.ok(authorization.code_challenge_methods_supported.includes('S256'));
  assert.equal(authorization.client_id_metadata_document_supported, true);
  const denied = await call('/mcp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(denied.status, 401);
  assert.match(denied.headers.get('www-authenticate'), /resource_metadata/);
  console.log('workerd smoke passed: health, discovery, CIMD, PKCE and unauthenticated rejection');
} finally {
  await runtime.dispose();
}

import assert from 'node:assert/strict';
import { Miniflare, convertV4MiniflareOptions, Response as WorkerResponse } from 'miniflare';
import { exportJWK, generateKeyPair, SignJWT } from 'jose';

// Real workerd, generated test keys and a local JWKS responder. This simulates
// ctx.access; production edge authentication still requires live acceptance.
// Miniflare dispatchFetch uses its loopback Host header inside workerd.
const origin = 'https://127.0.0.1';
const issuer = 'https://smoke.cloudflareaccess.com';
const aud = 'a'.repeat(64);
const email = 'linroex@coder.tw';
const key = await generateKeyPair('RS256');
const jwk = { ...await exportJWK(key.publicKey), kid: 'smoke', alg: 'RS256', use: 'sig' };
let keyRequests = 0;
const options = {
  modules: true, scriptPath: new URL('../dist/index.js', import.meta.url).pathname,
  compatibilityDate: '2026-10-24', compatibilityFlags: ['nodejs_compat', 'global_fetch_strictly_public'],
  bindings: {
    PUBLIC_ORIGIN: origin, ACCESS_TEAM_DOMAIN: 'smoke.cloudflareaccess.com', ACCESS_AUD: aud, ALLOWED_ACCESS_EMAIL: email,
    ALLOWED_GITHUB_USER_ID: '123', GITHUB_OWNER: 'test', GITHUB_REPO: 'blog', GITHUB_BRANCH: 'main',
    SITE_URL: 'https://blog.example.com', VALIDATION_WORKFLOW: 'mcp-validate.yaml',
    DEPLOY_WORKFLOW: 'hugo.yaml', CONFIRMATION_SECRET: 's'.repeat(64),
  },
  outboundService: async request => {
    assert.equal(request.url, `${issuer}/cdn-cgi/access/certs`);
    keyRequests++;
    return new WorkerResponse(JSON.stringify({ keys: [jwk] }), { headers: { 'Content-Type': 'application/json' } });
  },
};
const runtime = new Miniflare(convertV4MiniflareOptions(options));
try {
  const token = await new SignJWT({ email, type: 'app' }).setProtectedHeader({ alg: 'RS256', kid: 'smoke' })
    .setIssuer(issuer).setAudience(aud).setSubject('smoke-owner').setIssuedAt().setExpirationTime('15m').sign(key.privateKey);
  const headers = { 'Cf-Access-Jwt-Assertion': token };
  const call = (path, init = {}) => runtime.dispatchFetch(`${origin}${path}`, { ...init, headers: { ...init.headers, Host: new URL(origin).host } });
  for (const path of ['/health', '/mcp', '/register', '/.well-known/oauth-authorization-server']) {
    assert.equal((await call(path, { headers })).status, 403);
  }
  assert.equal(keyRequests, 0);
  await runtime.setOptions(convertV4MiniflareOptions({ ...options, access: { aud, identity: { email } } }));
  assert.equal((await call('/health')).status, 403);
  assert.equal((await call('/health', { headers })).status, 200);
  assert.equal((await call('/token', { headers })).status, 404);
  const list = await call('/mcp', { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2025-11-25' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }) });
  assert.equal(list.status, 200, await list.clone().text());
  const text = await list.text();
  const payload = JSON.parse(text.startsWith('{') ? text : /data: (.+)/.exec(text)[1]);
  assert.equal(payload.result.tools.length, 12);
  assert.ok(payload.result.tools.some(tool => tool.name === 'prepare_image_upload'));
  assert.ok(payload.result.tools.some(tool => tool.name === 'complete_image_upload'));
  const native = payload.result.tools.find(tool => tool.name === 'upload_image');
  assert.deepEqual(native._meta['openai/fileParams'], ['file']);
  assert.deepEqual(native.inputSchema.properties.file.required.sort(), ['download_url', 'file_id']);
  assert.ok(payload.result.tools.some(tool => tool.name === 'publish_post'));
  assert.equal(keyRequests, 1);
  console.log('workerd smoke passed: dual Access checks, private health, retired OAuth routes and twelve tools including native ChatGPT image upload; no GitHub access');
} finally { await runtime.dispose(); }

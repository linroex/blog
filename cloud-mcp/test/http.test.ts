import { afterEach, expect, it, vi } from 'vitest';
import worker from '../src/index';
import { base64url } from '../src/crypto';
import { consentPage } from '../src/auth';
import { env as baseEnv } from './helpers';
import type { Env } from '../src/types';

class MemoryKV {
  values = new Map<string, { value: string; metadata?: unknown }>();
  async get(key: string, options?: string | { type?: string }) {
    const item = this.values.get(key);
    if (!item) return null;
    const type = typeof options === 'string' ? options : options?.type;
    return type === 'json' ? JSON.parse(item.value) : type === 'arrayBuffer' ? new TextEncoder().encode(item.value).buffer : item.value;
  }
  async put(key: string, value: string, options?: { metadata?: unknown }) { this.values.set(key, { value, metadata: options?.metadata }); }
  async delete(key: string) { this.values.delete(key); }
  async getWithMetadata(key: string, options?: string) { return { value: await this.get(key, options), metadata: this.values.get(key)?.metadata ?? null, cacheStatus: null }; }
  async list(options: { prefix?: string } = {}) {
    return { keys: [...this.values].filter(([key]) => key.startsWith(options.prefix ?? '')).map(([name, item]) => ({ name, metadata: item.metadata })), list_complete: true, cacheStatus: null };
  }
}
const origin = baseEnv.PUBLIC_ORIGIN;
afterEach(() => vi.unstubAllGlobals());
function harness() {
  const env = { ...baseEnv, OAUTH_KV: new MemoryKV() as unknown as KVNamespace };
  const pending: Promise<unknown>[] = [];
  const ctx = { waitUntil(p: Promise<unknown>) { pending.push(p); }, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
  const cookies = new Map<string, string>();
  async function call(path: string, init: RequestInit = {}, browser = false, override?: Env) {
    const headers = new Headers(init.headers);
    headers.set('Host', new URL(origin).host);
    if (browser) headers.set('Cookie', [...cookies.values()].join('; '));
    const response = await worker.fetch(new Request(`${origin}${path}`, { ...init, headers }), override ?? env, ctx);
    if (browser) for (const cookie of response.headers.getSetCookie()) {
      const pair = cookie.split(';')[0]; cookies.set(pair.split('=')[0], pair);
    }
    await Promise.all(pending.splice(0));
    return response;
  }
  return { call, env };
}
async function login(userId = 123) {
  const h = harness();
  const registered = await h.call('/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
    client_name: 'ChatGPT test', redirect_uris: ['https://chatgpt.com/connector/oauth/test'],
    grant_types: ['authorization_code', 'refresh_token'], response_types: ['code'], token_endpoint_auth_method: 'none',
  }) });
  expect(registered.status).toBe(201);
  const client = await registered.json() as { client_id: string };
  const verifier = 'v'.repeat(64);
  const challenge = base64url(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
  const query = new URLSearchParams({ response_type: 'code', client_id: client.client_id, redirect_uri: 'https://chatgpt.com/connector/oauth/test',
    code_challenge: challenge, code_challenge_method: 'S256', resource: `${origin}/mcp`, scope: 'blog:manage offline_access', state: 'client-state' });
  const consent = await h.call(`/authorize?${query}`, {}, true);
  expect(consent.status).toBe(200);
  const page = await consent.text();
  const handle = /name="handle" value="([^"]+)"/.exec(page)![1];
  const approval = await h.call('/authorize', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: origin },
    body: new URLSearchParams({ handle, decision: 'approve' }).toString() }, true);
  expect(approval.status).toBe(302);
  const upstream = new URL(approval.headers.get('Location')!);
  expect(upstream.searchParams.has('scope')).toBe(false); // no repository authorization in the login app
  vi.stubGlobal('fetch', vi.fn(async (input: string) => {
    if (input === 'https://github.com/login/oauth/access_token') return Response.json({ access_token: 'upstream-identity-only' });
    if (input === 'https://api.github.com/user') return Response.json({ id: userId });
    throw new Error(`Unexpected network access: ${input}`);
  }));
  const callback = await h.call(`/callback?code=github-code&state=${upstream.searchParams.get('state')}`, {}, true);
  if (userId !== 123) return { ...h, callback, token: '' };
  expect(callback.status).toBe(302);
  const redirect = new URL(callback.headers.get('Location')!);
  expect(redirect.searchParams.get('state')).toBe('client-state');
  const exchange = await h.call('/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code: redirect.searchParams.get('code')!, client_id: client.client_id,
      code_verifier: verifier, redirect_uri: 'https://chatgpt.com/connector/oauth/test', resource: `${origin}/mcp` }).toString() });
  expect(exchange.status).toBe(200);
  const tokens = await exchange.json() as { access_token: string };
  return { ...h, callback, token: tokens.access_token };
}

it('serves OAuth discovery and refuses anonymous MCP access', async () => {
  const { call } = harness();
  const metadata = await call('/.well-known/oauth-protected-resource/mcp');
  expect(metadata.status).toBe(200);
  expect(await metadata.json()).toMatchObject({ resource: `${origin}/mcp` });
  const authorization = await call('/.well-known/oauth-authorization-server');
  expect(await authorization.json()).toMatchObject({ code_challenge_methods_supported: ['S256'] });
  const denied = await call('/mcp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  expect(denied.status).toBe(401);
  expect(denied.headers.get('WWW-Authenticate')).toContain('resource_metadata');
});

it('completes owner OAuth and lists HTTP MCP tools without exposing GitHub credentials', async () => {
  const { call, token } = await login();
  const response = await call('/mcp', { method: 'POST', headers: { Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2025-11-25' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }) });
  expect(response.status, await response.clone().text()).toBe(200);
  const text = await response.text();
  expect(text).toContain('publish_post');
  expect(text).not.toContain('upstream-identity-only');
  expect(text).not.toContain('push_commits');
});

it('rejects a different GitHub user and a changed owner allowlist', async () => {
  const other = await login(999);
  expect(other.callback.status).toBe(403);
  vi.unstubAllGlobals();
  const { call, token, env } = await login();
  const denied = await call('/mcp', { headers: { Authorization: `Bearer ${token}` } }, false, { ...env, ALLOWED_GITHUB_USER_ID: '999' });
  expect(denied.status).toBe(403);
});

it('rejects an OAuth callback without browser binding and cross-origin consent posts', async () => {
  const { call } = harness();
  expect((await call('/callback?state=stolen&code=stolen')).status).toBe(400);
  expect((await call('/authorize', { method: 'POST', headers: { Origin: 'https://evil.example' }, body: 'handle=stolen' })).status).toBe(403);
});

it('escapes untrusted client metadata on the consent page', () => {
  const html = consentPage({ clientName: '<script>alert(1)</script>', redirectHost: 'example.com',
    clientId: 'client', redirectUri: 'https://example.com/callback', redirectIsLoopback: false, scope: ['blog:manage'] }, 'handle');
  expect(html).not.toContain('<script>');
  expect(html).toContain('&#60;script&#62;');
});

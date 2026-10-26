import { afterEach, expect, it, vi } from 'vitest';
import { exportPKCS8 } from 'jose';
import worker from '../src/index';
import { accessHarness } from './access-helpers';
import type { Env } from '../src/types';
import { sign } from '../src/crypto';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
async function harness() {
  const h = await accessHarness();
  const network = vi.fn(async (input: string | URL | Request) => {
    expect(String(input)).toBe(`${h.issuer}/cdn-cgi/access/certs`);
    return h.fetcher(String(input), {});
  });
  vi.stubGlobal('fetch', network);
  const token = await h.sign();
  async function call(path: string, init: RequestInit = {}, ctx = h.ctx, env: Env = h.env) {
    const headers = new Headers(init.headers);
    headers.set('Host', new URL(env.PUBLIC_ORIGIN).host);
    return worker.fetch(new Request(`${env.PUBLIC_ORIGIN}${path}`, { ...init, headers }), env, ctx);
  }
  const authenticated = (path: string, init: RequestInit = {}) => call(path, { ...init,
    headers: { ...Object.fromEntries(new Headers(init.headers)), 'Cf-Access-Jwt-Assertion': token } });
  async function rpc(method: string, params: object = {}) {
    return authenticated('/mcp', { method: 'POST', headers: { 'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2025-11-25' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) });
  }
  return { ...h, network, call, authenticated, rpc, token };
}
function result(body: string) {
  return JSON.parse(body.startsWith('event:') || body.startsWith('data:') ? /data: (.+)/.exec(body)![1] : body).result;
}

it('lists thirteen MCP tools including draft deletion after both Access checks', async () => {
  const h = await harness();
  const response = await h.rpc('tools/list');
  expect(response.status, await response.clone().text()).toBe(200);
  const tools = result(await response.text()).tools.map((tool: { name: string }) => tool.name).sort();
  expect(tools).toEqual(['complete_image_upload', 'create_post', 'delete_draft', 'get_operation_status', 'get_repo_status', 'list_posts', 'prepare_image_upload', 'prepare_publish',
    'publish_post', 'read_config', 'read_post', 'update_post', 'upload_image']);
  const schemaResponse = await h.rpc('tools/list');
  const native = result(await schemaResponse.text()).tools.find((tool: { name: string }) => tool.name === 'upload_image');
  expect(native._meta['openai/fileParams']).toEqual(['file']);
  expect(native.inputSchema.properties.file.required.sort()).toEqual(['download_url', 'file_id']);
  expect(Object.keys(native.inputSchema.properties.file.properties).sort()).toEqual(['download_url', 'file_id', 'file_name', 'mime_type']);
  const deletion = result(await (await h.rpc('tools/list')).text()).tools.find((tool: { name: string }) => tool.name === 'delete_draft');
  expect(deletion.inputSchema.required.sort()).toEqual(['expected_revision', 'slug']);
  expect(deletion.annotations).toMatchObject({ readOnlyHint: false, destructiveHint: true });
  expect(h.network).toHaveBeenCalledTimes(1); // Only JWKS, no GitHub calls.
});

it('logs native file types before SDK rejection, without retaining private file references', async () => {
  const h = await harness();
  const log = vi.spyOn(console, 'log').mockImplementation(() => {});
  await h.rpc('tools/call', { name: 'upload_image', arguments: { slug: 'original', expected_revision: 'a'.repeat(40),
    filename: 'image.png', file: 'chat_upload://private-reference' } });
  const events = log.mock.calls.map(([line]) => JSON.parse(line));
  expect(events).toContainEqual(expect.objectContaining({ event: 'upload_image.input', file_type: 'string' }));
  expect(JSON.stringify(events)).not.toContain('private-reference');
  expect(h.network).toHaveBeenCalledTimes(1); // Auth only; no GitHub or image fetch.
  log.mockClear();
  await h.call('/mcp', { method: 'POST', body: JSON.stringify({ method: 'tools/call', params: {
    name: 'upload_image', arguments: { file: 'private-reference' } } }) });
  expect(log).not.toHaveBeenCalled(); // Never parse/log unauthenticated bodies.
});

it('reads an article through the authenticated MCP handler with repo-scoped App credentials', async () => {
  const h = await harness();
  Object.assign(h.env, { GITHUB_APP_ID: crypto.randomUUID(), GITHUB_INSTALLATION_ID: '123', GITHUB_APP_PRIVATE_KEY: await exportPKCS8(h.key.privateKey) });
  h.network.mockImplementation(async (input: string | URL | Request) => {
    const url = String(input);
    if (url === `${h.issuer}/cdn-cgi/access/certs`) return h.fetcher(url, {});
    if (url.endsWith('/app/installations/123/access_tokens')) return Response.json({ token: 'test-app-token', expires_at: new Date(Date.now() + 3600_000).toISOString() });
    if (url.includes('/git/ref/heads/main')) return Response.json({ object: { sha: 'b'.repeat(40) } });
    if (url.includes('/contents/content/posts/original/index.md')) return Response.json({ type: 'file', size: 40, sha: 'c'.repeat(40),
      encoding: 'base64', content: Buffer.from('---\ntitle: Original\n---\n\nArticle body\n').toString('base64') });
    throw new Error('Unexpected network call');
  });
  const response = await h.rpc('tools/call', { name: 'read_post', arguments: { slug: 'original', source: 'published' } });
  expect(response.status).toBe(200);
  const read = result(await response.text());
  expect(read.isError).not.toBe(true);
  expect(read.structuredContent.content).toBe('Article body\n');
});

it('accepts durable PR operation IDs through the authenticated MCP schema', async () => {
  const h = await harness();
  Object.assign(h.env, { GITHUB_APP_ID: crypto.randomUUID(), GITHUB_INSTALLATION_ID: '123', GITHUB_APP_PRIVATE_KEY: await exportPKCS8(h.key.privateKey) });
  const id = crypto.randomUUID(), head = 'a'.repeat(40), main = 'b'.repeat(40), revision = 'c'.repeat(40), branch = `mcp/reviews/${id}`;
  const envelope = await sign(h.env.CONFIRMATION_SECRET, 'candidate', { operation_id: id, user_id: h.env.ALLOWED_GITHUB_USER_ID,
    slug: 'hello', lang: 'zh-tw', draft_revision: revision, base_main: main, content_sha256: 'd'.repeat(64), expires: Date.now() + 3600_000,
    review_branch: branch, prepared: true });
  h.network.mockImplementation(async (input: string | URL | Request) => {
    const url = String(input);
    if (url === `${h.issuer}/cdn-cgi/access/certs`) return h.fetcher(url, {});
    if (url.endsWith('/app/installations/123/access_tokens')) return Response.json({ token: 'test-app-token', expires_at: new Date(Date.now() + 3600_000).toISOString() });
    if (url.endsWith('/pulls/7')) return Response.json({ number: 7, node_id: 'PR_7', html_url: 'https://github.com/test/blog/pull/7', state: 'open', draft: true,
      head: { ref: branch, sha: head, repo: { full_name: `${h.env.GITHUB_OWNER}/${h.env.GITHUB_REPO}` } },
      base: { ref: h.env.GITHUB_BRANCH, repo: { full_name: `${h.env.GITHUB_OWNER}/${h.env.GITHUB_REPO}` } } });
    if (url.endsWith(`/git/commits/${head}`)) return Response.json({ sha: head, tree: { sha: head }, parents: [{ sha: main }], message: `Blog MCP candidate\n\n${envelope}` });
    if (url.endsWith('/git/ref/heads/main')) return Response.json({ object: { sha: main } });
    if (url.includes('/git/ref/heads/mcp%2Fdrafts%2Fhello%2Fzh-tw')) return Response.json({ object: { sha: revision } });
    if (url.includes('/actions/workflows/')) return Response.json({ workflow_runs: [] });
    throw new Error('Unexpected network request');
  });
  const response = await h.rpc('tools/call', { name: 'get_operation_status', arguments: { operation_id: `${id}:7:${head}` } });
  const status = result(await response.text());
  expect(status.isError).not.toBe(true);
  expect(status.structuredContent).toMatchObject({ status: 'queued', pr_number: 7 });
});

it('deletes the requested language through MCP with an expected-SHA ref deletion', async () => {
  const h = await harness();
  Object.assign(h.env, { GITHUB_APP_ID: crypto.randomUUID(), GITHUB_INSTALLATION_ID: '123', GITHUB_APP_PRIVATE_KEY: await exportPKCS8(h.key.privateKey) });
  const before = 'b'.repeat(40), after = 'c'.repeat(40), tree = 'd'.repeat(40);
  h.network.mockImplementation(async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input);
    if (url === `${h.issuer}/cdn-cgi/access/certs`) return h.fetcher(url, {});
    if (url.endsWith('/app/installations/123/access_tokens')) return Response.json({ token: 'test-app-token', expires_at: new Date(Date.now() + 3600_000).toISOString() });
    if (url.includes('/git/ref/heads/mcp%2Fdrafts%2Fhello%2Fen')) return Response.json({ object: { sha: before } });
    if (url.includes('/contents/')) {
      const text = url.includes('/.mcp/draft.json') ? JSON.stringify({ slug: 'hello', lang: 'en', base_post_sha: null }) : '---\ntitle: Hello\ndraft: true\n---\nDraft\n';
      expect(url.includes('/.mcp/draft.json') || url.includes('/content/posts/hello/index.en.md')).toBe(true);
      return Response.json({ type: 'file', size: text.length, sha: before, encoding: 'base64', content: Buffer.from(text).toString('base64') });
    }
    if (url.endsWith(`/git/commits/${before}`)) return Response.json({ sha: before, message: '', parents: [], tree: { sha: tree } });
    const body = JSON.parse(init.body as string);
    if (url.endsWith('/graphql')) {
      if (body.query.startsWith('query')) return Response.json({ data: { repository: { id: 'repo-id' } } });
      expect(body.variables.input.refUpdates).toEqual([
        { name: 'refs/heads/mcp/drafts/hello/en', beforeOid: after, afterOid: '0'.repeat(40), force: false },
      ]);
      return Response.json({ data: { updateRefs: { clientMutationId: null } } });
    }
    if (url.endsWith('/git/trees')) {
      expect(body.tree).toHaveLength(1);
      expect(body.tree[0].path).toBe('.mcp/draft.json');
      expect(JSON.parse(body.tree[0].content).deleted_revision).toBe(before);
      return Response.json({ sha: tree });
    }
    if (url.endsWith('/git/commits')) return Response.json({ sha: after });
    expect(url.endsWith('/git/refs/heads/mcp%2Fdrafts%2Fhello%2Fen')).toBe(true);
    expect(init.method).toBe('PATCH');
    expect(body).toEqual({ sha: after, force: false });
    return Response.json({});
  });
  const response = await h.rpc('tools/call', { name: 'delete_draft', arguments: { slug: 'hello', lang: 'en', expected_revision: before } });
  const deleted = result(await response.text());
  expect(deleted.isError).not.toBe(true);
  expect(deleted.structuredContent).toMatchObject({ slug: 'hello', lang: 'en', deleted: true, revision: after });
});

it('blocks every route without a platform context even with a correctly signed assertion', async () => {
  const h = await harness();
  for (const path of ['/mcp', '/health', '/authorize', '/token', '/register', '/callback', '/.well-known/oauth-authorization-server']) {
    const response = await h.call(path, { headers: { 'Cf-Access-Jwt-Assertion': h.token } }, { ...h.ctx, access: undefined } as ExecutionContext);
    expect(response.status).toBe(403);
  }
  expect(h.network).not.toHaveBeenCalled();
});

it('refuses old bearer tokens, spoofed headers and all failed checks before any GitHub call', async () => {
  const h = await harness();
  const headers = { Authorization: 'Bearer old-self-issued-token', 'Cf-Access-Authenticated-User-Email': h.env.ALLOWED_ACCESS_EMAIL };
  expect((await h.call('/mcp', { headers })).status).toBe(403);
  const invalid = [await h.sign({ ...h.claims(), iss: 'https://evil.example' }),
    await h.sign({ ...h.claims(), aud: 'wrong' }), await h.sign({ ...h.claims(), exp: 1 }),
    await h.sign({ ...h.claims(), exp: undefined }), await h.sign({ ...h.claims(), email: 'other@example.com' }),
    h.token.slice(0, -8) + 'forgedAA'];
  for (const assertion of invalid) {
    expect((await h.call('/mcp', { method: 'POST', headers: { 'Cf-Access-Jwt-Assertion': assertion,
      'Content-Type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call',
        params: { name: 'publish_post', arguments: { slug: 'hello', confirmation: 'old' } } }) })).status).toBe(403);
  }
  expect(h.network.mock.calls.every(([url]) => String(url) === `${h.issuer}/cdn-cgi/access/certs`)).toBe(true);
});

it('fails closed on identity or JWKS failure, without consuming the MCP body', async () => {
  const h = await harness();
  h.network.mockRejectedValue(new Error('JWKS unavailable'));
  const response = await h.authenticated('/mcp');
  expect(response.status).toBe(403);
  expect(await response.text()).toBe('Access authentication required');
  expect(response.headers.get('Cache-Control')).toBe('no-store');
  const getIdentity = vi.fn(async () => { throw new Error('Identity unavailable'); });
  expect((await h.call('/mcp', { headers: { 'Cf-Access-Jwt-Assertion': h.token } },
    { ...h.ctx, access: { aud: h.env.ACCESS_AUD, getIdentity } } as unknown as ExecutionContext)).status).toBe(403);
  expect(h.network).toHaveBeenCalledTimes(1);
});

it('retires self-hosted OAuth endpoints and keeps health private', async () => {
  const h = await harness();
  for (const path of ['/authorize', '/callback', '/token', '/register', '/.well-known/oauth-authorization-server', '/.well-known/oauth-protected-resource/mcp']) {
    expect((await h.authenticated(path)).status).toBe(404);
  }
  expect((await h.call('/health')).status).toBe(403);
  expect((await h.authenticated('/health')).status).toBe(200);
});

it('rejects invalid configuration, alternate hosts and oversized authenticated bodies', async () => {
  const h = await harness();
  expect((await h.call('/mcp', {}, h.ctx, { ...h.env, ACCESS_AUD: '' })).status).toBe(503);
  expect((await worker.fetch(new Request('https://evil.example/mcp'), h.env, h.ctx)).status).toBe(403);
  expect(h.network).not.toHaveBeenCalled();
  expect((await h.authenticated('/mcp', { method: 'POST', body: 'x'.repeat(8 * 1024 * 1024 + 1) })).status).toBe(413);
});

import { beforeAll, expect, it, vi } from 'vitest';
import { generateKeyPairSync } from 'node:crypto';
import { GitHubRepository } from '../src/github';
import { env as baseEnv } from './helpers';

let privateKey: string;
beforeAll(() => {
  privateKey = generateKeyPairSync('rsa', { modulusLength: 2048 }).privateKey.export({ type: 'pkcs8', format: 'pem' }) as string;
});
function setup(handler: (url: URL, init: RequestInit) => Response) {
  const env = { ...baseEnv, GITHUB_APP_ID: crypto.randomUUID(), GITHUB_INSTALLATION_ID: '123', GITHUB_APP_PRIVATE_KEY: privateKey };
  const fetcher = vi.fn(async function (this: unknown, input: string | URL | Request, init: RequestInit = {}) {
    // Match workerd's receiver requirement; Node's fetch is more permissive.
    expect(this).toBeUndefined();
    const url = new URL(String(input));
    if (url.pathname === '/app/installations/123/access_tokens') {
      expect(JSON.parse(init.body as string)).toEqual({ repositories: ['blog'], permissions: { contents: 'write', actions: 'read' } });
      expect(new Headers(init.headers).get('Authorization')).toMatch(/^Bearer ey/);
      return Response.json({ token: 'scoped-app-token', expires_at: new Date(Date.now() + 3600_000).toISOString() });
    }
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer scoped-app-token');
    expect(url.origin).toBe('https://api.github.com');
    return handler(url, init);
  });
  return { repo: new GitHubRepository(env, fetcher as typeof fetch), fetcher };
}

it('scopes installation tokens to this repo, caches them and always uses non-forced updates', async () => {
  const { repo, fetcher } = setup((url, init) => {
    expect(url.pathname).toBe('/repos/test/blog/git/refs/heads/main');
    expect(init.method).toBe('PATCH');
    expect(JSON.parse(init.body as string)).toEqual({ sha: 'a'.repeat(40), force: false });
    return Response.json({});
  });
  await repo.advanceRef('main', 'a'.repeat(40));
  await repo.advanceRef('main', 'a'.repeat(40));
  expect(fetcher).toHaveBeenCalledTimes(3);
});

it('reads GitHub large-file blobs instead of returning the empty Contents API body', async () => {
  const body = '中'.repeat(400_000);
  const { repo } = setup(url => url.pathname.includes('/contents/')
    ? Response.json({ type: 'file', size: 1_200_000, sha: 'b'.repeat(40), content: '', encoding: 'none' })
    : Response.json({ size: 1_200_000, encoding: 'base64', content: Buffer.from(body).toString('base64') }));
  const file = await repo.file('content/posts/large/index.md', 'a'.repeat(40));
  expect(file?.text).toBe(body);
});

it('propagates conflicts and rate limits as actionable errors', async () => {
  const conflict = setup(() => new Response('{}', { status: 422 })).repo;
  await expect(conflict.advanceRef('main', 'a'.repeat(40))).rejects.toMatchObject({ code: 'conflict' });
  const limited = setup(() => new Response('{}', { status: 429, headers: { 'Retry-After': '30' } })).repo;
  await expect(limited.head('main')).rejects.toThrow('retry after 30 seconds');
});

it('filters workflow status by the exact commit and push event', async () => {
  const sha = 'a'.repeat(40);
  const { repo } = setup(url => {
    expect(url.searchParams.get('head_sha')).toBe(sha);
    expect(url.searchParams.get('event')).toBe('push');
    return Response.json({ workflow_runs: [
      { id: 1, head_sha: sha, event: 'push' }, { id: 2, head_sha: sha, event: 'pull_request' },
      { id: 3, head_sha: 'b'.repeat(40), event: 'push' },
    ] });
  });
  expect((await repo.runs('mcp-validate.yaml', sha)).map(r => r.id)).toEqual([1]);
});

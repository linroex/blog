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
      expect(JSON.parse(init.body as string)).toEqual({ repositories: ['blog'], permissions: { contents: 'write', actions: 'read', pull_requests: 'write' } });
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

it('writes binary files through base64 blobs and references their SHA in the new tree', async () => {
  const bytes = Buffer.from([137, 80, 78, 71, 255, 0]);
  const parent = 'a'.repeat(40), blob = 'b'.repeat(40), tree = 'c'.repeat(40), commit = 'd'.repeat(40);
  const { repo } = setup((url, init) => {
    const body = init.body ? JSON.parse(init.body as string) : null;
    if (url.pathname.endsWith(`/git/commits/${parent}`)) return Response.json({ sha: parent, tree: { sha: parent }, parents: [], message: 'Base' });
    if (url.pathname.endsWith('/git/blobs')) {
      expect(body).toEqual({ content: bytes.toString('base64'), encoding: 'base64' });
      return Response.json({ sha: blob });
    }
    if (url.pathname.endsWith('/git/trees')) {
      expect(body).toEqual({ base_tree: parent, tree: [
        { path: 'post.md', mode: '100644', type: 'blob', content: 'Body' },
        { path: 'image.png', mode: '100644', type: 'blob', sha: blob },
      ] });
      return Response.json({ sha: tree });
    }
    expect(body).toEqual({ message: 'Upload', tree, parents: [parent] });
    return Response.json({ sha: commit });
  });
  expect(await repo.writeCommit(parent, { 'post.md': 'Body', 'image.png': { base64: bytes.toString('base64') } }, 'Upload')).toBe(commit);
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

it('does not fetch trees when index and main commits match', async () => {
  const { repo, fetcher } = setup(() => { throw new Error('Unexpected request'); });
  expect(await repo.indexSourcesUnchanged('same', 'same')).toBe(true);
  expect(fetcher).not.toHaveBeenCalled();
});

it.each([
  { change: 'docs', unchanged: true },
  { change: 'non-post-content', unchanged: true },
  { change: 'unrelated-script', unchanged: true },
  { change: 'posts', unchanged: false },
  { change: 'removed-posts', unchanged: false },
  { change: 'reader', unchanged: false },
  { change: 'exporter', unchanged: false },
])('compares immutable source trees for $change changes', async ({ change, unchanged }) => {
  const entry = (path: string, sha: string, type = 'tree') => ({ path, sha, type });
  const scripts = [entry('blog_content.py', 'reader', 'blob'), entry('export_mcp_index.py', 'exporter', 'blob')];
  const trees: Record<string, ReturnType<typeof entry>[]> = {
    'old-root': [entry('content', 'old-content'), entry('scripts', 'old-scripts'), entry('MCP.md', 'old-doc', 'blob')],
    'new-root': [entry('content', change.includes('content') || change.includes('posts') ? 'new-content' : 'old-content'),
      entry('scripts', ['unrelated-script', 'reader', 'exporter'].includes(change) ? 'new-scripts' : 'old-scripts'), entry('MCP.md', 'new-doc', 'blob')],
    'old-content': [entry('posts', 'old-posts')],
    'new-content': change === 'removed-posts' ? [] : [entry('posts', change === 'posts' ? 'new-posts' : 'old-posts'), entry('about.md', 'new-about', 'blob')],
    'old-scripts': scripts,
    'new-scripts': scripts.map(item => item.sha === change ? { ...item, sha: 'changed' } : item).concat(entry('test.py', 'new-test', 'blob')),
  };
  const { repo, fetcher } = setup(url => {
    const name = url.pathname.split('/').at(-1)!;
    if (url.pathname.includes('/git/commits/')) return Response.json({ sha: name, tree: { sha: `${name}-root` }, parents: [], message: '' });
    expect(url.searchParams.has('recursive')).toBe(false);
    expect(trees[name]).toBeDefined();
    return Response.json({ tree: trees[name], truncated: false });
  });
  expect(await repo.indexSourcesUnchanged('old', 'new')).toBe(unchanged);
  expect(fetcher.mock.calls.length).toBeLessThanOrEqual(9); // Eight API calls plus installation token.
});

it('does not report a current index when GitHub truncates the source tree', async () => {
  const { repo } = setup(url => url.pathname.includes('/git/commits/')
    ? Response.json({ sha: '', tree: { sha: url.pathname.split('/').at(-1) }, parents: [], message: '' })
    : Response.json({ tree: [], truncated: true }));
  await expect(repo.indexSourcesUnchanged('old', 'new')).rejects.toMatchObject({ code: 'index_check_unavailable' });
});

it('batches draft PR lookups including merged and closed PRs', async () => {
  const branch = `mcp/reviews/${'a'.repeat(36)}`;
  const { repo, fetcher } = setup((url, init) => {
    expect(url.pathname).toBe('/graphql');
    const body = JSON.parse(init.body as string);
    expect(body.query).toContain('states: [OPEN, CLOSED, MERGED]');
    expect(body.variables).toEqual({ owner: 'test', name: 'blog' });
    return Response.json({ data: { repository: { id: 'repo-id', p0: { nodes: [{ number: 7, id: 'PR_7', url: 'https://github.com/test/blog/pull/7',
      state: 'MERGED', isDraft: false, merged: true, headRefName: branch, headRefOid: 'a'.repeat(40), baseRefName: 'main',
      headRepository: { nameWithOwner: 'test/blog' }, mergeCommit: { oid: 'b'.repeat(40) } }] } } } });
  });
  expect((await repo.pulls([branch]))[branch]).toMatchObject({ number: 7, merged: true, state: 'closed', merge_commit: 'b'.repeat(40) });
  expect(fetcher).toHaveBeenCalledTimes(2);
});

it('atomically guards source, main and previous review head when replacing a clean snapshot', async () => {
  const branch = `mcp/reviews/${'a'.repeat(36)}`;
  const source = 'mcp/drafts/hello/en', revision = 'a'.repeat(40), main = 'b'.repeat(40), next = 'c'.repeat(40);
  const { repo } = setup((url, init) => {
    expect(url.pathname).toBe('/graphql');
    const body = JSON.parse(init.body as string);
    if (body.query.startsWith('query')) return Response.json({ data: { repository: { id: 'repo-id', p0: { nodes: [] } } } });
    expect(body.variables.input).toEqual({ repositoryId: 'repo-id', refUpdates: [
      { name: `refs/heads/${source}`, beforeOid: revision, afterOid: revision, force: false },
      { name: 'refs/heads/main', beforeOid: main, afterOid: main, force: false },
      { name: `refs/heads/${branch}`, beforeOid: '0'.repeat(40), afterOid: next, force: true },
    ] });
    return Response.json({ data: { updateRefs: { clientMutationId: null } } });
  });
  await repo.syncReviewRef(branch, null, next, source, revision, main);
  await expect(repo.syncReviewRef('main', null, next, source, revision, main)).rejects.toMatchObject({ code: 'invalid_operation' });
});

it('merges through the PR API using an expected head, and never falls back to a main ref write', async () => {
  const head = 'a'.repeat(40), merged = 'b'.repeat(40);
  const { repo } = setup((url, init) => {
    expect(url.pathname).toBe('/repos/test/blog/pulls/7/merge');
    expect(init.method).toBe('PUT');
    expect(JSON.parse(init.body as string)).toEqual({ sha: head, merge_method: 'merge' });
    return Response.json({ merged: true, sha: merged });
  });
  expect(await repo.mergePull(7, head)).toBe(merged);
});

it('fails a review update on GraphQL ref conflicts without modifying any other ref', async () => {
  const branch = `mcp/reviews/${'a'.repeat(36)}`;
  const { repo } = setup((_url, init) => JSON.parse(init.body as string).query.startsWith('query')
    ? Response.json({ data: { repository: { id: 'repo-id', p0: { nodes: [] } } } })
    : Response.json({ data: null, errors: [{ message: 'Reference does not point at the expected object' }] }));
  await expect(repo.syncReviewRef(branch, null, 'a'.repeat(40), 'mcp/drafts/hello/en', 'b'.repeat(40), 'c'.repeat(40))).rejects.toMatchObject({ code: 'conflict' });
});

it('deletes only managed draft/review refs atomically with expected SHA guards', async () => {
  const source = 'mcp/drafts/hello/en', review = `mcp/reviews/${'a'.repeat(36)}`;
  const { repo, fetcher } = setup((url, init) => {
    expect(url.pathname).toBe('/graphql');
    const body = JSON.parse(init.body as string);
    if (body.query.startsWith('query')) return Response.json({ data: { repository: { id: 'repo-id' } } });
    expect(body.variables.input.refUpdates).toEqual([
      { name: `refs/heads/${source}`, beforeOid: 'b'.repeat(40), afterOid: '0'.repeat(40), force: false },
      { name: `refs/heads/${review}`, beforeOid: 'c'.repeat(40), afterOid: '0'.repeat(40), force: false },
    ]);
    return Response.json({ data: { updateRefs: { clientMutationId: null } } });
  });
  await repo.deleteDraftRefs(source, 'b'.repeat(40), { branch: review, revision: 'c'.repeat(40) });
  const calls = fetcher.mock.calls.length;
  for (const [branch, sha, other] of [
    ['main', 'b'.repeat(40), undefined],
    [source, 'invalid', undefined],
    [source, 'b'.repeat(40), { branch: 'main', revision: 'c'.repeat(40) }],
  ] as const) await expect(repo.deleteDraftRefs(branch, sha, other)).rejects.toMatchObject({ code: 'invalid_operation' });
  expect(fetcher.mock.calls).toHaveLength(calls);
});

it('surfaces a branch deletion conflict without an unguarded REST fallback', async () => {
  const { repo, fetcher } = setup((_url, init) => JSON.parse(init.body as string).query.startsWith('query')
    ? Response.json({ data: { repository: { id: 'repo-id' } } })
    : Response.json({ data: null, errors: [{ message: 'Reference does not point at the expected object' }] }));
  await expect(repo.deleteDraftRefs('mcp/drafts/hello/en', 'a'.repeat(40))).rejects.toMatchObject({ code: 'conflict' });
  expect(fetcher.mock.calls.every(([url]) => !String(url).includes('/git/refs/'))).toBe(true);
});

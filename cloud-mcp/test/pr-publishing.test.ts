import { afterEach, expect, it, vi } from 'vitest';
import { setup } from './helpers';
import { newDocument } from '../src/document';

afterEach(() => vi.restoreAllMocks());
async function prepared() {
  const h = setup();
  const draft = await h.blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'Article body' });
  const op = await h.blog.preparePublish('hello', 'zh-tw');
  h.repo.pass(op.candidate_commit, op.validation_branch);
  const ready = await h.blog.operationStatus(op.operation_id);
  return { ...h, draft, op, confirmation: ready.confirmation as string };
}

it('opens a readable Draft PR immediately and reuses it for content and metadata edits', async () => {
  const { repo, blog } = setup();
  const first = await blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'First' });
  expect(first).toMatchObject({ pr_number: 1, pr_state: 'draft', pr_sync_pending: false });
  const pull = await repo.pull(1);
  expect(first.read_url).toContain(`/blob/${pull.head}/content/posts/hello/index.md`);
  expect(await repo.file('.mcp/draft.json', pull.head)).toBeNull();
  expect((await repo.file('content/posts/hello/index.md', pull.head))?.text).toContain('draft: false');
  const second = await blog.updatePost('hello', 'zh-tw', first.revision, { content: 'Second' });
  expect(second.pr_number).toBe(1);
  expect(repo.pullRequests.size).toBe(1);
  expect((await blog.listPosts('', 0, 20, 0)).drafts[0].pr_url).toBe(first.pr_url);
  expect((await blog.readPost('hello', 'zh-tw')).pr_url).toBe(first.pr_url);
});

it('keeps PR text bounded and links to the full fixed-version article', async () => {
  const { repo, blog } = setup();
  const create = vi.spyOn(repo, 'createPull');
  const saved = await blog.createPost('long-post', 'zh-tw', { title: 'Long', content: 'x'.repeat(100_000) });
  expect(saved.pr_sync_pending).toBe(false);
  expect(create.mock.calls[0][2].length).toBeLessThan(4000);
  expect(create.mock.calls[0][2]).toContain(saved.read_url);
});

it('keeps the PR draft until validation succeeds, and returns it to draft on edits', async () => {
  const { repo, blog } = setup();
  const saved = await blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'Body' });
  const op = await blog.preparePublish('hello', 'zh-tw');
  expect((await repo.pull(1)).draft).toBe(true);
  expect((await blog.operationStatus(op.operation_id)).status).toBe('queued');
  repo.pass(op.candidate_commit, op.validation_branch);
  expect((await blog.operationStatus(op.operation_id)).status).toBe('ready');
  expect((await repo.pull(1)).draft).toBe(false);
  await blog.updatePost('hello', 'zh-tw', saved.revision, { content: 'Changed' });
  expect((await repo.pull(1)).draft).toBe(true);
  expect((await blog.operationStatus(op.operation_id)).status).toBe('stale');
});

it('preserves the saved draft when PR creation fails and recovers without duplicates', async () => {
  const { repo, blog } = setup();
  const create = repo.createPull.bind(repo);
  vi.spyOn(repo, 'createPull').mockImplementationOnce(async (...args) => {
    await create(...args);
    throw new Error('Response lost');
  });
  const saved = await blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'Saved body' });
  expect(saved.pr_sync_pending).toBe(true);
  expect((await blog.readPost('hello', 'zh-tw')).content).toBe('Saved body\n');
  const retried = await blog.updatePost('hello', 'zh-tw', saved.revision, {});
  expect(retried.pr_sync_pending).toBe(false);
  expect(retried.pr_number).toBe(1);
  expect(repo.pullRequests.size).toBe(1);
});

it('does not overwrite a review snapshot when another writer advances its source', async () => {
  const { repo, blog } = setup();
  const saved = await blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'Body' });
  const sync = repo.syncReviewRef.bind(repo);
  vi.spyOn(repo, 'syncReviewRef').mockImplementationOnce(async (...args) => {
    const current = await blog.readPost('hello', 'zh-tw');
    await blog.updatePost('hello', 'zh-tw', current.revision, { content: 'Winning change' });
    return sync(...args);
  });
  const result = await blog.updatePost('hello', 'zh-tw', saved.revision, { content: 'Losing snapshot' });
  expect(result.pr_sync_pending).toBe(true);
  const pull = await repo.pull(1);
  expect((await repo.file('content/posts/hello/index.md', pull.head))?.text).toContain('Winning change');
});

it('closes the PR when discarding its draft and creates a new PR when starting over', async () => {
  const { repo, blog } = setup();
  const saved = await blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'Body' });
  const deleted = await blog.deleteDraft('hello', 'zh-tw', saved.revision);
  expect(deleted.pr_state).toBe('closed');
  expect((await repo.pull(1)).state).toBe('closed');
  const fresh = await blog.createPost('hello', 'zh-tw', { title: 'Fresh', content: 'Fresh body' });
  expect(fresh.pr_number).toBe(2);
});

it('tracks manual GitHub merges and survives deletion of both source branches', async () => {
  const { repo, blog, op, confirmation } = await prepared();
  const merged = await repo.mergePull(op.pr_number!, op.candidate_commit);
  expect((await blog.readPost('hello', 'zh-tw')).source).toBe('published');
  expect((await blog.listPosts('', 0, 20, 0)).drafts).toHaveLength(0);
  repo.branches.delete(op.validation_branch);
  repo.branches.delete('mcp/drafts/hello/zh-tw');
  repo.pass(merged, 'main', 'hugo.yaml');
  repo.jobRuns.set(1, [{ name: 'deploy', status: 'completed', conclusion: 'success' }, { name: 'cleanup', status: 'completed', conclusion: 'success' }]);
  expect(await blog.operationStatus(op.operation_id)).toMatchObject({ commit: merged, status: 'deployed', cleanup_status: 'completed' });
  expect((await blog.publishPost('hello', 'zh-tw', confirmation)).commit).toBe(merged);
});

it.each(['failure', 'cancelled'])('reports cleanup %s separately from a successful deployment', async conclusion => {
  const { repo, blog, op, confirmation } = await prepared();
  const result = await blog.publishPost('hello', 'zh-tw', confirmation);
  repo.pass(result.commit as string, 'main', 'hugo.yaml', 'failure');
  repo.jobRuns.set(1, [{ name: 'deploy', status: 'completed', conclusion: 'success' }, { name: 'cleanup', status: 'completed', conclusion }]);
  expect(await blog.operationStatus(op.operation_id)).toMatchObject({ status: 'deployed', hosting_deployment_confirmed: true, cleanup_status: 'failed' });
});

it('starts a new review generation when editing an already merged article', async () => {
  const { repo, blog, confirmation } = await prepared();
  await blog.publishPost('hello', 'zh-tw', confirmation);
  const published = await blog.readPost('hello', 'zh-tw');
  const edit = await blog.updatePost('hello', 'zh-tw', published.revision, { content: 'Second edition' });
  expect(edit.pr_number).toBe(2);
  expect((await repo.pull(1)).merged).toBe(true);
});

it('preserves a newer source draft when manual merge wins during PR synchronization', async () => {
  const { repo, blog, draft, op } = await prepared();
  const sync = repo.syncReviewRef.bind(repo);
  vi.spyOn(repo, 'syncReviewRef').mockImplementationOnce(async (...args) => {
    // The owner can explicitly mark/merge in GitHub while an MCP writer saves.
    repo.pullRequests.get(op.pr_number!)!.draft = false;
    await repo.mergePull(op.pr_number!, op.candidate_commit);
    return sync(...args);
  });
  const saved = await blog.updatePost('hello', 'zh-tw', draft.revision, { content: 'Newer unpublished work' });
  expect(saved.pr_sync_pending).toBe(true);
  expect((await blog.readPost('hello', 'zh-tw')).content).toBe('Newer unpublished work\n');
  expect((await blog.listPosts('', 0, 20, 0)).drafts).toHaveLength(1);
  const fresh = await blog.updatePost('hello', 'zh-tw', saved.revision, {});
  expect(fresh.pr_number).toBe(2);
  expect(fresh.pr_sync_pending).toBe(false);
});

it('migrates a legacy draft on prepare without losing its contents or creating duplicate PRs', async () => {
  const { repo, blog } = setup();
  const main = (await repo.head('main'))!;
  const raw = newDocument({ title: 'Legacy', draft: true }, 'Legacy content');
  const revision = await repo.writeCommit(main, { 'content/posts/legacy/index.md': raw,
    '.mcp/draft.json': JSON.stringify({ slug: 'legacy', lang: 'zh-tw', base_post_sha: null }) }, 'Legacy draft');
  await repo.createRef('mcp/drafts/legacy/zh-tw', revision);
  const op = await blog.preparePublish('legacy', 'zh-tw');
  expect(op.pr_number).toBe(1);
  expect(repo.pullRequests.size).toBe(1);
  expect((await blog.readPost('legacy', 'zh-tw')).content).toBe('Legacy content\n');
  expect(await repo.file('.mcp/draft.json', op.candidate_commit)).toBeNull();
});

import { afterEach, expect, it, vi } from 'vitest';
import { setup } from './helpers';

afterEach(() => vi.restoreAllMocks());
async function draft() {
  const h = setup();
  const post = await h.blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'Draft body' });
  return { ...h, post };
}

it('removes a new draft from reads and listings without changing main or erasing its history', async () => {
  const { repo, blog, post } = await draft();
  const main = await repo.head('main');
  const deleted = await blog.deleteDraft('hello', 'zh-tw', post.revision);
  expect(deleted).toMatchObject({ deleted: true, already_deleted: false, retained_git_history: true, retained_uploaded_images: true });
  expect(await repo.head('main')).toBe(main);
  expect((await blog.listPosts('', 0, 20, 0)).drafts).toEqual([]);
  await expect(blog.readPost('hello', 'zh-tw', 'draft')).rejects.toMatchObject({ code: 'not_found' });
  await expect(blog.readPost('hello', 'zh-tw')).rejects.toMatchObject({ code: 'not_found' });
  await expect(blog.preparePublish('hello', 'zh-tw')).rejects.toMatchObject({ code: 'not_found' });
  expect((await repo.file('content/posts/hello/index.md', deleted.revision))?.text).toContain('Draft body');
});

it('deletes an edit draft and falls back to the published article, allowing a fresh edit', async () => {
  const { repo, blog } = setup();
  const published = await blog.readPost('original', 'zh-tw', 'published');
  const edited = await blog.updatePost('original', 'zh-tw', published.revision, { content: 'Discard this' });
  await blog.deleteDraft('original', 'zh-tw', edited.revision);
  expect(await blog.readPost('original', 'zh-tw')).toEqual(published);
  const fresh = await blog.updatePost('original', 'zh-tw', published.revision, { content: 'Fresh edit' });
  expect((await blog.readPost('original', 'zh-tw')).content).toBe('Fresh edit\n');
  expect((await blog.listPosts('', 0, 20, 0)).drafts[0].revision).toBe(fresh.revision);
  expect(await repo.head('main')).toBe(published.revision);
});

it('deletes only the requested language', async () => {
  const { blog } = setup();
  const english = await blog.createPost('original', 'en', { title: 'English', content: 'English draft' });
  const japanese = await blog.createPost('original', 'ja', { title: '日本語', content: 'Japanese draft' });
  await blog.deleteDraft('original', 'en', english.revision);
  expect((await blog.readPost('original', 'ja', 'draft')).revision).toBe(japanese.revision);
  expect((await blog.readPost('original', 'zh-tw')).source).toBe('published');
  await expect(blog.readPost('original', 'en')).rejects.toMatchObject({ code: 'not_found' });
});

it('rejects a stale delete without affecting the current draft', async () => {
  const { blog, post } = await draft();
  const updated = await blog.updatePost('hello', 'zh-tw', post.revision, { content: 'Newer draft' });
  await expect(blog.deleteDraft('hello', 'zh-tw', post.revision)).rejects.toMatchObject({ code: 'conflict' });
  expect((await blog.readPost('hello', 'zh-tw')).revision).toBe(updated.revision);
});

it('supports retries after a lost delete response but never deletes a recreated draft', async () => {
  const { repo, blog, post } = await draft();
  const advance = repo.advanceRef.bind(repo);
  vi.spyOn(repo, 'advanceRef').mockImplementationOnce(async (branch, sha) => {
    await advance(branch, sha);
    throw new Error('Response lost');
  });
  await expect(blog.deleteDraft('hello', 'zh-tw', post.revision)).rejects.toThrow('Response lost');
  const commits = repo.commits.size;
  expect((await blog.deleteDraft('hello', 'zh-tw', post.revision)).already_deleted).toBe(true);
  expect(repo.commits.size).toBe(commits);
  const recreated = await blog.createPost('hello', 'zh-tw', { title: 'Hello again', content: 'New body' });
  await expect(blog.deleteDraft('hello', 'zh-tw', post.revision)).rejects.toMatchObject({ code: 'conflict' });
  await expect(blog.updatePost('hello', 'zh-tw', post.revision, { content: 'Old write' })).rejects.toMatchObject({ code: 'conflict' });
  expect((await blog.readPost('hello', 'zh-tw')).revision).toBe(recreated.revision);
});

it('preserves a concurrent update that wins the atomic ref update', async () => {
  const { repo, blog, post } = await draft();
  const advance = repo.advanceRef.bind(repo);
  vi.spyOn(repo, 'advanceRef').mockImplementationOnce(async (branch, sha) => {
    await blog.updatePost('hello', 'zh-tw', post.revision, { content: 'Concurrent update' });
    await advance(branch, sha);
  });
  await expect(blog.deleteDraft('hello', 'zh-tw', post.revision)).rejects.toMatchObject({ code: 'conflict' });
  expect((await blog.readPost('hello', 'zh-tw')).content).toBe('Concurrent update\n');
});

it('prevents an in-flight stale update from resurrecting a deleted draft', async () => {
  const { repo, blog, post } = await draft();
  const advance = repo.advanceRef.bind(repo);
  vi.spyOn(repo, 'advanceRef').mockImplementationOnce(async (branch, sha) => {
    await blog.deleteDraft('hello', 'zh-tw', post.revision);
    await advance(branch, sha);
  });
  await expect(blog.updatePost('hello', 'zh-tw', post.revision, { content: 'In-flight update' })).rejects.toMatchObject({ code: 'conflict' });
  await expect(blog.readPost('hello', 'zh-tw')).rejects.toMatchObject({ code: 'not_found' });
});

it('invalidates prepared publication and its confirmation', async () => {
  const { repo, blog, post } = await draft();
  const main = await repo.head('main');
  const operation = await blog.preparePublish('hello', 'zh-tw');
  repo.pass(operation.candidate_commit, `mcp/candidates/${operation.operation_id}`);
  const status = await blog.operationStatus(operation.operation_id);
  await blog.deleteDraft('hello', 'zh-tw', post.revision);
  expect((await blog.operationStatus(operation.operation_id)).status).toBe('stale');
  await expect(blog.publishPost('hello', 'zh-tw', status.confirmation as string)).rejects.toMatchObject({ code: 'conflict' });
  expect(await repo.head('main')).toBe(main);
});

it('refuses deletion of missing drafts and published bookkeeping', async () => {
  const { repo, blog, post } = await draft();
  await expect(blog.deleteDraft('missing', 'zh-tw', post.revision)).rejects.toMatchObject({ code: 'not_found' });
  await expect(blog.deleteDraft('original', 'zh-tw', post.revision)).rejects.toMatchObject({ code: 'not_found' });
  const operation = await blog.preparePublish('hello', 'zh-tw');
  repo.pass(operation.candidate_commit, `mcp/candidates/${operation.operation_id}`);
  const status = await blog.operationStatus(operation.operation_id);
  await blog.publishPost('hello', 'zh-tw', status.confirmation as string);
  const main = await repo.head('main');
  const archived = await repo.head('mcp/drafts/hello/zh-tw');
  await expect(blog.deleteDraft('hello', 'zh-tw', archived!)).rejects.toMatchObject({ code: 'not_found' });
  expect(await repo.head('main')).toBe(main);
});

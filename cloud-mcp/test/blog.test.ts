import { afterEach, describe, expect, it, vi } from 'vitest';
import { Blog } from '../src/blog';
import { document, edit, MAX_POST_BYTES, postPath } from '../src/document';
import { env, setup } from './helpers';

afterEach(() => vi.useRealTimers());
async function prepared() {
  const result = setup();
  const draft = await result.blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'Draft body' });
  const operation = await result.blog.preparePublish('hello', 'zh-tw');
  result.repo.pass(operation.candidate_commit, operation.validation_branch);
  const status = await result.blog.operationStatus(operation.operation_id);
  return { ...result, draft, operation, confirmation: status.confirmation as string };
}

describe('drafts and versions', () => {
  it('persists drafts across service instances without changing main', async () => {
    const { repo, blog, index } = setup();
    const main = await repo.head('main');
    await blog.createPost('hello', 'zh-tw', { title: '測試', content: 'Body' });
    const restarted = new Blog(repo, env, '123', async () => index);
    expect((await restarted.readPost('hello', 'zh-tw')).content).toBe('Body\n');
    expect(await repo.head('main')).toBe(main);
    await expect(blog.createPost('hello', 'zh-tw', { title: 'Duplicate', content: 'Oops' })).rejects.toMatchObject({ code: 'already_exists' });
  });
  it('keeps the published article and unknown frontmatter while editing a draft', async () => {
    const { blog } = setup();
    const original = await blog.readPost('original', 'zh-tw');
    const changed = await blog.updatePost('original', 'zh-tw', original.revision, { content: 'New text' });
    expect(changed.frontmatter.aliases).toEqual(['/old/']);
    expect(changed.frontmatter.draft).toBe(true);
    expect((await blog.readPost('original', 'zh-tw', 'published')).content).toBe('Old content\n');
    await expect(blog.updatePost('original', 'zh-tw', original.revision, { content: 'Stale' })).rejects.toMatchObject({ code: 'conflict' });
  });
  it('rejects concurrent draft updates instead of overwriting one', async () => {
    const { blog } = setup();
    const draft = await blog.createPost('hello', 'zh-tw', { title: 'Hello', content: 'v1' });
    const updates = await Promise.allSettled([
      blog.updatePost('hello', 'zh-tw', draft.revision, { content: 'v2' }),
      blog.updatePost('hello', 'zh-tw', draft.revision, { content: 'v3' }),
    ]);
    expect(updates.filter(x => x.status === 'fulfilled')).toHaveLength(1);
  });
  it('inherits translation metadata and requires the original before publishing', async () => {
    const { blog } = setup();
    const english = await blog.createPost('original', 'en', { title: 'English', content: 'English text' });
    expect(english.frontmatter.date).toBe('2020-01-01');
    expect(english.frontmatter.tags).toEqual(['a']);
    await blog.createPost('new-post', 'zh-tw', { title: 'New', content: 'New original' });
    await blog.createPost('new-post', 'ja', { title: '新規', content: '翻訳' });
    await expect(blog.preparePublish('new-post', 'ja')).rejects.toMatchObject({ code: 'original_required' });
  });
  it('bounds UTF-8 bytes and refuses traversal, duplicate YAML keys and alias bombs', () => {
    expect(() => postPath('../secrets', 'zh-tw')).toThrow();
    expect(() => edit('---\ndraft: true\n---\nbody', {}, '中'.repeat(MAX_POST_BYTES / 2))).toThrow();
    expect(() => document('---\ntitle: a\ntitle: b\n---\nbody')).toThrow();
    expect(() => document('---\na: &a [1,2]\nb: &b [*a,*a,*a,*a]\nc: [*b,*b,*b,*b,*b,*b,*b,*b,*b,*b]\n---\nbody')).toThrow();
  });
  it('accepts a near-2-MiB article without truncation and rejects the next oversized edit', async () => {
    const { blog } = setup();
    const body = 'a'.repeat(MAX_POST_BYTES - 1024);
    const draft = await blog.createPost('large', 'zh-tw', { title: 'Large', content: body });
    expect(draft.content.trim()).toHaveLength(body.length);
    await expect(blog.updatePost('large', 'zh-tw', draft.revision, { content: 'a'.repeat(MAX_POST_BYTES) })).rejects.toMatchObject({ code: 'invalid_post' });
    expect((await blog.readPost('large', 'zh-tw')).revision).toBe(draft.revision);
  });
  it('requires an explicit merged body and current main revision to reconcile a conflict', async () => {
    const { blog, repo } = setup();
    const original = await blog.readPost('original', 'zh-tw');
    const draft = await blog.updatePost('original', 'zh-tw', original.revision, { content: 'Draft changes' });
    const old = (await repo.file(postPath('original', 'zh-tw'), (await repo.head('main'))!))!;
    await repo.externalEdit(postPath('original', 'zh-tw'), edit(old.text, {}, 'External changes'));
    const published = await blog.readPost('original', 'zh-tw', 'published');
    await expect(blog.updatePost('original', 'zh-tw', draft.revision, { title: 'Title' }, published.revision)).rejects.toMatchObject({ code: 'conflict' });
    await blog.updatePost('original', 'zh-tw', draft.revision, { content: 'Draft and external changes' }, published.revision);
    await expect(blog.preparePublish('original', 'zh-tw')).resolves.toHaveProperty('operation_id');
  });
});

describe('publication and recovery', () => {
  it('only publishes the selected file, preserves other drafts, and distinguishes deployment', async () => {
    const { repo, blog, operation, confirmation } = await prepared();
    await blog.createPost('unrelated', 'zh-tw', { title: 'Other', content: 'Unfinished' });
    const result = await blog.publishPost('hello', 'zh-tw', confirmation);
    expect(result.status).toBe('deploying');
    expect(result.hosting_deployment_confirmed).toBe(false);
    const main = (await repo.head('main'))!;
    expect(main).toBe(result.commit);
    expect(await repo.isAncestor(operation.candidate_commit, main)).toBe(true);
    expect(await repo.file('content/posts/unrelated/index.md', main)).toBeNull();
    expect(await repo.file('.mcp/draft.json', main)).toBeNull();
    expect((await blog.readPost('hello', 'zh-tw')).frontmatter.draft).toBe(false);
    repo.pass(main, 'main', 'hugo.yaml');
    expect((await blog.operationStatus(operation.operation_id)).status).toBe('deployed');
  });
  it('can edit a published article again after bookkeeping', async () => {
    const { blog, confirmation } = await prepared();
    await blog.publishPost('hello', 'zh-tw', confirmation);
    const current = await blog.readPost('hello', 'zh-tw');
    const changed = await blog.updatePost('hello', 'zh-tw', current.revision, { content: 'Second edition' });
    expect(changed.source).toBe('draft');
    await expect(blog.preparePublish('hello', 'zh-tw')).resolves.toHaveProperty('operation_id');
  });
  it('does not offer confirmation before success, and fails closed if validation later fails', async () => {
    const { blog, repo, confirmation, operation } = await prepared();
    repo.pass(operation.candidate_commit, operation.validation_branch, env.VALIDATION_WORKFLOW, 'failure');
    expect((await blog.operationStatus(operation.operation_id)).confirmation).toBeUndefined();
    await expect(blog.publishPost('hello', 'zh-tw', confirmation)).rejects.toMatchObject({ code: 'validation_required' });
  });
  it('rejects validation of a different branch', async () => {
    const { blog, repo, confirmation, operation } = await prepared();
    repo.pass(operation.candidate_commit, 'main');
    await expect(blog.publishPost('hello', 'zh-tw', confirmation)).rejects.toMatchObject({ code: 'validation_required' });
  });
  it('rejects stale, tampered and cross-language confirmations', async () => {
    const { blog, confirmation, draft } = await prepared();
    await expect(blog.publishPost('hello', 'en', confirmation)).rejects.toMatchObject({ code: 'invalid_confirmation' });
    await expect(blog.publishPost('hello', 'zh-tw', `x${confirmation}`)).rejects.toMatchObject({ code: 'invalid_confirmation' });
    await blog.updatePost('hello', 'zh-tw', draft.revision, { content: 'Changed after preview' });
    await expect(blog.publishPost('hello', 'zh-tw', confirmation)).rejects.toMatchObject({ code: 'conflict' });
  });
  it('rejects expired confirmation', async () => {
    const { blog, confirmation } = await prepared();
    vi.useFakeTimers(); vi.setSystemTime(Date.now() + 25 * 3600_000);
    await expect(blog.publishPost('hello', 'zh-tw', confirmation)).rejects.toMatchObject({ code: 'expired' });
  });
  it('rejects changed main both before preparation and at the final ref update', async () => {
    const { repo, blog, confirmation } = await prepared();
    repo.failNextMainUpdate = true;
    await expect(blog.publishPost('hello', 'zh-tw', confirmation)).rejects.toMatchObject({ code: 'conflict' });
    expect(await repo.file('other.txt', (await repo.head('main'))!)).not.toBeNull();
    const original = await blog.readPost('original', 'zh-tw');
    await blog.updatePost('original', 'zh-tw', original.revision, { content: 'My change' });
    await repo.externalEdit('content/posts/original/index.md', 'Changed externally');
    await expect(blog.preparePublish('original', 'zh-tw')).rejects.toMatchObject({ code: 'conflict' });
  });
  it('recovers a lost publication response without a duplicate commit', async () => {
    const { repo, blog, confirmation, operation } = await prepared();
    repo.loseMainResponse = true;
    await expect(blog.publishPost('hello', 'zh-tw', confirmation)).rejects.toThrow();
    const result = await blog.publishPost('hello', 'zh-tw', confirmation);
    expect(result.commit).toBe(await repo.head('main'));
    expect(await repo.isAncestor(operation.candidate_commit, result.commit as string)).toBe(true);
  });
  it('keeps newer drafts when polling an earlier merged PR', async () => {
    const { repo, blog, confirmation, operation } = await prepared();
    expect((await blog.publishPost('hello', 'zh-tw', confirmation)).cleanup_status).toBe('waiting_for_deployment');
    await blog.operationStatus(operation.operation_id);
    const current = await blog.readPost('hello', 'zh-tw');
    const changed = await blog.updatePost('hello', 'zh-tw', current.revision, { content: 'Next edition' });
    await blog.operationStatus(operation.operation_id);
    expect((await blog.readPost('hello', 'zh-tw')).revision).toBe(changed.revision);
  });
  it('reports deployment failure independently of successful publication', async () => {
    const { repo, blog, confirmation, operation } = await prepared();
    await blog.publishPost('hello', 'zh-tw', confirmation);
    repo.pass((await repo.head('main'))!, 'main', 'hugo.yaml', 'failure');
    expect((await blog.operationStatus(operation.operation_id)).status).toBe('deployment_failed');
  });
});

it('lists stale indexed articles and separate drafts with a bounded cursor', async () => {
  const { repo, blog } = setup();
  for (let i = 0; i < 11; i++) await blog.createPost(`draft-${i}`, 'zh-tw', { title: 'Draft', content: 'body' });
  await repo.externalEdit('content/posts/original/index.md', 'new main article');
  const page = await blog.listPosts('', 0, 20, 0, 10);
  expect(page.index_stale).toBe(true);
  expect(page.drafts).toHaveLength(10);
  expect(page.next_draft_offset).toBe(10);
  expect((await blog.listPosts('', 0, 20, 10)).drafts).toHaveLength(1);
});

it.each(['MCP.md', 'cloud-mcp/src/mcp.ts', 'other.txt'])('does not mark the index stale after editing %s', async path => {
  const { repo, blog, index } = setup();
  await repo.externalEdit(path, 'Unrelated change');
  const page = await blog.listPosts('', 0, 20, 0);
  expect(page.current_main_commit).not.toBe(index.commit);
  expect(page.indexed_commit).toBe(index.commit);
  expect(page.index_stale).toBe(false);
});

it.each(['content/posts/new/index.md', 'content/posts/original/index.ja.md', 'scripts/blog_content.py', 'scripts/export_mcp_index.py'])(
  'marks the index stale after editing %s', async path => {
    const { repo, blog } = setup();
    await repo.externalEdit(path, 'New index source');
    expect((await blog.listPosts('', 0, 20, 0)).index_stale).toBe(true);
  });

it('preserves the date ordering of the index when filtering and paginating', async () => {
  const { blog, index } = setup();
  index.posts = ['z-newest', 'm-middle', 'a-oldest'].map(slug => ({ slug, title: 'Match', summary: '', draft: false, translations: [] }));
  const page = await blog.listPosts('Match', 1, 1, 0);
  expect(page.posts.map(post => post.slug)).toEqual(['m-middle']);
  expect(page.total).toBe(3);
  expect(page.index_stale).toBe(false);
});

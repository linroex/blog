import { describe, expect, it } from 'vitest';
import { imageAsset, MAX_IMAGE_BYTES } from '../src/images';
import { setup } from './helpers';

// A real 1x1 PNG; retain non-UTF-8 bytes through upload, candidate and main.
const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';
async function draft() {
  const value = setup();
  const post = await value.blog.createPost('images', 'zh-tw', { title: 'Images', content: 'Body' });
  return { ...value, post };
}

describe('article images', () => {
  it('persists binary images only on the draft, then publishes their exact bytes with the article', async () => {
    const { repo, blog, post } = await draft();
    const main = (await repo.head('main'))!;
    const image = await blog.uploadImage('images', 'zh-tw', post.revision, 'chart.png', png);
    expect(image.markdown).toBe('![](images/chart.png)');
    expect(await repo.binary(image.path, main)).toBeNull();
    expect((await repo.binary(image.path, image.revision))?.base64).toBe(png);
    await blog.updatePost('images', 'zh-tw', image.revision, { content: `Body\n${image.markdown}` });
    const operation = await blog.preparePublish('images', 'zh-tw');
    expect((await repo.binary(image.path, operation.candidate_commit))?.base64).toBe(png);
    repo.pass(operation.candidate_commit, `mcp/candidates/${operation.operation_id}`);
    const status = await blog.operationStatus(operation.operation_id);
    expect((status.preview as { uploaded_images: unknown[] }).uploaded_images).toHaveLength(1);
    const result = await blog.publishPost('images', 'zh-tw', status.confirmation as string);
    expect((await repo.binary(image.path, result.commit as string))?.base64).toBe(png);
    expect(await repo.file('.mcp/draft.json', result.commit as string)).toBeNull();
    expect(result.hosting_deployment_confirmed).toBe(false);
  });
  it('creates a draft for uploads to published articles and supports images-only publication', async () => {
    const { repo, blog } = setup();
    const post = await blog.readPost('original', 'zh-tw');
    const image = await blog.uploadImage('original', 'zh-tw', post.revision, 'chart.png', png);
    expect((await blog.readPost('original', 'zh-tw')).frontmatter.draft).toBe(true);
    expect((await blog.readPost('original', 'zh-tw', 'published')).frontmatter.draft).toBe(false);
    const operation = await blog.preparePublish('original', 'zh-tw');
    expect((await repo.binary(image.path, operation.candidate_commit))?.base64).toBe(png);
  });
  it('rejects stale uploads and immutable-name replacements; identical retries do not create commits', async () => {
    const { blog, post } = await draft();
    const image = await blog.uploadImage('images', 'zh-tw', post.revision, 'chart.png', png);
    await expect(blog.uploadImage('images', 'zh-tw', post.revision, 'next.png', png)).rejects.toMatchObject({ code: 'conflict' });
    const retry = await blog.uploadImage('images', 'zh-tw', image.revision, 'chart.png', png);
    expect(retry.revision).toBe(image.revision);
    expect(retry.uploaded).toBe(false);
    const different = Buffer.concat([Buffer.from(png, 'base64'), Buffer.from([0])]).toString('base64');
    await expect(blog.uploadImage('images', 'zh-tw', image.revision, 'chart.png', different)).rejects.toMatchObject({ code: 'image_exists' });
  });
  it('invalidates preparation after another image upload and rejects concurrent uploads', async () => {
    const { repo, blog, post } = await draft();
    const operation = await blog.preparePublish('images', 'zh-tw');
    repo.pass(operation.candidate_commit, `mcp/candidates/${operation.operation_id}`);
    const confirmation = (await blog.operationStatus(operation.operation_id)).confirmation as string;
    const uploads = await Promise.allSettled([
      blog.uploadImage('images', 'zh-tw', post.revision, 'one.png', png),
      blog.uploadImage('images', 'zh-tw', post.revision, 'two.png', png),
    ]);
    expect(uploads.filter(u => u.status === 'fulfilled')).toHaveLength(1);
    expect((await blog.operationStatus(operation.operation_id)).status).toBe('stale');
    await expect(blog.publishPost('images', 'zh-tw', confirmation)).rejects.toMatchObject({ code: 'conflict' });
  });
  it('keeps image manifests through explicit reconciliation and rejects conflicting published images', async () => {
    const { repo, blog } = setup();
    const post = await blog.readPost('original', 'zh-tw');
    const image = await blog.uploadImage('original', 'zh-tw', post.revision, 'chart.png', png);
    await repo.externalEdit('content/posts/original/index.md', '---\ntitle: External\ndraft: false\n---\nNew body');
    await blog.updatePost('original', 'zh-tw', image.revision, { content: `Merged\n${image.markdown}` }, (await repo.head('main'))!);
    expect((await blog.readPost('original', 'zh-tw')).uploaded_images).toHaveLength(1);
    await repo.externalEdit(image.path, 'different published image');
    await expect(blog.preparePublish('original', 'zh-tw')).rejects.toMatchObject({ code: 'conflict' });
  });
  it('bounds image count and rejects missing or tampered draft assets', async () => {
    const { repo, blog, post } = await draft();
    let revision = post.revision;
    for (let n = 0; n < 8; n++) revision = (await blog.uploadImage('images', 'zh-tw', revision, `image-${n}.png`, png)).revision;
    await expect(blog.uploadImage('images', 'zh-tw', revision, 'extra.png', png)).rejects.toMatchObject({ code: 'invalid_image' });
    delete repo.commits.get(revision)!.files['content/posts/images/images/image-0.png'];
    await expect(blog.preparePublish('images', 'zh-tw')).rejects.toMatchObject({ code: 'invalid_image' });
  });
  it('reuses an identical image across translations without overwriting main or copying another language', async () => {
    const { repo, blog } = setup();
    const published = (await repo.head('main'))!;
    const commit = await repo.writeCommit(published, { 'content/posts/original/images/chart.png': { base64: png } }, 'Existing image');
    await repo.advanceRef('main', commit);
    const translation = await blog.createPost('original', 'en', { title: 'English', content: '![](images/chart.png)' });
    await blog.uploadImage('original', 'en', translation.revision, 'chart.png', png);
    const operation = await blog.preparePublish('original', 'en');
    expect((await repo.binary('content/posts/original/images/chart.png', operation.candidate_commit))?.base64).toBe(png);
    expect((await repo.file('content/posts/original/index.md', operation.candidate_commit))?.sha).toBe((await repo.file('content/posts/original/index.md', commit))?.sha);
  });
});

it('rejects traversal, SVG, malformed or oversized base64 and mismatched types', async () => {
  for (const [name, encoded] of [
    ['../chart.png', png], ['chart.svg', Buffer.from('<svg/>').toString('base64')],
    ['chart.jpg', png], ['chart.png', 'data:image/png;base64,' + png],
    ['chart.png', '!!!!'], ['chart.png', 'a'.repeat(4 * Math.ceil((MAX_IMAGE_BYTES + 1) / 3))],
    ['chart.png', Buffer.alloc(MAX_IMAGE_BYTES + 1).toString('base64')],
  ]) await expect(imageAsset(name, encoded)).rejects.toMatchObject({ code: 'invalid_image' });
});

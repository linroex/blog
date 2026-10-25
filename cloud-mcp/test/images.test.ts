import { afterEach, expect, it, vi } from 'vitest';
import { Blog } from '../src/blog';
import { sign, verify } from '../src/crypto';
import { imageAsset, imageBytes, imageManifest, LEGACY_IMAGE_BYTES, MAX_IMAGE_BYTES } from '../src/images';
import { R2Images, type ImageUpload } from '../src/r2-images';
import { env } from './helpers';
import { imageSetup, png, r2Env } from './r2-helpers';

afterEach(() => vi.restoreAllMocks());
async function draft() {
  const h = imageSetup();
  const post = await h.blog.createPost('images', 'zh-tw', { title: 'Images', content: 'Body' });
  const offer = await h.blog.prepareImageUpload('images', 'zh-tw', post.revision, 'chart.png', 'image/png', png.length);
  return { ...h, post, offer };
}
it('signs one short-lived raw PUT bound to size, type and create-once semantics without Git writes', async () => {
  const { repo, r2, offer, post } = await draft();
  expect(new URL(offer.upload_url).searchParams.get('X-Amz-Expires')).toBe('300');
  expect(new URL(offer.upload_url).searchParams.get('X-Amz-SignedHeaders')).toBe('content-length;content-type;host;if-none-match');
  expect(offer.required_headers).toEqual({ 'Content-Type': 'image/png', 'Content-Length': String(png.length), 'If-None-Match': '*' });
  expect(offer.max_image_bytes).toBe(25 * 1024 * 1024);
  expect(await repo.head('mcp/drafts/images/zh-tw')).toBe(post.revision);
  expect(r2.requests).toHaveLength(0);
});
it('stores images only on R2 and publishes an article-only candidate with an absolute preview', async () => {
  const { repo, blog, r2, offer } = await draft();
  await r2.put(offer);
  const image = await blog.completeImageUpload(offer.upload_ticket);
  expect(image.markdown).toBe(`![](${image.url})`);
  expect(image.url).toMatch(/^https:\/\/images.example.com\/blog-mcp\/images\/images\/[a-f0-9]{64}\/chart.png$/);
  expect([...r2.objects.keys()]).toEqual([image.key]);
  expect(Object.keys(repo.commits.get(image.revision)!.files).some(p => p.endsWith('.png'))).toBe(false);
  await blog.updatePost('images', 'zh-tw', image.revision, { content: `Body\n${image.markdown}` });
  const operation = await blog.preparePublish('images', 'zh-tw');
  const commit = repo.commits.get(operation.candidate_commit)!;
  const parent = repo.commits.get(commit.parents[0])!;
  expect(Object.keys(commit.files).filter(p => JSON.stringify(commit.files[p]) !== JSON.stringify(parent.files[p]))).toEqual(['content/posts/images/index.md']);
  repo.pass(commit.sha, `mcp/candidates/${operation.operation_id}`);
  const status = await blog.operationStatus(operation.operation_id);
  expect((status.preview as any).uploaded_images[0].preview_url).toBe(image.url);
  expect((await blog.publishPost('images', 'zh-tw', status.confirmation as string)).committed).toBe(true);
});
it('accepts images larger than 1 MiB and bounds metadata and actual bytes at 25 MiB', async () => {
  const { blog, r2, post } = await draft();
  const large = new Uint8Array(LEGACY_IMAGE_BYTES + 1); large.set(png);
  const offer = await blog.prepareImageUpload('images', 'zh-tw', post.revision, 'large.png', 'image/png', large.length);
  await r2.put(offer, large);
  expect((await blog.completeImageUpload(offer.upload_ticket)).size).toBe(large.length);
  await expect(blog.prepareImageUpload('images', 'zh-tw', post.revision, 'huge.png', 'image/png', MAX_IMAGE_BYTES + 1)).rejects.toMatchObject({ code: 'invalid_image' });
});
it('supports retry after lost Git response, leaves pending bytes on Git failure and makes completion idempotent', async () => {
  const { repo, blog, r2, offer } = await draft();
  await r2.put(offer);
  const original = repo.advanceRef.bind(repo);
  const advance = vi.spyOn(repo, 'advanceRef').mockRejectedValueOnce(new Error('Git unavailable'));
  await expect(blog.completeImageUpload(offer.upload_ticket)).rejects.toThrow('Git unavailable');
  expect([...r2.objects.keys()].some(k => k.includes('/pending/'))).toBe(true);
  advance.mockImplementationOnce(async (branch, sha) => { await original(branch, sha); throw new Error('Response lost'); });
  await expect(blog.completeImageUpload(offer.upload_ticket)).rejects.toThrow('Response lost');
  const completed = await blog.completeImageUpload(offer.upload_ticket);
  expect(completed.already_completed).toBe(true);
  const before = repo.commits.size;
  expect((await blog.completeImageUpload(offer.upload_ticket)).revision).toBe(completed.revision);
  expect(repo.commits.size).toBe(before);
});
it('rejects upload replacement, stale revisions, foreign identities, altered and expired tickets', async () => {
  const { blog, r2, post, repo, index, storage, offer } = await draft();
  await r2.put(offer);
  expect((await r2.put(offer, new Uint8Array(png.length))).status).toBe(412);
  const foreign = new Blog(repo, r2Env, '456', async () => index, storage);
  await expect(foreign.completeImageUpload(offer.upload_ticket)).rejects.toMatchObject({ code: 'forbidden' });
  await expect(blog.completeImageUpload(offer.upload_ticket + 'x')).rejects.toThrow();
  const ticket = await verify<ImageUpload>(env.CONFIRMATION_SECRET, 'image-upload', offer.upload_ticket);
  await expect(blog.completeImageUpload(await sign(env.CONFIRMATION_SECRET, 'image-upload', { ...ticket, expires: 1 }))).rejects.toMatchObject({ code: 'expired' });
  await blog.updatePost('images', 'zh-tw', post.revision, { content: 'New body' });
  await expect(blog.completeImageUpload(offer.upload_ticket)).rejects.toMatchObject({ code: 'conflict' });
});
it('rejects missing, incorrectly sized, corrupt or differently hashed files without changing the draft', async () => {
  for (const kind of ['missing', 'size', 'signature', 'hash']) {
    const { blog, post, r2, offer } = await draft();
    let selected = offer;
    if (kind === 'hash') selected = await blog.prepareImageUpload('images', 'zh-tw', post.revision, 'chart.png', 'image/png', png.length, 'a'.repeat(64));
    if (kind !== 'missing') await r2.put(selected, kind === 'size' ? png.slice(1) : kind === 'signature' ? new Uint8Array(png.length) : png);
    await expect(blog.completeImageUpload(selected.upload_ticket)).rejects.toMatchObject({ code: kind === 'missing' ? 'upload_required' : 'invalid_image' });
    expect((await blog.readPost('images', 'zh-tw')).revision).toBe(post.revision);
  }
});
it('rejects truncated and overflowing GET bodies even when HEAD declares the expected size', async () => {
  for (const delta of [-1, 1]) {
    const { blog, post, offer, r2 } = await draft();
    await r2.put(offer);
    const object = [...r2.objects.values()][0];
    object.bytes = new Uint8Array(png.length + delta);
    await expect(blog.completeImageUpload(offer.upload_ticket)).rejects.toMatchObject({ code: 'invalid_image' });
    expect((await blog.readPost('images', 'zh-tw')).revision).toBe(post.revision);
  }
});
it('rejects concurrent completions and invalidates older publication preparations', async () => {
  const { blog, repo, post, offer, r2 } = await draft();
  const old = await blog.preparePublish('images', 'zh-tw');
  const second = await blog.prepareImageUpload('images', 'zh-tw', post.revision, 'next.png', 'image/png', png.length);
  await r2.put(offer); await r2.put(second);
  const results = await Promise.allSettled([blog.completeImageUpload(offer.upload_ticket), blog.completeImageUpload(second.upload_ticket)]);
  expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
  expect((await blog.operationStatus(old.operation_id)).status).toBe('stale');
  expect((await blog.readPost('images', 'zh-tw')).uploaded_images).toHaveLength(1);
});
it('bounds image count and blocks deleted or tampered finalized objects at publication', async () => {
  const { blog, r2, post } = await draft();
  let revision = post.revision;
  for (let n = 0; n < 8; n++) {
    const offer = await blog.prepareImageUpload('images', 'zh-tw', revision, `image-${n}.png`, 'image/png', png.length);
    await r2.put(offer);
    revision = (await blog.completeImageUpload(offer.upload_ticket)).revision;
  }
  await expect(blog.prepareImageUpload('images', 'zh-tw', revision, 'extra.png', 'image/png', png.length)).rejects.toMatchObject({ code: 'invalid_image' });
  [...r2.objects.values()][0].headers.set('x-amz-meta-sha256', 'b'.repeat(64));
  await expect(blog.preparePublish('images', 'zh-tw')).rejects.toMatchObject({ code: 'invalid_image' });
  r2.objects.clear();
  await expect(blog.preparePublish('images', 'zh-tw')).rejects.toMatchObject({ code: 'r2_error' });
});
it('creates a draft on a published article without changing main and preserves assets through reconciliation', async () => {
  const { blog, r2, repo } = imageSetup();
  const post = await blog.readPost('original', 'zh-tw');
  const offer = await blog.prepareImageUpload('original', 'zh-tw', post.revision, 'chart.png', 'image/png', png.length);
  await r2.put(offer);
  const image = await blog.completeImageUpload(offer.upload_ticket);
  expect((await blog.readPost('original', 'zh-tw')).frontmatter.draft).toBe(true);
  expect(await repo.head('main')).toBe(post.revision);
  await repo.externalEdit('content/posts/original/index.md', '---\ntitle: External\ndraft: false\n---\nNew body');
  await blog.updatePost('original', 'zh-tw', image.revision, { content: `Merged\n${image.markdown}` }, (await repo.head('main'))!);
  expect((await blog.readPost('original', 'zh-tw')).uploaded_images).toHaveLength(1);
  await blog.preparePublish('original', 'zh-tw');
});
it('fails cleanly when R2 is missing or unavailable', async () => {
  const { blog, r2, offer, post } = await draft();
  r2.fail = true;
  await expect(blog.completeImageUpload(offer.upload_ticket)).rejects.toMatchObject({ code: 'r2_error' });
  expect((await blog.readPost('images', 'zh-tw')).revision).toBe(post.revision);
  await expect(new R2Images(env).offer(await verify(env.CONFIRMATION_SECRET, 'image-upload', offer.upload_ticket))).rejects.toMatchObject({ code: 'images_not_configured' });
});
it('retains publication compatibility for existing Git image drafts', async () => {
  const { repo, blog, post } = await draft();
  const asset = await imageAsset('legacy.png', Buffer.from(png).toString('base64'));
  const meta = JSON.parse((await repo.file('.mcp/draft.json', post.revision))!.text);
  const revision = await repo.writeCommit(post.revision, { '.mcp/draft.json': JSON.stringify({ ...meta, images: [asset] }),
    'content/posts/images/images/legacy.png': { base64: Buffer.from(png).toString('base64') } }, 'Old uploader');
  await repo.advanceRef('mcp/drafts/images/zh-tw', revision);
  const operation = await blog.preparePublish('images', 'zh-tw');
  expect(await repo.binary('content/posts/images/images/legacy.png', operation.candidate_commit)).not.toBeNull();
});
it('rejects unsafe names, MIME mismatches, unknown storage and oversized legacy blobs', async () => {
  const { blog, post } = await draft();
  for (const [name, mime] of [['../chart.png', 'image/png'], ['chart.svg', 'image/svg+xml'], ['chart.jpg', 'image/png']]) {
    await expect(blog.prepareImageUpload('images', 'zh-tw', post.revision, name, mime, png.length)).rejects.toMatchObject({ code: 'invalid_image' });
  }
  await expect(imageAsset('chart.png', Buffer.alloc(LEGACY_IMAGE_BYTES + 1).toString('base64'))).rejects.toThrow();
  const asset = await imageBytes('chart.png', png);
  expect(() => imageManifest([{ ...asset, storage: 'elsewhere' }])).toThrow();
});

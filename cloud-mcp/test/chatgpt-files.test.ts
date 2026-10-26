import { describe, expect, it, vi } from 'vitest';
import { Blog } from '../src/blog';
import { downloadChatGPTFile, type ChatGPTFile } from '../src/chatgpt-files';
import { imageSetup, png, r2Env } from './r2-helpers';

const file: ChatGPTFile = { download_url: 'https://files.oaiusercontent.com/file-test?sig=private-example', file_id: 'file-test', mime_type: 'image/png' };
function harness(fetcher = vi.fn<typeof fetch>(async () => new Response(png, { headers: { 'Content-Length': String(png.length) } }))) {
  const h = imageSetup();
  const blog = new Blog(h.repo, r2Env, '123', async () => h.index, h.storage, (f, maximum) => downloadChatGPTFile(f, maximum, fetcher));
  return { ...h, blog, fetcher };
}
describe('ChatGPT attachment downloads', () => {
  it('downloads original bytes without forwarding credentials', async () => {
    const fetcher = vi.fn<typeof fetch>(async () => new Response(png));
    expect(await downloadChatGPTFile(file, 1000, fetcher)).toEqual(png);
    const [url, init] = fetcher.mock.calls[0];
    expect(String(url)).toBe(file.download_url);
    expect(init?.method).toBe('GET');
    expect(init?.redirect).toBe('manual');
    expect(new Headers(init?.headers).get('authorization')).toBeNull();
    expect(new Headers(init?.headers).get('cookie')).toBeNull();
  });
  it.each(['https://oaisdmntprkoreacentral.blob.core.windows.net/input?sig=private-example',
    'https://images.example.com/input', 'https://files.oaiusercontent.com.evil.example/input'])('accepts public HTTPS hosts without a provider allowlist: %s', async url => {
    const fetcher = vi.fn<typeof fetch>(async () => new Response(png));
    expect(await downloadChatGPTFile({ ...file, download_url: url }, 1000, fetcher)).toEqual(png);
    expect(String(fetcher.mock.calls[0][0])).toBe(url);
  });
  it.each(['http://files.oaiusercontent.com/file', 'file:///etc/passwd', 'ftp://example.com/file',
    'https://127.0.0.1/file', 'https://169.254.169.254/file', 'https://10.0.0.1/file',
    'https://172.16.0.1/file', 'https://192.168.0.1/file', 'https://100.100.100.200/file',
    'https://0.0.0.0/file', 'https://2130706433/file', 'https://0x7f000001/file', 'https://0177.0.0.1/file',
    'https://[::1]/file', 'https://[::ffff:127.0.0.1]/file', 'https://[fd00::1]/file', 'https://[fe80::1]/file',
    'https://localhost/file', 'https://localhost./file', 'https://x.localhost./file', 'https://printer.local/file',
    'https://metadata.google.internal/file', 'https://nas.home.arpa/file', 'https://router.lan/file',
    'https://intranet/file', 'https://bad_label.example.com/file',
    'https://user:pass@files.oaiusercontent.com/file', 'https://files.oaiusercontent.com:8443/file',
    'https://files.oaiusercontent.com/file#fragment', '/mnt/data/image.png'])('rejects unsafe download destination %s', async url => {
    const fetcher = vi.fn<typeof fetch>();
    await expect(downloadChatGPTFile({ ...file, download_url: url }, 1000, fetcher)).rejects.toMatchObject({ code: 'invalid_file' });
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('follows bounded relative and cross-provider public redirects, and rechecks private destinations', async () => {
    const good = vi.fn<typeof fetch>().mockResolvedValueOnce(new Response(null, { status: 302, headers: { Location: '/file-next' } }))
      .mockResolvedValueOnce(new Response(null, { status: 302, headers: { Location: 'https://oaisdmntprkoreacentral.blob.core.windows.net/file-final' } }))
      .mockResolvedValueOnce(new Response(png));
    expect(await downloadChatGPTFile(file, 1000, good)).toEqual(png);
    expect(good).toHaveBeenCalledTimes(3);
    for (const location of ['https://127.0.0.1/file', 'https://[::1]/file', 'https://metadata.google.internal/file',
      'https://printer.local./file', 'http://public.example.com/file', 'https://user:pass@public.example.com/file']) {
      const bad = vi.fn<typeof fetch>(async () => new Response(null, { status: 302, headers: { Location: location } }));
      await expect(downloadChatGPTFile(file, 1000, bad)).rejects.toMatchObject({ code: 'invalid_file' });
      expect(bad).toHaveBeenCalledTimes(1);
    }
    const loop = vi.fn<typeof fetch>(async () => new Response(null, { status: 302, headers: { Location: '/again' } }));
    await expect(downloadChatGPTFile(file, 1000, loop)).rejects.toMatchObject({ code: 'file_download_failed' });
    expect(loop).toHaveBeenCalledTimes(3);
  });
  it('bounds declared and streamed bytes and detects truncation', async () => {
    for (const response of [new Response(png, { headers: { 'Content-Length': '1001' } }), new Response(new Uint8Array(1001))]) {
      await expect(downloadChatGPTFile(file, 1000, async () => response)).rejects.toMatchObject({ code: 'invalid_image' });
    }
    await expect(downloadChatGPTFile(file, 1000, async () => new Response(png, { headers: { 'Content-Length': String(png.length + 1) } }))).rejects.toMatchObject({ code: 'file_download_failed' });
    await expect(downloadChatGPTFile(file, 1000, async () => new Response(new Uint8Array()))).rejects.toMatchObject({ code: 'invalid_image' });
  });
  it.each([401, 403, 404, 410])('reports expired references for HTTP %s', async status => {
    await expect(downloadChatGPTFile(file, 1000, async () => new Response(null, { status }))).rejects.toMatchObject({ code: 'file_expired' });
  });
  it('redacts signed URLs from download errors', async () => {
    try { await downloadChatGPTFile(file, 1000, async () => { throw new Error(file.download_url); }); }
    catch (error) {
      expect(error).toMatchObject({ code: 'file_download_failed' });
      expect(String(error)).not.toContain('private-example');
    }
  });
});

it('imports an attachment in one operation, stores only final bytes on R2 and publishes through the normal preview', async () => {
  const { blog, repo, r2, fetcher } = harness();
  const post = await blog.createPost('native-file', 'zh-tw', { title: 'Native', content: 'Body' });
  const image = await blog.uploadChatGPTImage('native-file', 'zh-tw', post.revision, 'chart.png', {
    ...file, download_url: 'https://oaisdmntprkoreacentral.blob.core.windows.net/input?sig=private-example',
  });
  expect(image.filename).toBe('chart.webp');
  expect(image.original?.size).toBe(png.length);
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect([...r2.objects.keys()]).toEqual([image.key]);
  expect(r2.requests.some(r => new URL(r.url).pathname.includes('/pending/'))).toBe(false);
  const draft = repo.commits.get(image.revision)!;
  expect(JSON.stringify(draft.files)).not.toContain('private-example');
  expect(JSON.stringify(draft.files)).not.toContain('file-test');
  expect(Object.keys(draft.files).some(p => p.endsWith('.webp'))).toBe(false);
  await blog.updatePost('native-file', 'zh-tw', image.revision, { content: `Body\n${image.markdown}` });
  const op = await blog.preparePublish('native-file', 'zh-tw');
  repo.pass(op.candidate_commit, `mcp/candidates/${op.operation_id}`);
  const ready = await blog.operationStatus(op.operation_id);
  expect((ready.preview as any).uploaded_images[0].url).toBe(image.url);
  expect((await blog.publishPost('native-file', 'zh-tw', ready.confirmation as string)).committed).toBe(true);
});
it('recovers a lost commit response with the same file ID and refreshed URL without downloading again', async () => {
  const { blog, repo, fetcher } = harness();
  const post = await blog.readPost('original', 'zh-tw');
  const create = repo.createRef.bind(repo);
  vi.spyOn(repo, 'createRef').mockImplementationOnce(async (branch, sha) => { await create(branch, sha); throw new Error('Response lost'); });
  await expect(blog.uploadChatGPTImage('original', 'zh-tw', post.revision, 'chart.png', file)).rejects.toThrow('Response lost');
  const before = repo.commits.size;
  const retried = await blog.uploadChatGPTImage('original', 'zh-tw', post.revision, 'chart.png', { ...file, download_url: 'https://files.oaiusercontent.com/file-test?sig=refreshed' });
  expect(retried.already_completed).toBe(true);
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(repo.commits.size).toBe(before);
});
it('rejects stale revisions, MIME mismatches and full drafts before downloading', async () => {
  const { blog, fetcher } = harness();
  const post = await blog.readPost('original', 'zh-tw');
  const changed = await blog.updatePost('original', 'zh-tw', post.revision, { content: 'New content' });
  await expect(blog.uploadChatGPTImage('original', 'zh-tw', post.revision, 'chart.png', file)).rejects.toMatchObject({ code: 'conflict' });
  await expect(blog.uploadChatGPTImage('original', 'zh-tw', changed.revision, 'chart.jpg', file)).rejects.toMatchObject({ code: 'invalid_image' });
  expect(fetcher).not.toHaveBeenCalled();
  let revision = changed.revision;
  for (let n = 0; n < 8; n++) revision = (await blog.uploadChatGPTImage('original', 'zh-tw', revision, `image-${n}.png`, { ...file, file_id: `file-${n}` })).revision;
  await expect(blog.uploadChatGPTImage('original', 'zh-tw', revision, 'extra.png', { ...file, file_id: 'file-extra' })).rejects.toMatchObject({ code: 'conflict' });
  expect(fetcher).toHaveBeenCalledTimes(8);
});
it('keeps the draft unchanged on expired, oversized or invalid original data', async () => {
  for (const response of [new Response(null, { status: 403 }), new Response(null, { headers: { 'Content-Length': String(15 * 1024 * 1024 + 1) } }), new Response('not an image')]) {
    const { blog, r2 } = harness(vi.fn<typeof fetch>(async () => response));
    const post = await blog.readPost('original', 'zh-tw');
    await expect(blog.uploadChatGPTImage('original', 'zh-tw', post.revision, 'chart.png', file)).rejects.toThrow();
    expect((await blog.readPost('original', 'zh-tw')).revision).toBe(post.revision);
    expect(r2.objects.size).toBe(0);
  }
});
it('rejects concurrent native attachments without overwriting a newer draft', async () => {
  const { blog } = harness();
  const post = await blog.readPost('original', 'zh-tw');
  const result = await Promise.allSettled([
    blog.uploadChatGPTImage('original', 'zh-tw', post.revision, 'one.png', file),
    blog.uploadChatGPTImage('original', 'zh-tw', post.revision, 'two.png', { ...file, file_id: 'file-two' }),
  ]);
  expect(result.filter(r => r.status === 'fulfilled')).toHaveLength(1);
  expect((await blog.readPost('original', 'zh-tw')).uploaded_images).toHaveLength(1);
});

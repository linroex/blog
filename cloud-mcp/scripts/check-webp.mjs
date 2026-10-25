// Opt-in image codec check. Set IMAGES_REMOTE_CHECK=1 to use the real Cloudflare
// service via a disposable development session; default is local/offline.
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getPlatformProxy } from 'wrangler';
import sharp from 'sharp';
const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
const remote = process.env.IMAGES_REMOTE_CHECK === '1';
const directory = await mkdtemp(join(tmpdir(), 'blog-webp-check-'));
let proxy;
try {
  await writeFile(join(directory, 'worker.js'), "export default {fetch(){return new Response('codec check')}}");
  const configPath = join(directory, 'wrangler.jsonc');
  await writeFile(configPath, JSON.stringify({ name: `${config.name}-webp-check`, main: 'worker.js', account_id: config.account_id,
    compatibility_date: config.compatibility_date, images: { binding: 'IMAGES', remote } }));
  proxy = await getPlatformProxy({ configPath, remoteBindings: remote, persist: false });
  for (const [filename, transparent, frames] of [['transparent.png', true, 1], ['photo.jpg', false, 1], ['animated.gif', false, 2]]) {
    if (frames > 1 && !remote) {
      console.log('Animation check requires IMAGES_REMOTE_CHECK=1; local Images does not preserve animation.');
      continue;
    }
    const source = await readFile('test/fixtures/' + filename);
    const result = await proxy.env.IMAGES.input(new Response(source).body).output({ format: 'image/webp', quality: 85, anim: true });
    const response = result.response();
    assert.equal(response.headers.get('content-type'), 'image/webp');
    const metadata = await sharp(Buffer.from(await response.arrayBuffer()), { animated: true }).metadata();
    assert.equal(metadata.width, 4);
    assert.equal(metadata.hasAlpha, transparent);
    assert.equal(metadata.pages || 1, frames);
    console.log(JSON.stringify({ input: filename, format: metadata.format, transparency_preserved: transparent ? metadata.hasAlpha : undefined,
      frames: metadata.pages || 1, remote }));
  }
} finally {
  if (proxy) await proxy.dispose();
  await rm(directory, { recursive: true, force: true });
}

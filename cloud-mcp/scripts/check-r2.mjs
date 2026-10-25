// Opt-in real R2 check. Credentials come only from the environment. It creates
// uniquely named disposable objects and removes exactly those objects in finally.
import assert from 'node:assert/strict';
import { randomUUID, createHash } from 'node:crypto';
import { build } from 'esbuild';
import { AwsClient } from 'aws4fetch';
import { createRequire } from 'node:module';
import { mkdtemp, writeFile, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request } from 'node:https';
import { Miniflare, convertV4MiniflareOptions, Response as WorkerResponse } from 'miniflare';
const env = Object.fromEntries(['R2_ACCOUNT_ID', 'R2_BUCKET_NAME', 'R2_PUBLIC_BASE_URL', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY'].map(k => {
  assert.ok(process.env[k], `Missing ${k}`); return [k, process.env[k]];
}));
const compiled = await build({ entryPoints: ['src/r2-images.ts'], bundle: true, platform: 'node', format: 'cjs', write: false });
const directory = await mkdtemp(join(tmpdir(), 'blog-r2-check-'));
let R2Images;
try {
  const modulePath = join(directory, 'r2.cjs');
  await writeFile(modulePath, compiled.outputFiles[0].text);
  ({ R2Images } = createRequire(import.meta.url)(modulePath));
} finally { await rm(directory, { recursive: true, force: true }); }
const storage = new R2Images(env);
const uploadId = randomUUID();
const filename = `check-${uploadId}.png`;
const size = Number(process.env.R2_CHECK_BYTES || 15 * 1024 * 1024);
const bytes = new Uint8Array(size);
bytes.set(await readFile('test/fixtures/transparent.png'));
const digest = createHash('sha256').update(bytes).digest('hex');
const upload = { upload_id: uploadId, user_id: 'integration-test', slug: 'mcp-upload-check', lang: 'zh-tw',
  expected_revision: 'a'.repeat(40), filename, mime_type: 'image/png', size,
  pending_key: `blog-mcp/pending/${uploadId}/${filename}`, upload_expires: Date.now() + 300000,
  expires: Date.now() + 86400000, expected_sha256: digest };
const cleanupKeys = new Set([upload.pending_key]);
const client = new AwsClient({ accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY, service: 's3', region: 'auto', retries: 0 });
// Handle an early 412 response before sending a large replay body. Some fetch
// implementations report that early close as a network error instead of 412.
function put(offer) {
  return new Promise((resolve, reject) => {
    const req = request(offer.upload_url, { method: 'PUT', headers: { ...offer.required_headers, Expect: '100-continue' } }, res => {
      res.resume(); res.on('end', () => resolve(res.statusCode));
    });
    req.on('continue', () => req.end(bytes));
    req.on('error', reject);
    req.setTimeout(60000, () => req.destroy(new Error('PUT timeout')));
    req.flushHeaders();
  });
}
let phase = 'prepare';
let passed = false;
let runtime;
try {
  const worker = await build({ stdin: { contents: `import { R2Images } from './src/r2-images';
    export default { async fetch(request, env) {
      try { return Response.json(await new R2Images(env).complete(await request.json())); }
      catch (error) { return Response.json({ error: error.code || 'runtime_error', type: error.name,
        message: String(error.message).replace(/https?:[^\\s]+/g, '[URL]').replace(/[A-Za-z0-9_+\\/=.-]{32,}/g, '[redacted]').slice(0, 200) }, { status: 500 }); }
    } };`, resolveDir: process.cwd(), sourcefile: 'r2-check-worker.ts' },
    bundle: true, platform: 'browser', format: 'esm', write: false });
  runtime = new Miniflare(convertV4MiniflareOptions({ modules: true, script: worker.outputFiles[0].text,
    compatibilityDate: '2026-10-24', compatibilityFlags: ['nodejs_compat', 'global_fetch_strictly_public'], bindings: env,
    images: { binding: 'IMAGES' },
    outboundService: async request => {
      const url = new URL(request.url);
      assert.equal(url.hostname, `${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`);
      const key = url.pathname.slice(env.R2_BUCKET_NAME.length + 2);
      if (request.method === 'PUT' && key.startsWith(`blog-mcp/images/${upload.slug}/`) && key.endsWith('/' + filename.replace('.png', '.webp'))) cleanupKeys.add(key);
      const response = await fetch(url, { method: request.method, headers: request.headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : Buffer.from(await request.arrayBuffer()), redirect: 'manual' });
      return new WorkerResponse(request.method === 'HEAD' || response.status === 204 ? null : await response.arrayBuffer(), { status: response.status, headers: response.headers });
    } }));
  env.IMAGES = await runtime.getImagesBinding('IMAGES');
  const offer = await storage.offer(upload);
  assert.equal(new URL(offer.upload_url).searchParams.get('X-Amz-Expires'), '300');
  phase = 'raw PUT';
  assert.equal(await put(offer), 200);
  phase = 'conditional overwrite rejection';
  assert.equal(await put(offer), 412);
  phase = 'completion';

  const completed = await runtime.dispatchFetch('http://localhost/complete', { method: 'POST', body: JSON.stringify(upload) });
  if (completed.status !== 200) console.error('workerd completion:', await completed.text());
  assert.equal(completed.status, 200);
  const asset = await completed.json();
  assert.equal(asset.original.sha256, digest);
  assert.equal(asset.original.size, size);
  assert.equal(asset.mime_type, 'image/webp');
  assert.ok(asset.filename.endsWith('.webp'));
  cleanupKeys.add(asset.key);
  // The retained pending object lets completion retry if the Git commit fails.
  assert.equal((await storage.complete(upload)).key, asset.key);
  phase = 'public read';
  const publicRead = await fetch(asset.url, { redirect: 'error' });
  assert.equal(publicRead.status, 200);
  assert.equal(createHash('sha256').update(new Uint8Array(await publicRead.arrayBuffer())).digest('hex'), asset.sha256);
  passed = true;
} catch {
  console.error(`R2 integration failed during ${phase}; signed URLs and credentials omitted`);
  process.exitCode = 1;
} finally {
  if (runtime) await runtime.dispose();
  let cleaned = true;
  for (const key of cleanupKeys) {
    const url = `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.R2_BUCKET_NAME}/${key}`;
    try {
      const removed = await fetch(await client.sign(url, { method: 'DELETE' }));
      const absent = await fetch(await client.sign(url, { method: 'HEAD' }));
      if (!removed.ok || absent.status !== 404) cleaned = false;
    } catch { cleaned = false; }
  }
  if (!cleaned) { console.error('R2 integration object cleanup needs attention'); process.exitCode = 1; }
  console.log(JSON.stringify({ passed, bytes: size, presigned_ttl_seconds: 300, overwrite_rejected: passed,
    webp_conversion_verified: passed, public_hash_verified: passed, disposable_objects_removed: cleaned }));
}

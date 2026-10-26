import { AwsClient } from 'aws4fetch';
import { checkImageName, imageBytes, MAX_IMAGE_BYTES, webpFilename, type ImageAsset } from './images';
import { BlogError, type Env, type Lang } from './types';

export const UPLOAD_SECONDS = 300;
export interface ImageUpload {
  upload_id: string; user_id: string; slug: string; lang: Lang; expected_revision: string;
  filename: string; mime_type: string; size: number; pending_key: string;
  upload_expires: number; expires: number; expected_sha256?: string;
}
export interface ImageStorage {
  maximum: number;
  offer(upload: ImageUpload): Promise<{ upload_url: string; required_headers: Record<string, string> }>;
  complete(upload: ImageUpload): Promise<ImageAsset>;
  store(upload: ImageUpload, bytes: Uint8Array): Promise<ImageAsset>;
  verify(asset: ImageAsset, slug: string): Promise<void>;
  discard(upload: ImageUpload): Promise<void>;
}

export function imageLimit(env: Env): number {
  const maximum = env.IMAGE_MAX_BYTES === undefined ? MAX_IMAGE_BYTES : Number(env.IMAGE_MAX_BYTES);
  if (!Number.isSafeInteger(maximum) || maximum < 1 || maximum > MAX_IMAGE_BYTES) throw new BlogError('configuration', `IMAGE_MAX_BYTES must be between 1 and ${MAX_IMAGE_BYTES}`);
  return maximum;
}
export function validateUpload(filename: string, mime: string, size: number, maximum: number) {
  if (checkImageName(filename) !== mime) throw new BlogError('invalid_image', 'MIME type must match the filename extension');
  if (!Number.isSafeInteger(size) || size < 1 || size > maximum) throw new BlogError('invalid_image', `Image size must be between 1 and ${maximum} bytes`);
}

/** Only server-generated keys and the configured S3 endpoint may be accessed. */
export class R2Images implements ImageStorage {
  readonly maximum: number;
  constructor(private env: Env, private fetcher: typeof fetch = fetch) { this.maximum = imageLimit(env); }

  private config() {
    const e = this.env;
    if (!e.R2_ACCOUNT_ID || !e.R2_BUCKET_NAME || !e.R2_PUBLIC_BASE_URL || !e.R2_ACCESS_KEY_ID || !e.R2_SECRET_ACCESS_KEY) {
      throw new BlogError('images_not_configured', 'Configure R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_PUBLIC_BASE_URL and the two R2 Worker secrets before using image uploads');
    }
    if (!/^[a-f0-9]{32}$/.test(e.R2_ACCOUNT_ID) || !/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(e.R2_BUCKET_NAME)) throw new BlogError('configuration', 'Invalid R2 account or bucket');
    const publicURL = new URL(e.R2_PUBLIC_BASE_URL);
    if (publicURL.protocol !== 'https:' || publicURL.username || publicURL.password || publicURL.search || publicURL.hash) throw new BlogError('configuration', 'R2_PUBLIC_BASE_URL must be a public HTTPS base URL');
    const client = new AwsClient({ accessKeyId: e.R2_ACCESS_KEY_ID, secretAccessKey: e.R2_SECRET_ACCESS_KEY, region: 'auto', service: 's3', retries: 0 });
    return { client, endpoint: `https://${e.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${e.R2_BUCKET_NAME}`,
      publicBase: e.R2_PUBLIC_BASE_URL.replace(/\/$/, '') };
  }
  private objectURL(key: string): string {
    if (!/^blog-mcp\/(?:pending|images)\/[a-zA-Z0-9/.-]+$/.test(key) || key.split('/').some(p => !p || p === '.' || p === '..')) throw new BlogError('invalid_image', 'Invalid R2 image key');
    return `${this.config().endpoint}/${key.split('/').map(encodeURIComponent).join('/')}`;
  }
  private async request(key: string, method: string, headers?: HeadersInit, body?: Uint8Array): Promise<Response> {
    const signedHeaders = new Headers(headers);
    if (body) signedHeaders.set('x-amz-content-sha256', 'UNSIGNED-PAYLOAD');
    const signed = await this.config().client.sign(this.objectURL(key), { method, headers: signedHeaders, body: body as BodyInit | undefined, redirect: 'manual' });
    const fetcher = this.fetcher;
    try { return await fetcher(signed, { signal: AbortSignal.timeout(60_000), redirect: 'manual' }); }
    catch { throw new BlogError('r2_unavailable', 'R2 request failed; reread the article before retrying completion'); }
  }
  private check(response: Response) {
    if (!response.ok) throw new BlogError('r2_error', `R2 returned ${response.status}; check bucket credentials and object permissions`);
  }
  async offer(upload: ImageUpload) {
    validateUpload(upload.filename, upload.mime_type, upload.size, this.maximum);
    if (upload.mime_type !== 'image/webp' && !this.env.IMAGES) throw new BlogError('images_not_configured', 'Configure the IMAGES binding before uploading PNG, JPEG or GIF for WebP conversion');
    const url = new URL(this.objectURL(upload.pending_key));
    url.searchParams.set('X-Amz-Expires', String(UPLOAD_SECONDS));
    // Bind the actual HTTP byte length and make the pending key create-once.
    const required_headers = { 'Content-Type': upload.mime_type, 'Content-Length': String(upload.size), 'If-None-Match': '*' };
    const signed = await this.config().client.sign(url, { method: 'PUT', headers: required_headers,
      aws: { signQuery: true, allHeaders: true } });
    return { upload_url: signed.url, required_headers };
  }
  private finalKey(slug: string, asset: ImageAsset) { return `blog-mcp/images/${slug}/${asset.sha256}/${asset.filename}`; }
  async complete(upload: ImageUpload): Promise<ImageAsset> {
    validateUpload(upload.filename, upload.mime_type, upload.size, this.maximum);
    if (upload.pending_key !== `blog-mcp/pending/${upload.upload_id}/${upload.filename}`) throw new BlogError('invalid_image', 'Upload key does not match its ticket');
    const head = await this.request(upload.pending_key, 'HEAD');
    if (head.status === 404) throw new BlogError('upload_required', 'Image has not arrived in R2; PUT the raw file bytes to upload_url before completing');
    this.check(head);
    if (Number(head.headers.get('content-length')) !== upload.size) throw new BlogError('invalid_image', 'Uploaded size differs from the prepared size');
    const etag = head.headers.get('etag');
    if (!etag) throw new BlogError('r2_error', 'R2 did not return an image ETag');
    const response = await this.request(upload.pending_key, 'GET', { 'If-Match': etag });
    this.check(response);
    if (!response.body) throw new BlogError('invalid_image', 'Uploaded image is empty');
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      length += next.value.length;
      if (length > upload.size || length > this.maximum) { await reader.cancel(); throw new BlogError('invalid_image', 'Uploaded image exceeds the prepared size'); }
      chunks.push(next.value);
    }
    if (length !== upload.size) throw new BlogError('invalid_image', 'Uploaded image was truncated');
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    chunks.length = 0;
    return this.store(upload, bytes);
  }
  async store(upload: ImageUpload, bytes: Uint8Array): Promise<ImageAsset> {
    validateUpload(upload.filename, upload.mime_type, upload.size, this.maximum);
    if (bytes.length !== upload.size) throw new BlogError('invalid_image', 'Image size differs from the original size');
    const original = await imageBytes(upload.filename, bytes, this.maximum);
    if (upload.expected_sha256 && original.sha256 !== upload.expected_sha256) throw new BlogError('invalid_image', 'Uploaded image SHA-256 differs from the prepared hash');
    const converted = await this.webp(original, bytes);
    const checked = converted.asset;
    const key = this.finalKey(upload.slug, checked);
    const asset: ImageAsset = { ...checked, storage: 'r2', key, upload_id: upload.upload_id,
      url: `${this.config().publicBase}/${key}` };
    const stored = await this.request(key, 'PUT', { 'Content-Type': checked.mime_type,
      'Cache-Control': 'public, max-age=31536000, immutable', 'If-None-Match': '*',
      'x-amz-meta-sha256': checked.sha256 }, converted.bytes);
    if (stored.status !== 412) this.check(stored);
    await this.verify(asset, upload.slug);
    return asset;
  }
  private async webp(original: ImageAsset, bytes: Uint8Array): Promise<{ asset: ImageAsset; bytes: Uint8Array }> {
    if (original.mime_type === 'image/webp') return { asset: original, bytes };
    if (!this.env.IMAGES) throw new BlogError('images_not_configured', 'WebP conversion requires the IMAGES binding');
    let response: Response;
    try {
      const result = await this.env.IMAGES.input(new Response(bytes as BodyInit).body!)
        .output({ format: 'image/webp', quality: 85, anim: true });
      response = result.response();
    } catch { throw new BlogError('image_conversion_failed', 'Cloudflare could not convert the image to WebP; the draft has not changed. Check image validity and Images quota before retrying.'); }
    if (!response.ok || response.headers.get('content-type')?.split(';')[0] !== 'image/webp' || !response.body) throw new BlogError('image_conversion_failed', 'Cloudflare did not return a WebP image; the draft has not changed');
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      length += next.value.length;
      if (length > this.maximum) { await reader.cancel(); throw new BlogError('invalid_image', 'Converted WebP exceeds the image size limit; use a smaller image'); }
      chunks.push(next.value);
    }
    const converted = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { converted.set(chunk, offset); offset += chunk.length; }
    const asset = await imageBytes(webpFilename(original.filename), converted, this.maximum);
    return { asset: { ...asset, original }, bytes: converted };
  }
  async discard(upload: ImageUpload) {
    // Only after Git has durably recorded this upload. A failed cleanup is safe.
    try { await this.request(upload.pending_key, 'DELETE'); } catch { /* Pending-object audit can retry. */ }
  }
  async verify(asset: ImageAsset, slug: string): Promise<void> {
    if (asset.storage !== 'r2' || asset.key !== this.finalKey(slug, asset) || asset.url !== `${this.config().publicBase}/${asset.key}`) throw new BlogError('invalid_image', 'R2 image identity or public URL changed');
    const response = await this.request(asset.key, 'HEAD');
    this.check(response);
    if (Number(response.headers.get('content-length')) !== asset.size || response.headers.get('x-amz-meta-sha256') !== asset.sha256 || response.headers.get('content-type')?.split(';')[0] !== asset.mime_type) throw new BlogError('invalid_image', 'R2 image metadata no longer matches the approved asset');
  }
}

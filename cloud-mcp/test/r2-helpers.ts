import { URL as NodeURL } from 'node:url';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { R2Images } from '../src/r2-images';
import { env, setup } from './helpers';

export const png = Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'));
export const webp = Uint8Array.from(readFileSync(new NodeURL('./fixtures/transparent.webp', import.meta.url)));
export const imageBinding = { input(_stream: ReadableStream<Uint8Array>) { return { async output(_options: unknown) { return { response: () => new Response(webp, { headers: { 'Content-Type': 'image/webp' } }) }; } }; } };
export const r2Env = { ...env, R2_ACCOUNT_ID: 'a'.repeat(32), R2_BUCKET_NAME: 'images',
  R2_PUBLIC_BASE_URL: 'https://images.example.com', IMAGES: imageBinding, R2_ACCESS_KEY_ID: 'test-key', R2_SECRET_ACCESS_KEY: 'test-secret' };
export class FakeR2 {
  objects = new Map<string, { bytes: Uint8Array; headers: Headers; etag: string }>();
  requests: Request[] = [];
  fail = false;
  fetch: typeof fetch = async (input, init) => {
    const req = new Request(input, init);
    this.requests.push(req.clone());
    if (this.fail) return new Response(null, { status: 503 });
    const key = new URL(req.url).pathname.replace('/images/', '');
    const object = this.objects.get(key);
    if (req.method === 'PUT') {
      if (req.headers.get('if-none-match') === '*' && object) return new Response(null, { status: 412 });
      const bytes = new Uint8Array(await req.arrayBuffer());
      const headers = new Headers(req.headers);
      headers.set('content-length', String(bytes.length));
      const etag = '"' + createHash('md5').update(bytes).digest('hex') + '"';
      this.objects.set(key, { bytes, headers, etag });
      return new Response(null, { headers: { etag } });
    }
    if (req.method === 'DELETE') { this.objects.delete(key); return new Response(null, { status: 204 }); }
    if (!object) return new Response(null, { status: 404 });
    if (req.headers.has('if-match') && req.headers.get('if-match') !== object.etag) return new Response(null, { status: 412 });
    const headers = new Headers(object.headers);
    headers.set('etag', object.etag);
    return new Response(req.method === 'HEAD' ? null : object.bytes.slice(), { headers });
  };
  async put(offer: { upload_url: string; required_headers: Record<string, string> }, bytes = png) {
    return this.fetch(offer.upload_url, { method: 'PUT', headers: offer.required_headers, body: bytes as BodyInit });
  }
}
export function imageSetup() {
  const r2 = new FakeR2();
  const storage = new R2Images(r2Env, r2.fetch);
  return { ...setup(storage), r2, storage };
}

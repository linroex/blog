import { unbase64 } from './crypto';
import { postPath } from './document';
import { BlogError } from './types';

export const MAX_IMAGE_BYTES = 1024 * 1024;
export const MAX_IMAGES = 8;
export const MAX_IMAGE_BASE64 = 4 * Math.ceil(MAX_IMAGE_BYTES / 3);
export const IMAGE_NAME = /^[a-z0-9][a-z0-9-]{0,79}\.(png|jpg|jpeg|gif|webp)$/;
export interface ImageAsset { filename: string; sha256: string; size: number; mime_type: string }

export function imagePath(slug: string, filename: string): string {
  postPath(slug, 'zh-tw');
  if (!IMAGE_NAME.test(filename)) throw new BlogError('invalid_image', 'Use a lowercase image filename with letters, digits and hyphens, ending in png, jpg, jpeg, gif or webp');
  return `content/posts/${slug}/images/${filename}`;
}
export async function imageAsset(filename: string, encoded: string): Promise<ImageAsset> {
  imagePath('image', filename);
  if (typeof encoded !== 'string' || !encoded.length || encoded.length > MAX_IMAGE_BASE64 ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)) {
    throw new BlogError('invalid_image', 'Provide standard padded base64 without a data URL prefix, up to 1 MiB decoded');
  }
  const bytes = unbase64(encoded);
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new BlogError('invalid_image', 'Images must be between 1 byte and 1 MiB');
  const starts = (...prefix: number[]) => prefix.every((b, i) => bytes[i] === b);
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.subarray(start, end));
  let mime: string | undefined;
  if (starts(137, 80, 78, 71, 13, 10, 26, 10)) mime = 'image/png';
  else if (starts(255, 216, 255)) mime = 'image/jpeg';
  else if (['GIF87a', 'GIF89a'].includes(ascii(0, 6))) mime = 'image/gif';
  else if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') mime = 'image/webp';
  const expected = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp' }[filename.split('.').pop()!];
  if (!mime || mime !== expected) throw new BlogError('invalid_image', 'Image signature does not match the filename extension');
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return { filename, sha256: Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join(''), size: bytes.length, mime_type: mime };
}
export function imageManifest(value: unknown): ImageAsset[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > MAX_IMAGES) throw new BlogError('invalid_image', 'A draft supports at most 8 uploaded images');
  const names = new Set<string>();
  for (const asset of value) {
    if (!asset || typeof asset.filename !== 'string' || !IMAGE_NAME.test(asset.filename) || names.has(asset.filename) ||
        typeof asset.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(asset.sha256) ||
        !['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(asset.mime_type) ||
        !Number.isInteger(asset.size) || asset.size < 1 || asset.size > MAX_IMAGE_BYTES) {
      throw new BlogError('invalid_image', 'Invalid image manifest');
    }
    names.add(asset.filename);
  }
  return value;
}
export function imageView(slug: string, asset: ImageAsset) {
  return { ...asset, path: imagePath(slug, asset.filename), relative_url: `images/${asset.filename}`, markdown: `![](images/${asset.filename})` };
}

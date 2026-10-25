import { unbase64 } from './crypto';
import { postPath } from './document';
import { BlogError } from './types';

export const LEGACY_IMAGE_BYTES = 1024 * 1024;
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
// Preserve already uploaded assets and outstanding publication candidates.
export const HARD_IMAGE_BYTES = 25 * 1024 * 1024;
export const MAX_IMAGES = 8;
export const MAX_IMAGE_BASE64 = 4 * Math.ceil(LEGACY_IMAGE_BYTES / 3);
export const IMAGE_NAME = /^[a-z0-9][a-z0-9-]{0,79}\.(png|jpg|jpeg|gif|webp)$/;
export interface ImageAsset {
  filename: string; sha256: string; size: number; mime_type: string;
  storage?: 'r2'; key?: string; url?: string; upload_id?: string;
  original?: { filename: string; sha256: string; size: number; mime_type: string };
}
export const IMAGE_TYPES: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp' };

export function checkImageName(filename: string): string {
  if (!IMAGE_NAME.test(filename)) throw new BlogError('invalid_image', 'Use a lowercase image filename with letters, digits and hyphens, ending in png, jpg, jpeg, gif or webp');
  return IMAGE_TYPES[filename.split('.').pop()!];
}
export function webpFilename(filename: string) { checkImageName(filename); return filename.replace(/\.[^.]+$/, '.webp'); }

export function imagePath(slug: string, filename: string): string {
  postPath(slug, 'zh-tw');
  checkImageName(filename);
  return `content/posts/${slug}/images/${filename}`;
}
export async function imageAsset(filename: string, encoded: string): Promise<ImageAsset> {
  checkImageName(filename);
  if (typeof encoded !== 'string' || !encoded.length || encoded.length > MAX_IMAGE_BASE64 ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)) {
    throw new BlogError('invalid_image', 'Invalid legacy image base64');
  }
  const bytes = unbase64(encoded);
  return imageBytes(filename, bytes, LEGACY_IMAGE_BYTES);
}
export async function imageBytes(filename: string, bytes: Uint8Array, maximum = MAX_IMAGE_BYTES): Promise<ImageAsset> {
  const expected = checkImageName(filename);
  if (!bytes.length || bytes.length > maximum) throw new BlogError('invalid_image', `Images must be between 1 byte and ${maximum} bytes`);
  const starts = (...prefix: number[]) => prefix.every((b, i) => bytes[i] === b);
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.subarray(start, end));
  let mime: string | undefined;
  if (starts(137, 80, 78, 71, 13, 10, 26, 10)) mime = 'image/png';
  else if (starts(255, 216, 255)) mime = 'image/jpeg';
  else if (['GIF87a', 'GIF89a'].includes(ascii(0, 6))) mime = 'image/gif';
  else if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') mime = 'image/webp';
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
        IMAGE_TYPES[asset.filename.split('.').pop()!] !== asset.mime_type ||
        !Number.isInteger(asset.size) || asset.size < 1 || asset.size > (asset.storage === 'r2' ? HARD_IMAGE_BYTES : LEGACY_IMAGE_BYTES)) {
      throw new BlogError('invalid_image', 'Invalid image manifest');
    }
    if (asset.storage === 'r2') {
      if (typeof asset.upload_id !== 'string' || !/^[a-f0-9-]{36}$/.test(asset.upload_id) ||
          typeof asset.key !== 'string' || !/^blog-mcp\/images\/[a-z0-9-]+\/[a-f0-9]{64}\/[a-z0-9.-]+$/.test(asset.key) ||
          typeof asset.url !== 'string' || !asset.url.startsWith('https://') || asset.url.length > 2048) throw new BlogError('invalid_image', 'Invalid R2 image manifest');
      if (asset.original !== undefined) {
        const original = asset.original;
        if (!original || typeof original.filename !== 'string' || !IMAGE_NAME.test(original.filename) ||
            original.mime_type !== IMAGE_TYPES[original.filename.split('.').pop()!] ||
            typeof original.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(original.sha256) || !Number.isInteger(original.size) ||
            original.size < 1 || original.size > MAX_IMAGE_BYTES || asset.size > MAX_IMAGE_BYTES ||
            asset.mime_type !== 'image/webp' || asset.filename !== webpFilename(original.filename)) throw new BlogError('invalid_image', 'Invalid converted image manifest');
      }
    } else if (asset.storage !== undefined) throw new BlogError('invalid_image', 'Unknown image storage');
    names.add(asset.filename);
  }
  return value;
}
export function imageView(slug: string, asset: ImageAsset) {
  if (asset.storage === 'r2') return { ...asset, preview_url: asset.url, markdown: `![](${asset.url})` };
  return { ...asset, path: imagePath(slug, asset.filename), relative_url: `images/${asset.filename}`, markdown: `![](images/${asset.filename})` };
}

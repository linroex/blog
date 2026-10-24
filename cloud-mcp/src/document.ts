import { parseDocument } from 'yaml';
import { BlogError, type Lang } from './types';

export const MAX_POST_BYTES = 2 * 1024 * 1024;
export const LANGS = ['zh-tw', 'en', 'ja'] as const;
export function postPath(slug: string, lang: Lang): string {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100 || !LANGS.includes(lang)) {
    throw new BlogError('invalid_post', 'Invalid slug or language');
  }
  return `content/posts/${slug}/index${lang === 'zh-tw' ? '' : `.${lang}`}.md`;
}
export function checkSize(raw: string): void {
  if (new TextEncoder().encode(raw).length > MAX_POST_BYTES || raw.includes('\0')) {
    throw new BlogError('invalid_post', 'Post exceeds 2 MiB or contains a NUL character');
  }
}
export function document(raw: string) {
  checkSize(raw);
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(raw);
  if (!match) throw new BlogError('invalid_frontmatter', 'Post must have YAML frontmatter');
  const yaml = parseDocument(match[1], { uniqueKeys: true });
  if (yaml.errors.length) throw new BlogError('invalid_frontmatter', 'Post has invalid YAML frontmatter');
  const metadata = yaml.toJS({ maxAliasCount: 30 }) as Record<string, unknown>;
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) throw new BlogError('invalid_frontmatter', 'Frontmatter must be a mapping');
  return { yaml, metadata, content: match[2].replace(/^\r?\n/, '') };
}
export function edit(raw: string, fields: Record<string, unknown>, content?: string): string {
  const doc = document(raw);
  for (const [key, value] of Object.entries(fields)) doc.yaml.set(key, value);
  const body = content ?? doc.content;
  if (!body.trim()) throw new BlogError('invalid_post', 'Article content cannot be empty');
  const result = `---\n${doc.yaml.toString()}---\n\n${body}${body.endsWith('\n') ? '' : '\n'}`;
  checkSize(result);
  return result;
}
export function newDocument(fields: Record<string, unknown>, content: string): string {
  return edit('---\ndraft: true\n---\n\nplaceholder\n', fields, content);
}
export function taipeiDate(): string {
  return new Date(Date.now() + 8 * 3600_000).toISOString().replace(/\.\d{3}Z$/, '+08:00');
}

import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { Blog } from './blog';
import { BlogError } from './types';
import { IMAGE_NAME, MAX_IMAGE_BYTES } from './images';

const lang = z.enum(['zh-tw', 'en', 'ja']).default('zh-tw');
const slug = z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const sha = z.string().regex(/^[a-f0-9]{40}$/);
const content = z.string().min(1).max(2 * 1024 * 1024);
const title = z.string().trim().min(1).max(200);
const list = z.array(z.string().trim().min(1).max(80)).max(30);
const fields = { title: title.optional(), content: content.optional(), tags: list.optional(), categories: list.optional(), summary: z.string().max(500).optional() };

export function createServer(blog: Blog) {
  const server = new McpServer({ name: 'lins-hugo-blog-cloud', version: '1.5.0' }, {
    instructions: 'Manage only this owner’s blog. In ChatGPT use upload_image with native file input for attachments; do not run curl. Draft branches are public if the repository is public. Read before editing and supply the revision. Prepare publication, poll validation, show the full preview, then obtain explicit user approval before publish_post. A confirmation token is a version identifier, not human consent. Poll deployment separately. Never claim a commit means the website is live.',
  });
  function tool<S extends z.ZodRawShape>(name: string, description: string, shape: S, readOnly: boolean,
    handler: (input: z.infer<z.ZodObject<S>>) => Promise<unknown>, meta?: Record<string, unknown>) {
    server.registerTool(name, { description, inputSchema: z.object(shape).strict(),
      ...(meta ? { _meta: meta } : {}),
      annotations: { readOnlyHint: readOnly, destructiveHint: !readOnly, openWorldHint: true } }, async input => {
      try {
        const result = await handler(input as z.infer<z.ZodObject<S>>);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result) }], structuredContent: result as Record<string, unknown> };
      } catch (error) {
        const known = error instanceof BlogError;
        return { isError: true, content: [{ type: 'text' as const, text: JSON.stringify({ error: known ? error.code : 'internal_error',
          message: known ? error.message : 'Operation failed. For a write, inspect repository/operation status before retrying.' }) }] };
      }
    });
  }
  tool('list_posts', 'List indexed main-branch articles newest publication date first (unknown dates last; ties by slug), plus a separate page of active drafts. Follow next_draft_offset until null. index_stale means article or index-generator sources changed; different commit IDs alone do not mean stale content. read_post is authoritative.', {
    query: z.string().max(200).default(''), offset: z.number().int().min(0).default(0), limit: z.number().int().min(1).max(50).default(20),
    draft_offset: z.number().int().min(0).default(0),
    draft_limit: z.number().int().min(1).max(10).default(5),
  }, true, a => blog.listPosts(a.query, a.offset, a.limit, a.draft_offset, a.draft_limit));
  tool('read_post', 'Read the latest active draft (auto), or explicitly select draft/published. Returns revision for updates.', {
    slug, lang, source: z.enum(['auto', 'draft', 'published']).default('auto'),
  }, true, a => blog.readPost(a.slug, a.lang, a.source));
  tool('create_post', 'Save a new article or translation to a GitHub draft branch. Does not change the live site. Translations require an original.', {
    slug, lang, ...fields, title, content,
  }, false, a => blog.createPost(a.slug, a.lang, a));
  tool('update_post', 'Save draft changes with optimistic concurrency. Always sets draft true. To resolve an external publication conflict, read both versions, merge the content, and supply expected_published_revision from read_post(source=published) along with the complete merged content.', {
    slug, lang, expected_revision: sha, expected_published_revision: sha.optional(), ...fields,
  }, false, a => { const { slug: s, lang: l, expected_revision, expected_published_revision, ...updates } = a; return blog.updatePost(s, l, expected_revision, updates, expected_published_revision); });
  tool('delete_draft', 'Delete only the specified language draft after reading it and supplying expected_revision. Removes it from active drafts and invalidates pending publication confirmations; never changes the published article or other languages. Uses a version-checked archive marker: Git history, candidate branches and uploaded images remain accessible, so this is not permanent content erasure. Retrying the same deleted revision is safe. A new article can be created again with create_post; use update_post on a published article to start a fresh draft.', {
    slug, lang, expected_revision: sha,
  }, false, a => blog.deleteDraft(a.slug, a.lang, a.expected_revision));
  tool('upload_image', 'ChatGPT attachment upload: use this tool when the image is attached or generated in ChatGPT. Pass its native file reference; ChatGPT supplies the download_url and file_id automatically. The server downloads the original, validates at most 15 MiB, converts PNG/JPEG/GIF to WebP (preserving transparency and animation), stores it on R2 and attaches metadata to the draft. Existing WebP bytes are preserved. Returns final Markdown and a new revision for update_post. Do not run curl, prepare_image_upload or complete_image_upload for this path. Choose a lowercase filename with the original image extension. Never invent file references or pass local paths/base64; if ChatGPT cannot supply the reference, report that it is unavailable. Retrying the same file_id, article and filename is safe. Does not publish the article.', {
    slug, lang, expected_revision: sha, filename: z.string().max(85).regex(IMAGE_NAME),
    file: z.object({
      download_url: z.string().min(1).max(8192), file_id: z.string().min(1).max(256),
      mime_type: z.string().max(200).optional(), file_name: z.string().max(1024).optional(),
    }).strict(),
  }, false, a => blog.uploadChatGPTImage(a.slug, a.lang, a.expected_revision, a.filename, a.file), { 'openai/fileParams': ['file'] });
  tool('prepare_image_upload', 'For clients with original file access and outbound HTTPS PUT (such as Claude): prepare a 5-minute R2 PUT URL for PNG/JPEG/GIF/WebP, up to 15 MiB each and 8 images per language draft. In ChatGPT use upload_image with native attachments instead. Requires an existing article and expected_revision. This tool sends no image bytes and does not change the article. Completion converts PNG/JPEG/GIF to WebP; existing WebP stays unchanged. Supply the original file metadata and use the final returned Markdown. Use a file/network execution tool to PUT raw bytes with all returned headers, then complete_image_upload. Requires access to the original file and outbound HTTPS; do not assume a chat attachment is automatically accessible.', {
    slug, lang, expected_revision: sha, filename: z.string().max(85).regex(IMAGE_NAME),
    mime_type: z.enum(['image/png', 'image/jpeg', 'image/gif', 'image/webp']), size: z.number().int().min(1).max(MAX_IMAGE_BYTES),
    sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(),
  }, false, a => blog.prepareImageUpload(a.slug, a.lang, a.expected_revision, a.filename, a.mime_type, a.size, a.sha256));
  tool('complete_image_upload', 'After raw bytes were PUT to R2: validate the original size/type/hash, automatically convert PNG/JPEG/GIF to WebP at quality 85 while preserving transparency and animation, keep existing WebP bytes, then save an immutable public R2 image and attach its metadata to the draft. Returns permanent image URL, Markdown and new revision for update_post. Repeating the same completed ticket is safe. Does not publish the article. Completion tickets last 24 hours; upload URLs last 5 minutes.', {
    upload_ticket: z.string().min(1).max(8192),
  }, false, a => blog.completeImageUpload(a.upload_ticket));
  tool('prepare_publish', 'Create a single-article candidate including its uploaded images on the latest main and start Hugo/SEO validation in GitHub Actions. This writes a candidate branch but does not publish.', {
    slug, lang,
  }, false, a => blog.preparePublish(a.slug, a.lang));
  tool('get_operation_status', 'Poll validation or deployment, no more often than once every 5 seconds. When ready returns the full preview and a 24-hour version-bound confirmation. After publishing also reconciles draft bookkeeping if an earlier request was interrupted.', {
    operation_id: z.string().uuid(),
  }, false, a => blog.operationStatus(a.operation_id));
  tool('publish_post', 'Only after explicit user approval of the full validated preview: fast-forward main to that exact candidate. Rejects changed versions; safely retry the same confirmation after a lost response.', {
    slug, lang, confirmation: z.string().max(4096),
  }, false, a => blog.publishPost(a.slug, a.lang, a.confirmation));
  tool('get_repo_status', 'Read the configured GitHub repository and main commit. Does not imply deployment success.', {}, true, () => blog.repoStatus());
  tool('read_config', 'Read hugo.toml from the current main branch.', {}, true, () => blog.readConfig());
  return server;
}

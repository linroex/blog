import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { Blog } from './blog';
import { BlogError } from './types';
import { IMAGE_NAME, MAX_IMAGE_BASE64 } from './images';

const lang = z.enum(['zh-tw', 'en', 'ja']).default('zh-tw');
const slug = z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const sha = z.string().regex(/^[a-f0-9]{40}$/);
const content = z.string().min(1).max(2 * 1024 * 1024);
const title = z.string().trim().min(1).max(200);
const list = z.array(z.string().trim().min(1).max(80)).max(30);
const fields = { title: title.optional(), content: content.optional(), tags: list.optional(), categories: list.optional(), summary: z.string().max(500).optional() };

export function createServer(blog: Blog) {
  const server = new McpServer({ name: 'lins-hugo-blog-cloud', version: '1.1.0' }, {
    instructions: 'Manage only this owner’s blog. Draft branches are public if the repository is public. Read before editing and supply the revision. Prepare publication, poll validation, show the full preview, then obtain explicit user approval before publish_post. A confirmation token is a version identifier, not human consent. Poll deployment separately. Never claim a commit means the website is live.',
  });
  function tool<S extends z.ZodRawShape>(name: string, description: string, shape: S, readOnly: boolean,
    handler: (input: z.infer<z.ZodObject<S>>) => Promise<unknown>) {
    server.registerTool(name, { description, inputSchema: z.object(shape).strict(),
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
  tool('list_posts', 'List the indexed main-branch articles and a separate page of active drafts. Follow next_draft_offset until null. index_stale signals deployment lag; read_post is authoritative.', {
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
  tool('upload_image', 'Upload PNG/JPEG/GIF/WebP as standard base64 (no data URL prefix), up to 1 MiB each and 8 images per draft. Requires an existing article and its expected_revision. Saves to a public GitHub draft branch, returning Markdown and a new revision for update_post. Image names cannot overwrite different content; use a new filename to replace an image. Publication includes these images after preview approval.', {
    slug, lang, expected_revision: sha, filename: z.string().max(85).regex(IMAGE_NAME),
    data_base64: z.string().min(1).max(MAX_IMAGE_BASE64),
  }, false, a => blog.uploadImage(a.slug, a.lang, a.expected_revision, a.filename, a.data_base64));
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

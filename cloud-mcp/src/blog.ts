import { sha256, sign, verify } from './crypto';
import { document, edit, newDocument, postPath, taipeiDate } from './document';
import { imageAsset, imageManifest, imagePath, imageView, MAX_IMAGES, webpFilename, type ImageAsset } from './images';
import { R2Images, UPLOAD_SECONDS, validateUpload, type ImageStorage, type ImageUpload } from './r2-images';
import { BlogError, type Env, type FileChange, type FileContent, type Lang, type Repository } from './types';

const META_PATH = '.mcp/draft.json';
const CANDIDATE_PREFIX = 'Blog MCP candidate\n\n';
const SHA = /^[a-f0-9]{40}$/;
export interface DraftMeta {
  slug: string; lang: Lang; base_post_sha: string | null; published_commit?: string; images?: ImageAsset[];
}
interface Candidate {
  operation_id: string; user_id: string; slug: string; lang: Lang;
  draft_revision: string; base_main: string; content_sha256: string; expires: number;
  images?: ImageAsset[];
}
interface Confirmation { operation_id: string; candidate_commit: string; user_id: string; expires: number }
export interface PostFields {
  title?: string; content?: string; tags?: string[]; categories?: string[]; summary?: string;
}
export interface ArticleIndex {
  schema_version: number; commit: string;
  posts: { slug: string; title: string; summary: string; draft: boolean; translations: string[]; [key: string]: unknown }[];
}

export class Blog {
  constructor(private repo: Repository, private env: Env, private userId: string,
    private loadIndex: () => Promise<ArticleIndex>, private imageStorage: ImageStorage = new R2Images(env)) {}

  private branch(slug: string, lang: Lang) { postPath(slug, lang); return `mcp/drafts/${slug}/${lang}`; }
  private async main() {
    const head = await this.repo.head(this.env.GITHUB_BRANCH);
    if (!head) throw new BlogError('missing_main', 'Configured main branch does not exist');
    return head;
  }
  private async draft(slug: string, lang: Lang) {
    const branch = this.branch(slug, lang);
    const revision = await this.repo.head(branch);
    if (!revision) return null;
    const metadata = await this.repo.file(META_PATH, revision);
    if (!metadata) throw new BlogError('invalid_draft', 'Draft metadata is missing; inspect the draft branch');
    let meta: DraftMeta;
    try { meta = JSON.parse(metadata.text); } catch { throw new BlogError('invalid_draft', 'Invalid draft metadata'); }
    if (meta.slug !== slug || meta.lang !== lang || !(meta.base_post_sha === null || SHA.test(meta.base_post_sha)) ||
        (meta.published_commit && !SHA.test(meta.published_commit))) throw new BlogError('invalid_draft', 'Draft metadata does not match the article');
    imageManifest(meta.images);
    const file = await this.repo.file(postPath(slug, lang), revision);
    if (!file) throw new BlogError('invalid_draft', 'Draft article is missing');
    return { branch, revision, meta, file };
  }
  private async effective(slug: string, lang: Lang, source: 'draft' | 'published' | 'auto' = 'auto') {
    const main = await this.main();
    const draft = source === 'published' ? null : await this.draft(slug, lang);
    if (draft && !draft.meta.published_commit) return { file: draft.file, revision: draft.revision, source: 'draft', main, draft };
    if (source === 'draft') throw new BlogError('not_found', 'No active draft for this article');
    const file = await this.repo.file(postPath(slug, lang), main);
    if (!file) throw new BlogError('not_found', 'Article not found');
    return { file, revision: main, source: 'published', main, draft };
  }
  private async view(slug: string, lang: Lang, file: FileContent, revision: string, source: string) {
    const doc = document(file.text);
    return { slug, lang, path: postPath(slug, lang), frontmatter: doc.metadata, content: doc.content,
      sha256: await sha256(file.text), revision, source };
  }
  private imagePreview(slug: string, asset: ImageAsset, revision: string) {
    if (asset.storage === 'r2') return imageView(slug, asset);
    return { ...imageView(slug, asset), preview_url:
      `https://raw.githubusercontent.com/${this.env.GITHUB_OWNER}/${this.env.GITHUB_REPO}/${revision}/${imagePath(slug, asset.filename)}` };
  }
  async readPost(slug: string, lang: Lang, source: 'draft' | 'published' | 'auto' = 'auto') {
    const value = await this.effective(slug, lang, source);
    return { ...await this.view(slug, lang, value.file, value.revision, value.source),
      uploaded_images: value.source === 'draft' ? imageManifest(value.draft?.meta.images).map(a => this.imagePreview(slug, a, value.revision)) : [] };
  }
  async createPost(slug: string, lang: Lang, fields: PostFields & { title: string; content: string }) {
    const main = await this.main();
    if (await this.repo.head(this.branch(slug, lang)) || await this.repo.file(postPath(slug, lang), main)) {
      throw new BlogError('already_exists', 'Article or draft already exists; read and update it instead');
    }
    let inherited: Record<string, unknown> = {};
    if (lang !== 'zh-tw') {
      const original = await this.effective(slug, 'zh-tw');
      inherited = document(original.file.text).metadata;
    }
    const raw = newDocument({ title: fields.title.trim(), date: inherited.date ?? taipeiDate(), slug,
      tags: fields.tags ?? inherited.tags ?? [], categories: fields.categories ?? inherited.categories ?? [],
      summary: fields.summary ?? '', draft: true }, fields.content);
    const meta: DraftMeta = { slug, lang, base_post_sha: null };
    const revision = await this.repo.writeCommit(main, { [postPath(slug, lang)]: raw, [META_PATH]: JSON.stringify(meta) }, `Draft: ${slug} (${lang})`);
    await this.repo.createRef(this.branch(slug, lang), revision);
    return this.view(slug, lang, { text: raw, sha: '' }, revision, 'draft');
  }
  async updatePost(slug: string, lang: Lang, expectedRevision: string, fields: PostFields, expectedPublishedRevision?: string) {
    const current = await this.effective(slug, lang);
    if (current.revision !== expectedRevision) throw new BlogError('conflict', 'Article changed; read it again before updating');
    const changes = Object.fromEntries(Object.entries(fields).filter(([key, value]) => key !== 'content' && value !== undefined));
    const raw = edit(current.file.text, { ...changes, draft: true }, fields.content);
    const oldDraft = current.draft;
    let meta: DraftMeta = current.source === 'draft' ? oldDraft!.meta : { slug, lang, base_post_sha: current.file.sha };
    if (expectedPublishedRevision !== undefined) {
      if (expectedPublishedRevision !== current.main || fields.content === undefined) throw new BlogError('conflict', 'To reconcile, read published and draft versions, provide merged content and the current published revision');
      const published = await this.repo.file(postPath(slug, lang), current.main);
      meta = { slug, lang, base_post_sha: published?.sha ?? null, images: meta.images };
    }
    const parent = oldDraft?.revision ?? current.main;
    const revision = await this.repo.writeCommit(parent, { [postPath(slug, lang)]: raw, [META_PATH]: JSON.stringify(meta) }, `Draft: ${slug} (${lang})`);
    // A sibling commit from a concurrent update cannot fast-forward this ref.
    if (oldDraft) await this.repo.advanceRef(oldDraft.branch, revision);
    else await this.repo.createRef(this.branch(slug, lang), revision);
    return this.view(slug, lang, { text: raw, sha: '' }, revision, 'draft');
  }
  async prepareImageUpload(slug: string, lang: Lang, expectedRevision: string, filename: string,
    mimeType: string, size: number, expectedHash?: string) {
    validateUpload(filename, mimeType, size, this.imageStorage.maximum);
    if (expectedHash !== undefined && !/^[a-f0-9]{64}$/.test(expectedHash)) throw new BlogError('invalid_image', 'sha256 must be a lowercase SHA-256 hex digest');
    const current = await this.effective(slug, lang);
    if (current.revision !== expectedRevision) throw new BlogError('conflict', 'Article changed; read it again before uploading');
    const images = imageManifest(current.source === 'draft' ? current.draft!.meta.images : undefined);
    if (images.some(a => a.filename === webpFilename(filename))) throw new BlogError('image_exists', 'This draft already has that WebP filename; choose a new basename');
    if (images.length >= MAX_IMAGES) throw new BlogError('invalid_image', 'A draft supports at most 8 uploaded images');
    const uploadId = crypto.randomUUID();
    const upload: ImageUpload = { upload_id: uploadId, user_id: this.userId, slug, lang, expected_revision: expectedRevision,
      filename, mime_type: mimeType, size, pending_key: `blog-mcp/pending/${uploadId}/${filename}`,
      upload_expires: Date.now() + UPLOAD_SECONDS * 1000, expires: Date.now() + 86400_000,
      ...(expectedHash ? { expected_sha256: expectedHash } : {}) };
    const offer = await this.imageStorage.offer(upload);
    return { upload_id: uploadId, upload_ticket: await sign(this.env.CONFIRMATION_SECRET, 'image-upload', upload),
      ...offer, method: 'PUT', expires_in_seconds: UPLOAD_SECONDS, completion_expires_at: new Date(upload.expires).toISOString(),
      max_image_bytes: this.imageStorage.maximum,
      output_filename: webpFilename(filename), output_mime_type: 'image/webp',
      instructions: 'Use your file/network execution tool to PUT the raw image bytes to upload_url with every required_header before expiry. Do not put base64 in an MCP call. Then call complete_image_upload with upload_ticket; it converts PNG/JPEG/GIF to WebP and returns the final Markdown. If your execution environment cannot reach the upload host, report the network error instead of repeatedly preparing uploads. The MCP connector itself does not transfer chat attachments. Do not send OAuth or permanent storage credentials to the upload URL. Upload URLs are sensitive; do not quote them in the final answer.' };
  }
  async completeImageUpload(ticket: string) {
    const upload = await verify<ImageUpload>(this.env.CONFIRMATION_SECRET, 'image-upload', ticket);
    if (upload.user_id !== this.userId) throw new BlogError('forbidden', 'Upload belongs to another user');
    postPath(upload.slug, upload.lang);
    const current = await this.effective(upload.slug, upload.lang);
    const previous = imageManifest(current.draft?.meta.images).find(a => a.storage === 'r2' && a.upload_id === upload.upload_id);
    if (previous) {
      await this.imageStorage.discard(upload);
      return { ...this.imagePreview(upload.slug, previous, current.revision), revision: current.revision,
        source: current.source, already_completed: true };
    }
    if (upload.expires < Date.now()) throw new BlogError('expired', 'Upload completion ticket expired; prepare and upload again');
    if (current.revision !== upload.expected_revision) throw new BlogError('conflict', 'Article changed during upload; read it and prepare a new upload');
    const images = imageManifest(current.source === 'draft' ? current.draft!.meta.images : undefined);
    if (images.length >= MAX_IMAGES || images.some(a => a.filename === webpFilename(upload.filename))) throw new BlogError('conflict', 'Image list changed; read the draft before uploading');
    const asset = await this.imageStorage.complete(upload);
    const meta: DraftMeta = current.source === 'draft' ? current.draft!.meta : { slug: upload.slug, lang: upload.lang, base_post_sha: current.file.sha };
    meta.images = [...images, asset].sort((a, b) => a.filename.localeCompare(b.filename));
    const raw = edit(current.file.text, { draft: true });
    const parent = current.draft?.revision ?? current.main;
    const revision = await this.repo.writeCommit(parent, { [postPath(upload.slug, upload.lang)]: raw,
      [META_PATH]: JSON.stringify(meta) }, `Draft image: ${upload.slug}/${upload.filename} (${upload.lang})`);
    if (current.draft) await this.repo.advanceRef(current.draft.branch, revision);
    else await this.repo.createRef(this.branch(upload.slug, upload.lang), revision);
    await this.imageStorage.discard(upload);
    return { ...this.imagePreview(upload.slug, asset, revision), revision, source: 'draft', already_completed: false,
      instructions: 'Image bytes are on R2 and publicly accessible. Insert markdown with update_post using this new revision, then prepare and approve the article normally.' };
  }
  async preparePublish(slug: string, lang: Lang) {
    const draft = await this.draft(slug, lang);
    if (!draft || draft.meta.published_commit) throw new BlogError('not_found', 'Create or update a draft before preparing publication');
    const main = await this.main();
    const original = await this.repo.file(postPath(slug, lang), main);
    if ((original?.sha ?? null) !== draft.meta.base_post_sha) throw new BlogError('conflict', 'Published article changed since this draft began; reconcile the draft before publishing');
    if (lang !== 'zh-tw') {
      const primary = await this.repo.file(postPath(slug, 'zh-tw'), main);
      if (!primary || document(primary.text).metadata.draft === true) throw new BlogError('original_required', 'Publish the original zh-tw article before its translation');
    }
    const raw = edit(draft.file.text, { draft: false });
    const images = imageManifest(draft.meta.images);
    const changes: Record<string, FileChange> = { [postPath(slug, lang)]: raw };
    for (const asset of images) {
      if (asset.storage === 'r2') { await this.imageStorage.verify(asset, slug); continue; }
      const path = imagePath(slug, asset.filename);
      const image = await this.repo.binary(path, draft.revision);
      if (!image || (await imageAsset(asset.filename, image.base64)).sha256 !== asset.sha256) throw new BlogError('invalid_image', 'Draft image changed or is missing; upload it again');
      const published = await this.repo.binary(path, main);
      if (published && published.sha !== image.sha) throw new BlogError('conflict', 'A published image has this filename; choose a new filename');
      if (!published) changes[path] = { base64: image.base64 };
    }
    if (raw === original?.text && Object.keys(changes).length === 1) throw new BlogError('no_changes', 'This draft has no changes to publish');
    const candidate: Candidate = { operation_id: crypto.randomUUID(), user_id: this.userId, slug, lang,
      draft_revision: draft.revision, base_main: main, content_sha256: await sha256(raw), expires: Date.now() + 86400_000,
      ...(images.length ? { images } : {}) };
    const envelope = await sign(this.env.CONFIRMATION_SECRET, 'candidate', candidate);
    const commit = await this.repo.writeCommit(main, changes, CANDIDATE_PREFIX + envelope);
    await this.repo.createRef(`mcp/candidates/${candidate.operation_id}`, commit);
    return { operation_id: candidate.operation_id, candidate_commit: commit, status: 'validating', retry_after_seconds: 5,
      instructions: 'Poll get_operation_status. After validation succeeds, show the entire returned preview and ask the user to approve that exact version before publish_post.' };
  }
  private async candidate(operationId: string) {
    if (!/^[a-f0-9-]{36}$/.test(operationId)) throw new BlogError('invalid_operation', 'Invalid operation ID');
    const branch = `mcp/candidates/${operationId}`;
    const head = await this.repo.head(branch);
    if (!head) throw new BlogError('not_found', 'Publication operation not found');
    const commit = await this.repo.commit(head);
    if (!commit.message.startsWith(CANDIDATE_PREFIX)) throw new BlogError('invalid_operation', 'Invalid candidate commit');
    const meta = await verify<Candidate>(this.env.CONFIRMATION_SECRET, 'candidate', commit.message.slice(CANDIDATE_PREFIX.length).trim());
    if (meta.operation_id !== operationId || meta.user_id !== this.userId || commit.parents.length !== 1 || commit.parents[0] !== meta.base_main) {
      throw new BlogError('invalid_operation', 'Candidate identity or base commit mismatch');
    }
    postPath(meta.slug, meta.lang);
    imageManifest(meta.images);
    return { branch, commit, meta };
  }
  private async validation(sha: string, branch: string) {
    const runs = await this.repo.runs(this.env.VALIDATION_WORKFLOW, sha);
    const run = runs.find(r => r.head_branch === branch);
    return { valid: run?.status === 'completed' && run.conclusion === 'success',
      status: !run ? 'queued' : run.status !== 'completed' ? 'validating' : run.conclusion === 'success' ? 'ready' : 'validation_failed',
      actions_url: run?.html_url ?? null, conclusion: run?.conclusion ?? null };
  }
  private async finishDraft(meta: Candidate, publishedCommit: string) {
    const draft = await this.draft(meta.slug, meta.lang);
    if (!draft || draft.revision !== meta.draft_revision) return false;
    const revision = await this.repo.writeCommit(draft.revision,
      { [META_PATH]: JSON.stringify({ ...draft.meta, published_commit: publishedCommit }) }, `Published: ${meta.slug} (${meta.lang})`);
    try { await this.repo.advanceRef(draft.branch, revision); return false; }
    catch { return true; } // A newer draft is never overwritten; publication is already committed.
  }
  private async publishedResult(meta: Candidate, commit: string) {
    let draftCleanupPending = false;
    try { draftCleanupPending = await this.finishDraft(meta, commit); } catch { draftCleanupPending = true; }
    const runs = await this.repo.runs(this.env.DEPLOY_WORKFLOW, commit);
    const run = runs.find(r => r.head_branch === this.env.GITHUB_BRANCH);
    const deployed = run?.status === 'completed' && run.conclusion === 'success';
    return { operation_id: meta.operation_id, committed: true, commit, draft_cleanup_pending: draftCleanupPending,
      status: deployed ? 'deployed' : run?.status === 'completed' ? 'deployment_failed' : 'deploying',
      hosting_deployment_confirmed: deployed, actions_url: run?.html_url ?? null,
      site_url: `${this.env.SITE_URL.replace(/\/$/, '')}${meta.lang === 'zh-tw' ? '' : `/${meta.lang}`}/posts/${meta.slug}/` };
  }
  async operationStatus(operationId: string): Promise<Record<string, unknown>> {
    const { commit, meta, branch } = await this.candidate(operationId);
    const main = await this.main();
    if (await this.repo.isAncestor(commit.sha, main)) return this.publishedResult(meta, commit.sha);
    if (meta.expires < Date.now()) return { operation_id: operationId, status: 'expired' };
    const draft = await this.repo.head(this.branch(meta.slug, meta.lang));
    if (main !== meta.base_main || draft !== meta.draft_revision) return { operation_id: operationId, status: 'stale', instructions: 'Call prepare_publish again and review the new preview.' };
    const validation = await this.validation(commit.sha, branch);
    if (!validation.valid) return { operation_id: operationId, ...validation, retry_after_seconds: 5 };
    const file = await this.repo.file(postPath(meta.slug, meta.lang), commit.sha);
    if (!file || await sha256(file.text) !== meta.content_sha256) throw new BlogError('invalid_operation', 'Candidate content changed');
    const confirmation = await sign<Confirmation>(this.env.CONFIRMATION_SECRET, 'publish', {
      operation_id: operationId, candidate_commit: commit.sha, user_id: this.userId, expires: meta.expires,
    });
    const images = imageManifest(meta.images);
    for (const asset of images) {
      if (asset.storage === 'r2') { await this.imageStorage.verify(asset, meta.slug); continue; }
      const image = await this.repo.binary(imagePath(meta.slug, asset.filename), commit.sha);
      if (!image || (await imageAsset(asset.filename, image.base64)).sha256 !== asset.sha256) throw new BlogError('invalid_operation', 'Candidate image changed');
    }
    return { operation_id: operationId, ...validation, preview: { ...await this.view(meta.slug, meta.lang, file, commit.sha, 'candidate'),
      uploaded_images: images.map(a => this.imagePreview(meta.slug, a, commit.sha)) }, confirmation,
      instructions: 'Show the complete preview to the user. This token identifies a version; it is not evidence of human consent. Publish only after explicit approval.' };
  }
  async publishPost(slug: string, lang: Lang, confirmation: string): Promise<Record<string, unknown>> {
    const approval = await verify<Confirmation>(this.env.CONFIRMATION_SECRET, 'publish', confirmation);
    if (approval.user_id !== this.userId) throw new BlogError('forbidden', 'Confirmation belongs to another user');
    const { commit, meta, branch } = await this.candidate(approval.operation_id);
    if (meta.slug !== slug || meta.lang !== lang || approval.candidate_commit !== commit.sha || approval.expires !== meta.expires) {
      throw new BlogError('invalid_confirmation', 'Confirmation does not match this article and version');
    }
    const main = await this.main();
    // A retried request after a lost response returns the original publication, even after expiry.
    if (await this.repo.isAncestor(commit.sha, main)) return this.publishedResult(meta, commit.sha);
    if (approval.expires < Date.now()) throw new BlogError('expired', 'Confirmation expired; prepare the article again');
    if (main !== meta.base_main || await this.repo.head(this.branch(slug, lang)) !== meta.draft_revision) throw new BlogError('conflict', 'Main or draft changed; prepare and confirm again');
    const validation = await this.validation(commit.sha, branch);
    if (!validation.valid) throw new BlogError('validation_required', 'This exact candidate has not passed validation');
    for (const asset of imageManifest(meta.images)) {
      if (asset.storage === 'r2') await this.imageStorage.verify(asset, slug);
    }
    await this.repo.advanceRef(this.env.GITHUB_BRANCH, commit.sha);
    return this.publishedResult(meta, commit.sha);
  }
  async repoStatus() {
    return { repository: `${this.env.GITHUB_OWNER}/${this.env.GITHUB_REPO}`, branch: this.env.GITHUB_BRANCH, commit: await this.main(),
      hosting_deployment_confirmed: false };
  }
  async readConfig() { return { text: (await this.repo.file('hugo.toml', await this.main()))?.text ?? '' }; }
  async listPosts(query: string, offset: number, limit: number, draftOffset: number, draftLimit = 5) {
    const main = await this.main();
    const index = await this.loadIndex();
    const needle = query.toLocaleLowerCase();
    const posts = index.posts.filter(p => `${p.slug} ${p.title} ${p.summary}`.toLocaleLowerCase().includes(needle));
    const refs = await this.repo.refs('mcp/drafts/');
    const page = refs.slice(draftOffset, draftOffset + draftLimit);
    const drafts = [];
    // Bound requests to stay below Workers Free's per-invocation subrequest limit.
    for (const ref of page) {
      const [, , slug, language, extra] = ref.branch.split('/');
      if (extra || !['zh-tw', 'en', 'ja'].includes(language)) continue;
      const draft = await this.draft(slug, language as Lang);
      if (!draft || draft.meta.published_commit) continue;
      const metadata = document(draft.file.text).metadata;
      if (!`${slug} ${metadata.title ?? ''} ${metadata.summary ?? ''}`.toLocaleLowerCase().includes(needle)) continue;
      drafts.push({ slug, lang: language, title: metadata.title, summary: metadata.summary, revision: draft.revision, draft: true });
    }
    return { posts: posts.slice(offset, offset + limit), total: posts.length, offset, limit,
      drafts, next_draft_offset: draftOffset + page.length < refs.length ? draftOffset + page.length : null,
      indexed_commit: index.commit, current_main_commit: main, index_stale: index.commit !== main };
  }
}

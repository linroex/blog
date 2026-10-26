import { sha256, sign, verify } from './crypto';
import { downloadChatGPTFile, type ChatGPTFile } from './chatgpt-files';
import { document, edit, newDocument, postPath, taipeiDate } from './document';
import { checkImageName, imageAsset, imageManifest, imagePath, imageView, MAX_IMAGES, webpFilename, type ImageAsset } from './images';
import { R2Images, UPLOAD_SECONDS, validateUpload, type ImageStorage, type ImageUpload } from './r2-images';
import { BlogError, type Env, type FileChange, type FileContent, type Lang, type Repository, type Pull } from './types';

const META_PATH = '.mcp/draft.json';
const CANDIDATE_PREFIX = 'Blog MCP candidate\n\n';
const SHA = /^[a-f0-9]{40}$/;
export interface DraftMeta {
  slug: string; lang: Lang; base_post_sha: string | null; published_commit?: string; deleted_revision?: string; review_branch?: string; images?: ImageAsset[];
}
interface Candidate {
  operation_id: string; user_id: string; slug: string; lang: Lang;
  draft_revision: string; base_main: string; content_sha256: string; expires: number;
  images?: ImageAsset[]; review_branch?: string; prepared?: boolean; base_post_sha?: string | null;
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
    private loadIndex: () => Promise<ArticleIndex>, private imageStorage: ImageStorage = new R2Images(env),
    private loadChatGPTFile: (file: ChatGPTFile, maximum: number) => Promise<Uint8Array> = downloadChatGPTFile) {}

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
        (meta.published_commit && !SHA.test(meta.published_commit)) ||
        (meta.deleted_revision !== undefined && !SHA.test(meta.deleted_revision)) ||
        (meta.review_branch !== undefined && !/^mcp\/reviews\/[a-f0-9-]{36}$/.test(meta.review_branch))) throw new BlogError('invalid_draft', 'Draft metadata does not match the article');
    imageManifest(meta.images);
    const file = await this.repo.file(postPath(slug, lang), revision);
    if (!file) throw new BlogError('invalid_draft', 'Draft article is missing');
    return { branch, revision, meta, file };
  }
  private async reviewMatchesDraft(pull: Pull | null | undefined, revision: string, branch?: string) {
    if (!pull?.message) return false;
    if (!pull.message.startsWith(CANDIDATE_PREFIX)) throw new BlogError('invalid_operation', 'PR is missing candidate metadata');
    const meta = await verify<Candidate>(this.env.CONFIRMATION_SECRET, 'candidate', pull.message.slice(CANDIDATE_PREFIX.length).trim());
    return meta.draft_revision === revision && meta.review_branch === branch;
  }
  private async mergedDraft(pull: Pull | null | undefined, revision: string, branch?: string) {
    return !!pull?.merged && this.reviewMatchesDraft(pull, revision, branch);
  }
  private async effective(slug: string, lang: Lang, source: 'draft' | 'published' | 'auto' = 'auto') {
    const main = await this.main();
    const draft = source === 'published' ? null : await this.draft(slug, lang);
    const pull = draft?.meta.review_branch ? (await this.repo.pulls([draft.meta.review_branch]))[draft.meta.review_branch] : null;
    if (draft && !draft.meta.published_commit && !draft.meta.deleted_revision && !await this.mergedDraft(pull, draft.revision, draft.meta.review_branch)) return { file: draft.file, revision: draft.revision, source: 'draft', main, draft, pull };
    if (source === 'draft') throw new BlogError('not_found', 'No active draft for this article');
    const file = await this.repo.file(postPath(slug, lang), main);
    if (!file) throw new BlogError('not_found', 'Article not found');
    return { file, revision: main, source: 'published', main, draft, pull };
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
      ...this.prView(value.source === 'published' && value.pull ? { ...value.pull, head: value.revision } : value.pull, slug, lang, value.revision),
      pr_sync_pending: value.source === 'draft' && (value.pull?.state !== 'open' || !await this.reviewMatchesDraft(value.pull, value.revision, value.draft?.meta.review_branch)),
      uploaded_images: value.source === 'draft' ? imageManifest(value.draft?.meta.images).map(a => this.imagePreview(slug, a, value.revision)) : [] };
  }
  async createPost(slug: string, lang: Lang, fields: PostFields & { title: string; content: string }) {
    const main = await this.main();
    const previous = await this.draft(slug, lang);
    if ((previous && !previous.meta.deleted_revision) || await this.repo.file(postPath(slug, lang), main)) {
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
    const meta: DraftMeta = { slug, lang, base_post_sha: null, review_branch: `mcp/reviews/${crypto.randomUUID()}` };
    const revision = await this.repo.writeCommit(previous?.revision ?? main, { [postPath(slug, lang)]: raw, [META_PATH]: JSON.stringify(meta) }, `Draft: ${slug} (${lang})`);
    if (previous) await this.repo.advanceRef(previous.branch, revision);
    else await this.repo.createRef(this.branch(slug, lang), revision);
    return this.saveResult(slug, lang, raw, revision);
  }
  async updatePost(slug: string, lang: Lang, expectedRevision: string, fields: PostFields, expectedPublishedRevision?: string, syncPR = true) {
    const current = await this.effective(slug, lang);
    if (current.revision !== expectedRevision) throw new BlogError('conflict', 'Article changed; read it again before updating');
    await this.invalidateReview(current.draft?.meta);
    const changes = Object.fromEntries(Object.entries(fields).filter(([key, value]) => key !== 'content' && value !== undefined));
    const raw = edit(current.file.text, { ...changes, draft: true }, fields.content);
    const oldDraft = current.draft;
    let meta: DraftMeta = current.source === 'draft' ? oldDraft!.meta : { slug, lang, base_post_sha: current.file.sha };
    if (current.source === 'draft' && current.pull?.merged) {
      const published = await this.repo.file(postPath(slug, lang), current.main);
      meta = { slug, lang, base_post_sha: published?.sha ?? null, images: meta.images };
    }
    if (expectedPublishedRevision !== undefined) {
      if (expectedPublishedRevision !== current.main || fields.content === undefined) throw new BlogError('conflict', 'To reconcile, read published and draft versions, provide merged content and the current published revision');
      const published = await this.repo.file(postPath(slug, lang), current.main);
      meta = { slug, lang, base_post_sha: published?.sha ?? null, images: meta.images, review_branch: current.source === 'draft' && !current.pull?.merged ? oldDraft?.meta.review_branch : undefined };
    }
    meta.review_branch ??= `mcp/reviews/${crypto.randomUUID()}`;
    const parent = oldDraft?.revision ?? current.main;
    const revision = await this.repo.writeCommit(parent, { [postPath(slug, lang)]: raw, [META_PATH]: JSON.stringify(meta) }, `Draft: ${slug} (${lang})`);
    // A sibling commit from a concurrent update cannot fast-forward this ref.
    if (oldDraft) await this.repo.advanceRef(oldDraft.branch, revision);
    else await this.repo.createRef(this.branch(slug, lang), revision);
    return syncPR ? this.saveResult(slug, lang, raw, revision)
      : { ...await this.view(slug, lang, { text: raw, sha: '' }, revision, 'draft'), ...this.prView(null, slug, lang, revision), pr_sync_pending: false };
  }
  async deleteDraft(slug: string, lang: Lang, expectedRevision: string) {
    const draft = await this.draft(slug, lang);
    if (!draft || draft.meta.published_commit) throw new BlogError('not_found', 'No active draft for this article');
    let pull = await this.invalidateReview(draft.meta);
    if (await this.mergedDraft(pull, draft.revision, draft.meta.review_branch)) throw new BlogError('not_found', 'No active draft for this article');
    const alreadyDeleted = draft.meta.deleted_revision === expectedRevision;
    if (!alreadyDeleted && (draft.meta.deleted_revision || draft.revision !== expectedRevision)) {
      throw new BlogError('conflict', 'Draft changed; read it again before deleting');
    }
    let revision = draft.revision;
    if (!alreadyDeleted) {
      // A non-forced ref update atomically competes with concurrent writers.
      // GitHub's delete-ref API has no expected-SHA guard, so retain a tombstone.
      revision = await this.repo.writeCommit(draft.revision,
        { [META_PATH]: JSON.stringify({ ...draft.meta, deleted_revision: draft.revision }) }, `Delete draft: ${slug} (${lang})`);
      await this.repo.advanceRef(draft.branch, revision);
    }
    if (pull?.state === 'open') pull = await this.repo.updatePull(pull.number, `Discarded: ${slug} (${lang})`, 'This draft was discarded.', 'closed');
    return { slug, lang, deleted: true, already_deleted: alreadyDeleted, revision, ...this.prView(pull, slug, lang, revision),
      deleted_revision: expectedRevision, retained_git_history: true, retained_uploaded_images: true };
  }
  async prepareImageUpload(slug: string, lang: Lang, expectedRevision: string, filename: string,
    mimeType: string, size: number, expectedHash?: string) {
    validateUpload(filename, mimeType, size, this.imageStorage.maximum);
    if (expectedHash !== undefined && !/^[a-f0-9]{64}$/.test(expectedHash)) throw new BlogError('invalid_image', 'sha256 must be a lowercase SHA-256 hex digest');
    const current = await this.effective(slug, lang);
    if (current.revision !== expectedRevision) throw new BlogError('conflict', 'Article changed; read it again before uploading');
    if (current.draft?.meta.deleted_revision) throw new BlogError('conflict', 'Draft was deleted; use update_post to start a fresh draft before uploading');
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
    return this.attachImage(upload, () => this.imageStorage.complete(upload), () => this.imageStorage.discard(upload));
  }
  async uploadChatGPTImage(slug: string, lang: Lang, expectedRevision: string, filename: string, file: ChatGPTFile) {
    const mime = checkImageName(filename);
    if (file.mime_type !== undefined && file.mime_type !== mime) throw new BlogError('invalid_image', 'Choose a filename extension matching the ChatGPT attachment MIME type');
    // A refreshed download URL for the same attachment is still the same upload.
    const identity = await sha256(JSON.stringify(['chatgpt-file', this.userId, slug, lang, filename, file.file_id]));
    const uploadId = `${identity.slice(0, 8)}-${identity.slice(8, 12)}-${identity.slice(12, 16)}-${identity.slice(16, 20)}-${identity.slice(20, 32)}`;
    const upload: ImageUpload = { upload_id: uploadId, user_id: this.userId, slug, lang, expected_revision: expectedRevision,
      filename, mime_type: mime, size: 0, pending_key: `blog-mcp/pending/${uploadId}/${filename}`,
      upload_expires: Date.now(), expires: Date.now() + 86400_000 };
    return this.attachImage(upload, async () => {
      const bytes = await this.loadChatGPTFile(file, this.imageStorage.maximum);
      return this.imageStorage.store({ ...upload, size: bytes.length }, bytes);
    });
  }
  private async attachImage(upload: ImageUpload, load: () => Promise<ImageAsset>, discard?: () => Promise<void>) {
    postPath(upload.slug, upload.lang);
    const current = await this.effective(upload.slug, upload.lang);
    if (current.draft?.meta.deleted_revision) throw new BlogError('conflict', 'Draft was deleted; use update_post to start a fresh draft before uploading');
    const previous = imageManifest(current.draft?.meta.images).find(a => a.storage === 'r2' && a.upload_id === upload.upload_id);
    if (previous) {
      await discard?.();
      return { ...this.imagePreview(upload.slug, previous, current.revision), revision: current.revision,
        ...this.prView(current.pull, upload.slug, upload.lang, current.revision), source: current.source, already_completed: true };
    }
    if (upload.expires < Date.now()) throw new BlogError('expired', 'Upload completion ticket expired; prepare and upload again');
    if (current.revision !== upload.expected_revision) throw new BlogError('conflict', 'Article changed during upload; read it and prepare a new upload');
    const images = imageManifest(current.source === 'draft' ? current.draft!.meta.images : undefined);
    if (images.length >= MAX_IMAGES || images.some(a => a.filename === webpFilename(upload.filename))) throw new BlogError('conflict', 'Image list changed; read the draft before uploading');
    await this.invalidateReview(current.draft?.meta);
    const asset = await load();
    let meta: DraftMeta = current.source === 'draft' ? current.draft!.meta : { slug: upload.slug, lang: upload.lang, base_post_sha: current.file.sha };
    if (current.source === 'draft' && current.pull?.merged) {
      const published = await this.repo.file(postPath(upload.slug, upload.lang), current.main);
      meta = { slug: upload.slug, lang: upload.lang, base_post_sha: published?.sha ?? null, images };
    }
    meta.review_branch ??= `mcp/reviews/${crypto.randomUUID()}`;
    meta.images = [...images, asset].sort((a, b) => a.filename.localeCompare(b.filename));
    const raw = edit(current.file.text, { draft: true });
    const parent = current.draft?.revision ?? current.main;
    const revision = await this.repo.writeCommit(parent, { [postPath(upload.slug, upload.lang)]: raw,
      [META_PATH]: JSON.stringify(meta) }, `Draft image: ${upload.slug}/${upload.filename} (${upload.lang})`);
    if (current.draft) await this.repo.advanceRef(current.draft.branch, revision);
    else await this.repo.createRef(this.branch(upload.slug, upload.lang), revision);
    await discard?.();
    const saved = await this.saveResult(upload.slug, upload.lang, raw, revision);
    return { ...saved, ...this.imagePreview(upload.slug, asset, revision), revision, source: 'draft', already_completed: false,
      instructions: `${'instructions' in saved ? saved.instructions + ' ' : ''}Image bytes are on R2 and publicly accessible. Insert markdown with update_post using this new revision, then prepare and approve the article normally.` };
  }
  private prView(pull: Pull | null | undefined, slug: string, lang: Lang, revision: string) {
    return { pr_number: pull?.number ?? null, pr_url: pull?.url ?? null,
      pr_state: pull ? pull.merged ? 'merged' : pull.state === 'closed' ? 'closed' : pull.draft ? 'draft' : 'ready' : null,
      read_url: `https://github.com/${this.env.GITHUB_OWNER}/${this.env.GITHUB_REPO}/blob/${revision}/${postPath(slug, lang)}` };
  }
  private async invalidateReview(meta?: DraftMeta) {
    if (!meta?.review_branch) return null;
    const pull = (await this.repo.pulls([meta.review_branch]))[meta.review_branch];
    if (pull?.state === 'open') await this.repo.setPullDraft(pull, true);
    return pull;
  }
  private async saveResult(slug: string, lang: Lang, raw: string, revision: string) {
    const view = await this.view(slug, lang, { text: raw, sha: '' }, revision, 'draft');
    try {
      const result = await this.syncReview(slug, lang, revision, false);
      return { ...view, ...this.prView(result.pull, slug, lang, result.commit),
        operation_id: `${result.meta.operation_id}:${result.pull.number}:${result.commit}`, pr_sync_pending: false };
    } catch (error) {
      return { ...view, ...this.prView(null, slug, lang, revision), pr_sync_pending: true,
        pr_error: error instanceof BlogError ? error.code : 'internal_error',
        instructions: 'Draft content is saved. PR synchronization failed; check GitHub App Pull requests read/write permission, read the latest draft, then retry update_post with its revision. Do not retry create_post.' };
    }
  }
  private async syncReview(slug: string, lang: Lang, revision: string, prepared: boolean) {
    const draft = await this.draft(slug, lang);
    if (!draft || draft.revision !== revision || draft.meta.published_commit || draft.meta.deleted_revision) throw new BlogError('conflict', 'Draft changed; read it again');
    const branch = draft.meta.review_branch;
    if (!branch) throw new BlogError('migration_required', 'Save this legacy draft with update_post before preparing its PR');
    let pull = (await this.repo.pulls([branch]))[branch];
    if (pull?.merged) throw new BlogError('conflict', 'PR already merged; start a new draft from the published article');
    if (pull?.state === 'open') await this.repo.setPullDraft(pull, true);
    const previous = await this.repo.head(branch);
    const main = await this.main();
    const original = await this.repo.file(postPath(slug, lang), main);
    if (prepared && (original?.sha ?? null) !== draft.meta.base_post_sha) throw new BlogError('conflict', 'Published article changed; reconcile before publishing');
    if (prepared && lang !== 'zh-tw') {
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
      if (!image || (await imageAsset(asset.filename, image.base64)).sha256 !== asset.sha256) throw new BlogError('invalid_image', 'Draft image changed or is missing');
      const published = await this.repo.binary(path, main);
      if (published && published.sha !== image.sha) throw new BlogError('conflict', 'Published image filename already exists');
      if (!published) changes[path] = { base64: image.base64 };
    }
    if (prepared && raw === original?.text && Object.keys(changes).length === 1) throw new BlogError('no_changes', 'This draft has no changes to publish');
    const meta: Candidate = { operation_id: crypto.randomUUID(), user_id: this.userId, slug, lang,
      draft_revision: draft.revision, base_main: main, base_post_sha: draft.meta.base_post_sha,
      content_sha256: await sha256(raw), expires: Date.now() + 86400_000, images, review_branch: branch, prepared };
    const envelope = await sign(this.env.CONFIRMATION_SECRET, 'candidate', meta);
    const commit = await this.repo.writeCommit(main, changes, CANDIDATE_PREFIX + envelope);
    await this.repo.syncReviewRef(branch, previous, commit, draft.branch, revision, main);
    const title = `${String(document(raw).metadata.title ?? slug)} (${lang})`;
    const url = `https://github.com/${this.env.GITHUB_OWNER}/${this.env.GITHUB_REPO}/blob/${commit}/${postPath(slug, lang)}`;
    const body = `[Read the full article](${url})\n\n${String(document(raw).metadata.summary ?? '').slice(0, 1000)}\n\n${prepared ? 'Publication validation in progress.' : 'Saved draft. Use prepare_publish before merging.'}\n\n<!-- blog-mcp ${meta.operation_id} ${revision} -->`;
    pull = pull ? await this.repo.updatePull(pull.number, title, body, 'open') : await this.repo.createPull(branch, title, body);
    return { pull, commit, meta, branch };
  }
  async preparePublish(slug: string, lang: Lang) {
    const current = await this.effective(slug, lang, 'draft');
    const draft = current.draft!;
    let revision = draft.revision;
    if (!draft.meta.review_branch || current.pull?.merged) {
      const saved = await this.updatePost(slug, lang, draft.revision, {}, undefined, false);
      if (saved.pr_sync_pending) throw new BlogError('pr_sync_pending', 'Draft saved; repair PR synchronization before publishing');
      revision = saved.revision;
    }
    const result = await this.syncReview(slug, lang, revision, true);
    return { operation_id: `${result.meta.operation_id}:${result.pull.number}:${result.commit}`,
      candidate_commit: result.commit, validation_branch: result.branch, ...this.prView(result.pull, slug, lang, result.commit),
      status: 'validating', retry_after_seconds: 5,
      instructions: 'Poll get_operation_status. After validation succeeds, review the exact article/PR and obtain explicit approval before publish_post, or merge it yourself in GitHub.' };
  }
  private async candidate(operationId: string) {
    const parts = operationId.split(':');
    if (!/^[a-f0-9-]{36}$/.test(parts[0]) || (parts.length !== 1 && (parts.length !== 3 || !/^[1-9][0-9]{0,8}$/.test(parts[1]) || !SHA.test(parts[2])))) throw new BlogError('invalid_operation', 'Invalid operation ID');
    const pull = parts.length === 3 ? await this.repo.pull(Number(parts[1])) : null;
    const branch = pull?.branch ?? `mcp/candidates/${parts[0]}`;
    const head = parts[2] ?? await this.repo.head(branch);
    if (!head) throw new BlogError('not_found', 'Publication operation not found');
    const commit = await this.repo.commit(head);
    if (!commit.message.startsWith(CANDIDATE_PREFIX)) throw new BlogError('invalid_operation', 'Invalid candidate commit');
    const meta = await verify<Candidate>(this.env.CONFIRMATION_SECRET, 'candidate', commit.message.slice(CANDIDATE_PREFIX.length).trim());
    if (meta.operation_id !== parts[0] || meta.user_id !== this.userId || commit.parents.length !== 1 || commit.parents[0] !== meta.base_main ||
        (pull && meta.review_branch !== pull.branch)) throw new BlogError('invalid_operation', 'Candidate identity or base mismatch');
    postPath(meta.slug, meta.lang);
    imageManifest(meta.images);
    return { branch, commit, meta, pull };
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
  private async publishedResult(meta: Candidate, commit: string, operationId = meta.operation_id, pull: Pull | null = null) {
    let draftCleanupPending = false;
    if (!pull) { try { draftCleanupPending = await this.finishDraft(meta, commit); } catch { draftCleanupPending = true; } }
    const runs = await this.repo.runs(this.env.DEPLOY_WORKFLOW, commit);
    const run = runs.find(r => r.head_branch === this.env.GITHUB_BRANCH);
    const jobs = run && pull ? await this.repo.jobs(run.id) : [];
    const deploy = jobs.find(job => job.name === 'deploy');
    const cleanup = jobs.find(job => job.name === 'cleanup');
    const deployed = deploy ? deploy.conclusion === 'success' : run?.status === 'completed' && run.conclusion === 'success';
    return { operation_id: operationId, ...this.prView(pull, meta.slug, meta.lang, commit),
      cleanup_status: !pull ? 'legacy' : cleanup?.conclusion === 'success' ? 'completed' : cleanup?.status === 'completed' ? 'failed' : deployed ? 'pending' : 'waiting_for_deployment', committed: true, commit, draft_cleanup_pending: draftCleanupPending,
      status: deployed ? 'deployed' : deploy?.status === 'completed' || (!deploy && run?.status === 'completed') ? 'deployment_failed' : 'deploying',
      hosting_deployment_confirmed: deployed, actions_url: run?.html_url ?? null,
      site_url: `${this.env.SITE_URL.replace(/\/$/, '')}${meta.lang === 'zh-tw' ? '' : `/${meta.lang}`}/posts/${meta.slug}/` };
  }
  async operationStatus(operationId: string): Promise<Record<string, unknown>> {
    const { commit, meta, branch, pull } = await this.candidate(operationId);
    const main = await this.main();
    if (pull?.merged && pull.head === commit.sha && pull.merge_commit) return this.publishedResult(meta, pull.merge_commit, operationId, pull);
    if (!pull && await this.repo.isAncestor(commit.sha, main)) return this.publishedResult(meta, commit.sha);
    if (!pull) return { operation_id: operationId, status: 'migration_required', instructions: 'Call prepare_publish to create a versioned article PR before publishing.' };
    if (pull && (pull.state !== 'open' || pull.head !== commit.sha)) return { operation_id: operationId, status: 'stale', ...this.prView(pull, meta.slug, meta.lang, commit.sha) };
    if (meta.expires < Date.now()) return { operation_id: operationId, status: 'expired' };
    const draft = await this.repo.head(this.branch(meta.slug, meta.lang));
    if (main !== meta.base_main || draft !== meta.draft_revision) return { operation_id: operationId, status: 'stale', instructions: 'Call prepare_publish again and review the new preview.' };
    if (pull && !meta.prepared) return { operation_id: operationId, status: 'draft' };
    const validation = await this.validation(commit.sha, branch);
    if (!validation.valid) return { operation_id: operationId, ...this.prView(pull, meta.slug, meta.lang, commit.sha), ...validation, retry_after_seconds: 5 };
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
    if (pull) {
      const current = await this.repo.pull(pull.number);
      if (current.state !== 'open' || current.head !== commit.sha || await this.repo.head(this.branch(meta.slug, meta.lang)) !== meta.draft_revision || await this.main() !== meta.base_main) {
        return { operation_id: operationId, status: 'stale' };
      }
      await this.repo.setPullDraft(current, false);
    }
    return { operation_id: operationId, ...validation, ...this.prView(pull ? { ...pull, draft: false } : null, meta.slug, meta.lang, commit.sha), preview: { ...await this.view(meta.slug, meta.lang, file, commit.sha, 'candidate'),
      uploaded_images: images.map(a => this.imagePreview(meta.slug, a, commit.sha)) }, confirmation,
      instructions: 'Show the complete preview to the user. This token identifies a version; it is not evidence of human consent. Publish only after explicit approval.' };
  }
  async publishPost(slug: string, lang: Lang, confirmation: string): Promise<Record<string, unknown>> {
    const approval = await verify<Confirmation>(this.env.CONFIRMATION_SECRET, 'publish', confirmation);
    if (approval.user_id !== this.userId) throw new BlogError('forbidden', 'Confirmation belongs to another user');
    const { commit, meta, branch, pull } = await this.candidate(approval.operation_id);
    if (meta.slug !== slug || meta.lang !== lang || approval.candidate_commit !== commit.sha || approval.expires !== meta.expires) {
      throw new BlogError('invalid_confirmation', 'Confirmation does not match this article and version');
    }
    const main = await this.main();
    // A retried request after a lost response returns the original publication, even after expiry.
    if (pull?.merged && pull.head === commit.sha && pull.merge_commit) return this.publishedResult(meta, pull.merge_commit, approval.operation_id, pull);
    if (!pull && await this.repo.isAncestor(commit.sha, main)) return this.publishedResult(meta, commit.sha);
    if (!pull) throw new BlogError('migration_required', 'Prepare a new article PR before publishing');
    if (pull.state !== 'open' || pull.draft || pull.head !== commit.sha || !meta.prepared) throw new BlogError('conflict', 'PR changed; prepare and confirm again');
    if (approval.expires < Date.now()) throw new BlogError('expired', 'Confirmation expired; prepare the article again');
    if (main !== meta.base_main || await this.repo.head(this.branch(slug, lang)) !== meta.draft_revision) throw new BlogError('conflict', 'Main or draft changed; prepare and confirm again');
    const validation = await this.validation(commit.sha, branch);
    if (!validation.valid) throw new BlogError('validation_required', 'This exact candidate has not passed validation');
    for (const asset of imageManifest(meta.images)) {
      if (asset.storage === 'r2') await this.imageStorage.verify(asset, slug);
    }
    const merged = await this.repo.mergePull(pull.number, commit.sha);
    return this.publishedResult(meta, merged, approval.operation_id, { ...pull, merged: true, state: 'closed', merge_commit: merged });
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
    const loaded = [];
    // Bound requests to stay below Workers Free's per-invocation subrequest limit.
    for (const ref of page) {
      const [, , slug, language, extra] = ref.branch.split('/');
      if (extra || !['zh-tw', 'en', 'ja'].includes(language)) continue;
      const draft = await this.draft(slug, language as Lang);
      if (!draft || draft.meta.published_commit || draft.meta.deleted_revision) continue;
      loaded.push({ slug, language, draft });
    }
    const pulls = await this.repo.pulls(loaded.flatMap(({ draft }) => draft.meta.review_branch ? [draft.meta.review_branch] : []));
    for (const { slug, language, draft } of loaded) {
      const pull = draft.meta.review_branch ? pulls[draft.meta.review_branch] : null;
      if (await this.mergedDraft(pull, draft.revision, draft.meta.review_branch)) continue;
      const metadata = document(draft.file.text).metadata;
      if (!`${slug} ${metadata.title ?? ''} ${metadata.summary ?? ''}`.toLocaleLowerCase().includes(needle)) continue;
      drafts.push({ slug, lang: language, title: metadata.title, summary: metadata.summary, revision: draft.revision, draft: true,
        ...this.prView(pull, slug, language as Lang, draft.revision),
        pr_sync_pending: pull?.state !== 'open' || !await this.reviewMatchesDraft(pull, draft.revision, draft.meta.review_branch) });
    }
    return { posts: posts.slice(offset, offset + limit), total: posts.length, offset, limit,
      drafts, next_draft_offset: draftOffset + page.length < refs.length ? draftOffset + page.length : null,
      indexed_commit: index.commit, current_main_commit: main,
      index_stale: !await this.repo.indexSourcesUnchanged(index.commit, main) };
  }
}

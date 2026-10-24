import { sha256, sign, verify } from './crypto';
import { document, edit, newDocument, postPath, taipeiDate } from './document';
import { BlogError, type Env, type FileContent, type Lang, type Repository } from './types';

const META_PATH = '.mcp/draft.json';
const CANDIDATE_PREFIX = 'Blog MCP candidate\n\n';
const SHA = /^[a-f0-9]{40}$/;
export interface DraftMeta {
  slug: string; lang: Lang; base_post_sha: string | null; published_commit?: string;
}
interface Candidate {
  operation_id: string; user_id: string; slug: string; lang: Lang;
  draft_revision: string; base_main: string; content_sha256: string; expires: number;
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
    private loadIndex: () => Promise<ArticleIndex>) {}

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
  async readPost(slug: string, lang: Lang, source: 'draft' | 'published' | 'auto' = 'auto') {
    const value = await this.effective(slug, lang, source);
    return this.view(slug, lang, value.file, value.revision, value.source);
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
      meta = { slug, lang, base_post_sha: published?.sha ?? null };
    }
    const parent = oldDraft?.revision ?? current.main;
    const revision = await this.repo.writeCommit(parent, { [postPath(slug, lang)]: raw, [META_PATH]: JSON.stringify(meta) }, `Draft: ${slug} (${lang})`);
    // A sibling commit from a concurrent update cannot fast-forward this ref.
    if (oldDraft) await this.repo.advanceRef(oldDraft.branch, revision);
    else await this.repo.createRef(this.branch(slug, lang), revision);
    return this.view(slug, lang, { text: raw, sha: '' }, revision, 'draft');
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
    if (raw === original?.text) throw new BlogError('no_changes', 'This draft has no changes to publish');
    const candidate: Candidate = { operation_id: crypto.randomUUID(), user_id: this.userId, slug, lang,
      draft_revision: draft.revision, base_main: main, content_sha256: await sha256(raw), expires: Date.now() + 86400_000 };
    const envelope = await sign(this.env.CONFIRMATION_SECRET, 'candidate', candidate);
    const commit = await this.repo.writeCommit(main, { [postPath(slug, lang)]: raw }, CANDIDATE_PREFIX + envelope);
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
    return { operation_id: operationId, ...validation, preview: await this.view(meta.slug, meta.lang, file, commit.sha, 'candidate'), confirmation,
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

import { createHash } from 'node:crypto';
import { Blog, type ArticleIndex } from '../src/blog';
import { newDocument } from '../src/document';
import type { ImageStorage } from '../src/r2-images';
import { BlogError, type Commit, type Env, type FileChange, type FileContent, type Repository, type Run } from '../src/types';

export const hash = (value: string) => createHash('sha1').update(value).digest('hex');
export const env = {
  GITHUB_OWNER: 'test', GITHUB_REPO: 'blog', GITHUB_BRANCH: 'main', ALLOWED_GITHUB_USER_ID: '123',
  PUBLIC_ORIGIN: 'https://blog-mcp.example.com', SITE_URL: 'https://blog.example.com',
  VALIDATION_WORKFLOW: 'mcp-validate.yaml', DEPLOY_WORKFLOW: 'hugo.yaml', CONFIRMATION_SECRET: 's'.repeat(64),
  ACCESS_TEAM_DOMAIN: 'blog-test.cloudflareaccess.com', ACCESS_AUD: 'a'.repeat(64), ALLOWED_ACCESS_EMAIL: 'linroex@coder.tw',
} as Env;

export class FakeRepo implements Repository {
  branches = new Map<string, string>();
  commits = new Map<string, Commit & { files: Record<string, FileChange> }>();
  workflowRuns = new Map<string, Run[]>();
  failNextMainUpdate = false;
  loseMainResponse = false;
  failBookkeeping = false;
  constructor() {
    const sha = hash('initial');
    this.commits.set(sha, { sha, parents: [], tree: sha, message: 'Initial', files: {
      'hugo.toml': 'baseURL = "https://blog.example.com/"',
      'content/posts/original/index.md': newDocument({ title: 'Original', draft: false, date: '2020-01-01', tags: ['a'], aliases: ['/old/'] }, 'Old content'),
    } });
    this.branches.set('main', sha);
  }
  async head(branch: string) { return this.branches.get(branch) ?? null; }
  async file(path: string, ref: string): Promise<FileContent | null> {
    const text = this.commits.get(ref)?.files[path];
    return text === undefined ? null : { text: typeof text === 'string' ? text : Buffer.from(text.base64, 'base64').toString('utf8'), sha: this.fileHash(text) };
  }
  private fileHash(value: FileChange) { return createHash('sha1').update(typeof value === 'string' ? Buffer.from(value) : Buffer.from(value.base64, 'base64')).digest('hex'); }
  async binary(path: string, ref: string) {
    const value = this.commits.get(ref)?.files[path];
    return value === undefined ? null : { base64: typeof value === 'string' ? Buffer.from(value).toString('base64') : value.base64, sha: this.fileHash(value) };
  }
  async commit(sha: string) { const c = this.commits.get(sha); if (!c) throw new Error('Missing fake commit'); return c; }
  async writeCommit(parent: string, changes: Record<string, FileChange>, message: string) {
    if (this.failBookkeeping && message.startsWith('Published:')) throw new Error('Network error');
    const sha = hash(parent + JSON.stringify(changes) + message);
    this.commits.set(sha, { sha, parents: [parent], tree: sha, message, files: { ...(await this.commit(parent)).files, ...changes } });
    return sha;
  }
  async createRef(branch: string, sha: string) {
    if (this.branches.has(branch)) throw new BlogError('conflict', 'Branch exists');
    this.branches.set(branch, sha);
  }
  async advanceRef(branch: string, sha: string) {
    if (branch === 'main' && this.failNextMainUpdate) {
      this.failNextMainUpdate = false;
      await this.externalEdit('other.txt', 'Concurrent change');
    }
    const previous = this.branches.get(branch)!;
    if (!await this.isAncestor(previous, sha) || this.branches.get(branch) !== previous) throw new BlogError('conflict', 'Non-fast-forward');
    this.branches.set(branch, sha);
    if (branch === 'main' && this.loseMainResponse) { this.loseMainResponse = false; throw new Error('Connection lost after write'); }
  }
  async refs(prefix: string) { return [...this.branches].filter(([b]) => b.startsWith(prefix)).map(([branch, sha]) => ({ branch, sha })); }
  async isAncestor(ancestor: string, descendant: string): Promise<boolean> {
    if (ancestor === descendant) return true;
    const commit = this.commits.get(descendant);
    return !!commit?.parents.length && this.isAncestor(ancestor, commit.parents[0]);
  }
  async runs(workflow: string, sha: string) { return this.workflowRuns.get(`${workflow}:${sha}`) ?? []; }
  async indexSourcesUnchanged(indexed: string, current: string) {
    const sources = (files: Record<string, FileChange>) => Object.entries(files)
      .filter(([path]) => path.startsWith('content/posts/') || ['scripts/blog_content.py', 'scripts/export_mcp_index.py'].includes(path))
      .sort(([a], [b]) => a.localeCompare(b));
    return JSON.stringify(sources((await this.commit(indexed)).files)) === JSON.stringify(sources((await this.commit(current)).files));
  }
  pass(sha: string, branch: string, workflow = 'mcp-validate.yaml', conclusion = 'success') {
    this.workflowRuns.set(`${workflow}:${sha}`, [{ id: 1, head_sha: sha, head_branch: branch, event: 'push', status: 'completed', conclusion, html_url: 'https://github.com/test/blog/actions/runs/1' }]);
  }
  async externalEdit(path: string, value: string) {
    const sha = await this.writeCommit(this.branches.get('main')!, { [path]: value }, 'External edit');
    this.branches.set('main', sha);
  }
}
export function setup(imageStorage?: ImageStorage) {
  const repo = new FakeRepo();
  const index: ArticleIndex = { schema_version: 1, commit: repo.branches.get('main')!, posts: [{ slug: 'original', title: 'Original', summary: '', draft: false, translations: [] }] };
  const blog = new Blog(repo, env, '123', async () => index, imageStorage);
  return { repo, blog, index };
}

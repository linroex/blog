import { base64url, unbase64 } from './crypto';
import { MAX_POST_BYTES } from './document';
import { BlogError, type Commit, type Env, type FileContent, type Repository, type Run } from './types';

const encoder = new TextEncoder();
let cached: { identity: string; token: string; expires: number } | undefined;

export async function installationToken(env: Env, fetcher: typeof fetch = fetch): Promise<string> {
  const identity = `${env.GITHUB_OWNER}/${env.GITHUB_REPO}/${env.GITHUB_APP_ID}/${env.GITHUB_INSTALLATION_ID}/${env.GITHUB_APP_PRIVATE_KEY}`;
  if (cached?.identity === identity && cached.expires > Date.now() + 60_000) return cached.token;
  const pem = env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
  if (!pem.includes('BEGIN PRIVATE KEY')) throw new BlogError('configuration', 'GitHub App private key must be PKCS#8 PEM');
  const key = await crypto.subtle.importKey('pkcs8', unbase64(pem.replace(/-----[^-]+-----|\s/g, '')), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${base64url(encoder.encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' })))}.${base64url(encoder.encode(JSON.stringify({ iat: now - 60, exp: now + 540, iss: env.GITHUB_APP_ID })))}`;
  const jwt = `${unsigned}.${base64url(new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, encoder.encode(unsigned))))}`;
  const response = await fetcher(`https://api.github.com/app/installations/${env.GITHUB_INSTALLATION_ID}/access_tokens`, {
    method: 'POST', headers: headers(jwt),
    body: JSON.stringify({ repositories: [env.GITHUB_REPO], permissions: { contents: 'write', actions: 'read' } }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new BlogError('github_auth', `GitHub App authentication failed (${response.status})`);
  const data = await response.json() as { token: string; expires_at: string };
  cached = { identity, token: data.token, expires: Date.parse(data.expires_at) };
  return data.token;
}
function headers(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'lins-blog-mcp', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' };
}
export class GitHubRepository implements Repository {
  private calls = 0;
  private base: string;
  constructor(private env: Env, private fetcher: typeof fetch = fetch) {
    if (![env.GITHUB_OWNER, env.GITHUB_REPO].every(x => /^[\w.-]+$/.test(x))) throw new BlogError('configuration', 'Invalid configured repository');
    this.base = `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}`;
  }
  private async api<T>(path: string, method = 'GET', body?: unknown, missing = false): Promise<T | null> {
    if (++this.calls > 40) throw new BlogError('request_budget', 'Too many GitHub operations; use a smaller page or retry the operation');
    const token = await installationToken(this.env, this.fetcher);
    let response: Response;
    try {
      response = await this.fetcher(`https://api.github.com${this.base}${path}`, {
        method, headers: headers(token), body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(15_000),
      });
    } catch { throw new BlogError('github_unavailable', 'GitHub request timed out or disconnected; check operation status before retrying a write'); }
    if (missing && response.status === 404) return null;
    if (!response.ok) {
      const conflict = [409, 422].includes(response.status);
      throw new BlogError(conflict ? 'conflict' : 'github_error', `GitHub returned ${response.status}${conflict ? '; reread the version before retrying' : ''}${response.headers.get('retry-after') ? `; retry after ${response.headers.get('retry-after')} seconds` : ''}`);
    }
    return response.status === 204 ? null : await response.json() as T;
  }
  async head(branch: string): Promise<string | null> {
    const ref = await this.api<{ object: { sha: string } }>(`/git/ref/heads/${encodeURIComponent(branch)}`, 'GET', undefined, true);
    return ref?.object.sha ?? null;
  }
  async file(path: string, ref: string): Promise<FileContent | null> {
    const data = await this.api<{ type: string; size: number; sha: string; content: string; encoding: string }>(`/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(ref)}`, 'GET', undefined, true);
    if (!data) return null;
    if (data.type !== 'file' || data.size > MAX_POST_BYTES) throw new BlogError('invalid_file', 'Only regular files up to 2 MiB are supported');
    let encoded = data.content;
    if (data.encoding !== 'base64') {
      const blob = await this.api<{ content: string; encoding: string; size: number }>(`/git/blobs/${data.sha}`);
      if (!blob || blob.size > MAX_POST_BYTES || blob.encoding !== 'base64') throw new BlogError('invalid_file', 'Cannot read GitHub blob');
      encoded = blob.content;
    }
    return { text: new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(unbase64(encoded.replace(/\s/g, ''))), sha: data.sha };
  }
  async commit(sha: string): Promise<Commit> {
    const data = await this.api<{ sha: string; message: string; parents: { sha: string }[]; tree: { sha: string } }>(`/git/commits/${sha}`);
    if (!data) throw new BlogError('missing_commit', 'Commit not found');
    return { sha: data.sha, message: data.message, parents: data.parents.map(p => p.sha), tree: data.tree.sha };
  }
  async writeCommit(parent: string, changes: Record<string, string>, message: string): Promise<string> {
    const base = await this.commit(parent);
    const tree = await this.api<{ sha: string }>('/git/trees', 'POST', {
      base_tree: base.tree, tree: Object.entries(changes).map(([path, content]) => ({ path, mode: '100644', type: 'blob', content })),
    });
    const commit = await this.api<{ sha: string }>('/git/commits', 'POST', { message, tree: tree!.sha, parents: [parent] });
    return commit!.sha;
  }
  async createRef(branch: string, sha: string): Promise<void> { await this.api('/git/refs', 'POST', { ref: `refs/heads/${branch}`, sha }); }
  async advanceRef(branch: string, sha: string): Promise<void> { await this.api(`/git/refs/heads/${encodeURIComponent(branch)}`, 'PATCH', { sha, force: false }); }
  async refs(prefix: string) {
    const refs = await this.api<{ ref: string; object: { sha: string } }[]>(`/git/matching-refs/heads/${encodeURIComponent(prefix)}`);
    return (refs ?? []).map(r => ({ branch: r.ref.replace(/^refs\/heads\//, ''), sha: r.object.sha })).sort((a, b) => a.branch.localeCompare(b.branch));
  }
  async isAncestor(ancestor: string, descendant: string): Promise<boolean> {
    if (ancestor === descendant) return true;
    const result = await this.api<{ status: string }>(`/compare/${ancestor}...${descendant}`);
    return result?.status === 'ahead' || result?.status === 'identical';
  }
  async runs(workflow: string, sha: string): Promise<Run[]> {
    const data = await this.api<{ workflow_runs: Run[] }>(`/actions/workflows/${encodeURIComponent(workflow)}/runs?head_sha=${sha}&event=push&per_page=20`);
    return data?.workflow_runs.filter(r => r.head_sha === sha && r.event === 'push') ?? [];
  }
}

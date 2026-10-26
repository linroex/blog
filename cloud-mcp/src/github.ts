import { base64url, unbase64 } from './crypto';
import { MAX_POST_BYTES } from './document';
import { BlogError, type BinaryContent, type Commit, type Env, type FileChange, type FileContent, type Repository, type Run, type Pull, type Job } from './types';

const encoder = new TextEncoder();
let cached: { identity: string; token: string; expires: number } | undefined;
interface TreeEntry { path: string; sha: string; type: string }

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
    body: JSON.stringify({ repositories: [env.GITHUB_REPO], permissions: { contents: 'write', actions: 'read', pull_requests: 'write' } }),
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
  private repositoryId?: string;
  constructor(private env: Env, private fetcher: typeof fetch = fetch) {
    if (![env.GITHUB_OWNER, env.GITHUB_REPO].every(x => /^[\w.-]+$/.test(x))) throw new BlogError('configuration', 'Invalid configured repository');
    this.base = `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}`;
  }
  private async api<T>(path: string, method = 'GET', body?: unknown, missing = false): Promise<T | null> {
    if (++this.calls > 44) throw new BlogError('request_budget', 'Too many GitHub operations; use a smaller page or retry the operation');
    const token = await installationToken(this.env, this.fetcher);
    // Workerd's global fetch rejects an unrelated receiver (this repository).
    const fetcher = this.fetcher;
    let response: Response;
    try {
      response = await fetcher(`https://api.github.com${path === '/graphql' ? path : this.base + path}`, {
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
  async binary(path: string, ref: string): Promise<BinaryContent | null> {
    const data = await this.api<{ type: string; size: number; sha: string; content: string; encoding: string }>(`/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(ref)}`, 'GET', undefined, true);
    if (!data) return null;
    if (data.type !== 'file' || data.size > MAX_POST_BYTES) throw new BlogError('invalid_file', 'Only regular files up to 2 MiB are supported');
    let encoded = data.content;
    if (data.encoding !== 'base64') {
      const blob = await this.api<{ content: string; encoding: string; size: number }>(`/git/blobs/${data.sha}`);
      if (!blob || blob.size > MAX_POST_BYTES || blob.encoding !== 'base64') throw new BlogError('invalid_file', 'Cannot read GitHub blob');
      encoded = blob.content;
    }
    return { base64: encoded.replace(/\s/g, ''), sha: data.sha };
  }
  async file(path: string, ref: string): Promise<FileContent | null> {
    const data = await this.binary(path, ref);
    return data ? { text: new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(unbase64(data.base64)), sha: data.sha } : null;
  }
  async commit(sha: string): Promise<Commit> {
    const data = await this.api<{ sha: string; message: string; parents: { sha: string }[]; tree: { sha: string } }>(`/git/commits/${sha}`);
    if (!data) throw new BlogError('missing_commit', 'Commit not found');
    return { sha: data.sha, message: data.message, parents: data.parents.map(p => p.sha), tree: data.tree.sha };
  }
  async writeCommit(parent: string, changes: Record<string, FileChange>, message: string): Promise<string> {
    const base = await this.commit(parent);
    const entries = [];
    for (const [path, value] of Object.entries(changes)) {
      if (typeof value === 'string') entries.push({ path, mode: '100644', type: 'blob', content: value });
      else {
        const blob = await this.api<{ sha: string }>('/git/blobs', 'POST', { content: value.base64, encoding: 'base64' });
        entries.push({ path, mode: '100644', type: 'blob', sha: blob!.sha });
      }
    }
    const tree = await this.api<{ sha: string }>('/git/trees', 'POST', {
      base_tree: base.tree, tree: entries,
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
  private async tree(sha: string): Promise<TreeEntry[]> {
    const data = await this.api<{ tree: TreeEntry[]; truncated: boolean }>(`/git/trees/${sha}`);
    if (!data || data.truncated) throw new BlogError('index_check_unavailable', 'Cannot verify article index sources; retry or read_post for current content');
    return data.tree;
  }
  async indexSourcesUnchanged(indexed: string, current: string): Promise<boolean> {
    if (indexed === current) return true;
    const before = await this.commit(indexed);
    const after = await this.commit(current);
    // Walk only the needed non-recursive trees, avoiding compare's 300-file
    // limit and recursive tree truncation. At most eight GitHub requests.
    const samePaths = async (left: string, right: string, paths: string[][]): Promise<boolean> => {
      if (left === right) return true;
      const a = await this.tree(left), b = await this.tree(right);
      for (const name of new Set(paths.map(path => path[0]))) {
        const x = a.find(entry => entry.path === name), y = b.find(entry => entry.path === name);
        if (x?.sha === y?.sha && x?.type === y?.type) continue;
        const children = paths.filter(path => path[0] === name).map(path => path.slice(1));
        if (children.some(path => !path.length) || x?.type !== 'tree' || y?.type !== 'tree' ||
            !await samePaths(x.sha, y.sha, children)) return false;
      }
      return true;
    };
    return samePaths(before.tree, after.tree, [
      ['content', 'posts'], ['scripts', 'blog_content.py'], ['scripts', 'export_mcp_index.py'],
    ]);
  }
  async runs(workflow: string, sha: string): Promise<Run[]> {
    const data = await this.api<{ workflow_runs: Run[] }>(`/actions/workflows/${encodeURIComponent(workflow)}/runs?head_sha=${sha}&event=push&per_page=20`);
    return data?.workflow_runs.filter(r => r.head_sha === sha && r.event === 'push') ?? [];
  }
  private async graphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    const response = await this.api<{ data?: T; errors?: { message: string; type?: string }[] }>('/graphql', 'POST', { query, variables });
    if (!response?.data || response.errors?.length) {
      const conflict = response?.errors?.some(e => /expected|beforeOid|match|changed|reference update/i.test(e.message));
      throw new BlogError(conflict ? 'conflict' : 'github_error', conflict ? 'Version changed; reread before retrying' : 'GitHub GraphQL operation failed; verify App Pull requests read/write permissions');
    }
    return response.data;
  }
  async pulls(branches: string[]): Promise<Record<string, Pull | null>> {
    if (!branches.length) return {};
    const unique = [...new Set(branches)];
    if (unique.length > 10) throw new BlogError('request_budget', 'At most ten draft PRs per page');
    const fields = unique.map((branch, i) => `p${i}: pullRequests(headRefName: ${JSON.stringify(branch)}, first: 1, states: [OPEN, CLOSED, MERGED], orderBy: {field: CREATED_AT, direction: DESC}) { nodes { number id url state isDraft merged headRefName headRefOid baseRefName headRepository { nameWithOwner } mergeCommit { oid } commits(last: 1) { nodes { commit { message } } } } }`).join('\n');
    const data = await this.graphql<{ repository: { id: string; [key: string]: unknown } }>(
      `query($owner: String!, $name: String!) { repository(owner: $owner, name: $name) { id ${fields} } }`, { owner: this.env.GITHUB_OWNER, name: this.env.GITHUB_REPO });
    this.repositoryId = data.repository.id;
    return Object.fromEntries(unique.map((branch, i) => {
      const p = (data.repository[`p${i}`] as { nodes: any[] }).nodes[0];
      if (p && (p.baseRefName !== this.env.GITHUB_BRANCH || p.headRepository?.nameWithOwner !== `${this.env.GITHUB_OWNER}/${this.env.GITHUB_REPO}`)) {
        throw new BlogError('invalid_operation', 'PR repository or base mismatch');
      }
      return [branch, p ? { number: p.number, node_id: p.id, url: p.url, branch: p.headRefName, head: p.headRefOid,
        state: p.state === 'OPEN' ? 'open' : 'closed', draft: p.isDraft, merged: p.merged, merge_commit: p.mergeCommit?.oid ?? null, message: p.commits?.nodes[0]?.commit.message } : null];
    }));
  }
  private fromPull(p: any): Pull {
    const repository = `${this.env.GITHUB_OWNER}/${this.env.GITHUB_REPO}`;
    if (!p || p.head.repo?.full_name !== repository || p.base.repo?.full_name !== repository || p.base.ref !== this.env.GITHUB_BRANCH) {
      throw new BlogError('invalid_operation', 'PR repository or base mismatch');
    }
    return { number: p.number, node_id: p.node_id, url: p.html_url, branch: p.head.ref, head: p.head.sha,
      state: p.state, draft: p.draft, merged: !!p.merged, merge_commit: p.merge_commit_sha ?? null };
  }
  async pull(number: number) { return this.fromPull(await this.api(`/pulls/${number}`)); }
  async createPull(branch: string, title: string, body: string) {
    return this.fromPull(await this.api('/pulls', 'POST', { head: branch, base: this.env.GITHUB_BRANCH, title, body, draft: true, maintainer_can_modify: false }));
  }
  async updatePull(number: number, title: string, body: string, state?: 'open' | 'closed') {
    return this.fromPull(await this.api(`/pulls/${number}`, 'PATCH', { title, body, ...(state ? { state } : {}) }));
  }
  async setPullDraft(pull: Pull, draft: boolean) {
    if (pull.draft === draft) return;
    const operation = draft ? 'convertPullRequestToDraft' : 'markPullRequestReadyForReview';
    await this.graphql(`mutation($id: ID!) { ${operation}(input: {pullRequestId: $id}) { pullRequest { id } } }`, { id: pull.node_id });
  }
  async mergePull(number: number, expectedHead: string) {
    const data = await this.api<{ merged: boolean; sha: string }>(`/pulls/${number}/merge`, 'PUT', { sha: expectedHead, merge_method: 'merge' });
    if (!data?.merged || !/^[a-f0-9]{40}$/.test(data.sha)) throw new BlogError('conflict', 'PR was not merged; inspect its status');
    return data.sha;
  }
  async syncReviewRef(branch: string, before: string | null, after: string, source: string, revision: string, main: string) {
    if (!/^mcp\/reviews\/[a-f0-9-]{36}$/.test(branch) || !/^mcp\/drafts\/[a-z0-9]+(?:-[a-z0-9]+)*\/(zh-tw|en|ja)$/.test(source)) throw new BlogError('invalid_operation', 'Invalid managed review branch');
    if (!this.repositoryId) await this.pulls([branch]);
    // The clean snapshot may rewrite only this managed review ref. Guard the
    // source draft and base in the same atomic transaction; never force main.
    await this.graphql('mutation($input: UpdateRefsInput!) { updateRefs(input: $input) { clientMutationId } }', { input: {
      repositoryId: this.repositoryId, refUpdates: [
        { name: `refs/heads/${source}`, beforeOid: revision, afterOid: revision, force: false },
        { name: `refs/heads/${this.env.GITHUB_BRANCH}`, beforeOid: main, afterOid: main, force: false },
        { name: `refs/heads/${branch}`, beforeOid: before ?? '0'.repeat(40), afterOid: after, force: true },
      ],
    } });
  }
  async deleteDraftRefs(source: string, revision: string, review?: { branch: string; revision: string }) {
    if (!/^mcp\/drafts\/[a-z0-9]+(?:-[a-z0-9]+)*\/(zh-tw|en|ja)$/.test(source) || !/^[a-f0-9]{40}$/.test(revision) ||
        (review && (!/^mcp\/reviews\/[a-f0-9-]{36}$/.test(review.branch) || !/^[a-f0-9]{40}$/.test(review.revision)))) throw new BlogError('invalid_operation', 'Invalid managed draft branch');
    if (!this.repositoryId) {
      const data = await this.graphql<{ repository: { id: string } }>('query($owner: String!, $name: String!) { repository(owner: $owner, name: $name) { id } }', { owner: this.env.GITHUB_OWNER, name: this.env.GITHUB_REPO });
      this.repositoryId = data.repository.id;
    }
    await this.graphql('mutation($input: UpdateRefsInput!) { updateRefs(input: $input) { clientMutationId } }', { input: {
      repositoryId: this.repositoryId,
      refUpdates: [{ branch: source, revision }, ...(review ? [review] : [])].map(ref => ({
        name: `refs/heads/${ref.branch}`, beforeOid: ref.revision, afterOid: '0'.repeat(40), force: false,
      })),
    } });
  }
  async jobs(run: number): Promise<Job[]> {
    const data = await this.api<{ jobs: Job[] }>(`/actions/runs/${run}/jobs?per_page=100`);
    return data?.jobs ?? [];
  }
}

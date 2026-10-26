export interface Env {
  PUBLIC_ORIGIN: string;
  ACCESS_TEAM_DOMAIN: string;
  ACCESS_AUD: string;
  ALLOWED_ACCESS_EMAIL: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH: string;
  ALLOWED_GITHUB_USER_ID: string;
  SITE_URL: string;
  VALIDATION_WORKFLOW: string;
  DEPLOY_WORKFLOW: string;
  GITHUB_APP_ID: string;
  GITHUB_INSTALLATION_ID: string;
  GITHUB_APP_PRIVATE_KEY: string;
  CONFIRMATION_SECRET: string;
  R2_ACCOUNT_ID?: string;
  R2_BUCKET_NAME?: string;
  R2_PUBLIC_BASE_URL?: string;
  R2_ACCESS_KEY_ID?: string;
  R2_SECRET_ACCESS_KEY?: string;
  IMAGE_MAX_BYTES?: string;
  IMAGES?: {
    input(stream: ReadableStream<Uint8Array>): {
      output(options: { format: 'image/webp'; quality: number; anim: boolean }): Promise<{ response(): Response }>;
    };
  };
}

export class BlogError extends Error {
  constructor(public code: string, message: string) { super(message); }
}

export type Lang = 'zh-tw' | 'en' | 'ja';
export interface FileContent { text: string; sha: string }
export interface BinaryContent { base64: string; sha: string }
export type FileChange = string | { base64: string };
export interface Commit { sha: string; message: string; parents: string[]; tree: string }
export interface Run {
  id: number;
  head_sha: string;
  head_branch: string;
  event: string;
  status: string;
  conclusion: string | null;
  html_url: string;
}
export interface Pull {
  number: number; node_id: string; url: string; branch: string; head: string;
  state: 'open' | 'closed'; draft: boolean; merged: boolean; merge_commit: string | null; message?: string;
}
export interface Job { name: string; status: string; conclusion: string | null }
export interface Repository {
  head(branch: string): Promise<string | null>;
  file(path: string, ref: string): Promise<FileContent | null>;
  binary(path: string, ref: string): Promise<BinaryContent | null>;
  commit(sha: string): Promise<Commit>;
  writeCommit(parent: string, changes: Record<string, FileChange>, message: string): Promise<string>;
  createRef(branch: string, sha: string): Promise<void>;
  advanceRef(branch: string, sha: string): Promise<void>;
  refs(prefix: string): Promise<{ branch: string; sha: string }[]>;
  isAncestor(ancestor: string, descendant: string): Promise<boolean>;
  indexSourcesUnchanged(indexed: string, current: string): Promise<boolean>;
  runs(workflow: string, sha: string): Promise<Run[]>;
  pulls(branches: string[]): Promise<Record<string, Pull | null>>;
  pull(number: number): Promise<Pull>;
  createPull(branch: string, title: string, body: string): Promise<Pull>;
  updatePull(number: number, title: string, body: string, state?: 'open' | 'closed'): Promise<Pull>;
  setPullDraft(pull: Pull, draft: boolean): Promise<void>;
  mergePull(number: number, expectedHead: string): Promise<string>;
  syncReviewRef(branch: string, before: string | null, after: string, source: string, revision: string, main: string): Promise<void>;
  jobs(run: number): Promise<Job[]>;
}

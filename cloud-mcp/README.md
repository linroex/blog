# Blog MCP on Cloudflare Workers

Remote Streamable HTTP MCP for the existing Hugo repository. The site remains on
GitHub Pages; the Worker uses GitHub APIs, and never connects to your computer.
The original `scripts/mcp_server.py` remains available for local stdio clients.

## Architecture and publication contract

```text
ChatGPT → HTTPS /mcp + OAuth → Worker → GitHub App → linroex/blog
                                             ├─ mcp/drafts/<slug>/<lang>
                                             ├─ mcp/candidates/<operation UUID> → Hugo + SEO checks
                                             └─ main → existing Pages workflow → coder.tw
```

- OAuth uses GitHub only to identify the owner, by numeric GitHub user ID. The
  separate GitHub App installation token grants repository access. Neither the
  App key nor an upstream GitHub token is returned to the MCP client.
- Drafts are Git commits with `draft: true`. **Branches in a public repository
  are public, including their history**, even though the draft is absent from
  the live site. No private draft storage is promised.
- A draft's `.mcp/draft.json` records its language and original published blob
  SHA. This file stays on the draft branch. Candidates are fresh commits on main
  with **only one Markdown file changed**; draft branch history is not merged.
- Candidates set `draft: false` and trigger `mcp-validate.yaml`. The Worker checks
  the exact candidate SHA, workflow and branch, then issues a signed confirmation
  valid for 24 hours. The client must show the entire preview and get explicit
  approval. A token identifies content; it cannot prove a human approved it.
- Publishing uses a non-forced ref update. Changed main/draft revisions invalidate
  the operation. Concurrent main writes cannot be overwritten. If a draft edit
  arrives after the final version check, the already-approved snapshot may be
  published, but that newer draft is preserved and is never silently published.
- A retry recognizes the candidate in main's ancestry, including after the token
  expires. `get_operation_status` repairs interrupted draft bookkeeping and checks
  the Pages workflow. A commit and a successful deployment are separate states.
- Draft/candidate branches are retained as recovery history. They can be removed
  manually after publication; deleting candidate refs removes status/retry lookup
  for those operation IDs. Do not remove them while a publication is pending.

## Local verification

Node 24+ and Python 3.11+ are required. Dependencies are pinned in the lockfile.

```sh
cd cloud-mcp
npm ci
npm run check
npm test
npm run build
npm run smoke
cd ..
python3 -m unittest discover -s scripts -p 'test_*.py'
```

The smoke test runs the bundled Worker in workerd with disposable local KV. It
does not deploy or access GitHub. Unit/integration tests exercise OAuth consent,
PKCE code exchange, owner checks, MCP discovery and publication recovery. The
Node tests replace only Cloudflare's WorkerEntrypoint base class with a shim;
the OAuth implementation and cryptography are the real dependency.

`undici` is overridden to 7.30.1 because the installed Wrangler/Miniflare chain
otherwise resolves a version with published advisories. Recheck `npm audit` when
updating Wrangler. MCP server/client are pinned to Agents' required peer version.

For interactive local development, copy `.dev.vars.example` to `.dev.vars`,
fill it locally, and configure `wrangler.local.jsonc` as described below. Run:

```sh
npm run dev -- --config wrangler.local.jsonc --local-protocol https --var PUBLIC_ORIGIN:https://localhost:8787
```

GitHub OAuth cookies are Secure; use a separate development OAuth app with
`https://localhost:8787/callback` as its callback for browser login tests.
ChatGPT integration testing uses the deployed endpoint, not a tunnel.

## One-time setup and deployment

These are sequential parts of one setup. First use a **test GitHub repository**
with copies of the blog and workflows. Only change the configured repository to
the production blog after the complete authoring flow succeeds. Keep the base
branch named `main`; the checked-in workflows use that name.

### 1. Land the workflows and index

Merge this implementation into main before creating remote drafts. A candidate
inherits its workflow from main. The Pages build now exports `/mcp-index.json`
with all original article metadata, translation availability and the source SHA.
Wait for the initial Pages deployment. No article bodies are included in the index.

On a test repo, adjust the workflows' fixed base URL, Hugo config and `SITE_URL`
to the test Pages URL so production is not used as a test destination.

### 2. Cloudflare account and KV

```sh
cd cloud-mcp
npx wrangler login
npx wrangler kv namespace create OAUTH_KV
```

Copy `wrangler.jsonc` to the git-ignored `wrangler.local.jsonc` and set:

- `name`: your permanent Worker name, e.g. `lins-blog-mcp`.
- `PUBLIC_ORIGIN`: `https://lins-blog-mcp.<your-subdomain>.workers.dev`, no trailing slash.
- `kv_namespaces[0].id`: the namespace ID from the previous command.
- `GITHUB_OWNER`, `GITHUB_REPO`, `SITE_URL`: the intended test or production repo/site.
- `ALLOWED_GITHUB_USER_ID`: get your numeric ID with `gh api user --jq .id` after
  `gh auth login`. Use the numeric ID, not your changeable username.

Leave `preview_urls: false`. OAuth metadata has one canonical production origin.
Do not change the KV binding name or remove `global_fetch_strictly_public`.

### 3. GitHub OAuth app: owner sign-in only

Create an OAuth App at <https://github.com/settings/developers>:

- Homepage: the exact `PUBLIC_ORIGIN`.
- Callback: `<PUBLIC_ORIGIN>/callback`.
- Save its client ID and secret using the commands below.

The login flow requests no repository scope. It asks for consent per MCP client,
uses browser-bound state and upstream PKCE, then checks `/user` against the
allowlisted numeric ID. A different account is rejected even if it can sign in.

### 4. GitHub App: only this repository

Create a private GitHub App at <https://github.com/settings/apps/new>, disable
webhooks, and install it **only on the selected blog repo**. Repository permissions:

| Permission | Access |
| --- | --- |
| Contents | Read and write |
| Actions | Read-only |
| Metadata | Read-only (implicit) |

No workflow-edit, organization, pull-request or administration access is needed.
Record the App ID and installation ID, and download its private key. Installation
tokens are requested for the configured repository only and refreshed on demand.

GitHub's downloaded RSA key is usually PKCS#1. Convert it to PKCS#8 locally:

```sh
openssl pkcs8 -topk8 -nocrypt -in /secure/path/app.pem -out /secure/path/app.pkcs8.pem
```

Store the following Worker secrets; never put them in Git, ChatGPT messages, or
`wrangler.jsonc`. Each command prompts for the value:

```sh
npx wrangler secret put GITHUB_CLIENT_ID --config wrangler.local.jsonc
npx wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.local.jsonc
npx wrangler secret put GITHUB_APP_ID --config wrangler.local.jsonc
npx wrangler secret put GITHUB_INSTALLATION_ID --config wrangler.local.jsonc
npx wrangler secret put GITHUB_APP_PRIVATE_KEY --config wrangler.local.jsonc < /secure/path/app.pkcs8.pem
openssl rand -hex 32 | npx wrangler secret put CONFIRMATION_SECRET --config wrangler.local.jsonc
```

Secrets may create the Worker before its code is deployed. If the CLI requires
creating the Worker first, deploy the configured code, then add secrets; it cannot
authenticate users or write GitHub content until those secrets are present.

Check main's branch rules before rollout. This implementation requires the App
to perform a direct fast-forward update. Do not silently disable branch rules or
add a broad bypass; if existing rules prohibit this, choose an explicit narrow
App exception or revise the publication design before production use.

### 5. Deploy, inspect, connect

```sh
npm run check
npm test
npm run build
npm run smoke
npm run deploy -- --config wrangler.local.jsonc
```

Use MCP Inspector with Streamable HTTP and `<PUBLIC_ORIGIN>/mcp`. Verify owner
login, and verify an anonymous request gets HTTP 401. Resource metadata is at
`/.well-known/oauth-protected-resource/mcp` (also advertised in the 401 challenge),
and authorization metadata at `/.well-known/oauth-authorization-server`.

Add that same `/mcp` URL as a custom MCP server in ChatGPT and choose OAuth.
The service supports CIMD and dynamic client registration. Do not put the GitHub
App token into ChatGPT. Custom MCP availability depends on your ChatGPT account
and workspace policy. No App Store publication or OpenAI API key is required for
this personal integration.

On the test repo, perform: create → edit → prepare → poll → review full preview →
explicitly approve → publish → poll deployment. Then test an edit from another
client and a retry after interrupting a publication response. Repeat owner login
after switching to production settings, then publish only an intended article.

## Tool differences from stdio

| Tool | Remote contract |
| --- | --- |
| `list_posts` | `query`, `offset`, `limit` (1–50); `draft_offset`, `draft_limit` (1–10, default 5). Returns indexed `posts` and a **separate** `drafts` page, `next_draft_offset`, `indexed_commit`, `current_main_commit`, `index_stale`. Draft cursor advances through branches, including archived entries, so follow it even for an empty filtered page. |
| `read_post` | `slug`, optional `lang`, `source` = `auto` / `draft` / `published`. `auto` prefers an active draft. Returns full content, frontmatter and `revision`. |
| `create_post` | Same authoring fields as local; immediately commits to a dedicated draft branch. A translation requires an original in draft or main. |
| `update_post` | Requires `expected_revision`. Optional `expected_published_revision` plus full `content` explicitly reconciles an external edit after reading both versions. No automatic merge or overwrite. |
| `prepare_publish` | Returns `operation_id` and `candidate_commit`, starts validation. Publish the original before its translations. |
| `get_operation_status` | `operation_id`; returns queued/validating/ready/stale/expired/validation_failed/deploying/deployed/deployment_failed. Ready includes complete preview and confirmation. May repair post-publication bookkeeping. |
| `publish_post` | `slug`, `lang`, `confirmation`; always updates remote main after validation and explicit approval. No `push_to_remote` or local-commit mode. |
| `get_repo_status`, `read_config` | Replace local Git status and expose Hugo config through tools. |

Local `validate_site`, `git_status`, `push_commits` and `blog://` resources are not
exposed remotely. Validation is part of preparation, and reads are tools so
clients need not support resource browsing. All tools require owner authorization.

The index can lag main until Pages finishes. Never use it for existence checks or
publication decisions: the Worker reads those from GitHub. If the initial index
has not deployed, `list_posts` reports `index_unavailable`; direct reads still work.

## Operations, failure recovery and costs

- `conflict` during editing: reread the draft and retry using its new revision.
- Published article changed since the draft began: read `source: published` and
  `source: draft`, reconcile their contents, then call `update_post` with both
  expected revisions and complete merged content. Prepare and confirm again.
- Main moved after preparation: prepare again, wait for a new check and approve
  the new preview. Never force-update a ref.
- Publication response lost: retry the **same** confirmation or poll its operation
  ID. A successful commit is recovered without creating another publication.
- `draft_cleanup_pending: true`: poll status again. The website commit already
  succeeded; do not republish. Newer draft edits are never removed by cleanup.
- Validation failed: follow `actions_url`, correct the draft, and prepare again.
  If status stays queued, verify `mcp-validate.yaml` was already on main before the
  draft was created. App-token pushes trigger Actions; do not substitute an
  Actions `GITHUB_TOKEN` for the App token.
- Deployment failed: main already contains the article. Inspect/re-run the Pages
  workflow; publishing again is unnecessary. An Actions API outage can hide a
  successful ref update, so inspect status before attempting a different action.
- To stop remote access, disable the Worker or uninstall the GitHub App. Changing
  the allowlisted user ID also rejects existing MCP tokens. Rotating the signing
  secret invalidates outstanding operation envelopes/confirmations; finish or
  record pending operations first. To undo a website change, revert its commit
  through the normal repo workflow, without force pushing.

Start on Workers Free and KV free quotas. Workers Free currently limits CPU to
10 ms per request and external subrequests to 50. Draft pagination and a static
~90 KB article index bound GitHub reads; no Hugo build runs in Workers. Article
files retain the 2 MiB limit, but processing a maximum-size article on the free
CPU quota must be checked on the deployed service, not inferred from local tests.
Monitor Workers CPU/errors, KV usage, GitHub rate limits and Actions run results.
Quota exhaustion returns an error; nothing automatically upgrades your account.

Public repositories using standard GitHub-hosted runners have free Actions
execution; private repositories consume your plan's included minutes/storage.
The Worker makes no model API calls. No fixed hosting bill is intended, but zero
cost depends on actual usage and account limits.

Official references: [Cloudflare MCP](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/),
[OAuth provider](https://github.com/cloudflare/workers-oauth-provider),
[Workers limits](https://developers.cloudflare.com/workers/platform/limits/),
[GitHub ref updates](https://docs.github.com/en/rest/git/refs),
[ChatGPT connection](https://developers.openai.com/plugins/deploy/connect-chatgpt),
[ChatGPT OAuth](https://developers.openai.com/plugins/build/auth).

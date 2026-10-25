# Blog MCP on Cloudflare Workers

Remote Streamable HTTP MCP for the existing Hugo repository. The site remains on
GitHub Pages; the Worker uses GitHub APIs, and never connects to your computer.
This is the only supported Blog MCP implementation. The former local stdio
server and its client registrations have been retired.

Production endpoint: `https://lins-blog-mcp.linroex.workers.dev/mcp`.
The checked-in `wrangler.jsonc` contains the production account and owner allowlist;
it contains no credentials. Configure the Access team domain and audience from the
actual Access application before deploying. Use an ignored `wrangler.local.jsonc`
for test overrides. See `access-rollout.json` for the deployed IDs, acceptance
evidence and the seven-day legacy KV retention deadline. The current ChatGPT
connection is **Blog MCP**; its previous `blog` installation was retired.
The GitHub App is `linroex-blog-mcp`, installed only on `linroex/blog`.
GitHub App credentials and the publication confirmation key remain Worker secrets.
Cloudflare Access owns login, client registration, access tokens and refresh grants.

## Architecture and publication contract

```text
ChatGPT → Managed OAuth → Worker-level Access → ctx.access + Access JWT
                                                 ↓
                                           GitHub App → linroex/blog
                                             ├─ mcp/drafts/<slug>/<lang>
                                             ├─ mcp/candidates/<operation UUID> → Hugo + SEO checks
                                             └─ main → existing Pages workflow → coder.tw
```

- Worker-level Access protects production and previews across every attached
  hostname. Access authenticates before the Worker executes. Preview URLs stay
  disabled; do not add hostname/path rules or Bypass policies that override it.
- Only `linroex@coder.tw` may sign in, using Email one-time PIN. Managed OAuth
  access tokens last 15 minutes; refresh grants last 14 days. Localhost and
  loopback registration are disabled. The redirect allowlist contains only the
  exact callback observed for this ChatGPT connection.
- Every Worker route additionally requires `ctx.access` with the configured
  application audience and allowed email, plus a verified
  `Cf-Access-Jwt-Assertion`. `jose.jwtVerify` permits only RS256 and checks the
  fixed team issuer, application audience, required `exp`/`iat`/`sub`/`email`,
  validity times, application-token type and agreement with the platform email.
  An opaque Managed OAuth bearer is resolved by Access, never decoded by us.
- JWKS comes only from `https://<ACCESS_TEAM_DOMAIN>/cdn-cgi/access/certs`.
  The isolate reuses jose's resolver: 10-minute cache, 30-second rotation
  cooldown, 5-second fetch timeout, and no HTTP redirects. An outage may use
  still-fresh cached public keys; a cold/stale cache or unknown key fails closed.
  Request headers such as `jku`, `x5u`, `jwk` and forwarded email never choose keys
  or substitute for platform authentication. Tokens/private keys are not logged.
- The verified email maps to the existing numeric `ALLOWED_GITHUB_USER_ID`
  (`1254953` in production), preserving draft, candidate and confirmation
  ownership. The separate repository-scoped GitHub App installation token
  supplies Contents read/write and Actions/Metadata read-only access.
- Drafts are Git commits with `draft: true`. **Branches in a public repository
  are public, including their history**, even though the draft is absent from
  the live site. No private draft storage is promised.
- A draft's `.mcp/draft.json` records its language and original published blob
  SHA. This file stays on the draft branch. Candidates are fresh commits on main
  with **only the selected Markdown file and declared new image files changed**;
  draft branch history is not merged. Images-only candidates are also allowed.
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

## Following a request through the code

Start with [src/index.ts](src/index.ts), then follow the dependencies below.
The Worker handles HTTP MCP and GitHub API calls; Hugo builds run in Actions.
Python scripts in `scripts/` are build/index/validation helpers, not MCP servers.

| Layer | Entry point | Responsibility |
| --- | --- | --- |
| HTTP entry | [src/index.ts](src/index.ts), `fetch` | Validate configuration and origin, verify Access identity, route `/health` and `/mcp`, bound the request body, construct `GitHubRepository` and `Blog`, invoke the Agents MCP handler. |
| Owner authentication | [src/auth.ts](src/auth.ts), `verifyAccess` | Require platform `ctx.access` and a signed Access JWT; map the verified owner email to the existing numeric owner ID. |
| MCP interface | [src/mcp.ts](src/mcp.ts), `createServer` | Register ten tools, validate input schemas, translate tool calls to `Blog` methods and return structured results/errors. |
| Authoring and publication | [src/blog.ts](src/blog.ts), `Blog` | Select draft/published revisions, enforce conflicts, create candidates, poll validation, issue confirmations, update main and recover interrupted publications. |
| GitHub persistence | [src/github.ts](src/github.ts), `installationToken`, `GitHubRepository` | Obtain a repo-scoped App token; read/write blobs, trees, commits and refs; query Actions. Ref updates always use `force: false`. |
| Article format and signatures | [src/document.ts](src/document.ts), [src/crypto.ts](src/crypto.ts), [src/types.ts](src/types.ts) | Restrict article paths/languages, parse and edit frontmatter, enforce file limits, hash content and sign purpose-specific candidate/confirmation envelopes. |
| Uploaded images | [src/images.ts](src/images.ts), `Blog.uploadImage` | Validate image names, size, base64 and signatures; save binary files to the selected draft and bind image hashes into its publication candidate. |
| Candidate checks | [mcp-validate.yaml](../.github/workflows/mcp-validate.yaml), [check_mcp_candidate.py](../scripts/check_mcp_candidate.py) | On candidate pushes, check the recorded parent, selected file and content hash, then build Hugo and validate SEO. The Worker verifies the signed envelope and exact workflow result before publication. |
| Website and search index | [hugo.yaml](../.github/workflows/hugo.yaml), [export_mcp_index.py](../scripts/export_mcp_index.py) | Build/deploy main to Pages and export `/mcp-index.json`; `index.ts:loadIndex` uses that metadata for listing. Article reads and publication decisions use GitHub directly. |

One publication crosses these layers in this order:

1. Access authenticates the client before Worker execution. `index.ts` calls
   `verifyAccess`, then `createServer` routes the validated tool input to `Blog`.
2. `createPost` / `updatePost` write an article with `draft: true` plus
   `.mcp/draft.json` on its draft branch. Updates require `expected_revision`.
   `readPost` defaults to the active draft; `source: published` reads main.
3. `preparePublish` checks the original article's blob SHA and translation
   prerequisites, then creates a candidate containing the article and its
   declared new images on the current main. Existing images cannot be overwritten.
   Its commit message stores a signed operation envelope; creating the candidate
   ref triggers `mcp-validate.yaml`. This does not update main.
4. `operationStatus` reconstructs the operation from the candidate ref and commit
   message, checks expiry and main/draft revisions, then checks Actions for that
   exact candidate. When ready, it returns the full preview and confirmation.
   The expiry is fixed at preparation time, 24 hours after `preparePublish`.
5. After the user approves that preview, `publishPost` verifies the confirmation,
   rechecks revisions and validation, then advances main to the candidate without
   force. It checks whether the candidate is already in main's ancestry before
   checking expiry, so a lost publication response can be retried safely.
6. `publishedResult` / `finishDraft` mark the matching draft as published and
   query `hugo.yaml` for the candidate SHA on main. Status polling can retry draft
   bookkeeping; newer draft edits are preserved. Only a successful deployment
   workflow produces `hosting_deployment_confirmed: true`.

Durable application state is in GitHub, not Worker memory or a local checkout:

| State | Location |
| --- | --- |
| Published articles | `main:content/posts/<slug>/index.md`, `index.en.md`, `index.ja.md` |
| Draft content and publication baseline | `mcp/drafts/<slug>/<lang>`: article file plus `.mcp/draft.json` (`base_post_sha`, optional `published_commit`) |
| Operation snapshot and recovery identity | `mcp/candidates/<operation_id>`: candidate commit, parent SHA and signed envelope in its commit message |
| Validation and deployment results | GitHub Actions runs, selected by workflow, commit SHA and branch |
| Listing metadata | Pages `/mcp-index.json`, tagged with its source commit; may lag main |

The current Worker has no KV binding. Its cached App token and JWKS resolver are
temporary caches, not publication state. Preserve candidate refs and the signing
secret when recovering pending operations.

## Deployment configuration outside the code

Reading `auth.ts` alone does not reconstruct the edge authentication policy.
Worker-level Access and Managed OAuth are Cloudflare platform settings applied
before this code runs.

| Source | What it records |
| --- | --- |
| [wrangler.jsonc](wrangler.jsonc) | Worker entry, canonical origin, Access team/AUD, owner allowlist, GitHub repo/workflows and disabled preview URLs. Credentials are Worker secrets. |
| Cloudflare Access dashboard | Worker destination covering production/previews, owner-only Email PIN policy, Managed OAuth/DCR, exact ChatGPT callback and token/grant lifetimes. Use [Access setup and cutover](#access-setup-and-cutover) to reproduce these settings. |
| [access-application.example.json](access-application.example.json) | Example API shape for the platform configuration; not an automatically applied deployment manifest. |
| [access-rollout.json](access-rollout.json) | Dated acceptance evidence, deployed IDs and legacy cleanup deadline. This is a rollout record, not a live platform inventory. |
| GitHub App installation | Selected repository and permissions; App credentials and `CONFIRMATION_SECRET` live in Worker secrets. |

When changing authentication or deployment, update this contract and the relevant
configuration together, then record new acceptance evidence. Local tests cover
code behavior; `npm run check:edge` covers anonymous edge rejection/discovery.
Owner login, actual platform policy and refresh across token expiry require live
acceptance separately. The current rollout record identifies which checks passed
and which remain unexercised.

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

The smoke test runs the bundled Worker in workerd with generated RSA test keys,
a local JWKS responder and simulated `ctx.access`. It verifies private routes,
real signature checks, retired OAuth routes and ten MCP tools without GitHub
access. Node integration tests also read a mocked article through HTTP MCP.
Tests cover forged signatures, issuer/audience/expiry/user/context failures, old
bearers, rotation, fresh/stale cache behavior and unavailable/malformed JWKS.
Publication tests retain optimistic concurrency, preview confirmation and retry
recovery coverage. No production test article is published.

`undici` remains pinned to 7.30.1. MCP server/client versions match Agents' peer
requirements. `jose` is a direct pinned dependency; the custom OAuth provider is
removed. Local smoke tests prove runtime compatibility, not the production edge.

`npm run check:edge` explicitly probes the deployed endpoint without credentials.
It checks seven private paths, discovery/PKCE/refresh support and denial of
localhost, loopback and unapproved redirect registrations. It does not prove a
successful owner sign-in or replace review of the platform policy inventory.

## Access setup and cutover

These are sequential steps of one migration. Keep the same Worker and `/mcp`
URL. Do not add a tunnel, container or another Worker. Use the existing GitHub
App `linroex-blog-mcp`, installed only on `linroex/blog`.

1. Complete the local checks above. Verify the existing GitHub App still has only
   Contents read/write, Actions read and Metadata read permissions. Keep its
   secrets and `CONFIRMATION_SECRET` unchanged.
2. In Cloudflare Zero Trust, create an Allow policy with **one email include**:
   `linroex@coder.tw`. Restrict this application's login to the Email one-time PIN
   provider. Do not include a domain-wide allow, account membership allow,
   Everyone, Service Auth or Bypass rule.
3. In the existing Worker's **Access** tab, choose **All traffic** and attach only
   that owner policy. The Access destination must be `type: worker`, tied to the
   Worker's immutable ID, covering both production and preview deployments.
   Leave Wrangler `preview_urls: false`. Inspect all Access applications and
   Worker routes/Custom Domains for hostname/path policies that take precedence;
   remove only conflicting rules for this Worker. Preserve unrelated apps.
4. Edit that Access application's Advanced settings: enable Managed OAuth and
   dynamic registration, disable localhost and loopback clients, and allow only
   the **exact callback observed in ChatGPT**. Current connection was observed
   using `https://chatgpt.com/connector/oauth/m5S71mpwznhr`; confirm again
   after changing authorization servers. Set access token lifetime to `15m` and
   grant duration to `336h` (14 days). Never enable a wildcard callback merely to
   make registration pass. See `access-application.example.json` for API shape.
5. Copy the actual team hostname (without scheme/path) and application AUD into
   `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` in Wrangler. Keep
   `ALLOWED_ACCESS_EMAIL=linroex@coder.tw` and numeric owner ID `1254953`.
   Placeholder/malformed Access configuration returns 503. Deploy **only after
   platform Access is enabled**. A short outage during this sequence is expected.
   `wrangler.local.jsonc` is ignored; keep its production values in sync if used.

   ```sh
   WRANGLER_LOG_PATH=.wrangler/logs npm run deploy
   ```

6. Run `npm run check:edge`. Verify anonymous and old-token requests to `/mcp`, `/health`, `/authorize`,
   `/register`, `/token` and arbitrary paths cannot execute tools. Access must
   supply its OAuth discovery/challenge at the edge. The Worker no longer
   implements `/authorize`, `/callback`, `/register`, `/token` or discovery;
   authenticated requests that reach those retired routes return 404.
7. Existing ChatGPT apps may cache the old OAuth issuer/endpoints. Refreshing
   tools did not replace this configuration during the migration; create a new
   custom MCP connection with DCR and inspect its newly generated callback.
   Update only that exact callback in Access before connecting. Uninstall the
   old connection after successful acceptance; no GitHub data is stored in it.
   Verify a real **Managed OAuth** request succeeds at `/health` (not just a
   browser cookie). Its 200 response is possible only after both `ctx.access`
   and Access JWT verification. Reconnect the existing Blog plugin in ChatGPT,
   confirm exactly ten tools (including `upload_image`), and read a published article. Test refresh-token
   renewal and compare the actual access-token lifetime with 900 seconds.
   Do not publish a test article. If the JWT/context combination is unavailable,
   leave Access enabled and MCP paused while investigating.
8. Only after live acceptance, remove `GITHUB_CLIENT_ID` and
   `GITHUB_CLIENT_SECRET` Worker secrets and the `OAUTH_KV` binding from both
   Wrangler configs; redeploy and recheck. Remove the old login credentials
   from ignored local secret files too. Preserve GitHub App credentials and
   `CONFIRMATION_SECRET`. The detached old KV namespace
   `98e83579992f434880d63b09150fc0b1` must remain for seven days after acceptance;
   record the acceptance/earliest cleanup timestamps in the rollout record.
   Current earliest cleanup is **2026-11-01 11:18 Asia/Taipei**; deletion is not
   scheduled automatically.
   Then delete only that old namespace. Removing it destroys old grants/client
   state, not GitHub drafts; do not delete any GitHub draft/candidate refs.

For new installations, first land the existing index and validation workflows on
main and wait for Pages to export `/mcp-index.json`. The Worker never runs Hugo.
Keep the GitHub App installed on only the intended repository. App private keys
must be PKCS#8 PEM. Store only `GITHUB_APP_ID`, `GITHUB_INSTALLATION_ID`,
`GITHUB_APP_PRIVATE_KEY` and `CONFIRMATION_SECRET` as Worker secrets.

For local development, copy `.dev.vars.example` to ignored `.dev.vars`. A local
Wrangler `access.dev` block may simulate platform identity, but a matching signed
assertion is still required. Do not weaken the production validator for local
convenience; use the automated generated-key test harness instead.

## Tools

| Tool | Contract |
| --- | --- |
| `list_posts` | `query`, `offset`, `limit` (1–50); `draft_offset`, `draft_limit` (1–10, default 5). Returns indexed `posts` and a **separate** `drafts` page, `next_draft_offset`, `indexed_commit`, `current_main_commit`, `index_stale`. Draft cursor advances through branches, including archived entries, so follow it even for an empty filtered page. |
| `read_post` | `slug`, optional `lang`, `source` = `auto` / `draft` / `published`. `auto` prefers an active draft. Returns full content, frontmatter and `revision`. |
| `create_post` | `slug`, optional `lang`, `title`, `content`, optional `tags`, `categories`, `summary`; immediately commits to a dedicated draft branch. A translation requires an original in draft or main. |
| `update_post` | Requires `expected_revision`. Optional `expected_published_revision` plus full `content` explicitly reconciles an external edit after reading both versions. No automatic merge or overwrite. |
| `upload_image` | `slug`, optional `lang`, `expected_revision`, `filename`, `data_base64`. Saves PNG/JPEG/GIF/WebP to the draft; returns Markdown, a commit-pinned `preview_url` and new revision. At most 1 MiB each and 8 per draft; same-name different-content writes are rejected. See [image upload contract](../MCP.md#upload-article-images). |
| `prepare_publish` | Returns `operation_id` and `candidate_commit`, starts validation. Publish the original before its translations. |
| `get_operation_status` | `operation_id`; returns queued/validating/ready/stale/expired/validation_failed/deploying/deployed/deployment_failed. Ready includes complete preview and confirmation. May repair post-publication bookkeeping. |
| `publish_post` | `slug`, `lang`, `confirmation`; always updates remote main after validation and explicit approval. No `push_to_remote` or local-commit mode. |
| `get_repo_status`, `read_config` | Read the remote repository's main revision and Hugo config. |

Validation is part of preparation, and reads are tools so
clients need not support resource browsing. All tools require owner authorization.

Image uploads use base64 Git blobs; no R2 credentials or arbitrary URL downloads
are involved. Draft metadata tracks image names, sizes, types and SHA-256 hashes.
Preparation verifies those bytes and copies only new images into the candidate.
Its signed envelope binds the entire manifest; ready previews include image
metadata and commit-pinned URLs. Candidate CI independently rejects undeclared
files, changed image hashes, symlinks, executable files and existing-image
overwrites. The normal version checks invalidate approval after any later upload.
Roll out the repository changes to main **before** deploying the Worker, including
`scripts/blog_images.py`, `scripts/check_mcp_candidate.py` and the candidate
workflow. Candidate checks run from their main-based snapshot; the old checker
rejects added images. After deploying the Worker, refresh the ChatGPT connection's
tool list to discover `upload_image`. The dated Access rollout record documents the previous
nine-tool release; it is not acceptance evidence for this feature.

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
- To stop remote access, block the Access policy, disable the Worker or uninstall
  the GitHub App. Keep Access enabled during all recovery. Changing the email
  allowlist rejects existing Access sessions at the Worker too. Rotating the signing
  secret invalidates outstanding operation envelopes/confirmations; finish or
  record pending operations first. To undo a website change, revert its commit
  through the normal repo workflow, without force pushing.

Monitor Workers CPU and subrequest limits under the current account plan. RSA
verification adds CPU cost; validate real requests after deployment. Draft pagination and a static
~90 KB article index bound GitHub reads; no Hugo build runs in Workers. Article
files retain the 2 MiB limit, but processing a maximum-size article on the free
CPU quota must be checked on the deployed service, not inferred from local tests.
Monitor Workers CPU/errors, GitHub rate limits and Actions run results.
Quota exhaustion returns an error; nothing automatically upgrades your account.

Public repositories using standard GitHub-hosted runners have free Actions
execution; private repositories consume your plan's included minutes/storage.
The Worker makes no model API calls. No fixed hosting bill is intended, but zero
cost depends on actual usage and account limits.

Official references: [Cloudflare MCP](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/),
[Worker Access](https://developers.cloudflare.com/workers/configuration/cloudflare-access/),
[Managed OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/),
[Access JWTs](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/),
[jose](https://github.com/panva/jose),
[Workers limits](https://developers.cloudflare.com/workers/platform/limits/),
[GitHub ref updates](https://docs.github.com/en/rest/git/refs),
[ChatGPT connection](https://developers.openai.com/plugins/deploy/connect-chatgpt),
[ChatGPT OAuth](https://developers.openai.com/plugins/build/auth).

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
connection is **Blog MCP**; Claude web uses **Blog** at the same HTTP endpoint.
The previous ChatGPT `blog` installation was retired. See `image-upload-rollout.json`
for the historical Git-backed image-upload release and the owner's subsequently expanded callback list.
See [r2-upload-rollout.json](r2-upload-rollout.json) for the R2 deployment, live
storage verification and pending client acceptance. The subsequent
[webp-upload-rollout.json](webp-upload-rollout.json) records the 15 MiB limit,
automatic conversion and the owner-reported ChatGPT network limitation.
[chatgpt-file-upload-rollout.json](chatgpt-file-upload-rollout.json) records the
subsequent native ChatGPT file tool. Live-client acceptance is recorded in the later rollout below.
[public-file-download-rollout.json](public-file-download-rollout.json) records
the public HTTPS download policy, private-network isolation, Azure regression check
and owner-reported successful ChatGPT upload on 2026-10-26 (Claude web had already succeeded).
The GitHub App is `linroex-blog-mcp`, installed only on `linroex/blog`.
GitHub App credentials and the publication confirmation key remain Worker secrets.
Cloudflare Access owns login, client registration, access tokens and refresh grants.

## Architecture and publication contract

```text
ChatGPT / Claude web → Managed OAuth → Worker-level Access → ctx.access + Access JWT
                                                 ↓
                                           GitHub App → linroex/blog
                                             ├─ mcp/drafts/<slug>/<lang>
                                             ├─ mcp/reviews/<generation UUID> → Draft PR → Hugo + SEO checks
                                             └─ main → existing Pages workflow → coder.tw
```

- Worker-level Access protects production and previews across every attached
  hostname. Access authenticates before the Worker executes. Preview URLs stay
  disabled; do not add hostname/path rules or Bypass policies that override it.
- Only `linroex@coder.tw` may sign in, using Email one-time PIN. Managed OAuth
  token/grant durations and callback settings are owner-managed. Localhost
  registration is enabled for local CLI clients; preserve it. Callback patterns cover
  ChatGPT, Claude, Grok, Meta Agent and Muse; the current observed list is in
  `access-application.example.json` and `image-upload-rollout.json`. Preserve these
  owner-added clients when deploying; callback changes are separate platform work.
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
  supplies Contents and Pull requests read/write, plus Actions/Metadata read-only access.
- Drafts are Git commits with `draft: true`. **Branches in a public repository
  are public, including their history**, even though the draft is absent from
  the live site. No private draft storage is promised.
- A draft's `.mcp/draft.json` records its language, published baseline and unique
  `review_branch`. It stays on `mcp/drafts/<slug>/<lang>`. Every save synchronizes
  a Draft PR from a clean snapshot on main containing only that article and its
  declared new legacy images. Raw draft history/metadata is never merged.
- Review snapshots use `draft: false` for Hugo validation and reading; the PR
  remains a **Draft PR**, so saving does not publish. An article update first
  converts an existing ready PR back to draft. R2 images are public before merge.
- `prepare_publish` refreshes the same PR on current main. Status polling checks
  its exact source revision, SHA, branch, Hugo/SEO run and images, marks it ready,
  and returns the complete preview plus a version-bound 24-hour confirmation.
  A token identifies a version and cannot prove human approval.
- `publish_post` merges that exact PR head through GitHub, using merge commits.
  It never directly advances main. The owner may also mark a validated Draft PR
  ready and merge in GitHub; configure required checks as described below.
- PR number and immutable snapshot SHA in the opaque `operation_id` allow
  status queries and lost-response retries after source branch deletion. Legacy
  operations still report earlier publications; unmerged legacy confirmations
  must be replaced by a newly prepared PR.
- Pages deploys the merge commit, then its `cleanup` job removes the managed
  review branch and unchanged source draft using explicit Git SHA leases.
  Newer drafts are preserved. Cleanup failure is reported separately from
  website success. Images and retained Git history are not erased.

## Following a request through the code

Start with [src/index.ts](src/index.ts), then follow the dependencies below.
The Worker handles HTTP MCP and GitHub API calls; Hugo builds run in Actions.
Python scripts in `scripts/` are build/index/validation helpers, not MCP servers.

| Layer | Entry point | Responsibility |
| --- | --- | --- |
| HTTP entry | [src/index.ts](src/index.ts), `fetch` | Validate configuration and origin, verify Access identity, route `/health` and `/mcp`, bound the request body, construct `GitHubRepository` and `Blog`, invoke the Agents MCP handler. |
| Owner authentication | [src/auth.ts](src/auth.ts), `verifyAccess` | Require platform `ctx.access` and a signed Access JWT; map the verified owner email to the existing numeric owner ID. |
| MCP interface | [src/mcp.ts](src/mcp.ts), `createServer` | Register thirteen tools, validate input schemas, translate tool calls to `Blog` methods and return structured results/errors. |
| Authoring and publication | [src/blog.ts](src/blog.ts), `Blog` | Select draft/published revisions, enforce conflicts, create candidates, poll validation, issue confirmations, update main and recover interrupted publications. |
| GitHub persistence | [src/github.ts](src/github.ts), `installationToken`, `GitHubRepository` | Obtain a repo-scoped App token; read/write blobs, trees, commits and refs; query Actions. Source updates use `force: false`; managed review snapshots use atomic expected-SHA transactions. Main changes only through PR merge. |
| Article format and signatures | [src/document.ts](src/document.ts), [src/crypto.ts](src/crypto.ts), [src/types.ts](src/types.ts) | Restrict article paths/languages, parse and edit frontmatter, enforce file limits, hash content and sign purpose-specific candidate/confirmation envelopes. |
| Uploaded images | [src/r2-images.ts](src/r2-images.ts), [src/images.ts](src/images.ts), [src/chatgpt-files.ts](src/chatgpt-files.ts), `Blog.uploadChatGPTImage` / `prepareImageUpload` / `completeImageUpload` | Sign a five-minute raw PUT to R2, verify bytes, finalize a content-addressed public image and commit only its manifest to the draft. |
| Candidate checks | [mcp-validate.yaml](../.github/workflows/mcp-validate.yaml), [check_mcp_candidate.py](../scripts/check_mcp_candidate.py) | On candidate pushes, check the recorded parent, selected file and content hash, then build Hugo and validate SEO. The Worker verifies the signed envelope and exact workflow result before publication. |
| Website and search index | [hugo.yaml](../.github/workflows/hugo.yaml), [export_mcp_index.py](../scripts/export_mcp_index.py) | Build/deploy main to Pages and export `/mcp-index.json`; `index.ts:loadIndex` uses that metadata for listing. Article reads and publication decisions use GitHub directly. |

One publication crosses these layers in this order:

1. Access authenticates the client before Worker execution. `index.ts` calls
   `verifyAccess`, then `createServer` routes the validated tool input to `Blog`.
2. `createPost` / `updatePost` save the version-checked source draft and call
   `syncReview`. It builds an article-only snapshot, atomically checks source/main/
   previous review head with GraphQL `updateRefs`, then creates or updates the
   same Draft PR. Only the managed review ref may be rewritten; main and the
   source draft are guarded with no-op expected-SHA checks. If PR synchronization
   fails after a save, `pr_sync_pending: true` preserves the saved content and
   directs the client to read/retry `update_post`, not duplicate `create_post`.
3. `preparePublish` checks the published baseline and translation prerequisites,
   refreshes the same PR with a signed candidate snapshot on main, and returns
   PR/reading links and an opaque operation ID. Existing legacy drafts acquire
   their review branch on update or preparation. This does not publish.
4. `operationStatus` verifies that snapshot and its exact Actions result and
   source revision. Once validation succeeds, it marks the PR ready and returns
   the complete preview and fixed-expiry confirmation. Updates invalidate old
   approvals. The owner can review via GitHub instead of reading raw tool JSON.
5. `publishPost` merges the exact approved PR head, preserving checks for changed
   main, source, images and validation. The returned publication SHA is the merge
   commit, not the candidate SHA. Already-merged PRs are recognized before expiry
   checks, so lost responses can safely be retried.
6. `publishedResult` tracks Pages jobs for the merge SHA, including manual GitHub
   merges. `hosting_deployment_confirmed` comes from the deploy job, while
   `cleanup_status` reports waiting/pending/completed/failed independently. A newer
   source saved during merge stays visible and can begin its next PR generation.

Durable application state is in GitHub and R2, not Worker memory or a local checkout:

| State | Location |
| --- | --- |
| Uploaded image bytes | R2 `blog`: `blog-mcp/images/<slug>/<sha256>/<filename>`; temporary uploads under `blog-mcp/pending/` |
| Published articles | `main:content/posts/<slug>/index.md`, `index.en.md`, `index.ja.md` |
| Draft content and publication baseline | `mcp/drafts/<slug>/<lang>`: article file plus `.mcp/draft.json` (`base_post_sha`, `review_branch`, optional legacy `published_commit` or `deleted_revision`) |
| Review and recovery identity | `mcp/reviews/<generation UUID>` plus its PR, immutable snapshot SHA and signed commit envelope; operation IDs remain valid after cleanup. Legacy candidates retain their old refs. |
| Validation and deployment results | GitHub Actions runs, selected by workflow, commit SHA and branch |
| Listing metadata | Pages `/mcp-index.json`, tagged with its source commit; newest publication date first. Staleness compares article/index-generator sources, not unrelated main commits. |

The current Worker has no KV binding. Its cached App token and JWKS resolver are
temporary caches, not publication state. Preserve the signing secret when
recovering operations; do not manually delete legacy candidate refs while pending.

## Deployment configuration outside the code

Reading `auth.ts` alone does not reconstruct the edge authentication policy.
Worker-level Access and Managed OAuth are Cloudflare platform settings applied
before this code runs.

| Source | What it records |
| --- | --- |
| [wrangler.jsonc](wrangler.jsonc) | Worker entry, canonical origin, Access team/AUD, owner allowlist, GitHub repo/workflows and disabled preview URLs. Credentials are Worker secrets. |
| Cloudflare Access dashboard | Worker destination covering production/previews, owner-only Email PIN policy, Managed OAuth/DCR, owner-maintained client callback patterns and token/grant lifetimes. Use [Access setup and cutover](#access-setup-and-cutover) to reproduce these settings. |
| [access-application.example.json](access-application.example.json) | Example API shape for the platform configuration; not an automatically applied deployment manifest. |
| [access-rollout.json](access-rollout.json) | Dated acceptance evidence, deployed IDs and legacy cleanup deadline. This is a rollout record, not a live platform inventory. |
| [image-upload-rollout.json](image-upload-rollout.json) | Image-upload deployment, removal of the local server, ChatGPT/Claude tool refresh and the later owner-added callback patterns. |
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
real signature checks, retired OAuth routes and thirteen MCP tools without GitHub
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

The owner requested a temporary **48-hour OAuth grant expiry test** on
2026-10-26, keeping access tokens at 15 minutes. Its setup and observations are
tracked in [grant-expiry-test.json](grant-expiry-test.json). The experiment is
pending the platform change; the 14-day values below describe the previous
documented configuration. This file and Wrangler deployment do not apply Access
settings. Change only **Managed OAuth > Grant session duration** to `48h`, then
complete a fresh Claude OAuth authorization and record its time as T0. Test a
published-article read before 48 hours and again after 48 hours 20 minutes,
without manually reauthorizing in between. Record any error and the available
reauthorization controls before reconnecting. The duration setting also applies
to new grants for other clients of this Access application.

These are sequential steps of one migration. Keep the same Worker and `/mcp`
URL. Do not add a tunnel, container or another Worker. Use the existing GitHub
App `linroex-blog-mcp`, installed only on `linroex/blog`.

1. Complete the local checks above. Verify the existing GitHub App still has only
   Contents and Pull requests read/write, Actions read and Metadata read permissions. Keep its
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
   dynamic registration and disable localhost and loopback clients. Preserve the
   owner's approved callback patterns from `access-application.example.json`;
   the earlier single-ChatGPT callback in `access-rollout.json` is historical.
   Set access token lifetime to `15m` and grant duration to `336h` (14 days).
   Do not replace the owner-maintained list as a side effect of a Worker deploy.
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
   Confirm the callback fits an owner-approved pattern before connecting. Uninstall the
   old connection after successful acceptance; no GitHub data is stored in it.
   Verify a real **Managed OAuth** request succeeds at `/health` (not just a
   browser cookie). Its 200 response is possible only after both `ctx.access`
   and Access JWT verification. Reconnect the existing Blog plugin in ChatGPT,
   confirm exactly thirteen tools (including native `upload_image` and both R2 upload tools), and read a published article. Test refresh-token
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
`GITHUB_APP_PRIVATE_KEY`, `CONFIRMATION_SECRET`, `R2_ACCESS_KEY_ID` and
`R2_SECRET_ACCESS_KEY` as Worker secrets. R2 credentials should grant object
read/write only on the configured bucket; the agent never receives them.

For local development, copy `.dev.vars.example` to ignored `.dev.vars`. A local
Wrangler `access.dev` block may simulate platform identity, but a matching signed
assertion is still required. Do not weaken the production validator for local
convenience; use the automated generated-key test harness instead.

## PR publication rollout

Before deploying v1.6.0:

1. Grant the existing selected-repository GitHub App **Pull requests: read and
   write**, alongside its existing Contents write and Actions/Metadata read.
   Accept any installation-permission update before deploying; token minting
   explicitly requests this permission. Keep existing secrets and Access settings.
2. Protect `main` with required **build** status and **require branches to be up
   to date**. The Hugo PR build also checks managed review snapshots, so manual
   GitHub merges enforce the same single-article/baseline validation. Other code
   PRs still run the ordinary build. Do not configure a required MCP-only status
   that unrelated PR branches never produce. Do not enable global auto-delete;
   cleanup is scoped to managed review/draft refs after successful deployment.
3. Merge the workflow/scripts before deploying the Worker. The Pages cleanup
   job has only Contents write and Pull requests read; it uses the ephemeral
   workflow token, and cannot delete main or unrelated refs. Both direct PR merge
   and manually selected squash/rebase merges are identified through GitHub's
   merged PR record and actual deployment SHA.
4. Deploy the Worker and refresh tools. Existing draft content remains intact;
   a subsequent save or `prepare_publish` migrates it to a Draft PR. Thirteen
   tools remain available. No extra storage, Worker or OAuth changes are needed.

Save-time PR snapshots are validated for reading while still Draft PRs; saving
never merges. `prepare_publish` plus successful polling marks them ready, or the
owner may explicitly mark ready/merge in GitHub after required checks pass.
If PR sync fails after saving, read the returned revision and repair/retry
`update_post`. A missing App permission must be fixed before Worker rollout;
there is no fallback to direct main writes.

## Tools

| Tool | Contract |
| --- | --- |
| `list_posts` | `query`, `offset`, `limit` (1–50); `draft_offset`, `draft_limit` (1–10, default 5). Returns indexed `posts` sorted by publication `date` descending (UTC ISO 8601; missing/invalid dates are `null` and sort last; ties by slug), and a **separate** `drafts` page, `next_draft_offset`, `indexed_commit`, `current_main_commit`, `index_stale`. Draft cursor advances through branches, including archived entries, so follow it even for an empty filtered page. |
| `read_post` | `slug`, optional `lang`, `source` = `auto` / `draft` / `published`. `auto` prefers an active draft. Returns full content, frontmatter, `revision`, and associated PR/reading links when available. |
| `create_post` | `slug`, optional `lang`, `title`, `content`, optional `tags`, `categories`, `summary`; immediately saves a dedicated source draft and opens a Draft PR. Returns `pr_number`, `pr_url`, `pr_state`, `read_url`, opaque `operation_id`, and `pr_sync_pending`. A translation requires an original in draft or main. |
| `update_post` | Requires `expected_revision`. Optional `expected_published_revision` plus full `content` explicitly reconciles an external edit after reading both versions. Synchronizes the same Draft PR and invalidates earlier approvals. No automatic publication or overwrite. |
| `delete_draft` | `slug`, optional `lang`, required `expected_revision` from reading the draft. Closes its unmerged PR and removes only that language from active drafts using an atomic archive marker, leaving published articles, other languages, Git history, candidate branches and uploaded images intact. Repeating the same deleted revision is safe; stale versions conflict. |
| `upload_image` | ChatGPT native attachment: `slug`, optional `lang`, `expected_revision`, original-extension `filename`, and `file`. `_meta["openai/fileParams"]` injects `download_url`/`file_id` plus optional MIME/name. Server-side bounded download, WebP conversion, R2 persistence and draft attachment in one call; no shell PUT. Same file ID/article/filename retries return the existing result. |
| `prepare_image_upload` | `slug`, optional `lang`, `expected_revision`, `filename`, `mime_type`, `size`, optional `sha256`. Returns a five-minute R2 PUT URL, signed required headers and a 24-hour completion ticket; no Git write. |
| `complete_image_upload` | `upload_ticket`; verifies uploaded bytes, saves an immutable public R2 image and records its metadata in the draft. Returns URL/Markdown and a new revision. Up to 15 MiB each and eight per language draft. See [image upload contract](../MCP.md#upload-article-images). |
| `prepare_publish` | Refreshes the same PR, returns opaque `operation_id`, `candidate_commit`, `validation_branch` and PR/reading links, and starts validation. Publish the original before its translations. |
| `get_operation_status` | `operation_id`; returns queued/validating/ready/stale/expired/validation_failed/deploying/deployed/deployment_failed. Ready includes complete preview, confirmation and PR links; polling may mark a validated PR ready (non-destructive write). Reports `cleanup_status` independently and survives branch deletion. Old UUID-only operations remain readable. |
| `publish_post` | `slug`, `lang`, `confirmation`; merges the exact approved PR head after validation and explicit approval. Never directly updates main. Reports the actual merge commit. |
| `get_repo_status`, `read_config` | Read the remote repository's main revision and Hugo config. |

`index_stale` compares the immutable Git objects for `content/posts`,
`scripts/blog_content.py`, and `scripts/export_mcp_index.py` between the indexed
commit and current main. Different commit IDs alone do not indicate stale
articles: MCP-only or documentation commits intentionally skip Pages deployment.
The check walks only non-recursive trees (at most eight extra GitHub API calls
when commits differ), so large changes are not subject to the compare API's file
limit. If verification fails, the listing returns an error rather than claiming
freshness; `read_post` remains authoritative. No article sorting runs per request.

Deleting a draft invalidates earlier publication confirmations and upload tickets.
For an unpublished article, `create_post` can reuse the deleted slug. For a
published article, read the published version and use `update_post` to start a
fresh draft before editing or uploading again. Deletion does not permanently
erase publicly accessible Git history or R2 assets.

Validation is part of preparation, and reads are tools so
clients need not support resource browsing. All tools require owner authorization.

See [upload-diagnostics-rollout.json](upload-diagnostics-rollout.json) for the
diagnostic deployment and verification record.
Native `upload_image` calls emit structured diagnostic events after Access
authentication, including inputs rejected by SDK schema validation. Search
Workers Logs for `upload_image.input`, `upload_image.download` and
`upload_image.result`; group events by `diagnostic_id`. Inputs record only the
file value type, recognized field names/types and an unknown-field count.
Download events record the URL protocol/HTTP hostname, initial/redirect stage,
HTTP status and outcome. No file IDs, filenames, full URLs, paths, queries,
fragments, credentials, file bytes or raw exception messages are logged. Other
MCP calls do not emit these diagnostics. Observability sampling is 100% so a
single reproduction is retained; an HTTP 200 alone does not indicate tool success.
Use `npx wrangler tail lins-blog-mcp --format json` for a live reproduction.

Image uploads share one storage/conversion/draft pipeline, with a ChatGPT-native
file input in addition to the established presigned transport for Claude. In
ChatGPT, prefer `upload_image`: `openai/fileParams` supplies a temporary download
URL and file ID, and the Worker downloads the bytes directly without any client
shell request. The four declared file fields follow the
[official OpenAI contract](https://developers.openai.com/plugins/reference#define-file-inputs).
Only `download_url` and `file_id` are required within the file object. `file_name`
is informational; the separate `filename` selects a safe blog basename and must
match the original MIME/signature. Never use a ChatGPT `/mnt/data` path as a remote
file or invent file references.

[src/chatgpt-files.ts](src/chatgpt-files.ts) accepts public HTTPS hostnames on port
443 without userinfo/fragments. There is no provider-domain allowlist: ChatGPT
also supplies Azure Blob URLs. Local/private hostnames, single-label names and
all IP literals (including alternate IPv4 forms and IPv6) are rejected.
DNS resolution and connection-time private-network exclusion rely on Cloudflare
Workers' global `fetch` with `global_fetch_strictly_public`; the application does
not perform a separate DNS lookup that could race with the connection. Do not
route attachment fetches through a private service/VPC binding or proxy. This
contract is specific to the cloud Worker, not a general-purpose Node fetch client.
It follows at most two redirects, rechecks each destination, sends no credentials, bounds both
announced and streamed bytes, and applies a 60-second deadline. Download errors
never echo signed URLs. The immutable upload ID derives from owner, article,
language, chosen filename and file ID; changing a temporary URL does not create a
second attachment. Download URLs and file IDs are not persisted in draft metadata
or signed candidates. The native path writes no pending R2 object. Concurrent
updates still rely on non-forced Git ref updates; a failure may leave an
unreferenced final object, as with the existing transport.

The owner reported successful real ChatGPT image upload on 2026-10-26; Claude
web upload had already succeeded. The native tool removes ChatGPT's shell PUT
dependency. Automated tests simulate the native file reference; live-client
acceptance is owner-reported. Keep
existing Claude settings and Access callbacks. Refresh ChatGPT's tools and use a
new conversation; cached schemas for the old base64 `upload_image` cannot be used.

Comparable projects document this limitation: [Papermark](https://docs.papermark.com/docs/mcp/clients/chatgpt-apps)
uses server-side source URL import when presigned PUT is unavailable;
[Publora](https://docs.publora.com/mcp/troubleshooting) uses a native ChatGPT file
reference; [mcp-filebridge](https://github.com/teng-lin/mcp-filebridge) offers an
MCP Apps browser uploader. These are research references. This server implements the native ChatGPT file
input and existing presigned transport; no arbitrary source-URL import or widget
uploader is added.

`R2_ACCOUNT_ID`, `R2_BUCKET_NAME`, `R2_PUBLIC_BASE_URL` and `IMAGE_MAX_BYTES`
(default 15728640; configurable from 1 to 15728640) are Wrangler variables.
The two R2 S3 keys are secrets. The public base must match Hugo `params.imageBase`.
The Worker signs only its configured S3 endpoint and generated keys; it does not
fetch arbitrary image URLs. Signed `Content-Length`, `Content-Type` and
`If-None-Match: *` constrain temporary uploads. A ticket is owner-bound and
purpose-signed with the existing confirmation key. Completion checks actual
length/signature/hash, then creates a final content-hash key with a conditional
PUT. It checks final metadata before recording the draft; publication checks it
again. PNG/JPEG/GIF are converted with the IMAGES binding to WebP at quality 85,
preserving transparency and animation and keeping dimensions. Existing WebP
is preserved byte-for-byte. The final filename changes to `.webp`; its hash/size
refer to the output, while `original` records the validated source. Both must fit
15 MiB. Failed conversion does not change the draft or delete the pending source.
Cloudflare Images quota errors require retry after quota/service recovery, not
a fallback that silently stores another format. Historical R2 assets up to
25 MiB remain readable and publishable.

A failed Git write leaves the temporary object available for a completion retry.
Only a durable Git attachment permits pending deletion; a lost response returns
the recorded upload ID without another commit. URLs are reusable until expiry;
a replay after temporary cleanup cannot overwrite the finalized image. Abandoned
pending and unreferenced final objects may persist. No lifecycle policy is changed
and final objects are never automatically deleted, since published articles or
translations may reference them. Monitor the `blog-mcp/pending/` prefix and audit
references before any manual cleanup. Final images and pending random-key objects
are in an existing public bucket, not private draft storage.

Roll out `scripts/blog_images.py` and `scripts/check_mcp_candidate.py` to main
before deploying the Worker. CI checks the R2 manifest against the trusted parent
Hugo config and permits no new Git image bytes for those entries. Existing
Git-backed drafts/candidates remain supported. The old base64 `upload_image`
schema remains retired; its name is reused for ChatGPT native file input.
After deployment, refresh existing clients' tool lists.
Preserve the owner's Managed OAuth callback allowlist.

For an opt-in real R2 integration check, supply the five `R2_*` environment values
above and run `node scripts/check-r2.mjs` from `cloud-mcp`. Set
`R2_CHECK_BYTES=15728640` to exercise the maximum. It tests signed PUT, duplicate
rejection, WebP conversion with the local Images implementation in real workerd,
retry, native attachment import with a simulated OpenAI download, and public
content integrity. The native check uses an in-memory test repository, not a real
GitHub draft.
It deletes and verifies absence of exactly its uniquely named test objects;
it creates no article or Git branch. It never prints credentials or signed URLs.

`npm run smoke` also verifies PNG transparency and JPEG conversion using local
Images. Its low-fidelity implementation does not preserve GIF animation, so that
check runs only against the actual Cloudflare codec. Run
`IMAGES_REMOTE_CHECK=1 node scripts/check-webp.mjs`; it opens and disposes an
isolated development session and does not use production MCP credentials. The
IMAGES binding is configured in Wrangler. No Images storage or paid plan is
purchased by deployment. Transformations use the account's existing Images plan
and quota; check [Images pricing](https://developers.cloudflare.com/images/pricing/).

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

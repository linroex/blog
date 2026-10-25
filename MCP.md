# Blog MCP

Blog MCP runs only on Cloudflare Workers, using remote Streamable HTTP:

`https://lins-blog-mcp.linroex.workers.dev/mcp`

Connect to this endpoint using Cloudflare Access Managed OAuth. The server uses
GitHub App APIs and GitHub Actions; it does not depend on this computer. The
former local Python stdio server has been removed. Do not register a local
`blog` server or a command pointing to `scripts/mcp_server.py`.

The ChatGPT **Blog MCP** plugin and Claude web **Blog** connector both use this
same endpoint. After updating the Worker, refresh tools in both existing clients;
there is no need to replace their HTTP connections or change the owner's
Cloudflare callback allowlist.

See [cloud architecture, configuration and recovery](cloud-mcp/README.md) for
implementation details. Python scripts under `scripts/` only export the article
index and validate candidate commits/SEO during site builds.

## Tools and authoring workflow

The server exposes eleven tools: `list_posts`, `read_post`, `create_post`,
`update_post`, `prepare_image_upload`, `complete_image_upload`, `prepare_publish`, `get_operation_status`,
`publish_post`, `get_repo_status`, and `read_config`.

1. List/read articles to avoid slug collisions. `read_post` prefers an active
   draft; use `source: published` to read main explicitly.
2. Create a draft or update it with `expected_revision` from the latest read.
   Drafts are public GitHub branches with `draft: true`; they do not update the
   website. Each successful update returns a new revision.
3. Upload images with the latest revision and insert their returned Markdown.
4. Call `prepare_publish` and poll `get_operation_status` no more often than
   once every five seconds while GitHub Actions validates the exact candidate.
5. Show the entire ready preview, including uploaded images, to the user. Only
   after explicit approval of that exact version, call `publish_post` with the
   returned confirmation. Tokens identify content; they do not prove consent.
6. Poll status for `hosting_deployment_confirmed: true`. A Git commit is distinct
   from a successful Pages deployment. After a lost response, retry the same
   confirmation or poll the existing operation; do not recreate publication.

## Upload article images

All clients use one flow: **prepare → HTTP PUT to R2 → complete**. Image bytes
go to the existing `blog` R2 bucket. GitHub stores Markdown and the image manifest,
not the new image files. The former base64 `upload_image` tool is retired.

1. Create/read the article, obtain the original image's byte length and MIME type,
   and call `prepare_image_upload`:

   ```json
   {
     "slug": "my-post",
     "lang": "zh-tw",
     "expected_revision": "<latest article revision>",
     "filename": "chart.png",
     "mime_type": "image/png",
     "size": 2097152
   }
   ```

   An optional `sha256` binds the upload to a known original file. The result has
   `upload_url`, `required_headers`, `upload_ticket` and expiry information. This
   step does not write a draft or reserve a revision.
2. Within five minutes, use a file/network execution tool to HTTP **PUT the raw
   file bytes** to `upload_url` with **every** returned header. Do not use multipart
   form data or base64. `Content-Length` is the original file's exact byte length;
   it, `Content-Type` and `If-None-Match: *` are signed. Do not send MCP OAuth or
   permanent storage credentials. Treat the URL as a temporary secret.
3. Call `complete_image_upload` with `{ "upload_ticket": "<returned ticket>" }`.
   It verifies the stored length, file signature and SHA-256, saves an immutable
   final object, and records its metadata on the draft. It returns `url`,
   `markdown`, `preview_url`, `sha256`, `size`, and the new `revision`.
4. Insert that absolute R2 Markdown with `update_post`, using the returned revision.
   Continue normal prepare/preview/approval/publication. The image itself is
   already public after completion, even before the article is published.

Limits and recovery:

- PNG, JPEG, GIF and WebP with matching file signatures; no SVG. Files are not
  decoded, resized, stripped of metadata or virus-scanned.
- Up to **25 MiB per image**, eight completed images per language draft.
- Lowercase letters, digits and hyphens in filenames; one supported extension;
  no directories, arbitrary source URLs or server-side local file paths.
- The agent must have access to the **original bytes and outbound HTTPS PUT**.
  An MCP connection alone cannot read a chat attachment. ChatGPT, Claude and Muse
  use this same contract, but their attachment/network capabilities must be tested
  separately. No client-specific file parameter or browser widget is required.
- A pending object cannot be overwritten while it exists. A signed URL can be
  retried during its five-minute lifetime; it is not a single-use credential.
  After completion, reusing it can only recreate the temporary object, never
  change the final image referenced by the article.
- Completion tickets last 24 hours. After a lost response, retry the same ticket;
  successful completion returns the recorded revision instead of another commit.
  If the article changed during upload, reread and prepare a fresh upload.
- An HTTP client may report a connection error when R2 rejects a large duplicate
  PUT before consuming its body. Complete the original upload before preparing a
  replacement; `complete_image_upload` can confirm that the first PUT arrived.
- Different content uses a different SHA-256 path. A draft filename already in
  its manifest requires a new name. Translations can reuse an existing absolute
  R2 URL without uploading again.

Final keys are `blog-mcp/images/<slug>/<sha256>/<filename>`; temporary keys are
`blog-mcp/pending/<random UUID>/<filename>`. Neither is a private asset store.
The server deletes the temporary object after the Git commit succeeds. Abandoned
or rejected uploads and unreferenced final objects may remain; no bucket-wide
lifecycle changes or automatic deletion of final images are installed.

The signed candidate binds the R2 manifest. The Worker verifies object metadata
before preparation, preview and publication. CI independently restricts URLs and
keys to the selected article and trusted Hugo `params.imageBase`, and rejects
image binaries submitted under an R2 manifest. Existing Git-backed draft images
remain publishable through compatibility code; there is only one new upload flow.

## Translations

Traditional Chinese (`zh-tw`) is the default, at `/posts/{slug}/`; English (`en`)
is at `/en/posts/{slug}/`, and Japanese (`ja`) at `/ja/posts/{slug}/`.
The original is `content/posts/{slug}/index.md`; translations are `index.en.md`
and `index.ja.md` in the same page bundle. Authoring/upload/publication tools
accept `lang`, defaulting to `zh-tw`. Publish the original before translations;
each language has its own draft, revision and confirmation.

## Verification and deployment

```sh
python3 -m unittest discover -s scripts -p 'test_*.py'
cd cloud-mcp
npm ci
npm run check
npm test
WRANGLER_LOG_PATH=.wrangler/logs npm run build
npm run smoke
```

Roll out the Python candidate checker and helpers to main before deploying the
Worker, because candidates inherit their checks from main. Then deploy using the
existing production configuration and secrets, run `npm run check:edge`, and
refresh existing clients to discover `prepare_image_upload` and
`complete_image_upload`. Authentication and deployment configuration are documented in [cloud-mcp/README.md](cloud-mcp/README.md).

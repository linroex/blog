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

The server exposes ten tools: `list_posts`, `read_post`, `create_post`,
`update_post`, `upload_image`, `prepare_publish`, `get_operation_status`,
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

Create or read the article first, then call `upload_image`:

```json
{
  "slug": "my-post",
  "lang": "zh-tw",
  "expected_revision": "<full revision from the latest article read or write>",
  "filename": "chart.png",
  "data_base64": "<standard padded base64 of the image bytes>"
}
```

The result includes `path`, `relative_url`, `markdown`, `preview_url`, `mime_type`,
`size`, `sha256`, and the new `revision`. Use that revision for the next upload
or article edit. For example, `![](images/chart.png)` references
`content/posts/my-post/images/chart.png`, a Hugo page resource shared by the
article's translations. The preview URL is pinned to the draft commit.

- PNG, JPEG, GIF and WebP only, with matching file signatures; no SVG.
- At most 1 MiB decoded per image and 8 uploaded images per language draft.
- Filenames use lowercase ASCII letters, digits and hyphens, with one supported
  extension. No directories, URL fetching or local file paths are accepted.
- Send standard padded base64 without a data URL prefix or whitespace.
- Identical bytes may reuse a filename; different bytes require a new name.
- Uploads save to a public draft branch. Insert the Markdown and follow the
  normal preview/approval workflow to publish them to the website.
- The signed candidate includes article and image hashes. Later uploads make an
  earlier confirmation stale. Publication includes only the selected article
  and its declared new images, preserving other drafts and translations.

The upload manifest lives in the draft branch's `.mcp/draft.json` and is never
copied to main. New images use GitHub/Hugo and require no additional storage
credentials. Existing R2 image URLs remain valid.

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
refresh the ChatGPT Blog MCP tool list to discover `upload_image`. Authentication
and deployment configuration are documented in [cloud-mcp/README.md](cloud-mcp/README.md).

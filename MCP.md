# Blog MCP server

For ChatGPT web without a tunnel to this computer, use the separate
[Cloudflare HTTP MCP](cloud-mcp/README.md). It stores drafts in GitHub branches,
validates candidates with GitHub Actions, and publishes through a repo-scoped
GitHub App. The stdio server and workflow described below remain available.

`scripts/mcp_server.py` lets MCP-compatible AI tools read this Hugo blog, save
drafts, validate the site, and publish one approved post through Git. It uses
Python's standard library only.

## Exposed surface

- Read-only resources: `blog://config`, `blog://posts/{slug}`, and
  `blog://posts/{slug}?lang={lang}` for translations.
- Draft tools: `list_posts`, `read_post`, `create_post`, and `update_post`.
- Checks: `validate_site`, `git_status`, and `prepare_publish`.
- Publication: `publish_post` commits only the selected post and can optionally
  push it to `origin`.
- Push existing commits: `push_commits` pushes the current branch to `origin`
  without editing posts, staging files, or creating another commit.

The server cannot read or write arbitrary paths, delete posts, run arbitrary
commands, or commit unrelated files. Slugs are restricted to lowercase ASCII
words separated by hyphens. Post bodies are limited to 2 MiB.

## Connect an MCP client

Use the absolute paths for the machine on which the AI client runs. Most stdio
MCP clients accept an entry shaped like this:

```json
{
  "mcpServers": {
    "lins-blog": {
      "command": "python3",
      "args": ["/Users/linroex/Projects/blog/scripts/mcp_server.py"],
      "env": {
        "BLOG_MCP_ROOT": "/Users/linroex/Projects/blog"
      }
    }
  }
}
```

The server speaks newline-delimited JSON-RPC over stdio. It writes protocol
messages only to stdout and diagnostics only to stderr.

## Safe authoring workflow

1. Use `list_posts` to avoid a slug collision.
2. Use `create_post` or `update_post`. Both always save `draft: true` and do not
   touch Git.
3. Optionally run `validate_site`.
4. Call `prepare_publish` and show its full title, metadata, and body to the user.
5. After the user explicitly authorizes that exact version, call `publish_post`
   with the returned `confirmation` token. The token includes a SHA-256 hash and
   becomes invalid after any edit.
6. Set `push_to_remote: false` for a local commit or `true` to also run
   `git push origin HEAD`.

Before committing, publication sets `draft: false` and runs Hugo when it is
installed. It refuses to touch a post that already has staged changes and uses a
path-limited commit, so other staged or unstaged work remains outside the commit.
A successful push confirms only the Git push; deployment is left to the repo's
hosting automation.

## Translations

The site is in Traditional Chinese (`zh-tw`, the default, at `/posts/{slug}/`),
English (`en`, at `/en/posts/{slug}/`), and Japanese (`ja`, at `/ja/posts/{slug}/`).
The original post is `content/posts/{slug}/index.md`; translations live in the
same folder as `index.en.md` and `index.ja.md`.

- `read_post`, `create_post`, `update_post`, `prepare_publish`, and
  `publish_post` accept an optional `lang` (`zh-tw`, `en`, or `ja`). It defaults
  to `zh-tw`, so existing calls behave as before.
- `create_post` with `lang: "en"` or `"ja"` requires the original post to exist.
  Unless you pass them, the translation copies the original's `date`, `tags`,
  and `categories`.
- `list_posts` lists original posts only. Each entry has a `translations` field
  with the languages that already exist.
- Each language is prepared and published separately. The confirmation token
  includes the language, so a token for one language cannot publish another.

## Retry a failed push

If publication created a local commit but SSH or the network prevented the push,
use `push_commits` instead of calling `publish_post` again. The failure response
includes `retry_tool` and `retry_arguments` for this purpose.

1. Call `git_status` to get the current full `commit` hash and branch.
2. After the user authorizes pushing those existing commits, call:

   ```json
   {
     "expected_commit": "<full commit hash>",
     "dry_run": false
   }
   ```

Set `dry_run: true` to check the push without updating the remote. A changed HEAD
is rejected so a retry cannot silently push a newer commit. The tool pushes all
pending commits on the current branch, using a pinned commit and explicit branch
refspec; it does not push tags, force updates, or include uncommitted changes.
Push errors preserve the existing local commits and return Git's diagnostics.

Restart the MCP server or reconnect it in Claude's MCP settings after updating
the script so Claude discovers the new tool.

## Verify locally

```sh
python3 -m unittest discover -s scripts -p 'test_*.py'
hugo --destination /tmp/blog-mcp-preview
```

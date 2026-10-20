#!/usr/bin/env python3
"""A dependency-free MCP stdio server for this Hugo blog.

Only ``hugo.toml`` and ``content/posts`` are exposed. Draft writes and Git
publication are separate operations so MCP hosts can keep a human approval gate.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path
from typing import Any


SERVER_NAME = "lins-hugo-blog"
SERVER_VERSION = "2.2.0"
LATEST_PROTOCOL = "2025-11-25"
SUPPORTED_PROTOCOLS = {"2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"}
MAX_MESSAGE_BYTES = 4 * 1024 * 1024
MAX_POST_BYTES = 2 * 1024 * 1024
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
DEFAULT_LANG = "zh-tw"
LANGS = (DEFAULT_LANG, "en", "ja")
FRONTMATTER_RE = re.compile(r"^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$")


class BlogError(Exception):
    """An actionable tool execution error."""


class RpcError(Exception):
    """A JSON-RPC protocol error."""

    def __init__(self, code: int, message: str):
        super().__init__(message)
        self.code = code
        self.message = message


def _json_string(value: str) -> str:
    # JSON strings and arrays are valid YAML and avoid frontmatter injection.
    return json.dumps(value, ensure_ascii=False)


def _json_list(values: list[str]) -> str:
    return json.dumps(values, ensure_ascii=False)


def _sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _one_separator(body: str) -> str:
    return body[1:] if body.startswith("\n") else body


def _split_document(raw: str) -> tuple[list[str], str]:
    if not raw.startswith("---\n"):
        raise BlogError("Post is missing YAML frontmatter")
    lines = raw.splitlines(keepends=True)
    for index in range(1, len(lines)):
        if lines[index].strip() == "---":
            return "".join(lines[1:index]).splitlines(), "".join(lines[index + 1 :])
    raise BlogError("Post has an unterminated YAML frontmatter block")


def _parse_value(value: str) -> Any:
    value = value.strip()
    if not value:
        return ""
    if value.lower() == "true":
        return True
    if value.lower() == "false":
        return False
    if value[0] in '[{"' or value in {"null", "~"}:
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            pass
    if len(value) >= 2 and value[0] == value[-1] == "'":
        return value[1:-1].replace("''", "'")
    return value


def _parse_frontmatter(lines: list[str]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for line in lines:
        match = FRONTMATTER_RE.match(line)
        if match:
            result[match.group(1)] = _parse_value(match.group(2) or "")
    return result


def _set_frontmatter(lines: list[str], updates: dict[str, str]) -> list[str]:
    output = list(lines)
    found: set[str] = set()
    for index, line in enumerate(output):
        match = FRONTMATTER_RE.match(line)
        if match and match.group(1) in updates:
            key = match.group(1)
            output[index] = f"{key}: {updates[key]}"
            found.add(key)
    for key, value in updates.items():
        if key not in found:
            output.append(f"{key}: {value}")
    return output


def _compose_document(lines: list[str], body: str) -> str:
    if not body.startswith("\n"):
        body = "\n" + body
    result = "---\n" + "\n".join(lines) + "\n---\n" + body
    return result if result.endswith("\n") else result + "\n"


def _required_text(name: str, value: Any, maximum: int) -> str:
    if not isinstance(value, str) or not value.strip():
        raise BlogError(f"{name} must be a non-empty string")
    value = value.strip()
    if len(value) > maximum:
        raise BlogError(f"{name} must be at most {maximum} characters")
    if "\x00" in value:
        raise BlogError(f"{name} cannot contain a NUL character")
    return value


def _optional_text(name: str, value: Any, maximum: int) -> str | None:
    if value is None:
        return None
    if not isinstance(value, str):
        raise BlogError(f"{name} must be a string")
    if len(value) > maximum:
        raise BlogError(f"{name} must be at most {maximum} characters")
    if "\x00" in value:
        raise BlogError(f"{name} cannot contain a NUL character")
    return value


def _content_text(value: Any) -> str:
    if not isinstance(value, str) or not value.strip():
        raise BlogError("content must be a non-empty string")
    if len(value.encode("utf-8")) > MAX_POST_BYTES:
        raise BlogError(f"content exceeds the {MAX_POST_BYTES}-byte safety limit")
    if "\x00" in value:
        raise BlogError("content cannot contain a NUL character")
    return value


def _string_list(name: str, value: Any) -> list[str]:
    if value is None:
        return []
    if not isinstance(value, list) or len(value) > 30:
        raise BlogError(f"{name} must be an array with at most 30 entries")
    result: list[str] = []
    for item in value:
        if not isinstance(item, str) or not item.strip() or len(item.strip()) > 80:
            raise BlogError(f"Every {name} entry must be a non-empty string up to 80 characters")
        result.append(item.strip())
    return result


class BlogStore:
    def __init__(self, root: Path, hugo_bin: str | None = None):
        self.root = root.expanduser().resolve()
        self.posts_dir = self.root / "content" / "posts"
        self.config_file = self.root / "hugo.toml"
        self.hugo_bin = shutil.which("hugo") if hugo_bin is None else hugo_bin

    def _slug(self, slug: Any) -> str:
        slug = _required_text("slug", slug, 100)
        if not SLUG_RE.fullmatch(slug):
            raise BlogError("slug must contain only lowercase ASCII letters, digits, and single hyphens")
        return slug

    @staticmethod
    def _lang(lang: Any) -> str:
        if lang not in LANGS:
            raise BlogError(f"lang must be one of: {', '.join(LANGS)}")
        return lang

    def _post_file(self, slug: Any, lang: Any = DEFAULT_LANG) -> Path:
        safe_slug = self._slug(slug)
        name = "index.md" if self._lang(lang) == DEFAULT_LANG else f"index.{lang}.md"
        path = (self.posts_dir / safe_slug / name).resolve()
        if self.posts_dir.resolve() not in path.parents:
            raise BlogError("Post path escapes content/posts")
        return path

    def _read_raw(self, slug: Any, lang: Any = DEFAULT_LANG) -> tuple[str, Path]:
        path = self._post_file(slug, lang)
        if not path.is_file():
            if lang == DEFAULT_LANG:
                raise BlogError(f"Post not found: {slug}")
            raise BlogError(f"Translation not found: {slug} ({lang})")
        if path.stat().st_size > MAX_POST_BYTES:
            raise BlogError(f"Post exceeds the {MAX_POST_BYTES}-byte safety limit")
        return path.read_text(encoding="utf-8"), path

    @staticmethod
    def _atomic_write(path: Path, content: str) -> None:
        if len(content.encode("utf-8")) > MAX_POST_BYTES:
            raise BlogError(f"Post exceeds the {MAX_POST_BYTES}-byte safety limit")
        path.parent.mkdir(parents=True, exist_ok=True)
        temporary_name = ""
        try:
            with tempfile.NamedTemporaryFile(
                "w", encoding="utf-8", dir=path.parent, prefix=".index.", suffix=".tmp", delete=False
            ) as temporary:
                temporary.write(content)
                temporary_name = temporary.name
            os.replace(temporary_name, path)
        finally:
            if temporary_name and os.path.exists(temporary_name):
                os.unlink(temporary_name)

    def list_posts(
        self, query: str = "", drafts_only: bool = False, offset: int = 0, limit: int = 50
    ) -> dict[str, Any]:
        if not isinstance(query, str) or len(query) > 200:
            raise BlogError("query must be a string up to 200 characters")
        if not isinstance(drafts_only, bool):
            raise BlogError("drafts_only must be a boolean")
        if type(offset) is not int or offset < 0:
            raise BlogError("offset must be a non-negative integer")
        if type(limit) is not int or not 1 <= limit <= 200:
            raise BlogError("limit must be between 1 and 200")

        query_folded = query.casefold().strip()
        posts: list[dict[str, Any]] = []
        if self.posts_dir.is_dir():
            for path in sorted(self.posts_dir.glob("*/index.md")):
                try:
                    raw = path.read_text(encoding="utf-8")
                    header, _ = _split_document(raw)
                    metadata = _parse_frontmatter(header)
                except (OSError, UnicodeError, BlogError):
                    continue
                slug = path.parent.name
                title = str(metadata.get("title") or slug)
                draft = bool(metadata.get("draft", False))
                searchable = f"{slug} {title} {metadata.get('summary', '')}".casefold()
                if query_folded and query_folded not in searchable:
                    continue
                if drafts_only and not draft:
                    continue
                posts.append(
                    {
                        "slug": slug,
                        "title": title,
                        "summary": metadata.get("summary", ""),
                        "draft": draft,
                        "tags": metadata.get("tags", []),
                        "categories": metadata.get("categories", []),
                        "translations": [
                            lang for lang in LANGS[1:] if (path.parent / f"index.{lang}.md").is_file()
                        ],
                        "modified": datetime.fromtimestamp(path.stat().st_mtime).astimezone().isoformat(timespec="seconds"),
                    }
                )
        total = len(posts)
        return {"posts": posts[offset : offset + limit], "total": total, "offset": offset, "limit": limit}

    def read_post(self, slug: Any, lang: Any = DEFAULT_LANG) -> dict[str, Any]:
        raw, path = self._read_raw(slug, lang)
        header, body = _split_document(raw)
        return {
            "slug": path.parent.name,
            "lang": lang,
            "path": str(path.relative_to(self.root)),
            "frontmatter": _parse_frontmatter(header),
            "content": _one_separator(body),
            "sha256": _sha256(raw),
        }

    def create_post(
        self, title: Any, slug: Any, content: Any, tags: Any = None, categories: Any = None, summary: Any = "",
        lang: Any = DEFAULT_LANG,
    ) -> dict[str, Any]:
        title = _required_text("title", title, 200)
        slug = self._slug(slug)
        content = _content_text(content)
        summary = _optional_text("summary", summary, 500) or ""
        path = self._post_file(slug, lang)
        if path.exists():
            raise BlogError(f"Post already exists: {slug} ({lang})")
        date = datetime.now().astimezone().isoformat(timespec="seconds")
        if lang != DEFAULT_LANG:
            # A translation shares the original's date and taxonomy unless overridden.
            original, _ = self._read_raw(slug)
            metadata = _parse_frontmatter(_split_document(original)[0])
            date = str(metadata.get("date") or date)
            if tags is None:
                tags = metadata.get("tags", [])
            if categories is None:
                categories = metadata.get("categories", [])
        tags = _string_list("tags", tags)
        categories = _string_list("categories", categories)
        lines = [
            f"title: {_json_string(title)}",
            f"date: {date}",
            f"slug: {_json_string(slug)}",
            f"tags: {_json_list(tags)}",
            f"categories: {_json_list(categories)}",
            f"summary: {_json_string(summary)}",
            "draft: true",
        ]
        self._atomic_write(path, _compose_document(lines, content))
        return self.read_post(slug, lang)

    def update_post(
        self, slug: Any, title: Any = None, content: Any = None, tags: Any = None,
        categories: Any = None, summary: Any = None, lang: Any = DEFAULT_LANG,
    ) -> dict[str, Any]:
        slug = self._slug(slug)
        raw, path = self._read_raw(slug, lang)
        lines, old_body = _split_document(raw)
        updates = {"draft": "true"}
        if title is not None:
            updates["title"] = _json_string(_required_text("title", title, 200))
        if summary is not None:
            updates["summary"] = _json_string(_optional_text("summary", summary, 500) or "")
        if tags is not None:
            updates["tags"] = _json_list(_string_list("tags", tags))
        if categories is not None:
            updates["categories"] = _json_list(_string_list("categories", categories))
        body = old_body if content is None else _content_text(content)
        self._atomic_write(path, _compose_document(_set_frontmatter(lines, updates), body))
        return self.read_post(slug, lang)

    def validate_site(self) -> dict[str, Any]:
        if not self.config_file.is_file():
            raise BlogError(f"Hugo config not found at {self.config_file}")
        if not self.hugo_bin:
            return {"valid": None, "skipped": True, "reason": "hugo executable not found"}
        with tempfile.TemporaryDirectory(prefix="blog-mcp-hugo-") as destination:
            try:
                completed = subprocess.run(
                    [self.hugo_bin, "--source", str(self.root), "--destination", destination],
                    text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=120, check=False,
                )
            except (OSError, subprocess.TimeoutExpired) as exc:
                raise BlogError(f"Could not run Hugo: {exc}") from exc
        return {
            "valid": completed.returncode == 0,
            "exit_code": completed.returncode,
            "output": completed.stdout[-8000:].strip(),
        }

    def _git(self, args: list[str], check: bool = True) -> subprocess.CompletedProcess[str]:
        try:
            completed = subprocess.run(
                ["git", "-C", str(self.root), *args], text=True, stdout=subprocess.PIPE,
                stderr=subprocess.PIPE, timeout=120, check=False,
            )
        except (OSError, subprocess.TimeoutExpired) as exc:
            raise BlogError(f"Could not run Git: {exc}") from exc
        if check and completed.returncode != 0:
            detail = (completed.stderr or completed.stdout).strip()
            raise BlogError(f"Git {' '.join(args[:2])} failed: {detail}")
        return completed

    def _assert_git_root(self) -> None:
        top = self._git(["rev-parse", "--show-toplevel"]).stdout.strip()
        if Path(top).resolve() != self.root:
            raise BlogError(f"BLOG_MCP_ROOT must be the Git repository root (found {top})")

    def git_status(self) -> dict[str, Any]:
        self._assert_git_root()
        branch = self._git(["branch", "--show-current"]).stdout.strip()
        commit = self._git(["rev-parse", "--verify", "HEAD"], check=False)
        remote = self._git(["remote", "get-url", "origin"], check=False)
        status = self._git(["status", "--porcelain=v1", "--", "content/posts"]).stdout.splitlines()
        return {
            "branch": branch,
            "commit": commit.stdout.strip() if commit.returncode == 0 else None,
            "origin": remote.stdout.strip() if remote.returncode == 0 else None,
            "post_changes": status[:500],
            "truncated": len(status) > 500,
        }

    def push_commits(self, expected_commit: Any, dry_run: Any = False) -> dict[str, Any]:
        """Push an existing, approved branch tip without changing posts or the index."""
        expected_commit = _required_text("expected_commit", expected_commit, 64)
        if not isinstance(dry_run, bool):
            raise BlogError("dry_run must be a boolean")
        self._assert_git_root()
        branch = self._git(["branch", "--show-current"]).stdout.strip()
        if not branch:
            raise BlogError("Cannot push a detached HEAD; check out the intended branch first")
        commit = self._git(["rev-parse", "--verify", "HEAD"]).stdout.strip()
        if expected_commit != commit:
            raise BlogError("HEAD changed or expected_commit is incorrect; call git_status and review the commit again")
        origin = self._git(["remote", "get-url", "--push", "origin"]).stdout.strip()
        args = ["-c", "push.followTags=false", "push", "--porcelain"]
        if dry_run:
            args.append("--dry-run")
        # Pin the source commit and destination branch. Do not inherit configured
        # push refspecs or include tags, force updates, or other branches.
        args.extend(["origin", f"{commit}:refs/heads/{branch}"])
        pushed = self._git(args, check=False)
        result: dict[str, Any] = {
            "branch": branch,
            "commit": commit,
            "origin": origin,
            "dry_run": dry_run,
            "success": pushed.returncode == 0,
            "pushed": pushed.returncode == 0 and not dry_run,
            "exit_code": pushed.returncode,
            "push_output": (pushed.stdout + pushed.stderr).strip()[-8000:],
            "hosting_deployment_confirmed": False,
        }
        if pushed.returncode != 0:
            result["error"] = "Pushing existing commits to origin failed; local commits are unchanged"
        return result

    def prepare_publish(self, slug: Any, lang: Any = DEFAULT_LANG) -> dict[str, Any]:
        post = self.read_post(slug, lang)
        token = f"publish:{post['slug']}:{lang}:{post['sha256']}"
        post["confirmation"] = token
        post["instructions"] = (
            "Show this exact preview to the user. Only after explicit publication authorization, call publish_post "
            "with this confirmation token. Any edit invalidates the token."
        )
        return post

    def _site_url(self, slug: str, lang: str = DEFAULT_LANG) -> str | None:
        if not self.config_file.is_file():
            return None
        config = self.config_file.read_text(encoding="utf-8")
        match = re.search(r'^baseURL\s*=\s*["\']([^"\']+)["\']', config, re.M)
        prefix = "" if lang == DEFAULT_LANG else f"/{lang}"
        return f"{match.group(1).rstrip('/')}{prefix}/posts/{slug}/" if match else None

    def publish_post(
        self, slug: Any, confirmation: Any, push_to_remote: Any = False, commit_message: Any = None,
        lang: Any = DEFAULT_LANG,
    ) -> dict[str, Any]:
        slug = self._slug(slug)
        if not isinstance(push_to_remote, bool):
            raise BlogError("push_to_remote must be a boolean")
        original, path = self._read_raw(slug, lang)
        expected = f"publish:{slug}:{lang}:{_sha256(original)}"
        if confirmation != expected:
            raise BlogError("Publication confirmation is missing or stale; call prepare_publish again")
        self._assert_git_root()
        relative = str(path.relative_to(self.root))
        staged = self._git(["diff", "--cached", "--quiet", "--", relative], check=False)
        if staged.returncode == 1:
            raise BlogError(f"Refusing to publish because {relative} already has staged changes")
        if staged.returncode not in {0, 1}:
            raise BlogError(staged.stderr.strip() or "Could not inspect staged changes")

        lines, body = _split_document(original)
        published = _compose_document(_set_frontmatter(lines, {"draft": "false"}), body)
        if commit_message is None:
            title = str(_parse_frontmatter(lines).get("title") or slug)
            commit_message = f"Publish: {title}"
        commit_message = _required_text("commit_message", commit_message, 200)
        if "\n" in commit_message or "\r" in commit_message:
            raise BlogError("commit_message must be a single line")

        staged_by_server = False
        try:
            self._atomic_write(path, published)
            validation = self.validate_site()
            if validation.get("valid") is False:
                raise BlogError(f"Hugo validation failed:\n{validation.get('output', '')}")
            self._git(["add", "--", relative])
            staged_by_server = True
            changed = self._git(["diff", "--cached", "--quiet", "--", relative], check=False)
            if changed.returncode == 0:
                raise BlogError("There are no post changes to commit")
            if changed.returncode != 1:
                raise BlogError(changed.stderr.strip() or "Could not inspect the staged post")
            self._git(["commit", "--only", "-m", commit_message, "--", relative])
            staged_by_server = False
        except Exception:
            if staged_by_server:
                self._git(["reset", "--", relative], check=False)
            self._atomic_write(path, original)
            raise

        commit = self._git(["rev-parse", "HEAD"]).stdout.strip()
        result: dict[str, Any] = {
            "slug": slug,
            "commit": commit,
            "committed": True,
            "pushed": False,
            "sha256": _sha256(published),
            "lang": lang,
            "site_url": self._site_url(slug, lang),
            "hosting_deployment_confirmed": False,
            "validation": validation,
        }
        if push_to_remote:
            pushed = self._git(["push", "--porcelain", "origin", "HEAD"], check=False)
            result["push_output"] = (pushed.stdout + pushed.stderr).strip()[-8000:]
            result["pushed"] = pushed.returncode == 0
            if pushed.returncode != 0:
                result["error"] = "The commit was created locally, but pushing to origin failed"
                result["retry_tool"] = "push_commits"
                result["retry_arguments"] = {"expected_commit": commit}
        return result

    def read_resource(self, uri: str) -> dict[str, Any]:
        if uri == "blog://config":
            if not self.config_file.is_file():
                raise BlogError("hugo.toml not found")
            return {"uri": uri, "mimeType": "application/toml", "text": self.config_file.read_text(encoding="utf-8")}
        prefix = "blog://posts/"
        if uri.startswith(prefix):
            slug, _, query = uri[len(prefix) :].partition("?")
            lang = DEFAULT_LANG
            if query:
                if not query.startswith("lang="):
                    raise BlogError(f"Unknown or disallowed resource URI: {uri}")
                lang = query[len("lang=") :]
            raw, _ = self._read_raw(slug, lang)
            return {"uri": uri, "mimeType": "text/markdown", "text": raw}
        raise BlogError(f"Unknown or disallowed resource URI: {uri}")


TOOLS: list[dict[str, Any]] = [
    {
        "name": "list_posts", "title": "List blog posts",
        "description": "List and search Hugo posts (original zh-tw posts; translations lists existing en/ja versions). Existing posts without draft are published.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "default": ""},
                "drafts_only": {"type": "boolean", "default": False},
                "offset": {"type": "integer", "minimum": 0, "default": 0},
                "limit": {"type": "integer", "minimum": 1, "maximum": 200, "default": 50},
            }, "additionalProperties": False,
        },
        "annotations": {"readOnlyHint": True, "openWorldHint": False},
    },
    {
        "name": "read_post", "title": "Read a blog post",
        "description": "Read a post or one of its translations, including frontmatter, Markdown body, and version hash.",
        "inputSchema": {"type": "object", "properties": {"slug": {"type": "string"}, "lang": {"type": "string", "enum": list(LANGS), "default": DEFAULT_LANG, "description": "zh-tw is the original index.md; en/ja are translations in index.<lang>.md"}},
                        "required": ["slug"], "additionalProperties": False},
        "annotations": {"readOnlyHint": True, "openWorldHint": False},
    },
    {
        "name": "create_post", "title": "Create a draft",
        "description": "Create a new Hugo post, or a translation of an existing post when lang is en or ja (date, tags, and categories default to the original's). It is always saved with draft: true and is not committed.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "slug": {"type": "string", "pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*$"},
                "content": {"type": "string", "description": "Markdown body without frontmatter"},
                "tags": {"type": "array", "items": {"type": "string"}, "default": []},
                "categories": {"type": "array", "items": {"type": "string"}, "default": []},
                "summary": {"type": "string", "default": ""},
                "lang": {"type": "string", "enum": list(LANGS), "default": DEFAULT_LANG, "description": "zh-tw is the original index.md; en/ja are translations in index.<lang>.md"},
            }, "required": ["title", "slug", "content"], "additionalProperties": False,
        },
        "annotations": {"readOnlyHint": False, "destructiveHint": False, "openWorldHint": False},
    },
    {
        "name": "update_post", "title": "Update a draft",
        "description": "Update allowed post fields while preserving other frontmatter. Always sets draft: true; never commits.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "slug": {"type": "string"}, "title": {"type": "string"},
                "content": {"type": "string", "description": "Markdown body without frontmatter"},
                "tags": {"type": "array", "items": {"type": "string"}},
                "categories": {"type": "array", "items": {"type": "string"}},
                "summary": {"type": "string"},
                "lang": {"type": "string", "enum": list(LANGS), "default": DEFAULT_LANG, "description": "zh-tw is the original index.md; en/ja are translations in index.<lang>.md"},
            }, "required": ["slug"], "additionalProperties": False,
        },
        "annotations": {"readOnlyHint": False, "destructiveHint": False, "openWorldHint": False},
    },
    {
        "name": "validate_site", "title": "Validate the Hugo site",
        "description": "Build the site into a temporary directory and return Hugo diagnostics.",
        "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
        "annotations": {"readOnlyHint": True, "openWorldHint": False},
    },
    {
        "name": "git_status", "title": "Show blog Git status",
        "description": "Show the branch, HEAD commit for push_commits, origin, and changes under content/posts only.",
        "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
        "annotations": {"readOnlyHint": True, "openWorldHint": False},
    },
    {
        "name": "prepare_publish", "title": "Prepare an exact publication preview",
        "description": "Return the full current post (or translation) and a version-bound confirmation token. Does not write or commit.",
        "inputSchema": {"type": "object", "properties": {"slug": {"type": "string"}, "lang": {"type": "string", "enum": list(LANGS), "default": DEFAULT_LANG, "description": "zh-tw is the original index.md; en/ja are translations in index.<lang>.md"}},
                        "required": ["slug"], "additionalProperties": False},
        "annotations": {"readOnlyHint": True, "openWorldHint": False},
    },
    {
        "name": "push_commits", "title": "Push existing approved commits",
        "description": (
            "Push the current branch's existing approved commits to origin without editing posts or creating a commit. "
            "Use this to retry a failed publication push. Get expected_commit from git_status or publish_post; "
            "a changed HEAD is rejected. This pushes all pending commits on that branch. "
            "Set dry_run true to check without updating the remote. Never force-pushes or pushes tags."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "expected_commit": {"type": "string", "description": "Exact full HEAD commit hash from git_status or publish_post"},
                "dry_run": {"type": "boolean", "default": False},
            }, "required": ["expected_commit"], "additionalProperties": False,
        },
        "annotations": {"readOnlyHint": False, "destructiveHint": False, "openWorldHint": True},
    },
    {
        "name": "publish_post", "title": "Publish an approved post to Git",
        "description": (
            "After the user explicitly approves the exact prepare_publish preview, set draft false, validate Hugo, "
            "commit only that post, and optionally push origin. A stale confirmation is rejected. "
            "If the commit succeeds but pushing fails, retry with push_commits instead of republishing."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "slug": {"type": "string"},
                "confirmation": {"type": "string", "description": "Exact token returned by prepare_publish"},
                "push_to_remote": {"type": "boolean", "default": False},
                "commit_message": {"type": "string"},
                "lang": {"type": "string", "enum": list(LANGS), "default": DEFAULT_LANG, "description": "zh-tw is the original index.md; en/ja are translations in index.<lang>.md"},
            }, "required": ["slug", "confirmation"], "additionalProperties": False,
        },
        "annotations": {"readOnlyHint": False, "destructiveHint": False, "openWorldHint": True},
    },
]


def _tool_result(value: Any, is_error: bool = False) -> dict[str, Any]:
    return {
        "content": [{"type": "text", "text": json.dumps(value, ensure_ascii=False, indent=2)}],
        "structuredContent": value if isinstance(value, dict) else {"result": value},
        "isError": is_error,
    }


def _call_tool(store: BlogStore, name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(arguments, dict):
        raise RpcError(-32602, "Tool arguments must be an object")
    calls = {
        "list_posts": lambda: store.list_posts(**arguments),
        "read_post": lambda: store.read_post(**arguments),
        "create_post": lambda: store.create_post(**arguments),
        "update_post": lambda: store.update_post(**arguments),
        "validate_site": lambda: store.validate_site(),
        "git_status": lambda: store.git_status(),
        "push_commits": lambda: store.push_commits(**arguments),
        "prepare_publish": lambda: store.prepare_publish(**arguments),
        "publish_post": lambda: store.publish_post(**arguments),
    }
    if name not in calls:
        raise RpcError(-32602, f"Unknown tool: {name}")
    try:
        value = calls[name]()
        return _tool_result(value, is_error=bool(isinstance(value, dict) and value.get("error")))
    except BlogError as exc:
        return _tool_result({"error": str(exc)}, is_error=True)
    except TypeError as exc:
        return _tool_result({"error": f"Invalid tool arguments: {exc}"}, is_error=True)


def _resources_list(store: BlogStore, cursor: Any) -> dict[str, Any]:
    try:
        offset = int(cursor or 0)
    except (TypeError, ValueError) as exc:
        raise RpcError(-32602, "Invalid resources cursor") from exc
    if offset < 0:
        raise RpcError(-32602, "Invalid resources cursor")
    listing = store.list_posts(offset=offset, limit=100)
    resources = ([{
        "uri": "blog://config", "name": "Hugo configuration",
        "description": "Read-only site configuration", "mimeType": "application/toml",
    }] if offset == 0 else [])
    resources.extend(
        {"uri": f"blog://posts/{post['slug']}", "name": post["title"],
         "description": post.get("summary") or f"Hugo post: {post['slug']}", "mimeType": "text/markdown"}
        for post in listing["posts"]
    )
    resources.extend(
        {"uri": f"blog://posts/{post['slug']}?lang={lang}", "name": f"{post['title']} ({lang})",
         "description": f"{lang} translation of {post['slug']}", "mimeType": "text/markdown"}
        for post in listing["posts"] for lang in post["translations"]
    )
    result: dict[str, Any] = {"resources": resources}
    next_offset = offset + len(listing["posts"])
    if next_offset < listing["total"]:
        result["nextCursor"] = str(next_offset)
    return result


def _handle_request(store: BlogStore, message: dict[str, Any]) -> Any:
    method = message.get("method")
    params = message.get("params") or {}
    if not isinstance(params, dict):
        raise RpcError(-32602, "params must be an object")
    if method == "initialize":
        requested = params.get("protocolVersion")
        protocol = requested if requested in SUPPORTED_PROTOCOLS else LATEST_PROTOCOL
        return {
            "protocolVersion": protocol,
            "capabilities": {"tools": {"listChanged": False}, "resources": {"subscribe": False, "listChanged": False}},
            "serverInfo": {"name": SERVER_NAME, "version": SERVER_VERSION},
            "instructions": (
                "Use create_post/update_post for drafts. Before publication, call prepare_publish, show the full "
                "preview to the user, obtain explicit authorization, then call publish_post with its exact token. "
                "To push existing approved commits or retry a failed push, call push_commits with expected_commit "
                "from git_status or publish_post. It pushes all pending branch commits without creating a new commit. "
                "Translations use the same tools with lang en or ja; each language is prepared and published separately."
            ),
        }
    if method == "ping":
        return {}
    if method == "tools/list":
        return {"tools": TOOLS}
    if method == "tools/call":
        name = params.get("name")
        if not isinstance(name, str):
            raise RpcError(-32602, "tools/call requires a tool name")
        return _call_tool(store, name, params.get("arguments") or {})
    if method == "resources/list":
        return _resources_list(store, params.get("cursor"))
    if method == "resources/templates/list":
        return {"resourceTemplates": [{
            "uriTemplate": "blog://posts/{slug}", "name": "Hugo blog post",
            "description": "Read a post by its lowercase ASCII slug", "mimeType": "text/markdown",
        }, {
            "uriTemplate": "blog://posts/{slug}?lang={lang}", "name": "Hugo blog post translation",
            "description": "Read the en or ja translation of a post", "mimeType": "text/markdown",
        }]}
    if method == "resources/read":
        uri = params.get("uri")
        if not isinstance(uri, str):
            raise RpcError(-32602, "resources/read requires a URI")
        try:
            return {"contents": [store.read_resource(uri)]}
        except BlogError as exc:
            raise RpcError(-32002, str(exc)) from exc
    raise RpcError(-32601, f"Method not found: {method}")


def _send(message: dict[str, Any]) -> None:
    sys.stdout.write(json.dumps(message, ensure_ascii=False, separators=(",", ":")) + "\n")
    sys.stdout.flush()


def main() -> int:
    default_root = Path(__file__).resolve().parents[1]
    store = BlogStore(Path(os.environ.get("BLOG_MCP_ROOT", str(default_root))))
    for raw_line in sys.stdin.buffer:
        message: Any = None
        if len(raw_line) > MAX_MESSAGE_BYTES:
            _send({"jsonrpc": "2.0", "id": None, "error": {"code": -32600, "message": "Message is too large"}})
            continue
        try:
            message = json.loads(raw_line)
            if not isinstance(message, dict) or message.get("jsonrpc") != "2.0":
                raise RpcError(-32600, "Invalid JSON-RPC request")
            if "id" not in message:  # Notifications never receive responses.
                continue
            result = _handle_request(store, message)
            _send({"jsonrpc": "2.0", "id": message["id"], "result": result})
        except json.JSONDecodeError:
            _send({"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Parse error"}})
        except RpcError as exc:
            request_id = message.get("id") if isinstance(message, dict) else None
            _send({"jsonrpc": "2.0", "id": request_id, "error": {"code": exc.code, "message": exc.message}})
        except Exception as exc:
            print(f"Unexpected MCP server error: {exc}", file=sys.stderr)
            request_id = message.get("id") if isinstance(message, dict) else None
            _send({"jsonrpc": "2.0", "id": request_id, "error": {"code": -32603, "message": "Internal error"}})
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

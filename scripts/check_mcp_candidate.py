#!/usr/bin/env python3
"""Reject candidates that change anything except the one selected regular Markdown file.

The Worker verifies the signed metadata. CI independently checks the candidate's
tree, parent, and content; it does not require any deployment or signing secrets.
"""
import base64
import hashlib
import json
import os
import re
import subprocess
from pathlib import Path

from mcp_server import _parse_frontmatter, _split_document


def validate_candidate(root: Path, ref_name: str) -> dict:
    def git(*args):
        return subprocess.check_output(["git", "-C", str(root), *args], text=True).strip()

    message = git("show", "-s", "--format=%B", "HEAD")
    prefix = "Blog MCP candidate\n\n"
    if not message.startswith(prefix):
        raise ValueError("Missing MCP candidate metadata")
    envelope = message[len(prefix):].split(".")
    if len(envelope) != 2:
        raise ValueError("Invalid candidate envelope")
    encoded = envelope[0]
    data = json.loads(base64.urlsafe_b64decode(encoded + "=" * (-len(encoded) % 4)))
    if ref_name != f"mcp/candidates/{data['operation_id']}":
        raise ValueError("Candidate branch does not match operation")
    slug, lang = data["slug"], data["lang"]
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug) or len(slug) > 100 or lang not in ("zh-tw", "en", "ja"):
        raise ValueError("Invalid article identity")
    path = f"content/posts/{slug}/index{'' if lang == 'zh-tw' else '.' + lang}.md"
    if git("show", "-s", "--format=%P", "HEAD") != data["base_main"]:
        raise ValueError("Candidate must have exactly its recorded base parent")
    changed = git("diff", "--name-only", "HEAD^", "HEAD", "--").splitlines()
    if changed != [path]:
        raise ValueError("Candidate must change exactly the selected article")
    entry = git("ls-tree", "HEAD", "--", path)
    if not entry.startswith("100644 blob "):
        raise ValueError("Candidate article must be a regular non-executable file")
    raw = (root / path).read_bytes()
    if len(raw) > 2 * 1024 * 1024 or hashlib.sha256(raw).hexdigest() != data["content_sha256"]:
        raise ValueError("Candidate content does not match the approved version")
    header, _ = _split_document(raw.decode("utf-8"))
    if _parse_frontmatter(header).get("draft") is not False:
        raise ValueError("Candidate must set draft: false")
    return data


if __name__ == "__main__":
    validate_candidate(Path.cwd(), os.environ["GITHUB_REF_NAME"])
    print("Candidate changes only its selected article")

#!/usr/bin/env python3
"""Export repository article metadata alongside the Pages build (no article bodies)."""
import argparse
import json
import re
import subprocess
from pathlib import Path

from mcp_server import BlogStore


def export_index(root: Path, commit: str) -> dict:
    if not re.fullmatch(r"[a-f0-9]{40}", commit):
        raise ValueError("commit must be a full Git SHA")
    store = BlogStore(root, hugo_bin="")
    posts = []
    offset = 0
    while True:
        page = store.list_posts(offset=offset, limit=200)
        for post in page["posts"]:
            # Checkout mtimes are not editorial modification dates.
            post.pop("modified", None)
            posts.append(post)
        offset += len(page["posts"])
        if offset >= page["total"]:
            break
    return {"schema_version": 1, "commit": commit, "posts": posts}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output", type=Path, default=Path("public/mcp-index.json"))
    parser.add_argument("--commit")
    args = parser.parse_args()
    commit = args.commit or subprocess.check_output(
        ["git", "-C", str(args.root), "rev-parse", "HEAD"], text=True
    ).strip()
    result = export_index(args.root, commit)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"Exported {len(result['posts'])} article summaries at {commit}")


if __name__ == "__main__":
    main()

"""Read article metadata for Pages indexing and cloud publication checks.

This is a build helper, not an MCP server. It retains the existing restricted
frontmatter reader so index output does not depend on optional Python packages.
"""
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

MAX_POST_BYTES = 2 * 1024 * 1024
LANGS = ('zh-tw', 'en', 'ja')
FRONTMATTER_RE = re.compile(r'^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$')


def split_document(raw: str) -> tuple[list[str], str]:
    if not raw.startswith('---\n'):
        raise ValueError('Post is missing YAML frontmatter')
    lines = raw.splitlines(keepends=True)
    for index in range(1, len(lines)):
        if lines[index].strip() == '---':
            return ''.join(lines[1:index]).splitlines(), ''.join(lines[index + 1:])
    raise ValueError('Post has an unterminated YAML frontmatter block')


def parse_value(value: str) -> Any:
    value = value.strip()
    if not value:
        return ''
    if value.lower() == 'true':
        return True
    if value.lower() == 'false':
        return False
    if value[0] in '[{"' or value in {'null', '~'}:
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            pass
    if len(value) >= 2 and value[0] == value[-1] == "'":
        return value[1:-1].replace("''", "'")
    return value


def parse_frontmatter(lines: list[str]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for line in lines:
        match = FRONTMATTER_RE.match(line)
        if match:
            result[match.group(1)] = parse_value(match.group(2) or '')
    return result


def article_metadata(root: Path) -> list[dict[str, Any]]:
    posts = []
    posts_dir = root.resolve() / 'content' / 'posts'
    for path in sorted(posts_dir.glob('*/index.md')):
        try:
            if path.resolve().parent.parent != posts_dir or path.stat().st_size > MAX_POST_BYTES:
                continue
            header, _ = split_document(path.read_text(encoding='utf-8'))
            metadata = parse_frontmatter(header)
        except (OSError, UnicodeError, ValueError):
            continue
        slug = path.parent.name
        try:
            date = datetime.fromisoformat(str(metadata.get('date', '')).replace('Z', '+00:00'))
            # Match Hugo's default UTC for dates without an explicit time zone.
            date = date.replace(tzinfo=date.tzinfo or timezone.utc).astimezone(timezone.utc).isoformat()
        except (ValueError, OverflowError):
            date = None
        posts.append({
            'slug': slug,
            'date': date,
            'title': str(metadata.get('title') or slug),
            'summary': metadata.get('summary', ''),
            'draft': bool(metadata.get('draft', False)),
            'tags': metadata.get('tags', []),
            'categories': metadata.get('categories', []),
            'translations': [lang for lang in LANGS[1:] if (path.parent / f'index.{lang}.md').is_file()],
        })
    # The path ordering above provides the stable slug tie-breaker. Unknown
    # dates sort last; normalized UTC dates can be compared as ISO strings.
    posts.sort(key=lambda post: post['date'] or '', reverse=True)
    return posts

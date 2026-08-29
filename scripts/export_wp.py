import os
import re
import json
import pymysql
from pathlib import Path

WP_PWD = os.environ["WP_PWD"]
OUT_DIR = Path(__file__).resolve().parent.parent / "content" / "posts"

conn = pymysql.connect(
    host="34.84.30.226",
    user="coder.tw",
    password=WP_PWD,
    database="coder.tw",
    connect_timeout=10,
    charset="utf8mb4",
)

with conn.cursor(pymysql.cursors.DictCursor) as c:
    c.execute(
        """
        SELECT ID, post_title, post_name, post_date, post_content, post_excerpt
        FROM wp_posts
        WHERE post_type='post' AND post_status='publish'
        ORDER BY post_date
        """
    )
    posts = c.fetchall()

    c.execute(
        """
        SELECT tr.object_id, tt.taxonomy, t.name
        FROM wp_term_relationships tr
        JOIN wp_term_taxonomy tt ON tt.term_taxonomy_id = tr.term_taxonomy_id
        JOIN wp_terms t ON t.term_id = tt.term_id
        WHERE tt.taxonomy IN ('category','post_tag')
        """
    )
    terms = {}
    for r in c.fetchall():
        terms.setdefault(r["object_id"], {"category": [], "post_tag": []})[
            r["taxonomy"]
        ].append(r["name"])

    c.execute(
        """
        SELECT p.post_id AS ID, a.guid
        FROM wp_postmeta p
        JOIN wp_posts a ON a.ID = p.meta_value AND p.meta_key = '_thumbnail_id'
        """
    )
    thumbnails = {r["ID"]: r["guid"] for r in c.fetchall()}

conn.close()

WP_COMMENT = re.compile(r"<!--\s*(?:/\s*)?wp:[^>]*-->\s*")
MORE_COMMENT = re.compile(r"<!--\s*/?\s*wp:more[^>]*-->")


def clean_html(content: str) -> str:
    content = MORE_COMMENT.sub("", content)
    content = content.replace("<!--more-->", "\n<!--more-->\n")
    return WP_COMMENT.sub("", content).strip()


def yaml_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


used_slugs = {}
count = 0
for p in posts:
    slug = p["post_name"] or f"post-{p['ID']}"
    if slug in used_slugs:
        used_slugs[slug] += 1
        slug = f"{slug}-{used_slugs[slug]}"
    else:
        used_slugs[slug] = 0

    pid = p["ID"]
    cats = [t for t in terms.get(pid, {}).get("category", []) if t != "未分類"]
    tags = terms.get(pid, {}).get("post_tag", [])

    body = clean_html(p["post_content"])
    title = p["post_title"].strip() or slug

    fm = ["---"]
    fm.append(f"title: {yaml_str(title)}")
    fm.append(f"date: {p['post_date'].isoformat()}")
    fm.append(f"slug: {yaml_str(slug)}")
    fm.append(f"tags: {json.dumps(tags, ensure_ascii=False)}")
    fm.append(f"categories: {json.dumps(cats, ensure_ascii=False)}")
    if pid in thumbnails:
        fm.append(f"images: [{yaml_str(thumbnails[pid])}]")
    if p["post_excerpt"].strip():
        fm.append(f"summary: {yaml_str(p['post_excerpt'].strip())}")
    fm.append("---")

    post_dir = OUT_DIR / slug
    post_dir.mkdir(parents=True, exist_ok=True)
    (post_dir / "index.md").write_text("\n".join(fm) + "\n\n" + body + "\n", encoding="utf-8")
    count += 1

print(f"exported {count} posts to {OUT_DIR}")

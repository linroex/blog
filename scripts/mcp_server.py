#!/usr/bin/env python3
"""MCP Server for Hugo Blog article management."""

import json
import sys
import os
from pathlib import Path
from datetime import datetime

BLOG_ROOT = Path(__file__).parent
POSTS_DIR = BLOG_ROOT / "content" / "posts"

# MCP message protocol helpers
def send_request(request_id, method, params=None):
    if params is None:
        params = {}
    msg = {"jsonrpc": "2.0", "id": request_id, "method": method, "params": params}
    return send(msg)

def send_response(request_id, result=None, error=None):
    msg = {"jsonrpc": "2.0", "id": request_id}
    if error:
        msg["error"] = {"code": -1, "message": str(error)}
    else:
        msg["result"] = result or {}
    return send(msg)

def send(msg):
    text = json.dumps(msg, ensure_ascii=False)
    print(f"Content-Length: {len(text.encode('utf-8'))}\r\n\r\n{text}", end="", flush=True)

def read_message():
    # Read Content-Length header
    header = ""
    while "\r\n\r\n" not in header:
        chunk = sys.stdin.buffer.read(1)
        if not chunk:
            return None
        header += chunk.decode("utf-8")
    
    # Parse Content-Length
    content_length = 0
    for line in header.split("\r\n"):
        if line.lower().startswith("content-length:"):
            content_length = int(line.split(":", 1)[1].strip())
            break
    
    # Read body
    body = sys.stdin.buffer.read(content_length)
    return json.loads(body.decode("utf-8"))


def list_posts():
    """List all blog posts with metadata."""
    posts = []
    
    if not POSTS_DIR.exists():
        return posts
    
    for post_dir in sorted(POSTS_DIR.iterdir()):
        if not post_dir.is_dir():
            continue
        
        index_file = post_dir / "index.md"
        if not index_file.exists():
            continue
        
        frontmatter = {}
        title = post_dir.name.replace("-", " ").title()
        draft = True
        tags = []
        categories = []
        slug = post_dir.name
        
        try:
            content = index_file.read_text(encoding="utf-8")
            # Parse frontmatter
            if content.startswith("---"):
                parts = content.split("---", 2)
                if len(parts) >= 3:
                    fm_text = parts[1]
                    for line in fm_text.strip().split("\n"):
                        if ":" in line:
                            key, val = line.split(":", 1)
                            key = key.strip()
                            val = val.strip().strip('"').strip("'")
                            frontmatter[key] = val
                            
                            if key == "title":
                                title = val
                            elif key == "draft":
                                draft = val.lower() == "true"
                            elif key == "slug":
                                slug = val
                            elif key == "tags":
                                val = val.strip("[]").strip()
                                if val:
                                    tags = [t.strip().strip('"').strip("'") for t in val.split(",")]
                            elif key == "categories":
                                val = val.strip("[]").strip()
                                if val:
                                    categories = [c.strip().strip('"').strip("'") for c in val.split(",")]
        except Exception as e:
            frontmatter["error"] = str(e)
        
        # Get reading time estimate from content length
        try:
            text_content = content.split("---", 2)[2] if "---" in content else ""
            word_count = len(text_content.split())
            reading_min = max(1, word_count // 200)
        except Exception:
            reading_min = 1
        
        posts.append({
            "slug": slug,
            "title": title,
            "path": str(post_dir),
            "draft": draft,
            "tags": tags,
            "categories": categories,
            "reading_time_minutes": reading_min,
            "file": str(index_file)
        })
    
    return posts


def create_post(title, slug=None, tags=None, categories=None):
    """Create a new draft post."""
    if not slug:
        slug = title.lower().replace(" ", "-").replace("'", "").replace("\"", "")
        # Replace multiple hyphens
        while "--" in slug:
            slug = slug.replace("--", "-")
        slug = slug.strip("-")
    
    post_dir = POSTS_DIR / slug
    index_file = post_dir / "index.md"
    
    if index_file.exists():
        return {"error": f"Post already exists at slug '{slug}'"}
    
    post_dir.mkdir(parents=True, exist_ok=True)
    
    tags_str = json.dumps(tags, ensure_ascii=False) if tags else "[]"
    cats_str = json.dumps(categories, ensure_ascii=False) if categories else "[]"
    
    frontmatter = f"""---
title: "{title}"
date: {datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}
slug: "{slug}"
tags: {tags_str}
categories: {cats_str}
---
"""
    
    index_file.write_text(frontmatter, encoding="utf-8")
    
    return {
        "slug": slug,
        "title": title,
        "path": str(post_dir),
        "draft": True,
        "message": "Post created successfully"
    }


def read_post(slug):
    """Read a post by slug."""
    index_file = POSTS_DIR / slug / "index.md"
    
    if not index_file.exists():
        return {"error": f"Post not found: '{slug}'"}
    
    content = index_file.read_text(encoding="utf-8")
    frontmatter = {}
    body = content
    
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1]
            for line in fm_text.strip().split("\n"):
                if ":" in line:
                    key, val = line.split(":", 1)
                    frontmatter[key.strip()] = val.strip().strip('"').strip("'")
            body = parts[2]
    
    return {
        "slug": slug,
        "frontmatter": frontmatter,
        "content": body
    }


def update_post(slug, title=None, content=None, tags=None, categories=None, publish=None):
    """Update a post's frontmatter or content."""
    index_file = POSTS_DIR / slug / "index.md"
    
    if not index_file.exists():
        return {"error": f"Post not found: '{slug}'"}
    
    old_content = index_file.read_text(encoding="utf-8")
    frontmatter = {}
    body = old_content
    
    # Parse existing frontmatter
    if old_content.startswith("---"):
        parts = old_content.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1]
            for line in fm_text.strip().split("\n"):
                if ":" in line:
                    key, val = line.split(":", 1)
                    frontmatter[key.strip()] = val.strip().strip('"').strip("'")
            body = parts[2]
    
    # Update fields
    if title is not None:
        frontmatter["title"] = title
    if tags is not None:
        frontmatter["tags"] = json.dumps(tags, ensure_ascii=False)
    if categories is not None:
        frontmatter["categories"] = json.dumps(categories, ensure_ascii=False)
    if publish is not None:
        frontmatter["draft"] = str(not publish).lower()
    if content is not None:
        body = content
    
    # Rebuild file
    fm_lines = []
    for key in ["title", "date", "slug", "tags", "categories", "draft"]:
        if key in frontmatter:
            fm_lines.append(f"{key}: {frontmatter[key]}")
    
    new_fm = "\n".join(fm_lines)
    new_content = f"---\n{new_fm}\n---\n{body}"
    
    index_file.write_text(new_content, encoding="utf-8")
    
    return {"slug": slug, "message": "Post updated successfully"}


def delete_post(slug):
    """Delete a post."""
    post_dir = POSTS_DIR / slug
    index_file = post_dir / "index.md"
    
    if not index_file.exists():
        return {"error": f"Post not found: '{slug}'"}
    
    import shutil
    shutil.rmtree(post_dir)
    
    return {"slug": slug, "message": "Post deleted successfully"}


# MCP Tool definitions
TOOLS = [
    {
        "name": "list_posts",
        "description": "List all blog posts with metadata (title, slug, draft status, tags, categories)",
        "inputSchema": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "create_post",
        "description": "Create a new blog post draft. Returns the post path and slug.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "title": {"type": "string", "description": "The title of the post"},
                "slug": {"type": "string", "description": "URL slug (auto-generated from title if omitted)"},
                "tags": {"type": "array", "items": {"type": "string"}, "description": "List of tags"},
                "categories": {"type": "array", "items": {"type": "string"}, "description": "List of categories"}
            },
            "required": ["title"]
        }
    },
    {
        "name": "read_post",
        "description": "Read the full content of a blog post by slug.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "slug": {"type": "string", "description": "The slug of the post"}
            },
            "required": ["slug"]
        }
    },
    {
        "name": "update_post",
        "description": "Update a post's title, content, tags, categories, or publish status.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "slug": {"type": "string", "description": "The slug of the post"},
                "title": {"type": "string", "description": "New title"},
                "content": {"type": "string", "description": "New markdown content (after frontmatter)"},
                "tags": {"type": "array", "items": {"type": "string"}, "description": "New tags list"},
                "categories": {"type": "array", "items": {"type": "string"}, "description": "New categories list"},
                "publish": {"type": "boolean", "description": "Set true to publish, false to keep as draft"}
            },
            "required": ["slug"]
        }
    },
    {
        "name": "delete_post",
        "description": "Delete a blog post by slug.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "slug": {"type": "string", "description": "The slug of the post to delete"}
            },
            "required": ["slug"]
        }
    }
]

# MCP Method handlers
HANDLERS = {
    "tools/call": lambda params: handle_tool_call(params),
}

def handle_tool_call(params):
    tool_name = params.get("name", "")
    arguments = params.get("arguments", {})
    
    if tool_name == "list_posts":
        posts = list_posts()
        return {"content": [{"type": "text", "text": json.dumps(posts, ensure_ascii=False, indent=2)}]}
    
    elif tool_name == "create_post":
        result = create_post(
            title=arguments.get("title", ""),
            slug=arguments.get("slug"),
            tags=arguments.get("tags"),
            categories=arguments.get("categories")
        )
        if "error" in result:
            return {"error": {"code": -1, "message": result["error"]}}
        return {"content": [{"type": "text", "text": json.dumps(result, ensure_ascii=False, indent=2)}]}
    
    elif tool_name == "read_post":
        result = read_post(arguments.get("slug", ""))
        if "error" in result:
            return {"error": {"code": -1, "message": result["error"]}}
        return {"content": [{"type": "text", "text": json.dumps(result, ensure_ascii=False, indent=2)}]}
    
    elif tool_name == "update_post":
        result = update_post(
            slug=arguments.get("slug", ""),
            title=arguments.get("title"),
            content=arguments.get("content"),
            tags=arguments.get("tags"),
            categories=arguments.get("categories"),
            publish=arguments.get("publish")
        )
        if "error" in result:
            return {"error": {"code": -1, "message": result["error"]}}
        return {"content": [{"type": "text", "text": json.dumps(result, ensure_ascii=False, indent=2)}]}
    
    elif tool_name == "delete_post":
        result = delete_post(arguments.get("slug", ""))
        if "error" in result:
            return {"error": {"code": -1, "message": result["error"]}}
        return {"content": [{"type": "text", "text": json.dumps(result, ensure_ascii=False, indent=2)}]}
    
    else:
        return {"error": {"code": -1, "message": f"Unknown tool: {tool_name}"}}


def main():
    # Send initialize response
    send({
        "jsonrpc": "2.0",
        "id": 0,
        "result": {
            "protocolVersion": "2024-11-05",
            "capabilities": {"tools": {"listChanged": False}},
            "serverInfo": {"name": "hugo-blog", "version": "1.0.0"}
        }
    })
    
    # Send tools/list
    send_request(0, "notifications/initialized")
    
    # Read tool list request and respond
    msg = read_message()
    if msg and msg.get("method") == "tools/list":
        send_response(msg["id"], {"tools": TOOLS})
    
    # Main loop
    while True:
        msg = read_message()
        if msg is None:
            break
        
        method = msg.get("method", "")
        request_id = msg.get("id")
        
        if method == "tools/call" and request_id is not None:
            try:
                result = HANDLERS.get(method, lambda p: {"error": {"code": -1, "message": "Unknown method"}})(msg.get("params", {}))
                send_response(request_id, result)
            except Exception as e:
                send_response(request_id, None, e)
        else:
            send_response(request_id)


if __name__ == "__main__":
    main()

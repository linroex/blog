"""Validate cloud MCP image manifests independently in candidate CI."""
import hashlib
import re

MAX_IMAGE_BYTES = 1024 * 1024
MAX_R2_IMAGE_BYTES = 25 * 1024 * 1024
MAX_UPLOAD_BYTES = 15 * 1024 * 1024
MAX_IMAGES = 8
IMAGE_NAME = re.compile(r"[a-z0-9][a-z0-9-]{0,79}\.(png|jpg|jpeg|gif|webp)")
IMAGE_TYPES = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "gif": "image/gif", "webp": "image/webp"}


def image_asset(filename, raw):
    if not isinstance(filename, str) or not IMAGE_NAME.fullmatch(filename):
        raise ValueError("Use a lowercase image filename with letters, digits and hyphens, ending in png, jpg, jpeg, gif or webp")
    if not 1 <= len(raw) <= MAX_IMAGE_BYTES:
        raise ValueError("Images must be between 1 byte and 1 MiB")
    mime = None
    if raw.startswith(b"\x89PNG\r\n\x1a\n"):
        mime = "image/png"
    elif raw.startswith(b"\xff\xd8\xff"):
        mime = "image/jpeg"
    elif raw[:6] in (b"GIF87a", b"GIF89a"):
        mime = "image/gif"
    elif raw[:4] == b"RIFF" and raw[8:12] == b"WEBP":
        mime = "image/webp"
    expected = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "gif": "image/gif", "webp": "image/webp"}[filename.rsplit(".", 1)[1]]
    if mime != expected:
        raise ValueError("Image signature does not match the filename extension")
    return {"filename": filename, "sha256": hashlib.sha256(raw).hexdigest(), "size": len(raw), "mime_type": mime}


def image_manifest(value):
    if not isinstance(value, list) or len(value) > MAX_IMAGES:
        raise ValueError("A draft supports at most 8 uploaded images")
    names = set()
    for asset in value:
        if not isinstance(asset, dict) or not isinstance(asset.get("filename"), str) or not IMAGE_NAME.fullmatch(asset["filename"]) or asset["filename"] in names or not re.fullmatch(r"[a-f0-9]{64}", str(asset.get("sha256"))) or type(asset.get("size")) is not int or not 1 <= asset["size"] <= (MAX_R2_IMAGE_BYTES if asset.get('storage') == 'r2' else MAX_IMAGE_BYTES):
            raise ValueError("Invalid image manifest")
        if asset.get('mime_type') != IMAGE_TYPES[asset['filename'].rsplit('.', 1)[1]]:
            raise ValueError('Invalid image MIME type')
        if asset.get('storage') == 'r2':
            if not re.fullmatch(r'[a-f0-9-]{36}', str(asset.get('upload_id'))) or not re.fullmatch(r'blog-mcp/images/[a-z0-9-]+/[a-f0-9]{64}/[a-z0-9.-]+', str(asset.get('key'))) or not isinstance(asset.get('url'), str) or not asset['url'].startswith('https://') or len(asset['url']) > 2048:
                raise ValueError('Invalid R2 image manifest')
            if 'original' in asset:
                original = asset['original']
                if not isinstance(original, dict) or not isinstance(original.get('filename'), str) or not IMAGE_NAME.fullmatch(original['filename']) or not re.fullmatch(r'[a-f0-9]{64}', str(original.get('sha256'))) or original.get('mime_type') != IMAGE_TYPES[original['filename'].rsplit('.', 1)[1]] or type(original.get('size')) is not int or not 1 <= original['size'] <= MAX_UPLOAD_BYTES or asset['size'] > MAX_UPLOAD_BYTES or asset['mime_type'] != 'image/webp' or asset['filename'] != original['filename'].rsplit('.', 1)[0] + '.webp':
                    raise ValueError('Invalid converted image manifest')
        elif 'storage' in asset:
            raise ValueError('Unknown image storage')
        names.add(asset["filename"])
    return value


def image_view(slug, asset):
    if asset.get('storage') == 'r2':
        return {**asset, 'preview_url': asset['url'], 'markdown': f"![]({asset['url']})"}
    relative = f"images/{asset['filename']}"
    return {**asset, "path": f"content/posts/{slug}/{relative}", "relative_url": relative, "markdown": f"![]({relative})"}

"""Validate cloud MCP image manifests independently in candidate CI."""
import hashlib
import re

MAX_IMAGE_BYTES = 1024 * 1024
MAX_IMAGES = 8
IMAGE_NAME = re.compile(r"[a-z0-9][a-z0-9-]{0,79}\.(png|jpg|jpeg|gif|webp)")


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
        if not isinstance(asset, dict) or not isinstance(asset.get("filename"), str) or not IMAGE_NAME.fullmatch(asset["filename"]) or asset["filename"] in names or not re.fullmatch(r"[a-f0-9]{64}", str(asset.get("sha256"))) or type(asset.get("size")) is not int or not 1 <= asset["size"] <= MAX_IMAGE_BYTES:
            raise ValueError("Invalid image manifest")
        names.add(asset["filename"])
    return value


def image_view(slug, asset):
    relative = f"images/{asset['filename']}"
    return {**asset, "path": f"content/posts/{slug}/{relative}", "relative_url": relative, "markdown": f"![]({relative})"}

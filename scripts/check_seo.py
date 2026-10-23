#!/usr/bin/env python3
"""Validate production article SEO against Hugo's published content inventory.

Python 3.11+, standard library only. No requests to the deployed site are made.
"""

import argparse
import csv
import io
import os
from pathlib import Path, PurePosixPath
import subprocess
import sys
import tomllib
from collections import Counter, defaultdict
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET


LANGUAGES = {"zh-tw": "zh-TW", "en": "en-US", "ja": "ja-JP"}
# These are the site's explicit equivalents, not a general removal of regions.
LANGUAGE_ALIASES = {
    value.lower(): language
    for language, locale in LANGUAGES.items()
    for value in (language, locale)
}
SITEMAP = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
XHTML = "{http://www.w3.org/1999/xhtml}"


class SEOError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise SEOError(message)


class Head(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.in_head = False
        self.canonicals = []
        self.alternates = []
        self.redirect = False
        self.noindex = False
        self.language = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.language = attrs.get("lang", "").lower()
        if tag == "head":
            self.in_head = True
        if not self.in_head:
            return
        if tag == "link":
            rel = attrs.get("rel", "").lower().split()
            if "canonical" in rel:
                self.canonicals.append(attrs.get("href", ""))
            if "hreflang" in attrs:
                require("alternate" in rel, "hreflang link must have rel=alternate")
                self.alternates.append((attrs["hreflang"], attrs.get("href", "")))
        if tag == "meta":
            self.redirect |= attrs.get("http-equiv", "").lower() == "refresh"
            if attrs.get("name", "").lower() in ("robots", "googlebot"):
                self.noindex |= "noindex" in attrs.get("content", "").lower()

    def handle_endtag(self, tag):
        if tag == "head":
            self.in_head = False


def article_inventory(rows):
    """Group the repo's filename-based translations independently of SEO tags."""
    groups = defaultdict(dict)
    urls = set()
    for row in rows:
        if row["kind"] != "page" or row["section"] != "posts":
            continue
        path = PurePosixPath(row["path"])
        require(path.suffix == ".md", f"Unsupported article filename: {path}")
        stem = path.stem
        language = "zh-tw"
        if "." in stem:
            stem, language = stem.rsplit(".", 1)
        require(language in LANGUAGES, f"Unsupported article language: {path}")
        group = str(path.with_name(stem))
        url = row["permalink"]
        require(language not in groups[group], f"Duplicate translation: {path}")
        require(url not in urls, f"Duplicate article URL: {url}")
        groups[group][language] = url
        urls.add(url)
    counts = Counter(language for group in groups.values() for language in group)
    require(all(counts[language] for language in LANGUAGES),
            f"Published inventory must include all three languages: {dict(counts)}")
    return dict(groups)


def alternate_map(links, context):
    result = {}
    for code, url in links:
        language = LANGUAGE_ALIASES.get(code.lower())
        require(language is not None, f"{context}: unsupported hreflang {code!r}")
        require(language not in result, f"{context}: duplicate hreflang {code!r}")
        result[language] = url
    return result


def validate(public, groups, base_url):
    public = Path(public).resolve()
    base_url = base_url.rstrip("/") + "/"
    base = urlsplit(base_url)
    require(base.scheme == "https" and base.netloc and not base.query and not base.fragment,
            f"Expected an absolute HTTPS base URL: {base_url}")
    heads = {}

    def target(url):
        parsed = urlsplit(url)
        require(parsed.scheme == base.scheme and parsed.netloc == base.netloc
                and not parsed.query and not parsed.fragment,
                f"Expected an absolute site URL without query/fragment: {url}")
        require(parsed.path.startswith(base.path), f"URL outside base path: {url}")
        relative = unquote(parsed.path[len(base.path):])
        require(not PurePosixPath(relative).is_absolute() and ".." not in relative.split("/"),
                f"Unsafe URL path: {url}")
        path = public / relative
        if parsed.path.endswith("/"):
            path /= "index.html"
        require(path.is_relative_to(public) and path.is_file(),
                f"Missing generated page: {url} ({path})")
        return path

    def head(url):
        if url not in heads:
            heads[url] = Head(target(url).read_text(encoding="utf-8"))
        result = heads[url]
        require(not result.redirect, f"SEO URL points to a redirect: {url}")
        require(not result.noindex, f"SEO URL points to a noindex page: {url}")
        return result

    sitemap_path = public / "sitemap.xml"
    root = ET.parse(sitemap_path).getroot()
    require(root.tag == SITEMAP + "urlset", "Root sitemap must be a multilingual urlset")
    entries = {}
    for entry in root.findall(SITEMAP + "url"):
        locs = entry.findall(SITEMAP + "loc")
        require(len(locs) == 1 and locs[0].text, "Sitemap URL needs exactly one loc")
        url = locs[0].text
        require(url not in entries, f"Duplicate sitemap loc: {url}")
        head(url)
        links = []
        for link in entry.findall(XHTML + "link"):
            require(link.get("rel") == "alternate", f"{url}: invalid sitemap link rel")
            href = link.get("href", "")
            head(href)
            links.append((link.get("hreflang", ""), href))
        entries[url] = alternate_map(links, f"Sitemap {url}")

    articles = {url for group in groups.values() for url in group.values()}
    prefixes = {language: base_url + ("" if language == "zh-tw" else language + "/") + "posts/"
                for language in LANGUAGES}
    for url in entries:
        if any(url.startswith(prefix) and url != prefix for prefix in prefixes.values()):
            require(url in articles, f"Sitemap includes an unpublished article or alias: {url}")

    for group_name, translations in sorted(groups.items()):
        for language, url in translations.items():
            context = f"{group_name} [{language}] {url}"
            require(url.startswith(prefixes[language]) and url != prefixes[language],
                    f"{context}: unexpected language URL prefix")
            page = head(url)
            require(LANGUAGE_ALIASES.get(page.language) == language,
                    f"{context}: wrong HTML language {page.language!r}")
            require(page.canonicals == [url],
                    f"{context}: expected one self canonical, got {page.canonicals}")
            html_alternates = alternate_map(page.alternates, context)
            require(html_alternates == translations,
                    f"{context}: HTML hreflang mismatch; expected {translations}, got {html_alternates}")
            require(url in entries, f"{context}: missing from root sitemap")
            # Hugo omits sitemap alternates on a page with no published translations.
            expected = translations if len(translations) > 1 else {}
            require(entries[url] == expected,
                    f"{context}: sitemap hreflang mismatch; expected {expected}, got {entries[url]}")

    robots = (public / "robots.txt").read_text(encoding="utf-8")
    require(f"Sitemap: {base_url}sitemap.xml" in robots.splitlines(),
            "robots.txt must advertise the validated root sitemap")
    return (f"SEO OK: {len(groups)} article groups, {len(articles)} published article pages, "
            f"{len(entries)} sitemap URLs; canonical and reciprocal translations verified.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--public-dir", type=Path)
    parser.add_argument("--base-url", help="Must match the Hugo build's base URL")
    args = parser.parse_args()
    try:
        config = tomllib.loads((args.source / "hugo.toml").read_text(encoding="utf-8"))
        require(config["defaultContentLanguage"] == "zh-tw"
                and config["defaultContentLanguageInSubdir"] is False,
                "Expected unprefixed Traditional Chinese URLs")
        require({code: language["locale"] for code, language in config["languages"].items()}
                == LANGUAGES, "Update the SEO language contract when changing site languages")
        base_url = args.base_url or config["baseURL"]
        env = {**os.environ, "HUGO_BASEURL": base_url, "HUGO_ENVIRONMENT": "production"}
        inventory = subprocess.run(
            ["hugo", "list", "published", "--environment", "production", "--source", str(args.source)],
            env=env, check=True, text=True, stdout=subprocess.PIPE,
        )
        groups = article_inventory(csv.DictReader(io.StringIO(inventory.stdout)))
        print(validate(args.public_dir or args.source / "public", groups, base_url))
    except (SEOError, OSError, KeyError, ET.ParseError, subprocess.CalledProcessError) as error:
        print(f"SEO validation failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

import copy
from pathlib import Path
import tempfile
import unittest
from xml.sax.saxutils import escape

from check_seo import LANGUAGES, SEOError, article_inventory, validate


BASE = "https://example.test/"


class SEOTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.public = Path(self.temporary.name)
        self.groups = {
            f"content/posts/{slug}/index": {
                language: BASE + ("" if language == "zh-tw" else language + "/") + f"posts/{slug}/"
                for language in LANGUAGES
            }
            for slug in ("first", "second")
        }
        self.groups["content/posts/untranslated/index"] = {"zh-tw": BASE + "posts/untranslated/"}
        self.render()

    def path(self, url):
        return self.public / url.removeprefix(BASE) / "index.html"

    def render(self):
        entries = []
        for translations in self.groups.values():
            for language, url in translations.items():
                html_links = "".join(
                    f'<link rel="alternate" hreflang="{code}" href="{escape(href)}">'
                    for code, href in translations.items()
                )
                page = self.path(url)
                page.parent.mkdir(parents=True, exist_ok=True)
                page.write_text(
                    f'<html lang="{language}"><head><link rel="canonical" href="{url}">'
                    f'{html_links}<link rel="alternate" type="application/rss+xml" href="/index.xml">'
                    '</head><body>Article</body></html>', encoding="utf-8",
                )
                sitemap_links = "".join(
                    f'<xhtml:link rel="alternate" hreflang="{LANGUAGES[code]}" href="{escape(href)}"/>'
                    for code, href in translations.items()
                ) if len(translations) > 1 else ""
                entries.append(f"<url><loc>{url}</loc>{sitemap_links}</url>")
        self.sitemap = self.public / "sitemap.xml"
        self.sitemap.write_text(
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
            'xmlns:xhtml="http://www.w3.org/1999/xhtml">' + "".join(entries) + '</urlset>',
            encoding="utf-8",
        )
        (self.public / "robots.txt").write_text(f"User-agent: *\nSitemap: {BASE}sitemap.xml\n")

    def check(self):
        return validate(self.public, self.groups, BASE)

    def replace(self, path, old, new):
        original = path.read_text(encoding="utf-8")
        self.assertIn(old, original)
        path.write_text(original.replace(old, new), encoding="utf-8")

    def test_valid_site_accepts_both_language_vocabularies_and_rss(self):
        self.assertIn("3 article groups, 7 published article pages", self.check())

    def test_two_published_translations_are_valid(self):
        del self.groups["content/posts/first/index"]["ja"]
        self.render()
        self.check()

    def test_language_codes_are_case_insensitive(self):
        self.replace(self.sitemap, 'hreflang="zh-TW"', 'hreflang="ZH-tw"')
        self.check()

    def test_base_url_with_subdirectory(self):
        new_base = "https://example.test/blog/"
        for path in self.public.rglob("*.html"):
            path.write_text(path.read_text().replace(BASE, new_base))
        self.replace(self.sitemap, BASE, new_base)
        self.replace(self.public / "robots.txt", BASE, new_base)
        groups = {name: {language: url.replace(BASE, new_base) for language, url in translations.items()}
                  for name, translations in self.groups.items()}
        self.assertIn("SEO OK", validate(self.public, groups, new_base))

    def test_non_absolute_external_and_unsafe_sitemap_urls_fail(self):
        url = self.groups["content/posts/first/index"]["en"]
        for replacement in ("/en/posts/first/", url.replace("https:", "http:"),
                            url.replace("example.test", "other.test"), url + "?query=1", url + "#fragment",
                            BASE + "../outside/", BASE + "%2e%2e/outside/"):
            with self.subTest(replacement=replacement):
                self.render()
                self.replace(self.sitemap, url, replacement)
                with self.assertRaises(SEOError):
                    self.check()

    def test_wrong_or_duplicate_canonical_fails(self):
        url = self.groups["content/posts/first/index"]["en"]
        canonical = f'<link rel="canonical" href="{url}">'
        for replacement in ("", canonical + canonical,
                            '<link rel="canonical" href="https://example.test/posts/first/">',
                            '<link rel="canonical" href="/en/posts/first/">'):
            with self.subTest(replacement=replacement):
                self.render()
                self.replace(self.path(url), canonical, replacement)
                with self.assertRaisesRegex(SEOError, "self canonical"):
                    self.check()

    def test_wrong_missing_or_duplicate_html_alternate_fails(self):
        url = self.groups["content/posts/first/index"]["en"]
        link = '<link rel="alternate" hreflang="ja" href="https://example.test/ja/posts/first/">'
        for replacement in ("", link + link,
                            link.replace("/ja/posts/first/", "/ja/posts/second/"),
                            link.replace('hreflang="ja"', 'hreflang="fr"'),
                            link.replace('href="https://example.test', 'href="https://other.test')):
            with self.subTest(replacement=replacement):
                self.render()
                self.replace(self.path(url), link, replacement)
                with self.assertRaises(SEOError):
                    self.check()

    def test_links_in_body_do_not_count(self):
        url = self.groups["content/posts/first/index"]["en"]
        self.replace(self.path(url), '</head><body>', '<body>')
        # Move the canonical outside head rather than accepting it anywhere in HTML.
        canonical = f'<link rel="canonical" href="{url}">'
        self.replace(self.path(url), canonical, "")
        self.replace(self.path(url), '<body>', '</head><body>' + canonical)
        with self.assertRaisesRegex(SEOError, "self canonical"):
            self.check()

    def test_missing_generated_translation_fails(self):
        self.path(self.groups["content/posts/first/index"]["ja"]).unlink()
        with self.assertRaisesRegex(SEOError, "Missing generated page"):
            self.check()

    def test_redirect_noindex_and_wrong_language_fail(self):
        url = self.groups["content/posts/first/index"]["en"]
        for old, new, message in (
            ('<head>', '<head><meta http-equiv="refresh" content="0; url=/">', "redirect"),
            ('<head>', '<head><meta name="robots" content="noindex, nofollow">', "noindex"),
            ('lang="en"', 'lang="zh-tw"', "wrong HTML language"),
        ):
            with self.subTest(message=message):
                self.render()
                self.replace(self.path(url), old, new)
                with self.assertRaisesRegex(SEOError, message):
                    self.check()

    def test_bad_sitemap_alternates_fail(self):
        link = '<xhtml:link rel="alternate" hreflang="en-US" href="https://example.test/en/posts/first/"/>'
        for replacement in ("", link + link,
                            link.replace("/en/posts/first/", "/en/posts/second/"),
                            link.replace('hreflang="en-US"', 'hreflang="en-GB"'),
                            link.replace("/en/posts/first/", "/en/posts/missing/")):
            with self.subTest(replacement=replacement):
                self.render()
                self.replace(self.sitemap, link, replacement)
                with self.assertRaises(SEOError):
                    self.check()

    def test_missing_or_duplicate_sitemap_entry_fails(self):
        url = self.groups["content/posts/first/index"]["en"]
        text = self.sitemap.read_text()
        start = text.index(f'<url><loc>{url}</loc>')
        end = text.index('</url>', start) + len('</url>')
        entry = text[start:end]
        for replacement, message in (("", "missing from root sitemap"), (entry + entry, "Duplicate sitemap loc")):
            with self.subTest(message=message):
                self.render()
                self.replace(self.sitemap, entry, replacement)
                with self.assertRaisesRegex(SEOError, message):
                    self.check()

    def test_unpublished_article_in_sitemap_fails(self):
        extra = BASE + "posts/draft/"
        path = self.path(extra)
        path.parent.mkdir(parents=True)
        path.write_text('<html><head></head><body>Draft</body></html>')
        self.replace(self.sitemap, '</urlset>', f'<url><loc>{extra}</loc></url></urlset>')
        with self.assertRaisesRegex(SEOError, "unpublished article or alias"):
            self.check()

    def test_inventory_catches_consistently_wrong_translation_group(self):
        # Even mutually agreeing HTML and XML must match source article identity.
        first = self.groups["content/posts/first/index"]["ja"]
        second = self.groups["content/posts/second/index"]["ja"]
        def swap_alternates(text, code):
            first_link = f'hreflang="{code}" href="{first}"'
            second_link = f'hreflang="{code}" href="{second}"'
            return text.replace(first_link, "TEMP").replace(second_link, first_link).replace("TEMP", second_link)

        for path in self.public.rglob("*.html"):
            path.write_text(swap_alternates(path.read_text(), "ja"))
        self.sitemap.write_text(swap_alternates(self.sitemap.read_text(), "ja-JP"))
        with self.assertRaisesRegex(SEOError, "HTML hreflang mismatch"):
            self.check()

    def test_wrong_robots_sitemap_fails(self):
        (self.public / "robots.txt").write_text("Sitemap: https://other.test/sitemap.xml\n")
        with self.assertRaisesRegex(SEOError, "robots.txt"):
            self.check()

    def test_inventory_groups_sources_independently_of_slug(self):
        rows = [
            {"kind": "page", "section": "posts", "path": f"content/posts/example/index{suffix}.md",
             "permalink": BASE + url}
            for suffix, url in (("", "posts/original/"), (".en", "en/posts/translated/"),
                                (".ja", "ja/posts/japanese/"))
        ]
        rows.append({"kind": "section", "section": "posts", "path": "content/posts/_index.md"})
        groups = article_inventory(rows)
        self.assertEqual(set(groups), {"content/posts/example/index"})
        self.assertEqual(set(groups["content/posts/example/index"]), set(LANGUAGES))
        for bad in ([], rows[:1], rows + [copy.copy(rows[0])]):
            with self.subTest(rows=bad), self.assertRaises(SEOError):
                article_inventory(bad)


if __name__ == "__main__":
    unittest.main()

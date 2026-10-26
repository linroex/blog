import base64
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

from check_mcp_candidate import validate_candidate
from export_mcp_index import export_index
from blog_images import image_asset


class CloudMCPTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.path = "content/posts/hello/index.md"
        (self.root / "hugo.toml").write_text('baseURL = "https://example.com/"\n[params]\nimageBase = "https://images.example.com"\n')
        self.git("init", "-q")
        self.git("config", "user.name", "Test")
        self.git("config", "user.email", "test@example.com")
        self.git("add", ".")
        self.git("commit", "-qm", "Initial")

    def git(self, *args):
        return subprocess.check_output(["git", "-C", str(self.root), *args], text=True).strip()

    def write(self, path, text):
        file = self.root / path
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(text, encoding="utf-8")

    def candidate(self, extra=False, bad_hash=False, draft=False, image=False, undeclared=False, r2=None):
        parent = self.git("rev-parse", "HEAD")
        text = f'---\ntitle: "Hello"\ndraft: {str(draft).lower()}\n---\n\nContent\n'
        self.write(self.path, text)
        if extra:
            self.write("hugo.toml", 'baseURL = "https://unexpected.example.com/"')
        data = {"operation_id": "123", "slug": "hello", "lang": "zh-tw", "base_main": parent,
                "content_sha256": "wrong" if bad_hash else hashlib.sha256(text.encode()).hexdigest()}
        if image:
            raw = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=')
            (self.root / 'content/posts/hello/images').mkdir(parents=True, exist_ok=True)
            (self.root / 'content/posts/hello/images/chart.png').write_bytes(raw)
            if not undeclared:
                data['images'] = [image_asset('chart.png', raw)]
        if r2 is not None:
            data['images'] = [r2]
        envelope = base64.urlsafe_b64encode(json.dumps(data).encode()).decode().rstrip("=") + ".signature-verified-by-worker"
        self.git("add", ".")
        self.git("commit", "-qm", "Blog MCP candidate\n\n" + envelope)

    def test_candidate_accepts_exact_regular_article(self):
        self.candidate()
        self.assertEqual(validate_candidate(self.root, "mcp/candidates/123")["slug"], "hello")

    def test_candidate_rejects_unrelated_changes(self):
        self.candidate(extra=True)
        with self.assertRaisesRegex(ValueError, "exactly"):
            validate_candidate(self.root, "mcp/candidates/123")

    def test_candidate_includes_exact_declared_images(self):
        self.candidate(image=True)
        self.assertEqual(validate_candidate(self.root, 'mcp/candidates/123')['images'][0]['filename'], 'chart.png')

    def test_candidate_rejects_undeclared_images(self):
        self.candidate(image=True, undeclared=True)
        with self.assertRaisesRegex(ValueError, 'exactly'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def test_candidate_rejects_tampered_image(self):
        self.candidate(image=True)
        image = self.root / 'content/posts/hello/images/chart.png'
        image.write_bytes(image.read_bytes() + b'changed')
        self.git('add', '.')
        self.git('commit', '--amend', '--no-edit', '-q')
        with self.assertRaisesRegex(ValueError, 'image'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def test_candidate_rejects_overwriting_existing_image(self):
        self.write('content/posts/hello/images/chart.png', 'Already published')
        self.git('add', '.')
        self.git('commit', '-qm', 'Existing image')
        self.candidate(image=True)
        with self.assertRaisesRegex(ValueError, 'overwrite'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def test_candidate_rejects_image_symlink(self):
        self.candidate(image=True)
        image = self.root / 'content/posts/hello/images/chart.png'
        image.unlink()
        image.symlink_to('../../../../hugo.toml')
        self.git('add', '.')
        self.git('commit', '--amend', '--no-edit', '-q')
        with self.assertRaisesRegex(ValueError, 'regular'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def r2_asset(self, **changes):
        asset = {'filename': 'chart.png', 'sha256': 'a' * 64, 'size': 2 * 1024 * 1024,
                 'mime_type': 'image/png', 'storage': 'r2', 'upload_id': 'b' * 36,
                 'key': 'blog-mcp/images/hello/' + 'a' * 64 + '/chart.png'}
        asset['url'] = 'https://images.example.com/' + asset['key']
        return {**asset, **changes}

    def test_candidate_accepts_r2_manifest_without_git_image_bytes(self):
        self.candidate(r2=self.r2_asset())
        data = validate_candidate(self.root, 'mcp/candidates/123')
        self.assertEqual(data['images'][0]['storage'], 'r2')
        self.assertEqual(self.git('diff', '--name-only', 'HEAD^', 'HEAD'), self.path)

    def test_candidate_rejects_r2_url_outside_trusted_public_base(self):
        self.candidate(r2=self.r2_asset(url='https://other.example.com/chart.png'))
        with self.assertRaisesRegex(ValueError, 'R2 image identity'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def test_candidate_rejects_r2_key_for_another_article(self):
        self.candidate(r2=self.r2_asset(key='blog-mcp/images/other/' + 'a' * 64 + '/chart.png'))
        with self.assertRaisesRegex(ValueError, 'R2 image identity'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def test_candidate_rejects_r2_oversize(self):
        self.candidate(r2=self.r2_asset(size=25 * 1024 * 1024 + 1))
        with self.assertRaisesRegex(ValueError, 'manifest'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def test_candidate_cannot_add_git_image_using_r2_manifest(self):
        self.candidate(image=True, r2=self.r2_asset())
        with self.assertRaisesRegex(ValueError, 'exactly'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def test_candidate_accepts_converted_webp_and_preserves_original_identity(self):
        original = {'filename': 'chart.png', 'sha256': 'b' * 64, 'size': 15 * 1024 * 1024, 'mime_type': 'image/png'}
        key = 'blog-mcp/images/hello/' + 'a' * 64 + '/chart.webp'
        asset = self.r2_asset(filename='chart.webp', mime_type='image/webp', key=key,
                              url='https://images.example.com/' + key, original=original)
        self.candidate(r2=asset)
        self.assertEqual(validate_candidate(self.root, 'mcp/candidates/123')['images'][0]['original'], original)

    def test_candidate_rejects_converted_webp_over_new_limit(self):
        original = {'filename': 'chart.png', 'sha256': 'b' * 64, 'size': 15 * 1024 * 1024 + 1, 'mime_type': 'image/png'}
        self.candidate(r2=self.r2_asset(original=original))
        with self.assertRaisesRegex(ValueError, 'converted'):
            validate_candidate(self.root, 'mcp/candidates/123')

    def test_candidate_accepts_historical_r2_image_up_to_old_limit(self):
        self.candidate(r2=self.r2_asset(size=25 * 1024 * 1024))
        self.assertEqual(validate_candidate(self.root, 'mcp/candidates/123')['images'][0]['size'], 25 * 1024 * 1024)

    def test_candidate_rejects_wrong_hash(self):
        self.candidate(bad_hash=True)
        with self.assertRaisesRegex(ValueError, "content"):
            validate_candidate(self.root, "mcp/candidates/123")

    def test_candidate_rejects_draft_and_wrong_branch(self):
        self.candidate(draft=True)
        with self.assertRaisesRegex(ValueError, "draft"):
            validate_candidate(self.root, "mcp/candidates/123")
        with self.assertRaisesRegex(ValueError, "branch"):
            validate_candidate(self.root, "main")

    def test_candidate_rejects_symlink(self):
        self.candidate()
        file = self.root / self.path
        file.unlink()
        file.symlink_to("../../../hugo.toml")
        self.git("add", ".")
        self.git("commit", "--amend", "--no-edit", "-q")
        with self.assertRaisesRegex(ValueError, "regular"):
            validate_candidate(self.root, "mcp/candidates/123")

    def test_index_has_versions_and_translations_without_bodies_or_checkout_mtime(self):
        self.write(self.path, '---\ntitle: "Hello"\nsummary: "Summary"\ndraft: false\n---\nSECRET BODY\n')
        self.write("content/posts/hello/index.en.md", "translation")
        commit = self.git("rev-parse", "HEAD")
        index = export_index(self.root, commit)
        self.assertEqual(index["commit"], commit)
        self.assertEqual(index["posts"][0]["translations"], ["en"])
        self.assertNotIn("SECRET BODY", json.dumps(index))
        self.assertNotIn("modified", index["posts"][0])

    def test_index_paginates_beyond_200_posts(self):
        for n in range(201):
            self.write(f"content/posts/post-{n}/index.md", '---\ntitle: "Post"\n---\nbody\n')
        self.assertEqual(len(export_index(self.root, self.git("rev-parse", "HEAD"))["posts"]), 201)

    def test_index_keeps_legacy_slugs_that_new_authoring_tools_do_not_accept(self):
        self.write('content/posts/legacy_lc_all/index.md', '---\ntitle: "Legacy"\n---\nbody\n')
        posts = export_index(self.root, self.git('rev-parse', 'HEAD'))['posts']
        self.assertEqual([post['slug'] for post in posts], ['legacy_lc_all'])

    def test_index_orders_publication_dates_with_timezones_ties_and_unknown_dates(self):
        dates = {
            'a-earlier-offset': '2026-01-02T00:00:00+08:00',
            'z-newest': '2026-01-01T20:00:00Z',
            'b-same-instant': '2026-01-01T16:00:00Z',
            'date-only': '2026-01-01',
            'old-naive': '2025-12-31T23:59:59',
            'unknown-a': 'not-a-date',
            'unknown-b': None,
        }
        for slug, date in dates.items():
            field = f'date: "{date}"\n' if date is not None else ''
            self.write(f'content/posts/{slug}/index.md', f'---\ntitle: "Post"\n{field}---\nbody\n')
        posts = export_index(self.root, self.git('rev-parse', 'HEAD'))['posts']
        self.assertEqual([post['slug'] for post in posts], [
            'z-newest', 'a-earlier-offset', 'b-same-instant', 'date-only',
            'old-naive', 'unknown-a', 'unknown-b',
        ])
        self.assertEqual(posts[1]['date'], '2026-01-01T16:00:00+00:00')
        self.assertEqual(posts[3]['date'], '2026-01-01T00:00:00+00:00')
        self.assertIsNone(posts[-1]['date'])
        self.assertIsNone(posts[-2]['date'])


if __name__ == "__main__":
    unittest.main()

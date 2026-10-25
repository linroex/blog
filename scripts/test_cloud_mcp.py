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
        (self.root / "hugo.toml").write_text('baseURL = "https://example.com/"\n')
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

    def candidate(self, extra=False, bad_hash=False, draft=False, image=False, undeclared=False):
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


if __name__ == "__main__":
    unittest.main()

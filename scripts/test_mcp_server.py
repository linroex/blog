import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from mcp_server import BlogError, BlogStore, _call_tool


class BlogStoreTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        (self.root / "content" / "posts").mkdir(parents=True)
        (self.root / "hugo.toml").write_text('baseURL = "https://example.test/"\n', encoding="utf-8")
        self.store = BlogStore(self.root, hugo_bin="")

    def tearDown(self):
        self.temporary.cleanup()

    def git(self, *args):
        return subprocess.run(
            ["git", "-C", str(self.root), *args],
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
        ).stdout.strip()

    def init_git(self):
        self.git("init", "-q")
        self.git("config", "user.name", "MCP Test")
        self.git("config", "user.email", "mcp-test@example.test")
        self.git("add", "hugo.toml")
        self.git("commit", "-q", "-m", "Initial")

    def add_remote(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        remote = Path(temporary.name) / "origin.git"
        subprocess.run(["git", "init", "--bare", "-q", str(remote)], check=True)
        self.git("remote", "add", "origin", str(remote))
        return remote

    def remote_commit(self, remote, ref):
        return subprocess.run(
            ["git", "--git-dir", str(remote), "rev-parse", "--verify", ref],
            text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        )

    def test_create_and_update_are_drafts_and_preserve_frontmatter(self):
        created = self.store.create_post(
            title="測試文章",
            slug="test-post",
            content="# Hello\n",
            tags=["MCP"],
            categories=["技術"],
            summary="摘要",
        )
        self.assertTrue(created["frontmatter"]["draft"])
        path = self.root / created["path"]
        raw = path.read_text(encoding="utf-8")
        raw = raw.replace("draft: true", 'aliases: ["/old-url/"]\ndraft: false')
        path.write_text(raw, encoding="utf-8")

        updated = self.store.update_post("test-post", content="Updated\n")
        self.assertTrue(updated["frontmatter"]["draft"])
        self.assertEqual(updated["frontmatter"]["aliases"], ["/old-url/"])
        self.assertEqual(updated["content"], "Updated\n")

    def test_slug_cannot_escape_posts_directory(self):
        with self.assertRaises(BlogError):
            self.store.read_post("../../hugo")

    def test_stale_publish_token_is_rejected(self):
        self.store.create_post("Title", "stale-post", "First\n")
        prepared = self.store.prepare_publish("stale-post")
        self.store.update_post("stale-post", content="Second\n")
        with self.assertRaises(BlogError):
            self.store.publish_post("stale-post", prepared["confirmation"])

    def test_publish_commits_only_the_approved_post(self):
        self.init_git()
        created = self.store.create_post("Title", "publish-test", "Body\n")
        unrelated = self.root / "unrelated.txt"
        unrelated.write_text("keep me out\n", encoding="utf-8")
        self.git("add", "unrelated.txt")
        prepared = self.store.prepare_publish("publish-test")

        result = self.store.publish_post("publish-test", prepared["confirmation"])

        self.assertTrue(result["committed"])
        self.assertFalse(result["pushed"])
        self.assertEqual(result["validation"]["valid"], None)
        names = self.git("show", "--pretty=format:", "--name-only", "HEAD").splitlines()
        self.assertEqual(names, [created["path"]])
        self.assertEqual(self.git("diff", "--cached", "--name-only"), "unrelated.txt")
        self.assertFalse(self.store.read_post("publish-test")["frontmatter"]["draft"])

    def test_push_existing_commit_preserves_work_and_excludes_tags(self):
        self.init_git()
        remote = self.add_remote()
        self.store.create_post("Title", "push-test", "Approved body\n")
        published = self.store.publish_post("push-test", self.store.prepare_publish("push-test")["confirmation"])
        commit = published["commit"]
        self.assertEqual(self.store.git_status()["commit"], commit)
        (self.root / "unrelated.txt").write_text("staged work\n", encoding="utf-8")
        self.git("add", "unrelated.txt")
        self.store.update_post("push-test", content="Uncommitted edit\n")
        self.git("tag", "-a", "unrelated-tag", "-m", "Do not push this tag")
        self.git("config", "push.followTags", "true")
        status = self.git("status", "--porcelain")
        staged = self.git("diff", "--cached")
        body = self.store.read_post("push-test")["content"]

        result = _call_tool(self.store, "push_commits", {"expected_commit": commit})

        self.assertFalse(result["isError"])
        self.assertTrue(result["structuredContent"]["pushed"])
        self.assertEqual(self.git("rev-parse", "HEAD"), commit)
        self.assertEqual(self.git("status", "--porcelain"), status)
        self.assertEqual(self.git("diff", "--cached"), staged)
        self.assertEqual(self.store.read_post("push-test")["content"], body)
        branch = self.git("branch", "--show-current")
        self.assertEqual(self.remote_commit(remote, f"refs/heads/{branch}").stdout.strip(), commit)
        self.assertNotEqual(self.remote_commit(remote, "refs/tags/unrelated-tag").returncode, 0)

    def test_push_dry_run_does_not_update_remote(self):
        self.init_git()
        remote = self.add_remote()
        commit = self.git("rev-parse", "HEAD")

        result = self.store.push_commits(commit, dry_run=True)

        self.assertTrue(result["success"])
        self.assertTrue(result["dry_run"])
        self.assertFalse(result["pushed"])
        branch = self.git("branch", "--show-current")
        self.assertNotEqual(self.remote_commit(remote, f"refs/heads/{branch}").returncode, 0)

    def test_push_rejects_changed_head_and_detached_head(self):
        self.init_git()
        remote = self.add_remote()
        original = self.git("rev-parse", "HEAD")
        (self.root / "new.txt").write_text("New commit\n", encoding="utf-8")
        self.git("add", "new.txt")
        self.git("commit", "-q", "-m", "Newer commit")
        branch = self.git("branch", "--show-current")
        with self.assertRaisesRegex(BlogError, "HEAD changed"):
            self.store.push_commits(original)
        self.assertNotEqual(self.remote_commit(remote, f"refs/heads/{branch}").returncode, 0)

        commit = self.git("rev-parse", "HEAD")
        self.git("checkout", "--detach", "-q", commit)
        with self.assertRaisesRegex(BlogError, "detached HEAD"):
            self.store.push_commits(commit)

    def test_failed_push_keeps_commit_and_can_be_retried(self):
        self.init_git()
        self.git("remote", "add", "origin", str(self.root / "missing-remote.git"))
        self.store.create_post("Title", "retry-push", "Body\n")
        prepared = self.store.prepare_publish("retry-push")

        published = self.store.publish_post("retry-push", prepared["confirmation"], push_to_remote=True)

        self.assertTrue(published["committed"])
        self.assertFalse(published["pushed"])
        self.assertEqual(published["retry_tool"], "push_commits")
        commit = self.git("rev-parse", "HEAD")
        self.assertEqual(published["retry_arguments"], {"expected_commit": commit})
        failed = _call_tool(self.store, "push_commits", published["retry_arguments"])
        self.assertTrue(failed["isError"])
        self.assertEqual(self.git("rev-parse", "HEAD"), commit)
        self.git("remote", "remove", "origin")
        self.add_remote()

        retried = _call_tool(self.store, "push_commits", published["retry_arguments"])

        self.assertFalse(retried["isError"])
        self.assertTrue(retried["structuredContent"]["pushed"])
        self.assertEqual(self.git("rev-parse", "HEAD"), commit)

    def test_push_dry_run_requires_boolean(self):
        with self.assertRaisesRegex(BlogError, "dry_run must be a boolean"):
            self.store.push_commits("0" * 40, dry_run="false")

    def test_translation_inherits_original_and_updates_separately(self):
        original = self.store.create_post(
            "原文", "translated-post", "中文\n", tags=["MCP"], categories=["SRE"]
        )
        created = self.store.create_post("English", "translated-post", "English\n", lang="en")

        self.assertEqual(created["path"], "content/posts/translated-post/index.en.md")
        self.assertEqual(created["lang"], "en")
        self.assertEqual(created["frontmatter"]["date"], original["frontmatter"]["date"])
        self.assertEqual(created["frontmatter"]["tags"], ["MCP"])
        self.assertEqual(created["frontmatter"]["categories"], ["SRE"])
        self.assertTrue(created["frontmatter"]["draft"])

        self.store.update_post("translated-post", content="Updated English\n", lang="en")
        self.assertEqual(self.store.read_post("translated-post", lang="en")["content"], "Updated English\n")
        self.assertEqual(self.store.read_post("translated-post")["content"], "中文\n")
        listed = self.store.list_posts()
        self.assertEqual(listed["total"], 1)
        self.assertEqual(listed["posts"][0]["translations"], ["en"])
        resource = self.store.read_resource("blog://posts/translated-post?lang=en")
        self.assertIn("Updated English", resource["text"])

    def test_translation_requires_original_and_known_lang(self):
        with self.assertRaisesRegex(BlogError, "Post not found"):
            self.store.create_post("English", "no-original", "Body\n", lang="en")
        self.assertFalse((self.root / "content" / "posts" / "no-original").exists())
        self.store.create_post("原文", "lang-check", "中文\n")
        for lang in ["fr", "../en", "", None]:
            with self.assertRaisesRegex(BlogError, "lang must be one of"):
                self.store.create_post("X", "lang-check", "Body\n", lang=lang)
        with self.assertRaises(BlogError):
            self.store.read_resource("blog://posts/lang-check?lang=fr")

    def test_publish_translation_commits_only_that_language(self):
        self.init_git()
        self.store.create_post("原文", "publish-lang", "中文\n")
        created = self.store.create_post("English", "publish-lang", "English\n", lang="en")
        zh_token = self.store.prepare_publish("publish-lang")["confirmation"]
        with self.assertRaisesRegex(BlogError, "stale"):
            self.store.publish_post("publish-lang", zh_token, lang="en")
        prepared = self.store.prepare_publish("publish-lang", lang="en")

        result = self.store.publish_post("publish-lang", prepared["confirmation"], lang="en")

        self.assertEqual(result["site_url"], "https://example.test/en/posts/publish-lang/")
        names = self.git("show", "--pretty=format:", "--name-only", "HEAD").splitlines()
        self.assertEqual(names, [created["path"]])
        self.assertFalse(self.store.read_post("publish-lang", lang="en")["frontmatter"]["draft"])
        self.assertTrue(self.store.read_post("publish-lang")["frontmatter"]["draft"])


class ProtocolTests(unittest.TestCase):
    def test_stdio_initialize_and_tools_list(self):
        script = Path(__file__).with_name("mcp_server.py")
        messages = [
            {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "initialize",
                "params": {
                    "protocolVersion": "2025-06-18",
                    "capabilities": {},
                    "clientInfo": {"name": "test", "version": "1"},
                },
            },
            {"jsonrpc": "2.0", "method": "notifications/initialized"},
            {"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}},
        ]
        payload = "".join(json.dumps(message) + "\n" for message in messages)
        completed = subprocess.run(
            [sys.executable, str(script)],
            input=payload,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env={**os.environ, "BLOG_MCP_ROOT": str(script.parents[1])},
            timeout=10,
            check=True,
        )
        responses = [json.loads(line) for line in completed.stdout.splitlines()]
        self.assertEqual(len(responses), 2)
        self.assertEqual(responses[0]["result"]["protocolVersion"], "2025-06-18")
        self.assertIn("resources", responses[0]["result"]["capabilities"])
        names = {tool["name"] for tool in responses[1]["result"]["tools"]}
        self.assertEqual(
            names,
            {"list_posts", "read_post", "create_post", "update_post", "validate_site",
             "git_status", "prepare_publish", "publish_post", "push_commits"},
        )


if __name__ == "__main__":
    unittest.main()

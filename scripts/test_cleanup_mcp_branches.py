import base64
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

from cleanup_mcp_branches import cleanup, cleanup_branch


class CleanupTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        self.local = root / 'local'
        self.local.mkdir()
        self.remote = root / 'remote.git'
        subprocess.check_call(['git', 'init', '--bare', '-q', str(self.remote)])
        self.git('git', 'init', '-q')
        self.git('git', 'config', 'user.name', 'Test')
        self.git('git', 'config', 'user.email', 'test@example.com')
        self.git('git', 'remote', 'add', 'origin', str(self.remote))
        (self.local / 'article').write_text('first')
        self.git('git', 'add', 'article')
        self.git('git', 'commit', '-qm', 'First')
        self.before = self.git('git', 'rev-parse', 'HEAD')
        self.branch = 'mcp/reviews/' + 'a' * 36
        self.git('git', 'push', '-q', 'origin', f'HEAD:refs/heads/{self.branch}')
        (self.local / 'article').write_text('second')
        self.git('git', 'commit', '-qam', 'Second')
        self.after = self.git('git', 'rev-parse', 'HEAD')

    def git(self, *args):
        return subprocess.check_output(args, cwd=self.local, text=True, stderr=subprocess.PIPE).strip()

    def test_deletes_only_the_exact_expected_version_and_is_retry_safe(self):
        self.assertEqual(cleanup_branch(self.branch, self.before, self.git), 'removed')
        self.assertEqual(cleanup_branch(self.branch, self.before, self.git), 'already_removed')

    def test_preserves_newer_branch_before_cleanup(self):
        self.git('git', 'push', '-q', 'origin', f'HEAD:refs/heads/{self.branch}')
        self.assertEqual(cleanup_branch(self.branch, self.before, self.git), 'preserved_newer_changes')

    def test_atomic_lease_preserves_update_between_read_and_delete(self):
        def racing_git(*args):
            if args[:3] == ('git', 'push', '--porcelain'):
                self.git('git', 'push', '-q', 'origin', f'HEAD:refs/heads/{self.branch}')
            return self.git(*args)
        self.assertEqual(cleanup_branch(self.branch, self.before, racing_git), 'preserved_newer_changes')
        self.assertIn(self.after, self.git('git', 'ls-remote', '--heads', 'origin', self.branch))

    def test_rejects_main_and_invalid_revision(self):
        for branch, sha in [('main', self.before), ('mcp/drafts/../main/en', self.before), (self.branch, 'invalid')]:
            with self.assertRaises(ValueError):
                cleanup_branch(branch, sha, self.git)

    def test_real_cleanup_failure_is_not_reported_as_a_newer_draft(self):
        def failed_git(*args):
            if args[:3] == ('git', 'push', '--porcelain'):
                raise subprocess.CalledProcessError(1, args)
            return self.git(*args)
        with self.assertRaises(subprocess.CalledProcessError):
            cleanup_branch(self.branch, self.before, failed_git)

    def test_only_the_merged_deployed_pr_drives_branch_cleanup(self):
        repository = 'owner/blog'
        meta = {'slug': 'hello', 'lang': 'en', 'draft_revision': self.before, 'review_branch': self.branch, 'prepared': True}
        encoded = base64.urlsafe_b64encode(json.dumps(meta).encode()).decode().rstrip('=')
        pull = {'merged_at': '2026-10-26', 'merge_commit_sha': self.after,
                'base': {'ref': 'main', 'repo': {'full_name': repository}},
                'head': {'ref': self.branch, 'sha': self.before, 'repo': {'full_name': repository}}}
        def api(path):
            return [pull] if path.startswith('commits/') else {'message': 'Blog MCP candidate\n\n' + encoded + '.signature'}
        self.git('git', 'push', '-q', 'origin', f'{self.before}:refs/heads/mcp/drafts/hello/en')
        result = cleanup(self.after, repository, api, self.git)
        self.assertEqual([item['status'] for item in result], ['removed', 'removed'])
        self.assertEqual(cleanup(self.before, repository, api, self.git), [])


if __name__ == '__main__':
    unittest.main()

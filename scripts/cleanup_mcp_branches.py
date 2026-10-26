#!/usr/bin/env python3
"""After successful deployment, delete only the exact merged MCP branch versions."""
import argparse
import base64
import json
import re
import subprocess

SHA = re.compile(r'[a-f0-9]{40}')
REVIEW = re.compile(r'mcp/reviews/[a-f0-9-]{36}')


def command(*args):
    return subprocess.check_output(args, text=True).strip()


def cleanup_branch(branch, expected, git=command):
    """The lease is checked by Git's ref transaction, including deletion races."""
    if not SHA.fullmatch(expected) or not (REVIEW.fullmatch(branch) or re.fullmatch(r'mcp/drafts/[a-z0-9]+(?:-[a-z0-9]+)*/(?:zh-tw|en|ja)', branch)):
        raise ValueError('Refusing to remove an unmanaged branch')
    ref = f'refs/heads/{branch}'
    before = git('git', 'ls-remote', '--heads', 'origin', ref)
    if not before:
        return 'already_removed'
    if before.split()[0] != expected:
        return 'preserved_newer_changes'
    try:
        git('git', 'push', '--porcelain', f'--force-with-lease={ref}:{expected}', 'origin', f':{ref}')
        return 'removed'
    except subprocess.CalledProcessError:
        after = git('git', 'ls-remote', '--heads', 'origin', ref)
        if not after:
            return 'already_removed'
        if after.split()[0] != expected:
            return 'preserved_newer_changes'
        raise


def cleanup(commit, repository, api=None, git=command):
    if not SHA.fullmatch(commit) or not re.fullmatch(r'[\w.-]+/[\w.-]+', repository):
        raise ValueError('Invalid deployment identity')
    api = api or (lambda path: json.loads(command('gh', 'api', f'repos/{repository}/{path}')))
    pulls = api(f'commits/{commit}/pulls?per_page=100')
    results = []
    for pull in pulls:
        branch = pull['head']['ref']
        if not (pull.get('merged_at') and pull.get('merge_commit_sha') == commit and REVIEW.fullmatch(branch)):
            continue
        if pull['base']['ref'] != 'main' or pull['base']['repo']['full_name'] != repository or pull['head']['repo']['full_name'] != repository:
            raise ValueError('PR repository or base mismatch')
        head = pull['head']['sha']
        if not SHA.fullmatch(head):
            raise ValueError('Invalid PR head')
        message = api(f'git/commits/{head}')['message']
        prefix = 'Blog MCP candidate\n\n'
        if not message.startswith(prefix):
            raise ValueError('Missing candidate metadata')
        encoded = message[len(prefix):].strip().split('.')[0]
        meta = json.loads(base64.urlsafe_b64decode(encoded + '=' * (-len(encoded) % 4)))
        slug, lang = meta['slug'], meta['lang']
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug) or len(slug) > 100 or lang not in ('zh-tw', 'en', 'ja'):
            raise ValueError('Invalid draft identity')
        if meta.get('review_branch') != branch or not isinstance(meta.get('prepared'), bool) or not SHA.fullmatch(meta['draft_revision']):
            raise ValueError('PR does not identify a prepared draft')
        # The PR was merged into trusted main and deployed. Do not trust PR body
        # text for cleanup, and do not follow arbitrary refs or image URLs.
        for target, revision in [(branch, head), (f'mcp/drafts/{slug}/{lang}', meta['draft_revision'])]:
            results.append({'branch': target, 'status': cleanup_branch(target, revision, git)})
    return results


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--commit', required=True)
    parser.add_argument('--repository', required=True)
    args = parser.parse_args()
    print(json.dumps({'branches': cleanup(args.commit, args.repository)}, indent=2))

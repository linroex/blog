import { AuthorizationError, authorizationErrorRedirect, type ConsentDescription } from '@cloudflare/workers-oauth-provider';
import { base64url } from './crypto';
import { BlogError, type Env } from './types';

const escape = (value: string) => value.replace(/[&<>"']/g, char => `&#${char.charCodeAt(0)};`);
export function consentPage(details: ConsentDescription, handle: string): string {
  return `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>授權 Lin's Blog</title><h1>允許 ${escape(details.clientName)} 管理部落格？</h1>
<p>${details.clientDomain ? `客戶端網域：${escape(details.clientDomain)}` : '此客戶端名稱由申請者自行提供。'}</p>
<p>授權將交給：<strong>${escape(details.redirectHost)}</strong></p>
${details.redirectIsLoopback ? '<p>這會授權你電腦上的程式，請確認是你剛發起的登入。</p>' : ''}
<p>允許閱讀文章、保存公開的 GitHub 草稿，以及在你確認內容後發布文章。</p>
<p>只允許部落格擁有者登入。接下來會前往 GitHub 確認身分。</p>
<form method="post" action="/authorize"><input type="hidden" name="handle" value="${escape(handle)}">
<button name="decision" value="approve">允許並登入 GitHub</button> <button name="decision" value="deny">拒絕</button></form></html>`;
}

export async function authHandler(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const oauth = env.OAUTH_PROVIDER;
  try {
    if (url.pathname === '/health' && request.method === 'GET') return Response.json({ status: 'ok' });
    if (url.pathname === '/authorize' && request.method === 'GET') {
      const original = await oauth.parseAuthRequest(request);
      const details = await oauth.describeConsent(original);
      const consent = await oauth.beginConsent(original);
      consent.headers.set('Content-Type', 'text/html; charset=utf-8');
      // no-referrer makes browser form POSTs send Origin: null, breaking
      // the same-origin CSRF check below. Still suppress cross-origin referrers.
      consent.headers.set('Referrer-Policy', 'same-origin');
      return new Response(consentPage(details, consent.handle), { headers: consent.headers });
    }
    if (url.pathname === '/authorize' && request.method === 'POST') {
      if (request.headers.get('Origin') !== env.PUBLIC_ORIGIN) return new Response('Invalid origin', { status: 403 });
      const form = await request.formData();
      const handle = String(form.get('handle') ?? '');
      if (form.get('decision') !== 'approve') {
        const denied = await oauth.denyConsent(request, handle);
        return new Response(null, { status: 302, headers: denied.headers });
      }
      const approved = await oauth.approveConsent(request, handle, { scope: ['blog:manage', 'offline_access'] });
      const verifier = crypto.randomUUID() + crypto.randomUUID();
      const challenge = base64url(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
      const { state, headers } = await oauth.beginUpstream(approved.request, { data: { verifier }, headers: approved.headers });
      const github = new URL('https://github.com/login/oauth/authorize');
      github.search = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, redirect_uri: `${env.PUBLIC_ORIGIN}/callback`,
        state, code_challenge: challenge, code_challenge_method: 'S256' }).toString();
      // No repository scope: this OAuth app identifies the owner only.
      headers.set('Location', github.toString());
      return new Response(null, { status: 302, headers });
    }
    if (url.pathname === '/callback' && request.method === 'GET') {
      const { request: original, data, headers } = await oauth.finishUpstream<{ verifier: string }>(request);
      if (url.searchParams.has('error')) {
        headers.set('Location', authorizationErrorRedirect(original, 'access_denied'));
        return new Response(null, { status: 302, headers });
      }
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing GitHub code', { status: 400, headers });
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code,
          redirect_uri: `${env.PUBLIC_ORIGIN}/callback`, code_verifier: data.verifier }), signal: AbortSignal.timeout(15_000),
      });
      const token = await response.json() as { access_token?: string };
      if (!response.ok || !token.access_token) throw new BlogError('github_login', 'GitHub sign-in failed; restart authorization');
      const userResponse = await fetch('https://api.github.com/user', { headers: {
        Authorization: `Bearer ${token.access_token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'lins-blog-mcp',
      }, signal: AbortSignal.timeout(15_000) });
      if (!userResponse.ok) throw new BlogError('github_login', 'Could not verify GitHub identity');
      const user = await userResponse.json() as { id: number };
      if (String(user.id) !== env.ALLOWED_GITHUB_USER_ID) return new Response('This blog is restricted to its owner.', { status: 403, headers });
      const { redirectTo } = await oauth.completeAuthorization({ request: original, userId: String(user.id),
        metadata: {}, scope: original.scope, props: { userId: String(user.id) } });
      headers.set('Location', redirectTo);
      return new Response(null, { status: 302, headers });
    }
    return new Response('Not found', { status: 404 });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      if (url.pathname === '/authorize' && request.method === 'GET' && error.redirectTo) return Response.redirect(error.redirectTo, 302);
      return new Response('Authorization expired or is invalid. Start again from your MCP client.', { status: 400 });
    }
    if (error instanceof BlogError) return new Response(error.message, { status: 502 });
    return new Response('Authorization is temporarily unavailable. Try again later.', { status: 503 });
  }
}

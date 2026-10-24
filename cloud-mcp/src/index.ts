import { OAuthProvider, insufficientScope, type OAuthResourceContext } from '@cloudflare/workers-oauth-provider';
import { createMcpHandler } from 'agents/mcp/server';
import { authHandler } from './auth';
import { Blog, type ArticleIndex } from './blog';
import { GitHubRepository } from './github';
import { createServer } from './mcp';
import { BlogError, type Env } from './types';

export async function loadIndex(env: Env): Promise<ArticleIndex> {
  const response = await fetch(`${env.SITE_URL.replace(/\/$/, '')}/mcp-index.json`, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new BlogError('index_unavailable', 'Article index is not available yet. Deploy the Pages index first; read_post still works.');
  const data = await response.json() as ArticleIndex;
  if (data.schema_version !== 1 || !/^[a-f0-9]{40}$/.test(data.commit) || !Array.isArray(data.posts)) {
    throw new BlogError('index_invalid', 'Article index has an unsupported format');
  }
  return data;
}

export function provider(env: Env) {
  return new OAuthProvider<Env>({
    apiRoute: '/mcp', authorizeEndpoint: '/authorize', tokenEndpoint: '/token', clientRegistrationEndpoint: '/register',
    clientIdMetadataDocumentEnabled: true, scopesSupported: ['blog:manage', 'offline_access'], requiredScopes: ['blog:manage'],
    accessTokenTTL: 3600, refreshTokenTTL: 30 * 86400,
    resourceMetadata: { resource: `${env.PUBLIC_ORIGIN}/mcp`, authorization_servers: [env.PUBLIC_ORIGIN] },
    defaultHandler: { fetch: authHandler },
    apiHandler: {
      async fetch(request, bindings, context) {
        const ctx = context as OAuthResourceContext<{ userId: string }>;
        if (ctx.props?.userId !== bindings.ALLOWED_GITHUB_USER_ID) return new Response('Forbidden', { status: 403 });
        if (!ctx.auth.scope.includes('blog:manage')) return insufficientScope(ctx.auth, ['blog:manage']);
        const repository = new GitHubRepository(bindings);
        const blog = new Blog(repository, bindings, ctx.props.userId, () => loadIndex(bindings));
        const handler = createMcpHandler(() => createServer(blog), {
          route: '/mcp', allowedHostnames: [new URL(bindings.PUBLIC_ORIGIN).hostname],
          maxRequestBodySize: 8 * 1024 * 1024,
          allowedOriginHostnames: [new URL(bindings.PUBLIC_ORIGIN).hostname, 'chatgpt.com'], corsOptions: false,
        });
        return handler(request, bindings, ctx);
      },
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (!env.PUBLIC_ORIGIN || env.PUBLIC_ORIGIN.includes('REPLACE_') || !/^\d+$/.test(env.ALLOWED_GITHUB_USER_ID ?? '')) {
      return new Response('Configure PUBLIC_ORIGIN and ALLOWED_GITHUB_USER_ID before serving MCP.', { status: 503 });
    }
    if (new URL(request.url).origin !== env.PUBLIC_ORIGIN) return new Response('Invalid host', { status: 403 });
    // Enforce a bounded body even when Content-Length is absent.
    if (request.body) {
      const reader = request.body.getReader();
      const chunks: Uint8Array[] = [];
      let size = 0;
      const limit = new URL(request.url).pathname === '/mcp' ? 8 * 1024 * 1024 : 64 * 1024;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > limit) { await reader.cancel(); return new Response('Request too large', { status: 413 }); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      request = new Request(request, { body: bytes });
    }
    try { return await provider(env).fetch(request, env, ctx); }
    catch { return new Response('Service temporarily unavailable', { status: 503 }); }
  },
} satisfies ExportedHandler<Env>;

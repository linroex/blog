import { createMcpHandler } from 'agents/mcp/server';
import { configured, verifyAccess } from './auth';
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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (!configured(env)) return new Response('Access configuration required', { status: 503 });
    if (new URL(request.url).origin !== env.PUBLIC_ORIGIN) return new Response('Invalid host', { status: 403 });
    let userId: string;
    try { userId = await verifyAccess(request, env, ctx); }
    catch {
      // Access owns OAuth discovery/challenges at the edge. Never issue tokens
      // or fall back to a bearer token or a forwarded email header.
      return new Response('Access authentication required', { status: 403, headers: { 'Cache-Control': 'no-store' } });
    }
    const url = new URL(request.url);
    if (url.pathname === '/health' && request.method === 'GET') return Response.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } });
    if (url.pathname !== '/mcp') return new Response('Not found', { status: 404 });
    // Enforce a bounded body even when Content-Length is absent.
    if (request.body) {
      const reader = request.body.getReader();
      const chunks: Uint8Array[] = [];
      let size = 0;
      const limit = 8 * 1024 * 1024;
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
    try {
      const repository = new GitHubRepository(env);
      const blog = new Blog(repository, env, userId, () => loadIndex(env));
      const handler = createMcpHandler(() => createServer(blog), {
        route: '/mcp', allowedHostnames: [url.hostname], maxRequestBodySize: 8 * 1024 * 1024,
        allowedOriginHostnames: [url.hostname, 'chatgpt.com'], corsOptions: false,
      });
      return await handler(request, env, ctx);
    }
    catch { return new Response('Service temporarily unavailable', { status: 503 }); }
  },
} satisfies ExportedHandler<Env>;

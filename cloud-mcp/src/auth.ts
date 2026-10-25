import { createRemoteJWKSet, jwtVerify, type RemoteJWKSetOptions } from 'jose';
import type { Env } from './types';

export function configured(env: Env): boolean {
  try {
    const origin = new URL(env.PUBLIC_ORIGIN);
    return origin.protocol === 'https:' && origin.origin === env.PUBLIC_ORIGIN
      && /^\d+$/.test(env.ALLOWED_GITHUB_USER_ID ?? '')
      && /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.cloudflareaccess\.com$/.test(env.ACCESS_TEAM_DOMAIN ?? '')
      && /^[a-f0-9]{64}$/.test(env.ACCESS_AUD ?? '')
      && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.ALLOWED_ACCESS_EMAIL ?? '');
  } catch { return false; }
}

// Reuse jose's resolver across requests for JWKS caching and key rotation.
// Only deployment configuration selects the issuer and key endpoint.
export function createAccessVerifier(options: RemoteJWKSetOptions = {}) {
  let cached: { issuer: string; keys: ReturnType<typeof createRemoteJWKSet> } | undefined;
  return async (request: Request, env: Env, ctx: ExecutionContext): Promise<string> => {
    if (!configured(env)) throw new Error('Access configuration is incomplete');
    if (!ctx.access || ctx.access.aud !== env.ACCESS_AUD) throw new Error('Access context required');
    const assertion = request.headers.get('Cf-Access-Jwt-Assertion');
    if (!assertion || assertion.length > 16_384) throw new Error('Access assertion required');
    const identity = await ctx.access.getIdentity();
    const email = env.ALLOWED_ACCESS_EMAIL.toLowerCase();
    if (typeof identity?.email !== 'string' || identity.email.toLowerCase() !== email) throw new Error('Access identity denied');

    const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
    if (cached?.issuer !== issuer) {
      cached = { issuer, keys: createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`), {
        timeoutDuration: 5_000, cooldownDuration: 30_000, cacheMaxAge: 600_000, ...options,
      }) };
    }
    const { payload } = await jwtVerify(assertion, cached.keys, {
      algorithms: ['RS256'], issuer, audience: env.ACCESS_AUD,
      requiredClaims: ['iss', 'aud', 'exp', 'iat', 'sub', 'email'], clockTolerance: 0,
    });
    if (typeof payload.email !== 'string' || payload.email.toLowerCase() !== email
      || payload.email.toLowerCase() !== identity.email.toLowerCase()
      || typeof payload.sub !== 'string' || !payload.sub
      || typeof payload.iat !== 'number' || !Number.isFinite(payload.iat)
      || typeof payload.exp !== 'number' || !Number.isFinite(payload.exp)
      || payload.iat > Math.floor(Date.now() / 1000) || payload.exp <= payload.iat
      || payload.type !== 'app') throw new Error('Access claims denied');

    // Preserve ownership of existing drafts, candidates and confirmations.
    return env.ALLOWED_GITHUB_USER_ID;
  };
}

export const verifyAccess = createAccessVerifier();

import { exportJWK, generateKeyPair, SignJWT, type JWTPayload } from 'jose';
import { vi } from 'vitest';
import { env as baseEnv } from './helpers';

let serial = 0;
export async function accessHarness() {
  const env = { ...baseEnv, ACCESS_TEAM_DOMAIN: `blog-test-${++serial}.cloudflareaccess.com` };
  const key = await generateKeyPair('RS256', { extractable: true });
  const jwk = { ...await exportJWK(key.publicKey), kid: 'key-1', alg: 'RS256', use: 'sig' };
  const fetcher = vi.fn(async (_url: string, _options: unknown) => Response.json({ keys: [jwk] }));
  const ctx = {
    access: { aud: env.ACCESS_AUD, getIdentity: vi.fn(async () => ({ email: env.ALLOWED_ACCESS_EMAIL })) },
    waitUntil() {}, passThroughOnException() {},
  } as unknown as ExecutionContext;
  const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
  const claims = (): JWTPayload => ({
    iss: issuer, aud: [env.ACCESS_AUD], sub: 'access-owner', email: env.ALLOWED_ACCESS_EMAIL, type: 'app',
    iat: Math.floor(Date.now() / 1000) - 5, exp: Math.floor(Date.now() / 1000) + 900,
  });
  const sign = (payload = claims(), signingKey = key.privateKey, header = { alg: 'RS256', kid: 'key-1' }) =>
    new SignJWT(payload).setProtectedHeader(header).sign(signingKey);
  const request = (token: string) => new Request(`${env.PUBLIC_ORIGIN}/mcp`, { headers: { 'Cf-Access-Jwt-Assertion': token } });
  return { env, key, jwk, fetcher, ctx, issuer, claims, sign, request };
}

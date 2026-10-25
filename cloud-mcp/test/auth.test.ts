import { afterEach, expect, it, vi } from 'vitest';
import { customFetch, exportJWK, generateKeyPair } from 'jose';
import { configured, createAccessVerifier } from '../src/auth';
import { accessHarness } from './access-helpers';
import { env } from './helpers';

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it('requires the platform audience and identity before fetching trusted keys', async () => {
  const h = await accessHarness();
  const verify = createAccessVerifier({ [customFetch]: h.fetcher });
  const req = h.request(await h.sign());
  for (const access of [undefined, { aud: 'wrong' }, { aud: h.env.ACCESS_AUD, getIdentity: async () => undefined },
    { aud: h.env.ACCESS_AUD, getIdentity: async () => ({ email: 'other@example.com' }) },
    { aud: h.env.ACCESS_AUD, getIdentity: async () => { throw new Error('Unavailable'); } }]) {
    await expect(verify(req, h.env, { ...h.ctx, access } as ExecutionContext)).rejects.toThrow();
  }
  await expect(verify(new Request(req.url), h.env, h.ctx)).rejects.toThrow();
  expect(h.fetcher).not.toHaveBeenCalled();
});

it('accepts only a verified owner and preserves the existing numeric user ID', async () => {
  const h = await accessHarness();
  const verify = createAccessVerifier({ [customFetch]: h.fetcher });
  expect(await verify(h.request(await h.sign()), h.env, h.ctx)).toBe('123');
  expect(await verify(h.request(await h.sign({ ...h.claims(), email: 'LINROEX@coder.tw' })), h.env, h.ctx)).toBe('123');
  expect(h.fetcher).toHaveBeenCalledTimes(1);
  expect(h.fetcher.mock.calls[0][0]).toBe(`${h.issuer}/cdn-cgi/access/certs`);
});

it.each([
  ['issuer', { iss: 'https://evil.example' }], ['audience', { aud: 'wrong' }],
  ['expiry', { exp: 1 }], ['missing expiry', { exp: undefined }], ['missing issued-at', { iat: undefined }],
  ['future issued-at', { iat: 9e9 }], ['future not-before', { nbf: 9e9 }],
  ['invalid lifetime', { iat: 1, exp: 1 }], ['wrong email', { email: 'other@example.com' }],
  ['missing email', { email: undefined }], ['missing subject', { sub: undefined }],
  ['service identity', { type: 'service' }], ['non-numeric expiry', { exp: 'never' }],
])('rejects %s', async (_name, patch) => {
  const h = await accessHarness();
  const verify = createAccessVerifier({ [customFetch]: h.fetcher });
  const token = await h.sign({ ...h.claims(), ...patch } as ReturnType<typeof h.claims>);
  await expect(verify(h.request(token), h.env, h.ctx)).rejects.toThrow();
});

it('rejects forged signatures, none/HS256 algorithms and ignores request-selected keys', async () => {
  const h = await accessHarness();
  const verify = createAccessVerifier({ [customFetch]: h.fetcher });
  const attacker = await generateKeyPair('RS256');
  const token = await h.sign(h.claims(), attacker.privateKey);
  await expect(verify(h.request(token), h.env, h.ctx)).rejects.toThrow();
  const valid = await h.sign(h.claims(), h.key.privateKey, { alg: 'RS256', kid: 'key-1',
    jku: 'https://evil.example/keys', x5u: 'https://evil.example/cert', jwk: await exportJWK(attacker.publicKey) } as { alg: string; kid: string });
  expect(await verify(h.request(valid), h.env, h.ctx)).toBe('123');
  for (const alg of ['none', 'HS256']) {
    const fake = `${Buffer.from(JSON.stringify({ alg })).toString('base64url')}.${Buffer.from(JSON.stringify(h.claims())).toString('base64url')}.AAAA`;
    await expect(verify(h.request(fake), h.env, h.ctx)).rejects.toThrow();
  }
  expect(h.fetcher).toHaveBeenCalledTimes(1);
  expect(h.fetcher.mock.calls[0][0]).toBe(`${h.issuer}/cdn-cgi/access/certs`);
});

it('refreshes cached JWKS on rotation after the cooldown', async () => {
  const h = await accessHarness();
  let now = Date.now();
  vi.spyOn(Date, 'now').mockImplementation(() => now);
  const verify = createAccessVerifier({ [customFetch]: h.fetcher });
  await verify(h.request(await h.sign()), h.env, h.ctx);
  const next = await generateKeyPair('RS256');
  const jwk = { ...await exportJWK(next.publicKey), kid: 'key-2', alg: 'RS256', use: 'sig' };
  h.fetcher.mockImplementation(async () => Response.json({ keys: [h.jwk, jwk] }));
  const rotated = await h.sign(h.claims(), next.privateKey, { alg: 'RS256', kid: 'key-2' });
  await expect(verify(h.request(rotated), h.env, h.ctx)).rejects.toThrow();
  now += 30_001;
  expect(await verify(h.request(rotated), h.env, h.ctx)).toBe('123');
  expect(h.fetcher).toHaveBeenCalledTimes(2);
});

it('fails closed on unavailable/malformed JWKS and does not use an expired cache', async () => {
  const h = await accessHarness();
  let now = Date.now();
  vi.spyOn(Date, 'now').mockImplementation(() => now);
  const verify = createAccessVerifier({ [customFetch]: h.fetcher });
  await verify(h.request(await h.sign()), h.env, h.ctx);
  h.fetcher.mockImplementation(async () => { throw new Error('Offline'); });
  // Cached public keys remain usable while fresh; no token validation is skipped.
  expect(await verify(h.request(await h.sign()), h.env, h.ctx)).toBe('123');
  now += 600_001;
  await expect(verify(h.request(await h.sign()), h.env, h.ctx)).rejects.toThrow();
  for (const response of [new Response(null, { status: 503 }), Response.json({ keys: [] }), Response.json({ invalid: true }),
    new Response(null, { status: 302, headers: { Location: 'https://evil.example/keys' } })]) {
    const cold = createAccessVerifier({ [customFetch]: async () => response });
    await expect(cold(h.request(await h.sign()), h.env, h.ctx)).rejects.toThrow();
  }
});

it('rejects invalid deployment configuration without accepting arbitrary JWKS domains', () => {
  expect(configured(env)).toBe(true);
  for (const ACCESS_TEAM_DOMAIN of ['https://test.cloudflareaccess.com', 'test.cloudflareaccess.com/keys',
    'test.cloudflareaccess.com.evil.example', 'test.cloudflareaccess.com@evil.example', 'REPLACE_TEAM.cloudflareaccess.com']) {
    expect(configured({ ...env, ACCESS_TEAM_DOMAIN })).toBe(false);
  }
  expect(configured({ ...env, ACCESS_AUD: '' })).toBe(false);
  expect(configured({ ...env, ALLOWED_ACCESS_EMAIL: '' })).toBe(false);
});

it('fails closed when the trusted JWKS fetch times out', async () => {
  const h = await accessHarness();
  const verify = createAccessVerifier({ timeoutDuration: 10, [customFetch]: async (_url, { signal }) =>
    new Promise<Response>((_resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true })) });
  await expect(verify(h.request(await h.sign()), h.env, h.ctx)).rejects.toMatchObject({ code: 'ERR_JWKS_TIMEOUT' });
});

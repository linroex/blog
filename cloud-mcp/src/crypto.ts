import { BlogError } from './types';

const enc = new TextEncoder();
export function base64url(bytes: Uint8Array): string {
  let text = '';
  for (let i = 0; i < bytes.length; i += 8192) text += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(text).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
export function unbase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
}
export async function sha256(text: string): Promise<string> {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(text))), b => b.toString(16).padStart(2, '0')).join('');
}
export async function sign<T>(secret: string, purpose: string, payload: T): Promise<string> {
  if (secret.length < 32) throw new BlogError('configuration', 'CONFIRMATION_SECRET must have at least 32 characters');
  const body = base64url(enc.encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(`${purpose}.${body}`));
  return `${body}.${base64url(new Uint8Array(signature))}`;
}
export async function verify<T>(secret: string, purpose: string, token: string): Promise<T> {
  try {
    const [body, signature, extra] = token.split('.');
    if (!body || !signature || extra) throw new Error();
    const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    if (!await crypto.subtle.verify('HMAC', key, unbase64(signature), enc.encode(`${purpose}.${body}`))) throw new Error();
    return JSON.parse(new TextDecoder().decode(unbase64(body))) as T;
  } catch { throw new BlogError('invalid_confirmation', 'Invalid or tampered operation/confirmation token'); }
}

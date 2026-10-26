import { BlogError } from './types';
import { uploadDownloadDiagnostic } from './upload-diagnostics';
import { isIP } from 'node:net';

export interface ChatGPTFile {
  download_url: string; file_id: string; mime_type?: string; file_name?: string;
}
function publicHostname(hostname: string): boolean {
  const host = hostname.replace(/\.$/, '').toLowerCase();
  // URL canonicalization expands numeric/hex/octal IPv4 spellings. Reject all
  // literal IPs (Workers fetch requires hostnames), including bracketed IPv6.
  if (isIP(host.replace(/^\[|\]$/g, '')) || host.length > 253 || !host.includes('.')) return false;
  if (!host.split('.').every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return false;
  return !['localhost', 'local', 'internal', 'lan', 'home', 'corp', 'home.arpa', 'onion']
    .some(suffix => host === suffix || host.endsWith(`.${suffix}`));
}
function downloadURL(value: string, stage: 'initial' | 'redirect'): URL {
  let url: URL;
  try { url = new URL(value); } catch {
    uploadDownloadDiagnostic(stage, value, { reason: 'malformed' });
    throw new BlogError('invalid_file', 'ChatGPT must supply a downloadable HTTPS file reference');
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.hash || (url.port && url.port !== '443') ||
      !publicHostname(url.hostname)) {
    uploadDownloadDiagnostic(stage, value, { reason: 'policy' });
    throw new BlogError('invalid_file', 'File downloads require a public HTTPS hostname on port 443 without credentials or fragments; local names and IP literals are not accepted');
  }
  uploadDownloadDiagnostic(stage, value);
  return url;
}
/**
 * Never forward MCP, GitHub or R2 credentials to an attachment download.
 * Host syntax checks alone cannot validate DNS or prevent rebinding. Production
 * must use Workers global fetch with global_fetch_strictly_public, not a private
 * service/VPC binding or proxy. The runtime enforces public-network access when
 * it resolves/connects, including hosts whose DNS points to private addresses.
 */
export async function downloadChatGPTFile(file: ChatGPTFile, maximum: number, fetcher: typeof fetch = fetch): Promise<Uint8Array> {
  let url = downloadURL(file.download_url, 'initial');
  const signal = AbortSignal.timeout(60_000);
  try {
    for (let redirects = 0; redirects <= 2; redirects++) {
      const response = await fetcher(url, { method: 'GET', headers: { Accept: 'image/*, application/octet-stream' }, redirect: 'manual', signal });
      uploadDownloadDiagnostic('response', url.href, { http_status: response.status });
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        await response.body?.cancel();
        const location = response.headers.get('location');
        if (!location || redirects === 2) throw new BlogError('file_download_failed', 'ChatGPT file download redirected too many times; select the attachment again');
        url = downloadURL(new URL(location, url).href, 'redirect');
        continue;
      }
      if (!response.ok) {
        await response.body?.cancel();
        if ([401, 403, 404, 410].includes(response.status)) throw new BlogError('file_expired', 'ChatGPT file reference is expired or unavailable; select the attachment again and retry');
        throw new BlogError('file_download_failed', `ChatGPT file download returned HTTP ${response.status}; retry with a fresh file reference`);
      }
      const declared = response.headers.get('content-length');
      if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > maximum)) {
        await response.body?.cancel();
        throw new BlogError('invalid_image', `Original image must fit ${maximum} bytes`);
      }
      if (!response.body) throw new BlogError('invalid_image', 'ChatGPT file download is empty');
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let length = 0;
      while (true) {
        const next = await reader.read();
        if (next.done) break;
        length += next.value.length;
        if (length > maximum) { await reader.cancel(); throw new BlogError('invalid_image', `Original image must fit ${maximum} bytes`); }
        chunks.push(next.value);
      }
      if (!length) throw new BlogError('invalid_image', 'ChatGPT file download is empty');
      if (declared !== null && !response.headers.has('content-encoding') && length !== Number(declared)) throw new BlogError('file_download_failed', 'ChatGPT file download was truncated; retry with a fresh file reference');
      const bytes = new Uint8Array(length);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      uploadDownloadDiagnostic('complete', url.href, { bytes: length });
      return bytes;
    }
  } catch (error) {
    if (error instanceof BlogError) throw error;
    uploadDownloadDiagnostic('failed', url.href, { reason: 'network_or_timeout' });
    // Fetch errors can embed a signed URL. Never return or log them.
    throw new BlogError('file_download_failed', 'ChatGPT file download failed or timed out; select the attachment again and retry');
  }
  throw new BlogError('file_download_failed', 'ChatGPT file download did not complete');
}

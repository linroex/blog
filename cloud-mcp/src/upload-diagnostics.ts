import { AsyncLocalStorage } from 'node:async_hooks';

const requests = new AsyncLocalStorage<{ id: string }>();
const fileFields = ['download_url', 'file_id', 'mime_type', 'file_name'] as const;
function valueType(value: unknown): string {
  return value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
}
function record(event: string, details: Record<string, unknown>) {
  const request = requests.getStore();
  if (request) console.log(JSON.stringify({ event, diagnostic_id: request.id, ...details }));
}
// Project URLs explicitly: never serialize a URL, path, query, fragment or userinfo.
function destination(value: unknown): Record<string, unknown> {
  if (typeof value !== 'string') return { url_type: valueType(value) };
  try {
    const url = new URL(value);
    const protocols = ['https:', 'http:', 'file:', 'sandbox:', 'chat_upload:', 'data:', 'blob:'];
    return {
      protocol: protocols.includes(url.protocol) ? url.protocol : 'other',
      ...(['https:', 'http:'].includes(url.protocol) ? { hostname: url.hostname.slice(0, 253) } : {}),
      has_credentials: !!(url.username || url.password), has_fragment: !!url.hash,
      nonstandard_port: !!url.port && url.port !== '443',
    };
  } catch { return { url_parseable: false }; }
}

/** Runs after authentication and before SDK validation, so malformed file inputs are visible too. */
export async function withUploadDiagnostics(body: Uint8Array | undefined, run: () => Promise<Response>): Promise<Response> {
  let input: unknown;
  try { input = body && JSON.parse(new TextDecoder().decode(body)); } catch { return run(); }
  const rpc = input as { method?: unknown; params?: { name?: unknown; arguments?: { file?: unknown } } } | null;
  if (rpc?.method !== 'tools/call' || rpc.params?.name !== 'upload_image') return run();
  const file = rpc.params.arguments?.file;
  const object = file !== null && typeof file === 'object' && !Array.isArray(file) ? file as Record<string, unknown> : undefined;
  return requests.run({ id: crypto.randomUUID() }, async () => {
    record('upload_image.input', {
      file_type: valueType(file),
      fields: Object.fromEntries(fileFields.filter(key => object && Object.hasOwn(object, key)).map(key => [key, valueType(object![key])])),
      unknown_field_count: object ? Object.keys(object).filter(key => !fileFields.includes(key as typeof fileFields[number])).length : 0,
      ...destination(object?.download_url),
    });
    try {
      const response = await run();
      record('upload_image.response', { http_status: response.status });
      return response;
    } catch (error) {
      record('upload_image.response', { failed: true });
      throw error;
    }
  });
}

export function uploadDownloadDiagnostic(stage: 'initial' | 'redirect' | 'response' | 'complete' | 'failed', value: unknown,
  details: { reason?: 'malformed' | 'policy' | 'network_or_timeout'; http_status?: number; bytes?: number } = {}) {
  record('upload_image.download', { stage, ...destination(value), ...details });
}

export function uploadResultDiagnostic(errorCode?: string) {
  record('upload_image.result', { success: !errorCode, ...(errorCode ? { error_code: errorCode } : {}) });
}

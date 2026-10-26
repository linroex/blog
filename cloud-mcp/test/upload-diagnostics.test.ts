import { afterEach, expect, it, vi } from 'vitest';
import { downloadChatGPTFile } from '../src/chatgpt-files';
import { uploadResultDiagnostic, withUploadDiagnostics } from '../src/upload-diagnostics';

afterEach(() => vi.restoreAllMocks());
const body = (file: unknown) => new TextEncoder().encode(JSON.stringify({ jsonrpc: '2.0', id: 1,
  method: 'tools/call', params: { name: 'upload_image', arguments: { file } } }));
function capture() {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {});
  return { log, events: () => log.mock.calls.map(([line]) => JSON.parse(line)) };
}
it('records input types before schema validation without logging string references or arbitrary field names', async () => {
  const { events, log } = capture();
  await withUploadDiagnostics(body('chat_upload://secret-reference'), async () => new Response(null, { status: 400 }));
  expect(events()[0]).toMatchObject({ event: 'upload_image.input', file_type: 'string', fields: {} });
  await withUploadDiagnostics(body({ file_id: 'secret-id', 'secret-key': 'secret-value', download_url: 123 }), async () => new Response());
  expect(events()[2]).toMatchObject({ file_type: 'object', fields: { file_id: 'string', download_url: 'number' }, unknown_field_count: 1, url_type: 'number' });
  expect(JSON.stringify(log.mock.calls)).not.toMatch(/secret/);
});
it('distinguishes an initial URL policy rejection and preserves only its scheme and host', async () => {
  const { events, log } = capture();
  const file = { file_id: 'private-id', file_name: 'private-name', download_url: 'https://user:pass@other.example/private-path?sig=private-query#private-fragment' };
  await expect(withUploadDiagnostics(body(file), async () => {
    await downloadChatGPTFile(file, 1000, vi.fn());
    return new Response();
  })).rejects.toMatchObject({ code: 'invalid_file' });
  expect(events()).toContainEqual(expect.objectContaining({ event: 'upload_image.download', stage: 'initial',
    hostname: 'other.example', protocol: 'https:', reason: 'policy', has_credentials: true, has_fragment: true }));
  expect(JSON.stringify(log.mock.calls)).not.toMatch(/private-|user:pass|sig=/);
});
it('identifies a rejected redirect rather than blaming the original trusted URL', async () => {
  const { events, log } = capture();
  const file = { file_id: 'private-id', download_url: 'https://files.oaiusercontent.com/private-original?sig=original-secret' };
  await withUploadDiagnostics(body(file), async () => {
    try { await downloadChatGPTFile(file, 1000, async () => new Response(null, { status: 302,
      headers: { Location: 'https://redirect.example/private-target?sig=redirect-secret' } })); }
    catch { uploadResultDiagnostic('invalid_file'); }
    return new Response();
  });
  expect(events()).toContainEqual(expect.objectContaining({ stage: 'redirect', hostname: 'redirect.example', reason: 'policy' }));
  expect(events()).toContainEqual(expect.objectContaining({ event: 'upload_image.result', success: false, error_code: 'invalid_file' }));
  expect(new Set(events().map(event => event.diagnostic_id)).size).toBe(1);
  expect(JSON.stringify(log.mock.calls)).not.toMatch(/private-|secret|sig=/);
});
it('never logs signed URLs embedded in network exceptions', async () => {
  const { events, log } = capture();
  const file = { file_id: 'private-id', download_url: 'https://files.oaiusercontent.com/private-path?sig=private-query' };
  await expect(withUploadDiagnostics(body(file), async () => {
    await downloadChatGPTFile(file, 1000, async () => { throw new Error(file.download_url); });
    return new Response();
  })).rejects.toMatchObject({ code: 'file_download_failed' });
  expect(events()).toContainEqual(expect.objectContaining({ stage: 'failed', reason: 'network_or_timeout' }));
  expect(JSON.stringify(log.mock.calls)).not.toMatch(/private-|sig=/);
});
it('keeps concurrent upload diagnostic IDs separate and does not log other MCP traffic', async () => {
  const { events, log } = capture();
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  const a = withUploadDiagnostics(body({ download_url: 'sandbox:/private-image' }), async () => {
    await gate; uploadResultDiagnostic('invalid_file'); return new Response();
  });
  await withUploadDiagnostics(body({ download_url: 'https://files.oaiusercontent.com/b' }), async () => {
    uploadResultDiagnostic(); release(); return new Response();
  });
  await a;
  const inputEvents = events().filter(event => event.event === 'upload_image.input');
  expect(inputEvents[0].diagnostic_id).not.toBe(inputEvents[1].diagnostic_id);
  expect(events().find(event => event.error_code === 'invalid_file').diagnostic_id).toBe(inputEvents[0].diagnostic_id);
  expect(events().find(event => event.success === true).diagnostic_id).toBe(inputEvents[1].diagnostic_id);
  const count = log.mock.calls.length;
  for (const bytes of [undefined, new TextEncoder().encode('{'), new TextEncoder().encode('{"method":"tools/list"}')]) {
    await withUploadDiagnostics(bytes, async () => { uploadResultDiagnostic(); return new Response(); });
  }
  expect(log.mock.calls).toHaveLength(count);
});

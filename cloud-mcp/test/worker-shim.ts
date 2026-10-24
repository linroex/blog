// Node-only shim for the base class. OAuth cryptography, validation and routing
// still run from the real library; production uses Cloudflare's built-in class.
export class WorkerEntrypoint {
  constructor(public ctx: unknown, public env: unknown) {}
}

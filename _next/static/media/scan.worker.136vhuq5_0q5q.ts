import { runScan, transferables, type ScanReply, type ScanRequest } from './scanJob';

// Web worker for the scanner page: scans off the main thread and hands the arrays back without copying.
const scope = self as unknown as { onmessage: ((e: MessageEvent<ScanRequest>) => void) | null; postMessage: (reply: ScanReply, transfer: Transferable[]) => void };
scope.onmessage = e => { const reply = runScan(e.data); scope.postMessage(reply, transferables(reply)); };

/**
 * Real-time Admin-to-Public Website Synchronization ("Nuclear Option")
 * Broadcasts changes made in the Admin CMS to all open public website tabs/windows.
 */

export function broadcastAdminUpdate(section = 'all') {
  if (typeof window !== 'undefined') {
    try {
      const channel = new BroadcastChannel('vannam_store_sync');
      channel.postMessage({ type: 'STORE_UPDATED', section, timestamp: Date.now() });
      channel.close();
    } catch {}

    try {
      localStorage.setItem('vannam_sync_trigger', String(Date.now()));
    } catch {}
  }
}

import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET() {
  const store = getStore();
  const logs = store.auditLogs || [];
  return NextResponse.json({ success: true, logs });
}

export async function DELETE() {
  const store = getStore();
  store.auditLogs = [];
  saveStore(store, {
    action: 'Cleared Audit Trail',
    userId: 'usr-1',
    userName: 'Super Admin',
    resource: 'Audit Logs',
    details: 'Cleared audit activity logs history'
  });
  return NextResponse.json({ success: true, message: 'Audit logs cleared' });
}

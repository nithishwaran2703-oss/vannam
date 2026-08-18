'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Trash2, Clock, User, Filter, RefreshCw, AlertTriangle } from 'lucide-react';
import { useAdminToast } from '../layout';

export default function LogsManager() {
  const { showToast } = useAdminToast();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterResource, setFilterResource] = useState('all');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/logs');
      const data = await res.json();
      setLogs(data.logs || []);
    } catch {
      showToast('Failed to load audit logs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleClearLogs = async () => {
    try {
      await fetch('/api/admin/logs', { method: 'DELETE' });
      showToast('Audit trail history cleared');
      setDeleteConfirmOpen(false);
      fetchLogs();
    } catch {
      showToast('Failed to clear logs', 'error');
    }
  };

  const resources = ['All', 'Announcements', 'Programs', 'Faculty', 'Gallery', 'Enquiries', 'Admissions', 'Settings', 'Auth'];

  const filtered = logs.filter(
    (l) => filterResource === 'all' || (l.resource || '').toLowerCase() === filterResource.toLowerCase()
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-[#00A8E8]" />
            <span>Security & Audit Activity Trail</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Immutable activity log recording administrator changes, content publishing events, and lead status updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchLogs}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setDeleteConfirmOpen(true)}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        {resources.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setFilterResource(r.toLowerCase())}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterResource === r.toLowerCase()
                ? 'bg-[#0F2963] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Logs Stream */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-xs text-[#0F2963] uppercase tracking-wider">
            Audit Activity Stream ({filtered.length})
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">Logged in UTC</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading activity logs...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No audit events recorded for this filter.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((log) => (
              <div key={log.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-[#0F2963]">{log.action}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#E8EEFB] text-[#0F2963]">
                      {log.resource}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{log.details}</p>
                </div>

                <div className="text-right shrink-0 space-y-0.5 text-[11px] text-slate-400">
                  <div className="font-semibold text-slate-700 flex items-center justify-end gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{log.userName || 'Super Admin'}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear Confirmation */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-slate-800 text-base">Clear Audit Logs?</h3>
              <p className="text-xs text-slate-500">
                This will wipe the audit trail history. This action cannot be reversed.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearLogs}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Confirm Clear
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

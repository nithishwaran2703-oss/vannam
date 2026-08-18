'use client';

import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Calendar,
  Phone,
  Mail,
  Trash2,
  ChevronRight,
  Send,
  X,
  AlertTriangle,
  FileText,
  Sparkles,
  Baby
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function AdmissionsManager() {
  const { showToast } = useAdminToast();
  const [admissions, setAdmissions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [updatingNote, setUpdatingNote] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/admissions?status=${statusFilter}&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setAdmissions(data.admissions || []);
      setStats(data.stats || {});
    } catch {
      showToast('Failed to load admissions pipeline', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, [statusFilter]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/admissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (!res.ok) throw new Error('Status update failed');

      showToast(`Application status moved to ${newStatus.replace('_', ' ')}`);
      fetchAdmissions();
      if (selectedAdmission && selectedAdmission.id === id) {
        setSelectedAdmission({ ...selectedAdmission, status: newStatus });
      }
    } catch {
      showToast('Error updating status', 'error');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedAdmission) return;

    setUpdatingNote(true);
    try {
      const res = await fetch('/api/admin/admissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedAdmission.id,
          note: newNote.trim()
        })
      });

      if (!res.ok) throw new Error('Note failed');

      showToast('Admissions note logged!');
      setNewNote('');
      fetchAdmissions();

      const updatedNotes = [
        { author: 'Staff Note', text: newNote.trim(), date: new Date().toISOString() },
        ...(selectedAdmission.notes || [])
      ];
      setSelectedAdmission({ ...selectedAdmission, notes: updatedNotes });
    } catch {
      showToast('Failed to log note', 'error');
    } finally {
      setUpdatingNote(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/admissions?id=${id}`, { method: 'DELETE' });
      showToast('Application record deleted');
      setDeleteConfirmId(null);
      if (selectedAdmission?.id === id) setSelectedAdmission(null);
      fetchAdmissions();
    } catch {
      showToast('Failed to delete application', 'error');
    }
  };

  const statusPills = [
    { label: 'All', value: 'all', count: stats.total || 0 },
    { label: 'New', value: 'new', count: stats.new || 0, color: 'bg-rose-100 text-rose-700' },
    { label: 'Under Review', value: 'under_review', count: stats.under_review || 0, color: 'bg-amber-100 text-amber-700' },
    { label: 'Contacted', value: 'contacted', count: stats.contacted || 0, color: 'bg-blue-100 text-blue-700' },
    { label: 'Approved', value: 'approved', count: stats.approved || 0, color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Completed', value: 'completed', count: stats.completed || 0, color: 'bg-purple-100 text-purple-700' },
    { label: 'Rejected', value: 'rejected', count: stats.rejected || 0, color: 'bg-slate-100 text-slate-700' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-[#F59E0B]" />
            <span>Admissions & Campus Tour Pipeline</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Track child admission applications, campus walkthrough bookings, review milestones, and admission approvals.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchAdmissions();
            }}
            className="relative w-full sm:w-96"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by child name, parent name, phone, program..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
            />
          </form>

          <button
            type="button"
            onClick={fetchAdmissions}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
          >
            Refresh Pipeline
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          {statusPills.map((pill) => (
            <button
              key={pill.value}
              type="button"
              onClick={() => setStatusFilter(pill.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                statusFilter === pill.value
                  ? 'bg-[#0F2963] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{pill.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${statusFilter === pill.value ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {pill.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Table + Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Admissions Table */}
        <div className={`${selectedAdmission ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300`}>
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-xs text-[#0F2963] uppercase tracking-wider">
              Applications Queue ({admissions.length})
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Sorted: Newest First</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs">Loading admissions applications...</div>
          ) : admissions.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No admissions records found in this view.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Child & Program</th>
                    <th className="py-3 px-4">Parent Details</th>
                    <th className="py-3 px-4">Joining Date</th>
                    <th className="py-3 px-4 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {admissions.map((adm) => {
                    const isSelected = selectedAdmission?.id === adm.id;
                    return (
                      <tr
                        key={adm.id}
                        onClick={() => setSelectedAdmission(adm)}
                        className={`cursor-pointer transition ${
                          isSelected
                            ? 'bg-[#E8EEFB]/70 border-l-4 border-l-[#F59E0B]'
                            : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                              adm.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-700'
                                : adm.status === 'under_review'
                                ? 'bg-amber-100 text-amber-700'
                                : adm.status === 'new'
                                ? 'bg-rose-100 text-rose-700'
                                : adm.status === 'completed'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {adm.status.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-extrabold text-[#0F2963] text-xs leading-snug flex items-center gap-1.5">
                            <Baby className="w-3.5 h-3.5 text-[#00A8E8]" />
                            <span>{adm.childName}</span>
                          </div>
                          <div className="text-[11px] text-slate-500">{adm.program}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-xs text-slate-800">{adm.parentName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">📞 {adm.phone}</div>
                        </td>

                        <td className="py-3.5 px-4 text-[11px] text-slate-500">
                          {adm.preferredDate || 'Immediate'}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <span className="text-xs font-bold text-[#F59E0B] inline-flex items-center gap-0.5">
                            <span>Open</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Admission Candidate Dossier Drawer (5 cols) */}
        {selectedAdmission && (
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 space-y-6 self-start sticky top-20 animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Application #{selectedAdmission.id}
                  </span>
                </div>
                <h3 className="font-black text-lg text-[#0F2963] leading-tight flex items-center gap-2">
                  <Baby className="w-5 h-5 text-[#00A8E8]" />
                  <span>{selectedAdmission.childName}</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAdmission(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${selectedAdmission.phone}`}
                className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {selectedAdmission.parentName}</span>
              </a>
              {selectedAdmission.email && (
                <a
                  href={`mailto:${selectedAdmission.email}`}
                  className="p-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Offer Email</span>
                </a>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Interested Program</div>
                <div className="font-bold text-[#0F2963]">{selectedAdmission.program}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Child Date of Birth</div>
                <div className="font-bold text-slate-700">{selectedAdmission.childDob || 'Not provided'}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Preferred Joining Date</div>
                <div className="font-bold text-[#00A8E8]">{selectedAdmission.preferredDate || 'Immediate'}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Submitted On</div>
                <div className="font-bold text-slate-700">
                  {new Date(selectedAdmission.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Pipeline Stage Updater */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400">
                Move Pipeline Stage
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['new', 'under_review', 'contacted', 'approved', 'rejected', 'completed'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleUpdateStatus(selectedAdmission.id, st)}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-bold capitalize transition ${
                      selectedAdmission.status === st
                        ? 'bg-[#0F2963] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Admissions Interview & Verification Notes Logger */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F2963] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Interaction & Verification Notes ({selectedAdmission.notes?.length || 0})</span>
                </span>
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record interaction score, documents verified..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                />
                <button
                  type="submit"
                  disabled={updatingNote || !newNote.trim()}
                  className="px-3.5 py-2 rounded-xl bg-[#0F2963] text-white text-xs font-bold hover:bg-[#1D4ED8] transition disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Notes List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(selectedAdmission.notes || []).map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-bold text-slate-600">{note.author}</span>
                      <span>{new Date(note.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(selectedAdmission.id)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Dossier</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAdmission(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close Drawer
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-slate-800 text-base">Delete Admission Application?</h3>
              <p className="text-xs text-slate-500">
                This will remove the candidate dossier and all logged notes permanently.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

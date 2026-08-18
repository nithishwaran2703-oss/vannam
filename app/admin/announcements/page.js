'use client';

import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Calendar,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  X
} from 'lucide-react';
import { useAdminToast } from '../layout';
import { getAcademicYear } from '../../../lib/academicYear';

export default function AnnouncementsManager() {
  const { showToast } = useAdminToast();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    message: '',
    type: 'admission',
    active: true,
    startDate: '',
    expiryDate: '',
    link: '#admissions',
    linkText: 'Apply Online',
    bannerColor: 'from-[#0F2963] via-[#00A8E8] to-[#F59E0B]'
  });

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/announcements');
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch {
      showToast('Failed to load announcements', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const openAddModal = () => {
    setEditingAnn(null);
    setForm({
      title: '',
      message: '',
      type: 'admission',
      active: true,
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      link: '#admissions',
      linkText: 'Apply Now',
      bannerColor: 'from-[#0F2963] via-[#00A8E8] to-[#F59E0B]'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ann) => {
    setEditingAnn(ann);
    setForm({
      title: ann.title,
      message: ann.message,
      type: ann.type || 'admission',
      active: ann.active !== undefined ? ann.active : true,
      startDate: ann.startDate || '',
      expiryDate: ann.expiryDate || '',
      link: ann.link || '#admissions',
      linkText: ann.linkText || 'Learn More',
      bannerColor: ann.bannerColor || 'from-[#0F2963] via-[#00A8E8] to-[#F59E0B]'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingAnn) {
        const res = await fetch('/api/admin/announcements', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingAnn.id,
            updates: form
          })
        });
        if (!res.ok) throw new Error('Update failed');
        showToast('Announcement updated!');
      } else {
        const res = await fetch('/api/admin/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Create failed');
        showToast('New announcement published to public banner!');
      }

      setIsModalOpen(false);
      fetchAnnouncements();
    } catch {
      showToast('Error saving announcement', 'error');
    }
  };

  const handleToggleActive = async (ann) => {
    try {
      await fetch('/api/admin/announcements', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: ann.id,
          updates: { active: !ann.active }
        })
      });
      showToast(`Announcement ${!ann.active ? 'Activated on Public Site' : 'Deactivated'}`);
      fetchAnnouncements();
    } catch {
      showToast('Failed to toggle status', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/announcements?id=${id}`, { method: 'DELETE' });
      showToast('Announcement deleted');
      setDeleteConfirmId(null);
      fetchAnnouncements();
    } catch {
      showToast('Failed to delete announcement', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[#F59E0B]" />
            <span>Public Notice & Announcement Banners</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Active announcements automatically render as a prominent top announcement ribbon on the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Create Notice Banner</span>
        </button>
      </div>

      {/* Live Active Banners Preview Strip */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-[#0F2963] flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#00A8E8]" />
            Live Notice Ribbon on Public Website
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
            {announcements.filter((a) => a.active).length} Currently Active
          </span>
        </div>

        {announcements.filter((a) => a.active).length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-400">
            No active notice banner is currently visible on the public website.
          </div>
        ) : (
          <div className="space-y-3">
            {announcements
              .filter((a) => a.active)
              .map((ann) => (
                <div
                  key={ann.id}
                  className={`p-4 rounded-2xl text-white shadow-md bg-gradient-to-r ${ann.bannerColor || 'from-[#0F2963] via-[#00A8E8] to-[#F59E0B]'} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </span>
                    <div>
                      <div className="font-black text-xs sm:text-sm">{ann.title}</div>
                      <div className="text-[11px] text-white/90 font-medium line-clamp-1">{ann.message}</div>
                    </div>
                  </div>

                  <a
                    href={ann.link || '#'}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#0F2963] font-black text-xs hover:bg-[#CBD8F6] transition shrink-0 self-start sm:self-auto flex items-center gap-1"
                  >
                    <span>{ann.linkText || 'Learn More'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#0F2963]">All Notice Banners</h3>
          <span className="text-xs text-slate-400 font-medium">Total: {announcements.length}</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No announcements created yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Title & Message</th>
                  <th className="py-3 px-5">Category</th>
                  <th className="py-3 px-5">Date Window</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {announcements.map((ann) => (
                  <tr key={ann.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-5">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(ann)}
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
                          ann.active
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {ann.active ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Live on Site</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-5 max-w-sm">
                      <div className="font-extrabold text-[#0F2963]">{ann.title}</div>
                      <div className="text-slate-500 text-[11px] line-clamp-1">{ann.message}</div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {ann.type}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{ann.startDate || 'Immediate'} → {ann.expiryDate || 'Ongoing'}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(ann)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#E8EEFB] text-slate-600 hover:text-[#0F2963] transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(ann.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-[#0F2963]">
                {editingAnn ? 'Edit Notice Banner' : 'Create Public Notice'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Headline *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={`e.g. Admissions Open for Academic Year ${getAcademicYear()}`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Message / Details *</label>
                <textarea
                  rows={3}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Detailed announcement text..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="admission">Admissions Open</option>
                    <option value="event">Campus Event / Camp</option>
                    <option value="holiday">Holiday Notice</option>
                    <option value="alert">Important Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Banner Color Style</label>
                  <select
                    value={form.bannerColor}
                    onChange={(e) => setForm({ ...form, bannerColor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-mono text-[11px]"
                  >
                    <option value="from-[#0F2963] via-[#00A8E8] to-[#F59E0B]">Navy & Orange Gradient (Signature)</option>
                    <option value="from-amber-600 via-orange-500 to-amber-700">Warm Amber Festival</option>
                    <option value="from-rose-600 via-red-600 to-rose-700">Alert / Important Red</option>
                    <option value="from-emerald-700 via-teal-600 to-emerald-800">Fresh Green Camp</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Link Target</label>
                  <input
                    type="text"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    placeholder="#admissions or /programs"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={form.linkText}
                    onChange={(e) => setForm({ ...form, linkText: e.target.value })}
                    placeholder="Apply Now"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="ann-active"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0F2963] focus:ring-[#00A8E8]"
                />
                <label htmlFor="ann-active" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Activate banner immediately on public website
                </label>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition shadow-md"
                >
                  {editingAnn ? 'Save Changes' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-slate-800 text-base">Delete Announcement?</h3>
              <p className="text-xs text-slate-500">
                This will remove the announcement banner from the public website.
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

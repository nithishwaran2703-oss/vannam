'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
  Baby,
  BookOpen,
  SunMedium,
  Clock,
  Users,
  IndianRupee,
  X,
  AlertTriangle
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function ProgramsManager() {
  const { showToast } = useAdminToast();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Program form state
  const [form, setForm] = useState({
    title: '',
    ageGroup: '',
    timing: '9:00 AM – 12:30 PM',
    ratio: '8:1',
    fee: '₹50,000 / term',
    badge: 'Popular',
    desc: '',
    featuresText: '',
    status: 'published',
    icon: 'Sparkles'
  });

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/programs');
      const data = await res.json();
      setPrograms(data.programs || []);
    } catch {
      showToast('Failed to fetch programs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const openAddModal = () => {
    setEditingProgram(null);
    setForm({
      title: '',
      ageGroup: '',
      timing: '9:00 AM – 12:30 PM',
      ratio: '8:1',
      fee: '₹50,000 / term',
      badge: 'Popular',
      desc: '',
      featuresText: 'Sensory tactile play\nMontessori apparatus\nOutdoor discovery\nMusic & Movement',
      status: 'published',
      icon: 'Sparkles'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prog) => {
    setEditingProgram(prog);
    setForm({
      title: prog.title,
      ageGroup: prog.ageGroup,
      timing: prog.timing,
      ratio: prog.ratio,
      fee: prog.fee,
      badge: prog.badge || '',
      desc: prog.desc || '',
      featuresText: Array.isArray(prog.features) ? prog.features.join('\n') : '',
      status: prog.status || 'published',
      icon: prog.icon || 'Sparkles'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const features = form.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      if (editingProgram) {
        const res = await fetch('/api/admin/programs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProgram.id,
            updates: { ...form, features }
          })
        });
        if (!res.ok) throw new Error('Update failed');
        showToast('Program updated successfully!');
      } else {
        const res = await fetch('/api/admin/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, features })
        });
        if (!res.ok) throw new Error('Create failed');
        showToast('New program created!');
      }

      setIsModalOpen(false);
      fetchPrograms();
    } catch {
      showToast('Error saving program', 'error');
    }
  };

  const handleToggleStatus = async (prog) => {
    const newStatus = prog.status === 'published' ? 'draft' : 'published';
    try {
      await fetch('/api/admin/programs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: prog.id,
          updates: { status: newStatus }
        })
      });
      showToast(`Program status changed to ${newStatus}`);
      fetchPrograms();
    } catch {
      showToast('Failed to toggle status', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/programs?id=${id}`, { method: 'DELETE' });
      showToast('Program deleted');
      setDeleteConfirmId(null);
      fetchPrograms();
    } catch {
      showToast('Failed to delete program', 'error');
    }
  };

  const filtered = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.ageGroup.toLowerCase().includes(search.toLowerCase()) ||
      (p.desc || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#00A8E8]" />
            <span>Curriculum & Programs Manager</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage academic batches, age brackets, ratios, fees, and curriculum highlights.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Add New Program</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs by title or age..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'all'
                ? 'bg-[#0F2963] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({programs.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'published'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Published ({programs.filter((p) => p.status === 'published').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('draft')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'draft'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Draft ({programs.filter((p) => p.status === 'draft').length})
          </button>
        </div>
      </div>

      {/* Programs Card Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Loading programs list...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
          No programs found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition relative group"
            >
              <div className="space-y-4">
                
                {/* Card Top: Badges and Action Menu */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E8EEFB] text-[#0F2963]">
                    {prog.badge || 'Curriculum'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(prog)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition flex items-center gap-1 ${
                        prog.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {prog.status === 'published' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Title & Age */}
                <div>
                  <h3 className="text-base font-extrabold text-[#0F2963] leading-snug">
                    {prog.title}
                  </h3>
                  <div className="text-xs font-bold text-[#00A8E8] mt-0.5">
                    Age: {prog.ageGroup}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {prog.desc}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prog.timing}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ratio: {prog.ratio}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5 font-bold text-[#0F2963]">
                    <IndianRupee className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Fee: {prog.fee}</span>
                  </div>
                </div>

                {/* Features Bullet List */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Highlights</div>
                  {(prog.features || []).slice(0, 3).map((f, idx) => (
                    <div key={idx} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8]"></span>
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openEditModal(prog)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#E8EEFB] text-slate-700 hover:text-[#0F2963] text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Program</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(prog.id)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete Program"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Program Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-[#0F2963]">
                {editingProgram ? 'Edit Program Details' : 'Create New Program'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Program Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Toddler Playgroup"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age Group *</label>
                  <input
                    type="text"
                    required
                    value={form.ageGroup}
                    onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                    placeholder="e.g. 1.5 – 2.5 Years"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Timing</label>
                  <input
                    type="text"
                    value={form.timing}
                    onChange={(e) => setForm({ ...form, timing: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ratio</label>
                  <input
                    type="text"
                    value={form.ratio}
                    onChange={(e) => setForm({ ...form, ratio: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fee</label>
                  <input
                    type="text"
                    value={form.fee}
                    onChange={(e) => setForm({ ...form, fee: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#0F2963]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="e.g. Most Popular, STEAM Focus"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Brief curriculum description..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Curriculum Points (One per line)
                </label>
                <textarea
                  rows={4}
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                  placeholder="Sensory play exploration&#10;Tactile math beads&#10;Language circles"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
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
                  {editingProgram ? 'Save Changes' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-slate-800 text-base">Delete Program?</h3>
              <p className="text-xs text-slate-500">
                This action cannot be undone. The program will be removed from the public website.
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

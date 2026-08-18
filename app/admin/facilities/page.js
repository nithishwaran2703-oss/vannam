'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Edit2, Trash2, CheckCircle2, XCircle, X, Box, Smile, Waves, ShieldCheck } from 'lucide-react';
import { useAdminToast } from '../layout';

export default function FacilitiesManager() {
  const { showToast } = useAdminToast();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    title: '',
    desc: '',
    icon: 'Box',
    status: 'active'
  });

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content?section=facilities');
      const data = await res.json();
      setFacilities(data.data || []);
    } catch {
      showToast('Failed to load facilities', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    let updated;
    if (editingItem) {
      updated = facilities.map((f) => (f.id === editingItem.id ? { ...f, ...form } : f));
    } else {
      const newItem = {
        id: `fac-${Date.now()}`,
        ...form,
        order: facilities.length + 1
      };
      updated = [...facilities, newItem];
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'facilities', data: updated })
      });
      if (!res.ok) throw new Error('Save failed');
      showToast('Facilities updated!');
      setIsModalOpen(false);
      setFacilities(updated);
    } catch {
      showToast('Error saving facility', 'error');
    }
  };

  const handleToggleStatus = async (item) => {
    const updated = facilities.map((f) =>
      f.id === item.id ? { ...f, status: f.status === 'active' ? 'inactive' : 'active' } : f
    );
    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'facilities', data: updated })
      });
      showToast('Facility status updated');
      setFacilities(updated);
    } catch {
      showToast('Failed to toggle status', 'error');
    }
  };

  const handleDelete = async (id) => {
    const updated = facilities.filter((f) => f.id !== id);
    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'facilities', data: updated })
      });
      showToast('Facility removed');
      setFacilities(updated);
    } catch {
      showToast('Failed to delete facility', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#F59E0B]" />
            <span>Campus Facilities & Amenities</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage tactile learning labs, splash pool, safety infrastructure, and play spaces.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingItem(null);
            setForm({ title: '', desc: '', icon: 'Box', status: 'active' });
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Add Facility</span>
        </button>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#E8EEFB] text-[#0F2963] flex items-center justify-center font-bold">
                  <Box className="w-5 h-5 text-[#00A8E8]" />
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(fac)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    fac.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {fac.status === 'active' ? 'Active' : 'Hidden'}
                </button>
              </div>

              <h3 className="font-extrabold text-sm text-[#0F2963] leading-snug">{fac.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{fac.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(fac);
                  setForm({ title: fac.title, desc: fac.desc, icon: fac.icon, status: fac.status });
                  setIsModalOpen(true);
                }}
                className="text-xs font-bold text-[#00A8E8] hover:text-[#0F2963] flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(fac.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-[#0F2963]">
                {editingItem ? 'Edit Facility' : 'Add Campus Facility'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Facility Name *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Eco Splash Pool & Sand Oasis"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Details regarding equipment and safety..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F2963] text-white text-xs font-bold shadow-md"
                >
                  Save Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  MessageSquareQuote,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  X,
  AlertTriangle
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function TestimonialsManager() {
  const { showToast } = useAdminToast();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    name: '',
    relation: '',
    rating: 5,
    text: '',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    status: 'published'
  });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content?section=testimonials');
      const data = await res.json();
      setTestimonials(data.data || []);
    } catch {
      showToast('Failed to load testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    let updated;
    if (editingItem) {
      updated = testimonials.map((t) => (t.id === editingItem.id ? { ...t, ...form } : t));
    } else {
      const newItem = {
        id: `test-${Date.now()}`,
        ...form
      };
      updated = [newItem, ...testimonials];
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'testimonials', data: updated })
      });
      if (!res.ok) throw new Error('Save failed');
      showToast('Testimonials updated!');
      setIsModalOpen(false);
      setTestimonials(updated);
    } catch {
      showToast('Error saving review', 'error');
    }
  };

  const handleToggleStatus = async (item) => {
    const updated = testimonials.map((t) =>
      t.id === item.id ? { ...t, status: t.status === 'published' ? 'draft' : 'published' } : t
    );
    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'testimonials', data: updated })
      });
      showToast('Review status updated');
      setTestimonials(updated);
    } catch {
      showToast('Failed to update review status', 'error');
    }
  };

  const handleDelete = async (id) => {
    const updated = testimonials.filter((t) => t.id !== id);
    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'testimonials', data: updated })
      });
      showToast('Review deleted');
      setTestimonials(updated);
    } catch {
      showToast('Failed to delete review', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-[#00A8E8]" />
            <span>Parent Testimonials & Reviews</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage verified parent feedback, star ratings, child grade milestones, and published showcase reviews.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingItem(null);
            setForm({
              name: '',
              relation: '',
              rating: 5,
              text: '',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
              status: 'published'
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Add Parent Review</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (test.rating || 5)
                          ? 'fill-[#F59E0B] text-[#F59E0B]'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(test)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    test.status === 'published'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {test.status === 'published' ? 'Published' : 'Hidden'}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic">
                &quot;{test.text}&quot;
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 relative shrink-0">
                  <Image
                    src={test.image || '/logo.png'}
                    alt={test.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-[#0F2963]">{test.name}</div>
                  <div className="text-[10px] font-semibold text-[#00A8E8]">{test.relation}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(test);
                  setForm(test);
                  setIsModalOpen(true);
                }}
                className="text-xs font-bold text-[#00A8E8] hover:text-[#0F2963] flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Review</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(test.id)}
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
                {editingItem ? 'Edit Parent Review' : 'Add Testimonial'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent Name(s) *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Meera & Rajesh K."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Child & Grade Milestone *</label>
                <input
                  type="text"
                  required
                  value={form.relation}
                  onChange={(e) => setForm({ ...form, relation: e.target.value })}
                  placeholder="e.g. Parents of Aarav (Nursery Explorers)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating (1 - 5)</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                >
                  <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                  <option value={4}>★★★★☆ (4 Stars - Great)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Satisfactory)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent Testimonial Text *</label>
                <textarea
                  rows={3}
                  required
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  placeholder="What they loved about Vannam..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
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
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

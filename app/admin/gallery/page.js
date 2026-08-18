'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Star,
  ExternalLink,
  Search,
  Filter,
  Eye,
  X,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function GalleryManager() {
  const { showToast } = useAdminToast();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Activities',
    url: '',
    caption: '',
    featured: false
  });

  const categories = ['Classroom', 'Activities', 'Events', 'Campus'];

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      setGallery(data.gallery || []);
    } catch {
      showToast('Failed to load gallery items', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!form.url) {
      showToast('Please enter an image URL', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Upload failed');
      showToast('Image added to gallery!');
      setIsModalOpen(false);
      setForm({ title: '', category: 'Activities', url: '', caption: '', featured: false });
      fetchGallery();
    } catch {
      showToast('Error uploading image', 'error');
    }
  };

  const handleToggleFeatured = async (item) => {
    try {
      await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          updates: { featured: !item.featured }
        })
      });
      showToast(`Featured status updated for ${item.title}`);
      fetchGallery();
    } catch {
      showToast('Failed to toggle featured status', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      showToast('Image deleted from gallery');
      setDeleteConfirmId(null);
      fetchGallery();
    } catch {
      showToast('Failed to delete image', 'error');
    }
  };

  const filtered = gallery.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.caption || '').toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#00A8E8]" />
            <span>Media Library & Photo Gallery</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage public website photo galleries, event highlights, campus infrastructure visuals, and featured media.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Upload Media Asset</span>
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
            placeholder="Search by caption or title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              categoryFilter === 'all'
                ? 'bg-[#0F2963] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({gallery.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                categoryFilter === cat
                  ? 'bg-[#00A8E8] text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat} ({gallery.filter((g) => g.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Loading media assets...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
          No media items found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition group"
            >
              <div className="space-y-3">
                {/* Image Container with overlay triggers */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-white flex items-center gap-0.5 shadow-sm">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay Button */}
                  <button
                    type="button"
                    onClick={() => setPreviewImage(item)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white gap-1 text-xs font-bold cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Full Size</span>
                  </button>
                </div>

                {/* Metadata */}
                <div className="p-4 pt-1 space-y-1">
                  <h3 className="font-extrabold text-xs text-[#0F2963] truncate">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                  <div className="text-[10px] text-slate-400 pt-1">
                    Uploaded: {item.uploadDate || 'Recent'}
                  </div>
                </div>
              </div>

              {/* Bottom Card Controls */}
              <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-50 mt-2">
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(item)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition flex items-center gap-1 ${
                    item.featured
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Star className={`w-3 h-3 ${item.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{item.featured ? 'Featured' : 'Feature'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-[#0F2963]">
                Add Image to Media Library
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Montessori Math Beads Discovery"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL (Unsplash or Direct Link) *</label>
                <input
                  type="url"
                  required
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Brief description of the classroom moment..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="feat-image"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0F2963] focus:ring-[#00A8E8]"
                />
                <label htmlFor="feat-image" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Feature this image prominently in the public showcase
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
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Size Lightbox Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl space-y-3 p-4">
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-950">
              <Image
                src={previewImage.url}
                alt={previewImage.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="text-white p-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20">
                  {previewImage.category}
                </span>
                <h3 className="font-extrabold text-sm">{previewImage.title}</h3>
              </div>
              {previewImage.caption && (
                <p className="text-xs text-slate-400 mt-1">{previewImage.caption}</p>
              )}
            </div>
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
              <h3 className="font-extrabold text-slate-800 text-base">Delete Photo?</h3>
              <p className="text-xs text-slate-500">
                This image will be permanently removed from the media gallery.
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

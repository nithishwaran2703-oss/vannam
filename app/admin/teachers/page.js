'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Mail,
  Award,
  BookOpen,
  X,
  AlertTriangle
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function TeachersManager() {
  const { showToast } = useAdminToast();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    role: '',
    experience: '5+ Years',
    qualifications: 'AMI Montessori Certified',
    bio: '',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    email: '',
    active: true
  });

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/teachers');
      const data = await res.json();
      setTeachers(data.teachers || []);
    } catch {
      showToast('Failed to load educators list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const openAddModal = () => {
    setEditingTeacher(null);
    setForm({
      name: '',
      role: '',
      experience: '5+ Years',
      qualifications: 'AMI Montessori Diploma',
      bio: '',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      email: '',
      active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingTeacher(t);
    setForm({
      name: t.name,
      role: t.role,
      experience: t.experience || '',
      qualifications: t.qualifications || '',
      bio: t.bio || '',
      image: t.image || '',
      email: t.email || '',
      active: t.active !== undefined ? t.active : true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        const res = await fetch('/api/admin/teachers', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingTeacher.id,
            updates: form
          })
        });
        if (!res.ok) throw new Error('Update failed');
        showToast('Educator profile updated!');
      } else {
        const res = await fetch('/api/admin/teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Create failed');
        showToast('New educator added to faculty roster!');
      }

      setIsModalOpen(false);
      fetchTeachers();
    } catch {
      showToast('Error saving educator profile', 'error');
    }
  };

  const handleToggleActive = async (t) => {
    try {
      await fetch('/api/admin/teachers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: t.id,
          updates: { active: !t.active }
        })
      });
      showToast(`Status updated for ${t.name}`);
      fetchTeachers();
    } catch {
      showToast('Failed to toggle status', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/teachers?id=${id}`, { method: 'DELETE' });
      showToast('Educator deleted');
      setDeleteConfirmId(null);
      fetchTeachers();
    } catch {
      showToast('Failed to delete educator', 'error');
    }
  };

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.role.toLowerCase().includes(search.toLowerCase()) ||
      (t.qualifications || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00A8E8]" />
            <span>Faculty & Educators Manager</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage teacher profiles, roles, qualifications, biographies, and live active statuses.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#1D4ED8] text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Add Educator</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, qualification..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
          />
        </div>
        <div className="text-xs font-bold text-slate-400">
          Total Faculty: <span className="text-[#0F2963]">{teachers.length}</span>
        </div>
      </div>

      {/* Teachers Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Loading faculty list...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
          No faculty members found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition relative group"
            >
              <div className="space-y-3">
                
                {/* Photo & Active Toggle */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={teacher.image || '/logo.png'}
                    alt={teacher.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(teacher)}
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full backdrop-blur-md transition flex items-center gap-1 ${
                        teacher.active
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-slate-700/80 text-white'
                      }`}
                    >
                      {teacher.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-extrabold text-sm text-[#0F2963] leading-snug">
                    {teacher.name}
                  </h3>
                  <div className="text-xs font-bold text-[#00A8E8] mt-0.5">
                    {teacher.role}
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Experience: {teacher.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{teacher.qualifications}</span>
                  </div>
                </div>

                {teacher.bio && (
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {teacher.bio}
                  </p>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openEditModal(teacher)}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-[#E8EEFB] text-slate-700 hover:text-[#0F2963] text-xs font-bold transition flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(teacher.id)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete Educator"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-[#0F2963]">
                {editingTeacher ? 'Edit Educator Profile' : 'Add New Educator'}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Mrs. Priya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Designation / Role *</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Lead Montessori Guide / Phonics Mentor"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00A8E8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 10+ Years"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="priya@vannam.edu"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Qualifications & Certifications</label>
                <input
                  type="text"
                  value={form.qualifications}
                  onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                  placeholder="M.Sc. Child Development, AMI Diploma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Biography</label>
                <textarea
                  rows={2}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Brief statement about their teaching passion..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
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
                  {editingTeacher ? 'Save Changes' : 'Add Educator'}
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
              <h3 className="font-extrabold text-slate-800 text-base">Remove Educator?</h3>
              <p className="text-xs text-slate-500">
                This will remove the educator profile from the public faculty section.
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

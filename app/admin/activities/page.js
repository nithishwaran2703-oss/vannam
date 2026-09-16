'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  Calendar,
  Image as ImageIcon,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Users,
  GraduationCap
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function ActivitiesManager() {
  const { showToast } = useAdminToast();
  const [activities, setActivities] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Art & Sensory',
    description: '',
    date: new Date().toISOString().split('T')[0],
    classId: '',
    studentId: '',
    teacherId: '',
    photoUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [actRes, clsRes, stdRes, tchRes] = await Promise.all([
        fetch('/api/admin/activities'),
        fetch('/api/admin/classes'),
        fetch('/api/admin/students'),
        fetch('/api/admin/teachers')
      ]);

      const [actData, clsData, stdData, tchData] = await Promise.all([
        actRes.json(),
        clsRes.json(),
        stdRes.json(),
        tchRes.json()
      ]);

      setActivities(actData.activities || []);
      setClasses(clsData.classes || []);
      setStudents(stdData.students || []);
      setTeachers(tchData.teachers || []);
    } catch {
      showToast('Failed to load activities', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingActivity(null);
    setForm({
      title: '',
      category: 'Art & Sensory',
      description: '',
      date: new Date().toISOString().split('T')[0],
      classId: classes[0]?.id || '',
      studentId: '',
      teacherId: teachers[0]?.id || '',
      photoUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80'
    });
    setIsModalOpen(true);
  };

  const handleSaveActivity = async (e) => {
    e.preventDefault();
    try {
      const url = '/api/admin/activities';
      const method = editingActivity ? 'PUT' : 'POST';
      const payload = {
        ...form,
        photos: form.photoUrl ? [form.photoUrl] : [],
        id: editingActivity ? editingActivity.id : undefined
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save activity');

      showToast(editingActivity ? 'Activity updated' : 'Student activity published');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      const res = await fetch(`/api/admin/activities?id=${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete activity');

      showToast('Activity removed');
      setDeleteConfirmId(null);
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.title?.toLowerCase().includes(search.toLowerCase()) ||
      act.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      act.description?.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClassFilter === 'all' || act.classId === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Curriculum & Milestones</span>
          </div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight">
            Daily Student Activities & Media
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View, moderate, and publish classroom observations, Montessori progress notes & photo moments.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#00A8E8] text-white font-bold text-sm shadow-md shadow-[#0F2963]/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Activity</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by activity title, student name, or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
          />
        </div>

        <div>
          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
          >
            <option value="all">All Classrooms ({activities.length})</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities Grid */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <div className="w-8 h-8 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-500 font-medium">Loading activity stream...</p>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No activities found</h3>
          <p className="text-xs text-slate-500 mt-1">Post a student learning activity using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                {act.photos && act.photos.length > 0 && (
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={act.photos[0]}
                      alt={act.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold">
                      {act.category}
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {act.date}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold">
                      {act.className}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 mb-1 leading-snug">
                    {act.title}
                  </h3>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A8E8] mb-3">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{act.studentName}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {act.description}
                  </p>

                  <div className="text-[11px] text-slate-400 font-medium">
                    Observed by: <span className="font-bold text-slate-700">{act.teacherName || 'Lead Educator'}</span>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setDeleteConfirmId(act.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete Activity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delete Activity Post?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This will remove this observation and its associated photos from parent activity feeds.
            </p>
            <div className="flex items-center justify-end gap-2.5 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteActivity(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0F2963] text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0F2963]">Post Student Activity</h3>
                  <p className="text-xs text-slate-500">Record classroom milestone & photo highlights</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveActivity} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Finger Painting & Texture Mixing"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  >
                    <option value="Art & Sensory">Art & Sensory</option>
                    <option value="Montessori Math">Montessori Math</option>
                    <option value="Language & Phonics">Language & Phonics</option>
                    <option value="Junior STEAM">Junior STEAM</option>
                    <option value="Physical Agility">Physical Agility</option>
                    <option value="Nutrition & Meal">Nutrition & Meal</option>
                    <option value="Music & Rhythm">Music & Rhythm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Classroom</label>
                  <select
                    value={form.classId}
                    onChange={(e) => setForm({ ...form, classId: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  >
                    <option value="">Select Classroom</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Individual Student</label>
                  <select
                    value={form.studentId}
                    onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  >
                    <option value="">All Students in Class</option>
                    {students
                      .filter((s) => !form.classId || s.classId === form.classId)
                      .map((std) => (
                        <option key={std.id} value={std.id}>
                          {std.name} ({std.studentId})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Activity Observation & Notes *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe child participation, motor engagement, milestone progress..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={form.photoUrl}
                  onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0F2963] hover:bg-[#00A8E8] text-white shadow-md transition cursor-pointer"
                >
                  Publish Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

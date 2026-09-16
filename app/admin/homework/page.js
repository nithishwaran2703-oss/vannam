'use client';

import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Plus,
  Search,
  Calendar,
  BookOpen,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Clock,
  Users
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function HomeworkManager() {
  const { showToast } = useAdminToast();
  const [homeworkList, setHomeworkList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHw, setEditingHw] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    subject: 'Cognitive Discovery',
    description: '',
    classId: '',
    teacherId: '',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    materials: '',
    status: 'ASSIGNED'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [hwRes, clsRes, tchRes] = await Promise.all([
        fetch('/api/admin/homework'),
        fetch('/api/admin/classes'),
        fetch('/api/admin/teachers')
      ]);

      const [hwData, clsData, tchData] = await Promise.all([
        hwRes.json(),
        clsRes.json(),
        tchRes.json()
      ]);

      setHomeworkList(hwData.homework || []);
      setClasses(clsData.classes || []);
      setTeachers(tchData.teachers || []);
    } catch {
      showToast('Failed to load homework tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingHw(null);
    setForm({
      title: '',
      subject: 'Cognitive Discovery',
      description: '',
      classId: classes[0]?.id || '',
      teacherId: teachers[0]?.id || '',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      materials: 'Montessori Activity Booklet',
      status: 'ASSIGNED'
    });
    setIsModalOpen(true);
  };

  const handleSaveHomework = async (e) => {
    e.preventDefault();
    try {
      const url = '/api/admin/homework';
      const method = editingHw ? 'PUT' : 'POST';
      const payload = {
        ...form,
        id: editingHw ? editingHw.id : undefined
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to assign homework');

      showToast(editingHw ? 'Task updated' : 'Homework assigned to classroom');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteHomework = async (id) => {
    try {
      const res = await fetch(`/api/admin/homework?id=${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete homework');

      showToast('Homework task removed');
      setDeleteConfirmId(null);
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8] uppercase tracking-wider mb-1">
            <FileCheck2 className="w-4 h-4" />
            <span>Curriculum & Practice Tasks</span>
          </div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight">
            Homework & Daily Exploration Tasks
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Assign fun parent-child engagement activities, tracing practice & weekend exploratory challenges.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#00A8E8] text-white font-bold text-sm shadow-md shadow-[#0F2963]/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Homework</span>
        </button>
      </div>

      {/* Homework List Grid */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <div className="w-8 h-8 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-500 font-medium">Loading assigned tasks...</p>
        </div>
      ) : homeworkList.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Homework Assigned</h3>
          <p className="text-xs text-slate-500 mt-1">Create an interactive home practice task using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeworkList.map((hw) => (
            <div
              key={hw.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-50 text-amber-800 border border-amber-200/60 uppercase">
                    {hw.subject}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600">
                    <Clock className="w-3.5 h-3.5" />
                    Due: {hw.dueDate}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1.5">{hw.title}</h3>
                <div className="text-xs font-bold text-indigo-600 mb-3 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{hw.className}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">{hw.description}</p>

                {hw.materials && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Materials / Worksheets</div>
                    <div className="text-xs font-medium text-slate-700 mt-0.5">{hw.materials}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4 text-xs">
                <span className="text-slate-400">
                  By: <strong className="text-slate-700">{hw.teacherName || 'Faculty'}</strong>
                </span>

                <button
                  onClick={() => setDeleteConfirmId(hw.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete Homework"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Remove Homework Task?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This task will be removed from all parent dashboards and student work lists.
            </p>
            <div className="flex items-center justify-end gap-2.5 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteHomework(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Homework Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0F2963] text-white flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0F2963]">Assign Homework Task</h3>
                  <p className="text-xs text-slate-500">Create home learning & exploratory tasks</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHomework} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tactile Shape & Color Hunt"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Domain</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  >
                    <option value="Cognitive Discovery">Cognitive Discovery</option>
                    <option value="Language & Phonics">Language & Phonics</option>
                    <option value="Math & Counting">Math & Counting</option>
                    <option value="Junior STEAM">Junior STEAM</option>
                    <option value="Art & Expression">Art & Expression</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Classroom *</label>
                <select
                  required
                  value={form.classId}
                  onChange={(e) => setForm({ ...form, classId: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                >
                  <option value="">Select Classroom</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Instructions & Guidance *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain the activity steps for parents and children..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Materials / Worksheets Required</label>
                <input
                  type="text"
                  placeholder="e.g. Color chart Page 6, Craft pouch"
                  value={form.materials}
                  onChange={(e) => setForm({ ...form, materials: e.target.value })}
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
                  Assign Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

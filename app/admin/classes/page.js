'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Sparkles,
  X,
  AlertCircle,
  BookOpen,
  Calendar
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function ClassesManager() {
  const { showToast } = useAdminToast();
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    grade: 'Pre-KG',
    room: '',
    capacity: 15,
    teacherId: '',
    academicYear: '2026-27'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [clsRes, tchRes, stdRes] = await Promise.all([
        fetch('/api/admin/classes'),
        fetch('/api/admin/teachers'),
        fetch('/api/admin/students')
      ]);

      const [clsData, tchData, stdData] = await Promise.all([
        clsRes.json(),
        tchRes.json(),
        stdRes.json()
      ]);

      setClasses(clsData.classes || []);
      setTeachers(tchData.teachers || []);
      setStudents(stdData.students || []);
    } catch {
      showToast('Failed to load classrooms data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingClass(null);
    setForm({
      name: '',
      grade: 'Pre-KG',
      room: 'Lotus Block Room 101',
      capacity: 15,
      teacherId: teachers[0]?.id || '',
      academicYear: '2026-27'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cls) => {
    setEditingClass(cls);
    setForm({
      name: cls.name || '',
      grade: cls.grade || 'Pre-KG',
      room: cls.room || '',
      capacity: cls.capacity || 15,
      teacherId: cls.teacherId || '',
      academicYear: cls.academicYear || '2026-27'
    });
    setIsModalOpen(true);
  };

  const handleSaveClass = async (e) => {
    e.preventDefault();
    try {
      const url = '/api/admin/classes';
      const method = editingClass ? 'PUT' : 'POST';
      const payload = editingClass ? { ...form, id: editingClass.id } : form;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save classroom');

      showToast(editingClass ? 'Classroom details updated' : 'New classroom established');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      const res = await fetch(`/api/admin/classes?id=${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to archive classroom');

      showToast('Classroom archived');
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
            <Users className="w-4 h-4" />
            <span>Classroom Division & Capacity</span>
          </div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight">
            Active Classrooms & Batches
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure learning spaces, teacher assignments, seat limits and academic cohorts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#00A8E8] text-white font-bold text-sm shadow-md shadow-[#0F2963]/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Classroom</span>
        </button>
      </div>

      {/* Class Cards Grid */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <div className="w-8 h-8 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-500 font-medium">Loading classrooms...</p>
        </div>
      ) : classes.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Classrooms Configured</h3>
          <p className="text-xs text-slate-500 mt-1">Create your first preschool class batch above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((cls) => {
            const classStudents = students.filter((s) => s.classId === cls.id);
            const assignedTeacher = teachers.find((t) => t.id === cls.teacherId);
            const fillPercentage = Math.min(100, Math.round((classStudents.length / (cls.capacity || 15)) * 100));

            return (
              <div
                key={cls.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-50 text-[#0F2963] border border-indigo-100 uppercase tracking-wide">
                      {cls.grade}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {cls.academicYear || '2026-27'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-1">{cls.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{cls.room || 'Main Campus'}</p>

                  {/* Lead Educator */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                      {assignedTeacher ? assignedTeacher.name.charAt(0) : 'T'}
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400">Assigned Educator</div>
                      <div className="text-xs font-bold text-slate-800">
                        {assignedTeacher ? assignedTeacher.name : cls.teacherName || 'Unassigned'}
                      </div>
                    </div>
                  </div>

                  {/* Enrolment Capacity Progress */}
                  <div className="space-y-1.5 mb-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Students Enrolled</span>
                      <span className="text-[#0F2963]">
                        {classStudents.length} / {cls.capacity} seats
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          fillPercentage > 90 ? 'bg-rose-500' : fillPercentage > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 mt-4">
                  <button
                    onClick={() => openEditModal(cls)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-[#0F2963] hover:bg-slate-100 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(cls.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Archive</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete / Archive Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Archive Classroom?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Archiving this classroom will not delete student records, but will unassign the batch tag.
            </p>
            <div className="flex items-center justify-end gap-2.5 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteClass(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition"
              >
                Archive Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0F2963] text-white flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0F2963]">
                    {editingClass ? 'Edit Classroom' : 'Create New Classroom'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure grade cohort & teacher assignment</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Classroom Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pre-KG Explorers, LKG STEAM"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grade Level *</label>
                  <select
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  >
                    <option value="Toddler">Toddler</option>
                    <option value="Pre-KG">Pre-KG</option>
                    <option value="LKG">Junior KG (LKG)</option>
                    <option value="UKG">Senior KG (UKG)</option>
                    <option value="Daycare">Daycare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Student Capacity</label>
                  <input
                    type="number"
                    min="5"
                    max="30"
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Lead Educator</label>
                <select
                  value={form.teacherId}
                  onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                >
                  <option value="">Select Educator</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Room / Campus Block</label>
                  <input
                    type="text"
                    placeholder="e.g. Lotus Room 101"
                    value={form.room}
                    onChange={(e) => setForm({ ...form, room: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={form.academicYear}
                    onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#00A8E8] text-slate-800"
                  />
                </div>
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
                  {editingClass ? 'Save Changes' : 'Create Classroom'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

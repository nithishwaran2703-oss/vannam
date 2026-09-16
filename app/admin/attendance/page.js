'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Calendar,
  Filter,
  Users,
  Search,
  Check,
  X,
  Clock,
  Save,
  AlertCircle
} from 'lucide-react';
import { useAdminToast } from '../layout';

export default function AttendanceManager() {
  const { showToast } = useAdminToast();
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [statusMap, setStatusMap] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [clsRes, stdRes, attRes] = await Promise.all([
        fetch('/api/admin/classes'),
        fetch('/api/admin/students'),
        fetch(`/api/admin/attendance?date=${selectedDate}`)
      ]);

      const [clsData, stdData, attData] = await Promise.all([
        clsRes.json(),
        stdRes.json(),
        attRes.json()
      ]);

      setClasses(clsData.classes || []);
      if (!selectedClassId && clsData.classes && clsData.classes.length > 0) {
        setSelectedClassId(clsData.classes[0].id);
      }
      setStudents(stdData.students || []);
      setAttendance(attData.attendance || []);

      // Build status map
      const map = {};
      (attData.attendance || []).forEach((item) => {
        map[item.studentId] = item.status;
      });
      setStatusMap(map);
    } catch {
      showToast('Failed to load attendance records', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleStatusChange = (studentId, status) => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = async () => {
    try {
      setSaving(true);
      const classStudents = students.filter((s) => !selectedClassId || s.classId === selectedClassId);
      const payload = classStudents.map((s) => ({
        studentId: s.id,
        studentName: s.name,
        classId: s.classId,
        date: selectedDate,
        status: statusMap[s.id] || 'PRESENT'
      }));

      const res = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save attendance');
      showToast('Daily attendance saved successfully');
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const classStudents = students.filter((s) => !selectedClassId || s.classId === selectedClassId);

  const presentCount = classStudents.filter((s) => (statusMap[s.id] || 'PRESENT') === 'PRESENT').length;
  const absentCount = classStudents.filter((s) => statusMap[s.id] === 'ABSENT').length;
  const lateCount = classStudents.filter((s) => statusMap[s.id] === 'LATE').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8] uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Attendance Registers</span>
          </div>
          <h1 className="text-2xl font-black text-[#0F2963] tracking-tight">
            Daily Student Attendance
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Log, verify and audit classroom attendance records with 1-click status toggles.
          </p>
        </div>

        <button
          onClick={handleSaveAttendance}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2963] hover:bg-[#00A8E8] text-white font-bold text-sm shadow-md shadow-[#0F2963]/10 transition disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Attendance Register'}</span>
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 border border-emerald-200/60 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-800">Present Today</div>
            <div className="text-2xl font-black text-emerald-900 mt-0.5">{presentCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-rose-50 border border-rose-200/60 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-rose-800">Absent</div>
            <div className="text-2xl font-black text-rose-900 mt-0.5">{absentCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <X className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200/60 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-800">Late Arrivals</div>
            <div className="text-2xl font-black text-amber-900 mt-0.5">{lateCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Date & Classroom Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-white p-3.5 border border-slate-200 rounded-2xl">
          <Calendar className="w-5 h-5 text-[#0F2963]" />
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase">Selected Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="font-bold text-sm text-slate-800 bg-transparent focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3.5 border border-slate-200 rounded-2xl">
          <Users className="w-5 h-5 text-[#00A8E8]" />
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase">Classroom Batch</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="font-bold text-sm text-slate-800 bg-transparent focus:outline-none w-full"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.grade})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student Attendance List */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <div className="w-8 h-8 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-500 font-medium">Loading attendance roster...</p>
        </div>
      ) : classStudents.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No students enrolled in this class</h3>
          <p className="text-xs text-slate-500 mt-1">Enroll students to start tracking daily attendance.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {classStudents.map((student) => {
              const currentStatus = statusMap[student.id] || 'PRESENT';

              return (
                <div
                  key={student.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0 flex items-center justify-center font-black text-slate-600 text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{student.name}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        {student.studentId} • Parent: {student.parentName || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* 3-State Toggle Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'PRESENT')}
                      className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        currentStatus === 'PRESENT'
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Present</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'ABSENT')}
                      className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        currentStatus === 'ABSENT'
                          ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Absent</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'LATE')}
                      className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        currentStatus === 'LATE'
                          ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Late</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

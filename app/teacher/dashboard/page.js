'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Sparkles,
  FileCheck2,
  Plus,
  Clock,
  Calendar,
  LogOut,
  ChevronRight,
  Search,
  Check,
  X,
  Camera,
  Heart,
  BookOpen,
  Phone,
  AlertCircle
} from 'lucide-react';
import { broadcastAdminUpdate } from '@/lib/sync';

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('attendance'); // attendance, activities, homework, students
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [homeworkList, setHomeworkList] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [toast, setToast] = useState('');

  // Activity Form Modal State
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedStudentForActivity, setSelectedStudentForActivity] = useState('');
  const [activityForm, setActivityForm] = useState({
    title: '',
    category: 'Art & Sensory',
    description: '',
    photoUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80'
  });

  // Homework Form Modal State
  const [isHwModalOpen, setIsHwModalOpen] = useState(false);
  const [hwForm, setHwForm] = useState({
    title: '',
    subject: 'Cognitive Discovery',
    description: '',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    materials: 'Montessori Activity Sheet'
  });

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Check auth session
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('vannam_teacher_user') : null;
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      router.push('/teacher/login');
    }
  }, [router]);

  // Load classroom and student data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [clsRes, stdRes, actRes, hwRes, attRes] = await Promise.all([
        fetch('/api/admin/classes'),
        fetch('/api/admin/students'),
        fetch('/api/admin/activities'),
        fetch('/api/admin/homework'),
        fetch(`/api/admin/attendance?date=${selectedDate}`)
      ]);

      const [clsData, stdData, actData, hwData, attData] = await Promise.all([
        clsRes.json(),
        stdRes.json(),
        actRes.json(),
        hwRes.json(),
        attRes.json()
      ]);

      const allClasses = clsData.classes || [];
      setClasses(allClasses);
      if (!selectedClassId && allClasses.length > 0) {
        setSelectedClassId(allClasses[0].id);
      }

      setStudents(stdData.students || []);
      setActivities(actData.activities || []);
      setHomeworkList(hwData.homework || []);

      // Build attendance map
      const map = {};
      (attData.attendance || []).forEach((item) => {
        map[item.studentId] = item.status;
      });
      setStatusMap(map);
    } catch {
      showToastMsg('Failed to load classroom records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vannam_teacher_user');
    }
    router.push('/teacher/login');
  };

  // Quick Attendance status change
  const handleAttendanceChange = async (studentId, status) => {
    const nextMap = { ...statusMap, [studentId]: status };
    setStatusMap(nextMap);

    const student = students.find((s) => s.id === studentId);

    try {
      await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          studentName: student ? student.name : '',
          classId: selectedClassId,
          date: selectedDate,
          status
        })
      });
      showToastMsg(`Attendance marked as ${status}`);
      broadcastAdminUpdate('attendance');
    } catch {
      showToastMsg('Error saving attendance');
    }
  };

  // Post Activity Form Submit
  const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
      const student = students.find((s) => s.id === selectedStudentForActivity);
      const currentClass = classes.find((c) => c.id === selectedClassId);

      const res = await fetch('/api/admin/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: activityForm.title,
          category: activityForm.category,
          description: activityForm.description,
          date: selectedDate,
          classId: selectedClassId,
          className: currentClass ? currentClass.name : '',
          studentId: selectedStudentForActivity || null,
          studentName: student ? student.name : 'Entire Class',
          teacherId: user?.teacherId || null,
          teacherName: user?.name || 'Educator',
          photos: activityForm.photoUrl ? [activityForm.photoUrl] : []
        })
      });

      if (!res.ok) throw new Error('Failed to post activity');
      showToastMsg('Activity logged successfully!');
      broadcastAdminUpdate('activities');
      setIsActivityModalOpen(false);
      setActivityForm({
        title: '',
        category: 'Art & Sensory',
        description: '',
        photoUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80'
      });
      fetchData();
    } catch (err) {
      showToastMsg(err.message);
    }
  };

  // Post Homework Submit
  const handleCreateHomework = async (e) => {
    e.preventDefault();
    try {
      const currentClass = classes.find((c) => c.id === selectedClassId);

      const res = await fetch('/api/admin/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: hwForm.title,
          subject: hwForm.subject,
          description: hwForm.description,
          classId: selectedClassId,
          className: currentClass ? currentClass.name : 'Assigned Class',
          teacherId: user?.teacherId || '',
          teacherName: user?.name || 'Educator',
          dueDate: hwForm.dueDate,
          materials: hwForm.materials,
          status: 'ASSIGNED'
        })
      });

      if (!res.ok) throw new Error('Failed to assign homework');
      showToastMsg('Homework assigned to classroom!');
      broadcastAdminUpdate('homework');
      setIsHwModalOpen(false);
      setHwForm({
        title: '',
        subject: 'Cognitive Discovery',
        description: '',
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        materials: 'Montessori Activity Sheet'
      });
      fetchData();
    } catch (err) {
      showToastMsg(err.message);
    }
  };

  const assignedStudents = students.filter(
    (s) => !selectedClassId || s.classId === selectedClassId
  );

  const assignedActivities = activities.filter(
    (a) => !selectedClassId || a.classId === selectedClassId
  );

  const assignedHomework = homeworkList.filter(
    (h) => !selectedClassId || h.classId === selectedClassId
  );

  const presentCount = assignedStudents.filter(
    (s) => (statusMap[s.id] || 'PRESENT') === 'PRESENT'
  ).length;

  return (
    <div className="min-h-screen bg-[#070B19] text-white flex flex-col antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-cyan-600 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-cyan-400/40 animate-in slide-in-from-top-2">
          {toast}
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0B132B]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 px-2.5 bg-white rounded-xl flex items-center justify-center border border-white/20 shadow-xs">
            <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-white flex items-center gap-2">
              <span>{user?.name || 'Educator Portal'}</span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] uppercase font-mono">
                Teacher
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Vannam World Preschool</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 transition hidden sm:inline-block"
          >
            Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-rose-300 hover:text-white px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
        {/* Class Selection & Today's Metric Banner */}
        <div className="bg-gradient-to-r from-[#0F2963] via-[#0B1E48] to-[#070B19] p-6 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Assigned Classroom Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Daily Classroom Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              1-tap attendance registers, instantaneous learning milestone logs with photos, and daily parent homework alerts.
            </p>
          </div>

          {/* Quick Classroom Selector & Today's Attendance Counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <div className="text-[11px] font-bold text-slate-400 uppercase mb-1">Select Classroom</div>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer pr-4"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id} className="bg-slate-900 text-white">
                    {cls.name} ({cls.grade})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-emerald-500/20 border border-emerald-500/30 p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-emerald-300 uppercase">Present Today</div>
                <div className="text-lg font-black text-white">
                  {presentCount} / {assignedStudents.length} Students
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'attendance'
                ? 'bg-[#00A8E8] text-white shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'activities'
                ? 'bg-[#00A8E8] text-white shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Log Daily Activities ({assignedActivities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('homework')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'homework'
                ? 'bg-[#00A8E8] text-white shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Assigned Tasks & Homework ({assignedHomework.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'students'
                ? 'bg-[#00A8E8] text-white shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Class Roster ({assignedStudents.length})</span>
          </button>
        </div>

        {/* TAB 1: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Attendance Date</div>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-white font-bold text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Tap Present, Absent or Late to instantly update attendance.
              </div>
            </div>

            {assignedStudents.length === 0 ? (
              <div className="p-12 text-center bg-white/5 rounded-3xl border border-white/10">
                <Users className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No students in this classroom</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedStudents.map((std) => {
                  const currentStatus = statusMap[std.id] || 'PRESENT';

                  return (
                    <div
                      key={std.id}
                      className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-sm shrink-0 border border-cyan-500/30">
                          {std.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-sm truncate">{std.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {std.studentId} • Blood: {std.bloodGroup || 'N/A'}
                          </div>
                        </div>
                      </div>

                      {/* 1-Tap Toggle buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleAttendanceChange(std.id, 'PRESENT')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                            currentStatus === 'PRESENT'
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Present</span>
                        </button>

                        <button
                          onClick={() => handleAttendanceChange(std.id, 'ABSENT')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                            currentStatus === 'ABSENT'
                              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Absent</span>
                        </button>

                        <button
                          onClick={() => handleAttendanceChange(std.id, 'LATE')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                            currentStatus === 'LATE'
                              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                              : 'bg-white/5 text-slate-400 hover:text-white'
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
            )}
          </div>
        )}

        {/* TAB 2: ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Classroom Activity Moments</h3>
                <p className="text-xs text-slate-400">Recorded photo updates visible in Parent Portal</p>
              </div>
              <button
                onClick={() => {
                  setSelectedStudentForActivity('');
                  setIsActivityModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A8E8] to-[#0F2963] hover:from-cyan-400 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Activity</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {assignedActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {act.photos && act.photos.length > 0 && (
                      <div className="relative h-44 w-full bg-slate-900">
                        <Image src={act.photos[0]} alt={act.title} fill className="object-cover" />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                          {act.category}
                        </div>
                      </div>
                    )}

                    <div className="p-4">
                      <div className="text-[11px] font-bold text-cyan-400 mb-1">
                        {act.studentName || 'Class Activity'} • {act.date}
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 leading-snug">{act.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{act.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HOMEWORK */}
        {activeTab === 'homework' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Daily Exploration Tasks & Homework</h3>
                <p className="text-xs text-slate-400">Classroom worksheets and home discovery challenges</p>
              </div>
              <button
                onClick={() => setIsHwModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A8E8] to-[#0F2963] hover:from-cyan-400 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Assign New Task</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {assignedHomework.map((hw) => (
                <div key={hw.id} className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {hw.subject}
                    </span>
                    <span className="text-rose-400 font-bold">Due: {hw.dueDate}</span>
                  </div>

                  <h4 className="text-base font-bold text-white">{hw.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{hw.description}</p>

                  {hw.materials && (
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400">
                      Materials: <span className="text-white font-medium">{hw.materials}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLASS ROSTER */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Assigned Classroom Students</h3>
                <p className="text-xs text-slate-400">Student information, emergency contact & parent details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedStudents.map((std) => (
                <div key={std.id} className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-base border border-cyan-500/30">
                      {std.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">{std.name}</div>
                      <div className="text-xs text-cyan-400 font-mono">{std.studentId} • {std.gender}</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                    <div className="text-slate-300">
                      Parent: <strong className="text-white">{std.parentName || 'N/A'}</strong>
                    </div>
                    <div className="text-slate-300 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Phone: {std.parentPhone || 'N/A'}</span>
                    </div>
                    <div className="text-slate-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Blood: {std.bloodGroup || 'N/A'} • Allergies: {std.allergies || 'None'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStudentForActivity(std.id);
                      setIsActivityModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-cyan-500/20 hover:text-cyan-300 text-xs font-bold text-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Log Individual Activity</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Post Activity Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B132B] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-cyan-400" />
                <span>Log Child Activity</span>
              </h3>
              <button
                onClick={() => setIsActivityModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Student</label>
                <select
                  value={selectedStudentForActivity}
                  onChange={(e) => setSelectedStudentForActivity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="" className="bg-slate-900">Entire Class</option>
                  {assignedStudents.map((s) => (
                    <option key={s.id} value={s.id} className="bg-slate-900">
                      {s.name} ({s.studentId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Finger Painting & Leaf Observation"
                  value={activityForm.title}
                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={activityForm.category}
                  onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="Art & Sensory" className="bg-slate-900">Art & Sensory</option>
                  <option value="Montessori Math" className="bg-slate-900">Montessori Math</option>
                  <option value="Language & Phonics" className="bg-slate-900">Language & Phonics</option>
                  <option value="Junior STEAM" className="bg-slate-900">Junior STEAM</option>
                  <option value="Physical Agility" className="bg-slate-900">Physical Agility</option>
                  <option value="Nutrition & Meal" className="bg-slate-900">Nutrition & Meal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Observation Notes *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe engagement, motor skills, milestone achievements..."
                  value={activityForm.description}
                  onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Activity Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={activityForm.photoUrl}
                  onChange={(e) => setActivityForm({ ...activityForm, photoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00A8E8] hover:bg-cyan-400 text-white shadow-lg transition cursor-pointer"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Homework Modal */}
      {isHwModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B132B] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-cyan-400" />
                <span>Assign Classroom Homework</span>
              </h3>
              <button
                onClick={() => setIsHwModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHomework} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tactile Number Tracing (1-10)"
                  value={hwForm.title}
                  onChange={(e) => setHwForm({ ...hwForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subject</label>
                  <select
                    value={hwForm.subject}
                    onChange={(e) => setHwForm({ ...hwForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="Cognitive Discovery" className="bg-slate-900">Cognitive Discovery</option>
                    <option value="Language & Phonics" className="bg-slate-900">Language & Phonics</option>
                    <option value="Math & Counting" className="bg-slate-900">Math & Counting</option>
                    <option value="Junior STEAM" className="bg-slate-900">Junior STEAM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={hwForm.dueDate}
                    onChange={(e) => setHwForm({ ...hwForm, dueDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Instructions *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Activity steps for parents to guide their child..."
                  value={hwForm.description}
                  onChange={(e) => setHwForm({ ...hwForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Materials / Worksheets</label>
                <input
                  type="text"
                  placeholder="e.g. Worksheet Page 4, Tactile Number Chart"
                  value={hwForm.materials}
                  onChange={(e) => setHwForm({ ...hwForm, materials: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsHwModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00A8E8] hover:bg-cyan-400 text-white shadow-lg transition cursor-pointer"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

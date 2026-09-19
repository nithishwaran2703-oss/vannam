import { NextResponse } from 'next/server';
import { getStore } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const store = getStore();
    const students = store.students || [];
    const activities = store.activities || [];
    const attendance = store.attendance || [];
    const homework = store.homework || [];
    const teachers = store.teachers || [];
    const today = new Date().toISOString().split('T')[0];

    const { searchParams } = new URL(request.url);
    const studentQuery = searchParams.get('studentId') || searchParams.get('email');

    // Build childrenData dictionary keyed by student.id
    const childrenMap = {};

    students.forEach((student, index) => {
      // Find activities for this student OR for their whole class
      const studentActivities = activities.filter(
        (a) => a.studentId === student.id || a.classId === student.classId || !a.studentId
      );

      // Find homework for their class
      const studentHomework = homework.filter(
        (h) => h.classId === student.classId || !h.classId
      );

      // Calculate attendance statistics
      const studentAttRecords = attendance.filter((att) => att.studentId === student.id);
      const presentCount = studentAttRecords.filter((r) => r.status === 'PRESENT').length;
      const totalAtt = studentAttRecords.length;
      const attPercent = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 98;

      const todayAttRecord = studentAttRecords.find((r) => r.date === today);

      // Teacher details
      const teacherObj = teachers.find(
        (t) => t.id === student.teacherId || t.name === student.teacherName
      );

      const latestActivity = studentActivities[0];

      // Homework completion calculation
      const completedHwCount = studentHomework.filter((h) => h.status === 'COMPLETED').length;
      const hwTotal = studentHomework.length;
      const hwPercent = hwTotal > 0 ? Math.round((completedHwCount / hwTotal) * 100) : 90;

      const childId = student.id;

      childrenMap[childId] = {
        id: childId,
        studentId: student.studentId,
        name: student.name,
        gender: student.gender || 'Boy',
        avatarEmoji: student.gender === 'Girl' ? '👧' : '👦',
        avatarBg:
          student.gender === 'Girl'
            ? 'from-amber-400 to-rose-400'
            : index % 2 === 0
            ? 'from-cyan-400 to-blue-500'
            : 'from-emerald-400 to-teal-500',
        grade: student.className || 'Preschool Group',
        classId: student.classId,
        campusId: student.studentId,
        teacher: student.teacherName || 'Lead Educator',
        attendance: `${attPercent}%`,
        todayStatus: todayAttRecord ? todayAttRecord.status : 'PRESENT',
        overallProgress: Math.min(96, 80 + (index * 4)),
        homeworkCompletion: hwPercent,
        insight: latestActivity
          ? `Remarkable progress in ${latestActivity.category || 'Montessori Play'}: ${latestActivity.title}`
          : `Joyful exploration and social milestones blooming this week!`,
        parentName: student.parentName,
        parentEmail: student.parentEmail,
        parentPhone: student.parentPhone,
        photo: student.photo,
        activities: studentActivities.map((act) => ({
          id: act.id,
          time: act.createdAt ? new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:00 AM',
          title: act.title,
          subject: act.category || 'Montessori Discovery',
          status: 'completed',
          icon: act.category?.includes('Art') ? '🎨' : act.category?.includes('STEAM') ? '🔬' : act.category?.includes('Math') ? '📐' : '🌿',
          teacherNote: act.description,
          photos: act.photos || []
        })),
        homework: studentHomework.map((hw) => ({
          id: hw.id,
          subject: hw.subject || 'General Discovery',
          title: hw.title,
          teacher: hw.teacherName || student.teacherName || 'Class Educator',
          dueDate: hw.dueDate || 'Tomorrow',
          status: hw.status === 'COMPLETED' ? 'completed' : 'in-progress',
          priority: hw.status === 'COMPLETED' ? 'Completed' : 'High Priority',
          priorityColor:
            hw.status === 'COMPLETED'
              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
              : 'bg-rose-100 text-rose-700 border-rose-200',
          progress: hw.status === 'COMPLETED' ? 100 : 50,
          description: hw.description,
          materials: hw.materials ? [hw.materials] : ['Montessori Worksheet']
        })),
        teacherFeedback: {
          teacher: student.teacherName || 'Teacher Sarah Jenkins',
          date: latestActivity?.date ? `Logged on ${latestActivity.date}` : 'Today at 11:30 AM',
          avatar: teacherObj?.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
          message: latestActivity
            ? `${student.name} did exceptionally well: ${latestActivity.description}`
            : `${student.name} was joyful, collaborative, and engaged with peer activities today!`
        }
      };
    });

    return NextResponse.json({
      success: true,
      studentsCount: students.length,
      childrenData: childrenMap,
      studentsList: students.map((s) => ({
        id: s.id,
        studentId: s.studentId,
        name: s.name,
        parentName: s.parentName,
        parentEmail: s.parentEmail,
        parentPhone: s.parentPhone,
        className: s.className,
        teacherName: s.teacherName
      }))
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error in portal data API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

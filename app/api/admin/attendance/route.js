import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const classId = searchParams.get('classId');
    const studentId = searchParams.get('studentId');

    const store = getStore();
    let records = store.attendance || [];

    if (date) {
      records = records.filter(r => r.date === date);
    }
    if (classId) {
      records = records.filter(r => r.classId === classId);
    }
    if (studentId) {
      records = records.filter(r => r.studentId === studentId);
    }

    return NextResponse.json({
      success: true,
      count: records.length,
      attendance: records
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const store = getStore();

    // Support both single record and batch array submission
    const recordsToInsert = Array.isArray(body) ? body : [body];
    const today = new Date().toISOString().split('T')[0];

    for (const item of recordsToInsert) {
      if (!item.studentId) continue;

      const recordDate = item.date || today;
      const existingIndex = (store.attendance || []).findIndex(
        a => a.studentId === item.studentId && a.date === recordDate
      );

      const recordData = {
        id: existingIndex >= 0 ? store.attendance[existingIndex].id : `att-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        studentId: item.studentId,
        studentName: item.studentName || '',
        classId: item.classId || '',
        teacherId: item.teacherId || '',
        date: recordDate,
        status: item.status || 'PRESENT',
        remarks: item.remarks || '',
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        store.attendance[existingIndex] = recordData;
      } else {
        store.attendance = [recordData, ...(store.attendance || [])];
      }
    }

    saveStore(store, {
      action: 'Mark Attendance',
      resource: 'Attendance',
      details: `Logged daily attendance records (${recordsToInsert.length} students)`
    });

    return NextResponse.json({ success: true, message: 'Attendance recorded successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to record attendance' }, { status: 500 });
  }
}

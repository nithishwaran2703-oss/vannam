import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const teacherId = searchParams.get('teacherId');
    const search = searchParams.get('search')?.toLowerCase();

    const store = getStore();
    let students = store.students || [];

    // Filter by class
    if (classId) {
      students = students.filter(s => s.classId === classId);
    }

    // Filter by teacher
    if (teacherId) {
      students = students.filter(s => s.teacherId === teacherId);
    }

    // Filter by search query
    if (search) {
      students = students.filter(
        s =>
          s.name?.toLowerCase().includes(search) ||
          s.studentId?.toLowerCase().includes(search) ||
          s.parentName?.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      count: students.length,
      students
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const store = getStore();

    if (!body.name || !body.classId) {
      return NextResponse.json({ error: 'Student name and class assignment are required' }, { status: 400 });
    }

    const assignedClass = (store.classes || []).find(c => c.id === body.classId);

    const newStudent = {
      id: `std-${Date.now()}`,
      studentId: body.studentId || `VW-${new Date().getFullYear()}-${String((store.students || []).length + 1).padStart(3, '0')}`,
      name: body.name.trim(),
      dob: body.dob || '',
      gender: body.gender || 'Boy',
      classId: body.classId,
      className: assignedClass ? assignedClass.name : 'Unassigned',
      teacherId: assignedClass ? assignedClass.teacherId : body.teacherId || '',
      teacherName: assignedClass ? assignedClass.teacherName : '',
      parentName: body.parentName || '',
      parentEmail: body.parentEmail || '',
      parentPhone: body.parentPhone || '',
      emergencyContact: body.emergencyContact || body.parentPhone || '',
      bloodGroup: body.bloodGroup || '',
      allergies: body.allergies || 'None',
      status: body.status || 'Active',
      enrollmentDate: body.enrollmentDate || new Date().toISOString().split('T')[0],
      photo: body.photo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80',
      createdAt: new Date().toISOString()
    };

    store.students = [newStudent, ...(store.students || [])];

    saveStore(store, {
      action: 'Create Student',
      resource: 'Students',
      details: `Enrolled new student: ${newStudent.name} (${newStudent.studentId}) in ${newStudent.className}`
    });

    return NextResponse.json({ success: true, student: newStudent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to create student' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const store = getStore();
    const index = (store.students || []).findIndex(s => s.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Update class info if classId changed
    if (updates.classId && updates.classId !== store.students[index].classId) {
      const assignedClass = (store.classes || []).find(c => c.id === updates.classId);
      if (assignedClass) {
        updates.className = assignedClass.name;
        updates.teacherId = assignedClass.teacherId;
        updates.teacherName = assignedClass.teacherName;
      }
    }

    store.students[index] = {
      ...store.students[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    saveStore(store, {
      action: 'Update Student',
      resource: 'Students',
      details: `Updated record for student: ${store.students[index].name}`
    });

    return NextResponse.json({ success: true, student: store.students[index] });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const store = getStore();
    const student = (store.students || []).find(s => s.id === id);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    store.students = (store.students || []).filter(s => s.id !== id);

    saveStore(store, {
      action: 'Archive Student',
      resource: 'Students',
      details: `Archived student record: ${student.name} (${student.studentId})`
    });

    return NextResponse.json({ success: true, message: 'Student archived successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete student' }, { status: 500 });
  }
}

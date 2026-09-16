import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET() {
  try {
    const store = getStore();
    const classes = store.classes || [];
    return NextResponse.json({ success: true, count: classes.length, classes });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch classes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const store = getStore();

    if (!body.name || !body.grade) {
      return NextResponse.json({ error: 'Class name and grade level are required' }, { status: 400 });
    }

    const assignedTeacher = (store.teachers || []).find(t => t.id === body.teacherId);

    const newClass = {
      id: body.id || `class-${Date.now()}`,
      name: body.name.trim(),
      grade: body.grade,
      room: body.room || 'Main Block',
      capacity: Number(body.capacity) || 15,
      teacherId: body.teacherId || '',
      teacherName: assignedTeacher ? assignedTeacher.name : 'Unassigned',
      academicYear: body.academicYear || '2026-27',
      createdAt: new Date().toISOString()
    };

    store.classes = [newClass, ...(store.classes || [])];

    saveStore(store, {
      action: 'Create Class',
      resource: 'Classes',
      details: `Created new classroom: ${newClass.name} (${newClass.grade})`
    });

    return NextResponse.json({ success: true, class: newClass }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to create class' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Class ID is required' }, { status: 400 });
    }

    const store = getStore();
    const index = (store.classes || []).findIndex(c => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    if (updates.teacherId) {
      const assignedTeacher = (store.teachers || []).find(t => t.id === updates.teacherId);
      if (assignedTeacher) {
        updates.teacherName = assignedTeacher.name;
      }
    }

    store.classes[index] = {
      ...store.classes[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    saveStore(store, {
      action: 'Update Class',
      resource: 'Classes',
      details: `Updated class details: ${store.classes[index].name}`
    });

    return NextResponse.json({ success: true, class: store.classes[index] });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update class' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Class ID is required' }, { status: 400 });
    }

    const store = getStore();
    const classItem = (store.classes || []).find(c => c.id === id);

    if (!classItem) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    store.classes = (store.classes || []).filter(c => c.id !== id);

    saveStore(store, {
      action: 'Delete Class',
      resource: 'Classes',
      details: `Archived class: ${classItem.name}`
    });

    return NextResponse.json({ success: true, message: 'Class archived successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete class' }, { status: 500 });
  }
}

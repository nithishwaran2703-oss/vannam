import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const teacherId = searchParams.get('teacherId');

    const store = getStore();
    let homeworkList = store.homework || [];

    if (classId) {
      homeworkList = homeworkList.filter(h => h.classId === classId);
    }
    if (teacherId) {
      homeworkList = homeworkList.filter(h => h.teacherId === teacherId);
    }

    return NextResponse.json({
      success: true,
      count: homeworkList.length,
      homework: homeworkList
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch homework' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const store = getStore();

    if (!body.title || !body.classId) {
      return NextResponse.json({ error: 'Homework title and target class are required' }, { status: 400 });
    }

    const assignedClass = (store.classes || []).find(c => c.id === body.classId);

    const newHomework = {
      id: `hw-${Date.now()}`,
      title: body.title.trim(),
      subject: body.subject || 'Activity Practice',
      description: body.description || '',
      classId: body.classId,
      className: assignedClass ? assignedClass.name : 'All Classes',
      teacherId: body.teacherId || '',
      teacherName: body.teacherName || (assignedClass ? assignedClass.teacherName : 'Educator'),
      dueDate: body.dueDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      status: body.status || 'ASSIGNED',
      materials: body.materials || '',
      createdAt: new Date().toISOString()
    };

    store.homework = [newHomework, ...(store.homework || [])];

    saveStore(store, {
      action: 'Assign Homework',
      resource: 'Homework',
      details: `Created task "${newHomework.title}" for ${newHomework.className}`
    });

    return NextResponse.json({ success: true, homework: newHomework }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to create homework' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Homework ID is required' }, { status: 400 });
    }

    const store = getStore();
    const index = (store.homework || []).findIndex(h => h.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Homework not found' }, { status: 404 });
    }

    store.homework[index] = {
      ...store.homework[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    saveStore(store, {
      action: 'Update Homework',
      resource: 'Homework',
      details: `Updated task "${store.homework[index].title}"`
    });

    return NextResponse.json({ success: true, homework: store.homework[index] });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update homework' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Homework ID is required' }, { status: 400 });
    }

    const store = getStore();
    const hw = (store.homework || []).find(h => h.id === id);

    if (!hw) {
      return NextResponse.json({ error: 'Homework not found' }, { status: 404 });
    }

    store.homework = (store.homework || []).filter(h => h.id !== id);

    saveStore(store, {
      action: 'Delete Homework',
      resource: 'Homework',
      details: `Deleted task "${hw.title}"`
    });

    return NextResponse.json({ success: true, message: 'Homework removed successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete homework' }, { status: 500 });
  }
}

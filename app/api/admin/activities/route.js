import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const classId = searchParams.get('classId');
    const teacherId = searchParams.get('teacherId');
    const date = searchParams.get('date');

    const store = getStore();
    let activities = store.activities || [];

    if (studentId) {
      activities = activities.filter(a => a.studentId === studentId);
    }
    if (classId) {
      activities = activities.filter(a => a.classId === classId);
    }
    if (teacherId) {
      activities = activities.filter(a => a.teacherId === teacherId);
    }
    if (date) {
      activities = activities.filter(a => a.date === date);
    }

    return NextResponse.json({
      success: true,
      count: activities.length,
      activities
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch activities' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const store = getStore();

    if (!body.title || !body.description) {
      return NextResponse.json({ error: 'Activity title and description are required' }, { status: 400 });
    }

    let studentName = body.studentName;
    let className = body.className;
    let teacherName = body.teacherName;

    if (body.studentId && !studentName) {
      const student = (store.students || []).find(s => s.id === body.studentId);
      if (student) {
        studentName = student.name;
        className = className || student.className;
      }
    }

    if (body.classId && !className) {
      const cls = (store.classes || []).find(c => c.id === body.classId);
      if (cls) className = cls.name;
    }

    if (body.teacherId && !teacherName) {
      const tch = (store.teachers || []).find(t => t.id === body.teacherId);
      if (tch) teacherName = tch.name;
    }

    const newActivity = {
      id: `act-${Date.now()}`,
      title: body.title.trim(),
      category: body.category || 'Play & Discovery',
      description: body.description.trim(),
      date: body.date || new Date().toISOString().split('T')[0],
      studentId: body.studentId || null,
      studentName: studentName || 'Entire Class',
      classId: body.classId || null,
      className: className || 'General',
      teacherId: body.teacherId || null,
      teacherName: teacherName || 'Educator',
      photos: Array.isArray(body.photos) ? body.photos : (body.photos ? [body.photos] : []),
      createdAt: new Date().toISOString()
    };

    store.activities = [newActivity, ...(store.activities || [])];

    saveStore(store, {
      action: 'Post Student Activity',
      resource: 'Activities',
      details: `Logged activity "${newActivity.title}" for ${newActivity.studentName}`
    });

    // Sync to Neon PostgreSQL
    try {
      await pool.query(`
        INSERT INTO activities (
          id, student_id, student_name, class_id, class_name, teacher_id, teacher_name,
          title, category, description, date, photos, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO NOTHING;
      `, [
        newActivity.id, newActivity.studentId, newActivity.studentName,
        newActivity.classId, newActivity.className, newActivity.teacherId, newActivity.teacherName,
        newActivity.title, newActivity.category, newActivity.description,
        newActivity.date, JSON.stringify(newActivity.photos), new Date()
      ]);
    } catch (neonErr) {
      console.warn("Neon sync note (POST activity):", neonErr.message);
    }

    return NextResponse.json({ success: true, activity: newActivity }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to create activity' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 });
    }

    const store = getStore();
    const index = (store.activities || []).findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    store.activities[index] = {
      ...store.activities[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    saveStore(store, {
      action: 'Update Activity',
      resource: 'Activities',
      details: `Updated activity "${store.activities[index].title}"`
    });

    // Sync to Neon PostgreSQL
    try {
      const act = store.activities[index];
      await pool.query(`
        UPDATE activities SET
          title = $1, category = $2, description = $3, date = $4, photos = $5
        WHERE id = $6;
      `, [act.title, act.category, act.description, act.date, JSON.stringify(act.photos || []), id]);
    } catch (neonErr) {
      console.warn("Neon sync note (PUT activity):", neonErr.message);
    }

    return NextResponse.json({ success: true, activity: store.activities[index] });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update activity' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 });
    }

    const store = getStore();
    const act = (store.activities || []).find(a => a.id === id);

    if (!act) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    store.activities = (store.activities || []).filter(a => a.id !== id);

    saveStore(store, {
      action: 'Delete Activity',
      resource: 'Activities',
      details: `Removed activity: "${act.title}"`
    });

    // Sync to Neon PostgreSQL
    try {
      await pool.query('DELETE FROM activities WHERE id = $1;', [id]);
    } catch (neonErr) {
      console.warn("Neon sync note (DELETE activity):", neonErr.message);
    }

    return NextResponse.json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete activity' }, { status: 500 });
  }
}

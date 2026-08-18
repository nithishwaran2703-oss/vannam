import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET() {
  const store = getStore();
  return NextResponse.json({ success: true, teachers: store.teachers || [] });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, experience, qualifications, bio, image, email, user } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and Role are required' }, { status: 400 });
    }

    const store = getStore();
    const newTeacher = {
      id: `teacher-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      experience: experience || '5+ Years',
      qualifications: qualifications || 'Montessori Certified',
      bio: bio || '',
      image: image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      active: true,
      email: email || ''
    };

    store.teachers = [...(store.teachers || []), newTeacher];
    saveStore(store, {
      action: 'Added Educator',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Faculty',
      details: `Added educator profile for ${name}`
    });

    return NextResponse.json({ success: true, teacher: newTeacher, message: 'Teacher added successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, updates, user } = body;

    const store = getStore();
    const index = (store.teachers || []).findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    store.teachers[index] = { ...store.teachers[index], ...updates };

    saveStore(store, {
      action: 'Updated Educator',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Faculty',
      details: `Updated educator ${store.teachers[index].name}`
    });

    return NextResponse.json({ success: true, teacher: store.teachers[index], message: 'Teacher updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const store = getStore();
    const teacher = (store.teachers || []).find((t) => t.id === id);
    store.teachers = (store.teachers || []).filter((t) => t.id !== id);

    saveStore(store, {
      action: 'Deleted Educator',
      userId: 'usr-1',
      userName: 'Administrator',
      resource: 'Faculty',
      details: `Deleted educator ${teacher ? teacher.name : id}`
    });

    return NextResponse.json({ success: true, message: 'Teacher deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

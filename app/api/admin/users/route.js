import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET() {
  const store = getStore();
  const safeUsers = (store.users || []).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatar: u.avatar,
    lastLogin: u.lastLogin
  }));
  return NextResponse.json({ success: true, users: safeUsers });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role, avatar, user } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const store = getStore();
    const existing = (store.users || []).find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      role: role || 'content_manager',
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
      lastLogin: null
    };

    store.users = [...(store.users || []), newUser];
    saveStore(store, {
      action: 'Created Admin User',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Users',
      details: `Created new admin user: ${name} (${role})`
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      },
      message: 'Admin user created successfully'
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

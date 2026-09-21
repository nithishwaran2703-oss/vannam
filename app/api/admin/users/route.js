import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';
import pool from '@/lib/db';

export async function GET() {
  const store = getStore();
  const safeUsers = (store.users || []).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    password: u.password,
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

    // Sync to Neon PostgreSQL
    try {
      await pool.query(`
        INSERT INTO users (id, name, email, password, role, avatar, last_login)
        VALUES ($1, $2, $3, $4, $5, $6, NULL)
        ON CONFLICT (id) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role;
      `, [newUser.id, newUser.name, newUser.email, newUser.password, newUser.role, newUser.avatar]);
    } catch (neonErr) {
      console.warn("Neon sync note (POST user):", neonErr.message);
    }

    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, email, password, role, avatar, user } = body;

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const store = getStore();
    const index = (store.users || []).findIndex(u => u.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (name) store.users[index].name = name.trim();
    if (email) store.users[index].email = email.trim().toLowerCase();
    if (password) store.users[index].password = password.trim();
    if (role) store.users[index].role = role;
    if (avatar) store.users[index].avatar = avatar;

    saveStore(store, {
      action: 'Updated User Credentials',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Users',
      details: `Updated credentials for user ${store.users[index].name} (${store.users[index].email})`
    });

    // Sync to Neon PostgreSQL
    try {
      const u = store.users[index];
      await pool.query(`
        UPDATE users SET
          name = $1, email = $2, password = $3, role = $4, avatar = $5
        WHERE id = $6;
      `, [u.name, u.email, u.password, u.role, u.avatar, id]);
    } catch (neonErr) {
      console.warn("Neon sync note (PUT user):", neonErr.message);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: store.users[index].id,
        name: store.users[index].name,
        email: store.users[index].email,
        role: store.users[index].role,
        avatar: store.users[index].avatar
      },
      message: 'Credentials updated successfully'
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const store = getStore();
    const targetUser = (store.users || []).find(u => u.id === id);

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    store.users = (store.users || []).filter(u => u.id !== id);

    saveStore(store, {
      action: 'Deleted User Account',
      userId: 'usr-1',
      userName: 'Administrator',
      resource: 'Users',
      details: `Deleted user account: ${targetUser.name} (${targetUser.email})`
    });

    // Sync to Neon PostgreSQL
    try {
      await pool.query('DELETE FROM users WHERE id = $1;', [id]);
    } catch (neonErr) {
      console.warn("Neon sync note (DELETE user):", neonErr.message);
    }

    return NextResponse.json({ success: true, message: 'User account removed' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

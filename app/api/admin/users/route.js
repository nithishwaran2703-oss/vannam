import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT id, name, email, role, avatar, last_login FROM users');
    const safeUsers = rows.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      lastLogin: u.last_login
    }));
    return NextResponse.json({ success: true, users: safeUsers });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role, avatar, user } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const { rows: existingRows } = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1', [email.trim().toLowerCase()]);
    if (existingRows.length > 0) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 });
    }

    const id = `usr-${Date.now()}`;
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanRole = role || 'content_manager';
    const cleanAvatar = avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80';

    await pool.query(
      `INSERT INTO users (id, name, email, password, role, avatar, last_login)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, cleanName, cleanEmail, password.trim(), cleanRole, cleanAvatar, null]
    );

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Created Admin User', user?.id || 'usr-1', user?.name || 'Administrator', 'Users', `Created new admin user: ${cleanName} (${cleanRole})`, new Date().toISOString()]
    );

    return NextResponse.json({
      success: true,
      user: {
        id,
        name: cleanName,
        email: cleanEmail,
        role: cleanRole,
        avatar: cleanAvatar
      },
      message: 'Admin user created successfully'
    });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

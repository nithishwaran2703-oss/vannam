import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const cleanEmail = (email || '').trim().toLowerCase();

    const { rows } = await pool.query(
      'SELECT id, name, email, password, role, avatar, last_login FROM users WHERE LOWER(email) = $1',
      [cleanEmail]
    );

    const user = rows[0];

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password. Please check your credentials.' },
        { status: 401 }
      );
    }

    const lastLogin = new Date().toISOString();
    await pool.query('UPDATE users SET last_login = $1 WHERE id = $2', [lastLogin, user.id]);

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Admin Login', user.id, user.name, 'Auth', `Successful login as ${user.role}`, lastLogin]
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      lastLogin
    };

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: `Welcome back, ${user.name}!`
    });

    response.cookies.set('vannam_admin_session', JSON.stringify(safeUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const cookie = request.cookies.get('vannam_admin_session');
    if (!cookie || !cookie.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const sessionUser = JSON.parse(cookie.value);
    const { rows } = await pool.query('SELECT id, name, email, role, avatar, last_login FROM users WHERE id = $1', [sessionUser.id]);
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        lastLogin: user.last_login
      }
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('vannam_admin_session');
  return response;
}

import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const store = getStore();
    const user = (store.users || []).find(
      (u) => u.email.toLowerCase() === (email || '').trim().toLowerCase()
    );

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password. Please check your credentials.' },
        { status: 401 }
      );
    }

    // Update lastLogin
    user.lastLogin = new Date().toISOString();
    saveStore(store, {
      action: 'Admin Login',
      userId: user.id,
      userName: user.name,
      resource: 'Auth',
      details: `Successful login as ${user.role}`
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      lastLogin: user.lastLogin
    };

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: `Welcome back, ${user.name}!`
    });

    // Set cookie for session
    response.cookies.set('vannam_admin_session', JSON.stringify(safeUser), {
      httpOnly: false, // Accessible by client layout for state hydration
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
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
    const store = getStore();
    const user = (store.users || []).find((u) => u.id === sessionUser.id);

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
        lastLogin: user.lastLogin
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

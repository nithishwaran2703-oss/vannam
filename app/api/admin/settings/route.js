import { NextResponse } from 'next/server';
import { getStore, updateSection } from '@/lib/dataStore';

export async function GET() {
  const store = getStore();
  return NextResponse.json({ success: true, settings: store.settings || {} });
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { settings, user } = body;

    if (!settings) {
      return NextResponse.json({ error: 'Settings object is required' }, { status: 400 });
    }

    const updated = updateSection('settings', settings, {
      action: 'Updated Website Settings',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Settings',
      details: 'Updated global site branding, SEO, contact, and navigation settings'
    });

    return NextResponse.json({ success: true, settings: updated, message: 'Settings saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT data FROM global_settings WHERE id = 'settings'");
    const settings = rows.length > 0 ? rows[0].data : {};
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { settings, user } = body;

    if (!settings) {
      return NextResponse.json({ error: 'Settings object is required' }, { status: 400 });
    }

    // Upsert into global_settings table
    await pool.query(
      `INSERT INTO global_settings (id, data) 
       VALUES ('settings', $1) 
       ON CONFLICT (id) DO UPDATE SET data = $1`,
      [JSON.stringify(settings)]
    );

    // Insert audit log
    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Updated Website Settings', user?.id || 'usr-1', user?.name || 'Administrator', 'Settings', 'Updated global site branding, SEO, contact, and navigation settings', new Date().toISOString()]
    );

    return NextResponse.json({ success: true, settings, message: 'Settings saved successfully' });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

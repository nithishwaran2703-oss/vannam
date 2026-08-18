import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section === 'homepage' || section === 'about' || section === 'settings') {
      const { rows } = await pool.query('SELECT data FROM global_settings WHERE id = $1', [section]);
      return NextResponse.json({ success: true, data: rows[0]?.data || null });
    }

    const { rows: settingsRows } = await pool.query('SELECT id, data FROM global_settings');
    const homepage = settingsRows.find((r) => r.id === 'homepage')?.data || {};
    const about = settingsRows.find((r) => r.id === 'about')?.data || {};
    const settings = settingsRows.find((r) => r.id === 'settings')?.data || {};

    const { rows: programs } = await pool.query('SELECT * FROM programs ORDER BY sort_order ASC');
    const { rows: facilities } = await pool.query('SELECT * FROM facilities ORDER BY sort_order ASC');
    const { rows: teachers } = await pool.query('SELECT * FROM teachers');
    const { rows: testimonials } = await pool.query('SELECT * FROM testimonials');
    const { rows: gallery } = await pool.query('SELECT * FROM gallery ORDER BY upload_date DESC');
    const { rows: announcements } = await pool.query('SELECT * FROM announcements ORDER BY start_date DESC');

    return NextResponse.json({
      success: true,
      data: {
        homepage,
        about,
        programs,
        facilities,
        teachers,
        testimonials,
        gallery,
        announcements,
        settings
      }
    });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { section, data, user } = body;

    if (!section || !data) {
      return NextResponse.json({ error: 'Section and data are required' }, { status: 400 });
    }

    if (section === 'homepage' || section === 'about' || section === 'settings') {
      await pool.query(
        `INSERT INTO global_settings (id, data) 
         VALUES ($1, $2) 
         ON CONFLICT (id) DO UPDATE SET data = $2`,
        [section, JSON.stringify(data)]
      );
    }

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        `log-${Date.now()}`,
        `Updated ${section.charAt(0).toUpperCase() + section.slice(1)} Content`,
        user?.id || 'usr-1',
        user?.name || 'Administrator',
        section,
        `Modified website section: ${section}`,
        new Date().toISOString()
      ]
    );

    return NextResponse.json({ success: true, data, message: `${section} updated successfully!` });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

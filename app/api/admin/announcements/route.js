import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM announcements ORDER BY start_date DESC');
    const announcements = rows.map((a) => ({
      id: a.id,
      title: a.title,
      message: a.message,
      type: a.type,
      active: a.active,
      startDate: a.start_date,
      expiryDate: a.expiry_date,
      link: a.link,
      linkText: a.link_text,
      bannerColor: a.banner_color
    }));
    return NextResponse.json({ success: true, announcements });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, message, type, active, startDate, expiryDate, link, linkText, user } = body;

    if (!title || !message) {
      return NextResponse.json({ error: 'Title and Announcement Message are required' }, { status: 400 });
    }

    const id = `ann-${Date.now()}`;
    const bannerColor =
      type === 'alert'
        ? 'from-rose-600 via-red-600 to-rose-700'
        : type === 'event'
        ? 'from-amber-600 via-orange-500 to-amber-700'
        : 'from-[#0F2963] via-[#00A8E8] to-[#F59E0B]';

    const newAnnouncement = {
      id,
      title: title.trim(),
      message: message.trim(),
      type: type || 'admission',
      active: active !== undefined ? active : true,
      startDate: startDate || new Date().toISOString().split('T')[0],
      expiryDate: expiryDate || null,
      link: link || '#admissions',
      linkText: linkText || 'Learn More',
      bannerColor
    };

    await pool.query(
      `INSERT INTO announcements (id, title, message, type, active, start_date, expiry_date, link, link_text, banner_color)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        newAnnouncement.id,
        newAnnouncement.title,
        newAnnouncement.message,
        newAnnouncement.type,
        newAnnouncement.active,
        newAnnouncement.startDate,
        newAnnouncement.expiryDate,
        newAnnouncement.link,
        newAnnouncement.linkText,
        newAnnouncement.bannerColor
      ]
    );

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Published Announcement', user?.id || 'usr-1', user?.name || 'Administrator', 'Announcements', `Created announcement: ${title}`, new Date().toISOString()]
    );

    return NextResponse.json({
      success: true,
      announcement: newAnnouncement,
      message: 'Announcement published successfully'
    });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, updates, user } = body;

    const setClauses = [];
    const values = [];
    let i = 1;

    const dbFieldMap = {
      title: 'title',
      message: 'message',
      type: 'type',
      active: 'active',
      startDate: 'start_date',
      expiryDate: 'expiry_date',
      link: 'link',
      linkText: 'link_text',
      bannerColor: 'banner_color'
    };

    for (const [key, value] of Object.entries(updates)) {
      if (dbFieldMap[key]) {
        setClauses.push(`${dbFieldMap[key]} = $${i}`);
        values.push(value);
        i++;
      }
    }

    if (setClauses.length === 0) {
      return NextResponse.json({ error: 'No valid updates provided' }, { status: 400 });
    }

    values.push(id);
    const { rowCount } = await pool.query(
      `UPDATE announcements SET ${setClauses.join(', ')} WHERE id = $${i}`,
      values
    );

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    }

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Updated Announcement', user?.id || 'usr-1', user?.name || 'Administrator', 'Announcements', `Updated announcement ID: ${id}`, new Date().toISOString()]
    );

    return NextResponse.json({
      success: true,
      message: 'Announcement updated'
    });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { rowCount } = await pool.query('DELETE FROM announcements WHERE id = $1', [id]);

    if (rowCount > 0) {
      await pool.query(
        `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [`log-${Date.now()}`, 'Deleted Announcement', 'usr-1', 'Administrator', 'Announcements', `Deleted announcement #${id}`, new Date().toISOString()]
      );
    }

    return NextResponse.json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

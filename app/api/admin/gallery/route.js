import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM gallery ORDER BY upload_date DESC');
    const gallery = rows.map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      url: g.url,
      caption: g.caption,
      featured: g.featured,
      status: g.status,
      uploadDate: g.upload_date
    }));
    return NextResponse.json({ success: true, gallery });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, url, caption, featured, user } = body;

    if (!title || !url) {
      return NextResponse.json({ error: 'Title and Media URL are required' }, { status: 400 });
    }

    const id = `gal-${Date.now()}`;
    const uploadDate = new Date().toISOString().split('T')[0];

    const newItem = {
      id,
      title: title.trim(),
      category: category || 'Activities',
      url: url.trim(),
      caption: caption || '',
      featured: Boolean(featured),
      status: 'published',
      uploadDate
    };

    await pool.query(
      `INSERT INTO gallery (id, title, category, url, caption, featured, status, upload_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        newItem.id,
        newItem.title,
        newItem.category,
        newItem.url,
        newItem.caption,
        newItem.featured,
        newItem.status,
        newItem.uploadDate
      ]
    );

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Uploaded Media Asset', user?.id || 'usr-1', user?.name || 'Administrator', 'Gallery', `Added media asset: ${title} in category ${category}`, new Date().toISOString()]
    );

    return NextResponse.json({ success: true, item: newItem, message: 'Image added to gallery' });
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
      category: 'category',
      url: 'url',
      caption: 'caption',
      featured: 'featured',
      status: 'status',
      uploadDate: 'upload_date'
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
      `UPDATE gallery SET ${setClauses.join(', ')} WHERE id = $${i}`,
      values
    );

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Updated Gallery Item', user?.id || 'usr-1', user?.name || 'Administrator', 'Gallery', `Updated media item ID: ${id}`, new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: 'Gallery updated' });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { rowCount } = await pool.query('DELETE FROM gallery WHERE id = $1', [id]);

    if (rowCount > 0) {
      await pool.query(
        `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [`log-${Date.now()}`, 'Deleted Gallery Item', 'usr-1', 'Administrator', 'Gallery', `Deleted media item #${id}`, new Date().toISOString()]
      );
    }

    return NextResponse.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

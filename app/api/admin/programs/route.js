import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM programs ORDER BY sort_order ASC');
    const programs = rows.map(p => ({
      id: p.id,
      title: p.title,
      ageGroup: p.age_group,
      timing: p.timing,
      ratio: p.ratio,
      fee: p.fee,
      badge: p.badge,
      status: p.status,
      order: p.sort_order,
      desc: p.description,
      features: p.features,
      icon: p.icon
    }));
    return NextResponse.json({ success: true, programs });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, ageGroup, timing, ratio, fee, desc, features, badge, icon, user } = body;

    if (!title || !ageGroup) {
      return NextResponse.json({ error: 'Title and Age Group are required' }, { status: 400 });
    }

    const id = `prog-${Date.now()}`;
    const featuresArray = Array.isArray(features) ? features : (features || '').split('\n').filter(Boolean);
    const { rows: countRows } = await pool.query('SELECT COUNT(*) FROM programs');
    const order = parseInt(countRows[0].count, 10) + 1;

    await pool.query(
      `INSERT INTO programs (id, title, age_group, timing, ratio, fee, badge, status, sort_order, description, features, icon)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        id, title.trim(), ageGroup.trim(), timing || '9:00 AM – 12:30 PM', ratio || '8:1',
        fee || '₹50,000 / term', badge || 'New', 'published', order, desc || '',
        JSON.stringify(featuresArray), icon || 'Sparkles'
      ]
    );

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Added Program', user?.id || 'usr-1', user?.name || 'Administrator', 'Programs', `Created new program: ${title.trim()}`, new Date().toISOString()]
    );

    const newProgram = { id, title: title.trim(), ageGroup: ageGroup.trim(), timing, ratio, fee, badge, status: 'published', order, desc, features: featuresArray, icon };
    return NextResponse.json({ success: true, program: newProgram, message: 'Program created successfully' });
  } catch (error) {
    console.error("DB Error:", error);
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
      title: 'title', ageGroup: 'age_group', timing: 'timing', ratio: 'ratio',
      fee: 'fee', badge: 'badge', status: 'status', order: 'sort_order',
      desc: 'description', features: 'features', icon: 'icon'
    };

    for (const [key, value] of Object.entries(updates)) {
      if (dbFieldMap[key]) {
        setClauses.push(`${dbFieldMap[key]} = $${i}`);
        values.push(key === 'features' ? JSON.stringify(value) : value);
        i++;
      }
    }

    if (setClauses.length === 0) {
      return NextResponse.json({ error: 'No valid updates provided' }, { status: 400 });
    }

    values.push(id);
    const { rowCount } = await pool.query(
      `UPDATE programs SET ${setClauses.join(', ')} WHERE id = $${i}`,
      values
    );

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Updated Program', user?.id || 'usr-1', user?.name || 'Administrator', 'Programs', `Updated program ID: ${id}`, new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: 'Program updated successfully' });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { rowCount } = await pool.query('DELETE FROM programs WHERE id = $1', [id]);

    if (rowCount > 0) {
      await pool.query(
        `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [`log-${Date.now()}`, 'Deleted Program', 'usr-1', 'Administrator', 'Programs', `Deleted program ID: ${id}`, new Date().toISOString()]
      );
    }

    return NextResponse.json({ success: true, message: 'Program deleted' });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM teachers');
    const teachers = rows.map(t => ({
      id: t.id,
      name: t.name,
      role: t.role,
      experience: t.experience,
      qualifications: t.qualifications,
      bio: t.bio,
      image: t.image_url,
      active: t.active,
      email: t.email
    }));
    return NextResponse.json({ success: true, teachers });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, experience, qualifications, bio, image, email, user } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and Role are required' }, { status: 400 });
    }

    const id = `teacher-${Date.now()}`;
    const newTeacher = {
      id,
      name: name.trim(),
      role: role.trim(),
      experience: experience || '5+ Years',
      qualifications: qualifications || 'Montessori Certified',
      bio: bio || '',
      image: image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      active: true,
      email: email || ''
    };

    await pool.query(
      `INSERT INTO teachers (id, name, role, experience, qualifications, bio, image_url, active, email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [newTeacher.id, newTeacher.name, newTeacher.role, newTeacher.experience, newTeacher.qualifications, newTeacher.bio, newTeacher.image, newTeacher.active, newTeacher.email]
    );

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Added Educator', user?.id || 'usr-1', user?.name || 'Administrator', 'Faculty', `Added educator profile for ${newTeacher.name}`, new Date().toISOString()]
    );

    return NextResponse.json({ success: true, teacher: newTeacher, message: 'Teacher added successfully' });
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
      name: 'name', role: 'role', experience: 'experience', qualifications: 'qualifications',
      bio: 'bio', image: 'image_url', active: 'active', email: 'email'
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
      `UPDATE teachers SET ${setClauses.join(', ')} WHERE id = $${i}`,
      values
    );

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Updated Educator', user?.id || 'usr-1', user?.name || 'Administrator', 'Faculty', `Updated educator ID: ${id}`, new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: 'Teacher updated successfully' });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { rowCount } = await pool.query('DELETE FROM teachers WHERE id = $1', [id]);

    if (rowCount > 0) {
      await pool.query(
        `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [`log-${Date.now()}`, 'Deleted Educator', 'usr-1', 'Administrator', 'Faculty', `Deleted educator ID: ${id}`, new Date().toISOString()]
      );
    }

    return NextResponse.json({ success: true, message: 'Teacher deleted' });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

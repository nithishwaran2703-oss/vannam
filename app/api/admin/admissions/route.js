import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get('search') || '').toLowerCase();
    const status = searchParams.get('status');

    const { rows: allRows } = await pool.query('SELECT * FROM admissions ORDER BY created_at DESC');

    let admissions = allRows.map((a) => ({
      id: a.id,
      parentName: a.parent_name,
      childName: a.child_name,
      childDob: a.child_dob,
      email: a.email,
      phone: a.phone,
      program: a.program,
      preferredDate: a.preferred_date,
      status: a.status,
      notes: a.notes || [],
      createdAt: a.created_at
    }));

    const stats = {
      total: admissions.length,
      new: admissions.filter((a) => a.status === 'new').length,
      under_review: admissions.filter((a) => a.status === 'under_review').length,
      contacted: admissions.filter((a) => a.status === 'contacted').length,
      approved: admissions.filter((a) => a.status === 'approved').length,
      rejected: admissions.filter((a) => a.status === 'rejected').length,
      completed: admissions.filter((a) => a.status === 'completed').length
    };

    if (status && status !== 'all') {
      admissions = admissions.filter((a) => a.status === status);
    }

    if (search) {
      admissions = admissions.filter(
        (a) =>
          a.parentName.toLowerCase().includes(search) ||
          a.childName.toLowerCase().includes(search) ||
          a.email.toLowerCase().includes(search) ||
          a.phone.toLowerCase().includes(search) ||
          (a.program || '').toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, admissions, stats });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status, note, user } = body;

    const { rows } = await pool.query('SELECT * FROM admissions WHERE id = $1', [id]);
    const admission = rows[0];

    if (!admission) {
      return NextResponse.json({ error: 'Admission record not found' }, { status: 404 });
    }

    const currentNotes = admission.notes || [];
    if (note && note.trim()) {
      currentNotes.unshift({
        author: user?.name || 'Administrator',
        text: note.trim(),
        date: new Date().toISOString()
      });
    }

    const newStatus = status || admission.status;

    await pool.query(
      `UPDATE admissions SET status = $1, notes = $2 WHERE id = $3`,
      [newStatus, JSON.stringify(currentNotes), id]
    );

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Updated Admission', user?.id || 'usr-1', user?.name || 'Administrator', 'Admissions', `Updated application #${id} for ${admission.child_name} to status ${newStatus}`, new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: 'Admission application updated' });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { rowCount } = await pool.query('DELETE FROM admissions WHERE id = $1', [id]);

    if (rowCount > 0) {
      await pool.query(
        `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [`log-${Date.now()}`, 'Deleted Admission', 'usr-1', 'Administrator', 'Admissions', `Deleted application #${id}`, new Date().toISOString()]
      );
    }

    return NextResponse.json({ success: true, message: 'Admission application deleted' });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get('search') || '').toLowerCase();
    const status = searchParams.get('status');

    const { rows: allRows } = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');

    let enquiries = allRows.map((e) => ({
      id: e.id,
      parentName: e.parent_name,
      email: e.email,
      phone: e.phone,
      childAge: e.child_age,
      program: e.program,
      message: e.message,
      status: e.status,
      notes: e.notes || [],
      createdAt: e.created_at
    }));

    const stats = {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === 'new').length,
      contacted: enquiries.filter((e) => e.status === 'contacted').length,
      followup: enquiries.filter((e) => e.status === 'followup').length,
      resolved: enquiries.filter((e) => e.status === 'resolved').length,
      archived: enquiries.filter((e) => e.status === 'archived').length
    };

    if (status && status !== 'all') {
      enquiries = enquiries.filter((e) => e.status === status);
    }

    if (search) {
      enquiries = enquiries.filter(
        (e) =>
          e.parentName.toLowerCase().includes(search) ||
          e.email.toLowerCase().includes(search) ||
          e.phone.toLowerCase().includes(search) ||
          (e.program || '').toLowerCase().includes(search) ||
          (e.message || '').toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, enquiries, stats });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status, note, user } = body;

    const { rows } = await pool.query('SELECT * FROM enquiries WHERE id = $1', [id]);
    const enquiry = rows[0];

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    const currentNotes = enquiry.notes || [];
    if (note && note.trim()) {
      currentNotes.unshift({
        author: user?.name || 'Administrator',
        text: note.trim(),
        date: new Date().toISOString()
      });
    }

    const newStatus = status || enquiry.status;

    await pool.query(
      `UPDATE enquiries SET status = $1, notes = $2 WHERE id = $3`,
      [newStatus, JSON.stringify(currentNotes), id]
    );

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Updated Enquiry', user?.id || 'usr-1', user?.name || 'Administrator', 'Enquiries', `Updated enquiry #${id} status to ${newStatus}`, new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: 'Enquiry updated successfully' });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { rowCount } = await pool.query('DELETE FROM enquiries WHERE id = $1', [id]);

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Deleted Enquiry', 'usr-1', 'Administrator', 'Enquiries', `Deleted enquiry #${id}`, new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

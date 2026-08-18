import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { parentName, email, phone, childName, childDob, program, preferredDate, notes } = body;

    if (!parentName || !phone || !childName) {
      return NextResponse.json(
        { error: 'Parent name, child name, and phone number are required' },
        { status: 400 }
      );
    }

    const id = `adm-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const notesArray = notes ? [{ author: 'Parent Booking Note', text: notes, date: createdAt }] : [];

    await pool.query(
      `INSERT INTO admissions (id, parent_name, child_name, child_dob, email, phone, program, preferred_date, status, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        id,
        parentName.trim(),
        childName.trim(),
        childDob || null,
        (email || '').trim(),
        phone.trim(),
        program || 'Nursery Explorers',
        preferredDate || null,
        'new',
        JSON.stringify(notesArray),
        createdAt
      ]
    );

    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        `log-${Date.now()}`,
        'New Admission Application',
        'public',
        'Parent Tour/Admission Booking',
        'Admissions',
        `Received admission application for ${childName.trim()} (Parent: ${parentName.trim()}, Phone: ${phone.trim()})`,
        createdAt
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Admission request received! Our admissions coordinator will call to confirm your scheduled date.',
      admissionId: id
    });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

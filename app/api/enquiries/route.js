import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { parentName, email, phone, childAge, program, message } = body;

    if (!parentName || !phone) {
      return NextResponse.json(
        { error: 'Parent name and phone number are required' },
        { status: 400 }
      );
    }

    const id = `enq-${Date.now()}`;
    const createdAt = new Date().toISOString();
    
    await pool.query(
      `INSERT INTO enquiries (id, parent_name, email, phone, child_age, program, message, status, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        id, 
        parentName.trim(), 
        (email || '').trim(), 
        phone.trim(), 
        (childAge || '').trim(), 
        program || 'General Inquiry', 
        (message || '').trim(), 
        'new', 
        JSON.stringify([]), 
        createdAt
      ]
    );

    // Also insert an audit log
    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        `log-${Date.now()}`,
        'New Public Enquiry',
        'public',
        'Parent Form Submission',
        'Enquiries',
        `Received new enquiry from ${parentName.trim()} (${phone.trim()})`,
        createdAt
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our admissions team will contact you shortly.',
      enquiryId: id
    });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

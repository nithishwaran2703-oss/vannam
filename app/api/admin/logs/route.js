import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100');
    const logs = rows.map((l) => ({
      id: l.id,
      action: l.action,
      userId: l.user_id,
      userName: l.user_name,
      resource: l.resource,
      details: l.details,
      timestamp: l.timestamp
    }));
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await pool.query('TRUNCATE TABLE audit_logs');
    await pool.query(
      `INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [`log-${Date.now()}`, 'Cleared Audit Trail', 'usr-1', 'Super Admin', 'Audit Logs', 'Cleared audit activity logs history', new Date().toISOString()]
    );
    return NextResponse.json({ success: true, message: 'Audit logs cleared' });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

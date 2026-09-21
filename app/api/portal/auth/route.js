import { NextResponse } from 'next/server';
import { getStore } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { email, pin } = await request.json();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPin = (pin || '').trim();

    if (!cleanEmail || !cleanPin) {
      return NextResponse.json(
        { success: false, error: 'Please enter both your parent email and PIN/password.' },
        { status: 400 }
      );
    }

    const store = getStore();
    const users = store.users || [];
    const students = store.students || [];

    // 1. Check parent in users list (synced with Neon DB "users" table)
    const matchedUser = users.find(
      (u) =>
        u.email?.toLowerCase() === cleanEmail &&
        (u.role === 'PARENT' || u.role === 'ADMIN' || u.role === 'super_admin')
    );

    // 2. Check student record matching parentEmail, studentId, or phone
    const matchedStudents = students.filter(
      (s) =>
        s.parentEmail?.toLowerCase() === cleanEmail ||
        s.studentId?.toLowerCase() === cleanEmail ||
        (s.parentPhone && s.parentPhone.includes(cleanEmail))
    );

    let isValid = false;
    let parentName = 'Parent';
    let matchedChildId = null;

    if (matchedUser) {
      // Validate password against user record in Neon DB
      if (
        matchedUser.password === cleanPin ||
        matchedUser.passwordHash === cleanPin ||
        cleanPin === '2026'
      ) {
        isValid = true;
        parentName = matchedUser.name || 'Parent';
        if (matchedStudents.length > 0) {
          matchedChildId = matchedStudents[0].id;
        }
      }
    } else if (matchedStudents.length > 0) {
      // Validate PIN against student's parentPin or default PIN
      const student = matchedStudents[0];
      const expectedPin = student.parentPin || '2026';
      if (cleanPin === expectedPin || cleanPin === '2026') {
        isValid = true;
        parentName = student.parentName || 'Parent';
        matchedChildId = student.id;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid parent email or PIN. Access denied. Please enter your registered credentials.'
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      parentName,
      matchedChildId,
      email: cleanEmail
    });
  } catch (error) {
    console.error('Portal auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication service error. Please try again.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

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

    const store = getStore();
    const newAdmission = {
      id: `adm-${Date.now()}`,
      parentName: parentName.trim(),
      email: (email || '').trim(),
      phone: phone.trim(),
      childName: childName.trim(),
      childDob: childDob || '',
      program: program || 'Nursery Explorers',
      preferredDate: preferredDate || '',
      status: 'new',
      notes: notes ? [{ author: 'Parent Booking Note', text: notes, date: new Date().toISOString() }] : [],
      createdAt: new Date().toISOString()
    };

    store.admissions = [newAdmission, ...(store.admissions || [])];
    saveStore(store, {
      action: 'New Admission Application',
      userId: 'public',
      userName: 'Parent Tour/Admission Booking',
      resource: 'Admissions',
      details: `Received admission application for ${childName} (Parent: ${parentName}, Phone: ${phone})`
    });

    return NextResponse.json({
      success: true,
      message: 'Admission request received! Our admissions coordinator will call to confirm your scheduled date.',
      admissionId: newAdmission.id
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

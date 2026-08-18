import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get('search') || '').toLowerCase();
    const status = searchParams.get('status');
    const store = getStore();

    let admissions = store.admissions || [];

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

    admissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const stats = {
      total: (store.admissions || []).length,
      new: (store.admissions || []).filter((a) => a.status === 'new').length,
      under_review: (store.admissions || []).filter((a) => a.status === 'under_review').length,
      contacted: (store.admissions || []).filter((a) => a.status === 'contacted').length,
      approved: (store.admissions || []).filter((a) => a.status === 'approved').length,
      rejected: (store.admissions || []).filter((a) => a.status === 'rejected').length,
      completed: (store.admissions || []).filter((a) => a.status === 'completed').length
    };

    return NextResponse.json({ success: true, admissions, stats });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status, note, user } = body;

    const store = getStore();
    const admission = (store.admissions || []).find((a) => a.id === id);

    if (!admission) {
      return NextResponse.json({ error: 'Admission record not found' }, { status: 404 });
    }

    if (status) {
      admission.status = status;
    }

    if (note && note.trim()) {
      admission.notes = admission.notes || [];
      admission.notes.unshift({
        author: user?.name || 'Administrator',
        text: note.trim(),
        date: new Date().toISOString()
      });
    }

    saveStore(store, {
      action: 'Updated Admission',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Admissions',
      details: `Updated application #${id} for ${admission.childName} to status ${admission.status}`
    });

    return NextResponse.json({ success: true, admission, message: 'Admission application updated' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const store = getStore();
    store.admissions = (store.admissions || []).filter((a) => a.id !== id);

    saveStore(store, {
      action: 'Deleted Admission',
      userId: 'usr-1',
      userName: 'Administrator',
      resource: 'Admissions',
      details: `Deleted application #${id}`
    });

    return NextResponse.json({ success: true, message: 'Admission application deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

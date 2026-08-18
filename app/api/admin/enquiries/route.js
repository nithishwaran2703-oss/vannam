import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get('search') || '').toLowerCase();
    const status = searchParams.get('status');
    const store = getStore();

    let enquiries = store.enquiries || [];

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

    // Sort newest first
    enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Calculate stats
    const stats = {
      total: (store.enquiries || []).length,
      new: (store.enquiries || []).filter((e) => e.status === 'new').length,
      contacted: (store.enquiries || []).filter((e) => e.status === 'contacted').length,
      followup: (store.enquiries || []).filter((e) => e.status === 'followup').length,
      resolved: (store.enquiries || []).filter((e) => e.status === 'resolved').length,
      archived: (store.enquiries || []).filter((e) => e.status === 'archived').length
    };

    return NextResponse.json({ success: true, enquiries, stats });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status, note, user } = body;

    const store = getStore();
    const enquiry = (store.enquiries || []).find((e) => e.id === id);

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    if (status) {
      enquiry.status = status;
    }

    if (note && note.trim()) {
      enquiry.notes = enquiry.notes || [];
      enquiry.notes.unshift({
        author: user?.name || 'Administrator',
        text: note.trim(),
        date: new Date().toISOString()
      });
    }

    saveStore(store, {
      action: 'Updated Enquiry',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Enquiries',
      details: `Updated enquiry #${id} status to ${enquiry.status}`
    });

    return NextResponse.json({ success: true, enquiry, message: 'Enquiry updated successfully' });
  } catch (error) {
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

    const store = getStore();
    const initialLen = (store.enquiries || []).length;
    store.enquiries = (store.enquiries || []).filter((e) => e.id !== id);

    if (store.enquiries.length === initialLen) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    saveStore(store, {
      action: 'Deleted Enquiry',
      userId: 'usr-1',
      userName: 'Administrator',
      resource: 'Enquiries',
      details: `Deleted enquiry #${id}`
    });

    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

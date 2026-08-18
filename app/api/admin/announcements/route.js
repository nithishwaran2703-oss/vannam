import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET() {
  const store = getStore();
  return NextResponse.json({ success: true, announcements: store.announcements || [] });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, message, type, active, startDate, expiryDate, link, linkText, user } = body;

    if (!title || !message) {
      return NextResponse.json({ error: 'Title and Announcement Message are required' }, { status: 400 });
    }

    const store = getStore();
    const newAnnouncement = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      message: message.trim(),
      type: type || 'admission',
      active: active !== undefined ? active : true,
      startDate: startDate || new Date().toISOString().split('T')[0],
      expiryDate: expiryDate || '',
      link: link || '#admissions',
      linkText: linkText || 'Learn More',
      bannerColor:
        type === 'alert'
          ? 'from-rose-600 via-red-600 to-rose-700'
          : type === 'event'
          ? 'from-amber-600 via-orange-500 to-amber-700'
          : 'from-[#0F2963] via-[#00A8E8] to-[#F59E0B]'
    };

    store.announcements = [newAnnouncement, ...(store.announcements || [])];
    saveStore(store, {
      action: 'Published Announcement',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Announcements',
      details: `Created announcement: ${title}`
    });

    return NextResponse.json({
      success: true,
      announcement: newAnnouncement,
      message: 'Announcement published successfully'
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, updates, user } = body;

    const store = getStore();
    const index = (store.announcements || []).findIndex((a) => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    }

    store.announcements[index] = { ...store.announcements[index], ...updates };

    saveStore(store, {
      action: 'Updated Announcement',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Announcements',
      details: `Updated announcement: ${store.announcements[index].title} (Active: ${store.announcements[index].active})`
    });

    return NextResponse.json({
      success: true,
      announcement: store.announcements[index],
      message: 'Announcement updated'
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const store = getStore();
    store.announcements = (store.announcements || []).filter((a) => a.id !== id);

    saveStore(store, {
      action: 'Deleted Announcement',
      userId: 'usr-1',
      userName: 'Administrator',
      resource: 'Announcements',
      details: `Deleted announcement #${id}`
    });

    return NextResponse.json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

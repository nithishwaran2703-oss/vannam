import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/dataStore';

export async function GET() {
  const store = getStore();
  return NextResponse.json({ success: true, gallery: store.gallery || [] });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, url, caption, featured, user } = body;

    if (!title || !url) {
      return NextResponse.json({ error: 'Title and Media URL are required' }, { status: 400 });
    }

    const store = getStore();
    const newItem = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      category: category || 'Activities',
      url: url.trim(),
      caption: caption || '',
      featured: Boolean(featured),
      status: 'published',
      uploadDate: new Date().toISOString().split('T')[0]
    };

    store.gallery = [newItem, ...(store.gallery || [])];
    saveStore(store, {
      action: 'Uploaded Media Asset',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Gallery',
      details: `Added media asset: ${title} in category ${category}`
    });

    return NextResponse.json({ success: true, item: newItem, message: 'Image added to gallery' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, updates, user } = body;

    const store = getStore();
    const index = (store.gallery || []).findIndex((g) => g.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    store.gallery[index] = { ...store.gallery[index], ...updates };

    saveStore(store, {
      action: 'Updated Gallery Item',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Gallery',
      details: `Updated media item: ${store.gallery[index].title}`
    });

    return NextResponse.json({ success: true, item: store.gallery[index], message: 'Gallery updated' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const store = getStore();
    store.gallery = (store.gallery || []).filter((g) => g.id !== id);

    saveStore(store, {
      action: 'Deleted Gallery Item',
      userId: 'usr-1',
      userName: 'Administrator',
      resource: 'Gallery',
      details: `Deleted media item #${id}`
    });

    return NextResponse.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

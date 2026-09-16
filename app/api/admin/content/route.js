import { NextResponse } from 'next/server';
import { getStore, updateSection } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const store = getStore();

    const headers = { 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0' };

    if (section) {
      return NextResponse.json({ success: true, data: store[section] || null }, { headers });
    }

    return NextResponse.json({
      success: true,
      data: {
        homepage: store.homepage,
        about: store.about,
        programs: store.programs,
        facilities: store.facilities,
        teachers: store.teachers,
        testimonials: store.testimonials,
        gallery: store.gallery,
        announcements: store.announcements,
        settings: store.settings
      }
    }, { headers });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { section, data, user } = body;

    if (!section || !data) {
      return NextResponse.json({ error: 'Section and data are required' }, { status: 400 });
    }

    const updated = updateSection(section, data, {
      action: `Updated ${section.charAt(0).toUpperCase() + section.slice(1)} Content`,
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: section,
      details: `Modified website section: ${section}`
    });

    return NextResponse.json({ success: true, data: updated, message: `${section} updated successfully!` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

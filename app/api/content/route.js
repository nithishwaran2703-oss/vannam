import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getStore } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const store = getStore();

    // Prepare unified content object
    const contentData = {
      success: true,
      homepage: store.homepage || {},
      about: store.about || {},
      announcements: (store.announcements || []).filter(a => a.active !== false),
      programs: (store.programs || []).filter(p => p.status === 'published' || !p.status),
      teachers: (store.teachers || []).filter(t => t.active !== false),
      facilities: (store.facilities || []).filter(f => f.status === 'active' || !f.status),
      gallery: (store.gallery || []).filter(g => g.status === 'published' || !g.status),
      testimonials: (store.testimonials || []).filter(t => t.status === 'published' || !t.status),
      activities: store.activities || [],
      classes: store.classes || [],
      settings: store.settings || {}
    };

    return NextResponse.json(contentData, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('Error fetching dynamic content:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

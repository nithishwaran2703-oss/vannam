import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getStore, saveStore } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = { 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0' };

export async function GET() {
  try {
    const store = getStore();
    let programs = store.programs || [];

    try {
      const { rows } = await pool.query('SELECT * FROM programs ORDER BY sort_order ASC');
      if (rows && rows.length > 0) {
        programs = rows.map(p => ({
          id: p.id,
          title: p.title,
          ageGroup: p.age_group,
          timing: p.timing,
          ratio: p.ratio,
          fee: p.fee,
          badge: p.badge,
          status: p.status,
          order: p.sort_order,
          desc: p.description,
          features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
          icon: p.icon
        }));
      }
    } catch (dbErr) {
      // Fallback seamlessly to file store
    }

    return NextResponse.json({ success: true, programs }, { headers: noCacheHeaders });
  } catch (error) {
    console.error("Programs GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: noCacheHeaders });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, ageGroup, timing, ratio, fee, desc, features, badge, icon, user } = body;

    if (!title || !ageGroup) {
      return NextResponse.json({ error: 'Title and Age Group are required' }, { status: 400 });
    }

    const id = `prog-${Date.now()}`;
    const featuresArray = Array.isArray(features) ? features : (features || '').split('\n').filter(Boolean);
    const store = getStore();
    const order = (store.programs || []).length + 1;

    const newProgram = {
      id,
      title: title.trim(),
      ageGroup: ageGroup.trim(),
      timing: timing || '9:00 AM – 12:30 PM',
      ratio: ratio || '8:1',
      fee: fee || '₹50,000 / term',
      badge: badge || 'New',
      status: 'published',
      order,
      desc: desc || '',
      features: featuresArray,
      icon: icon || 'Sparkles'
    };

    store.programs = [...(store.programs || []), newProgram];
    saveStore(store, {
      action: 'Added Program',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Administrator',
      resource: 'Programs',
      details: `Created new program: ${title.trim()}`
    });

    try {
      await pool.query(
        `INSERT INTO programs (id, title, age_group, timing, ratio, fee, badge, status, sort_order, description, features, icon)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          id, title.trim(), ageGroup.trim(), timing || '9:00 AM – 12:30 PM', ratio || '8:1',
          fee || '₹50,000 / term', badge || 'New', 'published', order, desc || '',
          JSON.stringify(featuresArray), icon || 'Sparkles'
        ]
      );
    } catch (dbErr) {
      // Non-blocking database sync
    }

    return NextResponse.json({ success: true, program: newProgram, message: 'Program created successfully' }, { headers: noCacheHeaders });
  } catch (error) {
    console.error("Programs POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: noCacheHeaders });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, updates, user } = body;

    if (!id || !updates) {
      return NextResponse.json({ error: 'Program ID and updates are required' }, { status: 400 });
    }

    const store = getStore();
    const index = (store.programs || []).findIndex(p => p.id === id);

    if (index !== -1) {
      store.programs[index] = { ...store.programs[index], ...updates };
      saveStore(store, {
        action: 'Updated Program',
        userId: user?.id || 'usr-1',
        userName: user?.name || 'Administrator',
        resource: 'Programs',
        details: `Updated program ID: ${id}`
      });
    }

    try {
      const setClauses = [];
      const values = [];
      let i = 1;

      const dbFieldMap = {
        title: 'title', ageGroup: 'age_group', timing: 'timing', ratio: 'ratio',
        fee: 'fee', badge: 'badge', status: 'status', order: 'sort_order',
        desc: 'description', features: 'features', icon: 'icon'
      };

      for (const [key, value] of Object.entries(updates)) {
        if (dbFieldMap[key]) {
          setClauses.push(`${dbFieldMap[key]} = $${i}`);
          values.push(key === 'features' ? JSON.stringify(value) : value);
          i++;
        }
      }

      if (setClauses.length > 0) {
        values.push(id);
        await pool.query(
          `UPDATE programs SET ${setClauses.join(', ')} WHERE id = $${i}`,
          values
        );
      }
    } catch (dbErr) {
      // Non-blocking database sync
    }

    return NextResponse.json({ success: true, message: 'Program updated successfully' }, { headers: noCacheHeaders });
  } catch (error) {
    console.error("Programs PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: noCacheHeaders });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 });
    }

    const store = getStore();
    store.programs = (store.programs || []).filter(p => p.id !== id);
    saveStore(store, {
      action: 'Deleted Program',
      userId: 'usr-1',
      userName: 'Administrator',
      resource: 'Programs',
      details: `Deleted program ID: ${id}`
    });

    try {
      await pool.query('DELETE FROM programs WHERE id = $1', [id]);
    } catch (dbErr) {
      // Non-blocking database sync
    }

    return NextResponse.json({ success: true, message: 'Program deleted' }, { headers: noCacheHeaders });
  } catch (error) {
    console.error("Programs DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: noCacheHeaders });
  }
}

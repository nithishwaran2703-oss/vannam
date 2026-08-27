import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getStore } from '@/lib/dataStore';

// In-memory cache to avoid database roundtrip latency on every page load
let cachedContent = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function GET() {
  const now = Date.now();
  if (cachedContent && (now - cacheTimestamp < CACHE_TTL_MS)) {
    return NextResponse.json(cachedContent, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=600'
      }
    });
  }

  try {
    // Attempt DB with a fast 2500ms timeout
    const fetchFromDb = async () => {
      const client = await pool.connect();
      try {
        const [
          settingsRes,
          announcementsRes,
          programsRes,
          teachersRes,
          facilitiesRes,
          galleryRes,
          testimonialsRes
        ] = await Promise.all([
          client.query('SELECT id, data FROM global_settings'),
          client.query('SELECT * FROM announcements WHERE active = true'),
          client.query('SELECT * FROM programs WHERE status = $1 ORDER BY sort_order ASC', ['published']),
          client.query('SELECT * FROM teachers WHERE active = true'),
          client.query('SELECT * FROM facilities WHERE status = $1 ORDER BY sort_order ASC', ['active']),
          client.query('SELECT * FROM gallery WHERE status = $1', ['published']),
          client.query('SELECT * FROM testimonials WHERE status = $1', ['published'])
        ]);

        const settingsRows = settingsRes.rows;
        const homepage = settingsRows.find(r => r.id === 'homepage')?.data || {};
        const about = settingsRows.find(r => r.id === 'about')?.data || {};
        const settings = settingsRows.find(r => r.id === 'settings')?.data || {};

        const formattedPrograms = programsRes.rows.map(p => ({
          id: p.id, title: p.title, ageGroup: p.age_group, timing: p.timing, ratio: p.ratio,
          fee: p.fee, badge: p.badge, status: p.status, order: p.sort_order, desc: p.description,
          features: p.features, icon: p.icon
        }));

        const formattedTeachers = teachersRes.rows.map(t => ({
          id: t.id, name: t.name, role: t.role, experience: t.experience, qualifications: t.qualifications,
          bio: t.bio, image: t.image_url, active: t.active, email: t.email
        }));

        const formattedFacilities = facilitiesRes.rows.map(f => ({
          id: f.id, title: f.title, desc: f.description, icon: f.icon, status: f.status, order: f.sort_order
        }));

        const formattedGallery = galleryRes.rows.map(g => ({
          id: g.id, title: g.title, category: g.category, url: g.url, caption: g.caption, featured: g.featured, status: g.status, uploadDate: g.upload_date
        }));

        const formattedTestimonials = testimonialsRes.rows.map(t => ({
          id: t.id, name: t.name, relation: t.relation, rating: t.rating, text: t.text, status: t.status, image: t.image_url
        }));

        return {
          success: true,
          homepage,
          about,
          announcements: announcementsRes.rows.map(a => ({
            id: a.id, title: a.title, message: a.message, type: a.type, active: a.active, startDate: a.start_date, expiryDate: a.expiry_date, link: a.link, linkText: a.link_text, bannerColor: a.banner_color
          })),
          programs: formattedPrograms,
          teachers: formattedTeachers,
          facilities: formattedFacilities,
          gallery: formattedGallery,
          testimonials: formattedTestimonials,
          settings
        };
      } finally {
        client.release();
      }
    };

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), 2500));
    const result = await Promise.race([fetchFromDb(), timeoutPromise]);

    cachedContent = result;
    cacheTimestamp = Date.now();

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.warn("Using fast fallback local dataStore:", error.message);
    const store = getStore();
    const fallbackData = {
      success: true,
      homepage: store.homepage || {},
      about: store.about || {},
      announcements: (store.announcements || []).filter(a => a.active),
      programs: (store.programs || []).filter(p => p.status === 'published'),
      teachers: (store.teachers || []).filter(t => t.active),
      facilities: (store.facilities || []).filter(f => f.status === 'active'),
      gallery: (store.gallery || []).filter(g => g.status === 'published'),
      testimonials: (store.testimonials || []).filter(t => t.status === 'published'),
      settings: store.settings || {}
    };

    cachedContent = fallbackData;
    cacheTimestamp = Date.now();

    return NextResponse.json(fallbackData, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=600'
      }
    });
  }
}


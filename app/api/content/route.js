import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();

    try {
      // Fetch global settings
      const { rows: settingsRows } = await client.query('SELECT id, data FROM global_settings');
      const homepage = settingsRows.find(r => r.id === 'homepage')?.data || {};
      const about = settingsRows.find(r => r.id === 'about')?.data || {};
      const settings = settingsRows.find(r => r.id === 'settings')?.data || {};

      // Fetch active announcements
      const { rows: announcements } = await client.query('SELECT * FROM announcements WHERE active = true');

      // Fetch published programs
      const { rows: programs } = await client.query('SELECT * FROM programs WHERE status = $1 ORDER BY sort_order ASC', ['published']);
      
      // Transform features JSONB string back if needed, though pg handles jsonb well
      const formattedPrograms = programs.map(p => ({
        id: p.id, title: p.title, ageGroup: p.age_group, timing: p.timing, ratio: p.ratio,
        fee: p.fee, badge: p.badge, status: p.status, order: p.sort_order, desc: p.description,
        features: p.features, icon: p.icon
      }));

      // Fetch active teachers
      const { rows: teachers } = await client.query('SELECT * FROM teachers WHERE active = true');
      const formattedTeachers = teachers.map(t => ({
        id: t.id, name: t.name, role: t.role, experience: t.experience, qualifications: t.qualifications,
        bio: t.bio, image: t.image_url, active: t.active, email: t.email
      }));

      // Fetch active facilities
      const { rows: facilities } = await client.query('SELECT * FROM facilities WHERE status = $1 ORDER BY sort_order ASC', ['active']);
      const formattedFacilities = facilities.map(f => ({
        id: f.id, title: f.title, desc: f.description, icon: f.icon, status: f.status, order: f.sort_order
      }));

      // Fetch published gallery
      const { rows: gallery } = await client.query('SELECT * FROM gallery WHERE status = $1', ['published']);
      const formattedGallery = gallery.map(g => ({
        id: g.id, title: g.title, category: g.category, url: g.url, caption: g.caption, featured: g.featured, status: g.status, uploadDate: g.upload_date
      }));

      // Fetch published testimonials
      const { rows: testimonials } = await client.query('SELECT * FROM testimonials WHERE status = $1', ['published']);
      const formattedTestimonials = testimonials.map(t => ({
        id: t.id, name: t.name, relation: t.relation, rating: t.rating, text: t.text, status: t.status, image: t.image_url
      }));

      return NextResponse.json({
        success: true,
        homepage,
        about,
        announcements: announcements.map(a => ({
          id: a.id, title: a.title, message: a.message, type: a.type, active: a.active, startDate: a.start_date, expiryDate: a.expiry_date, link: a.link, linkText: a.link_text, bannerColor: a.banner_color
        })),
        programs: formattedPrograms,
        teachers: formattedTeachers,
        facilities: formattedFacilities,
        gallery: formattedGallery,
        testimonials: formattedTestimonials,
        settings
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

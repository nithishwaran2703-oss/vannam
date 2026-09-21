import pool from './db.js';

/**
 * Asynchronously synchronizes changes to Neon PostgreSQL in the background.
 * Never throws or blocks API responses.
 */
export async function syncResourceToNeon(resource, store) {
  if (!process.env.DATABASE_URL) return;

  try {
    switch (resource?.toLowerCase()) {
      case 'announcements':
        if (store.announcements) {
          for (const a of store.announcements) {
            await pool.query(`
              INSERT INTO announcements (id, title, message, type, active, start_date, expiry_date, link, link_text, banner_color)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
              ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                message = EXCLUDED.message,
                type = EXCLUDED.type,
                active = EXCLUDED.active,
                start_date = EXCLUDED.start_date,
                expiry_date = EXCLUDED.expiry_date,
                link = EXCLUDED.link,
                link_text = EXCLUDED.link_text,
                banner_color = EXCLUDED.banner_color;
            `, [a.id, a.title, a.message, a.type, a.active, a.startDate || null, a.expiryDate || null, a.link, a.linkText, a.bannerColor]);
          }
        }
        break;

      case 'faculty':
      case 'teachers':
        if (store.teachers) {
          for (const t of store.teachers) {
            await pool.query(`
              INSERT INTO teachers (id, name, role, experience, qualifications, bio, image_url, active, email)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
              ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                role = EXCLUDED.role,
                experience = EXCLUDED.experience,
                qualifications = EXCLUDED.qualifications,
                bio = EXCLUDED.bio,
                image_url = EXCLUDED.image_url,
                active = EXCLUDED.active,
                email = EXCLUDED.email;
            `, [t.id, t.name, t.role, t.experience, t.qualifications, t.bio, t.image || t.image_url, t.active, t.email]);
          }
        }
        break;

      case 'facilities':
        if (store.facilities) {
          for (const f of store.facilities) {
            await pool.query(`
              INSERT INTO facilities (id, title, description, icon, status, sort_order)
              VALUES ($1, $2, $3, $4, $5, $6)
              ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                icon = EXCLUDED.icon,
                status = EXCLUDED.status,
                sort_order = EXCLUDED.sort_order;
            `, [f.id, f.title, f.desc || f.description, f.icon, f.status, f.order || f.sort_order]);
          }
        }
        break;

      case 'gallery':
        if (store.gallery) {
          for (const g of store.gallery) {
            await pool.query(`
              INSERT INTO gallery (id, title, category, url, caption, featured, status, upload_date)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                category = EXCLUDED.category,
                url = EXCLUDED.url,
                caption = EXCLUDED.caption,
                featured = EXCLUDED.featured,
                status = EXCLUDED.status,
                upload_date = EXCLUDED.upload_date;
            `, [g.id, g.title, g.category, g.url || g.src, g.caption, g.featured, g.status, g.uploadDate || null]);
          }
        }
        break;

      case 'testimonials':
        if (store.testimonials) {
          for (const t of store.testimonials) {
            await pool.query(`
              INSERT INTO testimonials (id, name, relation, rating, text, status, image_url)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                relation = EXCLUDED.relation,
                rating = EXCLUDED.rating,
                text = EXCLUDED.text,
                status = EXCLUDED.status,
                image_url = EXCLUDED.image_url;
            `, [t.id, t.name, t.relation, t.rating, t.text, t.status, t.image || t.avatar]);
          }
        }
        break;

      case 'classes':
        if (store.classes) {
          for (const c of store.classes) {
            await pool.query(`
              INSERT INTO classes (id, name, grade, room, academic_year, capacity, teacher_id, teacher_name)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                grade = EXCLUDED.grade,
                room = EXCLUDED.room,
                academic_year = EXCLUDED.academic_year,
                capacity = EXCLUDED.capacity,
                teacher_id = EXCLUDED.teacher_id,
                teacher_name = EXCLUDED.teacher_name;
            `, [c.id, c.name, c.grade, c.room, c.academicYear || '2026-27', c.capacity || 15, c.teacherId, c.teacherName]);
          }
        }
        break;

      case 'settings':
      case 'homepage':
      case 'about':
        if (store.homepage) {
          await pool.query(`INSERT INTO global_settings (id, data) VALUES ('homepage', $1) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;`, [JSON.stringify(store.homepage)]);
        }
        if (store.about) {
          await pool.query(`INSERT INTO global_settings (id, data) VALUES ('about', $1) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;`, [JSON.stringify(store.about)]);
        }
        if (store.settings) {
          await pool.query(`INSERT INTO global_settings (id, data) VALUES ('settings', $1) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;`, [JSON.stringify(store.settings)]);
        }
        break;

      default:
        break;
    }
  } catch (err) {
    console.warn(`Neon background sync error for ${resource}:`, err.message);
  }
}

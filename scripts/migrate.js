import fs from 'fs';
import path from 'path';
import { Pool } from '@neondatabase/serverless';

// Load DATABASE_URL from .env or .env.local if not already in process.env
if (!process.env.DATABASE_URL) {
  const envLocalPath = path.join(process.cwd(), '.env.local');
  const envPath = path.join(process.cwd(), '.env');
  const targetPath = fs.existsSync(envLocalPath) ? envLocalPath : fs.existsSync(envPath) ? envPath : null;
  if (targetPath) {
    const content = fs.readFileSync(targetPath, 'utf8');
    const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
    if (match) {
      process.env.DATABASE_URL = match[1];
    }
  }
}

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error("Please set DATABASE_URL in .env.local or environment");
    process.exit(1);
  }

  console.log("🔗 Connecting to Neon PostgreSQL:", process.env.DATABASE_URL.split('@')[1]?.split('?')[0] || 'Neon Instance');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    console.log("🚀 Starting complete database migration to Neon...");
    
    // 1. Read existing data
    const dataPath = path.join(process.cwd(), 'data', 'vannam-store.json');
    if (!fs.existsSync(dataPath)) {
        console.error("vannam-store.json not found!");
        process.exit(1);
    }
    const store = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // 2. Create tables
    console.log("🛠️  Creating & verifying all Neon database tables...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS global_settings (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL
      );

      CREATE TABLE IF NOT EXISTS programs (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255),
        age_group VARCHAR(100),
        timing VARCHAR(100),
        ratio VARCHAR(50),
        fee VARCHAR(100),
        badge VARCHAR(100),
        status VARCHAR(50),
        sort_order INT,
        description TEXT,
        features JSONB,
        icon VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS facilities (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        icon VARCHAR(100),
        status VARCHAR(50),
        sort_order INT
      );

      CREATE TABLE IF NOT EXISTS teachers (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        role VARCHAR(255),
        experience VARCHAR(100),
        qualifications TEXT,
        bio TEXT,
        image_url TEXT,
        active BOOLEAN,
        email VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        relation VARCHAR(255),
        rating INT,
        text TEXT,
        status VARCHAR(50),
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS gallery (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(100),
        url TEXT,
        caption TEXT,
        featured BOOLEAN,
        status VARCHAR(50),
        upload_date DATE
      );

      CREATE TABLE IF NOT EXISTS announcements (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255),
        message TEXT,
        type VARCHAR(100),
        active BOOLEAN,
        start_date DATE,
        expiry_date DATE,
        link VARCHAR(255),
        link_text VARCHAR(100),
        banner_color VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS enquiries (
        id VARCHAR(50) PRIMARY KEY,
        parent_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        child_age VARCHAR(50),
        program VARCHAR(255),
        message TEXT,
        status VARCHAR(50),
        notes JSONB,
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS admissions (
        id VARCHAR(50) PRIMARY KEY,
        parent_name VARCHAR(255),
        child_name VARCHAR(255),
        child_dob DATE,
        email VARCHAR(255),
        phone VARCHAR(50),
        program VARCHAR(255),
        preferred_date DATE,
        status VARCHAR(50),
        notes JSONB,
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        role VARCHAR(50),
        avatar TEXT,
        last_login TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS audit_logs (
        id VARCHAR(50) PRIMARY KEY,
        action VARCHAR(255),
        user_id VARCHAR(50),
        user_name VARCHAR(255),
        resource VARCHAR(255),
        details TEXT,
        timestamp TIMESTAMP
      );

      -- PARENT PORTAL TABLES
      CREATE TABLE IF NOT EXISTS classes (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        grade VARCHAR(100),
        room VARCHAR(100),
        academic_year VARCHAR(50),
        capacity INT,
        teacher_id VARCHAR(50),
        teacher_name VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS students (
        id VARCHAR(50) PRIMARY KEY,
        student_id VARCHAR(50) UNIQUE,
        name VARCHAR(255),
        dob DATE,
        gender VARCHAR(20),
        class_id VARCHAR(50),
        class_name VARCHAR(255),
        teacher_id VARCHAR(50),
        teacher_name VARCHAR(255),
        parent_name VARCHAR(255),
        parent_email VARCHAR(255),
        parent_phone VARCHAR(50),
        parent_pin VARCHAR(50),
        emergency_contact VARCHAR(50),
        blood_group VARCHAR(20),
        allergies TEXT,
        status VARCHAR(50),
        enrollment_date DATE,
        photo TEXT,
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS attendance (
        id VARCHAR(50) PRIMARY KEY,
        student_id VARCHAR(50),
        student_name VARCHAR(255),
        class_id VARCHAR(50),
        teacher_id VARCHAR(50),
        date DATE,
        status VARCHAR(50),
        remarks TEXT
      );

      CREATE TABLE IF NOT EXISTS activities (
        id VARCHAR(50) PRIMARY KEY,
        student_id VARCHAR(50),
        student_name VARCHAR(255),
        class_id VARCHAR(50),
        class_name VARCHAR(255),
        teacher_id VARCHAR(50),
        teacher_name VARCHAR(255),
        title VARCHAR(255),
        category VARCHAR(100),
        description TEXT,
        date DATE,
        photos JSONB,
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS homework (
        id VARCHAR(50) PRIMARY KEY,
        class_id VARCHAR(50),
        class_name VARCHAR(255),
        teacher_id VARCHAR(50),
        teacher_name VARCHAR(255),
        title VARCHAR(255),
        subject VARCHAR(100),
        description TEXT,
        due_date DATE,
        status VARCHAR(50),
        materials TEXT
      );
    `);

    // 3. Clear existing data
    console.log("🧹 Synchronizing fresh table states in Neon...");
    await client.query(`
      TRUNCATE TABLE global_settings, programs, facilities, teachers, testimonials, gallery, announcements, enquiries, admissions, users, audit_logs, classes, students, attendance, activities, homework;
    `);

    // 4. Insert Global Settings
    console.log("💾 Migrating global settings...");
    await client.query(`INSERT INTO global_settings (id, data) VALUES ($1, $2)`, ['homepage', JSON.stringify(store.homepage)]);
    await client.query(`INSERT INTO global_settings (id, data) VALUES ($1, $2)`, ['about', JSON.stringify(store.about)]);
    await client.query(`INSERT INTO global_settings (id, data) VALUES ($1, $2)`, ['settings', JSON.stringify(store.settings)]);

    // 5. Insert Programs
    console.log("💾 Migrating programs...");
    for (const p of (store.programs || [])) {
      await client.query(`
        INSERT INTO programs (id, title, age_group, timing, ratio, fee, badge, status, sort_order, description, features, icon)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [p.id, p.title, p.ageGroup, p.timing, p.ratio, p.fee, p.badge, p.status, p.order, p.desc, JSON.stringify(p.features), p.icon]);
    }

    // 6. Insert Facilities
    console.log("💾 Migrating facilities...");
    for (const f of (store.facilities || [])) {
      await client.query(`
        INSERT INTO facilities (id, title, description, icon, status, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [f.id, f.title, f.desc, f.icon, f.status, f.order]);
    }

    // 7. Insert Teachers
    console.log("💾 Migrating teachers...");
    for (const t of (store.teachers || [])) {
      await client.query(`
        INSERT INTO teachers (id, name, role, experience, qualifications, bio, image_url, active, email)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [t.id, t.name, t.role, t.experience, t.qualifications, t.bio, t.image, t.active, t.email]);
    }

    // 8. Insert Testimonials
    console.log("💾 Migrating testimonials...");
    for (const t of (store.testimonials || [])) {
      await client.query(`
        INSERT INTO testimonials (id, name, relation, rating, text, status, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [t.id, t.name, t.relation, t.rating, t.text, t.status, t.image || t.avatar]);
    }

    // 9. Insert Gallery
    console.log("💾 Migrating gallery...");
    for (const g of (store.gallery || [])) {
      await client.query(`
        INSERT INTO gallery (id, title, category, url, caption, featured, status, upload_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [g.id, g.title, g.category, g.url || g.src, g.caption, g.featured, g.status, g.uploadDate || null]);
    }

    // 10. Insert Announcements
    console.log("💾 Migrating announcements...");
    for (const a of (store.announcements || [])) {
      await client.query(`
        INSERT INTO announcements (id, title, message, type, active, start_date, expiry_date, link, link_text, banner_color)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [a.id, a.title, a.message, a.type, a.active, a.startDate || null, a.expiryDate || null, a.link, a.linkText, a.bannerColor]);
    }

    // 11. Insert Enquiries & Admissions
    console.log("💾 Migrating enquiries & admissions...");
    for (const e of (store.enquiries || [])) {
      await client.query(`
        INSERT INTO enquiries (id, parent_name, email, phone, child_age, program, message, status, notes, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [e.id, e.parentName, e.email, e.phone, e.childAge, e.program, e.message, e.status, JSON.stringify(e.notes), e.createdAt]);
    }

    for (const a of (store.admissions || [])) {
      await client.query(`
        INSERT INTO admissions (id, parent_name, child_name, child_dob, email, phone, program, preferred_date, status, notes, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [a.id, a.parentName, a.childName, a.childDob || null, a.email, a.phone, a.program, a.preferredDate || null, a.status, JSON.stringify(a.notes), a.createdAt]);
    }

    // 12. Insert Users (Admin, Teachers, and Parents)
    console.log("💾 Migrating users (Admins, Teachers, Parents)...");
    for (const u of (store.users || [])) {
      await client.query(`
        INSERT INTO users (id, name, email, password, role, avatar, last_login)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET 
          password = EXCLUDED.password,
          role = EXCLUDED.role,
          name = EXCLUDED.name;
      `, [u.id, u.name, u.email, u.password, u.role, u.avatar, u.lastLogin || null]);
    }

    // 13. Insert Classes
    console.log("💾 Migrating classrooms...");
    for (const c of (store.classes || [])) {
      await client.query(`
        INSERT INTO classes (id, name, grade, room, academic_year, capacity, teacher_id, teacher_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [c.id, c.name, c.grade, c.room, c.academicYear || '2026-27', c.capacity || 15, c.teacherId, c.teacherName]);
    }

    // 14. Insert Students (With parentPin & unique Student ID)
    console.log("💾 Migrating students & parent linkings...");
    for (const s of (store.students || [])) {
      await client.query(`
        INSERT INTO students (
          id, student_id, name, dob, gender, class_id, class_name, teacher_id, teacher_name,
          parent_name, parent_email, parent_phone, parent_pin, emergency_contact,
          blood_group, allergies, status, enrollment_date, photo, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      `, [
        s.id, s.studentId, s.name, s.dob || null, s.gender, s.classId, s.className, s.teacherId, s.teacherName,
        s.parentName, s.parentEmail, s.parentPhone, s.parentPin || '2026', s.emergencyContact,
        s.bloodGroup, s.allergies, s.status, s.enrollmentDate || null, s.photo, s.createdAt || new Date()
      ]);
    }

    // 15. Insert Attendance
    console.log("💾 Migrating attendance records...");
    for (const a of (store.attendance || [])) {
      await client.query(`
        INSERT INTO attendance (id, student_id, student_name, class_id, teacher_id, date, status, remarks)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [a.id, a.studentId, a.studentName, a.classId, a.teacherId, a.date || new Date(), a.status, a.remarks]);
    }

    // 16. Insert Activities
    console.log("💾 Migrating student activities & photo feeds...");
    for (const act of (store.activities || [])) {
      await client.query(`
        INSERT INTO activities (id, student_id, student_name, class_id, class_name, teacher_id, teacher_name, title, category, description, date, photos, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `, [
        act.id, act.studentId, act.studentName, act.classId, act.className, act.teacherId, act.teacherName,
        act.title, act.category, act.description, act.date || new Date(), JSON.stringify(act.photos || []), act.createdAt || new Date()
      ]);
    }

    // 17. Insert Homework
    console.log("💾 Migrating homework & tasks...");
    for (const h of (store.homework || [])) {
      await client.query(`
        INSERT INTO homework (id, class_id, class_name, teacher_id, teacher_name, title, subject, description, due_date, status, materials)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [h.id, h.classId, h.className, h.teacherId, h.teacherName, h.title, h.subject, h.description, h.dueDate || new Date(), h.status, h.materials]);
    }

    // 18. Audit Log
    await client.query(`
      INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      `log-${Date.now()}`,
      'Neon Migration Completed',
      'usr-1',
      'Dr. Gayathri R. (Director)',
      'Database',
      'All Web CMS & Parent Portal schemas and records fully synchronized into Neon PostgreSQL.',
      new Date()
    ]);

    console.log("✨ ALL TABLES & RECORDS SUCCESSFULLY MIGRATED TO NEON POSTGRESQL!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();

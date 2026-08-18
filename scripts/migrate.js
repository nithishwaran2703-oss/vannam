import fs from 'fs';
import path from 'path';
import { Pool } from '@neondatabase/serverless';

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error("Please set DATABASE_URL in .env.local or environment");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    console.log("Starting migration...");
    
    // 1. Read existing data
    const dataPath = path.join(process.cwd(), 'data', 'vannam-store.json');
    if (!fs.existsSync(dataPath)) {
        console.error("vannam-store.json not found!");
        process.exit(1);
    }
    const store = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // 2. Create tables
    console.log("Creating tables...");
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
    `);

    // 3. Clear existing data (optional, but good for re-running)
    await client.query(`
      TRUNCATE TABLE global_settings, programs, facilities, teachers, testimonials, gallery, announcements, enquiries, admissions, users, audit_logs;
    `);

    // 4. Insert Data
    console.log("Inserting global settings...");
    await client.query(`INSERT INTO global_settings (id, data) VALUES ($1, $2)`, ['homepage', JSON.stringify(store.homepage)]);
    await client.query(`INSERT INTO global_settings (id, data) VALUES ($1, $2)`, ['about', JSON.stringify(store.about)]);
    await client.query(`INSERT INTO global_settings (id, data) VALUES ($1, $2)`, ['settings', JSON.stringify(store.settings)]);

    console.log("Inserting programs...");
    for (const p of (store.programs || [])) {
      await client.query(`
        INSERT INTO programs (id, title, age_group, timing, ratio, fee, badge, status, sort_order, description, features, icon)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [p.id, p.title, p.ageGroup, p.timing, p.ratio, p.fee, p.badge, p.status, p.order, p.desc, JSON.stringify(p.features), p.icon]);
    }

    console.log("Inserting facilities...");
    for (const f of (store.facilities || [])) {
      await client.query(`
        INSERT INTO facilities (id, title, description, icon, status, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [f.id, f.title, f.desc, f.icon, f.status, f.order]);
    }

    console.log("Inserting teachers...");
    for (const t of (store.teachers || [])) {
      await client.query(`
        INSERT INTO teachers (id, name, role, experience, qualifications, bio, image_url, active, email)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [t.id, t.name, t.role, t.experience, t.qualifications, t.bio, t.image, t.active, t.email]);
    }

    console.log("Inserting testimonials...");
    for (const t of (store.testimonials || [])) {
      await client.query(`
        INSERT INTO testimonials (id, name, relation, rating, text, status, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [t.id, t.name, t.relation, t.rating, t.text, t.status, t.image]);
    }

    console.log("Inserting gallery...");
    for (const g of (store.gallery || [])) {
      await client.query(`
        INSERT INTO gallery (id, title, category, url, caption, featured, status, upload_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [g.id, g.title, g.category, g.url, g.caption, g.featured, g.status, g.uploadDate]);
    }

    console.log("Inserting announcements...");
    for (const a of (store.announcements || [])) {
      await client.query(`
        INSERT INTO announcements (id, title, message, type, active, start_date, expiry_date, link, link_text, banner_color)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [a.id, a.title, a.message, a.type, a.active, a.startDate, a.expiryDate, a.link, a.linkText, a.bannerColor]);
    }

    console.log("Inserting enquiries...");
    for (const e of (store.enquiries || [])) {
      await client.query(`
        INSERT INTO enquiries (id, parent_name, email, phone, child_age, program, message, status, notes, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [e.id, e.parentName, e.email, e.phone, e.childAge, e.program, e.message, e.status, JSON.stringify(e.notes), e.createdAt]);
    }

    console.log("Inserting admissions...");
    for (const a of (store.admissions || [])) {
      await client.query(`
        INSERT INTO admissions (id, parent_name, child_name, child_dob, email, phone, program, preferred_date, status, notes, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [a.id, a.parentName, a.childName, a.childDob, a.email, a.phone, a.program, a.preferredDate, a.status, JSON.stringify(a.notes), a.createdAt]);
    }

    console.log("Inserting users...");
    for (const u of (store.users || [])) {
      await client.query(`
        INSERT INTO users (id, name, email, password, role, avatar, last_login)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [u.id, u.name, u.email, u.password, u.role, u.avatar, u.lastLogin]);
    }

    console.log("Inserting audit_logs...");
    for (const l of (store.auditLogs || [])) {
      await client.query(`
        INSERT INTO audit_logs (id, action, user_id, user_name, resource, details, timestamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [l.id, l.action, l.userId, l.userName, l.resource, l.details, l.timestamp]);
    }

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();

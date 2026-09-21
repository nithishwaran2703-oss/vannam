const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

const dataPath = path.join(__dirname, '..', 'data', 'vannam-store.json');
const store = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Build complete users list
const adminUser = {
  id: "usr-1",
  name: "Dr. Gayathri R. (Super Admin)",
  email: "admin@vannam.edu",
  password: "Admin@Vannam2026",
  role: "ADMIN",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80",
  lastLogin: new Date().toISOString()
};

const teacherUser = {
  id: "usr-teacher-1",
  name: "Teacher Sarah Jenkins",
  email: "teacher@vannam.edu",
  password: "Teacher@Vannam2026",
  role: "TEACHER",
  avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&q=80",
  lastLogin: null
};

const demoParent = {
  id: "usr-parent-demo",
  name: "Andrew Vance (Parent)",
  email: "andrew@vannamworld.edu",
  password: "2026",
  role: "PARENT",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
  lastLogin: null
};

// Generate parent accounts from students
const studentParents = (store.students || []).map((s, idx) => ({
  id: `usr-parent-${s.id || idx}`,
  name: s.parentName || `Parent of ${s.name}`,
  email: (s.parentEmail || `parent.${s.studentId}@example.com`).toLowerCase(),
  password: s.parentPin || "2026",
  role: "PARENT",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
  lastLogin: null
}));

// Combine distinct users by email
const allUsersMap = new Map();
allUsersMap.set(adminUser.email.toLowerCase(), adminUser);
allUsersMap.set(teacherUser.email.toLowerCase(), teacherUser);
allUsersMap.set(demoParent.email.toLowerCase(), demoParent);
for (const p of studentParents) {
  allUsersMap.set(p.email.toLowerCase(), p);
}

store.users = Array.from(allUsersMap.values());
fs.writeFileSync(dataPath, JSON.stringify(store, null, 2), 'utf-8');
console.log('✅ vannam-store.json updated with', store.users.length, 'users:');
store.users.forEach(u => console.log(`  - [${u.role}] ${u.name} <${u.email}> (Password/PIN: ${u.password})`));

// Sync directly to Neon PostgreSQL
const sql = neon('postgresql://neondb_owner:npg_sbnhif1K2AZC@ep-autumn-resonance-awbnd4f3.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function syncToNeon() {
  console.log('\n🚀 Syncing users into Neon PostgreSQL users table...');
  for (const u of store.users) {
    await sql`
      INSERT INTO users (id, name, email, password, role, avatar, last_login)
      VALUES (${u.id}, ${u.name}, ${u.email}, ${u.password}, ${u.role}, ${u.avatar}, ${u.lastLogin || null})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        password = EXCLUDED.password,
        role = EXCLUDED.role,
        avatar = EXCLUDED.avatar;
    `;
  }
  
  const neonUsers = await sql`SELECT id, name, email, role, password FROM users ORDER BY role, name;`;
  console.log('🎉 Neon PostgreSQL users table now contains:');
  console.table(neonUsers);
}

syncToNeon().catch(console.error);

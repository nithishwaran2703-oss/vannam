const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

const dataPath = path.join(__dirname, '..', 'data', 'vannam-store.json');
const store = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Get args: node scripts/reset-admin.js [targetEmail] [newPassword]
const args = process.argv.slice(2);
const targetEmail = args[0] ? args[0].toLowerCase().trim() : null;
const newPassword = args[1] ? args[1].trim() : null;

// Neon database connection string
const NEON_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_sbnhif1K2AZC@ep-autumn-resonance-awbnd4f3.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(NEON_URL);

async function main() {
  console.log('=====================================================');
  console.log(' 🛡️  VANNAM ADMIN CREDENTIAL RECOVERY & MANAGEMENT   ');
  console.log('=====================================================\n');

  if (!targetEmail || !newPassword) {
    console.log('📌 Current Registered Super Admins & Teachers:\n');
    const staff = (store.users || []).filter(u => u.role !== 'PARENT');
    staff.forEach(u => {
      console.log(`  Role:     ${u.role}`);
      console.log(`  Name:     ${u.name}`);
      console.log(`  Email:    ${u.email}`);
      console.log(`  Password: ${u.password}`);
      console.log('  ---------------------------------------------------');
    });

    console.log('\n🔑 Emergency Rescue Master Key:');
    console.log('  Email:    admin@vannam.edu');
    console.log('  Password: Admin@Vannam2026');
    console.log('  (This master key always works even if the password was changed)\n');

    console.log('💡 How to reset password for any user:');
    console.log('  node scripts/reset-admin.js <email> <newPassword>');
    console.log('  Example: node scripts/reset-admin.js admin@vannam.edu MyNewPass123\n');
    return;
  }

  // Find user to reset
  const user = (store.users || []).find(u => u.email.toLowerCase() === targetEmail);

  if (!user) {
    console.error(`❌ User with email "${targetEmail}" was not found!`);
    console.log('Available emails:', (store.users || []).map(u => u.email).join(', '));
    return;
  }

  // Update in local store
  user.password = newPassword;
  fs.writeFileSync(dataPath, JSON.stringify(store, null, 2), 'utf-8');
  console.log(`✅ [Local Store] Password updated for ${user.email} -> "${newPassword}"`);

  // Update in Neon PostgreSQL
  try {
    console.log(`⏳ [Neon DB] Syncing new password to Neon cloud database...`);
    await sql`
      UPDATE users 
      SET password = ${newPassword}
      WHERE LOWER(email) = ${targetEmail};
    `;
    console.log(`🎉 [Neon DB] Cloud database successfully updated!`);
  } catch (err) {
    console.error(`⚠️ Could not sync to Neon DB:`, err.message);
  }

  console.log('\n=====================================================');
  console.log(`✨ SUCCESS: You can now login at /admin/login with:`);
  console.log(`   Email:    ${user.email}`);
  console.log(`   Password: ${newPassword}`);
  console.log('=====================================================\n');
}

main().catch(console.error);

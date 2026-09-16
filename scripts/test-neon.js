const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_sbnhif1K2AZC@ep-autumn-resonance-awbnd4f3.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time, current_database() as db_name`;
    console.log('✅ NEON POSTGRESQL SUCCESSFUL CONNECTION:', result);
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

testConnection();

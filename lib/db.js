import { Pool } from '@neondatabase/serverless';

let pool;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

if (process.env.NODE_ENV === 'development') {
  // In development, preserve connection across HMR (Hot Module Replacement)
  if (!global._pool) {
    global._pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  pool = global._pool;
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

export default pool;

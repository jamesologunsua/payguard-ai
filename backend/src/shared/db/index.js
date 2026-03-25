import pgPromise from "pg-promise";
import 'dotenv/config'

const pgp = pgPromise({
  noWarnings: true
});

export const db = pgp({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Health check on startup
(async () => {
  try {
    await db.one('SELECT 1');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
})();


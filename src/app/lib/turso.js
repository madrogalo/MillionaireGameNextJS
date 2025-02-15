import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

(async () => {
  try {
    const result = await db.execute('SELECT * FROM users');
    console.log('✅ Connection successful:', result);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
})();

export default db;

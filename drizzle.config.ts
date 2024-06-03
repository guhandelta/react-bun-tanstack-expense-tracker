
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './server/db/schema/*',
    out: './drizzle',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_URL,
    },
});
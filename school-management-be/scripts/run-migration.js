import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function runMigration() {
  try {
    console.log('🔌 Connecting to database...');

    // Read the migration SQL file (pass filename as argument, defaults to add_news_table.sql)
    const migrationFile = process.argv[2] || 'add_news_table.sql';
    const migrationPath = path.join(__dirname, '../migrations', migrationFile);
    console.log(`📄 Running migration: ${migrationFile}`);
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('📝 Running migration...');
    
    // Split SQL by semicolons and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      await prisma.$executeRawUnsafe(statement);
    }

    console.log('✅ Migration completed successfully!');
    console.log('✨ News table created and seeded with default data');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  }
}

runMigration();

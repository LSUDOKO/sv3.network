// import 'server-only'
/**
 * Database migration runner for sv3.network
 * Handles running and rolling back database migrations
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { Migrator, FileMigrationProvider } from 'kysely';
import { getDatabase } from './index';

/**
 * Get migration provider that loads migration files
 */
async function getMigrationProvider(): Promise<FileMigrationProvider> {
  const migrationsPath = join(__dirname, 'migrations');
  
  return new FileMigrationProvider({
    fs,
    path: {
      join,
    },
    migrationFolder: migrationsPath,
  });
}

/**
 * Create migrator instance
 */
async function createMigrator(): Promise<Migrator> {
  const db = getDatabase();
  const provider = await getMigrationProvider();
  
  return new Migrator({
    db,
    provider,
  });
}

/**
 * Run all pending migrations
 */
export async function migrateToLatest(): Promise<void> {
  const migrator = await createMigrator();
  
  console.log('🔄 Running database migrations...');
  
  const { error, results } = await migrator.migrateToLatest();
  
  if (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
  
  if (!results) {
    console.log('✅ No migrations to run');
    return;
  }
  
  for (const result of results) {
    if (result.status === 'Success') {
      console.log(`✅ Migration "${result.migrationName}" executed successfully`);
    } else if (result.status === 'Error') {
      console.error(`❌ Migration "${result.migrationName}" failed`);
    }
  }
  
  console.log('🎉 All migrations completed successfully');
}

/**
 * Rollback the last migration
 */
export async function migrateDown(): Promise<void> {
  const migrator = await createMigrator();
  
  console.log('🔄 Rolling back last migration...');
  
  const { error, results } = await migrator.migrateDown();
  
  if (error) {
    console.error('❌ Migration rollback failed:', error);
    throw error;
  }
  
  if (!results) {
    console.log('✅ No migrations to rollback');
    return;
  }
  
  for (const result of results) {
    if (result.status === 'Success') {
      console.log(`✅ Migration "${result.migrationName}" rolled back successfully`);
    } else if (result.status === 'Error') {
      console.error(`❌ Migration "${result.migrationName}" rollback failed`);
    }
  }
  
  console.log('🎉 Migration rollback completed successfully');
}

/**
 * Get migration status
 */
export async function getMigrationStatus(): Promise<void> {
  const migrator = await createMigrator();
  
  console.log('📊 Checking migration status...');
  
  const migrations = await migrator.getMigrations();
  
  if (migrations.length === 0) {
    console.log('📝 No migrations found');
    return;
  }
  
  console.log('\n📋 Migration Status:');
  console.log('==================');
  
  for (const migration of migrations) {
    const status = migration.executedAt ? '✅ Executed' : '⏳ Pending';
    const executedAt = migration.executedAt 
      ? ` (${migration.executedAt.toISOString()})` 
      : '';
    
    console.log(`${status} ${migration.name}${executedAt}`);
  }
  
  console.log('==================\n');
}

/**
 * Reset database (rollback all migrations)
 */
export async function resetDatabase(): Promise<void> {
  const migrator = await createMigrator();
  
  console.log('🔄 Resetting database (rolling back all migrations)...');
  
  // Get all executed migrations
  const migrations = await migrator.getMigrations();
  const executedMigrations = migrations.filter(m => m.executedAt);
  
  if (executedMigrations.length === 0) {
    console.log('✅ Database is already clean (no migrations to rollback)');
    return;
  }
  
  // Rollback all migrations
  for (let i = 0; i < executedMigrations.length; i++) {
    const { error, results } = await migrator.migrateDown();
    
    if (error) {
      console.error('❌ Database reset failed:', error);
      throw error;
    }
    
    if (results) {
      for (const result of results) {
        if (result.status === 'Success') {
          console.log(`✅ Rolled back migration "${result.migrationName}"`);
        } else if (result.status === 'Error') {
          console.error(`❌ Failed to rollback migration "${result.migrationName}"`);
          throw new Error(`Migration rollback failed for: ${result.migrationName}`);
        }
      }
    }
  }
  
  console.log('🎉 Database reset completed successfully');
}

/**
 * Setup fresh database (reset + migrate)
 */
export async function setupFreshDatabase(): Promise<void> {
  console.log('🔄 Setting up fresh database...');
  
  try {
    await resetDatabase();
    await migrateToLatest();
    console.log('🎉 Fresh database setup completed successfully');
  } catch (error) {
    console.error('❌ Fresh database setup failed:', error);
    throw error;
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];
  
  async function runCommand() {
    try {
      switch (command) {
        case 'up':
        case 'migrate':
          await migrateToLatest();
          break;
          
        case 'down':
        case 'rollback':
          await migrateDown();
          break;
          
        case 'status':
          await getMigrationStatus();
          break;
          
        case 'reset':
          await resetDatabase();
          break;
          
        case 'fresh':
          await setupFreshDatabase();
          break;
          
        default:
          console.log('📖 Usage:');
          console.log('  npm run db:migrate up      - Run all pending migrations');
          console.log('  npm run db:migrate down    - Rollback last migration');
          console.log('  npm run db:migrate status  - Show migration status');
          console.log('  npm run db:migrate reset   - Rollback all migrations');
          console.log('  npm run db:migrate fresh   - Reset and run all migrations');
          process.exit(1);
      }
      
      process.exit(0);
    } catch (error) {
      console.error('❌ Command failed:', error);
      process.exit(1);
    }
  }
  
  runCommand();
}
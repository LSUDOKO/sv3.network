// import 'server-only'

/**
 * Database connection and configuration for sv3.network
 * Using Kysely with PostgreSQL and NeonDB
 */

import { Kysely, PostgresDialect, CamelCasePlugin, ParseJSONResultsPlugin } from 'kysely';
import { Pool } from 'pg';
import { Database } from './schema';
// import dotenv from 'dotenv';

// dotenv.config({path: ['./.env', '../../.env', '../../../.env']});

// Database configuration interface
interface DatabaseConfig {
  connectionUrl: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  max_connections?: number;
  idle_timeout?: number;
  connection_timeout?: number;
}

// Environment-based configuration
function getDatabaseConfig(): DatabaseConfig {
  const config: DatabaseConfig = {
    connectionUrl: process.env.DATABASE_URL || '',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME || 'sv3_network',
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    ssl: process.env.DATABASE_SSL === 'true' || process.env.NODE_ENV === 'production',
    max_connections: parseInt(process.env.DATABASE_MAX_CONNECTIONS || '20'),
    idle_timeout: parseInt(process.env.DATABASE_IDLE_TIMEOUT || '30000'),
    connection_timeout: parseInt(process.env.DATABASE_CONNECTION_TIMEOUT || '10000'),
  };

  // NeonDB specific configuration
  if (process.env.DATABASE_URL) {
    // Parse NeonDB connection string
    const url = new URL(process.env.DATABASE_URL);
    config.host = url.hostname;
    config.port = parseInt(url.port) || 5432;
    config.database = url.pathname.slice(1);
    config.username = url.username;
    config.password = url.password;
    config.ssl = true; // NeonDB requires SSL
  }

  return config;
}

// Create PostgreSQL connection pool
function createConnectionPool(): Pool {
  const config = getDatabaseConfig();
  
  return new Pool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.username,
    password: config.password,
    ssl: config.ssl ? { rejectUnauthorized: false } : false,
    max: config.max_connections,
    idleTimeoutMillis: config.idle_timeout,
    connectionTimeoutMillis: config.connection_timeout,
    // Additional PostgreSQL optimizations
    statement_timeout: parseInt(process.env.DB_STATEMENT_TIMEOUT_MS || '60000'), // 60 seconds
    query_timeout: parseInt(process.env.DB_QUERY_TIMEOUT_MS || '30000'), // 30 seconds
    application_name: 'sv3-network',
  });
}

// Create Kysely database instance
function createDatabase(): Kysely<Database> {
  const pool = createConnectionPool();
  
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool,
    }),
    plugins: [
      // Convert snake_case to camelCase for JavaScript/TypeScript
      new CamelCasePlugin(),
      // Parse JSON columns automatically
      new ParseJSONResultsPlugin(),
    ],
    log: (event) => {
      // Log queries in development
      if (process.env.NODE_ENV === 'development') {
        if (event.level === 'query') {
          console.log('🔍 Database Query:', event.query.sql);
          console.log('📊 Parameters:', event.query.parameters);
          console.log('⏱️  Duration:', `${event.queryDurationMillis}ms`);
        }
        if (event.level === 'error') {
          console.error('❌ Database Error:', event.error);
        }
      }
    },
  });
}

// Singleton database instance
let db: Kysely<Database> | null = null;

/**
 * Get the database instance (singleton pattern)
 */
export function getDatabase(): Kysely<Database> {
  if (!db) {
    db = createDatabase();
  }
  return db;
}

/**
 * Close the database connection
 */
export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.destroy();
    db = null;
  }
}

/**
 * Test database connection
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const database = getDatabase();
    await database.selectFrom('users').select('id').limit(1).execute();
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

/**
 * Database health check
 */
export async function getDatabaseHealth(): Promise<{
  connected: boolean;
  latency?: number;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    const database = getDatabase();
    await database.selectFrom('users').select('id').limit(1).execute();
    
    return {
      connected: true,
      latency: Date.now() - startTime,
    };
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Execute database transaction
 */
export async function executeTransaction<T>(
  callback: (trx: Kysely<Database>) => Promise<T>
): Promise<T> {
  const database = getDatabase();
  return await database.transaction().execute(callback);
}

/**
 * Database utilities for common operations
 */
export const dbUtils = {
  /**
   * Generate a new UUID (for use in inserts)
   */
  generateId: (): string => {
    return crypto.randomUUID();
  },

  /**
   * Get current timestamp
   */
  now: (): Date => {
    return new Date();
  },

  /**
   * Convert date to ISO string for database storage
   */
  toISOString: (date: Date): string => {
    return date.toISOString();
  },

  /**
   * Parse ISO string from database to Date
   */
  fromISOString: (isoString: string): Date => {
    return new Date(isoString);
  },

  /**
   * Validate wallet address format
   */
  isValidWalletAddress: (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  },

  /**
   * Validate transaction hash format
   */
  isValidTransactionHash: (hash: string): boolean => {
    return /^0x[a-fA-F0-9]{64}$/.test(hash);
  },

  /**
   * Sanitize string for database storage
   */
  sanitizeString: (str: string): string => {
    return str.trim().replace(/\0/g, '');
  },

  /**
   * Generate slug from string
   */
  generateSlug: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
};

// Export the database instance as default
export default getDatabase();

// Export types for convenience
export type { Database } from './schema';
export * from './types';
export * from './enums';

// Database configuration for migrations and CLI tools
export const databaseConfig = getDatabaseConfig();
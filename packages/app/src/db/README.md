# sv3.network Database Layer

This directory contains the database layer for sv3.network, built with Kysely and PostgreSQL (NeonDB).

## 📁 Structure

```
src/db/
├── README.md              # This file
├── index.ts              # Database connection and configuration
├── schema.ts             # Database schema definitions
├── types.ts              # TypeScript interfaces and types
├── enums.ts              # Database enums
├── migrate.ts            # Migration runner utility
└── migrations/           # Migration files
    ├── 001_initial_schema.ts
    └── 002_indexes_and_constraints.ts
```

## 🚀 Quick Start

### 1. Environment Setup

Copy the environment example file and configure your database:

```bash
cp .env.example .env.local
```

Update `.env.local` with your NeonDB connection string:

```env
DATABASE_URL="postgresql://username:password@hostname:port/database?sslmode=require"
```

### 2. Run Migrations

```bash
# Run all pending migrations
npm run db:migrate:up

# Check migration status
npm run db:migrate:status

# Rollback last migration
npm run db:migrate:down

# Reset database (rollback all migrations)
npm run db:migrate:reset

# Fresh setup (reset + migrate)
npm run db:migrate:fresh
```

## 📊 Database Schema

### Core Tables

- **users** - User accounts with roles and authentication
- **organizations** - Organizations and companies
- **organization_members** - User-organization relationships
- **documents** - Document storage and metadata
- **signatures** - Digital signatures and verification
- **audit_logs** - Comprehensive audit trail
- **document_permissions** - Document access control
- **notifications** - User notifications
- **document_templates** - Reusable document templates
- **blockchain_transactions** - Blockchain transaction records

### Key Features

- **Role-based Access Control** - User roles (admin, manager, user, viewer)
- **Multi-tenant Architecture** - Organization-based data isolation
- **Audit Trail** - Complete audit logging for compliance
- **Document Management** - Version control and permissions
- **Blockchain Integration** - Transaction tracking and verification
- **Notification System** - Real-time user notifications

## 🔧 Usage Examples

### Basic Database Operations

```typescript
import { getDatabase } from '@/db';

const db = getDatabase();

// Get all users
const users = await db.selectFrom('users').selectAll().execute();

// Create a new user
const newUser = await db
  .insertInto('users')
  .values({
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    wallet_address: '0x...',
  })
  .returningAll()
  .executeTakeFirstOrThrow();

// Update user
await db
  .updateTable('users')
  .set({ name: 'Jane Doe' })
  .where('id', '=', userId)
  .execute();
```

### Transaction Example

```typescript
import { withTransaction } from '@/db';

await withTransaction(async (trx) => {
  // Create organization
  const org = await trx
    .insertInto('organizations')
    .values({
      name: 'Acme Corp',
      type: 'corporation',
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  // Add user as admin
  await trx
    .insertInto('organization_members')
    .values({
      organization_id: org.id,
      user_id: userId,
      role: 'admin',
    })
    .execute();
});
```

### Complex Queries with Joins

```typescript
// Get user's documents with organization info
const userDocuments = await db
  .selectFrom('documents')
  .innerJoin('organizations', 'organizations.id', 'documents.organization_id')
  .innerJoin('organization_members', 'organization_members.organization_id', 'organizations.id')
  .select([
    'documents.id',
    'documents.title',
    'documents.type',
    'documents.status',
    'organizations.name as organization_name',
  ])
  .where('organization_members.user_id', '=', userId)
  .execute();
```

## 🔒 Security Features

- **SQL Injection Protection** - Kysely provides built-in protection
- **Connection Pooling** - Efficient database connections
- **SSL/TLS Encryption** - Secure data transmission
- **Role-based Access** - Granular permission system
- **Audit Logging** - Complete activity tracking

## 📈 Performance Optimizations

- **Database Indexes** - Optimized for common queries
- **Connection Pooling** - Configurable pool settings
- **Query Logging** - Development debugging
- **JSON Columns** - Flexible metadata storage
- **Composite Indexes** - Multi-column query optimization

## 🛠 Development

### Adding New Migrations

1. Create a new migration file in `migrations/`:

```typescript
// migrations/003_add_new_feature.ts
import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Add your schema changes here
}

export async function down(db: Kysely<any>): Promise<void> {
  // Add rollback logic here
}
```

2. Run the migration:

```bash
npm run db:migrate:up
```

### Database Health Check

```typescript
import { checkDatabaseHealth } from '@/db';

const isHealthy = await checkDatabaseHealth();
console.log('Database healthy:', isHealthy);
```

## 🔍 Troubleshooting

### Common Issues

1. **Connection Timeout**
   - Check your DATABASE_URL
   - Verify NeonDB instance is running
   - Check network connectivity

2. **Migration Failures**
   - Check migration syntax
   - Verify database permissions
   - Review migration logs

3. **Type Errors**
   - Ensure schema.ts matches database
   - Check type imports in types.ts
   - Verify enum definitions

### Debug Mode

Enable query logging in development:

```env
DB_LOG_QUERIES=true
DB_LOG_LEVEL=debug
```

## 📚 Resources

- [Kysely Documentation](https://kysely.dev/docs/getting-started)
- [NeonDB Documentation](https://neon.tech/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
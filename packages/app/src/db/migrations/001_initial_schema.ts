/**
 * Initial database schema migration for sv3.network
 * Creates all core tables with proper indexes and constraints
 */

import { Kysely, sql } from 'kysely';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  // Enable UUID extension
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);
  
  // Create custom types/enums
  await sql`
    CREATE TYPE user_role AS ENUM (
      'super_admin', 'admin', 'organization_owner', 'organization_admin', 
      'organization_member', 'document_owner', 'document_editor', 
      'document_viewer', 'signer', 'auditor', 'compliance_officer', 'user'
    )
  `.execute(db);

  await sql`
    CREATE TYPE organization_type AS ENUM (
      'enterprise', 'corporation', 'llc', 'partnership', 'sole_proprietorship', 
      'non_profit', 'government', 'educational', 'healthcare', 'other'
    )
  `.execute(db);

  await sql`
    CREATE TYPE organization_status AS ENUM (
      'active', 'inactive', 'suspended', 'pending_verification', 'archived'
    )
  `.execute(db);

  await sql`
    CREATE TYPE document_type AS ENUM (
      'contract', 'agreement', 'invoice', 'receipt', 'certificate', 
      'license', 'permit', 'policy', 'procedure', 'report', 'memo', 
      'letter', 'form', 'application', 'proposal', 'specification', 
      'manual', 'guide', 'whitepaper', 'legal_document', 'compliance_document', 
      'financial_document', 'hr_document', 'technical_document', 'other'
    )
  `.execute(db);

  await sql`
    CREATE TYPE document_status AS ENUM (
      'draft', 'pending_review', 'under_review', 'pending_signatures', 
      'partially_signed', 'fully_signed', 'completed', 'expired', 
      'cancelled', 'rejected', 'archived'
    )
  `.execute(db);

  await sql`
    CREATE TYPE document_privacy AS ENUM ('public', 'private', 'organization', 'restricted')
  `.execute(db);

  await sql`
    CREATE TYPE signature_type AS ENUM (
      'digital', 'electronic', 'biometric', 'blockchain', 'multi_sig', 
      'threshold', 'time_locked', 'conditional'
    )
  `.execute(db);

  await sql`
    CREATE TYPE signature_status AS ENUM (
      'pending', 'signed', 'rejected', 'expired', 'revoked', 'failed'
    )
  `.execute(db);

  await sql`
    CREATE TYPE blockchain_network AS ENUM (
      'ethereum', 'polygon', 'arbitrum', 'optimism', 'base', 'avalanche', 
      'bsc', 'fantom', 'gnosis', 'celo', 'moonbeam', 'aurora', 'harmony', 'testnet'
    )
  `.execute(db);

  await sql`
    CREATE TYPE token_standard AS ENUM ('erc721', 'erc1155', 'erc20', 'native')
  `.execute(db);

  await sql`
    CREATE TYPE audit_action AS ENUM (
      'create', 'read', 'update', 'delete', 'sign', 'verify', 'approve', 
      'reject', 'archive', 'restore', 'export', 'import', 'share', 'revoke', 
      'mint', 'burn', 'transfer', 'login', 'logout', 'permission_grant', 
      'permission_revoke', 'backup', 'restore_backup', 'system_event'
    )
  `.execute(db);

  await sql`
    CREATE TYPE audit_category AS ENUM (
      'authentication', 'authorization', 'document_management', 'signature', 
      'blockchain', 'compliance', 'security', 'system', 'user_management', 
      'organization_management', 'data_export', 'data_import', 'backup', 'other'
    )
  `.execute(db);

  await sql`
    CREATE TYPE permission_type AS ENUM (
      'read', 'write', 'delete', 'sign', 'share', 'export', 'admin', 
      'mint_nft', 'transfer_nft', 'burn_nft', 'manage_permissions'
    )
  `.execute(db);

  await sql`
    CREATE TYPE storage_provider AS ENUM ('ipfs', 'arweave', 's3', 'gcs', 'azure', 'local')
  `.execute(db);

  await sql`
    CREATE TYPE compliance_framework AS ENUM (
      'gdpr', 'ccpa', 'hipaa', 'sox', 'pci_dss', 'iso27001', 'nist', 
      'fisma', 'ferpa', 'glba', 'coso', 'cobit', 'itil', 'other'
    )
  `.execute(db);

  await sql`
    CREATE TYPE notification_type AS ENUM (
      'document_shared', 'signature_request', 'signature_completed', 
      'document_expired', 'document_updated', 'organization_invite', 
      'permission_granted', 'permission_revoked', 'compliance_alert', 
      'security_alert', 'system_maintenance', 'backup_completed', 'other'
    )
  `.execute(db);

  await sql`
    CREATE TYPE notification_status AS ENUM ('unread', 'read', 'archived', 'deleted')
  `.execute(db);

  // Create users table
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('wallet_address', 'varchar(42)', (col) => col.notNull().unique())
    .addColumn('ens_name', 'varchar(255)')
    .addColumn('username', 'varchar(50)')
    .addColumn('email', 'varchar(255)')
    .addColumn('profile_image_url', 'text')
    .addColumn('bio', 'text')
    .addColumn('role', sql`user_role`, (col) => col.notNull().defaultTo('user'))
    .addColumn('is_verified', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('is_active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('last_login_at', 'timestamp')
    .addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create organizations table
  await db.schema
    .createTable('organizations')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('slug', 'varchar(100)', (col) => col.notNull().unique())
    .addColumn('description', 'text')
    .addColumn('logo_url', 'text')
    .addColumn('website_url', 'text')
    .addColumn('type', sql`organization_type`, (col) => col.notNull())
    .addColumn('status', sql`organization_status`, (col) => col.notNull().defaultTo('active'))
    .addColumn('owner_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('restrict'))
    .addColumn('blockchain_address', 'varchar(42)')
    .addColumn('blockchain_network', sql`blockchain_network`)
    .addColumn('compliance_frameworks', 'jsonb', (col) => col.defaultTo('[]'))
    .addColumn('settings', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create organization_members table
  await db.schema
    .createTable('organization_members')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('organization_id', 'uuid', (col) => col.notNull().references('organizations.id').onDelete('cascade'))
    .addColumn('user_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('cascade'))
    .addColumn('role', sql`user_role`, (col) => col.notNull())
    .addColumn('permissions', 'jsonb', (col) => col.defaultTo('[]'))
    .addColumn('invited_by', 'uuid', (col) => col.references('users.id').onDelete('set null'))
    .addColumn('joined_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('is_active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create documents table
  await db.schema
    .createTable('documents')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('title', 'varchar(500)', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('type', sql`document_type`, (col) => col.notNull())
    .addColumn('status', sql`document_status`, (col) => col.notNull().defaultTo('draft'))
    .addColumn('privacy', sql`document_privacy`, (col) => col.notNull().defaultTo('private'))
    .addColumn('owner_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('restrict'))
    .addColumn('organization_id', 'uuid', (col) => col.references('organizations.id').onDelete('set null'))
    .addColumn('file_hash', 'varchar(64)', (col) => col.notNull())
    .addColumn('file_size', 'bigint', (col) => col.notNull())
    .addColumn('file_type', 'varchar(100)', (col) => col.notNull())
    .addColumn('storage_provider', sql`storage_provider`, (col) => col.notNull())
    .addColumn('storage_path', 'text', (col) => col.notNull())
    .addColumn('nft_token_id', 'varchar(100)')
    .addColumn('nft_contract_address', 'varchar(42)')
    .addColumn('blockchain_network', sql`blockchain_network`)
    .addColumn('token_standard', sql`token_standard`)
    .addColumn('transaction_hash', 'varchar(66)')
    .addColumn('expires_at', 'timestamp')
    .addColumn('signed_at', 'timestamp')
    .addColumn('completed_at', 'timestamp')
    .addColumn('tags', 'jsonb', (col) => col.defaultTo('[]'))
    .addColumn('custom_fields', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('version', 'integer', (col) => col.notNull().defaultTo(1))
    .addColumn('parent_document_id', 'uuid', (col) => col.references('documents.id').onDelete('set null'))
    .addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create signatures table
  await db.schema
    .createTable('signatures')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('document_id', 'uuid', (col) => col.notNull().references('documents.id').onDelete('cascade'))
    .addColumn('signer_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('restrict'))
    .addColumn('signer_wallet_address', 'varchar(42)', (col) => col.notNull())
    .addColumn('signature_type', sql`signature_type`, (col) => col.notNull())
    .addColumn('status', sql`signature_status`, (col) => col.notNull().defaultTo('pending'))
    .addColumn('signature_data', 'text', (col) => col.notNull())
    .addColumn('signature_hash', 'varchar(64)', (col) => col.notNull())
    .addColumn('blockchain_transaction_hash', 'varchar(66)')
    .addColumn('blockchain_network', sql`blockchain_network`)
    .addColumn('signed_at', 'timestamp')
    .addColumn('ip_address', 'varchar(45)')
    .addColumn('user_agent', 'text')
    .addColumn('geolocation', 'jsonb')
    .addColumn('signing_order', 'integer')
    .addColumn('required_signatures', 'integer')
    .addColumn('rejected_at', 'timestamp')
    .addColumn('rejection_reason', 'text')
    .addColumn('revoked_at', 'timestamp')
    .addColumn('revocation_reason', 'text')
    .addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create audit_logs table
  await db.schema
    .createTable('audit_logs')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('user_id', 'uuid', (col) => col.references('users.id').onDelete('set null'))
    .addColumn('organization_id', 'uuid', (col) => col.references('organizations.id').onDelete('set null'))
    .addColumn('document_id', 'uuid', (col) => col.references('documents.id').onDelete('set null'))
    .addColumn('signature_id', 'uuid', (col) => col.references('signatures.id').onDelete('set null'))
    .addColumn('action', sql`audit_action`, (col) => col.notNull())
    .addColumn('category', sql`audit_category`, (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('ip_address', 'varchar(45)')
    .addColumn('user_agent', 'text')
    .addColumn('session_id', 'varchar(255)')
    .addColumn('request_id', 'varchar(255)')
    .addColumn('blockchain_transaction_hash', 'varchar(66)')
    .addColumn('blockchain_network', sql`blockchain_network`)
    .addColumn('gas_used', 'bigint')
    .addColumn('before_state', 'jsonb')
    .addColumn('after_state', 'jsonb')
    .addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create document_permissions table
  await db.schema
    .createTable('document_permissions')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('document_id', 'uuid', (col) => col.notNull().references('documents.id').onDelete('cascade'))
    .addColumn('user_id', 'uuid', (col) => col.references('users.id').onDelete('cascade'))
    .addColumn('organization_id', 'uuid', (col) => col.references('organizations.id').onDelete('cascade'))
    .addColumn('permission_type', sql`permission_type`, (col) => col.notNull())
    .addColumn('granted_by', 'uuid', (col) => col.notNull().references('users.id').onDelete('restrict'))
    .addColumn('granted_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('expires_at', 'timestamp')
    .addColumn('is_active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('conditions', 'jsonb')
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create notifications table
  await db.schema
    .createTable('notifications')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('user_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('cascade'))
    .addColumn('organization_id', 'uuid', (col) => col.references('organizations.id').onDelete('set null'))
    .addColumn('document_id', 'uuid', (col) => col.references('documents.id').onDelete('set null'))
    .addColumn('signature_id', 'uuid', (col) => col.references('signatures.id').onDelete('set null'))
    .addColumn('type', sql`notification_type`, (col) => col.notNull())
    .addColumn('status', sql`notification_status`, (col) => col.notNull().defaultTo('unread'))
    .addColumn('title', 'varchar(255)', (col) => col.notNull())
    .addColumn('message', 'text', (col) => col.notNull())
    .addColumn('sent_at', 'timestamp')
    .addColumn('read_at', 'timestamp')
    .addColumn('archived_at', 'timestamp')
    .addColumn('channels', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create document_templates table
  await db.schema
    .createTable('document_templates')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('type', sql`document_type`, (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) => col.references('organizations.id').onDelete('cascade'))
    .addColumn('created_by', 'uuid', (col) => col.notNull().references('users.id').onDelete('restrict'))
    .addColumn('template_data', 'jsonb', (col) => col.notNull().defaultTo('{}'))
    .addColumn('usage_count', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('is_active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('is_public', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('tags', 'jsonb', (col) => col.defaultTo('[]'))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create blockchain_transactions table
  await db.schema
    .createTable('blockchain_transactions')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('transaction_hash', 'varchar(66)', (col) => col.notNull().unique())
    .addColumn('blockchain_network', sql`blockchain_network`, (col) => col.notNull())
    .addColumn('block_number', 'bigint')
    .addColumn('block_hash', 'varchar(66)')
    .addColumn('from_address', 'varchar(42)', (col) => col.notNull())
    .addColumn('to_address', 'varchar(42)')
    .addColumn('contract_address', 'varchar(42)')
    .addColumn('function_name', 'varchar(100)')
    .addColumn('gas_limit', 'bigint')
    .addColumn('gas_used', 'bigint')
    .addColumn('gas_price', 'varchar(100)')
    .addColumn('transaction_fee', 'varchar(100)')
    .addColumn('status', 'varchar(20)', (col) => col.notNull().defaultTo('pending'))
    .addColumn('confirmations', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('user_id', 'uuid', (col) => col.references('users.id').onDelete('set null'))
    .addColumn('organization_id', 'uuid', (col) => col.references('organizations.id').onDelete('set null'))
    .addColumn('document_id', 'uuid', (col) => col.references('documents.id').onDelete('set null'))
    .addColumn('signature_id', 'uuid', (col) => col.references('signatures.id').onDelete('set null'))
    .addColumn('input_data', 'text')
    .addColumn('logs', 'jsonb')
    .addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  // Drop tables in reverse order to handle foreign key constraints
  await db.schema.dropTable('blockchain_transactions').ifExists().execute();
  await db.schema.dropTable('document_templates').ifExists().execute();
  await db.schema.dropTable('notifications').ifExists().execute();
  await db.schema.dropTable('document_permissions').ifExists().execute();
  await db.schema.dropTable('audit_logs').ifExists().execute();
  await db.schema.dropTable('signatures').ifExists().execute();
  await db.schema.dropTable('documents').ifExists().execute();
  await db.schema.dropTable('organization_members').ifExists().execute();
  await db.schema.dropTable('organizations').ifExists().execute();
  await db.schema.dropTable('users').ifExists().execute();

  // Drop custom types
  await sql`DROP TYPE IF EXISTS notification_status`.execute(db);
  await sql`DROP TYPE IF EXISTS notification_type`.execute(db);
  await sql`DROP TYPE IF EXISTS compliance_framework`.execute(db);
  await sql`DROP TYPE IF EXISTS storage_provider`.execute(db);
  await sql`DROP TYPE IF EXISTS permission_type`.execute(db);
  await sql`DROP TYPE IF EXISTS audit_category`.execute(db);
  await sql`DROP TYPE IF EXISTS audit_action`.execute(db);
  await sql`DROP TYPE IF EXISTS token_standard`.execute(db);
  await sql`DROP TYPE IF EXISTS blockchain_network`.execute(db);
  await sql`DROP TYPE IF EXISTS signature_status`.execute(db);
  await sql`DROP TYPE IF EXISTS signature_type`.execute(db);
  await sql`DROP TYPE IF EXISTS document_privacy`.execute(db);
  await sql`DROP TYPE IF EXISTS document_status`.execute(db);
  await sql`DROP TYPE IF EXISTS document_type`.execute(db);
  await sql`DROP TYPE IF EXISTS organization_status`.execute(db);
  await sql`DROP TYPE IF EXISTS organization_type`.execute(db);
  await sql`DROP TYPE IF EXISTS user_role`.execute(db);
}
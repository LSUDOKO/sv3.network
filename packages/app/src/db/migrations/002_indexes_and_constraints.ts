/**
 * Database indexes and constraints migration for sv3.network
 * Adds performance indexes and additional constraints
 */

import { Kysely, sql } from 'kysely';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  // Users table indexes
  await db.schema
    .createIndex('idx_users_wallet_address')
    .on('users')
    .column('wallet_address')
    .execute();

  await db.schema
    .createIndex('idx_users_email')
    .on('users')
    .column('email')
    .execute();

  await db.schema
    .createIndex('idx_users_username')
    .on('users')
    .column('username')
    .execute();

  await db.schema
    .createIndex('idx_users_role')
    .on('users')
    .column('role')
    .execute();

  await db.schema
    .createIndex('idx_users_is_active')
    .on('users')
    .column('is_active')
    .execute();

  await db.schema
    .createIndex('idx_users_created_at')
    .on('users')
    .column('created_at')
    .execute();

  // Organizations table indexes
  await db.schema
    .createIndex('idx_organizations_slug')
    .on('organizations')
    .column('slug')
    .execute();

  await db.schema
    .createIndex('idx_organizations_owner_id')
    .on('organizations')
    .column('owner_id')
    .execute();

  await db.schema
    .createIndex('idx_organizations_type')
    .on('organizations')
    .column('type')
    .execute();

  await db.schema
    .createIndex('idx_organizations_status')
    .on('organizations')
    .column('status')
    .execute();

  await db.schema
    .createIndex('idx_organizations_blockchain_address')
    .on('organizations')
    .column('blockchain_address')
    .execute();

  // Organization members table indexes
  await db.schema
    .createIndex('idx_organization_members_org_user')
    .on('organization_members')
    .columns(['organization_id', 'user_id'])
    .unique()
    .execute();

  await db.schema
    .createIndex('idx_organization_members_user_id')
    .on('organization_members')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('idx_organization_members_role')
    .on('organization_members')
    .column('role')
    .execute();

  await db.schema
    .createIndex('idx_organization_members_is_active')
    .on('organization_members')
    .column('is_active')
    .execute();

  // Documents table indexes
  await db.schema
    .createIndex('idx_documents_owner_id')
    .on('documents')
    .column('owner_id')
    .execute();

  await db.schema
    .createIndex('idx_documents_organization_id')
    .on('documents')
    .column('organization_id')
    .execute();

  await db.schema
    .createIndex('idx_documents_type')
    .on('documents')
    .column('type')
    .execute();

  await db.schema
    .createIndex('idx_documents_status')
    .on('documents')
    .column('status')
    .execute();

  await db.schema
    .createIndex('idx_documents_privacy')
    .on('documents')
    .column('privacy')
    .execute();

  await db.schema
    .createIndex('idx_documents_file_hash')
    .on('documents')
    .column('file_hash')
    .execute();

  await db.schema
    .createIndex('idx_documents_nft_token_id')
    .on('documents')
    .column('nft_token_id')
    .execute();

  await db.schema
    .createIndex('idx_documents_blockchain_network')
    .on('documents')
    .column('blockchain_network')
    .execute();

  await db.schema
    .createIndex('idx_documents_created_at')
    .on('documents')
    .column('created_at')
    .execute();

  await db.schema
    .createIndex('idx_documents_expires_at')
    .on('documents')
    .column('expires_at')
    .execute();

  // GIN index for tags (JSONB array)
  await sql`CREATE INDEX idx_documents_tags ON documents USING GIN (tags)`.execute(db);

  // Signatures table indexes
  await db.schema
    .createIndex('idx_signatures_document_id')
    .on('signatures')
    .column('document_id')
    .execute();

  await db.schema
    .createIndex('idx_signatures_signer_id')
    .on('signatures')
    .column('signer_id')
    .execute();

  await db.schema
    .createIndex('idx_signatures_wallet_address')
    .on('signatures')
    .column('signer_wallet_address')
    .execute();

  await db.schema
    .createIndex('idx_signatures_type')
    .on('signatures')
    .column('signature_type')
    .execute();

  await db.schema
    .createIndex('idx_signatures_status')
    .on('signatures')
    .column('status')
    .execute();

  await db.schema
    .createIndex('idx_signatures_blockchain_tx')
    .on('signatures')
    .column('blockchain_transaction_hash')
    .execute();

  await db.schema
    .createIndex('idx_signatures_signed_at')
    .on('signatures')
    .column('signed_at')
    .execute();

  // Audit logs table indexes
  await db.schema
    .createIndex('idx_audit_logs_user_id')
    .on('audit_logs')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('idx_audit_logs_organization_id')
    .on('audit_logs')
    .column('organization_id')
    .execute();

  await db.schema
    .createIndex('idx_audit_logs_document_id')
    .on('audit_logs')
    .column('document_id')
    .execute();

  await db.schema
    .createIndex('idx_audit_logs_action')
    .on('audit_logs')
    .column('action')
    .execute();

  await db.schema
    .createIndex('idx_audit_logs_category')
    .on('audit_logs')
    .column('category')
    .execute();

  await db.schema
    .createIndex('idx_audit_logs_created_at')
    .on('audit_logs')
    .column('created_at')
    .execute();

  await db.schema
    .createIndex('idx_audit_logs_blockchain_tx')
    .on('audit_logs')
    .column('blockchain_transaction_hash')
    .execute();

  // Document permissions table indexes
  await db.schema
    .createIndex('idx_document_permissions_document_id')
    .on('document_permissions')
    .column('document_id')
    .execute();

  await db.schema
    .createIndex('idx_document_permissions_user_id')
    .on('document_permissions')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('idx_document_permissions_organization_id')
    .on('document_permissions')
    .column('organization_id')
    .execute();

  await db.schema
    .createIndex('idx_document_permissions_type')
    .on('document_permissions')
    .column('permission_type')
    .execute();

  await db.schema
    .createIndex('idx_document_permissions_is_active')
    .on('document_permissions')
    .column('is_active')
    .execute();

  await db.schema
    .createIndex('idx_document_permissions_expires_at')
    .on('document_permissions')
    .column('expires_at')
    .execute();

  // Notifications table indexes
  await db.schema
    .createIndex('idx_notifications_user_id')
    .on('notifications')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('idx_notifications_type')
    .on('notifications')
    .column('type')
    .execute();

  await db.schema
    .createIndex('idx_notifications_status')
    .on('notifications')
    .column('status')
    .execute();

  await db.schema
    .createIndex('idx_notifications_created_at')
    .on('notifications')
    .column('created_at')
    .execute();

  await db.schema
    .createIndex('idx_notifications_read_at')
    .on('notifications')
    .column('read_at')
    .execute();

  // Document templates table indexes
  await db.schema
    .createIndex('idx_document_templates_organization_id')
    .on('document_templates')
    .column('organization_id')
    .execute();

  await db.schema
    .createIndex('idx_document_templates_created_by')
    .on('document_templates')
    .column('created_by')
    .execute();

  await db.schema
    .createIndex('idx_document_templates_type')
    .on('document_templates')
    .column('type')
    .execute();

  await db.schema
    .createIndex('idx_document_templates_is_active')
    .on('document_templates')
    .column('is_active')
    .execute();

  await db.schema
    .createIndex('idx_document_templates_is_public')
    .on('document_templates')
    .column('is_public')
    .execute();

  // Blockchain transactions table indexes
  await db.schema
    .createIndex('idx_blockchain_transactions_hash')
    .on('blockchain_transactions')
    .column('transaction_hash')
    .execute();

  await db.schema
    .createIndex('idx_blockchain_transactions_network')
    .on('blockchain_transactions')
    .column('blockchain_network')
    .execute();

  await db.schema
    .createIndex('idx_blockchain_transactions_from_address')
    .on('blockchain_transactions')
    .column('from_address')
    .execute();

  await db.schema
    .createIndex('idx_blockchain_transactions_to_address')
    .on('blockchain_transactions')
    .column('to_address')
    .execute();

  await db.schema
    .createIndex('idx_blockchain_transactions_contract')
    .on('blockchain_transactions')
    .column('contract_address')
    .execute();

  await db.schema
    .createIndex('idx_blockchain_transactions_status')
    .on('blockchain_transactions')
    .column('status')
    .execute();

  await db.schema
    .createIndex('idx_blockchain_transactions_block_number')
    .on('blockchain_transactions')
    .column('block_number')
    .execute();

  await db.schema
    .createIndex('idx_blockchain_transactions_user_id')
    .on('blockchain_transactions')
    .column('user_id')
    .execute();

  await db.schema
    .createIndex('idx_blockchain_transactions_document_id')
    .on('blockchain_transactions')
    .column('document_id')
    .execute();

  // Composite indexes for common query patterns
  await db.schema
    .createIndex('idx_documents_owner_status')
    .on('documents')
    .columns(['owner_id', 'status'])
    .execute();

  await db.schema
    .createIndex('idx_documents_org_type')
    .on('documents')
    .columns(['organization_id', 'type'])
    .execute();

  await db.schema
    .createIndex('idx_signatures_document_status')
    .on('signatures')
    .columns(['document_id', 'status'])
    .execute();

  await db.schema
    .createIndex('idx_audit_logs_user_action')
    .on('audit_logs')
    .columns(['user_id', 'action'])
    .execute();

  await db.schema
    .createIndex('idx_notifications_user_status')
    .on('notifications')
    .columns(['user_id', 'status'])
    .execute();

  // Add updated_at trigger function
  await sql`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql'
  `.execute(db);

  // Add updated_at triggers to all tables
  const tables = [
    'users',
    'organizations',
    'organization_members',
    'documents',
    'signatures',
    'audit_logs',
    'document_permissions',
    'notifications',
    'document_templates',
    'blockchain_transactions'
  ];

  for (const table of tables) {
    await sql`
      CREATE TRIGGER update_${sql.raw(table)}_updated_at
      BEFORE UPDATE ON ${sql.raw(table)}
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column()
    `.execute(db);
  }

  // Add additional constraints
  
  // Ensure organization members have unique role per organization (for owner role)
  await sql`
    CREATE UNIQUE INDEX idx_organization_unique_owner 
    ON organization_members (organization_id) 
    WHERE role = 'organization_owner'
  `.execute(db);

  // Ensure document permissions are unique per user/organization and document
  await sql`
    CREATE UNIQUE INDEX idx_document_permissions_unique_user 
    ON document_permissions (document_id, user_id, permission_type) 
    WHERE user_id IS NOT NULL AND is_active = true
  `.execute(db);

  await sql`
    CREATE UNIQUE INDEX idx_document_permissions_unique_org 
    ON document_permissions (document_id, organization_id, permission_type) 
    WHERE organization_id IS NOT NULL AND is_active = true
  `.execute(db);

  // Ensure signature order is unique per document
  await sql`
    CREATE UNIQUE INDEX idx_signatures_unique_order 
    ON signatures (document_id, signing_order) 
    WHERE signing_order IS NOT NULL
  `.execute(db);

  // Add check constraints
  await sql`
    ALTER TABLE users 
    ADD CONSTRAINT check_wallet_address_format 
    CHECK (wallet_address ~ '^0x[a-fA-F0-9]{40}$')
  `.execute(db);

  await sql`
    ALTER TABLE documents 
    ADD CONSTRAINT check_file_size_positive 
    CHECK (file_size > 0)
  `.execute(db);

  await sql`
    ALTER TABLE documents 
    ADD CONSTRAINT check_version_positive 
    CHECK (version > 0)
  `.execute(db);

  await sql`
    ALTER TABLE signatures 
    ADD CONSTRAINT check_signing_order_positive 
    CHECK (signing_order IS NULL OR signing_order > 0)
  `.execute(db);

  await sql`
    ALTER TABLE signatures 
    ADD CONSTRAINT check_required_signatures_positive 
    CHECK (required_signatures IS NULL OR required_signatures > 0)
  `.execute(db);

  await sql`
    ALTER TABLE blockchain_transactions 
    ADD CONSTRAINT check_confirmations_non_negative 
    CHECK (confirmations >= 0)
  `.execute(db);

  await sql`
    ALTER TABLE document_templates 
    ADD CONSTRAINT check_usage_count_non_negative 
    CHECK (usage_count >= 0)
  `.execute(db);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  // Drop triggers
  const tables = [
    'users',
    'organizations',
    'organization_members',
    'documents',
    'signatures',
    'audit_logs',
    'document_permissions',
    'notifications',
    'document_templates',
    'blockchain_transactions'
  ];

  for (const table of tables) {
    await sql`DROP TRIGGER IF EXISTS update_${sql.raw(table)}_updated_at ON ${sql.raw(table)}`.execute(db);
  }

  // Drop trigger function
  await sql`DROP FUNCTION IF EXISTS update_updated_at_column()`.execute(db);

  // Drop check constraints
  await sql`ALTER TABLE document_templates DROP CONSTRAINT IF EXISTS check_usage_count_non_negative`.execute(db);
  await sql`ALTER TABLE blockchain_transactions DROP CONSTRAINT IF EXISTS check_confirmations_non_negative`.execute(db);
  await sql`ALTER TABLE signatures DROP CONSTRAINT IF EXISTS check_required_signatures_positive`.execute(db);
  await sql`ALTER TABLE signatures DROP CONSTRAINT IF EXISTS check_signing_order_positive`.execute(db);
  await sql`ALTER TABLE documents DROP CONSTRAINT IF EXISTS check_version_positive`.execute(db);
  await sql`ALTER TABLE documents DROP CONSTRAINT IF EXISTS check_file_size_positive`.execute(db);
  await sql`ALTER TABLE users DROP CONSTRAINT IF EXISTS check_wallet_address_format`.execute(db);

  // Drop unique indexes
  await db.schema.dropIndex('idx_signatures_unique_order').ifExists().execute();
  await db.schema.dropIndex('idx_document_permissions_unique_org').ifExists().execute();
  await db.schema.dropIndex('idx_document_permissions_unique_user').ifExists().execute();
  await db.schema.dropIndex('idx_organization_unique_owner').ifExists().execute();

  // Drop composite indexes
  await db.schema.dropIndex('idx_notifications_user_status').ifExists().execute();
  await db.schema.dropIndex('idx_audit_logs_user_action').ifExists().execute();
  await db.schema.dropIndex('idx_signatures_document_status').ifExists().execute();
  await db.schema.dropIndex('idx_documents_org_type').ifExists().execute();
  await db.schema.dropIndex('idx_documents_owner_status').ifExists().execute();

  // Drop all other indexes (in reverse order)
  await db.schema.dropIndex('idx_blockchain_transactions_document_id').ifExists().execute();
  await db.schema.dropIndex('idx_blockchain_transactions_user_id').ifExists().execute();
  await db.schema.dropIndex('idx_blockchain_transactions_block_number').ifExists().execute();
  await db.schema.dropIndex('idx_blockchain_transactions_status').ifExists().execute();
  await db.schema.dropIndex('idx_blockchain_transactions_contract').ifExists().execute();
  await db.schema.dropIndex('idx_blockchain_transactions_to_address').ifExists().execute();
  await db.schema.dropIndex('idx_blockchain_transactions_from_address').ifExists().execute();
  await db.schema.dropIndex('idx_blockchain_transactions_network').ifExists().execute();
  await db.schema.dropIndex('idx_blockchain_transactions_hash').ifExists().execute();
  
  await db.schema.dropIndex('idx_document_templates_is_public').ifExists().execute();
  await db.schema.dropIndex('idx_document_templates_is_active').ifExists().execute();
  await db.schema.dropIndex('idx_document_templates_type').ifExists().execute();
  await db.schema.dropIndex('idx_document_templates_created_by').ifExists().execute();
  await db.schema.dropIndex('idx_document_templates_organization_id').ifExists().execute();
  
  await db.schema.dropIndex('idx_notifications_read_at').ifExists().execute();
  await db.schema.dropIndex('idx_notifications_created_at').ifExists().execute();
  await db.schema.dropIndex('idx_notifications_status').ifExists().execute();
  await db.schema.dropIndex('idx_notifications_type').ifExists().execute();
  await db.schema.dropIndex('idx_notifications_user_id').ifExists().execute();
  
  await db.schema.dropIndex('idx_document_permissions_expires_at').ifExists().execute();
  await db.schema.dropIndex('idx_document_permissions_is_active').ifExists().execute();
  await db.schema.dropIndex('idx_document_permissions_type').ifExists().execute();
  await db.schema.dropIndex('idx_document_permissions_organization_id').ifExists().execute();
  await db.schema.dropIndex('idx_document_permissions_user_id').ifExists().execute();
  await db.schema.dropIndex('idx_document_permissions_document_id').ifExists().execute();
  
  await db.schema.dropIndex('idx_audit_logs_blockchain_tx').ifExists().execute();
  await db.schema.dropIndex('idx_audit_logs_created_at').ifExists().execute();
  await db.schema.dropIndex('idx_audit_logs_category').ifExists().execute();
  await db.schema.dropIndex('idx_audit_logs_action').ifExists().execute();
  await db.schema.dropIndex('idx_audit_logs_document_id').ifExists().execute();
  await db.schema.dropIndex('idx_audit_logs_organization_id').ifExists().execute();
  await db.schema.dropIndex('idx_audit_logs_user_id').ifExists().execute();
  
  await db.schema.dropIndex('idx_signatures_signed_at').ifExists().execute();
  await db.schema.dropIndex('idx_signatures_blockchain_tx').ifExists().execute();
  await db.schema.dropIndex('idx_signatures_status').ifExists().execute();
  await db.schema.dropIndex('idx_signatures_type').ifExists().execute();
  await db.schema.dropIndex('idx_signatures_wallet_address').ifExists().execute();
  await db.schema.dropIndex('idx_signatures_signer_id').ifExists().execute();
  await db.schema.dropIndex('idx_signatures_document_id').ifExists().execute();
  
  await sql`DROP INDEX IF EXISTS idx_documents_tags`.execute(db);
  await db.schema.dropIndex('idx_documents_expires_at').ifExists().execute();
  await db.schema.dropIndex('idx_documents_created_at').ifExists().execute();
  await db.schema.dropIndex('idx_documents_blockchain_network').ifExists().execute();
  await db.schema.dropIndex('idx_documents_nft_token_id').ifExists().execute();
  await db.schema.dropIndex('idx_documents_file_hash').ifExists().execute();
  await db.schema.dropIndex('idx_documents_privacy').ifExists().execute();
  await db.schema.dropIndex('idx_documents_status').ifExists().execute();
  await db.schema.dropIndex('idx_documents_type').ifExists().execute();
  await db.schema.dropIndex('idx_documents_organization_id').ifExists().execute();
  await db.schema.dropIndex('idx_documents_owner_id').ifExists().execute();
  
  await db.schema.dropIndex('idx_organization_members_is_active').ifExists().execute();
  await db.schema.dropIndex('idx_organization_members_role').ifExists().execute();
  await db.schema.dropIndex('idx_organization_members_user_id').ifExists().execute();
  await db.schema.dropIndex('idx_organization_members_org_user').ifExists().execute();
  
  await db.schema.dropIndex('idx_organizations_blockchain_address').ifExists().execute();
  await db.schema.dropIndex('idx_organizations_status').ifExists().execute();
  await db.schema.dropIndex('idx_organizations_type').ifExists().execute();
  await db.schema.dropIndex('idx_organizations_owner_id').ifExists().execute();
  await db.schema.dropIndex('idx_organizations_slug').ifExists().execute();
  
  await db.schema.dropIndex('idx_users_created_at').ifExists().execute();
  await db.schema.dropIndex('idx_users_is_active').ifExists().execute();
  await db.schema.dropIndex('idx_users_role').ifExists().execute();
  await db.schema.dropIndex('idx_users_username').ifExists().execute();
  await db.schema.dropIndex('idx_users_email').ifExists().execute();
  await db.schema.dropIndex('idx_users_wallet_address').ifExists().execute();
}
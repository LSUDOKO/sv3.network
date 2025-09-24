/**
 * Database schema for sv3.network
 * Web3-native document management and compliance platform
 */

import { ColumnType, Generated, JSONColumnType } from 'kysely';
import {
  UserRole,
  OrganizationType,
  OrganizationStatus,
  DocumentType,
  DocumentStatus,
  DocumentPrivacy,
  SignatureType,
  SignatureStatus,
  BlockchainNetwork,
  TokenStandard,
  AuditAction,
  AuditCategory,
  PermissionType,
  StorageProvider,
  ComplianceFramework,
  NotificationType,
  NotificationStatus
} from './enums';

// Base interface for all tables with common fields
interface BaseTable {
  id: Generated<string>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string>;
}

// Users table - Web3-native user management
export interface UsersTable extends BaseTable {
  wallet_address: string; // Primary identifier - Ethereum address
  ens_name: string | null; // ENS domain name
  username: string | null;
  email: string | null;
  profile_image_url: string | null;
  bio: string | null;
  role: UserRole;
  is_verified: boolean;
  is_active: boolean;
  last_login_at: Date | null;
  metadata: JSONColumnType<{
    social_links?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
    preferences?: {
      notifications?: boolean;
      theme?: string;
      language?: string;
    };
    kyc_data?: {
      verified?: boolean;
      provider?: string;
      verification_date?: string;
    };
  }>;
}

// Organizations table - On-chain organizations and teams
export interface OrganizationsTable extends BaseTable {
  name: string;
  slug: string; // URL-friendly identifier
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  type: OrganizationType;
  status: OrganizationStatus;
  owner_id: string; // Foreign key to users.id
  blockchain_address: string | null; // Smart contract address
  blockchain_network: BlockchainNetwork | null;
  compliance_frameworks: JSONColumnType<ComplianceFramework[]>;
  settings: JSONColumnType<{
    require_2fa?: boolean;
    auto_sign_enabled?: boolean;
    retention_policy?: {
      documents?: number; // days
      audit_logs?: number; // days
    };
    notification_settings?: {
      email?: boolean;
      in_app?: boolean;
      webhook_url?: string;
    };
  }>;
  metadata: JSONColumnType<{
    industry?: string;
    size?: string;
    location?: {
      country?: string;
      city?: string;
    };
    tax_id?: string;
    registration_number?: string;
  }>;
}

// Organization members mapping table
export interface OrganizationMembersTable extends BaseTable {
  organization_id: string; // Foreign key to organizations.id
  user_id: string; // Foreign key to users.id
  role: UserRole;
  permissions: JSONColumnType<PermissionType[]>;
  invited_by: string | null; // Foreign key to users.id
  joined_at: Date;
  is_active: boolean;
}

// Documents table - Core document management with RWA support
export interface DocumentsTable extends BaseTable {
  title: string;
  description: string | null;
  type: DocumentType;
  status: DocumentStatus;
  privacy: DocumentPrivacy;
  owner_id: string; // Foreign key to users.id
  organization_id: string | null; // Foreign key to organizations.id
  
  // File storage information
  file_hash: string; // SHA-256 hash of the document
  file_size: number; // File size in bytes
  file_type: string; // MIME type
  storage_provider: StorageProvider;
  storage_path: string; // IPFS hash, Arweave ID, or S3 path
  
  // Blockchain/NFT information
  nft_token_id: string | null; // NFT token ID if minted
  nft_contract_address: string | null; // NFT contract address
  blockchain_network: BlockchainNetwork | null;
  token_standard: TokenStandard | null;
  transaction_hash: string | null; // Minting transaction hash
  
  // Document lifecycle
  expires_at: Date | null;
  signed_at: Date | null;
  completed_at: Date | null;
  
  // Metadata and custom fields
  tags: JSONColumnType<string[]>;
  custom_fields: JSONColumnType<Record<string, string | number | boolean | null>>;
  version: number;
  parent_document_id: string | null; // For document versioning
  
  metadata: JSONColumnType<{
    template_id?: string;
    workflow_id?: string;
    compliance_requirements?: ComplianceFramework[];
    retention_period?: number; // days
    encryption_key?: string;
    access_controls?: {
      ip_restrictions?: string[];
      time_restrictions?: {
        start?: string;
        end?: string;
      };
    };
  }>;
}

// Signatures table - Multi-signature support with blockchain verification
export interface SignaturesTable extends BaseTable {
  document_id: string; // Foreign key to documents.id
  signer_id: string; // Foreign key to users.id
  signer_wallet_address: string;
  signature_type: SignatureType;
  status: SignatureStatus;
  
  // Signature data
  signature_data: string; // Actual signature or hash
  signature_hash: string; // Hash of the signature for verification
  blockchain_transaction_hash: string | null; // On-chain signature transaction
  blockchain_network: BlockchainNetwork | null;
  
  // Signature metadata
  signed_at: Date | null;
  ip_address: string | null;
  user_agent: string | null;
  geolocation: JSONColumnType<{
    country?: string;
    city?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }> | null;
  
  // Multi-signature workflow
  signing_order: number | null; // Order in multi-sig workflow
  required_signatures: number | null; // Total required signatures
  
  // Rejection/revocation
  rejected_at: Date | null;
  rejection_reason: string | null;
  revoked_at: Date | null;
  revocation_reason: string | null;
  
  metadata: JSONColumnType<{
    certificate_info?: {
      issuer?: string;
      serial_number?: string;
      valid_from?: string;
      valid_to?: string;
    };
    biometric_data?: {
      type?: string;
      confidence_score?: number;
    };
    device_info?: {
      type?: string;
      os?: string;
      browser?: string;
    };
  }>;
}

// Audit logs table - Immutable compliance and security logging
export interface AuditLogsTable extends BaseTable {
  user_id: string | null; // Foreign key to users.id (null for system actions)
  organization_id: string | null; // Foreign key to organizations.id
  document_id: string | null; // Foreign key to documents.id
  signature_id: string | null; // Foreign key to signatures.id
  
  action: AuditAction;
  category: AuditCategory;
  description: string;
  
  // Request/session information
  ip_address: string | null;
  user_agent: string | null;
  session_id: string | null;
  request_id: string | null;
  
  // Blockchain information
  blockchain_transaction_hash: string | null;
  blockchain_network: BlockchainNetwork | null;
  gas_used: number | null;
  
  // Additional context
  before_state: JSONColumnType<Record<string, string | number | boolean | null>> | null;
  after_state: JSONColumnType<Record<string, string | number | boolean | null>> | null;
  
  metadata: JSONColumnType<{
    compliance_framework?: ComplianceFramework;
    risk_level?: 'low' | 'medium' | 'high' | 'critical';
    automated?: boolean;
    source?: string;
    correlation_id?: string;
  }>;
}

// Document permissions table - Fine-grained access control
export interface DocumentPermissionsTable extends BaseTable {
  document_id: string; // Foreign key to documents.id
  user_id: string | null; // Foreign key to users.id (null for organization-wide)
  organization_id: string | null; // Foreign key to organizations.id
  permission_type: PermissionType;
  granted_by: string; // Foreign key to users.id
  granted_at: Date;
  expires_at: Date | null;
  is_active: boolean;
  
  conditions: JSONColumnType<{
    ip_restrictions?: string[];
    time_restrictions?: {
      start_time?: string;
      end_time?: string;
      days_of_week?: number[];
    };
    device_restrictions?: string[];
  }> | null;
}

// Notifications table - System and user notifications
export interface NotificationsTable extends BaseTable {
  user_id: string; // Foreign key to users.id
  organization_id: string | null; // Foreign key to organizations.id
  document_id: string | null; // Foreign key to documents.id
  signature_id: string | null; // Foreign key to signatures.id
  
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  message: string;
  
  // Delivery information
  sent_at: Date | null;
  read_at: Date | null;
  archived_at: Date | null;
  
  // Notification channels
  channels: JSONColumnType<{
    email?: boolean;
    in_app?: boolean;
    webhook?: boolean;
    sms?: boolean;
  }>;
  
  metadata: JSONColumnType<{
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    action_url?: string;
    action_text?: string;
    expires_at?: string;
  }>;
}

// Document templates table - Reusable document templates
export interface DocumentTemplatesTable extends BaseTable {
  name: string;
  description: string | null;
  type: DocumentType;
  organization_id: string | null; // Foreign key to organizations.id (null for global templates)
  created_by: string; // Foreign key to users.id
  
  // Template content
  template_data: JSONColumnType<{
    fields?: Array<{
      id: string;
      type: 'text' | 'signature' | 'date' | 'checkbox' | 'dropdown';
      label: string;
      required: boolean;
      position: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      validation?: {
        pattern?: string;
        min_length?: number;
        max_length?: number;
      };
    }>;
    pages?: number;
    settings?: {
      signing_order?: 'sequential' | 'parallel';
      expiration_days?: number;
      reminder_frequency?: number;
    };
  }>;
  
  // Usage statistics
  usage_count: number;
  is_active: boolean;
  is_public: boolean;
  
  tags: JSONColumnType<string[]>;
}

// Blockchain transactions table - Track all blockchain interactions
export interface BlockchainTransactionsTable extends BaseTable {
  transaction_hash: string;
  blockchain_network: BlockchainNetwork;
  block_number: number | null;
  block_hash: string | null;
  
  // Transaction details
  from_address: string;
  to_address: string | null;
  contract_address: string | null;
  function_name: string | null;
  
  // Gas and fees
  gas_limit: number | null;
  gas_used: number | null;
  gas_price: string | null; // Wei as string
  transaction_fee: string | null; // Wei as string
  
  // Status and confirmation
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  
  // Related entities
  user_id: string | null; // Foreign key to users.id
  organization_id: string | null; // Foreign key to organizations.id
  document_id: string | null; // Foreign key to documents.id
  signature_id: string | null; // Foreign key to signatures.id
  
  // Transaction data
  input_data: string | null;
  logs: JSONColumnType<Array<{
    address: string;
    topics: string[];
    data: string;
  }>> | null;
  
  metadata: JSONColumnType<{
    purpose?: string;
    retry_count?: number;
    error_message?: string;
    nonce?: number;
  }>;
}

// Database interface combining all tables
export interface Database {
  users: UsersTable;
  organizations: OrganizationsTable;
  organization_members: OrganizationMembersTable;
  documents: DocumentsTable;
  signatures: SignaturesTable;
  audit_logs: AuditLogsTable;
  document_permissions: DocumentPermissionsTable;
  notifications: NotificationsTable;
  document_templates: DocumentTemplatesTable;
  blockchain_transactions: BlockchainTransactionsTable;
}
/**
 * TypeScript types for sv3.network database entities
 * These types represent the actual data structures used in the application
 */

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

// Base type for all entities
export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

// User entity
export interface User extends BaseEntity {
  wallet_address: string;
  ens_name: string | null;
  username: string | null;
  email: string | null;
  profile_image_url: string | null;
  bio: string | null;
  role: UserRole;
  is_verified: boolean;
  is_active: boolean;
  last_login_at: Date | null;
  metadata: {
    organization?: string;
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
  };
}

// Organization entity
export interface Organization extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  type: OrganizationType;
  status: OrganizationStatus;
  owner_id: string;
  blockchain_address: string | null;
  blockchain_network: BlockchainNetwork | null;
  compliance_frameworks: ComplianceFramework[];
  settings: {
    require_2fa?: boolean;
    auto_sign_enabled?: boolean;
    retention_policy?: {
      documents?: number;
      audit_logs?: number;
    };
    notification_settings?: {
      email?: boolean;
      in_app?: boolean;
      webhook_url?: string;
    };
  };
  metadata: {
    industry?: string;
    size?: string;
    location?: {
      country?: string;
      city?: string;
    };
    tax_id?: string;
    registration_number?: string;
  };
}

// Organization member entity
export interface OrganizationMember extends BaseEntity {
  organization_id: string;
  user_id: string;
  role: UserRole;
  permissions: PermissionType[];
  invited_by: string | null;
  joined_at: Date;
  is_active: boolean;
}

// Document entity
export interface Document extends BaseEntity {
  title: string;
  description: string | null;
  type: DocumentType;
  status: DocumentStatus;
  privacy: DocumentPrivacy;
  owner_id: string;
  organization_id: string | null;
  
  // File storage information
  file_hash: string;
  file_size: number;
  file_type: string;
  storage_provider: StorageProvider;
  storage_path: string;
  ipfs_url: string | null;
  
  // Blockchain/NFT information
  nft_token_id: string | null;
  nft_contract_address: string | null;
  blockchain_network: BlockchainNetwork | null;
  token_standard: TokenStandard | null;
  transaction_hash: string | null;
  
  // Document lifecycle
  expires_at: Date | null;
  signed_at: Date | null;
  completed_at: Date | null;
  
  // Metadata and custom fields
  tags: string[];
  custom_fields: Record<string, string | number | boolean | null>;
  version: number;
  parent_document_id: string | null;
  
  metadata: {
    template_id?: string;
    workflow_id?: string;
    compliance_requirements?: ComplianceFramework[];
    retention_period?: number;
    encryption_key?: string;
    access_controls?: {
      ip_restrictions?: string[];
      time_restrictions?: {
        start?: string;
        end?: string;
      };
    };
  };
}

// Signature entity
export interface Signature extends BaseEntity {
  document_id: string;
  signer_id: string;
  signer_wallet_address: string;
  signature_type: SignatureType;
  status: SignatureStatus;
  
  // Signature data
  signature_data: string;
  signature_hash: string;
  blockchain_transaction_hash: string | null;
  blockchain_network: BlockchainNetwork | null;
  
  // Signature metadata
  signed_at: Date | null;
  ip_address: string | null;
  user_agent: string | null;
  geolocation: {
    country?: string;
    city?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  } | null;
  
  // Multi-signature workflow
  signing_order: number | null;
  required_signatures: number | null;
  
  // Rejection/revocation
  rejected_at: Date | null;
  rejection_reason: string | null;
  revoked_at: Date | null;
  revocation_reason: string | null;
  
  metadata: {
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
  };
}

// Audit log entity
export interface AuditLog extends BaseEntity {
  user_id: string | null;
  organization_id: string | null;
  document_id: string | null;
  signature_id: string | null;
  
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
  before_state: Record<string, string | number | boolean | null> | null;
  after_state: Record<string, string | number | boolean | null> | null;
  
  metadata: {
    compliance_framework?: ComplianceFramework;
    risk_level?: 'low' | 'medium' | 'high' | 'critical';
    automated?: boolean;
    source?: string;
    correlation_id?: string;
  };
}

// Document permission entity
export interface DocumentPermission extends BaseEntity {
  document_id: string;
  user_id: string | null;
  organization_id: string | null;
  permission_type: PermissionType;
  granted_by: string;
  granted_at: Date;
  expires_at: Date | null;
  is_active: boolean;
  
  conditions: {
    ip_restrictions?: string[];
    time_restrictions?: {
      start_time?: string;
      end_time?: string;
      days_of_week?: number[];
    };
    device_restrictions?: string[];
  } | null;
}

// Notification entity
export interface Notification extends BaseEntity {
  user_id: string;
  organization_id: string | null;
  document_id: string | null;
  signature_id: string | null;
  
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  message: string;
  
  // Delivery information
  sent_at: Date | null;
  read_at: Date | null;
  archived_at: Date | null;
  
  // Notification channels
  channels: {
    email?: boolean;
    in_app?: boolean;
    webhook?: boolean;
    sms?: boolean;
  };
  
  metadata: {
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    action_url?: string;
    action_text?: string;
    expires_at?: string;
  };
}

// Document template entity
export interface DocumentTemplate extends BaseEntity {
  name: string;
  description: string | null;
  type: DocumentType;
  organization_id: string | null;
  created_by: string;
  
  // Template content
  template_data: {
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
  };
  
  // Usage statistics
  usage_count: number;
  is_active: boolean;
  is_public: boolean;
  
  tags: string[];
}

// Blockchain transaction entity
export interface BlockchainTransaction extends BaseEntity {
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
  gas_price: string | null;
  transaction_fee: string | null;
  
  // Status and confirmation
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  
  // Related entities
  user_id: string | null;
  organization_id: string | null;
  document_id: string | null;
  signature_id: string | null;
  
  // Transaction data
  input_data: string | null;
  logs: Array<{
    address: string;
    topics: string[];
    data: string;
  }> | null;
  
  metadata: {
    purpose?: string;
    retry_count?: number;
    error_message?: string;
    nonce?: number;
  };
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string | number | boolean | null>;
  };
  metadata?: {
    timestamp: string;
    request_id: string;
    version: string;
  };
}

// Query types for filtering and sorting
export interface QueryFilters<T> {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search?: string;
  filters?: Partial<Record<keyof T, string | number | boolean | string[]>>;
  date_range?: {
    start: string;
    end: string;
  };
}

// Document creation/update types
export interface CreateDocumentRequest {
  title: string;
  description?: string;
  type: DocumentType;
  privacy: DocumentPrivacy;
  organization_id?: string;
  file_data: {
    file_hash: string;
    file_size: number;
    file_type: string;
    storage_provider: StorageProvider;
    storage_path: string;
    ipfs_url: string;
  };
  tags?: string[];
  custom_fields?: Record<string, string | number | boolean | null>;
  metadata?: {
    file_name?: string;
    original_file_size?: number;
    mime_type?: string;
    template_id?: string;
    workflow_id?: string;
    compliance_requirements?: ComplianceFramework[];
    retention_period?: number;
    expires_at?: string;
  };
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  status?: DocumentStatus;
  privacy?: DocumentPrivacy;
  tags?: string[];
  custom_fields?: Record<string, string | number | boolean | null>;
  file_data?: {
    storage_path?: string;
    ipfs_url?: string;
  };
  metadata?: {
    compliance_requirements?: ComplianceFramework[];
    retention_period?: number;
    expires_at?: string;
  };
}

// Signature creation types
export interface CreateSignatureRequest {
  document_id: string;
  signature_type: SignatureType;
  signature_data: string;
  signing_order?: number;
  metadata?: {
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
  };
}

// Organization creation types
export interface CreateOrganizationRequest {
  name: string;
  slug: string;
  description?: string;
  type: OrganizationType;
  website_url?: string;
  compliance_frameworks?: ComplianceFramework[];
  settings?: {
    require_2fa?: boolean;
    auto_sign_enabled?: boolean;
    retention_policy?: {
      documents?: number;
      audit_logs?: number;
    };
  };
  metadata?: {
    industry?: string;
    size?: string;
    location?: {
      country?: string;
      city?: string;
    };
  };
}

// User profile update types
export interface UpdateUserProfileRequest {
  username?: string;
  email?: string;
  bio?: string;
  profile_image_url?: string;
  metadata?: {
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
  };
}

// Utility types
export type EntityId = string;
export type WalletAddress = string;
export type TransactionHash = string;
export type IPFSHash = string;
export type FileHash = string;

// Database query result types
export type SelectUser = User;
export type SelectOrganization = Organization;
export type SelectDocument = Document;
export type SelectSignature = Signature;
export type SelectAuditLog = AuditLog;

// Insert types (for creating new records)
export type InsertUser = Omit<User, 'id' | 'created_at' | 'updated_at'>;
export type InsertOrganization = Omit<Organization, 'id' | 'created_at' | 'updated_at'>;
export type InsertDocument = Omit<Document, 'id' | 'created_at' | 'updated_at'>;
export type InsertSignature = Omit<Signature, 'id' | 'created_at' | 'updated_at'>;
export type InsertAuditLog = Omit<AuditLog, 'id' | 'created_at' | 'updated_at'>;

// Update types (for updating existing records)
export type UpdateUser = Partial<Omit<User, 'id' | 'created_at' | 'wallet_address'>>;
export type UpdateOrganization = Partial<Omit<Organization, 'id' | 'created_at' | 'owner_id'>>;
export type UpdateDocument = Partial<Omit<Document, 'id' | 'created_at' | 'owner_id' | 'file_hash'>>;
export type UpdateSignature = Partial<Omit<Signature, 'id' | 'created_at' | 'document_id' | 'signer_id'>>;
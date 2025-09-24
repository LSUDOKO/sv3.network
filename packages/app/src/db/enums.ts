/**
 * Database enums for sv3.network
 * Web3-native document management and compliance platform
 */

// User roles within the system
export enum UserRole {
  ADMIN = 'admin',
  ORGANIZATION_OWNER = 'organization_owner',
  ORGANIZATION_ADMIN = 'organization_admin',
  ORGANIZATION_MEMBER = 'organization_member',
  USER = 'user',
  AUDITOR = 'auditor',
  COMPLIANCE_OFFICER = 'compliance_officer'
}

// Organization types
export enum OrganizationType {
  // {corporation,llc,partnership,sole_proprietorship,non_profit,government,educational,healthcare,other}
  ENTERPRISE = 'enterprise',
  CORPORATION = 'corporation',
  LLC = 'llc',
  PARTNERSHIP = 'partnership',
  SOLE_PROPRIETORSHIP = 'sole_proprietorship',
  NON_PROFIT = 'non_profit',
  GOVERNMENT = 'government',
  EDUCATIONAL = 'educational',
  HEALTHCARE = 'healthcare',
  INDIVIDUAL = 'individual',
  OTHER = 'other'
}

// Organization status
export enum OrganizationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification'
}

// Document types
export enum DocumentType {
  CONTRACT = 'contract',
  AGREEMENT = 'agreement',
  CERTIFICATE = 'certificate',
  LICENSE = 'license',
  INVOICE = 'invoice',
  RECEIPT = 'receipt',
  LEGAL_DOCUMENT = 'legal_document',
  COMPLIANCE_DOCUMENT = 'compliance_document',
  IDENTITY_DOCUMENT = 'identity_document',
  OTHER = 'other'
}

// Document status
export enum DocumentStatus {
  DRAFT = 'draft',
  PENDING_SIGNATURES = 'pending_signatures',
  PARTIALLY_SIGNED = 'partially_signed',
  FULLY_SIGNED = 'fully_signed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

// Document privacy levels
export enum DocumentPrivacy {
  PUBLIC = 'public',
  ORGANIZATION = 'organization',
  PRIVATE = 'private',
  CONFIDENTIAL = 'confidential'
}

// Signature types
export enum SignatureType {
  DIGITAL = 'digital',
  ELECTRONIC = 'electronic',
  WEB3_WALLET = 'web3_wallet',
  BIOMETRIC = 'biometric',
  MULTI_SIG = 'multi_sig'
}

// Signature status
export enum SignatureStatus {
  PENDING = 'pending',
  SIGNED = 'signed',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

// Blockchain networks
export enum BlockchainNetwork {
  ETHEREUM = 'ethereum',
  BASE = 'base',
  POLYGON = 'polygon',
  AVALANCHE = 'avalanche',
  MONAD = 'monad',
  ARBITRUM = 'arbitrum',
  OPTIMISM = 'optimism'
}

// NFT token standards
export enum TokenStandard {
  ERC721 = 'erc721',
  ERC1155 = 'erc1155'
}

// Audit log actions
export enum AuditAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  SIGN = 'sign',
  REJECT = 'reject',
  REVOKE = 'revoke',
  MINT = 'mint',
  TRANSFER = 'transfer',
  BURN = 'burn',
  LOGIN = 'login',
  LOGOUT = 'logout',
  PERMISSION_CHANGE = 'permission_change',
  ORGANIZATION_JOIN = 'organization_join',
  ORGANIZATION_LEAVE = 'organization_leave'
}

// Audit log categories
export enum AuditCategory {
  USER_MANAGEMENT = 'user_management',
  DOCUMENT_MANAGEMENT = 'document_management',
  SIGNATURE_MANAGEMENT = 'signature_management',
  ORGANIZATION_MANAGEMENT = 'organization_management',
  BLOCKCHAIN_OPERATIONS = 'blockchain_operations',
  COMPLIANCE = 'compliance',
  SECURITY = 'security',
  SYSTEM = 'system'
}

// Permission types
export enum PermissionType {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  SIGN = 'sign',
  ADMIN = 'admin',
  AUDIT = 'audit'
}

// Storage providers
export enum StorageProvider {
  IPFS = 'ipfs',
  ARWEAVE = 'arweave',
  AWS_S3 = 'aws_s3',
  GOOGLE_CLOUD = 'google_cloud',
  AZURE_BLOB = 'azure_blob'
}

// Compliance frameworks
export enum ComplianceFramework {
  SOX = 'sox',
  GDPR = 'gdpr',
  HIPAA = 'hipaa',
  ISO27001 = 'iso27001',
  SOC2 = 'soc2',
  PCI_DSS = 'pci_dss',
  CCPA = 'ccpa'
}

// Notification types
export enum NotificationType {
  DOCUMENT_CREATED = 'document_created',
  SIGNATURE_REQUESTED = 'signature_requested',
  SIGNATURE_COMPLETED = 'signature_completed',
  DOCUMENT_EXPIRED = 'document_expired',
  ORGANIZATION_INVITE = 'organization_invite',
  COMPLIANCE_ALERT = 'compliance_alert',
  SYSTEM_NOTIFICATION = 'system_notification'
}

// Notification status
export enum NotificationStatus {
  UNREAD = 'unread',
  READ = 'read',
  ARCHIVED = 'archived'
}
'use server';

import { revalidatePath } from 'next/cache';
import { getDatabase } from '@/db';
import { AuditLog } from '@/db/types';
import { AuditAction, AuditCategory, BlockchainNetwork, ComplianceFramework } from '@/db/enums';
import { sql } from 'kysely';

/**
 * Create a new audit log entry
 */
export async function createAuditLog(
  action: AuditAction,
  category: AuditCategory,
  description: string,
  options: {
    userId?: string;
    organizationId?: string;
    documentId?: string;
    signatureId?: string;
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
    requestId?: string;
    blockchainTransactionHash?: string;
    blockchainNetwork?: BlockchainNetwork;
    gasUsed?: number;
    beforeState?: Record<string, string | number | boolean | null>;
    afterState?: Record<string, string | number | boolean | null>;
    metadata?: {
      complianceFramework?: ComplianceFramework;
      riskLevel?: 'low' | 'medium' | 'high' | 'critical';
      automated?: boolean;
      source?: string;
      correlationId?: string;
    };
  } = {}
): Promise<AuditLog> {
  try {
    const db = getDatabase();
    
    const auditLogRecord = {
      action,
      category,
      description,
      user_id: options.userId || null,
      organization_id: options.organizationId || null,
      document_id: options.documentId || null,
      signature_id: options.signatureId || null,
      ip_address: options.ipAddress || null,
      user_agent: options.userAgent || null,
      session_id: options.sessionId || null,
      request_id: options.requestId || null,
      blockchain_transaction_hash: options.blockchainTransactionHash || null,
      blockchain_network: options.blockchainNetwork || null,
      gas_used: options.gasUsed || null,
      before_state: options.beforeState ? JSON.stringify(options.beforeState) : null,
      after_state: options.afterState ? JSON.stringify(options.afterState) : null,
      metadata: JSON.stringify(options.metadata || {})
    };

    const result = await db
      .insertInto('audit_logs')
      .values(auditLogRecord)
      .returningAll()
      .executeTakeFirstOrThrow();

    const auditLog = {
      ...result
    } as AuditLog;

    revalidatePath('/audit-logs');
    return auditLog;
  } catch (error) {
    console.error('Error creating audit log:', error);
    throw new Error('Failed to create audit log');
  }
}

/**
 * Get audit log by ID
 */
export async function getAuditLogById(id: string): Promise<AuditLog | null> {
  try {
    const db = getDatabase();
    
    const result = await db
      .selectFrom('audit_logs')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!result) {
      return null;
    }

    return result as AuditLog;
  } catch (error) {
    console.error('Error getting audit log by ID:', error);
    throw new Error('Failed to get audit log');
  }
}

/**
 * Get audit logs with pagination and filters
 */
export async function getAuditLogs(
  page: number = 1,
  limit: number = 10,
  filters: { 
    user_id?: string; 
    organization_id?: string; 
    document_id?: string;
    signature_id?: string;
    action?: AuditAction; 
    category?: AuditCategory;
    blockchain_network?: BlockchainNetwork;
    search?: string;
    date_from?: Date;
    date_to?: Date;
  } = {}
): Promise<{ auditLogs: AuditLog[]; total: number; page: number; limit: number }> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    let query = db.selectFrom('audit_logs').selectAll();
    let countQuery = db.selectFrom('audit_logs').select(db.fn.count('id').as('count'));

    // Apply filters
    if (filters.user_id) {
      query = query.where('user_id', '=', filters.user_id);
      countQuery = countQuery.where('user_id', '=', filters.user_id);
    }
    if (filters.organization_id) {
      query = query.where('organization_id', '=', filters.organization_id);
      countQuery = countQuery.where('organization_id', '=', filters.organization_id);
    }
    if (filters.document_id) {
      query = query.where('document_id', '=', filters.document_id);
      countQuery = countQuery.where('document_id', '=', filters.document_id);
    }
    if (filters.signature_id) {
      query = query.where('signature_id', '=', filters.signature_id);
      countQuery = countQuery.where('signature_id', '=', filters.signature_id);
    }
    if (filters.action) {
      query = query.where('action', '=', filters.action);
      countQuery = countQuery.where('action', '=', filters.action);
    }
    if (filters.category) {
      query = query.where('category', '=', filters.category);
      countQuery = countQuery.where('category', '=', filters.category);
    }
    if (filters.blockchain_network) {
      query = query.where('blockchain_network', '=', filters.blockchain_network);
      countQuery = countQuery.where('blockchain_network', '=', filters.blockchain_network);
    }
    if (filters.search) {
      const searchTerm = `%${filters.search}%`;
      query = query.where((eb) => 
        eb.or([
          eb('description', 'ilike', searchTerm),
          eb('ip_address', 'ilike', searchTerm),
          eb('user_agent', 'ilike', searchTerm)
        ])
      );
      countQuery = countQuery.where((eb) => 
        eb.or([
          eb('description', 'ilike', searchTerm),
          eb('ip_address', 'ilike', searchTerm),
          eb('user_agent', 'ilike', searchTerm)
        ])
      );
    }
    if (filters.date_from) {
      query = query.where('created_at', '>=', filters.date_from);
      countQuery = countQuery.where('created_at', '>=', filters.date_from);
    }
    if (filters.date_to) {
      query = query.where('created_at', '<=', filters.date_to);
      countQuery = countQuery.where('created_at', '<=', filters.date_to);
    }

    // Execute queries
    const [results, countResult] = await Promise.all([
      query
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
        .execute(),
      countQuery.executeTakeFirstOrThrow()
    ]);

    const auditLogs: AuditLog[] = results.map(result => result as AuditLog);

    return {
      auditLogs,
      total: Number(countResult.count),
      page,
      limit
    };
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw new Error('Failed to fetch audit logs');
  }
}

/**
 * Get audit logs by user ID
 */
export async function getAuditLogsByUser(
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ auditLogs: AuditLog[]; total: number; page: number; limit: number }> {
  return getAuditLogs(page, limit, { user_id: userId });
}

/**
 * Get audit logs by organization ID
 */
export async function getAuditLogsByOrganization(
  organizationId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ auditLogs: AuditLog[]; total: number; page: number; limit: number }> {
  return getAuditLogs(page, limit, { organization_id: organizationId });
}

/**
 * Get audit logs by document ID
 */
export async function getAuditLogsByDocument(
  documentId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ auditLogs: AuditLog[]; total: number; page: number; limit: number }> {
  return getAuditLogs(page, limit, { document_id: documentId });
}

/**
 * Get audit logs by signature ID
 */
export async function getAuditLogsBySignature(
  signatureId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ auditLogs: AuditLog[]; total: number; page: number; limit: number }> {
  return getAuditLogs(page, limit, { signature_id: signatureId });
}

/**
 * Get audit log statistics
 */
export async function getAuditLogStats(
  organizationId?: string,
  dateFrom?: Date,
  dateTo?: Date
): Promise<{
  total: number;
  byAction: Record<string, number>;
  byCategory: Record<string, number>;
  byRiskLevel: Record<string, number>;
  recentActivity: number;
}> {
  try {
    const db = getDatabase();

    let query = db.selectFrom('audit_logs');

    if (organizationId) {
      query = query.where('organization_id', '=', organizationId);
    }
    if (dateFrom) {
      query = query.where('created_at', '>=', dateFrom);
    }
    if (dateTo) {
      query = query.where('created_at', '<=', dateTo);
    }

    const [stats] = await query
      .select([
        db.fn.count('id').as('total'),
        db.fn.count(db.case().when('action', '=', AuditAction.CREATE).then('id').end()).as('create_count'),
        db.fn.count(db.case().when('action', '=', AuditAction.READ).then('id').end()).as('read_count'),
        db.fn.count(db.case().when('action', '=', AuditAction.UPDATE).then('id').end()).as('update_count'),
        db.fn.count(db.case().when('action', '=', AuditAction.DELETE).then('id').end()).as('delete_count'),
        db.fn.count(db.case().when('action', '=', AuditAction.SIGN).then('id').end()).as('sign_count'),
        db.fn.count(db.case().when('category', '=', AuditCategory.USER_MANAGEMENT).then('id').end()).as('user_count'),
        db.fn.count(db.case().when('category', '=', AuditCategory.ORGANIZATION_MANAGEMENT).then('id').end()).as('org_count'),
        db.fn.count(db.case().when('category', '=', AuditCategory.DOCUMENT_MANAGEMENT).then('id').end()).as('document_count'),
        db.fn.count(db.case().when('category', '=', AuditCategory.SIGNATURE_MANAGEMENT).then('id').end()).as('signature_count'),
        db.fn.count(db.case().when('category', '=', AuditCategory.BLOCKCHAIN_OPERATIONS).then('id').end()).as('blockchain_count'),
        db.fn.count(db.case().when('category', '=', AuditCategory.COMPLIANCE).then('id').end()).as('compliance_count'),
        db.fn.count(db.case().when('category', '=', AuditCategory.SECURITY).then('id').end()).as('security_count')
      ])
      .execute();

    // Get recent activity (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let recentQuery = db.selectFrom('audit_logs').select(db.fn.count('id').as('count'));
    
    if (organizationId) {
      recentQuery = recentQuery.where('organization_id', '=', organizationId);
    }
    
    const [recentResult] = await recentQuery
      .where('created_at', '>=', oneDayAgo)
      .execute();

    return {
      total: Number(stats.total),
      byAction: {
        create: Number(stats.create_count),
        read: Number(stats.read_count),
        update: Number(stats.update_count),
        delete: Number(stats.delete_count),
        sign: Number(stats.sign_count)
      },
      byCategory: {
        user_management: Number(stats.user_count),
        organization_management: Number(stats.org_count),
        document_management: Number(stats.document_count),
        signature_management: Number(stats.signature_count),
        blockchain_operations: Number(stats.blockchain_count),
        compliance: Number(stats.compliance_count),
        security: Number(stats.security_count)
      },
      byRiskLevel: {
        low: 0, // Would need to parse metadata to get these
        medium: 0,
        high: 0,
        critical: 0
      },
      recentActivity: Number(recentResult.count)
    };
  } catch (error) {
    console.error('Error fetching audit log statistics:', error);
    throw new Error('Failed to fetch audit log statistics');
  }
}

/**
 * Search audit logs by correlation ID
 */
export async function getAuditLogsByCorrelationId(
  correlationId: string
): Promise<AuditLog[]> {
  try {
    const db = getDatabase();
    
    const results = await db
      .selectFrom('audit_logs')
      .selectAll()
      .where(sql`metadata::text`, 'like', `%"correlationId":"${correlationId}"%`)
      .orderBy('created_at', 'desc')
      .execute();

    return results.map(result => result as AuditLog);
  } catch (error) {
    console.error('Error getting audit logs by correlation ID:', error);
    throw new Error('Failed to get audit logs by correlation ID');
  }
}

/**
 * Get compliance audit trail for a document
 */
export async function getDocumentAuditTrail(
  documentId: string
): Promise<AuditLog[]> {
  try {
    const db = getDatabase();
    
    const results = await db
      .selectFrom('audit_logs')
      .selectAll()
      .where('document_id', '=', documentId)
      .orderBy('created_at', 'desc')
      .execute();

    return results.map((result: AuditLog) => ({
      ...result,
      before_state: result.before_state ?? null,
      after_state: result.after_state ?? null,
      metadata: result.metadata ?? {}
    }));
  } catch (error) {
    console.error('Error getting document audit trail:', error);
    throw new Error('Failed to get document audit trail');
  }
}

/**
 * Export audit logs for compliance reporting
 */
export async function exportAuditLogs(
  filters: {
    organizationId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    category?: AuditCategory;
    complianceFramework?: ComplianceFramework;
  } = {}
): Promise<AuditLog[]> {
  try {
    const db = getDatabase();
    
    let query = db.selectFrom('audit_logs').selectAll();

    if (filters.organizationId) {
      query = query.where('organization_id', '=', filters.organizationId);
    }
    if (filters.dateFrom) {
      query = query.where('created_at', '>=', filters.dateFrom);
    }
    if (filters.dateTo) {
      query = query.where('created_at', '<=', filters.dateTo);
    }
    if (filters.category) {
      query = query.where('category', '=', filters.category);
    }
    if (filters.complianceFramework) {
      query = query.where(sql`metadata::text`, 'like', `%"complianceFramework":"${filters.complianceFramework}"%`);
    }

    const results = await query
      .orderBy('created_at', 'desc')
      .execute();

    return results.map((result: AuditLog) => ({
      ...result,
      before_state: result.before_state ?? null,
      after_state: result.after_state ?? null,
      metadata: result.metadata ?? {}
    }));
  } catch (error) {
    console.error('Error exporting audit logs:', error);
    throw new Error('Failed to export audit logs');
  }
}
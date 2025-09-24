'use server';

import db from '@/db';
import { DocumentPermission } from '@/db/types';
import { PermissionType } from '@/db/enums';
import { revalidatePath } from 'next/cache';
import { dbUtils } from '@/db';
import type { Database } from '@/db';
import type { ExpressionBuilder } from 'kysely';

// Create a new document permission
export async function createDocumentPermission(options: {
  document_id: string;
  user_id?: string;
  organization_id?: string;
  permission_type: PermissionType;
  granted_by: string;
  expires_at?: Date;
  conditions?: {
    ip_restrictions?: string[];
    time_restrictions?: {
      start_time?: string;
      end_time?: string;
      days_of_week?: number[];
    };
    device_restrictions?: string[];
  };
}): Promise<DocumentPermission> {
  try {
    const permission = await db
      .insertInto('document_permissions')
      .values({
        document_id: options.document_id,
        user_id: options.user_id || null,
        organization_id: options.organization_id || null,
        permission_type: options.permission_type,
        granted_by: options.granted_by,
        granted_at: new Date(),
        expires_at: options.expires_at || null,
        is_active: true,
        conditions: options.conditions ? JSON.stringify(options.conditions) : null,
      })
      .returning([
        'id',
        'document_id',
        'user_id',
        'organization_id',
        'permission_type',
        'granted_by',
        'granted_at',
        'expires_at',
        'is_active',
        'conditions',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/documents');
    revalidatePath('/permissions');

    return permission as DocumentPermission;
  } catch (error) {
    console.error('Error creating document permission:', error);
    throw new Error('Failed to create document permission');
  }
}

// Get document permission by ID
export async function getDocumentPermissionById(id: string): Promise<DocumentPermission | null> {
  try {
    const permission = await db
      .selectFrom('document_permissions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    return permission as DocumentPermission | null;
  } catch (error) {
    console.error('Error fetching document permission:', error);
    throw new Error('Failed to fetch document permission');
  }
}

// Get all permissions for a document
export async function getDocumentPermissions(
  documentId: string,
  options?: {
    includeInactive?: boolean;
    permissionType?: PermissionType;
    userId?: string;
    organizationId?: string;
  }
): Promise<DocumentPermission[]> {
  try {
    let query = db
      .selectFrom('document_permissions')
      .selectAll()
      .where('document_id', '=', documentId);

    if (!options?.includeInactive) {
      query = query.where('is_active', '=', true);
    }

    if (options?.permissionType) {
      query = query.where('permission_type', '=', options.permissionType);
    }

    if (options?.userId) {
      query = query.where('user_id', '=', options.userId);
    }

    if (options?.organizationId) {
      query = query.where('organization_id', '=', options.organizationId);
    }

    const permissions = await query
      .orderBy('created_at', 'desc')
      .execute();

    return permissions as DocumentPermission[];
  } catch (error) {
    console.error('Error fetching document permissions:', error);
    throw new Error('Failed to fetch document permissions');
  }
}

// Get permissions for a user
export async function getUserPermissions(
  userId: string,
  options?: {
    includeInactive?: boolean;
    permissionType?: PermissionType;
    documentId?: string;
    limit?: number;
    offset?: number;
  }
): Promise<DocumentPermission[]> {
  try {
    let query = db
      .selectFrom('document_permissions')
      .selectAll()
      .where('user_id', '=', userId);

    if (!options?.includeInactive) {
      query = query.where('is_active', '=', true);
    }

    if (options?.permissionType) {
      query = query.where('permission_type', '=', options.permissionType);
    }

    if (options?.documentId) {
      query = query.where('document_id', '=', options.documentId);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const permissions = await query
      .orderBy('created_at', 'desc')
      .execute();

    return permissions as DocumentPermission[];
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    throw new Error('Failed to fetch user permissions');
  }
}

// Get permissions for an organization
export async function getOrganizationPermissions(
  organizationId: string,
  options?: {
    includeInactive?: boolean;
    permissionType?: PermissionType;
    documentId?: string;
    limit?: number;
    offset?: number;
  }
): Promise<DocumentPermission[]> {
  try {
    let query = db
      .selectFrom('document_permissions')
      .selectAll()
      .where('organization_id', '=', organizationId);

    if (!options?.includeInactive) {
      query = query.where('is_active', '=', true);
    }

    if (options?.permissionType) {
      query = query.where('permission_type', '=', options.permissionType);
    }

    if (options?.documentId) {
      query = query.where('document_id', '=', options.documentId);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const permissions = await query
      .orderBy('created_at', 'desc')
      .execute();

    return permissions as DocumentPermission[];
  } catch (error) {
    console.error('Error fetching organization permissions:', error);
    throw new Error('Failed to fetch organization permissions');
  }
}

// Update document permission
export async function updateDocumentPermission(
  id: string,
  updates: {
    permission_type?: PermissionType;
    expires_at?: Date | null;
    is_active?: boolean;
    conditions?: {
      ip_restrictions?: string[];
      time_restrictions?: {
        start_time?: string;
        end_time?: string;
        days_of_week?: number[];
      };
      device_restrictions?: string[];
    } | null;
  }
): Promise<DocumentPermission> {
  try {
    const updateData: Partial<{
      updated_at: string;
      permission_type: PermissionType;
      expires_at: Date | null;
      is_active: boolean;
      conditions: string | null;
    }> = {
      updated_at: dbUtils.toISOString(dbUtils.now()),
    };

    if (updates.permission_type !== undefined) {
      updateData.permission_type = updates.permission_type;
    }

    if (updates.expires_at !== undefined) {
      updateData.expires_at = updates.expires_at;
    }

    if (updates.is_active !== undefined) {
      updateData.is_active = updates.is_active;
    }

    if (updates.conditions !== undefined) {
      updateData.conditions = updates.conditions ? JSON.stringify(updates.conditions) : null;
    }

    const permission = await db
      .updateTable('document_permissions')
      .set(updateData)
      .where('id', '=', id)
      .returning([
        'id',
        'document_id',
        'user_id',
        'organization_id',
        'permission_type',
        'granted_by',
        'granted_at',
        'expires_at',
        'is_active',
        'conditions',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/documents');
    revalidatePath('/permissions');

    return permission as DocumentPermission;
  } catch (error) {
    console.error('Error updating document permission:', error);
    throw new Error('Failed to update document permission');
  }
}

// Revoke document permission (set as inactive)
export async function revokeDocumentPermission(id: string): Promise<DocumentPermission> {
  try {
    const permission = await db
      .updateTable('document_permissions')
      .set({
        is_active: false,
        updated_at: dbUtils.toISOString(dbUtils.now()),
      })
      .where('id', '=', id)
      .returning([
        'id',
        'document_id',
        'user_id',
        'organization_id',
        'permission_type',
        'granted_by',
        'granted_at',
        'expires_at',
        'is_active',
        'conditions',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/documents');
    revalidatePath('/permissions');

    return permission as DocumentPermission;
  } catch (error) {
    console.error('Error revoking document permission:', error);
    throw new Error('Failed to revoke document permission');
  }
}

// Delete document permission
export async function deleteDocumentPermission(id: string): Promise<void> {
  try {
    await db
      .deleteFrom('document_permissions')
      .where('id', '=', id)
      .execute();

    revalidatePath('/documents');
    revalidatePath('/permissions');
  } catch (error) {
    console.error('Error deleting document permission:', error);
    throw new Error('Failed to delete document permission');
  }
}

// Check if user has specific permission for a document
export async function checkUserPermission(
  userId: string,
  documentId: string,
  permissionType: PermissionType
): Promise<boolean> {
  try {
    const permission = await db
      .selectFrom('document_permissions')
      .select(['id'])
      .where('user_id', '=', userId)
      .where('document_id', '=', documentId)
      .where('permission_type', '=', permissionType)
      .where('is_active', '=', true)
      .where((eb: ExpressionBuilder<Database, 'document_permissions'>) =>
        eb.or([
          eb('expires_at', 'is', null),
          eb('expires_at', '>', new Date()),
        ])
      )
      .executeTakeFirst();

    return !!permission;
  } catch (error) {
    console.error('Error checking user permission:', error);
    return false;
  }
}

// Get effective permissions for a user (including organization permissions)
export async function getEffectiveUserPermissions(
  userId: string,
  documentId: string,
  organizationId?: string
): Promise<PermissionType[]> {
  try {
    const query = db
      .selectFrom('document_permissions')
      .select(['permission_type'])
      .where('document_id', '=', documentId)
      .where('is_active', '=', true)
      .where((eb: ExpressionBuilder<Database, 'document_permissions'>) =>
        eb.or([
          eb('expires_at', 'is', null),
          eb('expires_at', '>', new Date()),
        ])
      )
      .where((eb: ExpressionBuilder<Database, 'document_permissions'>) =>
        eb.or([
          eb('user_id', '=', userId),
          ...(organizationId ? [eb('organization_id', '=', organizationId)] : []),
        ])
      );

    const permissions = await query.execute();

    const rows = permissions as Array<{ permission_type: PermissionType }>;
    return [...new Set(rows.map((p) => p.permission_type))];
  } catch (error) {
    console.error('Error getting effective user permissions:', error);
    return [];
  }
}

// Bulk grant permissions
export async function bulkGrantPermissions(
  permissions: Array<{
    document_id: string;
    user_id?: string;
    organization_id?: string;
    permission_type: PermissionType;
    granted_by: string;
    expires_at?: Date;
    conditions?: {
      ip_restrictions?: string[];
      time_restrictions?: {
        start_time?: string;
        end_time?: string;
        days_of_week?: number[];
      };
      device_restrictions?: string[];
    };
  }>
): Promise<DocumentPermission[]> {
  try {
    const values = permissions.map(permission => ({
      document_id: permission.document_id,
      user_id: permission.user_id || null,
      organization_id: permission.organization_id || null,
      permission_type: permission.permission_type,
      granted_by: permission.granted_by,
      granted_at: new Date(),
      expires_at: permission.expires_at || null,
      is_active: true,
      conditions: JSON.stringify(permission.conditions || null),
    }));

    const createdPermissions = await db
      .insertInto('document_permissions')
      .values(values)
      .returning([
        'id',
        'document_id',
        'user_id',
        'organization_id',
        'permission_type',
        'granted_by',
        'granted_at',
        'expires_at',
        'is_active',
        'conditions',
        'created_at',
        'updated_at',
      ])
      .execute();

    revalidatePath('/documents');
    revalidatePath('/permissions');

    return createdPermissions as DocumentPermission[];
  } catch (error) {
    console.error('Error bulk granting permissions:', error);
    throw new Error('Failed to bulk grant permissions');
  }
}

// Get permission statistics
export async function getPermissionStats(documentId?: string): Promise<{
  total: number;
  active: number;
  expired: number;
  by_type: Record<PermissionType, number>;
}> {
  try {
    let baseQuery = db.selectFrom('document_permissions');

    if (documentId) {
      baseQuery = baseQuery.where('document_id', '=', documentId);
    }

    const [total, active, expired, byType] = await Promise.all([
      baseQuery.select(db.fn.count('id').as('count')).executeTakeFirstOrThrow(),
      baseQuery
        .select(db.fn.count('id').as('count'))
        .where('is_active', '=', true)
        .executeTakeFirstOrThrow(),
      baseQuery
        .select(db.fn.count('id').as('count'))
        .where('expires_at', '<', new Date())
        .executeTakeFirstOrThrow(),
      baseQuery
        .select(['permission_type', db.fn.count('id').as('count')])
        .groupBy('permission_type')
        .execute(),
    ]);

    const typeStats: Record<PermissionType, number> = {} as Record<PermissionType, number>;
    byType.forEach((stat) => {
      const pt = stat.permission_type as PermissionType;
      typeStats[pt] = Number((stat as { count: number | string }).count);
    });

    return {
      total: Number(total.count),
      active: Number(active.count),
      expired: Number(expired.count),
      by_type: typeStats,
    };
  } catch (error) {
    console.error('Error getting permission statistics:', error);
    throw new Error('Failed to get permission statistics');
  }
}

// Clean up expired permissions
export async function cleanupExpiredPermissions(): Promise<number> {
  try {
    const result = await db
      .updateTable('document_permissions')
      .set({
        is_active: false,
        updated_at: dbUtils.toISOString(dbUtils.now()),
      })
      .where('expires_at', '<', new Date())
      .where('is_active', '=', true)
      .execute();

    revalidatePath('/documents');
    revalidatePath('/permissions');

    return Number(result[0]?.numUpdatedRows || 0);
  } catch (error) {
    console.error('Error cleaning up expired permissions:', error);
    throw new Error('Failed to cleanup expired permissions');
  }
}
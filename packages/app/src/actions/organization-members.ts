'use server';

import { getDatabase } from '@/db';
import type { 
  OrganizationMember, 
  PaginatedResponse
} from '@/db/types';
import { UserRole, PermissionType } from '@/db/enums';
import { revalidatePath } from 'next/cache';

/**
 * Add a member to an organization
 */
export async function addOrganizationMember(
  organizationId: string,
  userId: string,
  role: UserRole,
  permissions: PermissionType[],
  invitedBy: string
): Promise<OrganizationMember> {
  try {
    const db = getDatabase();
    
    const memberData = {
      organization_id: organizationId,
      user_id: userId,
      role,
      permissions: JSON.stringify(permissions),
      invited_by: invitedBy,
      joined_at: new Date(),
      is_active: true
    };

    const result = await db
      .insertInto('organization_members')
      .values(memberData)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/organizations');
    revalidatePath(`/organizations/${organizationId}`);

    return {
      ...result,
      permissions: typeof result.permissions === 'string' ? JSON.parse(result.permissions) : result.permissions || []
    } as OrganizationMember;
  } catch (error) {
    console.error('Error adding organization member:', error);
    throw new Error('Failed to add organization member');
  }
}

/**
 * Get organization member by ID
 */
export async function getOrganizationMemberById(id: string): Promise<OrganizationMember | null> {
  try {
    const db = getDatabase();
    
    const result = await db
      .selectFrom('organization_members')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!result) return null;

    return {
      ...result,
      permissions: typeof result.permissions === 'string' ? JSON.parse(result.permissions) : result.permissions || []
    } as OrganizationMember;
  } catch (error) {
    console.error('Error getting organization member by ID:', error);
    throw new Error('Failed to get organization member');
  }
}

/**
 * Get organization members with pagination and filters
 */
export async function getOrganizationMembers(
  organizationId: string,
  page: number = 1,
  limit: number = 10,
  filters: { role?: UserRole; is_active?: boolean; search?: string } = {}
): Promise<PaginatedResponse<OrganizationMember>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    let query = db
      .selectFrom('organization_members')
      .selectAll()
      .where('organization_id', '=', organizationId);

    // Apply filters
    if (filters.role) {
      query = query.where('role', '=', filters.role);
    }
    if (filters.is_active !== undefined) {
      query = query.where('is_active', '=', filters.is_active);
    }

    // Apply search (would need to join with users table for name/email search)
    if (filters.search) {
      query = query.where('user_id', 'like', `%${filters.search}%`);
    }

    // Get total count
    const countQuery = db
      .selectFrom('organization_members')
      .select((eb) => eb.fn.count('id').as('count'))
      .where('organization_id', '=', organizationId);

    const [results, countResult] = await Promise.all([
      query.orderBy('joined_at', 'desc').limit(limit).offset(offset).execute(),
      countQuery.executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const members = results.map(result => ({
      ...result,
      permissions: typeof result.permissions === 'string' ? JSON.parse(result.permissions) : result.permissions || []
    })) as OrganizationMember[];

    return {
      data: members,
      pagination: {
        page,
        limit,
        total,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    };
  } catch (error) {
    console.error('Error getting organization members:', error);
    throw new Error('Failed to get organization members');
  }
}

/**
 * Update organization member
 */
export async function updateOrganizationMember(
  id: string,
  updateData: {
    role?: UserRole;
    permissions?: PermissionType[];
    is_active?: boolean;
  }
): Promise<OrganizationMember | null> {
  try {
    const db = getDatabase();
    
    const updates = { ...updateData } as Record<string, unknown>;
    
    // Handle JSON fields
    if (updateData.permissions) {
      updates.permissions = JSON.stringify(updateData.permissions);
    }

    const result = await db
      .updateTable('organization_members')
      .set(updates)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!result) return null;

    revalidatePath('/organizations');
    revalidatePath(`/organizations/${result.organization_id}`);

    return {
      ...result,
      permissions: typeof result.permissions === 'string' ? JSON.parse(result.permissions) : result.permissions || []
    } as OrganizationMember;
  } catch (error) {
    console.error('Error updating organization member:', error);
    throw new Error('Failed to update organization member');
  }
}

/**
 * Remove organization member (soft delete by setting is_active to false)
 */
export async function removeOrganizationMember(id: string): Promise<boolean> {
  try {
    const db = getDatabase();
    
    const result = await db
      .updateTable('organization_members')
      .set({ 
        is_active: false
      })
      .where('id', '=', id)
      .executeTakeFirst();

    revalidatePath('/organizations');
    return result.numUpdatedRows > 0;
  } catch (error) {
    console.error('Error removing organization member:', error);
    throw new Error('Failed to remove organization member');
  }
}

/**
 * Get member by user and organization
 */
export async function getOrganizationMemberByUser(
  organizationId: string,
  userId: string
): Promise<OrganizationMember | null> {
  try {
    const db = getDatabase();
    
    const result = await db
      .selectFrom('organization_members')
      .selectAll()
      .where('organization_id', '=', organizationId)
      .where('user_id', '=', userId)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!result) return null;

    return {
      ...result,
      permissions: typeof result.permissions === 'string' ? JSON.parse(result.permissions) : result.permissions || []
    } as OrganizationMember;
  } catch (error) {
    console.error('Error getting organization member by user:', error);
    throw new Error('Failed to get organization member');
  }
}

/**
 * Get organizations for a user
 */
export async function getUserOrganizations(
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<OrganizationMember>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    const [results, countResult] = await Promise.all([
      db
        .selectFrom('organization_members')
        .selectAll()
        .where('user_id', '=', userId)
        .where('is_active', '=', true)
        .orderBy('joined_at', 'desc')
        .limit(limit)
        .offset(offset)
        .execute(),
      db
        .selectFrom('organization_members')
        .select((eb) => eb.fn.count('id').as('count'))
        .where('user_id', '=', userId)
        .where('is_active', '=', true)
        .executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const memberships = results.map(result => ({
      ...result,
      permissions: typeof result.permissions === 'string' ? JSON.parse(result.permissions) : result.permissions || []
    })) as OrganizationMember[];

    return {
      data: memberships,
      pagination: {
        page,
        limit,
        total,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    };
  } catch (error) {
    console.error('Error getting user organizations:', error);
    throw new Error('Failed to get user organizations');
  }
}

/**
 * Update member permissions
 */
export async function updateMemberPermissions(
  id: string,
  permissions: PermissionType[]
): Promise<boolean> {
  try {
    const db = getDatabase();
    
    const result = await db
      .updateTable('organization_members')
      .set({ 
        permissions: JSON.stringify(permissions)
      })
      .where('id', '=', id)
      .executeTakeFirst();

    revalidatePath('/organizations');
    return result.numUpdatedRows > 0;
  } catch (error) {
    console.error('Error updating member permissions:', error);
    throw new Error('Failed to update member permissions');
  }
}

/**
 * Get organization member statistics
 */
export async function getOrganizationMemberStats(organizationId: string) {
  try {
    const db = getDatabase();
    
    const result = await db
      .selectFrom('organization_members')
      .select((eb) => [
        eb.fn.count('id').as('total'),
        eb.fn.count(eb.case().when('is_active', '=', true).then('id').end()).as('active'),
        eb.fn.count(eb.case().when('is_active', '=', false).then('id').end()).as('inactive'),
        eb.fn.count(eb.case().when('role', '=', UserRole.ADMIN).then('id').end()).as('admins'),
        eb.fn.count(eb.case().when('role', '=', UserRole.ORGANIZATION_MEMBER).then('id').end()).as('members'),
        eb.fn.count(eb.case().when('role', '=', UserRole.USER).then('id').end()).as('users')
      ])
      .where('organization_id', '=', organizationId)
      .executeTakeFirstOrThrow();
    
    return {
      total: Number(result.total),
      active: Number(result.active),
      inactive: Number(result.inactive),
      admins: Number(result.admins),
      members: Number(result.members),
      users: Number(result.users)
    };
  } catch (error) {
    console.error('Error getting organization member stats:', error);
    throw new Error('Failed to get organization member statistics');
  }
}

/**
 * Check if user has permission in organization
 */
export async function checkUserPermission(
  organizationId: string,
  userId: string,
  permission: PermissionType
): Promise<boolean> {
  try {
    const member = await getOrganizationMemberByUser(organizationId, userId);
    
    if (!member || !member.is_active) return false;
    
    // Admins have all permissions
    if (member.role === UserRole.ADMIN) return true;
    
    // Check specific permission
    return member.permissions.includes(permission);
  } catch (error) {
    console.error('Error checking user permission:', error);
    return false;
  }
}
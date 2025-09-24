'use server';

import { getDatabase, dbUtils } from '@/db';
import type { 
  Organization, 
  CreateOrganizationRequest, 
  PaginatedResponse, 
  QueryFilters 
} from '@/db/types';
import { OrganizationStatus, OrganizationType } from '@/db/enums';

// Create a new organization
export async function createOrganization(
  data: CreateOrganizationRequest,
  ownerId: string
): Promise<Organization> {
  const db = getDatabase();
  
  // Handle Ethereum address to UUID conversion
  let actualOwnerId = ownerId;
  
  // Check if ownerId is an Ethereum address (starts with 0x and is 42 characters long)
  if (ownerId.startsWith('0x') && ownerId.length === 42) {
    // Find the user by wallet address
    const user = await db
      .selectFrom('users')
      .select('id')
      .where('wallet_address', '=', ownerId)
      .where('is_active', '=', true)
      .executeTakeFirst();
    
    if (!user) {
      throw new Error(`No user found with wallet address: ${ownerId}`);
    }
    
    actualOwnerId = user.id;
  }
  
  const organizationData = {
    id: dbUtils.generateId(),
    name: data.name,
    slug: data.slug || dbUtils.generateSlug(data.name),
    description: data.description || null,
    logo_url: null,
    website_url: data.website_url || null,
    type: data.type,
    status: OrganizationStatus.ACTIVE,
    owner_id: actualOwnerId,
    blockchain_address: null,
    blockchain_network: null,
    compliance_frameworks: JSON.stringify(data.compliance_frameworks || []),
    settings: JSON.stringify(data.settings || {}),
    metadata: JSON.stringify(data.metadata || {}),
    created_at: dbUtils.toISOString(dbUtils.now()),
    updated_at: dbUtils.toISOString(dbUtils.now())
  };

  const result = await db
    .insertInto('organizations')
    .values(organizationData)
    .returningAll()
    .executeTakeFirstOrThrow();

  return {
    ...result,
    compliance_frameworks: result.compliance_frameworks ?? [],
    settings: result.settings ?? {},
    metadata: result.metadata ?? {}
  };
}

// Get organization by ID
export async function getOrganizationById(id: string): Promise<Organization | null> {
  const db = getDatabase();
  
  const result = await db
    .selectFrom('organizations')
    .selectAll()
    .where('id', '=', id)
    .where('status', '!=', OrganizationStatus.SUSPENDED)
    .executeTakeFirst();

  if (!result) return null;

  return {
    ...result,
    compliance_frameworks: result.compliance_frameworks ?? [],
    settings: result.settings ?? {},
    metadata: result.metadata ?? {}
  };
}

// Get organization by slug
export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  const db = getDatabase();
  
  const result = await db
    .selectFrom('organizations')
    .selectAll()
    .where('slug', '=', slug)
    .where('status', '!=', OrganizationStatus.SUSPENDED)
    .executeTakeFirst();

  if (!result) return null;

  return {
    ...result,
    compliance_frameworks: result.compliance_frameworks ?? [],
    settings: result.settings ?? {},
    metadata: result.metadata ?? {}
  };
}

// Get organizations with pagination and filters
export async function getOrganizations(
  page: number = 1,
  limit: number = 10,
  filters: QueryFilters<Organization> = {}
): Promise<PaginatedResponse<Organization>> {
  const db = getDatabase();
  const offset = (page - 1) * limit;

  let query = db
    .selectFrom('organizations')
    .selectAll()
    .where('status', '!=', OrganizationStatus.SUSPENDED);

  // Apply filters
  if (filters.filters?.type) {
    query = query.where('type', '=', filters.filters.type as OrganizationType);
  }
  if (filters.filters?.status) {
    query = query.where('status', '=', filters.filters.status as OrganizationStatus);
  }
  if (filters.search) {
    query = query.where((eb) =>
      eb.or([
        eb('name', 'ilike', `%${filters.search}%`),
        eb('description', 'ilike', `%${filters.search}%`)
      ])
    );
  }

  // Apply sorting
  if (filters.sort_by) {
    const sortOrder = filters.sort_order === 'desc' ? 'desc' : 'asc';
    query = query.orderBy(filters.sort_by as keyof Organization, sortOrder);
  } else {
    query = query.orderBy('created_at', 'desc');
  }

  // Get total count
  const countQuery = db
    .selectFrom('organizations')
    .select((eb) => eb.fn.count('id').as('count'))
    .where('status', '!=', OrganizationStatus.SUSPENDED);

  const [results, countResult] = await Promise.all([
    query.limit(limit).offset(offset).execute(),
    countQuery.executeTakeFirstOrThrow()
  ]);

  const total = Number(countResult.count);
  const totalPages = Math.ceil(total / limit);

  const organizations = results.map(result => ({
    ...result,
    compliance_frameworks: result.compliance_frameworks ?? [],
    settings: result.settings ?? {},
    metadata: result.metadata ?? {}
  }));

  return {
    data: organizations,
    pagination: {
      page,
      limit,
      total,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_prev: page > 1
    }
  };
}

// Update organization
export async function updateOrganization(
  id: string,
  updateData: Record<string, unknown>
): Promise<Organization | null> {
  const db = getDatabase();
  
  // Handle JSON fields
  if (updateData.compliance_frameworks) {
    updateData.compliance_frameworks = JSON.stringify(updateData.compliance_frameworks as unknown);
  }
  if (updateData.settings) {
    updateData.settings = JSON.stringify(updateData.settings);
  }
  if (updateData.metadata) {
    updateData.metadata = JSON.stringify(updateData.metadata);
  }
  
  updateData.updated_at = dbUtils.toISOString(dbUtils.now());

  const result = await db
    .updateTable('organizations')
    .set(updateData)
    .where('id', '=', id)
    .where('status', '!=', OrganizationStatus.SUSPENDED)
    .returningAll()
    .executeTakeFirst();

  if (!result) return null;

  return {
    ...result,
    compliance_frameworks: result.compliance_frameworks ?? [],
    settings: result.settings ?? {},
    metadata: result.metadata ?? {}
  };
}

// Soft delete organization
export async function deleteOrganization(id: string): Promise<boolean> {
  const db = getDatabase();
  
  const result = await db
    .updateTable('organizations')
    .set({ 
      status: OrganizationStatus.SUSPENDED,
      updated_at: dbUtils.toISOString(dbUtils.now())
    })
    .where('id', '=', id)
    .where('status', '!=', OrganizationStatus.SUSPENDED)
    .executeTakeFirst();

  return result.numUpdatedRows > 0;
}

// Verify organization
export async function verifyOrganization(id: string): Promise<boolean> {
  const db = getDatabase();
  
  const result = await db
    .updateTable('organizations')
    .set({ 
      status: OrganizationStatus.ACTIVE,
      updated_at: dbUtils.toISOString(dbUtils.now())
    })
    .where('id', '=', id)
    .executeTakeFirst();

  return result.numUpdatedRows > 0;
}

// Unverify organization
export async function unverifyOrganization(id: string): Promise<boolean> {
  const db = getDatabase();
  
  const result = await db
    .updateTable('organizations')
    .set({ 
      status: OrganizationStatus.PENDING_VERIFICATION,
      updated_at: dbUtils.toISOString(dbUtils.now())
    })
    .where('id', '=', id)
    .executeTakeFirst();

  return result.numUpdatedRows > 0;
}

// Get organization statistics
export async function getOrganizationStats(type?: string, status?: string) {
  const db = getDatabase();
  
  let query = db
    .selectFrom('organizations')
    .select((eb) => [
      eb.fn.count('id').as('total'),
      eb.fn.count(eb.case().when('status', '=', OrganizationStatus.ACTIVE).then('id').end()).as('active'),
      eb.fn.count(eb.case().when('status', '=', OrganizationStatus.PENDING_VERIFICATION).then('id').end()).as('pending'),
      eb.fn.count(eb.case().when('status', '=', OrganizationStatus.SUSPENDED).then('id').end()).as('suspended')
    ]);

  // Apply specific filters
  if (type) {
    query = query.where('type', '=', type as OrganizationType);
  }
  if (status) {
    query = query.where('status', '=', status as OrganizationStatus);
  }

  const result = await query.executeTakeFirstOrThrow();
  
  return {
    total: Number(result.total),
    active: Number(result.active),
    pending: Number(result.pending),
    suspended: Number(result.suspended)
  };
}
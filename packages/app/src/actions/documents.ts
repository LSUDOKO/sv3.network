'use server';

import { getDatabase } from '@/db';
import type { 
  Document, 
  CreateDocumentRequest, 
  UpdateDocumentRequest,
  PaginatedResponse, 
  QueryFilters 
} from '@/db/types';
import { DocumentStatus, DocumentType, DocumentPrivacy } from '@/db/enums';
import { revalidatePath } from 'next/cache';

/**
 * Create a new document
 */
export async function createDocument(
  data: CreateDocumentRequest,
  ownerId: string
): Promise<Document> {
  try {
    const db = getDatabase();
    
    const documentData = {
      title: data.title,
      description: data.description || null,
      type: data.type,
      status: DocumentStatus.DRAFT,
      privacy: data.privacy,
      owner_id: ownerId,
      organization_id: data.organization_id || null,
      file_hash: data.file_data.file_hash,
      file_size: data.file_data.file_size,
      file_type: data.file_data.file_type,
      storage_provider: data.file_data.storage_provider,
      storage_path: data.file_data.storage_path,
      ipfs_url: data.file_data.ipfs_url || null,
      nft_token_id: null,
      nft_contract_address: null,
      blockchain_network: null,
      token_standard: null,
      transaction_hash: null,
      expires_at: data.metadata?.expires_at ? new Date(data.metadata.expires_at) : null,
      signed_at: null,
      completed_at: null,
      tags: JSON.stringify(data.tags || []),
      custom_fields: JSON.stringify(data.custom_fields || {}),
      version: 1,
      parent_document_id: null,
      metadata: JSON.stringify(data.metadata || {})
    };

    const result = await db
      .insertInto('documents')
      .values(documentData)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/documents');

    return {
      ...result,
      tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags || [],
      custom_fields: typeof result.custom_fields === 'string' ? JSON.parse(result.custom_fields) : result.custom_fields || {},
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    } as Document;
  } catch (error) {
    console.error('Error creating document:', error);
    throw new Error('Failed to create document');
  }
}

/**
 * Get document by ID
 */
export async function getDocumentById(id: string): Promise<Document | null> {
  try {
    const db = getDatabase();
    
    const result = await db
      .selectFrom('documents')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!result) return null;

    return {
      ...result,
      tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags || [],
      custom_fields: typeof result.custom_fields === 'string' ? JSON.parse(result.custom_fields) : result.custom_fields || {},
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    } as Document;
  } catch (error) {
    console.error('Error getting document by ID:', error);
    throw new Error('Failed to get document');
  }
}

/**
 * Get documents with pagination and filters
 */
export async function getDocuments(
  page: number = 1,
  limit: number = 10,
  filters: QueryFilters<Document> = {}
): Promise<PaginatedResponse<Document>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    let query = db
      .selectFrom('documents')
      .selectAll();

    // Apply filters
    if (filters.filters?.type) {
      query = query.where('type', '=', filters.filters.type as DocumentType);
    }
    if (filters.filters?.status) {
      query = query.where('status', '=', filters.filters.status as DocumentStatus);
    }
    if (filters.filters?.privacy) {
      query = query.where('privacy', '=', filters.filters.privacy as DocumentPrivacy);
    }
    if (filters.filters?.owner_id) {
      query = query.where('owner_id', '=', filters.filters.owner_id as string);
    }
    if (filters.filters?.organization_id) {
      query = query.where('organization_id', '=', filters.filters.organization_id as string);
    }

    // Apply search
    if (filters.search) {
      query = query.where((eb) =>
        eb.or([
          eb('title', 'ilike', `%${filters.search}%`),
          eb('description', 'ilike', `%${filters.search}%`)
        ])
      );
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order === 'desc' ? 'desc' : 'asc';
      query = query.orderBy(filters.sort_by as keyof Document, sortOrder);
    } else {
      query = query.orderBy('created_at', 'desc');
    }

    // Get total count
    const countQuery = db
      .selectFrom('documents')
      .select((eb) => eb.fn.count('id').as('count'));

    const [results, countResult] = await Promise.all([
      query.limit(limit).offset(offset).execute(),
      countQuery.executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const documents = results.map(result => ({
      ...result,
      tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags || [],
      custom_fields: typeof result.custom_fields === 'string' ? JSON.parse(result.custom_fields) : result.custom_fields || {},
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    })) as Document[];

    return {
      data: documents,
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
    console.error('Error getting documents:', error);
    throw new Error('Failed to get documents');
  }
}

/**
 * Update document
 */
export async function updateDocument(
  id: string,
  updateData: UpdateDocumentRequest
): Promise<Document | null> {
  try {
    const db = getDatabase();
    
    const updates = { ...updateData } as Record<string, unknown>;
    
    // Handle JSON fields
    if (updateData.tags) {
      updates.tags = JSON.stringify(updateData.tags);
    }
    if (updateData.custom_fields) {
      updates.custom_fields = JSON.stringify(updateData.custom_fields);
    }
    if (updateData.metadata) {
      updates.metadata = JSON.stringify(updateData.metadata);
    }
    
    // Handle file_data fields
    if (updateData.file_data) {
      if (updateData.file_data.storage_path !== undefined) {
        updates.storage_path = updateData.file_data.storage_path;
      }
      if (updateData.file_data.ipfs_url !== undefined) {
        updates.ipfs_url = updateData.file_data.ipfs_url;
      }
      // Remove the file_data object from updates since we've handled it
      delete updates.file_data;
    }

    const result = await db
      .updateTable('documents')
      .set(updates)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!result) return null;

    revalidatePath('/documents');
    revalidatePath(`/documents/${id}`);

    return {
      ...result,
      tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags || [],
      custom_fields: typeof result.custom_fields === 'string' ? JSON.parse(result.custom_fields) : result.custom_fields || {},
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    } as Document;
  } catch (error) {
    console.error('Error updating document:', error);
    throw new Error('Failed to update document');
  }
}

/**
 * Delete document (soft delete by updating status)
 */
export async function deleteDocument(id: string): Promise<boolean> {
  try {
    const db = getDatabase();
    
    const result = await db
      .updateTable('documents')
      .set({ 
        status: DocumentStatus.CANCELLED
      })
      .where('id', '=', id)
      .executeTakeFirst();

    revalidatePath('/documents');
    return result.numUpdatedRows > 0;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw new Error('Failed to delete document');
  }
}

/**
 * Get documents by owner
 * Handles both UUIDs and Ethereum addresses
 */
export async function getDocumentsByOwner(
  ownerId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Document>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    // Check if ownerId is an Ethereum address (starts with 0x and is 42 characters long)
    let actualOwnerId = ownerId;
    if (ownerId.startsWith('0x') && ownerId.length === 42) {
      // This is an Ethereum address, need to convert it to user ID
      const user = await db
        .selectFrom('users')
        .select('id')
        .where('wallet_address', '=', ownerId)
        .where('is_active', '=', true)
        .executeTakeFirst();
      
      if (!user) {
        // No user found for this Ethereum address, return empty result
        return {
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            total_pages: 0,
            has_next: false,
            has_prev: false
          }
        };
      }
      
      actualOwnerId = user.id;
    }

    const [results, countResult] = await Promise.all([
      db
        .selectFrom('documents')
        .selectAll()
        .where('owner_id', '=', actualOwnerId)
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
        .execute(),
      db
        .selectFrom('documents')
        .select((eb) => eb.fn.count('id').as('count'))
        .where('owner_id', '=', actualOwnerId)
        .executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const documents = results.map(result => ({
      ...result,
      tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags || [],
      custom_fields: typeof result.custom_fields === 'string' ? JSON.parse(result.custom_fields) : result.custom_fields || {},
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    })) as Document[];

    return {
      data: documents,
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
    console.error('Error getting documents by owner:', error);
    throw new Error('Failed to get documents by owner');
  }
}

/**
 * Get documents by organization
 */
export async function getDocumentsByOrganization(
  organizationId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Document>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    const [results, countResult] = await Promise.all([
      db
        .selectFrom('documents')
        .selectAll()
        .where('organization_id', '=', organizationId)
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
        .execute(),
      db
        .selectFrom('documents')
        .select((eb) => eb.fn.count('id').as('count'))
        .where('organization_id', '=', organizationId)
        .executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const documents = results.map(result => ({
      ...result,
      tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags || [],
      custom_fields: typeof result.custom_fields === 'string' ? JSON.parse(result.custom_fields) : result.custom_fields || {},
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    })) as Document[];

    return {
      data: documents,
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
    console.error('Error getting documents by organization:', error);
    throw new Error('Failed to get documents by organization');
  }
}

/**
 * Update document status
 */
export async function updateDocumentStatus(
  id: string,
  status: DocumentStatus
): Promise<boolean> {
  try {
    const db = getDatabase();
    
    const updates: Record<string, unknown> = { status };
    
    // Set completion timestamp for completed statuses
    if (status === DocumentStatus.FULLY_SIGNED || status === DocumentStatus.COMPLETED) {
      updates.completed_at = new Date();
    }
    
    const result = await db
      .updateTable('documents')
      .set(updates)
      .where('id', '=', id)
      .executeTakeFirst();

    revalidatePath('/documents');
    revalidatePath(`/documents/${id}`);
    
    return result.numUpdatedRows > 0;
  } catch (error) {
    console.error('Error updating document status:', error);
    throw new Error('Failed to update document status');
  }
}

/**
 * Get document statistics
 */
export async function getDocumentStats(organizationId?: string) {
  try {
    const db = getDatabase();
    
    let query = db
      .selectFrom('documents')
      .select((eb) => [
        eb.fn.count('id').as('total'),
        eb.fn.count(eb.case().when('status', '=', DocumentStatus.DRAFT).then('id').end()).as('draft'),
        eb.fn.count(eb.case().when('status', '=', DocumentStatus.PENDING_SIGNATURES).then('id').end()).as('pending_signatures'),
        eb.fn.count(eb.case().when('status', '=', DocumentStatus.FULLY_SIGNED).then('id').end()).as('fully_signed'),
        eb.fn.count(eb.case().when('status', '=', DocumentStatus.COMPLETED).then('id').end()).as('completed')
      ]);

    if (organizationId) {
      query = query.where('organization_id', '=', organizationId);
    }

    const result = await query.executeTakeFirstOrThrow();
    
    return {
      total: Number(result.total),
      draft: Number(result.draft),
      pending_signatures: Number(result.pending_signatures),
      fully_signed: Number(result.fully_signed),
      completed: Number(result.completed)
    };
  } catch (error) {
    console.error('Error getting document stats:', error);
    throw new Error('Failed to get document statistics');
  }
}

/**
 * Search documents by tags
 */
export async function searchDocumentsByTags(
  tags: string[],
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Document>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    // Get all documents and filter in memory for now
    // In production, you might want to use a proper JSON search or full-text search
    const allResults = await db
      .selectFrom('documents')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();

    // Filter documents that contain any of the specified tags
    const filteredResults = allResults.filter(result => {
      if (!result.tags) return false;
      
      let documentTags: string[] = [];
      try {
        documentTags = typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags || [];
      } catch {
        return false;
      }
      
      return tags.some(tag => documentTags.includes(tag));
    });

    // Apply pagination to filtered results
    const total = filteredResults.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedResults = filteredResults.slice(offset, offset + limit);

    const documents = paginatedResults.map(result => ({
      ...result,
      tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags || [],
      custom_fields: typeof result.custom_fields === 'string' ? JSON.parse(result.custom_fields) : result.custom_fields || {},
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    })) as Document[];

    return {
      data: documents,
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
    console.error('Error searching documents by tags:', error);
    throw new Error('Failed to search documents by tags');
  }
}
'use server';

import { getDatabase } from '@/db';
import type { 
  Signature, 
  PaginatedResponse
} from '@/db/types';
import { SignatureType, SignatureStatus } from '@/db/enums';
import { revalidatePath } from 'next/cache';

/**
 * Create a new signature
 */
export async function createSignature(
  documentId: string,
  signerId: string,
  signerWalletAddress: string,
  signatureType: SignatureType,
  signatureData: string,
  signatureHash: string,
  metadata?: Record<string, unknown>
): Promise<Signature> {
  try {
    const db = getDatabase();
    
    const signatureRecord = {
      document_id: documentId,
      signer_id: signerId,
      signer_wallet_address: signerWalletAddress,
      signature_type: signatureType,
      signature_data: signatureData,
      signature_hash: signatureHash,
      status: SignatureStatus.PENDING,
      metadata: metadata ? JSON.stringify(metadata) : '{}'
    };

    const result = await db
      .insertInto('signatures')
      .values(signatureRecord)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/documents');
    revalidatePath(`/documents/${documentId}`);

    return {
      ...result,
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    } as Signature;
  } catch (error) {
    console.error('Error creating signature:', error);
    throw new Error('Failed to create signature');
  }
}

/**
 * Get signature by ID
 */
export async function getSignatureById(id: string): Promise<Signature | null> {
  try {
    const db = getDatabase();
    
    const result = await db
      .selectFrom('signatures')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!result) return null;

    return {
      ...result,
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    } as Signature;
  } catch (error) {
    console.error('Error getting signature by ID:', error);
    throw new Error('Failed to get signature');
  }
}

/**
 * Get signatures with pagination and filters
 */
export async function getSignatures(
  page: number = 1,
  limit: number = 10,
  filters: { 
    document_id?: string; 
    signer_id?: string; 
    signature_type?: SignatureType; 
    status?: SignatureStatus;
    search?: string;
  } = {}
): Promise<PaginatedResponse<Signature>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    let query = db
      .selectFrom('signatures')
      .selectAll();

    // Apply filters
    if (filters.document_id) {
      query = query.where('document_id', '=', filters.document_id);
    }
    if (filters.signer_id) {
      query = query.where('signer_id', '=', filters.signer_id);
    }
    if (filters.signature_type) {
      query = query.where('signature_type', '=', filters.signature_type);
    }
    if (filters.status) {
      query = query.where('status', '=', filters.status);
    }

    // Apply search (basic search on signature_data)
    if (filters.search) {
      query = query.where('signature_data', 'like', `%${filters.search}%`);
    }

    // Get total count with same filters
    let countQuery = db
      .selectFrom('signatures')
      .select((eb) => eb.fn.count('id').as('count'));

    if (filters.document_id) {
      countQuery = countQuery.where('document_id', '=', filters.document_id);
    }
    if (filters.signer_id) {
      countQuery = countQuery.where('signer_id', '=', filters.signer_id);
    }
    if (filters.signature_type) {
      countQuery = countQuery.where('signature_type', '=', filters.signature_type);
    }
    if (filters.status) {
      countQuery = countQuery.where('status', '=', filters.status);
    }
    if (filters.search) {
      countQuery = countQuery.where('signature_data', 'like', `%${filters.search}%`);
    }

    const [results, countResult] = await Promise.all([
      query.orderBy('created_at', 'desc').limit(limit).offset(offset).execute(),
      countQuery.executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const signatures = results.map(result => ({
      ...result,
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    })) as Signature[];

    return {
      data: signatures,
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
    console.error('Error getting signatures:', error);
    throw new Error('Failed to get signatures');
  }
}

/**
 * Update signature
 */
export async function updateSignature(
  id: string,
  updateData: {
    signature_data?: string;
    status?: SignatureStatus;
    metadata?: Record<string, unknown>;
    signed_at?: Date;
  }
): Promise<Signature | null> {
  try {
    const db = getDatabase();
    
    const updates = { ...updateData } as Record<string, unknown>;
    
    // Handle JSON fields
    if (updateData.metadata) {
      updates.metadata = JSON.stringify(updateData.metadata);
    }

    const result = await db
      .updateTable('signatures')
      .set(updates)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!result) return null;

    revalidatePath('/documents');
    revalidatePath(`/documents/${result.document_id}`);

    return {
      ...result,
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    } as Signature;
  } catch (error) {
    console.error('Error updating signature:', error);
    throw new Error('Failed to update signature');
  }
}

/**
 * Delete signature
 */
export async function deleteSignature(id: string): Promise<boolean> {
  try {
    const db = getDatabase();
    
    const result = await db
      .deleteFrom('signatures')
      .where('id', '=', id)
      .executeTakeFirst();

    revalidatePath('/documents');
    return result.numDeletedRows > 0;
  } catch (error) {
    console.error('Error deleting signature:', error);
    throw new Error('Failed to delete signature');
  }
}

/**
 * Get signatures by document ID
 */
export async function getSignaturesByDocument(
  documentId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Signature>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    const [results, countResult] = await Promise.all([
      db
        .selectFrom('signatures')
        .selectAll()
        .where('document_id', '=', documentId)
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
        .execute(),
      db
        .selectFrom('signatures')
        .select((eb) => eb.fn.count('id').as('count'))
        .where('document_id', '=', documentId)
        .executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const signatures = results.map(result => ({
      ...result,
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    })) as Signature[];

    return {
      data: signatures,
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
    console.error('Error getting signatures by document:', error);
    throw new Error('Failed to get signatures by document');
  }
}

/**
 * Get signatures by signer ID
 */
export async function getSignaturesBySigner(
  signerId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Signature>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    const [results, countResult] = await Promise.all([
      db
        .selectFrom('signatures')
        .selectAll()
        .where('signer_id', '=', signerId)
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
        .execute(),
      db
        .selectFrom('signatures')
        .select((eb) => eb.fn.count('id').as('count'))
        .where('signer_id', '=', signerId)
        .executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const signatures = results.map(result => ({
      ...result,
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    })) as Signature[];

    return {
      data: signatures,
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
    console.error('Error getting signatures by signer:', error);
    throw new Error('Failed to get signatures by signer');
  }
}

/**
 * Update signature status
 */
export async function updateSignatureStatus(
  id: string,
  status: SignatureStatus,
  signedAt?: Date
): Promise<boolean> {
  try {
    const db = getDatabase();
    
    const updates: Record<string, unknown> = { status };
    if (signedAt) {
      updates.signed_at = signedAt;
    }

    const result = await db
      .updateTable('signatures')
      .set(updates)
      .where('id', '=', id)
      .executeTakeFirst();

    revalidatePath('/documents');
    return result.numUpdatedRows > 0;
  } catch (error) {
    console.error('Error updating signature status:', error);
    throw new Error('Failed to update signature status');
  }
}

/**
 * Get signature statistics
 */
export async function getSignatureStats(documentId?: string) {
  try {
    const db = getDatabase();
    
    let query = db
      .selectFrom('signatures')
      .select((eb) => [
        eb.fn.count('id').as('total'),
        eb.fn.count(eb.case().when('status', '=', SignatureStatus.PENDING).then('id').end()).as('pending'),
        eb.fn.count(eb.case().when('status', '=', SignatureStatus.SIGNED).then('id').end()).as('signed'),
        eb.fn.count(eb.case().when('status', '=', SignatureStatus.REJECTED).then('id').end()).as('rejected'),
        eb.fn.count(eb.case().when('signature_type', '=', SignatureType.DIGITAL).then('id').end()).as('digital'),
        eb.fn.count(eb.case().when('signature_type', '=', SignatureType.ELECTRONIC).then('id').end()).as('electronic')
      ]);

    if (documentId) {
      query = query.where('document_id', '=', documentId);
    }

    const result = await query.executeTakeFirstOrThrow();
    
    return {
      total: Number(result.total),
      pending: Number(result.pending),
      signed: Number(result.signed),
      rejected: Number(result.rejected),
      digital: Number(result.digital),
      electronic: Number(result.electronic)
    };
  } catch (error) {
    console.error('Error getting signature stats:', error);
    throw new Error('Failed to get signature statistics');
  }
}

/**
 * Verify signature
 */
export async function verifySignature(id: string): Promise<boolean> {
  try {
    const db = getDatabase();
    
    const signature = await db
      .selectFrom('signatures')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!signature) return false;

    // Here you would implement actual signature verification logic
    // For now, we'll just check if the signature exists and has data
    return signature.signature_data !== null && signature.signature_data.length > 0;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

/**
 * Get pending signatures for a signer
 */
export async function getPendingSignatures(
  signerId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Signature>> {
  try {
    const db = getDatabase();
    const offset = (page - 1) * limit;

    const [results, countResult] = await Promise.all([
      db
        .selectFrom('signatures')
        .selectAll()
        .where('signer_id', '=', signerId)
        .where('status', '=', SignatureStatus.PENDING)
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
        .execute(),
      db
        .selectFrom('signatures')
        .select((eb) => eb.fn.count('id').as('count'))
        .where('signer_id', '=', signerId)
        .where('status', '=', SignatureStatus.PENDING)
        .executeTakeFirstOrThrow()
    ]);

    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / limit);

    const signatures = results.map(result => ({
      ...result,
      metadata: typeof result.metadata === 'string' ? JSON.parse(result.metadata) : result.metadata || {}
    })) as Signature[];

    return {
      data: signatures,
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
    console.error('Error getting pending signatures:', error);
    throw new Error('Failed to get pending signatures');
  }
}
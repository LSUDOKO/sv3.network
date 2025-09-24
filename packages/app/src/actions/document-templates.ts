'use server';

import db from '@/db';
import { DocumentTemplate } from '@/db/types';
import { DocumentType } from '@/db/enums';
import { revalidatePath } from 'next/cache';
import { sql } from 'kysely';

// Create a new document template
export async function createDocumentTemplate(options: {
  name: string;
  description?: string;
  type: DocumentType;
  organization_id?: string;
  created_by: string;
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
  is_public?: boolean;
  tags?: string[];
}): Promise<DocumentTemplate> {
  try {
    const template = await db
      .insertInto('document_templates')
      .values({
        name: options.name,
        description: options.description || null,
        type: options.type,
        organization_id: options.organization_id || null,
        created_by: options.created_by,
        template_data: JSON.stringify(options.template_data),
        usage_count: 0,
        is_active: true,
        is_public: options.is_public || false,
        tags: JSON.stringify(options.tags || []),
      })
      .returning([
        'id',
        'name',
        'description',
        'type',
        'organization_id',
        'created_by',
        'template_data',
        'usage_count',
        'is_active',
        'is_public',
        'tags',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/templates');
    revalidatePath('/dashboard');

    return template as DocumentTemplate;
  } catch (error) {
    console.error('Error creating document template:', error);
    throw new Error('Failed to create document template');
  }
}

// Get document template by ID
export async function getDocumentTemplateById(id: string): Promise<DocumentTemplate | null> {
  try {
    const template = await db
      .selectFrom('document_templates')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst();

    return template as DocumentTemplate | null;
  } catch (error) {
    console.error('Error fetching document template:', error);
    throw new Error('Failed to fetch document template');
  }
}

// Get document templates with pagination and filters
export async function getDocumentTemplates(options?: {
  organization_id?: string;
  created_by?: string;
  type?: DocumentType;
  is_public?: boolean;
  search?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}): Promise<{
  templates: DocumentTemplate[];
  total: number;
}> {
  try {
    let query = db
      .selectFrom('document_templates')
      .selectAll()
      .where('is_active', '=', true);

    if (options?.organization_id) {
      query = query.where((eb) =>
        eb.or([
          eb('organization_id', '=', options.organization_id!),
          eb('is_public', '=', true),
        ])
      );
    } else if (options?.is_public !== undefined) {
      query = query.where('is_public', '=', options.is_public);
    }

    if (options?.created_by) {
      query = query.where('created_by', '=', options.created_by);
    }

    if (options?.type) {
      query = query.where('type', '=', options.type);
    }

    if (options?.search) {
      query = query.where((eb) =>
        eb.or([
          eb('name', 'ilike', `%${options.search}%`),
          eb('description', 'ilike', `%${options.search}%`),
        ])
      );
    }

    if (options?.tags && options.tags.length > 0) {
      for (const tag of options.tags) {
        query = query.where(sql`tags::text`, 'like', `%${tag}%`);
      }
    }

    // Get total count
    const totalQuery = query.select(db.fn.count('id').as('count'));
    const totalResult = await totalQuery.executeTakeFirstOrThrow();
    const total = Number(totalResult.count);

    // Get paginated results
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const templates = await query
      .orderBy('created_at', 'desc')
      .execute();

    return {
      templates: templates as DocumentTemplate[],
      total,
    };
  } catch (error) {
    console.error('Error fetching document templates:', error);
    throw new Error('Failed to fetch document templates');
  }
}

// Get popular document templates
export async function getPopularDocumentTemplates(
  limit: number = 10,
  organizationId?: string
): Promise<DocumentTemplate[]> {
  try {
    let query = db
      .selectFrom('document_templates')
      .selectAll()
      .where('is_active', '=', true);

    if (organizationId) {
      query = query.where((eb) =>
        eb.or([
          eb('organization_id', '=', organizationId),
          eb('is_public', '=', true),
        ])
      );
    } else {
      query = query.where('is_public', '=', true);
    }

    const templates = await query
      .orderBy('usage_count', 'desc')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .execute();

    return templates as DocumentTemplate[];
  } catch (error) {
    console.error('Error fetching popular document templates:', error);
    throw new Error('Failed to fetch popular document templates');
  }
}

// Update document template
export async function updateDocumentTemplate(
  id: string,
  updates: {
    name?: string;
    description?: string;
    type?: DocumentType;
    template_data?: {
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
    is_public?: boolean;
    tags?: string[];
  }
): Promise<DocumentTemplate> {
  try {
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.name !== undefined) {
      updateData.name = updates.name;
    }

    if (updates.description !== undefined) {
      updateData.description = updates.description;
    }

    if (updates.type !== undefined) {
      updateData.type = updates.type;
    }

    if (updates.template_data !== undefined) {
      updateData.template_data = JSON.stringify(updates.template_data);
    }

    if (updates.is_public !== undefined) {
      updateData.is_public = updates.is_public;
    }

    if (updates.tags !== undefined) {
      updateData.tags = JSON.stringify(updates.tags);
    }

    const template = await db
      .updateTable('document_templates')
      .set(updateData)
      .where('id', '=', id)
      .returning([
        'id',
        'name',
        'description',
        'type',
        'organization_id',
        'created_by',
        'template_data',
        'usage_count',
        'is_active',
        'is_public',
        'tags',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/templates');
    revalidatePath(`/templates/${id}`);

    return template as DocumentTemplate;
  } catch (error) {
    console.error('Error updating document template:', error);
    throw new Error('Failed to update document template');
  }
}

// Delete document template (soft delete)
export async function deleteDocumentTemplate(id: string): Promise<void> {
  try {
    await db
      .updateTable('document_templates')
      .set({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', id)
      .execute();

    revalidatePath('/templates');
  } catch (error) {
    console.error('Error deleting document template:', error);
    throw new Error('Failed to delete document template');
  }
}

// Permanently delete document template
export async function permanentlyDeleteDocumentTemplate(id: string): Promise<void> {
  try {
    await db
      .deleteFrom('document_templates')
      .where('id', '=', id)
      .execute();

    revalidatePath('/templates');
  } catch (error) {
    console.error('Error permanently deleting document template:', error);
    throw new Error('Failed to permanently delete document template');
  }
}

// Increment template usage count
export async function incrementTemplateUsage(id: string): Promise<void> {
  try {
    await db
      .updateTable('document_templates')
      .set((eb) => ({
        usage_count: eb('usage_count', '+', 1),
        updated_at: new Date().toISOString(),
      }))
      .where('id', '=', id)
      .execute();

    revalidatePath('/templates');
  } catch (error) {
    console.error('Error incrementing template usage:', error);
    throw new Error('Failed to increment template usage');
  }
}

// Duplicate document template
export async function duplicateDocumentTemplate(
  id: string,
  options: {
    name: string;
    created_by: string;
    organization_id?: string;
  }
): Promise<DocumentTemplate> {
  try {
    // Get the original template
    const originalTemplate = await getDocumentTemplateById(id);
    if (!originalTemplate) {
      throw new Error('Template not found');
    }

    // Create a new template with the same data
    const duplicatedTemplate = await db
      .insertInto('document_templates')
      .values({
        name: options.name,
        description: originalTemplate.description,
        type: originalTemplate.type,
        organization_id: options.organization_id || null,
        created_by: options.created_by,
        template_data: JSON.stringify(originalTemplate.template_data),
        usage_count: 0,
        is_active: true,
        is_public: false, // Duplicated templates are private by default
        tags: JSON.stringify(originalTemplate.tags),
      })
      .returning([
        'id',
        'name',
        'description',
        'type',
        'organization_id',
        'created_by',
        'template_data',
        'usage_count',
        'is_active',
        'is_public',
        'tags',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/templates');

    return duplicatedTemplate as DocumentTemplate;
  } catch (error) {
    console.error('Error duplicating document template:', error);
    throw new Error('Failed to duplicate document template');
  }
}

// Get document templates by organization
export async function getOrganizationDocumentTemplates(
  organizationId: string,
  options?: {
    type?: DocumentType;
    search?: string;
    limit?: number;
    offset?: number;
  }
): Promise<{
  templates: DocumentTemplate[];
  total: number;
}> {
  try {
    let query = db
      .selectFrom('document_templates')
      .selectAll()
      .where('organization_id', '=', organizationId)
      .where('is_active', '=', true);

    if (options?.type) {
      query = query.where('type', '=', options.type);
    }

    if (options?.search) {
      query = query.where((eb) =>
        eb.or([
          eb('name', 'ilike', `%${options.search}%`),
          eb('description', 'ilike', `%${options.search}%`),
        ])
      );
    }

    // Get total count
    const totalQuery = query.select(db.fn.count('id').as('count'));
    const totalResult = await totalQuery.executeTakeFirstOrThrow();
    const total = Number(totalResult.count);

    // Get paginated results
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const templates = await query
      .orderBy('created_at', 'desc')
      .execute();

    return {
      templates: templates as DocumentTemplate[],
      total,
    };
  } catch (error) {
    console.error('Error fetching organization document templates:', error);
    throw new Error('Failed to fetch organization document templates');
  }
}

// Get document templates by user
export async function getUserDocumentTemplates(
  userId: string,
  options?: {
    organization_id?: string;
    type?: DocumentType;
    search?: string;
    limit?: number;
    offset?: number;
  }
): Promise<{
  templates: DocumentTemplate[];
  total: number;
}> {
  try {
    let query = db
      .selectFrom('document_templates')
      .selectAll()
      .where('created_by', '=', userId)
      .where('is_active', '=', true);

    if (options?.organization_id) {
      query = query.where('organization_id', '=', options.organization_id);
    }

    if (options?.type) {
      query = query.where('type', '=', options.type);
    }

    if (options?.search) {
      query = query.where((eb) =>
        eb.or([
          eb('name', 'ilike', `%${options.search}%`),
          eb('description', 'ilike', `%${options.search}%`),
        ])
      );
    }

    // Get total count
    const totalQuery = query.select(db.fn.count('id').as('count'));
    const totalResult = await totalQuery.executeTakeFirstOrThrow();
    const total = Number(totalResult.count);

    // Get paginated results
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const templates = await query
      .orderBy('created_at', 'desc')
      .execute();

    return {
      templates: templates as DocumentTemplate[],
      total,
    };
  } catch (error) {
    console.error('Error fetching user document templates:', error);
    throw new Error('Failed to fetch user document templates');
  }
}

// Get document template statistics
export async function getDocumentTemplateStats(
  organizationId?: string
): Promise<{
  total: number;
  by_type: Record<DocumentType, number>;
  public_templates: number;
  private_templates: number;
  most_used: DocumentTemplate | null;
}> {
  try {
    let baseQuery = db.selectFrom('document_templates').where('is_active', '=', true);

    if (organizationId) {
      baseQuery = baseQuery.where('organization_id', '=', organizationId);
    }

    const [total, byType, publicCount, privateCount, mostUsed] = await Promise.all([
      baseQuery.select(db.fn.count('id').as('count')).executeTakeFirstOrThrow(),
      baseQuery
        .select(['type', db.fn.count('id').as('count')])
        .groupBy('type')
        .execute(),
      baseQuery
        .select(db.fn.count('id').as('count'))
        .where('is_public', '=', true)
        .executeTakeFirstOrThrow(),
      baseQuery
        .select(db.fn.count('id').as('count'))
        .where('is_public', '=', false)
        .executeTakeFirstOrThrow(),
      baseQuery
        .selectAll()
        .orderBy('usage_count', 'desc')
        .limit(1)
        .executeTakeFirst(),
    ]);

    const typeStats: Record<string, number> = {};
    byType.forEach((stat: { type: DocumentType; count: string | number | bigint }) => {
      typeStats[stat.type] = Number(stat.count);
    });

    return {
      total: Number(total.count),
      by_type: typeStats as Record<DocumentType, number>,
      public_templates: Number(publicCount.count),
      private_templates: Number(privateCount.count),
      most_used: mostUsed as DocumentTemplate | null,
    };
  } catch (error) {
    console.error('Error getting document template statistics:', error);
    throw new Error('Failed to get document template statistics');
  }
}

// Search document templates
export async function searchDocumentTemplates(
  searchTerm: string,
  options?: {
    organization_id?: string;
    type?: DocumentType;
    is_public?: boolean;
    limit?: number;
  }
): Promise<DocumentTemplate[]> {
  try {
    let query = db
      .selectFrom('document_templates')
      .selectAll()
      .where('is_active', '=', true)
      .where((eb) =>
        eb.or([
          eb('name', 'ilike', `%${searchTerm}%`),
          eb('description', 'ilike', `%${searchTerm}%`),
          eb(sql`tags::text`, 'like', `%${searchTerm}%`),
        ])
      );

    if (options?.organization_id) {
      query = query.where((eb) =>
        eb.or([
          eb('organization_id', '=', options.organization_id!),
          eb('is_public', '=', true),
        ])
      );
    }

    if (options?.type) {
      query = query.where('type', '=', options.type);
    }

    if (options?.is_public !== undefined) {
      query = query.where('is_public', '=', options.is_public);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const templates = await query
      .orderBy('usage_count', 'desc')
      .orderBy('created_at', 'desc')
      .execute();

    return templates as DocumentTemplate[];
  } catch (error) {
    console.error('Error searching document templates:', error);
    throw new Error('Failed to search document templates');
  }
}

// Bulk delete document templates
export async function bulkDeleteDocumentTemplates(ids: string[]): Promise<number> {
  try {
    const result = await db
      .updateTable('document_templates')
      .set({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .where('id', 'in', ids)
      .execute();

    revalidatePath('/templates');

    return Number(result[0]?.numUpdatedRows || 0);
  } catch (error) {
    console.error('Error bulk deleting document templates:', error);
    throw new Error('Failed to bulk delete document templates');
  }
}

// Get template usage analytics
export async function getTemplateUsageAnalytics(
  templateId: string,
  days: number = 30
): Promise<{
  total_usage: number;
  recent_usage: number;
  usage_trend: Array<{ date: string; count: number }>;
}> {
  try {
    const template = await getDocumentTemplateById(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // For now, return basic usage data
    // In a real implementation, you'd track template usage in a separate table
    return {
      total_usage: template.usage_count,
      recent_usage: 0, // Would need to query usage tracking table
      usage_trend: [], // Would need to query usage tracking table
    };
  } catch (error) {
    console.error('Error getting template usage analytics:', error);
    throw new Error('Failed to get template usage analytics');
  }
}
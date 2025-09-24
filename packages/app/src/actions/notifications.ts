'use server';

import db from '@/db';
import { Notification } from '@/db/types';
import { NotificationType, NotificationStatus } from '@/db/enums';
import { revalidatePath } from 'next/cache';

// Create a new notification
export async function createNotification(options: {
  user_id: string;
  organization_id?: string;
  document_id?: string;
  signature_id?: string;
  type: NotificationType;
  title: string;
  message: string;
  channels?: {
    email?: boolean;
    in_app?: boolean;
    webhook?: boolean;
    sms?: boolean;
  };
  metadata?: {
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    action_url?: string;
    action_text?: string;
    expires_at?: string;
  };
}): Promise<Notification> {
  try {
    const notification = await db
      .insertInto('notifications')
      .values({
        user_id: options.user_id,
        organization_id: options.organization_id || null,
        document_id: options.document_id || null,
        signature_id: options.signature_id || null,
        type: options.type,
        status: NotificationStatus.UNREAD,
        title: options.title,
        message: options.message,
        sent_at: null,
        read_at: null,
        archived_at: null,
        channels: JSON.stringify(options.channels || { in_app: true }),
        metadata: JSON.stringify(options.metadata || {}),
      })
      .returning([
        'id',
        'user_id',
        'organization_id',
        'document_id',
        'signature_id',
        'type',
        'status',
        'title',
        'message',
        'sent_at',
        'read_at',
        'archived_at',
        'channels',
        'metadata',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/notifications');
    revalidatePath('/dashboard');

    return notification as Notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw new Error('Failed to create notification');
  }
}

// Get notification by ID
export async function getNotificationById(id: string): Promise<Notification | null> {
  try {
    const notification = await db
      .selectFrom('notifications')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    return notification as Notification | null;
  } catch (error) {
    console.error('Error fetching notification:', error);
    throw new Error('Failed to fetch notification');
  }
}

// Get notifications for a user with pagination and filters
export async function getUserNotifications(
  userId: string,
  options?: {
    status?: NotificationStatus;
    type?: NotificationType;
    organizationId?: string;
    documentId?: string;
    signatureId?: string;
    includeArchived?: boolean;
    limit?: number;
    offset?: number;
  }
): Promise<{
  notifications: Notification[];
  total: number;
}> {
  try {
    let query = db
      .selectFrom('notifications')
      .selectAll()
      .where('user_id', '=', userId);

    if (options?.status) {
      query = query.where('status', '=', options.status);
    }

    if (options?.type) {
      query = query.where('type', '=', options.type);
    }

    if (options?.organizationId) {
      query = query.where('organization_id', '=', options.organizationId);
    }

    if (options?.documentId) {
      query = query.where('document_id', '=', options.documentId);
    }

    if (options?.signatureId) {
      query = query.where('signature_id', '=', options.signatureId);
    }

    if (!options?.includeArchived) {
      query = query.where('status', '!=', NotificationStatus.ARCHIVED);
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

    const notifications = await query
      .orderBy('created_at', 'desc')
      .execute();

    return {
      notifications: notifications as Notification[],
      total,
    };
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw new Error('Failed to fetch user notifications');
  }
}

// Get notifications for an organization
export async function getOrganizationNotifications(
  organizationId: string,
  options?: {
    status?: NotificationStatus;
    type?: NotificationType;
    userId?: string;
    limit?: number;
    offset?: number;
  }
): Promise<{
  notifications: Notification[];
  total: number;
}> {
  try {
    let query = db
      .selectFrom('notifications')
      .selectAll()
      .where('organization_id', '=', organizationId);

    if (options?.status) {
      query = query.where('status', '=', options.status);
    }

    if (options?.type) {
      query = query.where('type', '=', options.type);
    }

    if (options?.userId) {
      query = query.where('user_id', '=', options.userId);
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

    const notifications = await query
      .orderBy('created_at', 'desc')
      .execute();

    return {
      notifications: notifications as Notification[],
      total,
    };
  } catch (error) {
    console.error('Error fetching organization notifications:', error);
    throw new Error('Failed to fetch organization notifications');
  }
}

// Mark notification as read
export async function markNotificationAsRead(id: string): Promise<Notification> {
  try {
    const notification = await db
      .updateTable('notifications')
      .set({
        status: NotificationStatus.READ,
        read_at: new Date(),
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', id)
      .returning([
        'id',
        'user_id',
        'organization_id',
        'document_id',
        'signature_id',
        'type',
        'status',
        'title',
        'message',
        'sent_at',
        'read_at',
        'archived_at',
        'channels',
        'metadata',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/notifications');
    revalidatePath('/dashboard');

    return notification as Notification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw new Error('Failed to mark notification as read');
  }
}

// Mark all notifications as read for a user
export async function markAllNotificationsAsRead(userId: string): Promise<number> {
  try {
    const result = await db
      .updateTable('notifications')
      .set({
        status: NotificationStatus.READ,
        read_at: new Date(),
        updated_at: new Date().toISOString(),
      })
      .where('user_id', '=', userId)
      .where('status', '=', NotificationStatus.UNREAD)
      .execute();

    revalidatePath('/notifications');
    revalidatePath('/dashboard');

    return Number(result[0]?.numUpdatedRows || 0);
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw new Error('Failed to mark all notifications as read');
  }
}

// Archive notification
export async function archiveNotification(id: string): Promise<Notification> {
  try {
    const notification = await db
      .updateTable('notifications')
      .set({
        status: NotificationStatus.ARCHIVED,
        archived_at: new Date(),
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', id)
      .returning([
        'id',
        'user_id',
        'organization_id',
        'document_id',
        'signature_id',
        'type',
        'status',
        'title',
        'message',
        'sent_at',
        'read_at',
        'archived_at',
        'channels',
        'metadata',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/notifications');

    return notification as Notification;
  } catch (error) {
    console.error('Error archiving notification:', error);
    throw new Error('Failed to archive notification');
  }
}

// Delete notification
export async function deleteNotification(id: string): Promise<void> {
  try {
    await db
      .deleteFrom('notifications')
      .where('id', '=', id)
      .execute();

    revalidatePath('/notifications');
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw new Error('Failed to delete notification');
  }
}

// Update notification
export async function updateNotification(
  id: string,
  updates: {
    title?: string;
    message?: string;
    status?: NotificationStatus;
    channels?: {
      email?: boolean;
      in_app?: boolean;
      webhook?: boolean;
      sms?: boolean;
    };
    metadata?: {
      priority?: 'low' | 'medium' | 'high' | 'urgent';
      action_url?: string;
      action_text?: string;
      expires_at?: string;
    };
  }
): Promise<Notification> {
  try {
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) {
      updateData.title = updates.title;
    }

    if (updates.message !== undefined) {
      updateData.message = updates.message;
    }

    if (updates.status !== undefined) {
      updateData.status = updates.status;
      if (updates.status === NotificationStatus.READ && !updateData.read_at) {
        updateData.read_at = new Date();
      }
      if (updates.status === NotificationStatus.ARCHIVED && !updateData.archived_at) {
        updateData.archived_at = new Date();
      }
    }

    if (updates.channels !== undefined) {
      updateData.channels = JSON.stringify(updates.channels);
    }

    if (updates.metadata !== undefined) {
      updateData.metadata = JSON.stringify(updates.metadata);
    }

    const notification = await db
      .updateTable('notifications')
      .set(updateData)
      .where('id', '=', id)
      .returning([
        'id',
        'user_id',
        'organization_id',
        'document_id',
        'signature_id',
        'type',
        'status',
        'title',
        'message',
        'sent_at',
        'read_at',
        'archived_at',
        'channels',
        'metadata',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/notifications');

    return notification as Notification;
  } catch (error) {
    console.error('Error updating notification:', error);
    throw new Error('Failed to update notification');
  }
}

// Get unread notification count for a user
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const result = await db
      .selectFrom('notifications')
      .select(db.fn.count('id').as('count'))
      .where('user_id', '=', userId)
      .where('status', '=', NotificationStatus.UNREAD)
      .executeTakeFirstOrThrow();

    return Number(result.count);
  } catch (error) {
    console.error('Error getting unread notification count:', error);
    return 0;
  }
}

// Get notification statistics
export async function getNotificationStats(
  userId?: string,
  organizationId?: string
): Promise<{
  total: number;
  unread: number;
  read: number;
  archived: number;
  by_type: Record<NotificationType, number>;
}> {
  try {
    let baseQuery = db.selectFrom('notifications');

    if (userId) {
      baseQuery = baseQuery.where('user_id', '=', userId);
    }

    if (organizationId) {
      baseQuery = baseQuery.where('organization_id', '=', organizationId);
    }

    const [total, unread, read, archived, byType] = await Promise.all([
      baseQuery.select(db.fn.count('id').as('count')).executeTakeFirstOrThrow(),
      baseQuery
        .select(db.fn.count('id').as('count'))
        .where('status', '=', NotificationStatus.UNREAD)
        .executeTakeFirstOrThrow(),
      baseQuery
        .select(db.fn.count('id').as('count'))
        .where('status', '=', NotificationStatus.READ)
        .executeTakeFirstOrThrow(),
      baseQuery
        .select(db.fn.count('id').as('count'))
        .where('status', '=', NotificationStatus.ARCHIVED)
        .executeTakeFirstOrThrow(),
      baseQuery
        .select(['type', db.fn.count('id').as('count')])
        .groupBy('type')
        .execute(),
    ]);

    const typeStats: Record<NotificationType, number> = {} as Record<NotificationType, number>;
    
    byType.forEach((stat: { type: NotificationType; count: string | number | bigint }) => {
      typeStats[stat.type] = Number(BigInt(stat.count));
    });

    return {
      total: Number(total.count),
      unread: Number(unread.count),
      read: Number(read.count),
      archived: Number(archived.count),
      by_type: typeStats as Record<NotificationType, number>,
    };
  } catch (error) {
    console.error('Error getting notification statistics:', error);
    throw new Error('Failed to get notification statistics');
  }
}

// Bulk create notifications
export async function bulkCreateNotifications(
  notifications: Array<{
    user_id: string;
    organization_id?: string;
    document_id?: string;
    signature_id?: string;
    type: NotificationType;
    title: string;
    message: string;
    channels?: {
      email?: boolean;
      in_app?: boolean;
      webhook?: boolean;
      sms?: boolean;
    };
    metadata?: {
      priority?: 'low' | 'medium' | 'high' | 'urgent';
      action_url?: string;
      action_text?: string;
      expires_at?: string;
    };
  }>
): Promise<Notification[]> {
  try {
    const values = notifications.map(notification => ({
      user_id: notification.user_id,
      organization_id: notification.organization_id || null,
      document_id: notification.document_id || null,
      signature_id: notification.signature_id || null,
      type: notification.type,
      status: 'unread' as NotificationStatus,
      title: notification.title,
      message: notification.message,
      sent_at: null,
      read_at: null,
      archived_at: null,
      channels: JSON.stringify(notification.channels || { in_app: true }),
      metadata: JSON.stringify(notification.metadata || {}),
    }));

    const createdNotifications = await db
      .insertInto('notifications')
      .values(values)
      .returning([
        'id',
        'user_id',
        'organization_id',
        'document_id',
        'signature_id',
        'type',
        'status',
        'title',
        'message',
        'sent_at',
        'read_at',
        'archived_at',
        'channels',
        'metadata',
        'created_at',
        'updated_at',
      ])
      .execute();

    revalidatePath('/notifications');
    revalidatePath('/dashboard');

    return createdNotifications as Notification[];
  } catch (error) {
    console.error('Error bulk creating notifications:', error);
    throw new Error('Failed to bulk create notifications');
  }
}

// Mark notification as sent
export async function markNotificationAsSent(id: string): Promise<Notification> {
  try {
    const notification = await db
      .updateTable('notifications')
      .set({
        sent_at: new Date(),
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', id)
      .returning([
        'id',
        'user_id',
        'organization_id',
        'document_id',
        'signature_id',
        'type',
        'status',
        'title',
        'message',
        'sent_at',
        'read_at',
        'archived_at',
        'channels',
        'metadata',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    return notification as Notification;
  } catch (error) {
    console.error('Error marking notification as sent:', error);
    throw new Error('Failed to mark notification as sent');
  }
}

// Get notifications by document
export async function getNotificationsByDocument(
  documentId: string,
  options?: {
    userId?: string;
    type?: NotificationType;
    status?: NotificationStatus;
    limit?: number;
    offset?: number;
  }
): Promise<Notification[]> {
  try {
    let query = db
      .selectFrom('notifications')
      .selectAll()
      .where('document_id', '=', documentId);

    if (options?.userId) {
      query = query.where('user_id', '=', options.userId);
    }

    if (options?.type) {
      query = query.where('type', '=', options.type);
    }

    if (options?.status) {
      query = query.where('status', '=', options.status);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const notifications = await query
      .orderBy('created_at', 'desc')
      .execute();

    return notifications as Notification[];
  } catch (error) {
    console.error('Error fetching notifications by document:', error);
    throw new Error('Failed to fetch notifications by document');
  }
}

// Clean up old notifications
export async function cleanupOldNotifications(daysOld: number = 90): Promise<number> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await db
      .deleteFrom('notifications')
      .where('created_at', '<', cutoffDate)
      .where('status', 'in', [NotificationStatus.READ, NotificationStatus.ARCHIVED])
      .execute();

    revalidatePath('/notifications');

    return Number(result[0]?.numDeletedRows || 0);
  } catch (error) {
    console.error('Error cleaning up old notifications:', error);
    throw new Error('Failed to cleanup old notifications');
  }
}
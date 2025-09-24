'use server';

import { getDatabase } from '@/db';
import { User, PaginatedResponse, QueryFilters } from '@/db/types';
import { UserRole } from '@/db/enums';
import { revalidatePath } from 'next/cache';

/**
 * Create a new user
 */
export async function createUser(userData: {
  wallet_address: string;
  ens_name?: string | null;
  username?: string | null;
  email?: string | null;
  profile_image_url?: string | null;
  bio?: string | null;
  role: UserRole;
  is_verified?: boolean;
  is_active?: boolean;
  metadata?: {
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
}): Promise<User> {
  try {
    const db = getDatabase();
    
    const insertData = {
      wallet_address: userData.wallet_address,
      ens_name: userData.ens_name || null,
      username: userData.username || null,
      email: userData.email || null,
      profile_image_url: userData.profile_image_url || null,
      bio: userData.bio || null,
      role: userData.role,
      is_verified: userData.is_verified ?? false,
      is_active: userData.is_active ?? true,
      metadata: JSON.stringify(userData.metadata || {})
    };
    
    const user = await db
      .insertInto('users')
      .values(insertData)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/users');
    
    // Parse metadata back to object for return
    return {
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    } as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const db = getDatabase();
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!user) return null;

    return {
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    } as User;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw new Error('Failed to get user');
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const db = getDatabase();
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!user) return null;

    return {
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    } as User;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw new Error('Failed to get user');
  }
}

/**
 * Get user by wallet address
 */
export async function getUserByWallet(walletAddress: string): Promise<User | null> {
  try {
    const db = getDatabase();
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('wallet_address', '=', walletAddress)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!user) return null;

    return {
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    } as User;
  } catch (error) {
    console.error('Error getting user by wallet:', error);
    throw new Error('Failed to get user');
  }
}

/**
 * Get paginated users with filters
 */
export async function getUsers(filters: QueryFilters<User> = {}): Promise<PaginatedResponse<User>> {
  try {
    const db = getDatabase();
    const {
      page = 1,
      limit = 10,
      sort_by = 'created_at',
      sort_order = 'desc',
      search,
      filters: additionalFilters = {}
    } = filters;

    const offset = (page - 1) * limit;

    let query = db
      .selectFrom('users')
      .selectAll()
      .where('is_active', '=', true);

    // Apply search
    if (search) {
      query = query.where((eb) =>
        eb.or([
          eb('username', 'ilike', `%${search}%`),
          eb('email', 'ilike', `%${search}%`),
          eb('ens_name', 'ilike', `%${search}%`)
        ])
      );
    }

    // Apply additional filters
    Object.entries(additionalFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          query = query.where(key as keyof User, 'in', value as string[]);
        } else {
          query = query.where(key as keyof User, '=', value as string);
        }
      }
    });

    // Get total count
    const totalResult = await query
      .select((eb) => eb.fn.countAll().as('total'))
      .executeTakeFirst();
    
    const total = Number(totalResult?.total || 0);

    // Get paginated results
    const users = await query
      .orderBy(sort_by as keyof User, sort_order)
      .limit(limit)
      .offset(offset)
      .execute();

    const total_pages = Math.ceil(total / limit);

    // Parse metadata for all users
    const parsedUsers = users.map(user => ({
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    })) as User[];

    return {
      data: parsedUsers,
      pagination: {
        page,
        limit,
        total,
        total_pages,
        has_next: page < total_pages,
        has_prev: page > 1
      }
    };
  } catch (error) {
    console.error('Error getting users:', error);
    throw new Error('Failed to get users');
  }
}

/**
 * Update user
 */
export async function updateUser(id: string, updates: {
  ens_name?: string | null;
  username?: string | null;
  email?: string | null;
  profile_image_url?: string | null;
  bio?: string | null;
  role?: UserRole;
  is_verified?: boolean;
  is_active?: boolean;
  last_login_at?: Date | null;
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
    kyc_data?: {
      verified?: boolean;
      provider?: string;
      verification_date?: string;
    };
  };
}): Promise<User> {
  try {
    const db = getDatabase();
    
    const updateData = { ...updates } as Record<string, unknown>;
    if (updates.metadata) {
      updateData.metadata = JSON.stringify(updates.metadata);
    }
    
    const user = await db
      .updateTable('users')
      .set(updateData)
      .where('id', '=', id)
      .where('is_active', '=', true)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
    
    return {
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    } as User;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  id: string, 
  profileData: {
    username?: string;
    email?: string;
    bio?: string;
    profile_image_url?: string;
    role?: UserRole;
    metadata?: {
      organization?: string | undefined;
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
): Promise<User> {
  try {
    const db = getDatabase();
    
    const updateData = { ...profileData } as Record<string, unknown>;
    if (profileData.metadata) {
      updateData.metadata = JSON.stringify(profileData.metadata);
    }
    
    const user = await db
      .updateTable('users')
      .set(updateData)
      .where('id', '=', id)
      .where('is_active', '=', true)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
    
    return {
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    } as User;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }
}

/**
 * Update user role
 */
export async function updateUserRole(id: string, role: UserRole): Promise<User> {
  try {
    const db = getDatabase();
    const user = await db
      .updateTable('users')
      .set({ role })
      .where('id', '=', id)
      .where('is_active', '=', true)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
    
    return {
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    } as User;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw new Error('Failed to update user role');
  }
}

/**
 * Verify user email
 */
export async function verifyUserEmail(id: string): Promise<User> {
  try {
    const db = getDatabase();
    const user = await db
      .updateTable('users')
      .set({ is_verified: true })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
    
    return {
      ...user,
      metadata: typeof user.metadata === 'string' ? JSON.parse(user.metadata) : user.metadata
    } as User;
  } catch (error) {
    console.error('Error verifying user email:', error);
    throw new Error('Failed to verify user email');
  }
}

/**
 * Update user 2FA settings
 */
export async function updateUser2FA(id: string, enabled: boolean): Promise<User> {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedMetadata = {
      ...user.metadata,
      preferences: {
        ...user.metadata?.preferences,
        two_factor_enabled: enabled
      }
    };

    const db = getDatabase();
    const updatedUser = await db
      .updateTable('users')
      .set({ metadata: JSON.stringify(updatedMetadata) })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
    
    return {
      ...updatedUser,
      metadata: typeof updatedUser.metadata === 'string' ? JSON.parse(updatedUser.metadata) : updatedUser.metadata
    } as User;
  } catch (error) {
    console.error('Error updating user 2FA:', error);
    throw new Error('Failed to update user 2FA settings');
  }
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  id: string, 
  preferences: { notifications?: boolean; theme?: string; language?: string }
): Promise<User> {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedMetadata = {
      ...user.metadata,
      preferences: {
        ...user.metadata?.preferences,
        ...preferences
      }
    };

    const db = getDatabase();
    const updatedUser = await db
      .updateTable('users')
      .set({ metadata: JSON.stringify(updatedMetadata) })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
    
    return {
      ...updatedUser,
      metadata: typeof updatedUser.metadata === 'string' ? JSON.parse(updatedUser.metadata) : updatedUser.metadata
    } as User;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw new Error('Failed to update user preferences');
  }
}

/**
 * Update last login timestamp
 */
export async function updateLastLogin(id: string): Promise<void> {
  try {
    const db = getDatabase();
    await db
      .updateTable('users')
      .set({ last_login_at: new Date() })
      .where('id', '=', id)
      .execute();

    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
  } catch (error) {
    console.error('Error updating last login:', error);
    throw new Error('Failed to update last login');
  }
}

/**
 * Soft delete user (deactivate)
 */
export async function deleteUser(id: string): Promise<void> {
  try {
    const db = getDatabase();
    await db
      .updateTable('users')
      .set({ is_active: false })
      .where('id', '=', id)
      .execute();

    revalidatePath('/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}
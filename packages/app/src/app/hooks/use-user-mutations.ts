'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createUser,
  getUserByWallet,
  updateUserProfile,
  getUserById,
  updateUserPreferences
} from '@/actions/users'
import type { UserRole } from '@/db/enums'
import { useAccount } from 'wagmi'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('User profile created successfully!')
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error.message}`)
      console.error('Create user error:', error)
    }
  })
}

export function useGetUserByWallet(walletAddress?: string) {
  const { address: connectedAddress } = useAccount()
  const address = walletAddress || connectedAddress

  return useQuery({
    queryKey: ['user', 'wallet', address],
    queryFn: () => address ? getUserByWallet(address) : null,
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useGetUserById(userId?: string) {
  return useQuery({
    queryKey: ['user', 'id', userId],
    queryFn: () => userId ? getUserById(userId) : null,
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, profileData }: { id: string; profileData: Parameters<typeof updateUserProfile>[1] }) =>
      updateUserProfile(id, profileData),
    onSuccess: (data, variables) => {
      toast.success('Profile updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['user', 'id', variables.id] })
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`)
      console.error('Update profile error:', error)
    }
  })
}

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, preferences }: { id: string; preferences: Parameters<typeof updateUserPreferences>[1] }) =>
      updateUserPreferences(id, preferences),
    onSuccess: (data, variables) => {
      toast.success('Preferences updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['user', 'id', variables.id] })
    },
    onError: (error) => {
      toast.error(`Failed to update preferences: ${error.message}`)
      console.error('Update preferences error:', error)
    }
  })
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      updateUserProfile(id, { role }),
    onSuccess: (data, variables) => {
      toast.success('User role updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['user', 'id', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      toast.error(`Failed to update user role: ${error.message}`)
      console.error('Update user role error:', error)
    }
  })
}

export function useCurrentUser() {
  const { address } = useAccount()
  const { data: user, isLoading, error } = useGetUserByWallet(address)

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!address,
    hasProfile: !!user
  }
}
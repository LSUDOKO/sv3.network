'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createOrganization,
  getOrganizationById,
  getOrganizationBySlug,
  getOrganizations,
  updateOrganization,
  deleteOrganization,
  verifyOrganization,
  unverifyOrganization,
  getOrganizationStats
} from '@/actions/organizations'
import { CreateOrganizationRequest } from '@/db/types'
import { useAccount } from 'wagmi'

export function useCreateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, ownerId }: { data: CreateOrganizationRequest; ownerId: string }) =>
      createOrganization(data, ownerId),
    onSuccess: () => {
      toast.success('Organization created successfully!')
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      queryClient.invalidateQueries({ queryKey: ['user-organizations'] })
    },
    onError: (error) => {
      toast.error(`Failed to create organization: ${error.message}`)
      console.error('Create organization error:', error)
    }
  })
}

export function useGetOrganizationById(id?: string) {
  return useQuery({
    queryKey: ['organization', 'id', id],
    queryFn: () => id ? getOrganizationById(id) : null,
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useGetOrganizationBySlug(slug?: string) {
  return useQuery({
    queryKey: ['organization', 'slug', slug],
    queryFn: () => slug ? getOrganizationBySlug(slug) : null,
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useGetOrganizations(
  page: number = 1,
  limit: number = 10,
  filters: Record<string, unknown> = {}
) {
  return useQuery({
    queryKey: ['organizations', 'list', page, limit, filters],
    queryFn: () => getOrganizations(page, limit, filters),
    // keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      updateOrganization(id, data),
    onSuccess: (data, variables) => {
      toast.success('Organization updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      queryClient.invalidateQueries({ queryKey: ['organization', 'id', variables.id] })
    },
    onError: (error) => {
      toast.error(`Failed to update organization: ${error.message}`)
      console.error('Update organization error:', error)
    }
  })
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteOrganization,
    onSuccess: () => {
      toast.success('Organization deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      queryClient.invalidateQueries({ queryKey: ['user-organizations'] })
    },
    onError: (error) => {
      toast.error(`Failed to delete organization: ${error.message}`)
      console.error('Delete organization error:', error)
    }
  })
}

export function useVerifyOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: verifyOrganization,
    onSuccess: (_, variables) => {
      toast.success('Organization verified successfully!')
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      queryClient.invalidateQueries({ queryKey: ['organization', 'id', variables] })
    },
    onError: (error) => {
      toast.error(`Failed to verify organization: ${error.message}`)
      console.error('Verify organization error:', error)
    }
  })
}

export function useUnverifyOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unverifyOrganization,
    onSuccess: (_, variables) => {
      toast.success('Organization unverified successfully!')
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      queryClient.invalidateQueries({ queryKey: ['organization', 'id', variables] })
    },
    onError: (error) => {
      toast.error(`Failed to unverify organization: ${error.message}`)
      console.error('Unverify organization error:', error)
    }
  })
}

export function useGetOrganizationStats(type?: string, status?: string) {
  return useQuery({
    queryKey: ['organizations', 'stats', type, status],
    queryFn: () => getOrganizationStats(type, status),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useUserOrganizations(ownerId?: string) {
  const { address } = useAccount()
  const owner = ownerId || address

  return useQuery({
    queryKey: ['user-organizations', owner],
    queryFn: async () => {
      if (!owner) return []
      // Get all organizations and filter by owner_id
      const response = await getOrganizations(1, 50, { filters: {
        owner_id: owner,
      } })
      return response.data
    },
    enabled: !!owner,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
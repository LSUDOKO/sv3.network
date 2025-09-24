'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createDocument,
  getDocumentById,
  getDocuments,
  updateDocument,
  deleteDocument,
  getDocumentsByOwner,
  getDocumentsByOrganization,
  updateDocumentStatus,
  getDocumentStats,
  searchDocumentsByTags
} from '@/actions/documents'
import {
  CreateDocumentRequest,
  UpdateDocumentRequest,
} from '@/db/types'
import type { DocumentStatus } from '@/db/enums'
import { useAccount } from 'wagmi'

export function useCreateDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, ownerId }: { data: CreateDocumentRequest; ownerId: string }) =>
      createDocument(data, ownerId),
    onSuccess: () => {
      toast.success('Document created successfully!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['user-documents'] })
      queryClient.invalidateQueries({ queryKey: ['organization-documents'] })
    },
    onError: (error) => {
      toast.error(`Failed to create document: ${error.message}`)
      console.error('Create document error:', error)
    }
  })
}

export function useGetDocumentById(id?: string) {
  return useQuery({
    queryKey: ['document', 'id', id],
    queryFn: () => id ? getDocumentById(id) : null,
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useGetDocuments(
  page: number = 1,
  limit: number = 10,
  filters: Record<string, unknown> = {}
) {
  return useQuery({
    queryKey: ['documents', 'list', page, limit, filters],
    queryFn: () => getDocuments(page, limit, filters),
    // keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useUpdateDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDocumentRequest }) =>
      updateDocument(id, data),
    onSuccess: (data, variables) => {
      toast.success('Document updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['document', 'id', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['user-documents'] })
      queryClient.invalidateQueries({ queryKey: ['organization-documents'] })
    },
    onError: (error) => {
      toast.error(`Failed to update document: ${error.message}`)
      console.error('Update document error:', error)
    }
  })
}

export function useDeleteDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      toast.success('Document deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['user-documents'] })
      queryClient.invalidateQueries({ queryKey: ['organization-documents'] })
    },
    onError: (error) => {
      toast.error(`Failed to delete document: ${error.message}`)
      console.error('Delete document error:', error)
    }
  })
}

export function useUpdateDocumentStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: DocumentStatus }) =>
      updateDocumentStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success('Document status updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['document', 'id', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['user-documents'] })
      queryClient.invalidateQueries({ queryKey: ['organization-documents'] })
    },
    onError: (error) => {
      toast.error(`Failed to update document status: ${error.message}`)
      console.error('Update document status error:', error)
    }
  })
}

export function useGetDocumentsByOwner(
  ownerId?: string,
  page: number = 1,
  limit: number = 10
) {
  const { address: connectedAddress } = useAccount()
  const owner = ownerId || connectedAddress

  return useQuery({
    queryKey: ['user-documents', owner, page, limit],
    queryFn: () => owner ? getDocumentsByOwner(owner, page, limit) : null,
    enabled: !!owner,
    // keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useGetDocumentsByOrganization(
  organizationId?: string,
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: ['organization-documents', organizationId, page, limit],
    queryFn: () => organizationId ? getDocumentsByOrganization(organizationId, page, limit) : null,
    enabled: !!organizationId,
    // keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useGetDocumentStats(organizationId?: string) {
  return useQuery({
    queryKey: ['documents', 'stats', organizationId],
    queryFn: () => getDocumentStats(organizationId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useSearchDocumentsByTags(
  tags: string[] = [],
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: ['documents', 'search', 'tags', tags, page, limit],
    queryFn: () => tags.length > 0 ? searchDocumentsByTags(tags, page, limit) : null,
    enabled: tags.length > 0,
    // keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useUserDocuments(ownerId?: string, page: number = 1, limit: number = 10) {
  const { data: userDocuments, ...rest } = useGetDocumentsByOwner(ownerId, page, limit)

  return {
    documents: userDocuments?.data || [],
    pagination: userDocuments?.pagination,
    ...rest
  }
}

export function useRecentDocuments(ownerId?: string, limit: number = 5) {
  const { data: recentDocuments } = useGetDocumentsByOwner(ownerId, 1, limit)

  return {
    documents: recentDocuments?.data || [],
    isLoading: recentDocuments === undefined
  }
}
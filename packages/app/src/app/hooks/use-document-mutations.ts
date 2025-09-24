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
  searchDocumentsByTags,
} from '@/actions/documents'
import { getOrganizationById } from '@/actions/organizations'
import { CreateDocumentRequest, UpdateDocumentRequest } from '@/db/types'
import type { DocumentStatus } from '@/db/enums'
import { useAccount } from 'wagmi'
import {
  useCreateDocumentContract,
  useUpdateDocument as useUpdateDocumentContract,
  useDeleteDocument as useDeleteDocumentContract,
  useTransactionReceipt,
} from '@/lib/client-contract-actions'

export function useCreateDocument() {
  const queryClient = useQueryClient()
  const { address } = useAccount()
  const { createDocumentContract } = useCreateDocumentContract()

  return useMutation({
    mutationFn: async ({
      data,
      file,
      ownerId,
    }: {
      data: CreateDocumentRequest
      file: File | null
      ownerId: string
    }) => {
      try {
        // Upload file to IPFS first
        let ipfsResult: { ipfsHash: string; ipfsUrl?: string } | null = null
        if (file) {
          const formData = new FormData()
          formData.append('file', file)

          const response = await fetch('/api/ipfs/upload', {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            throw new Error('Failed to upload file to IPFS')
          }

          ipfsResult = await response.json()

          // Update file data with IPFS information
          data.file_data.storage_path = ipfsResult!.ipfsHash
          data.file_data.ipfs_url = ipfsResult!.ipfsUrl ?? ''
        }

        // Upload metadata JSON to IPFS (separate CID) so contract receives valid IPFS CIDs
        let metadataUpload: { metadataHash: string; metadataUrl?: string } | null = null
        try {
          const metadataPayload = {
            ...(data.metadata || {}),
            file_name: file?.name,
            original_file_size: file?.size,
            mime_type: file?.type,
            file_hash: ipfsResult?.ipfsHash,
          }

          const metadataResponse = await fetch('/api/documents/metadata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(metadataPayload),
          })

          if (metadataResponse.ok) {
            metadataUpload = await metadataResponse.json()
          } else {
            console.warn('Failed to upload metadata JSON to IPFS, skipping on-chain creation')
          }
        } catch (e) {
          console.warn('Error uploading metadata JSON to IPFS:', e)
        }

        // First create document in database
        await createDocument(data, ownerId)

        // If we have an organization ID and wallet address, create on-chain document
        if (data.organization_id && address) {
          try {
            // Get organization details to check if it has a blockchain ID
            const organization = await getOrganizationById(data.organization_id)

            if (!organization) {
              console.warn('Organization not found, skipping on-chain creation')
              return { ipfsUrl: ipfsResult?.ipfsUrl }
            }

            // For now, we'll use a simple numeric ID based on the organization's creation order
            // In a production system, you'd want to store the blockchain organization ID in the database
            // or have a proper mapping between database UUIDs and blockchain IDs
            const blockchainOrgId = BigInt(parseInt(organization.id.replace(/-/g, ''), 16) % 1000000)

            // Require valid IPFS CIDs for on-chain creation
            if (!ipfsResult?.ipfsHash || !metadataUpload?.metadataHash) {
              console.warn('Missing IPFS CIDs for content or metadata. Skipping on-chain creation.')
              return { ipfsUrl: ipfsResult?.ipfsUrl }
            }

            // Use IPFS CID strings directly (no hex encoding)
            const contentHash = ipfsResult.ipfsHash
            const metadataHash = metadataUpload.metadataHash

            // Create on-chain document - this will prompt user to sign in their wallet
            const txHash = await createDocumentContract(blockchainOrgId, data.title, contentHash, metadataHash)

            return {
              txHash,
              needsContractConfirmation: true,
              ipfsUrl: ipfsResult?.ipfsUrl,
            }
          } catch (contractError) {
            console.error('Contract creation failed, but database record created:', contractError)
            // Check if it's a user rejection error
            if (contractError instanceof Error && contractError.message.includes('rejected')) {
              toast.error('Transaction rejected by user. Document was uploaded to IPFS but not stored on-chain.')
            } else {
              toast.warning('Document uploaded to IPFS, but blockchain storage failed. You can try again later.')
            }
            return {
              ipfsUrl: ipfsResult?.ipfsUrl,
            }
          }
        }

        return {
          ipfsUrl: ipfsResult?.ipfsUrl,
        }
      } catch (error) {
        console.error('Create document error:', error)
        throw error
      }
    },
    onSuccess: (data: { txHash?: string; needsContractConfirmation?: boolean; ipfsUrl?: string }) => {
      if (data?.txHash) {
        toast.success('Document uploaded to IPFS and created successfully! Contract transaction submitted.')
      } else {
        toast.success('Document uploaded to IPFS and created successfully!')
      }
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['user-documents'] })
      queryClient.invalidateQueries({ queryKey: ['organization-documents'] })
    },
    onError: (error) => {
      toast.error(`Failed to create document: ${error.message}`)
      console.error('Create document error:', error)
    },
    mutationKey: ['create-document'],
  })
}

export function useGetDocumentById(id?: string) {
  return useQuery({
    queryKey: ['document', 'id', id],
    queryFn: () => (id ? getDocumentById(id) : null),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useGetDocuments(page: number = 1, limit: number = 10, filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: ['documents', 'list', page, limit, filters],
    queryFn: () => getDocuments(page, limit, filters),
    // keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useUpdateDocument() {
  const queryClient = useQueryClient()
  const { updateDocument: updateDocumentContract } = useUpdateDocumentContract()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateDocumentRequest }) => {
      try {
        // First update document in database
        const dbDocument = await updateDocument(id, data)

        // Check if the document belongs to an organization
        if (dbDocument?.organization_id) {
          try {
            // Simulate IPFS hash generation (in production, this would be actual IPFS upload)
            // const contentHash = `0x${Buffer.from(data.title || '')
            //   .toString('hex')
            //   .padEnd(64, '0')}`
            // const metadataHash = `0x${Buffer.from(JSON.stringify(data.metadata || {}))
            //   .toString('hex')
            //   .padEnd(64, '0')}`

            // Update on-chain document
            const txHash = await updateDocumentContract(BigInt(id), data.title || '')

            return {
              txHash,
              needsContractConfirmation: true,
            }
          } catch (contractError) {
            console.error('Contract update failed, but database record updated:', contractError)
            toast.warning('Document updated in database, but contract update failed. You can try again later.')
            return {}
          }
        }

        return {}
      } catch (error) {
        console.error('Update document error:', error)
        throw error
      }
    },
    onSuccess: (data: { txHash?: string; needsContractConfirmation?: boolean }, variables) => {
      if (data?.txHash) {
        toast.success('Document updated successfully! Contract transaction submitted.')
      } else {
        toast.success('Document updated successfully!')
      }
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['document', 'id', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['user-documents'] })
      queryClient.invalidateQueries({ queryKey: ['organization-documents'] })
    },
    onError: (error) => {
      toast.error(`Failed to update document: ${error.message}`)
      console.error('Update document error:', error)
    },
    mutationKey: ['update-document'],
  })
}

export function useDeleteDocument() {
  const queryClient = useQueryClient()
  const { deleteDocument: deleteDocumentContract } = useDeleteDocumentContract()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        // First soft delete document in database
        await deleteDocument(id)

        // Try to delete on-chain document
        try {
          const txHash = await deleteDocumentContract(BigInt(id))

          return {
            txHash,
            needsContractConfirmation: true,
          }
        } catch (contractError) {
          console.error('Contract deletion failed, but database record soft deleted:', contractError)
          toast.warning(
            'Document marked as deleted in database, but contract deletion failed. You can try again later.'
          )
          return {}
        }
      } catch (error) {
        console.error('Delete document error:', error)
        throw error
      }
    },
    onSuccess: (data: { txHash?: string; needsContractConfirmation?: boolean }) => {
      if (data?.txHash) {
        toast.success('Document deleted successfully! Contract transaction submitted.')
      } else {
        toast.success('Document deleted successfully!')
      }
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['user-documents'] })
      queryClient.invalidateQueries({ queryKey: ['organization-documents'] })
    },
    onError: (error) => {
      toast.error(`Failed to delete document: ${error.message}`)
      console.error('Delete document error', error)
    },
    mutationKey: ['delete-document'],
  })
}

export function useUpdateDocumentStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: DocumentStatus }) => updateDocumentStatus(id, status),
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
    },
  })
}

export function useGetDocumentsByOwner(ownerId?: string, page: number = 1, limit: number = 10) {
  const { address: connectedAddress } = useAccount()
  const owner = ownerId || connectedAddress

  return useQuery({
    queryKey: ['user-documents', owner, page, limit],
    queryFn: () => (owner ? getDocumentsByOwner(owner, page, limit) : null),
    enabled: !!owner,
    // keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useGetDocumentsByOrganization(organizationId?: string, page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['organization-documents', organizationId, page, limit],
    queryFn: () => (organizationId ? getDocumentsByOrganization(organizationId, page, limit) : null),
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

export function useSearchDocumentsByTags(tags: string[] = [], page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['documents', 'search', 'tags', tags, page, limit],
    queryFn: () => (tags.length > 0 ? searchDocumentsByTags(tags, page, limit) : null),
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
    ...rest,
  }
}

export function useRecentDocuments(ownerId?: string, limit: number = 5) {
  const { data: recentDocuments } = useGetDocumentsByOwner(ownerId, 1, limit)

  return {
    documents: recentDocuments?.data || [],
    isLoading: recentDocuments === undefined,
  }
}

export function useDocumentTransaction(txHash: `0x${string}` | undefined) {
  const { data: receipt, isLoading, isSuccess, error } = useTransactionReceipt(txHash)

  return {
    receipt,
    isLoading,
    isSuccess,
    error,
    isConfirmed: receipt?.status === 'success',
  }
}
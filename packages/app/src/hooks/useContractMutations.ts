'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  useCreateUserProfile,
  useUpdateUserProfile,
  useCreateOrganization,
  useAddMemberToOrganization,
  useCreateDocument,
  useSignDocument,
  useTransactionReceipt,
} from '@/lib/client-contract-actions'

// User Profile Mutations
export function useCreateUserProfileMutation() {
  const queryClient = useQueryClient()
  const { createUserProfile } = useCreateUserProfile()

  return useMutation({
    mutationFn: async ({ username, email }: { username: string; email: string }) => {
      const hash = await createUserProfile(username, email)
      return { hash }
    },
    onSuccess: (data) => {
      toast.success('User profile creation initiated', {
        description: `Transaction hash: ${data.hash}`,
      })
      // Invalidate user profile queries
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
    onError: (error) => {
      console.error('Create user profile error:', error)
      toast.error('Failed to create user profile', {
        description: error.message || 'An unexpected error occurred',
      })
    },
  })
}

export function useUpdateUserProfileMutation() {
  const queryClient = useQueryClient()
  const { updateUserProfile } = useUpdateUserProfile()

  return useMutation({
    mutationFn: async ({ field, value }: { field: string; value: string }) => {
      const hash = await updateUserProfile(field, value)
      return { hash }
    },
    onSuccess: (data) => {
      toast.success('User profile update initiated', {
        description: `Transaction hash: ${data.hash}`,
      })
      // Invalidate user profile queries
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
    onError: (error) => {
      console.error('Update user profile error:', error)
      toast.error('Failed to update user profile', {
        description: error.message || 'An unexpected error occurred',
      })
    },
  })
}

// Organization Mutations
export function useCreateOrganizationMutation() {
  const queryClient = useQueryClient()
  const { createOrganization } = useCreateOrganization()

  return useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      const hash = await createOrganization(name, description)
      return { hash }
    },
    onSuccess: (data) => {
      toast.success('Organization creation initiated', {
        description: `Transaction hash: ${data.hash}`,
      })
      // Invalidate organization queries
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
    },
    onError: (error) => {
      console.error('Create organization error:', error)
      toast.error('Failed to create organization', {
        description: error.message || 'An unexpected error occurred',
      })
    },
  })
}

export function useAddMemberToOrganizationMutation() {
  const queryClient = useQueryClient()
  const { addMemberToOrganization } = useAddMemberToOrganization()

  return useMutation({
    mutationFn: async ({ orgId, memberAddress, role }: { orgId: bigint; memberAddress: string; role: bigint }) => {
      const hash = await addMemberToOrganization(orgId, memberAddress, role)
      return { hash }
    },
    onSuccess: (data, variables) => {
      toast.success('Member addition initiated', {
        description: `Transaction hash: ${data.hash}`,
      })
      // Invalidate organization queries
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      queryClient.invalidateQueries({ queryKey: ['organization', variables.orgId.toString()] })
    },
    onError: (error) => {
      console.error('Add member to organization error:', error)
      toast.error('Failed to add member to organization', {
        description: error.message || 'An unexpected error occurred',
      })
    },
  })
}

// Document Mutations
export function useCreateDocumentMutation() {
  const queryClient = useQueryClient()
  const { createDocument } = useCreateDocument()

  return useMutation({
    mutationFn: async ({ 
      organizationId, 
      title, 
      contentHash, 
      metadataHash 
    }: { 
      organizationId: bigint; 
      title: string; 
      contentHash: string; 
      metadataHash: string 
    }) => {
      const hash = await createDocument(organizationId, title, contentHash, metadataHash)
      return { hash }
    },
    onSuccess: (data) => {
      toast.success('Document creation initiated', {
        description: `Transaction hash: ${data.hash}`,
      })
      // Invalidate document queries
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: (error) => {
      console.error('Create document error:', error)
      toast.error('Failed to create document', {
        description: error.message || 'An unexpected error occurred',
      })
    },
  })
}

export function useSignDocumentMutation() {
  const queryClient = useQueryClient()
  const { signDocument } = useSignDocument()

  return useMutation({
    mutationFn: async ({ docId, signatureData }: { docId: bigint; signatureData: `0x${string}` }) => {
      const hash = await signDocument(docId, signatureData)
      return { hash }
    },
    onSuccess: (data, variables) => {
      toast.success('Document signing initiated', {
        description: `Transaction hash: ${data.hash}`,
      })
      // Invalidate document and signature queries
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['document', variables.docId.toString()] })
      queryClient.invalidateQueries({ queryKey: ['documentSigners', variables.docId.toString()] })
      queryClient.invalidateQueries({ queryKey: ['isDocumentSigned'] })
    },
    onError: (error) => {
      console.error('Sign document error:', error)
      toast.error('Failed to sign document', {
        description: error.message || 'An unexpected error occurred',
      })
    },
  })
}

// Transaction confirmation hook
export function useTransactionConfirmation(hash: `0x${string}` | undefined) {
  const { data: receipt, error } = useTransactionReceipt(hash)

  return useMutation({
    mutationFn: async () => {
      if (!hash) throw new Error('No transaction hash provided')
      
      // Wait for the transaction receipt
      while (!receipt && !error) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      if (error) throw error
      return receipt
    },
    onSuccess: (receipt) => {
      toast.success('Transaction confirmed!', {
        description: `Block: ${receipt?.blockNumber}`,
      })
    },
    onError: (error) => {
      toast.error('Transaction failed', {
        description: error.message || 'Transaction was reverted',
      })
    },
  })
}
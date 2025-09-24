'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import {
  documentRwaAbi,
  organizationAbi,
  userProfileAbi,
  userProfileAddress,
  organizationAddress,
  documentRwaAddress,
} from '../abis'

// User Profile Client Actions
export function useCreateUserProfile() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const createUserProfile = async (username: string, email: string) => {
    const txHash = await writeContractAsync({
      abi: userProfileAbi,
      address: userProfileAddress[97], // BNB Smart Chain
      chainId: 97,
      functionName: 'createProfile',
      args: [username, email],
    })
    return txHash
  }

  return {
    createUserProfile,
    hash,
    isPending,
    error,
  }
}

export function useUpdateUserProfile() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const updateUserProfile = async (field: string, value: string) => {
    const txHash = await writeContractAsync({
      abi: userProfileAbi,
      address: userProfileAddress[97], // BNB Smart Chain
      chainId: 97,
      functionName: 'updateProfile',
      args: [field, value],
    })
    return txHash
  }

  return {
    updateUserProfile,
    hash,
    isPending,
    error,
  }
}

// Organization Client Actions
export function useCreateOrganization() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const createOrganization = async (name: string, description: string) => {
    const txHash = await writeContractAsync({
      abi: organizationAbi,
      address: organizationAddress[97], // BNB Smart Chain
      chainId: 97,
      functionName: 'createOrganization',
      args: [name, description],
    })
    return txHash
  }

  return {
    createOrganization,
    hash,
    isPending,
    error,
  }
}

export function useAddMemberToOrganization() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const addMemberToOrganization = async (orgId: bigint, memberAddress: string, role: bigint) => {
    const txHash = await writeContractAsync({
      abi: organizationAbi,
      address: organizationAddress[97], // BNB Smart Chain
      chainId: 97,
      functionName: 'addMember',
      args: [orgId, memberAddress as `0x${string}`, role],
    })
    return txHash
  }

  return {
    addMemberToOrganization,
    hash,
    isPending,
    error,
  }
}

// Document Client Actions
export function useCreateDocumentContract() {
  const { writeContractAsync, data: hash, isPending, error, isSuccess } = useWriteContract()

  const createDocumentContract = async (organizationId: bigint, title: string, contentHash: string, metadataHash: string) => {
    try {
      const txHash = await writeContractAsync({
        abi: documentRwaAbi,
        address: documentRwaAddress[97], // BNB Smart Chain
        chainId: 97,
        functionName: 'createDocument',
        args: [organizationId, title, contentHash, metadataHash],
      })
      return txHash
    } catch (contractError) {
      console.error('Contract creation error:', contractError)
      throw new Error(`Contract creation failed: ${contractError instanceof Error ? contractError.message : 'Unknown error'}`)
    }
  }

  return {
    createDocumentContract,
    hash,
    isPending,
    error,
    isSuccess,
  }
}

export function useUpdateDocument() {
  const { writeContractAsync, data: hash, isPending, error, isSuccess } = useWriteContract()

  const updateDocument = async (docId: bigint, title: string) => {
    try {
      const txHash = await writeContractAsync({
        abi: documentRwaAbi,
        address: documentRwaAddress[97], // BNB Smart Chain
        chainId: 97,
        functionName: 'updateDocument',
        args: [docId, title],
      })
      return txHash
    } catch (contractError) {
      console.error('Contract update error:', contractError)
      throw new Error(`Contract update failed: ${contractError instanceof Error ? contractError.message : 'Unknown error'}`)
    }
  }

  return {
    updateDocument,
    hash,
    isPending,
    error,
    isSuccess,
  }
}

export function useDeleteDocument() {
  const { writeContractAsync, data: hash, isPending, error, isSuccess } = useWriteContract()

  const deleteDocument = async (docId: bigint) => {
    try {
      const txHash = await writeContractAsync({
        abi: documentRwaAbi,
        address: documentRwaAddress[97], // BNB Smart Chain
        chainId: 97,
        functionName: 'deleteDocument',
        args: [docId],
      })
      return txHash
    } catch (contractError) {
      console.error('Contract deletion error:', contractError)
      throw new Error(`Contract deletion failed: ${contractError instanceof Error ? contractError.message : 'Unknown error'}`)
    }
  }

  return {
    deleteDocument,
    hash,
    isPending,
    error,
    isSuccess,
  }
}

export function useSignDocument() {
  const { writeContractAsync, data: hash, isPending, error, isSuccess } = useWriteContract()

  const signDocument = async (docId: bigint, signatureData: `0x${string}`) => {
    try {
      const txHash = await writeContractAsync({
        abi: documentRwaAbi,
        address: documentRwaAddress[97], // BNB Smart Chain
        chainId: 97,
        functionName: 'signDocument',
        args: [docId, signatureData],
      })
      return txHash
    } catch (contractError) {
      console.error('Document signing error:', contractError)
      throw new Error(`Document signing failed: ${contractError instanceof Error ? contractError.message : 'Unknown error'}`)
    }
  }

  return {
    signDocument,
    hash,
    isPending,
    error,
    isSuccess,
  }
}

// Transaction receipt hook for waiting for confirmations
export function useTransactionReceipt(hash: `0x${string}` | undefined) {
  return useWaitForTransactionReceipt({
    hash,
  })
}
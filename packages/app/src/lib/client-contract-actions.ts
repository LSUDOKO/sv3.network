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
export function useCreateDocument() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const createDocument = async (organizationId: bigint, title: string, contentHash: string, metadataHash: string) => {
    const txHash = await writeContractAsync({
      abi: documentRwaAbi,
      address: documentRwaAddress[97], // BNB Smart Chain
      chainId: 97,
      functionName: 'createDocument',
      args: [organizationId, title, contentHash, metadataHash],
    })
    return txHash
  }

  return {
    createDocument,
    hash,
    isPending,
    error,
  }
}

export function useSignDocument() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const signDocument = async (docId: bigint, signatureData: `0x${string}`) => {
    const txHash = await writeContractAsync({
      abi: documentRwaAbi,
      address: documentRwaAddress[97], // BNB Smart Chain
      chainId: 97,
      functionName: 'signDocument',
      args: [docId, signatureData],
    })
    return txHash
  }

  return {
    signDocument,
    hash,
    isPending,
    error,
  }
}

// Transaction receipt hook for waiting for confirmations
export function useTransactionReceipt(hash: `0x${string}` | undefined) {
  return useWaitForTransactionReceipt({
    hash,
  })
}
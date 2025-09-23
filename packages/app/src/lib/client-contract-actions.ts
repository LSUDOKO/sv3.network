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
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const createUserProfile = async (username: string, email: string) => {
    return writeContract({
      abi: userProfileAbi,
      address: userProfileAddress[56], // BNB Smart Chain
      functionName: 'createProfile',
      args: [username, email],
    })
  }

  return {
    createUserProfile,
    hash,
    isPending,
    error,
  }
}

export function useUpdateUserProfile() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const updateUserProfile = async (field: string, value: string) => {
    return writeContract({
      abi: userProfileAbi,
      address: userProfileAddress[56], // BNB Smart Chain
      functionName: 'updateProfile',
      args: [field, value],
    })
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
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const createOrganization = async (name: string, description: string) => {
    return writeContract({
      abi: organizationAbi,
      address: organizationAddress[56], // BNB Smart Chain
      functionName: 'createOrganization',
      args: [name, description],
    })
  }

  return {
    createOrganization,
    hash,
    isPending,
    error,
  }
}

export function useAddMemberToOrganization() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const addMemberToOrganization = async (orgId: bigint, memberAddress: string, role: bigint) => {
    return writeContract({
      abi: organizationAbi,
      address: organizationAddress[56], // BNB Smart Chain
      functionName: 'addMember',
      args: [orgId, memberAddress as `0x${string}`, role],
    })
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
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const createDocument = async (organizationId: bigint, title: string, contentHash: string, metadataHash: string) => {
    return writeContract({
      abi: documentRwaAbi,
      address: documentRwaAddress[56], // BNB Smart Chain
      functionName: 'createDocument',
      args: [organizationId, title, contentHash, metadataHash],
    })
  }

  return {
    createDocument,
    hash,
    isPending,
    error,
  }
}

export function useSignDocument() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const signDocument = async (docId: bigint, signatureData: `0x${string}`) => {
    return writeContract({
      abi: documentRwaAbi,
      address: documentRwaAddress[56], // BNB Smart Chain
      functionName: 'signDocument',
      args: [docId, signatureData],
    })
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
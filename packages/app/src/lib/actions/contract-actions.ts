'use server'

import { writeContract, readContract } from '@wagmi/core'
import { config } from '@/config'
import { UserProfileContractABI, OrganizationContractABI, DocumentRWAContractABI } from '@/abis'

// User Profile Actions
export async function createUserProfile(
  name: string,
  email: string,
  publicKey: string,
  metadataUri: string
) {
  try {
    const result = await writeContract(config, {
      abi: UserProfileContractABI,
      address: process.env.NEXT_PUBLIC_USER_PROFILE_CONTRACT as `0x${string}`,
      functionName: 'createProfile',
      args: [name, email, publicKey, metadataUri],
    })
    
    return { success: true, hash: result }
  } catch (error) {
    console.error('Create user profile error:', error)
    return { success: false, error: 'Failed to create user profile' }
  }
}

export async function getUserProfile(userAddress: string) {
  try {
    const profile = await readContract(config, {
      abi: UserProfileContractABI,
      address: process.env.NEXT_PUBLIC_USER_PROFILE_CONTRACT as `0x${string}`,
      functionName: 'getProfile',
      args: [userAddress as `0x${string}`],
    })
    
    return { success: true, profile }
  } catch (error) {
    console.error('Get user profile error:', error)
    return { success: false, error: 'Failed to get user profile' }
  }
}

export async function updateUserProfile(
  name: string,
  email: string,
  metadataUri: string
) {
  try {
    const result = await writeContract(config, {
      abi: UserProfileContractABI,
      address: process.env.NEXT_PUBLIC_USER_PROFILE_CONTRACT as `0x${string}`,
      functionName: 'updateProfile',
      args: [name, email, metadataUri],
    })
    
    return { success: true, hash: result }
  } catch (error) {
    console.error('Update user profile error:', error)
    return { success: false, error: 'Failed to update user profile' }
  }
}

// Organization Actions
export async function createOrganization(
  name: string,
  description: string,
  metadataUri: string
) {
  try {
    const result = await writeContract(config, {
      abi: OrganizationContractABI,
      address: process.env.NEXT_PUBLIC_ORGANIZATION_CONTRACT as `0x${string}`,
      functionName: 'createOrganization',
      args: [name, description, metadataUri],
    })
    
    return { success: true, hash: result }
  } catch (error) {
    console.error('Create organization error:', error)
    return { success: false, error: 'Failed to create organization' }
  }
}

export async function getOrganization(orgId: bigint) {
  try {
    const organization = await readContract(config, {
      abi: OrganizationContractABI,
      address: process.env.NEXT_PUBLIC_ORGANIZATION_CONTRACT as `0x${string}`,
      functionName: 'getOrganization',
      args: [orgId],
    })
    
    return { success: true, organization }
  } catch (error) {
    console.error('Get organization error:', error)
    return { success: false, error: 'Failed to get organization' }
  }
}

export async function addMemberToOrganization(orgId: bigint, memberAddress: string) {
  try {
    const result = await writeContract(config, {
      abi: OrganizationContractABI,
      address: process.env.NEXT_PUBLIC_ORGANIZATION_CONTRACT as `0x${string}`,
      functionName: 'addMember',
      args: [orgId, memberAddress as `0x${string}`],
    })
    
    return { success: true, hash: result }
  } catch (error) {
    console.error('Add member error:', error)
    return { success: false, error: 'Failed to add member to organization' }
  }
}

// Document RWA Actions
export async function mintDocument(
  to: string,
  metadataUri: string,
  signers: string[],
  orgId: bigint
) {
  try {
    const result = await writeContract(config, {
      abi: DocumentRWAContractABI,
      address: process.env.NEXT_PUBLIC_DOCUMENT_RWA_CONTRACT as `0x${string}`,
      functionName: 'mintDocument',
      args: [to as `0x${string}`, metadataUri, signers as `0x${string}`[], orgId],
    })
    
    return { success: true, hash: result }
  } catch (error) {
    console.error('Mint document error:', error)
    return { success: false, error: 'Failed to mint document' }
  }
}

export async function signDocument(documentId: bigint, signature: string) {
  try {
    const result = await writeContract(config, {
      abi: DocumentRWAContractABI,
      address: process.env.NEXT_PUBLIC_DOCUMENT_RWA_CONTRACT as `0x${string}`,
      functionName: 'signDocument',
      args: [documentId, signature],
    })
    
    return { success: true, hash: result }
  } catch (error) {
    console.error('Sign document error:', error)
    return { success: false, error: 'Failed to sign document' }
  }
}

export async function getDocument(documentId: bigint) {
  try {
    const document = await readContract(config, {
      abi: DocumentRWAContractABI,
      address: process.env.NEXT_PUBLIC_DOCUMENT_RWA_CONTRACT as `0x${string}`,
      functionName: 'getDocument',
      args: [documentId],
    })
    
    return { success: true, document }
  } catch (error) {
    console.error('Get document error:', error)
    return { success: false, error: 'Failed to get document' }
  }
}

export async function getDocumentSignatures(documentId: bigint) {
  try {
    const signatures = await readContract(config, {
      abi: DocumentRWAContractABI,
      address: process.env.NEXT_PUBLIC_DOCUMENT_RWA_CONTRACT as `0x${string}`,
      functionName: 'getDocumentSignatures',
      args: [documentId],
    })
    
    return { success: true, signatures }
  } catch (error) {
    console.error('Get document signatures error:', error)
    return { success: false, error: 'Failed to get document signatures' }
  }
}

export async function verifyDocumentSignature(
  documentId: bigint,
  signer: string,
  signature: string
) {
  try {
    const isValid = await readContract(config, {
      abi: DocumentRWAContractABI,
      address: process.env.NEXT_PUBLIC_DOCUMENT_RWA_CONTRACT as `0x${string}`,
      functionName: 'verifySignature',
      args: [documentId, signer as `0x${string}`, signature],
    })
    
    return { success: true, isValid }
  } catch (error) {
    console.error('Verify signature error:', error)
    return { success: false, error: 'Failed to verify signature' }
  }
}
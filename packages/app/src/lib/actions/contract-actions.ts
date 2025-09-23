'use server'

import { createPublicClient, http } from 'viem'
import { bsc } from 'viem/chains'
import {
  documentRwaAbi,
  organizationAbi,
  userProfileAbi,
  userProfileAddress,
  organizationAddress,
  documentRwaAddress,
} from '../../abis'

// Create viem clients for server-side contract interactions
const publicClient = createPublicClient({
  chain: bsc,
  transport: http(),
})


// User Profile Actions
// export async function createUserProfile(username: string, email: string) {
//   try {
//     // Note: This function requires a wallet client with a connected account
//     return { success: false, error: 'Transaction signing not available in server actions. Use client-side hooks instead.' }
//   } catch (error) {
//     console.error('Create user profile error:', error)
//     return { success: false, error: 'Failed to create user profile' }
//   }
// }

export async function getUserProfile(userAddress: string) {
  try {
    const profile = await publicClient.readContract({
      abi: userProfileAbi,
      address: userProfileAddress[56], // BNB Smart Chain
      functionName: 'getProfile',
      args: [userAddress as `0x${string}`],
    })
    return profile
  } catch (error) {
    console.error('Get user profile error:', error)
    throw error
  }
}

// export async function updateUserProfile(field: string, value: string) {
//   try {
//     // Note: This function requires a wallet client with a connected account
//     return { success: false, error: 'Transaction signing not available in server actions. Use client-side hooks instead.' }
//   } catch (error) {
//     console.error('Update user profile error:', error)
//     return { success: false, error: 'Failed to update user profile' }
//   }
// }

// export async function createOrganization(name: string, description: string) {
//   try {
//     // Note: This function requires a wallet client with a connected account
//     return { success: false, error: 'Transaction signing not available in server actions. Use client-side hooks instead.' }
//   } catch (error) {
//     console.error('Create organization error:', error)
//     return { success: false, error: 'Failed to create organization' }
//   }
// }

export async function getOrganization(orgId: bigint) {
  try {
    const organization = await publicClient.readContract({
      abi: organizationAbi,
      address: organizationAddress[56], // BNB Smart Chain
      functionName: 'getOrganization',
      args: [orgId],
    })
    return organization
  } catch (error) {
    console.error('Get organization error:', error)
    throw error
  }
}

// export async function addMemberToOrganization(orgId: bigint, memberAddress: string, role: bigint) {
//   try {
//     // Note: This function requires a wallet client with a connected account
//     return { success: false, error: 'Transaction signing not available in server actions. Use client-side hooks instead.' }
//   } catch (error) {
//     console.error('Add member to organization error:', error)
//     return { success: false, error: 'Failed to add member to organization' }
//   }
// }

// export async function createDocument(organizationId: bigint, title: string, contentHash: string, metadataHash: string) {
//   try {
//     // Note: This function requires a wallet client with a connected account
//     return { success: false, error: 'Transaction signing not available in server actions. Use client-side hooks instead.' }
//   } catch (error) {
//     console.error('Create document error:', error)
//     return { success: false, error: 'Failed to create document' }
//   }
// }

// export async function signDocument(docId: bigint, signatureData: `0x${string}`) {
//   try {
//     // Note: This function requires a wallet client with a connected account
//     return { success: false, error: 'Transaction signing not available in server actions. Use client-side hooks instead.' }
//   } catch (error) {
//     console.error('Sign document error:', error)
//     return { success: false, error: 'Failed to sign document' }
//   }
// }

export async function getDocument(documentId: bigint) {
  try {
    const document = await publicClient.readContract({
      abi: documentRwaAbi,
      address: documentRwaAddress[56], // BNB Smart Chain
      functionName: 'getDocument',
      args: [documentId],
    })
    return document
  } catch (error) {
    console.error('Get document error:', error)
    throw error
  }
}

export async function getDocumentSigners(docId: bigint) {
  try {
    const signers = await publicClient.readContract({
      abi: documentRwaAbi,
      address: documentRwaAddress[56], // BNB Smart Chain
      functionName: 'getDocumentSigners',
      args: [docId],
    })
    return signers
  } catch (error) {
    console.error('Get document signers error:', error)
    throw error
  }
}

export async function isDocumentSigned(docId: bigint, signer: string) {
  try {
    const isSigned = await publicClient.readContract({
      abi: documentRwaAbi,
      address: documentRwaAddress[56], // BNB Smart Chain
      functionName: 'isSigned',
      args: [docId, signer as `0x${string}`],
    })
    return isSigned
  } catch (error) {
    console.error('Is document signed error:', error)
    throw error
  }
}
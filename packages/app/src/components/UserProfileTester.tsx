'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { getUserProfile } from '@/lib/actions/contract-actions'
import { useCreateUserProfileMutation } from '@/hooks/useContractMutations'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Separator } from './ui/separator'

interface ContractProfile {
  walletAddress: string
  username: string
  email: string
  linkedinProfile: string
  verified: boolean
  createdAt: bigint
}

interface TestResult {
  success: boolean
  message: string
  data?: unknown
  error?: string
}

interface ContractError extends Error {
  contractAddress?: string
  functionName?: string
}

export function UserProfileTester() {
  const { address, isConnected } = useAccount()
  const [profile, setProfile] = useState<ContractProfile | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  })
  const [lastTxHash] = useState<`0x${string}` | undefined>()

  const createProfileMutation = useCreateUserProfileMutation()

  // Wait for transaction receipt
  const { data: receipt, isLoading: isReceiptLoading, isSuccess: isReceiptSuccess } = useWaitForTransactionReceipt({
    hash: lastTxHash,
  })

  useEffect(() => {
    if (isReceiptSuccess && receipt) {
      addTestResult({
        success: true,
        message: 'Transaction confirmed on blockchain',
        data: { blockNumber: receipt.blockNumber, gasUsed: receipt.gasUsed.toString() }
      })
      // Wait a bit then try to fetch the profile
      setTimeout(() => {
        testGetProfile()
      }, 2000)
    }
  }, [isReceiptSuccess, receipt])

  const addTestResult = (result: TestResult) => {
    setTestResults(prev => [...prev, { ...result, timestamp: new Date().toISOString() }])
  }

  const clearResults = () => {
    setTestResults([])
  }

  const testGetProfile = async () => {
    if (!address) {
      addTestResult({
        success: false,
        message: 'No wallet address available',
        error: 'Wallet not connected'
      })
      return
    }

    setIsLoading(true)
    addTestResult({
      success: true,
      message: `Testing profile retrieval for address: ${address}`
    })

    try {
      const contractProfile = await getUserProfile(address)
      
      if (contractProfile) {
        // Handle both array-like and object-like responses
        let profileData: ContractProfile
        
        if (Array.isArray(contractProfile)) {
          profileData = {
            walletAddress: contractProfile[0] || '',
            username: contractProfile[1] || '',
            email: contractProfile[2] || '',
            linkedinProfile: contractProfile[3] || '',
            verified: contractProfile[4] || false,
            createdAt: contractProfile[5] || BigInt(0),
          }
        } else {
          profileData = contractProfile as unknown as ContractProfile
        }

        setProfile(profileData)
        addTestResult({
          success: true,
          message: 'Profile retrieved successfully',
          data: profileData
        })
      } else {
        addTestResult({
          success: false,
          message: 'Profile not found - contract returned null/undefined',
          error: 'No profile data'
        })
      }
    } catch (error: unknown) {
      console.error('Profile retrieval error:', error)
      
      let errorMessage = 'Unknown error'
      if (error instanceof Error && error.message) {
        errorMessage = error.message
      }
      
      // Check for specific contract errors
      if (error instanceof Error && error.message?.includes('execution reverted')) {
        if (error.message?.includes('Profile not found')) {
          errorMessage = 'Profile does not exist for this address'
        } else {
          errorMessage = 'Contract execution reverted - profile likely does not exist'
        }
      }

      addTestResult({
        success: false,
        message: 'Failed to retrieve profile',
        error: errorMessage,
        data: error instanceof Error ? { 
          errorType: error.constructor.name,
          contractAddress: (error as ContractError).contractAddress,
          functionName: (error as ContractError).functionName
        } : { errorType: 'Unknown' }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testCreateProfile = async () => {
    if (!address) {
      addTestResult({
        success: false,
        message: 'Cannot create profile - wallet not connected',
        error: 'No wallet address'
      })
      return
    }

    if (!formData.username || !formData.email) {
      addTestResult({
        success: false,
        message: 'Cannot create profile - username and email required',
        error: 'Missing required fields'
      })
      return
    }

    if (formData.username.length < 3 || formData.username.length > 30) {
      addTestResult({
        success: false,
        message: 'Username must be 3-30 characters',
        error: 'Invalid username length'
      })
      return
    }

    addTestResult({
      success: true,
      message: `Attempting to create profile with username: ${formData.username}, email: ${formData.email}`
    })

    try {
      const result = await createProfileMutation.mutateAsync({
        username: formData.username,
        email: formData.email
      })

      // setLastTxHash(result.hash)
      addTestResult({
        success: true,
        message: 'Profile creation transaction submitted',
        data: { transactionHash: result.hash }
      })
    } catch (error: unknown) {
      console.error('Profile creation error:', error)
      
      let errorMessage = 'Unknown error'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      
      // Check for specific contract errors
      if (error instanceof Error && error.message?.includes('Profile already exists')) {
        errorMessage = 'Profile already exists for this address'
      } else if (error instanceof Error && error.message?.includes('Username already taken')) {
        errorMessage = 'Username is already taken by another user'
      } else if (error instanceof Error && error.message?.includes('Username must be 3-30 characters')) {
        errorMessage = 'Username must be between 3 and 30 characters'
      } else if (error instanceof Error && error.message?.includes('Invalid username character')) {
        errorMessage = 'Username contains invalid characters (only alphanumeric and underscore allowed)'
      }

      addTestResult({
        success: false,
        message: 'Failed to create profile',
        error: errorMessage,
        data: error instanceof Error ? { errorType: error.constructor.name } : { errorType: 'Unknown' }
      })
    }
  }

  const runFullTest = async () => {
    clearResults()
    addTestResult({
      success: true,
      message: '🚀 Starting comprehensive profile test suite'
    })

    // Test 1: Check current profile status
    await testGetProfile()
    
    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Test 2: If no profile exists and we have form data, try to create one
    if (!profile && formData.username && formData.email) {
      await testCreateProfile()
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>User Profile Tester</h1>
          <p className='text-muted-foreground mt-2'>
            Test profile creation and retrieval functionality
          </p>
        </div>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Badge variant={isConnected ? 'default' : 'destructive'}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </Badge>
              {address && (
                <span className='text-sm text-muted-foreground font-mono'>
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Form */}
      <Card>
        <CardHeader>
          <CardTitle>Test Profile Creation</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>Username</label>
              <Input
                type='text'
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder='Enter username (3-30 chars, alphanumeric + underscore)'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <Input
                type='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder='Enter email address'
              />
            </div>
          </div>
          
          <div className='flex gap-2'>
            <Button 
              onClick={() => void testCreateProfile()} 
              disabled={!isConnected || createProfileMutation.isPending || isReceiptLoading}
            >
              {createProfileMutation.isPending ? 'Creating...' : 'Test Create Profile'}
            </Button>
            <Button 
              onClick={() => void testGetProfile()} 
              variant='outline'
              disabled={!isConnected || isLoading}
            >
              {isLoading ? 'Loading...' : 'Test Get Profile'}
            </Button>
            <Button 
              onClick={() => void runFullTest()} 
              variant='secondary'
              disabled={!isConnected}
            >
              Run Full Test
            </Button>
            <Button 
              onClick={clearResults} 
              variant='ghost'
            >
              Clear Results
            </Button>
          </div>

          {isReceiptLoading && (
            <Alert>
              <AlertDescription>
                Waiting for transaction confirmation... This may take a few moments.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Current Profile Display */}
      {profile && (
        <Card>
          <CardHeader>
            <CardTitle>Current Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div><strong>Wallet:</strong> {profile.walletAddress}</div>
              <div><strong>Username:</strong> {profile.username}</div>
              <div><strong>Email:</strong> {profile.email}</div>
              <div><strong>LinkedIn:</strong> {profile.linkedinProfile || 'Not set'}</div>
              <div><strong>Verified:</strong> {profile.verified ? 'Yes' : 'No'}</div>
              <div><strong>Created:</strong> {new Date(Number(profile.createdAt) * 1000).toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          {testResults.length === 0 ? (
            <p className='text-muted-foreground'>No test results yet. Run a test to see results here.</p>
          ) : (
            <div className='space-y-3'>
              {testResults.map((result, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex items-start gap-2'>
                    <Badge variant={result.success ? 'default' : 'destructive'}>
                      {result.success ? '✓' : '✗'}
                    </Badge>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>{result.message}</p>
                      {result.error && (
                        <p className='text-sm text-red-600 mt-1'>Error: {result.error}</p>
                      )}
                      {result.data && (
                        <details className='mt-1'>
                          <summary className='text-xs text-muted-foreground cursor-pointer'>
                            View details
                          </summary>
                          <pre className='text-xs bg-muted p-2 rounded mt-1 overflow-auto'>
                            {typeof result.data === 'object' && result.data !== null 
                              ? JSON.stringify(result.data, (key, value) => 
                                  typeof value === 'bigint' ? value.toString() : value, 2)
                              : String(result.data)}
                          </pre>
                        </details>
                        // eslint-disable-next-line
                      ) as any}
                    </div>
                  </div>
                  {index < testResults.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getUserProfile } from '@/lib/actions/contract-actions'
import { useCreateUserProfileMutation, useUpdateUserProfileMutation } from '@/hooks/useContractMutations'
import {
  useCreateUser,
  useUpdateUserProfile as useUpdateDbUserProfile,
  useGetUserByWallet,
  // useCurrentUser,
} from '@/app/hooks/use-user-mutations'
import { useUserOrganizations } from '@/app/hooks/use-organization-mutations'
import { useRecentDocuments } from '@/app/hooks/use-document-mutations'
import { CreateOrganizationModal } from './modals/CreateOrganizationModal'
import { DocumentUploadModal } from './modals/DocumentUploadModal'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { toast } from 'sonner'
import { DocumentPrivacy, OrganizationStatus, UserRole } from '@/db/enums'

interface ProfileData {
  name: string
  username: string
  email: string
  organization: string
  role: string
  bio: string
}

interface ContractProfile {
  0: string // walletAddress
  1: string // username
  2: string // email
  3: string // linkedinProfile
  4: boolean // verified
  5: bigint // createdAt
}

export function UserProfile() {
  const { address } = useAccount()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    username: '',
    email: '',
    organization: '',
    role: '',
    bio: '',
  })

  // const { user, hasProfile, isAuthenticated, isLoading: isUserLoading } = useCurrentUser()

  // Contract mutations
  const createProfileMutation = useCreateUserProfileMutation()
  const updateProfileMutation = useUpdateUserProfileMutation()

  // Database mutations
  const createUserMutation = useCreateUser()
  const updateDbProfileMutation = useUpdateDbUserProfile()
  const { data: dbUser, isLoading: isDbUserLoading } = useGetUserByWallet(address)
  const { data: userOrganizations, isLoading: isLoadingOrganizations } = useUserOrganizations(dbUser?.id)
  const { documents: recentDocuments, isLoading: isLoadingDocuments } = useRecentDocuments(dbUser?.id, 3)
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  useEffect(() => {
    if (address) {
      loadProfile()
    }
  }, [address])

  useEffect(() => {
    if (address && !dbUser && !createUserMutation.isPending) {
      handleAutoCreateUser()
    }
  }, [address, dbUser, createUserMutation.isPending])

  useEffect(() => {
    if (dbUser && !isEditing) {
      // Sync form data with database user
      setFormData((prev) => ({
        ...prev,
        name: dbUser.username || prev.name,
        username: dbUser.username || prev.username,
        email: dbUser.email || prev.email,
        bio: dbUser.bio || prev.bio,
        organization: dbUser.metadata?.organization || prev.organization,
        role: dbUser.role || prev.role,
      }))
    }
  }, [dbUser, isEditing])

  const handleAutoCreateUser = async () => {
    if (!address || dbUser || createUserMutation.isPending) return

    try {
      // Create a basic user record with default values
      await createUserMutation.mutateAsync({
        wallet_address: address,
        username: `user_${address.slice(2, 8)}`, // Default username from wallet
        email: '', // Empty email initially
        ens_name: null,
        profile_image_url: null,
        bio: '',
        role: UserRole.USER,
        is_verified: false,
        is_active: true,
        metadata: {
          organization: '',
          preferences: {
            notifications: true,
            theme: 'light',
            language: 'en',
          },
        },
      })
    } catch (error) {
      console.error('Error auto-creating user:', error)
      // Silently fail for auto-creation - user can create profile manually
    }
  }

  const loadProfile = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      const contractProfile = (await getUserProfile(address)) as ContractProfile
      // If we get a valid response with wallet address (index 0), profile exists
      if (
        contractProfile &&
        contractProfile[0] &&
        contractProfile[0] !== '0x0000000000000000000000000000000000000000'
      ) {
        // Convert contract profile to our ProfileData format
        const profileData: ProfileData = {
          name: contractProfile[1] || '', // historically used username as display name
          username: contractProfile[1] || '', // username from contract
          email: contractProfile[2] || '', // email from contract
          organization: '', // Not stored in contract
          role: '', // Not stored in contract
          bio: '', // Not stored in contract
        }
        setProfile(profileData)
        // Only set form data if not editing
        if (!isEditing) {
          setFormData(profileData)
        }
      } else {
        // Profile doesn't exist
        setProfile(null)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      // Profile doesn't exist, which is expected for new users
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!address) return

    // Validate required fields
    if (!formData.username.trim()) {
      toast.error('Username is required')
      return
    }

    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    try {
      // Ensure database user exists first
      let userId = dbUser?.id

      if (!userId) {
        // Create user in database first
        const newUser = await createUserMutation.mutateAsync({
          wallet_address: address,
          username: formData.username.trim(),
          email: formData.email.trim(),
          ens_name: null,
          profile_image_url: null,
          bio: formData.bio.trim(),
          role: UserRole.USER,
          is_verified: false,
          is_active: true,
          metadata: {
            organization: formData.organization.trim(),
            preferences: {
              notifications: true,
              theme: 'light',
              language: 'en',
            },
          },
        })
        userId = newUser.id
      } else {
        // Update existing user in database
        await updateDbProfileMutation.mutateAsync({
          id: userId,
          profileData: {
            username: formData.username.trim(),
            email: formData.email.trim(),
            bio: formData.bio.trim(),
            profile_image_url: undefined,
            metadata: {
              organization: formData.organization.trim() || dbUser?.metadata?.organization || undefined,
              social_links: dbUser?.metadata?.social_links,
              preferences: dbUser?.metadata?.preferences,
            },
          },
        })
      }

      // Then handle contract profile
      if (profile) {
        // Update existing profile - update both username and email
        const updates = []
        if (formData.username.trim() !== profile.username) {
          updates.push(
            updateProfileMutation.mutateAsync({
              field: 'username',
              value: formData.username.trim(),
            })
          )
        }
        if (formData.email.trim() !== profile.email) {
          updates.push(
            updateProfileMutation.mutateAsync({
              field: 'email',
              value: formData.email.trim(),
            })
          )
        }
        await Promise.all(updates)
      } else {
        // Create new profile
        await createProfileMutation.mutateAsync({
          username: formData.username.trim(),
          email: formData.email.trim(),
        })
      }

      setProfile(formData)
      setIsEditing(false)
      await loadProfile() // Reload profile data

      // Show success toast
      toast.success('Profile saved successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)

      // More specific error messages
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = error.message as string

        if (errorMessage.includes('username')) {
          toast.error('Username is already taken or invalid')
        } else if (errorMessage.includes('email')) {
          toast.error('Email is already in use or invalid')
        } else if (errorMessage.includes('wallet')) {
          toast.error('Wallet address conflict detected')
        } else if (errorMessage.includes('contract')) {
          toast.error('Contract operation failed. Please check your wallet connection.')
        } else {
          toast.error('Failed to save profile. Please try again.')
        }
      } else {
        toast.error('Failed to save profile. Please try again.')
      }
    }
  }

  const handleCancel = () => {
    if (dbUser) {
      // Reset to database user data
      setFormData({
        name: dbUser.username || '',
        username: dbUser.username || '',
        email: dbUser.email || '',
        organization: dbUser.metadata?.organization || '',
        role: dbUser.role || '',
        bio: dbUser.bio || '',
      })
    } else if (profile) {
      setFormData(profile)
    }
    setIsEditing(false)
  }

  const handleCreateOrgSuccess = () => {
    toast.success('Organization created successfully!')
    // You can navigate to the organization page or update UI as needed
  }

  const handleUploadSuccess = (documentId: string) => {
    toast.success(`Document ${documentId} uploaded successfully!`)
    // You can navigate to the document page or update UI as needed
  }

  if ((isLoading || isDbUserLoading) && !profile && !dbUser) {
    return (
      <div className='flex flex-col items-center justify-center h-64 space-y-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
        <p className='text-sm text-muted-foreground'>
          {createUserMutation.isPending ? 'Creating your account...' : 'Loading profile...'}
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>User Profile</h1>
          <p className='text-muted-foreground mt-2'>Manage your profile information and settings</p>
        </div>

        {!isEditing && (profile || dbUser) && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      </div>

      <Card>
        <CardContent className='p-6'>
          {!profile && !dbUser && !isEditing ? (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>👤</span>
              </div>
              <h3 className='text-lg font-medium mb-2'>No Profile Found</h3>
              <p className='text-muted-foreground mb-6'>
                {createUserMutation.isSuccess
                  ? 'Your account has been created! Complete your profile to get started.'
                  : 'Create your profile to get started with sv3.network'}
              </p>
              <Button onClick={() => setIsEditing(true)} size='lg'>
                Create Profile
              </Button>
            </div>
          ) : isEditing ? (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Full Name <span className='text-muted-foreground'>(optional)</span>
                  </label>
                  <Input
                    type='text'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='Enter your full name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Username <span className='text-red-500'>*</span>
                  </label>
                  <Input
                    type='text'
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder='Choose a unique username'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Email Address <span className='text-red-500'>*</span>
                  </label>
                  <Input
                    type='email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder='Enter your email'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>Organization</label>
                  <Input
                    type='text'
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder='Enter your organization'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>Role</label>
                  <Input
                    type='text'
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder='Enter your role'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  placeholder='Tell us about yourself'
                />
              </div>

              <div className='flex space-x-4'>
                <Button
                  onClick={handleSave}
                  disabled={
                    createProfileMutation.isPending ||
                    updateProfileMutation.isPending ||
                    createUserMutation.isPending ||
                    updateDbProfileMutation.isPending
                  }>
                  {createProfileMutation.isPending ||
                  updateProfileMutation.isPending ||
                  createUserMutation.isPending ||
                  updateDbProfileMutation.isPending
                    ? 'Saving...'
                    : 'Save Profile'}
                </Button>
                <Button onClick={handleCancel} variant='outline'>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className='space-y-6'>
              <div className='flex items-center space-x-6'>
                <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center'>
                  <span className='text-2xl text-primary-foreground font-bold'>
                    {dbUser?.username || profile?.name
                      ? (dbUser?.username || profile?.name)?.charAt(0).toUpperCase()
                      : '?'}
                  </span>
                </div>
                <div>
                  <h2 className='text-2xl font-bold'>{dbUser?.username || profile?.name}</h2>
                  <p className='text-muted-foreground'>
                    {dbUser?.role || profile?.role} at {dbUser?.metadata?.organization || profile?.organization}
                  </p>
                  <p className='text-sm text-muted-foreground'>{dbUser?.email || profile?.email}</p>
                </div>
              </div>

              {(dbUser?.bio || profile?.bio) && (
                <div>
                  <h3 className='text-lg font-medium mb-2'>About</h3>
                  <p className='text-muted-foreground'>{dbUser?.bio || profile?.bio}</p>
                </div>
              )}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Wallet Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground font-mono'>
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Profile Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge>{dbUser?.is_active ? 'Active' : 'Inactive'}</Badge>
                    {dbUser?.is_verified && (
                      <Badge variant='secondary' className='ml-2'>
                        Verified
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Organizations Section */}
              <div>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-lg font-medium'>Organizations</h3>
                  <Button onClick={() => setShowCreateOrgModal(true)} variant='outline' size='sm'>
                    Create Organization
                  </Button>
                </div>

                {isLoadingOrganizations ? (
                  <div className='flex items-center justify-center h-32'>
                    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
                  </div>
                ) : userOrganizations && userOrganizations.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {userOrganizations.map((org) => (
                      <Card key={org.id} className='border-border'>
                        <CardContent className='p-4'>
                          <div className='flex justify-between items-start mb-2'>
                            <h4 className='font-medium text-sm'>{org.name}</h4>
                            <Badge
                              variant={org.status === OrganizationStatus.ACTIVE ? 'default' : 'secondary'}
                              className='text-xs'>
                              {org.status}
                            </Badge>
                          </div>
                          {org.description && <p className='text-xs text-muted-foreground mb-2'>{org.description}</p>}
                          <div className='flex items-center justify-between'>
                            <span className='text-xs text-muted-foreground'>
                              {org.type.replace('_', ' ').toLowerCase()}
                            </span>
                            {org.website_url && (
                              <a
                                href={org.website_url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-xs text-primary hover:underline'>
                                Visit
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8 border border-dashed border-border rounded-lg'>
                    <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3'>
                      <span className='text-lg'>🏢</span>
                    </div>
                    <p className='text-sm text-muted-foreground mb-3'>No organizations yet</p>
                    <Button onClick={() => setShowCreateOrgModal(true)} size='sm'>
                      Create Your First Organization
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Documents Section */}
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-medium'>Recent Documents</h3>
          <Button onClick={() => setShowUploadModal(true)} variant='outline' size='sm'>
            Upload Document
          </Button>
        </div>

        {isLoadingDocuments ? (
          <div className='flex items-center justify-center h-32'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
          </div>
        ) : recentDocuments && recentDocuments.length > 0 ? (
          <div className='space-y-3'>
            {recentDocuments.map((doc) => (
              <Card key={doc.id} className='border-border'>
                <CardContent className='p-4'>
                  <div className='flex justify-between items-start mb-2'>
                    <div className='flex-1'>
                      <h4 className='font-medium text-sm mb-1'>{doc.title}</h4>
                      {doc.description && (
                        <p className='text-xs text-muted-foreground mb-2 line-clamp-2'>{doc.description}</p>
                      )}
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <span className='capitalize'>{doc.type.replace('_', ' ').toLowerCase()}</span>
                        <span>•</span>
                        <span className='capitalize'>{doc.status.replace('_', ' ').toLowerCase()}</span>
                        <span>•</span>
                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Badge
                        variant={doc.privacy === DocumentPrivacy.PRIVATE ? 'default' : 'secondary'}
                        className='text-xs'>
                        {doc.privacy}
                      </Badge>
                      {doc.organization_id && (
                        <Badge variant='outline' className='text-xs'>
                          Org
                        </Badge>
                      )}
                    </div>
                  </div>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {doc.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className='text-xs bg-muted px-2 py-1 rounded'>
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className='text-xs text-muted-foreground'>+{doc.tags.length - 3} more</span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className='text-center pt-2'>
              <Button variant='outline' size='sm'>
                View All Documents
              </Button>
            </div>
          </div>
        ) : (
          <div className='text-center py-8 border border-dashed border-border rounded-lg'>
            <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-lg'>📄</span>
            </div>
            <p className='text-sm text-muted-foreground mb-3'>No documents yet</p>
            <Button onClick={() => setShowUploadModal(true)} size='sm'>
              Upload Your First Document
            </Button>
          </div>
        )}
      </div>

      {/* Create Organization Modal */}
      <CreateOrganizationModal
        isOpen={showCreateOrgModal}
        onClose={() => setShowCreateOrgModal(false)}
        onSuccess={handleCreateOrgSuccess}
      />

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getUserProfile } from '@/lib/actions/contract-actions'
import { useCreateUserProfileMutation, useUpdateUserProfileMutation } from '@/hooks/useContractMutations'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'

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

  const createProfileMutation = useCreateUserProfileMutation()
  const updateProfileMutation = useUpdateUserProfileMutation()

  useEffect(() => {
    if (address) {
      loadProfile()
    }
  }, [address])

  const loadProfile = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      const contractProfile = await getUserProfile(address) as ContractProfile
      // If we get a valid response with wallet address (index 0), profile exists
      if (contractProfile && contractProfile[0] && contractProfile[0] !== '0x0000000000000000000000000000000000000000') {
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
        setFormData(profileData)
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

    try {
      if (profile) {
        // Update existing profile - update both username and email
        if (formData.username !== profile.username) {
          await updateProfileMutation.mutateAsync({
            field: 'username',
            value: formData.username
          })
        }
        if (formData.email !== profile.email) {
          await updateProfileMutation.mutateAsync({
            field: 'email',
            value: formData.email
          })
        }
      } else {
        // Create new profile
        await createProfileMutation.mutateAsync({
          username: formData.username,
          email: formData.email
        })
      }

      setProfile(formData)
      setIsEditing(false)
      await loadProfile() // Reload profile data
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData(profile)
    }
    setIsEditing(false)
  }

  if (isLoading && !profile) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
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

        {!isEditing && profile && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      </div>

      <Card>
        <CardContent className='p-6'>
          {!profile && !isEditing ? (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>👤</span>
              </div>
              <h3 className='text-lg font-medium mb-2'>No Profile Found</h3>
              <p className='text-muted-foreground mb-6'>Create your profile to get started with sv3.network</p>
              <Button onClick={() => setIsEditing(true)} size='lg'>
                Create Profile
              </Button>
            </div>
          ) : isEditing ? (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>Full Name</label>
                  <Input
                    type='text'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='Enter your full name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>Username</label>
                  <Input
                    type='text'
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder='Choose a unique username'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>Email Address</label>
                  <Input
                    type='email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder='Enter your email'
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
                  disabled={createProfileMutation.isPending || updateProfileMutation.isPending}
                >
                  {(createProfileMutation.isPending || updateProfileMutation.isPending) ? 'Saving...' : 'Save Profile'}
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
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
                <div>
                  <h2 className='text-2xl font-bold'>{profile?.name}</h2>
                  <p className='text-muted-foreground'>
                    {profile?.role} at {profile?.organization}
                  </p>
                  <p className='text-sm text-muted-foreground'>{profile?.email}</p>
                </div>
              </div>

              {profile?.bio && (
                <div>
                  <h3 className='text-lg font-medium mb-2'>About</h3>
                  <p className='text-muted-foreground'>{profile.bio}</p>
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
                    <Badge>Active</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
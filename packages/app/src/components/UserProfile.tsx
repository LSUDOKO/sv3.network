'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { createUserProfile, getUserProfile, updateUserProfile } from '@/lib/actions/contract-actions'

interface ProfileData {
  name: string
  email: string
  organization: string
  role: string
  bio: string
}

interface ContractProfile {
  0: string // name
  1: string // email
  2: string // publicKey
  3: string // metadataUri
}

export function UserProfile() {
  const { address } = useAccount()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    email: '',
    organization: '',
    role: '',
    bio: ''
  })

  useEffect(() => {
    if (address) {
      loadProfile()
    }
  }, [address])

  const loadProfile = async () => {
    if (!address) return
    
    setIsLoading(true)
    try {
      const result = await getUserProfile(address)
      if (result.success && result.profile) {
        // Convert contract profile to our ProfileData format
        const contractProfile = result.profile as ContractProfile
        const profileData: ProfileData = {
          name: contractProfile[0] || '',
          email: contractProfile[1] || '',
          organization: formData.organization, // Not stored in contract
          role: formData.role, // Not stored in contract
          bio: formData.bio // Not stored in contract
        }
        setProfile(profileData)
        setFormData(profileData)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      if (profile) {
        await updateUserProfile(formData.name, formData.email, '')
      } else {
        await createUserProfile(formData.name, formData.email, address, '')
      }
      
      setProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsLoading(false)
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile information and settings</p>
        </div>
        
        {!isEditing && profile && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!profile && !isEditing ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Profile Found</h3>
            <p className="text-gray-600 mb-6">Create your profile to get started with SignVault</p>
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Profile
            </button>
          </div>
        ) : isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your role"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Profile'}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white font-bold">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile?.name}</h2>
                <p className="text-gray-600">{profile?.role} at {profile?.organization}</p>
                <p className="text-sm text-gray-500">{profile?.email}</p>
              </div>
            </div>

            {profile?.bio && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Wallet Address</h4>
                <p className="text-sm text-gray-600 font-mono">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Profile Status</h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
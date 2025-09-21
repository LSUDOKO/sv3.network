'use client'

import { useState } from 'react'
import { createOrganization } from '@/lib/actions/contract-actions'

interface Organization {
  id: string
  name: string
  description: string
  memberCount: number
  isOwner: boolean
}

export function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleCreateOrganization = async () => {
    setIsLoading(true)
    try {
      const result = await createOrganization(formData.name, formData.description, '')
      if (result.success) {
        // Add the new organization to the list
        const newOrg: Organization = {
          id: Date.now().toString(), // In real app, get from contract event
          name: formData.name,
          description: formData.description,
          memberCount: 1,
          isOwner: true
        }
        setOrganizations([...organizations, newOrg])
        setFormData({ name: '', description: '' })
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Error creating organization:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const mockOrganizations: Organization[] = [
    {
      id: '1',
      name: 'TechCorp Inc.',
      description: 'A leading technology company focused on innovation and digital transformation.',
      memberCount: 25,
      isOwner: true
    },
    {
      id: '2',
      name: 'Legal Associates',
      description: 'Professional legal services firm specializing in corporate law.',
      memberCount: 12,
      isOwner: false
    }
  ]

  const displayOrganizations = organizations.length > 0 ? organizations : mockOrganizations

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-600 mt-2">Manage your organizations and memberships</p>
        </div>
        
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Organization
        </button>
      </div>

      {isCreating && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Organization</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your organization"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleCreateOrganization}
                disabled={isLoading || !formData.name}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Organization'}
              </button>
              <button
                onClick={() => {
                  setIsCreating(false)
                  setFormData({ name: '', description: '' })
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayOrganizations.map((org) => (
          <div key={org.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {org.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {org.isOwner && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Owner
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{org.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{org.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">👥</span>
                <span>{org.memberCount} members</span>
              </div>
              
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                View Details
              </button>
            </div>

            {org.isOwner && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    Manage Members
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {displayOrganizations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏢</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Organizations</h3>
          <p className="text-gray-600 mb-6">Create your first organization to get started</p>
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Organization
          </button>
        </div>
      )}
    </div>
  )
}
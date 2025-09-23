'use client'

import { useState } from 'react'
import { createOrganization } from '@/lib/actions/contract-actions'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'

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
    description: '',
  })

  const handleCreateOrganization = async () => {
    setIsLoading(true)
    try {
      const result = await createOrganization(formData.name, formData.description, '')
      if (result.success) {
        const newOrg: Organization = {
          id: Date.now().toString(),
          name: formData.name,
          description: formData.description,
          memberCount: 1,
          isOwner: true,
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
      isOwner: true,
    },
    {
      id: '2',
      name: 'Legal Associates',
      description: 'Professional legal services firm specializing in corporate law.',
      memberCount: 12,
      isOwner: false,
    },
  ]

  const displayOrganizations = organizations.length > 0 ? organizations : mockOrganizations

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Organizations</h1>
          <p className='text-muted-foreground mt-2'>Manage your organizations and memberships</p>
        </div>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>Create Organization</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
            </DialogHeader>
            <div className='space-y-4 py-4'>
              <div>
                <label className='block text-sm font-medium text-muted-foreground mb-2'>Organization Name</label>
                <Input
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder='Enter organization name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-muted-foreground mb-2'>Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder='Describe your organization'
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateOrganization} disabled={isLoading || !formData.name}>
                {isLoading ? 'Creating...' : 'Create Organization'}
              </Button>
              <Button variant='outline' onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {displayOrganizations.map((org) => (
          <Card key={org.id}>
            <CardHeader>
              <div className='flex items-start justify-between mb-4'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center'>
                  <span className='text-primary-foreground text-xl font-bold'>{org.name.charAt(0).toUpperCase()}</span>
                </div>
                {org.isOwner && <Badge>Owner</Badge>}
              </div>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground text-sm mb-4 line-clamp-3'>{org.description}</p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span className='mr-1'>👥</span>
                  <span>{org.memberCount} members</span>
                </div>
                <Button variant='link' size='sm'>
                  View Details
                </Button>
              </div>
              {org.isOwner && (
                <div className='mt-4 pt-4 border-t border-border'>
                  <div className='flex space-x-2'>
                    <Button variant='secondary' size='sm' className='flex-1'>
                      Manage Members
                    </Button>
                    <Button variant='outline' size='sm' className='flex-1'>
                      Settings
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {displayOrganizations.length === 0 && (
        <div className='text-center py-12'>
          <div className='w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-2xl'>🏢</span>
          </div>
          <h3 className='text-lg font-medium mb-2'>No Organizations</h3>
          <p className='text-muted-foreground mb-6'>Create your first organization to get started</p>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>Create Organization</Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </div>
  )
}
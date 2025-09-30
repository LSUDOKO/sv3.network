'use client'

import { useState } from 'react'
import { useCreateOrganizationMutation } from '@/hooks/useContractMutations'
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
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const createOrganizationMutation = useCreateOrganizationMutation()

  const handleCreateOrganization = async () => {
    try {
      await createOrganizationMutation.mutateAsync({
        name: formData.name,
        description: formData.description
      })

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
    } catch (error) {
      console.error('Error creating organization:', error)
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
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold gradient-text'>Organizations</h1>
          <p className='text-muted-foreground text-lg'>Manage your organizations and memberships</p>
        </div>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className='btn-primary-glass'>Create Organization</Button>
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
              <Button
                onClick={handleCreateOrganization}
                disabled={createOrganizationMutation.isPending || !formData.name}>
                {createOrganizationMutation.isPending ? 'Creating...' : 'Create Organization'}
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
          <Card key={org.id} className='group hover:shadow-lg transition-all-300'>
            <CardHeader>
              <div className='flex items-start justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all-300'>
                  <span className='text-primary-foreground text-xl font-bold'>{org.name.charAt(0).toUpperCase()}</span>
                </div>
                {org.isOwner && <Badge className='bg-primary/10 text-primary border-primary/20'>Owner</Badge>}
              </div>
              <CardTitle className='text-xl'>{org.name}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground text-sm line-clamp-3'>{org.description}</p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span className='mr-2'>👥</span>
                  <span>{org.memberCount} members</span>
                </div>
                <Button variant='ghost' size='sm' className='text-primary hover:text-primary/80'>
                  View Details
                </Button>
              </div>
              {org.isOwner && (
                <div className='pt-4 border-t border-border/50'>
                  <div className='flex space-x-2'>
                    <Button variant='secondary' size='sm' className='flex-1 btn-glass'>
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
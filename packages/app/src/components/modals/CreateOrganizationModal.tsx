'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useAccount } from 'wagmi'
import { useCreateOrganization } from '@/app/hooks/use-organization-mutations'
import { OrganizationType } from '@/db/enums'

interface CreateOrganizationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (organizationId: string) => void
}

interface OrganizationData {
  name: string
  description: string
  website: string
  industry: string
  type: OrganizationType
}

export function CreateOrganizationModal({ isOpen, onClose, onSuccess }: CreateOrganizationModalProps) {
  const { address } = useAccount()
  const [formData, setFormData] = useState<OrganizationData>({
    name: '',
    description: '',
    website: '',
    industry: '',
    type: OrganizationType.ENTERPRISE,
  })

  const createOrganizationMutation = useCreateOrganization()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) return

    try {
      const organization = await createOrganizationMutation.mutateAsync({
        data: {
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
          name: formData.name,
          description: formData.description,
          website_url: formData.website || undefined,
          type: formData.type,
          compliance_frameworks: [],
          settings: {},
          metadata: {
            industry: formData.industry,
          },
        },
        ownerId: address,
      })

      onSuccess?.(organization.id)
      onClose()

      // Reset form
      setFormData({
        name: '',
        description: '',
        website: '',
        industry: '',
        type: OrganizationType.ENTERPRISE,
      })
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error('Organization creation failed:', error)
    }
  }

  const updateField = (field: keyof OrganizationData, value: string | OrganizationType) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name.trim() && formData.description.trim()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-lg border border-border bg-background'>
        <DialogHeader className='border-b border-border pb-4'>
          <DialogTitle className='text-xl font-medium'>Create Organization</DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Set up a new organization to manage documents and team members
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6 pt-4'>
          <div className='space-y-2'>
            <Label htmlFor='org-name'>Organization Name *</Label>
            <Input
              id='org-name'
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder='Enter organization name'
              className='border-border'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='org-description'>Description *</Label>
            <Textarea
              id='org-description'
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe your organization's purpose and activities"
              rows={3}
              className='border-border resize-none'
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='org-website'>Website</Label>
              <Input
                id='org-website'
                type='url'
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder='https://example.com'
                className='border-border'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='org-industry'>Industry</Label>
              <Input
                id='org-industry'
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                placeholder='e.g., Technology, Finance, Healthcare'
                className='border-border'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='org-type'>Organization Type *</Label>
            <Select value={formData.type} onValueChange={(value) => updateField('type', value as OrganizationType)}>
              <SelectTrigger className='border-border'>
                <SelectValue placeholder='Select organization type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OrganizationType.ENTERPRISE}>Enterprise</SelectItem>
                <SelectItem value={OrganizationType.NON_PROFIT}>Non-Profit</SelectItem>
                <SelectItem value={OrganizationType.GOVERNMENT}>Government</SelectItem>
                <SelectItem value={OrganizationType.EDUCATIONAL}>Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-end space-x-3 pt-6 border-t border-border'>
            <Button type='button' variant='outline' onClick={onClose} disabled={createOrganizationMutation.isPending}>
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={!isFormValid || createOrganizationMutation.isPending}
              className='min-w-[100px]'>
              {createOrganizationMutation.isPending ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
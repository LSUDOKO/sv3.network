'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useAccount } from 'wagmi'

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
}

export function CreateOrganizationModal({ isOpen, onClose, onSuccess }: CreateOrganizationModalProps) {
  const { address } = useAccount()
  const [formData, setFormData] = useState<OrganizationData>({
    name: '',
    description: '',
    website: '',
    industry: ''
  })
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) return

    setIsCreating(true)
    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          owner: address
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create organization')
      }

      const { organizationId } = await response.json()
      onSuccess?.(organizationId)
      onClose()
      
      // Reset form
      setFormData({ name: '', description: '', website: '', industry: '' })
    } catch (error) {
      console.error('Organization creation failed:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const updateField = (field: keyof OrganizationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name.trim() && formData.description.trim()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border border-border bg-background">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl font-medium">Create Organization</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set up a new organization to manage documents and team members
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name *</Label>
            <Input
              id="org-name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Enter organization name"
              className="border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="org-description">Description *</Label>
            <Textarea
              id="org-description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe your organization's purpose and activities"
              rows={3}
              className="border-border resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="org-website">Website</Label>
              <Input
                id="org-website"
                type="url"
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://example.com"
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="org-industry">Industry</Label>
              <Input
                id="org-industry"
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                placeholder="e.g., Technology, Finance, Healthcare"
                className="border-border"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isCreating}
              className="min-w-[100px]"
            >
              {isCreating ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
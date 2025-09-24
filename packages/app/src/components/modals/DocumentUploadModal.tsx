'use client'

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useAccount } from 'wagmi'
import { useCreateDocument } from '@/app/hooks/use-document-mutations'
import { useUserOrganizations } from '@/app/hooks/use-organization-mutations'
import { useGetUserByWallet } from '@/app/hooks/use-user-mutations'
import { DocumentType, DocumentPrivacy, StorageProvider } from '@/db/enums'

interface DocumentUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (documentHash: string) => void
}

interface DocumentMetadata {
  title: string
  description: string
  category: string
  tags: string[]
  type: DocumentType
  privacy: DocumentPrivacy
  organizationId?: string
}

export function DocumentUploadModal({ isOpen, onClose, onSuccess }: DocumentUploadModalProps) {
  const { address } = useAccount()
  const [file, setFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState<DocumentMetadata>({
    title: '',
    description: '',
    category: '',
    tags: [],
    type: DocumentType.CONTRACT,
    privacy: DocumentPrivacy.PRIVATE,
  })

  const createDocumentMutation = useCreateDocument()
  const { data: dbUser } = useGetUserByWallet(address)
  const { data: userOrganizations } = useUserOrganizations(dbUser?.id)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      if (!metadata.title) {
        setMetadata((prev) => ({ ...prev, title: selectedFile.name.replace(/\.[^/.]+$/, '') }))
      }
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !address || !dbUser) return

    try {
      // Simulate IPFS upload - in a real app, you would upload to IPFS here
      // For now, we'll create a mock file hash
      const fileHash = `0x${Math.random().toString(16).substr(2, 64)}`

      const document = await createDocumentMutation.mutateAsync({
        data: {
          title: metadata.title,
          description: metadata.description,
          type: metadata.type,
          privacy: metadata.privacy,
          organization_id: metadata.organizationId || undefined,
          tags: metadata.tags,
          custom_fields: {
            category: metadata.category,
          },
          metadata: {
            // file_name: file.name || undefined,
            // original_file_size: file.size,
            // mime_type: file.type
          },
          file_data: {
            file_hash: fileHash,
            file_size: file.size,
            file_type: file.type,
            storage_provider: StorageProvider.IPFS,
            storage_path: `/documents/${fileHash}`,
          },
        },
        ownerId: dbUser.id,
      })

      onSuccess?.(document.id)
      onClose()

      // Reset form
      setFile(null)
      setMetadata({
        title: '',
        description: '',
        category: '',
        tags: [],
        type: DocumentType.CONTRACT,
        privacy: DocumentPrivacy.PRIVATE,
      })
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error('Upload failed:', error)
    }
  }

  const updateMetadata = (field: keyof DocumentMetadata, value: string | string[]) => {
    setMetadata((prev) => ({ ...prev, [field]: value }))
  }

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
    updateMetadata('tags', tags)
  }

  // const isFormValid = metadata.title.trim() && file && dbUser

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl border border-border bg-background'>
        <DialogHeader className=''>
          <DialogTitle className='text-xl font-medium'>Upload Document</DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Upload a document to the decentralized storage network
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* File Upload Area */}
          <div className='space-y-2'>
            <Label htmlFor='file-upload'>Document File</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-foreground bg-muted/50' : 'border-border hover:border-muted-foreground'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}>
              {file ? (
                <div className='space-y-2'>
                  <div className='text-2xl'>📄</div>
                  <div className='font-medium'>{file.name}</div>
                  <div className='text-sm text-muted-foreground'>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  <Button variant='outline' size='sm' onClick={() => setFile(null)} className='mt-2'>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className='space-y-2'>
                  <div className='text-4xl text-muted-foreground'>📤</div>
                  <div className='text-lg font-medium'>Drop your document here</div>
                  <div className='text-sm text-muted-foreground'>or click to browse files</div>
                  <Button variant='outline' onClick={() => fileInputRef.current?.click()} className='mt-4'>
                    Choose File
                  </Button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type='file'
                accept='.pdf,image/*'
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className='hidden'
              />
            </div>
          </div>

          {/* Metadata Form */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Document Title *</Label>
              <Input
                id='title'
                value={metadata.title}
                onChange={(e) => updateMetadata('title', e.target.value)}
                placeholder='Enter document title'
                className='border-border'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <Input
                id='category'
                value={metadata.category}
                onChange={(e) => updateMetadata('category', e.target.value)}
                placeholder='e.g., Contract, Agreement, Invoice'
                className='border-border'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2 w-full'>
              <Label htmlFor='document-type'>Document Type *</Label>
              <Select
                value={metadata.type}
                onValueChange={(value) => updateMetadata('type', value ?? (DocumentType.CONTRACT as DocumentType))}>
                <SelectTrigger className='border-border w-full'>
                  <SelectValue placeholder='Select document type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DocumentType.CONTRACT}>Contract</SelectItem>
                  <SelectItem value={DocumentType.AGREEMENT}>Agreement</SelectItem>
                  <SelectItem value={DocumentType.INVOICE}>Invoice</SelectItem>
                  <SelectItem value={DocumentType.RECEIPT}>Receipt</SelectItem>
                  <SelectItem value={DocumentType.CERTIFICATE}>Certificate</SelectItem>
                  <SelectItem value={DocumentType.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2 w-full'>
              <Label htmlFor='privacy'>Privacy *</Label>
              <Select
                value={metadata.privacy}
                onValueChange={(value) => updateMetadata('privacy', value as DocumentPrivacy)}>
                <SelectTrigger className='border-border w-full'>
                  <SelectValue placeholder='Select privacy level' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DocumentPrivacy.PRIVATE}>Private</SelectItem>
                  <SelectItem value={DocumentPrivacy.PUBLIC}>Public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {userOrganizations && userOrganizations.length > 0 && (
              <div className='space-y-2 w-full'>
                <Label htmlFor='organization'>Organization</Label>
                <Select
                  value={metadata.organizationId || ''}
                  onValueChange={(value) => updateMetadata('organizationId', value || '')}>
                  <SelectTrigger className='border-border w-full'>
                    <SelectValue placeholder='Select organization' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DocumentType.OTHER}>Personal Document</SelectItem>
                    {userOrganizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={metadata.description}
              onChange={(e) => updateMetadata('description', e.target.value)}
              placeholder='Describe the document content and purpose'
              rows={3}
              className='border-border resize-none'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='tags'>Tags</Label>
            <Input
              id='tags'
              value={metadata.tags.join(', ')}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder='Enter tags separated by commas'
              className='border-border'
            />
          </div>
        </div>

        <div className='flex justify-end space-x-3'>
          <Button variant='outline' onClick={onClose} disabled={createDocumentMutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || !metadata.title || !dbUser || createDocumentMutation.isPending}
            className='min-w-[100px]'>
            {createDocumentMutation.isPending ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
'use client'

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { useAccount } from 'wagmi'

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
}

export function DocumentUploadModal({ isOpen, onClose, onSuccess }: DocumentUploadModalProps) {
  const { address } = useAccount()
  const [file, setFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState<DocumentMetadata>({
    title: '',
    description: '',
    category: '',
    tags: []
  })
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      if (!metadata.title) {
        setMetadata(prev => ({ ...prev, title: selectedFile.name.replace(/\.[^/.]+$/, '') }))
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
    if (!file || !address) return

    setIsUploading(true)
    try {
      // Upload file to IPFS
      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/ipfs/upload', {
        method: 'POST',
        body: formData
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file')
      }

      const { ipfsHash } = await uploadResponse.json()

      // Upload metadata
      const metadataResponse = await fetch('/api/documents/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: metadata.title,
          description: metadata.description,
          category: metadata.category,
          tags: metadata.tags,
          fileHash: ipfsHash,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          owner: address
        })
      })

      if (!metadataResponse.ok) {
        throw new Error('Failed to save metadata')
      }

      const { metadataHash } = await metadataResponse.json()

      onSuccess?.(metadataHash)
      onClose()
      
      // Reset form
      setFile(null)
      setMetadata({ title: '', description: '', category: '', tags: [] })
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean)
    setMetadata(prev => ({ ...prev, tags }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border border-border bg-background">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl font-medium">Upload Document</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upload a document to the decentralized storage network
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label htmlFor="file-upload">Document File</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-foreground bg-muted/50' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="space-y-2">
                  <div className="text-2xl">📄</div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="mt-2"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl text-muted-foreground">📤</div>
                  <div className="text-lg font-medium">Drop your document here</div>
                  <div className="text-sm text-muted-foreground">
                    or click to browse files
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4"
                  >
                    Choose File
                  </Button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>

          {/* Metadata Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={metadata.title}
                onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter document title"
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={metadata.category}
                onChange={(e) => setMetadata(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Contract, Agreement, Invoice"
                className="border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={metadata.description}
              onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the document content and purpose"
              rows={3}
              className="border-border resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={metadata.tags.join(', ')}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="Enter tags separated by commas"
              className="border-border"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || !metadata.title || isUploading}
            className="min-w-[100px]"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
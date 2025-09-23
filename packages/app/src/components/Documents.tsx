'use client'

import { useState } from 'react'
import { mintDocument } from '@/lib/actions/contract-actions'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  status: 'pending' | 'signed' | 'verified'
  signers: string[]
  signedBy: string[]
}

export function Documents() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [signers, setSigners] = useState<string>('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const formData = new FormData()
      formData.append('file', selectedFile)

      const uploadResponse = await fetch('/api/ipfs/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file')
      }

      const { ipfsHash } = await uploadResponse.json()

      const metadata = {
        name: selectedFile.name,
        description: `Document uploaded on ${new Date().toISOString()}`,
        fileHash: ipfsHash,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
      }

      const metadataResponse = await fetch('/api/documents/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      })

      if (!metadataResponse.ok) {
        throw new Error('Failed to upload metadata')
      }

      const { metadataHash } = await metadataResponse.json()

      const signerAddresses = signers
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s)
      const result = await mintDocument(
        '0x0000000000000000000000000000000000000000', // to address
        metadataHash,
        signerAddresses,
        BigInt(0) // orgId
      )

      if (result.success) {
        const newDocument: Document = {
          id: Date.now().toString(),
          name: selectedFile.name,
          type: selectedFile.type,
          size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
          uploadDate: new Date().toLocaleDateString(),
          status: 'pending',
          signers: signerAddresses,
          signedBy: [],
        }

        setDocuments([newDocument, ...documents])
        setSelectedFile(null)
        setSigners('')
        setUploadProgress(100)

        setTimeout(() => {
          setIsUploading(false)
          setUploadProgress(0)
        }, 1000)
      }
    } catch (error) {
      console.error('Error uploading document:', error)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'Contract_Agreement_2024.pdf',
      type: 'application/pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'signed',
      signers: ['0x1234...5678', '0x9876...4321'],
      signedBy: ['0x1234...5678', '0x9876...4321'],
    },
    {
      id: '2',
      name: 'NDA_Template.pdf',
      type: 'application/pdf',
      size: '1.8 MB',
      uploadDate: '2024-01-14',
      status: 'pending',
      signers: ['0x1234...5678', '0x9876...4321', '0x5555...6666'],
      signedBy: ['0x1234...5678'],
    },
    {
      id: '3',
      name: 'Partnership_Agreement.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: '3.1 MB',
      uploadDate: '2024-01-13',
      status: 'verified',
      signers: ['0x1234...5678', '0x9876...4321'],
      signedBy: ['0x1234...5678', '0x9876...4321'],
    },
  ]

  const displayDocuments = documents.length > 0 ? documents : mockDocuments

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'pending':
        return 'secondary'
      case 'signed':
        return 'default'
      case 'verified':
        return 'outline'
      default:
        return 'default'
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('image')) return '🖼️'
    return '📎'
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold'>Documents</h1>
        <p className='text-muted-foreground mt-2'>Upload, manage, and track your documents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Document</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-muted-foreground mb-2'>Select Document</label>
            <Input type='file' onChange={handleFileSelect} accept='.pdf,.doc,.docx,.txt' />
          </div>

          <div>
            <label className='block text-sm font-medium text-muted-foreground mb-2'>
              Signers (comma-separated addresses)
            </label>
            <Input
              type='text'
              value={signers}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSigners(e.target.value)}
              placeholder='0x1234..., 0x5678...'
            />
          </div>

          {isUploading && (
            <div>
              <div className='flex justify-between text-sm text-muted-foreground mb-1'>
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='divide-y divide-border'>
            {displayDocuments.map((doc) => (
              <div key={doc.id} className='py-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-secondary rounded-lg flex items-center justify-center'>
                      <span className='text-2xl'>{getFileIcon(doc.type)}</span>
                    </div>

                    <div>
                      <h3 className='text-lg font-medium'>{doc.name}</h3>
                      <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Uploaded {doc.uploadDate}</span>
                        <span>•</span>
                        <span>
                          {doc.signedBy.length}/{doc.signers.length} signatures
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-4'>
                    <Badge variant={getStatusVariant(doc.status)}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </Badge>

                    <div className='flex space-x-2'>
                      <Button variant='outline' size='sm'>
                        View
                      </Button>
                      {doc.status === 'pending' && (
                        <Button variant='default' size='sm'>
                          Sign
                        </Button>
                      )}
                      <Button variant='secondary' size='sm'>
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {doc.signers.length > 0 && (
                  <div className='mt-4 pt-4 border-t border-border'>
                    <div className='flex items-center space-x-4'>
                      <span className='text-sm font-medium'>Signers:</span>
                      <div className='flex flex-wrap gap-2'>
                        {doc.signers.map((signer, index) => (
                          <Badge key={index} variant={doc.signedBy.includes(signer) ? 'default' : 'secondary'}>
                            {doc.signedBy.includes(signer) ? '✓' : '○'} {signer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {displayDocuments.length === 0 && (
        <div className='text-center py-12'>
          <div className='w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-2xl'>📄</span>
          </div>
          <h3 className='text-lg font-medium mb-2'>No Documents</h3>
          <p className='text-muted-foreground'>Upload your first document to get started</p>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { mintDocument } from '@/lib/actions/contract-actions'

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
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Upload file to IPFS
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

      // Upload metadata
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

      // Mint document NFT
      const signerAddresses = signers.split(',').map(s => s.trim()).filter(s => s)
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
          signedBy: []
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
      signedBy: ['0x1234...5678', '0x9876...4321']
    },
    {
      id: '2',
      name: 'NDA_Template.pdf',
      type: 'application/pdf',
      size: '1.8 MB',
      uploadDate: '2024-01-14',
      status: 'pending',
      signers: ['0x1234...5678', '0x9876...4321', '0x5555...6666'],
      signedBy: ['0x1234...5678']
    },
    {
      id: '3',
      name: 'Partnership_Agreement.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: '3.1 MB',
      uploadDate: '2024-01-13',
      status: 'verified',
      signers: ['0x1234...5678', '0x9876...4321'],
      signedBy: ['0x1234...5678', '0x9876...4321']
    }
  ]

  const displayDocuments = documents.length > 0 ? documents : mockDocuments

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'signed':
        return 'bg-blue-100 text-blue-800'
      case 'verified':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('image')) return '🖼️'
    return '📎'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-2">Upload, manage, and track your documents</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Document</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Document
            </label>
            <input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signers (comma-separated addresses)
            </label>
            <input
              type="text"
              value={signers}
              onChange={(e) => setSigners(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0x1234..., 0x5678..."
            />
          </div>

          {isUploading && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Documents</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {displayDocuments.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{getFileIcon(doc.type)}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Uploaded {doc.uploadDate}</span>
                      <span>•</span>
                      <span>{doc.signedBy.length}/{doc.signers.length} signatures</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                      View
                    </button>
                    {doc.status === 'pending' && (
                      <button className="px-3 py-1 text-sm text-green-600 hover:text-green-800">
                        Sign
                      </button>
                    )}
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {doc.signers.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Signers:</span>
                    <div className="flex space-x-2">
                      {doc.signers.map((signer, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            doc.signedBy.includes(signer)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {doc.signedBy.includes(signer) ? '✓' : '○'} {signer}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {displayDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents</h3>
          <p className="text-gray-600">Upload your first document to get started</p>
        </div>
      )}
    </div>
  )
}
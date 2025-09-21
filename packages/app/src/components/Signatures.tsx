'use client'

import { useState } from 'react'
import { signDocument, verifyDocumentSignature } from '@/lib/actions/contract-actions'

interface SignatureRequest {
  id: string
  documentName: string
  documentId: string
  requester: string
  requestDate: string
  status: 'pending' | 'signed' | 'expired'
  deadline: string
}

interface CompletedSignature {
  id: string
  documentName: string
  documentId: string
  signedDate: string
  signatureHash: string
  verified: boolean
}

export function Signatures() {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending')
  const [isLoading, setIsLoading] = useState(false)

  const handleSign = async (documentId: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would generate a proper signature
      const signature = `0x${Math.random().toString(16).substr(2, 64)}`
      
      const result = await signDocument(BigInt(documentId), signature)
      if (result.success) {
        // Update the UI to reflect the signature
        console.log('Document signed successfully')
      }
    } catch (error) {
      console.error('Error signing document:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (documentId: string, signer: string, signature: string) => {
    setIsLoading(true)
    try {
      const result = await verifyDocumentSignature(BigInt(documentId), signer, signature)
      if (result.success) {
        console.log('Signature verified:', result)
      }
    } catch (error) {
      console.error('Error verifying signature:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const mockPendingSignatures: SignatureRequest[] = [
    {
      id: '1',
      documentName: 'Partnership_Agreement_2024.pdf',
      documentId: '1',
      requester: '0x1234...5678',
      requestDate: '2024-01-15',
      status: 'pending',
      deadline: '2024-01-22'
    },
    {
      id: '2',
      documentName: 'Service_Contract.pdf',
      documentId: '2',
      requester: '0x9876...4321',
      requestDate: '2024-01-14',
      status: 'pending',
      deadline: '2024-01-21'
    },
    {
      id: '3',
      documentName: 'Employment_Agreement.pdf',
      documentId: '3',
      requester: '0x5555...6666',
      requestDate: '2024-01-10',
      status: 'expired',
      deadline: '2024-01-17'
    }
  ]

  const mockCompletedSignatures: CompletedSignature[] = [
    {
      id: '1',
      documentName: 'NDA_Agreement.pdf',
      documentId: '1',
      signedDate: '2024-01-12',
      signatureHash: '0xabcd...ef12',
      verified: true
    },
    {
      id: '2',
      documentName: 'Consulting_Contract.pdf',
      documentId: '2',
      signedDate: '2024-01-10',
      signatureHash: '0x1234...5678',
      verified: true
    },
    {
      id: '3',
      documentName: 'License_Agreement.pdf',
      documentId: '3',
      signedDate: '2024-01-08',
      signatureHash: '0x9876...4321',
      verified: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'signed':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays > 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Signatures</h1>
        <p className="text-gray-600 mt-2">Manage signature requests and track completed signatures</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Signatures ({mockPendingSignatures.filter(s => s.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Completed Signatures ({mockCompletedSignatures.length})
          </button>
        </nav>
      </div>

      {/* Pending Signatures Tab */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {mockPendingSignatures.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✍️</span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{request.documentName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Requested by {request.requester}</span>
                      <span>•</span>
                      <span>Due {request.deadline}</span>
                      {isDeadlineNear(request.deadline) && (
                        <>
                          <span>•</span>
                          <span className="text-orange-600 font-medium">⚠️ Due soon</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                  
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                        Preview
                      </button>
                      <button
                        onClick={() => handleSign(request.documentId)}
                        disabled={isLoading}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? 'Signing...' : 'Sign Document'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Requested on {new Date(request.requestDate).toLocaleDateString()}
                  </span>
                  <span className="text-gray-600">
                    Document ID: {request.documentId}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {mockPendingSignatures.filter(s => s.status === 'pending').length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Signatures</h3>
              <p className="text-gray-600">You&apos;re all caught up! No documents waiting for your signature.</p>
            </div>
          )}
        </div>
      )}

      {/* Completed Signatures Tab */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {mockCompletedSignatures.map((signature) => (
            <div key={signature.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{signature.documentName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Signed on {new Date(signature.signedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Document ID: {signature.documentId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    signature.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {signature.verified ? 'Verified' : 'Pending Verification'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                      View Document
                    </button>
                    <button
                      onClick={() => handleVerify(signature.documentId, '0x1234...5678', signature.signatureHash)}
                      disabled={isLoading}
                      className="px-3 py-1 text-sm text-green-600 hover:text-green-800"
                    >
                      {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Signature Hash:</span>
                    <span className="ml-2 font-mono">{signature.signatureHash}</span>
                  </div>
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Download Certificate
                  </button>
                </div>
              </div>
            </div>
          ))}

          {mockCompletedSignatures.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Signatures</h3>
              <p className="text-gray-600">Your completed signatures will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
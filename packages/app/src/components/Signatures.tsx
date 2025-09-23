'use client'

import { useState } from 'react'
import { signDocument, isDocumentSigned } from '@/lib/actions/contract-actions'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

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
  const [isLoading, setIsLoading] = useState(false)

  const handleSign = async (documentId: string) => {
    setIsLoading(true)
    try {
      const signature = `0x${Math.random().toString(16).substr(2, 64)}` as `0x${string}`
      const result = await signDocument(BigInt(documentId), signature)
      if (result.success) {
        console.log('Document signed successfully')
      }
    } catch (error) {
      console.error('Error signing document:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (documentId: string, signer: string) => {
    setIsLoading(true)
    try {
      const isSigned = await isDocumentSigned(BigInt(documentId), signer as `0x${string}`)
      console.log('Signature verified:', isSigned)
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
      deadline: '2024-01-22',
    },
    {
      id: '2',
      documentName: 'Service_Contract.pdf',
      documentId: '2',
      requester: '0x9876...4321',
      requestDate: '2024-01-14',
      status: 'pending',
      deadline: '2024-01-21',
    },
    {
      id: '3',
      documentName: 'Employment_Agreement.pdf',
      documentId: '3',
      requester: '0x5555...6666',
      requestDate: '2024-01-10',
      status: 'expired',
      deadline: '2024-01-17',
    },
  ]

  const mockCompletedSignatures: CompletedSignature[] = [
    {
      id: '1',
      documentName: 'NDA_Agreement.pdf',
      documentId: '1',
      signedDate: '2024-01-12',
      signatureHash: '0xabcd...ef12',
      verified: true,
    },
    {
      id: '2',
      documentName: 'Consulting_Contract.pdf',
      documentId: '2',
      signedDate: '2024-01-10',
      signatureHash: '0x1234...5678',
      verified: true,
    },
    {
      id: '3',
      documentName: 'License_Agreement.pdf',
      documentId: '3',
      signedDate: '2024-01-08',
      signatureHash: '0x9876...4321',
      verified: false,
    },
  ]

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'pending':
        return 'secondary'
      case 'signed':
        return 'default'
      case 'expired':
        return 'destructive'
      default:
        return 'outline'
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
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold'>Signatures</h1>
        <p className='text-muted-foreground mt-2'>Manage signature requests and track completed signatures</p>
      </div>

      <Tabs defaultValue='pending'>
        <TabsList>
          <TabsTrigger value='pending'>
            Pending Signatures ({mockPendingSignatures.filter((s) => s.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value='completed'>Completed Signatures ({mockCompletedSignatures.length})</TabsTrigger>
        </TabsList>

        <TabsContent value='pending'>
          <div className='space-y-4 mt-4'>
            {mockPendingSignatures.map((request) => (
              <Card key={request.id}>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center'>
                        <span className='text-2xl'>✍️</span>
                      </div>
                      <div>
                        <h3 className='text-lg font-medium'>{request.documentName}</h3>
                        <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                          <span>Requested by {request.requester}</span>
                          <span>•</span>
                          <span>Due {request.deadline}</span>
                          {isDeadlineNear(request.deadline) && (
                            <>
                              <span>•</span>
                              <span className='text-orange-600 font-medium'>⚠️ Due soon</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center space-x-4'>
                      <Badge variant={getStatusVariant(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>

                      {request.status === 'pending' && (
                        <div className='flex space-x-2'>
                          <Button variant='outline' size='sm'>
                            Preview
                          </Button>
                          <Button onClick={() => handleSign(request.documentId)} disabled={isLoading} size='sm'>
                            {isLoading ? 'Signing...' : 'Sign Document'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='mt-4 pt-4 border-t border-border'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Requested on {new Date(request.requestDate).toLocaleDateString()}
                      </span>
                      <span className='text-muted-foreground'>Document ID: {request.documentId}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockPendingSignatures.filter((s) => s.status === 'pending').length === 0 && (
              <div className='text-center py-12'>
                <div className='w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>✍️</span>
                </div>
                <h3 className='text-lg font-medium mb-2'>No Pending Signatures</h3>
                <p className='text-muted-foreground'>
                  You&apos;re all caught up! No documents waiting for your signature.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value='completed'>
          <div className='space-y-4 mt-4'>
            {mockCompletedSignatures.map((signature) => (
              <Card key={signature.id}>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center'>
                        <span className='text-2xl'>✅</span>
                      </div>
                      <div>
                        <h3 className='text-lg font-medium'>{signature.documentName}</h3>
                        <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                          <span>Signed on {new Date(signature.signedDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Document ID: {signature.documentId}</span>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center space-x-4'>
                      <Badge variant={signature.verified ? 'default' : 'secondary'}>
                        {signature.verified ? 'Verified' : 'Pending Verification'}
                      </Badge>

                      <div className='flex space-x-2'>
                        <Button variant='outline' size='sm'>
                          View Document
                        </Button>
                        <Button
                          onClick={() => handleVerify(signature.documentId, '0x1234...5678')}
                          disabled={isLoading}
                          variant='secondary'
                          size='sm'>
                          {isLoading ? 'Verifying...' : 'Verify'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4 pt-4 border-t border-border'>
                    <div className='flex items-center justify-between'>
                      <div className='text-sm text-muted-foreground'>
                        <span className='font-medium'>Signature Hash:</span>
                        <span className='ml-2 font-mono'>{signature.signatureHash}</span>
                      </div>
                      <Button variant='link' size='sm'>
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockCompletedSignatures.length === 0 && (
              <div className='text-center py-12'>
                <div className='w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>📋</span>
                </div>
                <h3 className='text-lg font-medium mb-2'>No Completed Signatures</h3>
                <p className='text-muted-foreground'>Your completed signatures will appear here.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
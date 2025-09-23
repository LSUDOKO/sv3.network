'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { DocumentUploadModal } from './modals/DocumentUploadModal'
import { CreateOrganizationModal } from './modals/CreateOrganizationModal'
import { QuickActionsBottomSheet } from './bottom'
import { ConfirmationDialog } from './dialogs/ConfirmationDialog'

export function DashboardContent() {
  const [stats, setStats] = useState({
    documentsUploaded: 0,
    documentsToSign: 0,
    organizationsJoined: 0,
    signaturesCompleted: 0,
  })
  const [loading, setLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        documentsUploaded: 12,
        documentsToSign: 3,
        organizationsJoined: 2,
        signaturesCompleted: 8,
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const quickActions = [
    {
      title: 'Upload Document',
      description: 'Upload a new document for signing',
      icon: '📤',
      action: () => setShowUploadModal(true),
    },
    {
      title: 'Create Organization',
      description: 'Start a new organization',
      icon: '🏢',
      action: () => setShowCreateOrgModal(true),
    },
    {
      title: 'Sign Document',
      description: 'Sign pending documents',
      icon: '✍️',
      action: () => setShowQuickActions(true),
    },
    {
      title: 'Verify Signature',
      description: 'Verify document authenticity',
      icon: '🔍',
      action: () => setShowConfirmDialog(true),
    },
  ]

  const handleDocumentUploadSuccess = (documentHash: string) => {
    console.log('Document uploaded successfully:', documentHash)
    // Refresh stats or update UI
    setStats((prev) => ({ ...prev, documentsUploaded: prev.documentsUploaded + 1 }))
  }

  const handleOrganizationCreated = (organizationId: string) => {
    console.log('Organization created successfully:', organizationId)
    // Refresh stats or update UI
    setStats((prev) => ({ ...prev, organizationsJoined: prev.organizationsJoined + 1 }))
  }

  const recentActivity = [
    {
      icon: '📤',
      title: 'Document uploaded',
      description: 'Contract_Agreement_2024.pdf • 2 hours ago',
    },
    {
      icon: '✍️',
      title: 'Document signed',
      description: 'NDA_Template.pdf • 1 day ago',
    },
    {
      icon: '🏢',
      title: 'Joined organization',
      description: 'TechCorp Inc. • 3 days ago',
    },
  ]

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold'>Dashboard Overview</h1>
        <p className='text-muted-foreground mt-2'>
          Welcome back! Here&apos;s what&apos;s happening with your documents and signatures.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard title='Documents Uploaded' value={stats.documentsUploaded} icon='📄' loading={loading} />
        <StatCard title='Pending Signatures' value={stats.documentsToSign} icon='⏳' loading={loading} />
        <StatCard title='Organizations' value={stats.organizationsJoined} icon='🏢' loading={loading} />
        <StatCard title='Signatures Completed' value={stats.signaturesCompleted} icon='✅' loading={loading} />
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {quickActions.map((action, index) => (
            <Button key={index} variant='outline' className='h-auto' onClick={action.action}>
              <Card className='w-full text-left p-0 border-0 shadow-none'>
                <CardHeader>
                  <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                    <span className='text-2xl'>{action.icon}</span>
                  </div>
                  <CardTitle className='text-base'>{action.title}</CardTitle>
                </CardHeader>
              </Card>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-4'>Recent Activity</h2>
        <Card>
          <CardContent className='p-6'>
            <div className='space-y-4'>
              {recentActivity.map((activity, index) => (
                <div key={index} className='flex items-center space-x-4'>
                  <div className='w-8 h-8 bg-secondary rounded-full flex items-center justify-center'>
                    <span className='text-sm'>{activity.icon}</span>
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>{activity.title}</p>
                    <p className='text-xs text-muted-foreground'>{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals and Interactive Components */}
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={handleDocumentUploadSuccess}
      />

      <CreateOrganizationModal
        isOpen={showCreateOrgModal}
        onClose={() => setShowCreateOrgModal(false)}
        onSuccess={handleOrganizationCreated}
      />

      <QuickActionsBottomSheet
        isOpen={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        onUploadDocument={() => {
          setShowQuickActions(false)
          setShowUploadModal(true)
        }}
        onCreateOrganization={() => {
          setShowQuickActions(false)
          setShowCreateOrgModal(true)
        }}
        onSignDocument={() => {
          setShowQuickActions(false)
          console.log('Navigate to sign document')
        }}
        onVerifySignature={() => {
          setShowQuickActions(false)
          setShowConfirmDialog(true)
        }}
      />

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        title='Verify Signature'
        description="Are you sure you want to verify this document's signature?"
        onConfirm={() => {
          console.log('Verifying signature...')
          setShowConfirmDialog(false)
        }}
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: string
  loading: boolean
}

function StatCard({ title, value, icon, loading }: StatCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <span className='text-2xl'>{icon}</span>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className='h-8 w-1/2 bg-secondary animate-pulse rounded-md' />
        ) : (
          <div className='text-2xl font-bold'>{value}</div>
        )}
      </CardContent>
    </Card>
  )
}
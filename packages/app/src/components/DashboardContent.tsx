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
    <div className='space-y-8 p-6'>
      <div className='text-center space-y-4'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold gradient-text'>Dashboard Overview</h1>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Welcome back! Here&apos;s what&apos;s happening with your documents and signatures.
          </p>
        </div>
        <div className='flex justify-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium'>
            <div className='size-2 bg-primary rounded-full animate-pulse' />
            Live Updates
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard title='Documents Uploaded' value={stats.documentsUploaded} icon='📄' loading={loading} />
        <StatCard title='Pending Signatures' value={stats.documentsToSign} icon='⏳' loading={loading} />
        <StatCard title='Organizations' value={stats.organizationsJoined} icon='🏢' loading={loading} />
        <StatCard title='Signatures Completed' value={stats.signaturesCompleted} icon='✅' loading={loading} />
      </div>

      <div>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold'>Quick Actions</h2>
          <div className='text-sm text-muted-foreground'>Get started with these common tasks</div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant='outline'
              className='h-auto p-6 transition-all-300 hover:bg-muted group'
              onClick={action.action}>
              <div className='w-full text-left space-y-4'>
                <div className='w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all-300 bg-muted ring-1 ring-border group-hover:ring-primary/40'>
                  <span className='text-2xl'>{action.icon}</span>
                </div>
                <div className='space-y-2'>
                  <h3 className='text-base font-semibold text-left'>{action.title}</h3>
                  <p className='text-sm text-muted-foreground text-left'>{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold'>Recent Activity</h2>
          <Button variant='ghost' size='sm' className='text-primary hover:text-primary/80'>
            View All
          </Button>
        </div>
        <Card className='transition-all-300 hover:bg-muted/50'>
          <CardContent className='p-6'>
            <div className='space-y-4'>
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-all-300 group'>
                  <div className='w-12 h-12 rounded-xl flex items-center justify-center bg-muted ring-1 ring-border group-hover:ring-primary/40 transition-all-300'>
                    <span className='text-lg'>{activity.icon}</span>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>{activity.title}</p>
                    <p className='text-xs text-muted-foreground truncate'>{activity.description}</p>
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {activity.description.includes('2 hours ago') && '2h'}
                    {activity.description.includes('1 day ago') && '1d'}
                    {activity.description.includes('3 days ago') && '3d'}
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
    <Card className='glass-card transition-all-300 hover:scale-[1.02] hover:shadow-lg group'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>{title}</CardTitle>
        <div className='p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all-300'>
          <span className='text-2xl animate-float'>{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className='h-8 w-1/2 bg-muted/50 loading-shimmer rounded-md' />
        ) : (
          <div className='space-y-1'>
            <div className='text-3xl font-bold gradient-text'>{value}</div>
            <div className='text-xs text-muted-foreground'>
              {title.toLowerCase().includes('uploaded') && 'Total documents'}
              {title.toLowerCase().includes('pending') && 'Awaiting signatures'}
              {title.toLowerCase().includes('organizations') && 'Active memberships'}
              {title.toLowerCase().includes('completed') && 'Successfully signed'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
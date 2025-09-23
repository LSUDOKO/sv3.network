'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { Upload, Building2, FileSignature, ShieldCheck } from 'lucide-react'

interface QuickActionsBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onUploadDocument: () => void
  onCreateOrganization: () => void
  onSignDocument: () => void
  onVerifySignature: () => void
}

export function QuickActionsBottomSheet({
  isOpen,
  onClose,
  onUploadDocument,
  onCreateOrganization,
  onSignDocument,
  onVerifySignature,
}: QuickActionsBottomSheetProps) {
  const actions = [
    {
      title: 'Upload Document',
      description: 'Upload a new document for signing',
      icon: Upload,
      action: onUploadDocument,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Create Organization',
      description: 'Start a new organization',
      icon: Building2,
      action: onCreateOrganization,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Sign Document',
      description: 'Sign a pending document',
      icon: FileSignature,
      action: onSignDocument,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      title: 'Verify Signature',
      description: 'Verify a document signature',
      icon: ShieldCheck,
      action: onVerifySignature,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[400px]">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>
            Choose an action to get started quickly
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {actions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className={`h-24 flex flex-col items-center justify-center space-y-2 text-white border-0 ${action.color}`}
                onClick={action.action}
              >
                <IconComponent className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
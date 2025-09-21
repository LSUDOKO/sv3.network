'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Connect } from './Connect'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardContent } from './DashboardContent'
import { UserProfile } from './UserProfile'
import { Organizations } from './Organizations'
import { Documents } from './Documents'
import { Signatures } from './Signatures'

export type DashboardView = 'overview' | 'profile' | 'organizations' | 'documents' | 'signatures'

export function Dashboard() {
  const { isConnected } = useAccount()
  const [currentView, setCurrentView] = useState<DashboardView>('overview')

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome to SignVault
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connect your wallet to access the decentralized document signing platform
            </p>
          </div>
          <div className="mt-8">
            <Connect />
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return <UserProfile />
      case 'organizations':
        return <Organizations />
      case 'documents':
        return <Documents />
      case 'signatures':
        return <Signatures />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DashboardSidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
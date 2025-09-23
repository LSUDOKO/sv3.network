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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export type DashboardView = 'overview' | 'profile' | 'organizations' | 'documents' | 'signatures'

export function Dashboard() {
  const { isConnected } = useAccount()
  const [currentView, setCurrentView] = useState<DashboardView>('overview')

  if (!isConnected) {
    return (
      <div className='py-24 md:py-48 flex items-center justify-center bg-background'>
        <Card className='max-w-md w-full'>
          <CardHeader className='text-center'>
            <CardTitle className='text-3xl font-extrabold'>Welcome to sv3.network</CardTitle>
            <CardDescription>Connect your wallet to access the decentralized document signing platform</CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <Connect />
          </CardContent>
        </Card>
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
    <div className='py-0 bg-background'>
      <div className='flex'>
        <DashboardSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className='flex-1 p-8'>{renderContent()}</main>
      </div>
    </div>
  )
}
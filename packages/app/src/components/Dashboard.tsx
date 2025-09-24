'use client'

import { usePathname } from 'next/navigation'
import { DashboardContent } from './DashboardContent'
import { UserProfile } from './UserProfile'
import { Organizations } from './Organizations'
import { Documents } from './Documents'
import { Signatures } from './Signatures'

export type DashboardView = 'overview' | 'profile' | 'organizations' | 'documents' | 'signatures'

export function Dashboard() {
  const pathname = usePathname()

  const renderContent = () => {
    if (pathname === '/dashboard/profile') {
      return <UserProfile />
    }
    if (pathname === '/dashboard/organizations') {
      return <Organizations />
    }
    if (pathname === '/dashboard/documents') {
      return <Documents />
    }
    if (pathname === '/dashboard/signatures') {
      return <Signatures />
    }
    return <DashboardContent />
  }

  return (
    <div className='w-full h-full'>
      {renderContent()}
    </div>
  )
}
'use client'

import { DashboardView } from './Dashboard'
import { useAccount } from 'wagmi'
import { Button } from './ui/button'

interface DashboardSidebarProps {
  currentView: DashboardView
  onViewChange: (view: DashboardView) => void
}

export function DashboardSidebar({ currentView, onViewChange }: DashboardSidebarProps) {
  const { address } = useAccount()

  const menuItems = [
    { id: 'overview' as DashboardView, label: 'Overview', icon: '📊' },
    { id: 'profile' as DashboardView, label: 'Profile', icon: '👤' },
    { id: 'organizations' as DashboardView, label: 'Organizations', icon: '🏢' },
    { id: 'documents' as DashboardView, label: 'Documents', icon: '📄' },
    { id: 'signatures' as DashboardView, label: 'Signatures', icon: '✍️' },
  ]

  return (
    <div className='w-64 bg-card h-screen flex flex-col justify-between'>
      <div>
        <div className='p-6'>
          <h1 className='text-2xl font-bold'>sv3.network</h1>
          <p className='text-sm text-muted-foreground mt-1'>Decentralized Document Signing</p>
        </div>

        <nav className='mt-6'>
          <div className='px-6 py-2'>
            <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>Navigation</p>
          </div>

          <div className='mt-2 flex flex-col gap-2 px-4'>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? 'secondary' : 'ghost'}
                onClick={() => onViewChange(item.id)}
                className='w-full flex items-center justify-start px-6 py-3 text-left'>
                <span className='mr-3 text-lg'>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>
      </div>

      <div className='p-6 border-t'>
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-medium'>{address ? address.slice(2, 4).toUpperCase() : '??'}</span>
          </div>
          <div className='ml-3'>
            <p className='text-sm font-medium'>Connected</p>
            <p className='text-xs text-muted-foreground'>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
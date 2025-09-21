'use client'

import { DashboardView } from './Dashboard'
import { useAccount } from 'wagmi'

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
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">SignVault</h1>
        <p className="text-sm text-gray-500 mt-1">Decentralized Document Signing</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-6 py-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Navigation
          </p>
        </div>
        
        <div className="mt-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                currentView === item.id
                  ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700'
                  : 'text-gray-700'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {address ? address.slice(2, 4).toUpperCase() : '??'}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Connected</p>
            <p className="text-xs text-gray-500">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
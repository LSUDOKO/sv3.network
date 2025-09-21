'use client'

import { useState, useEffect } from 'react'

export function DashboardContent() {
  const [stats, setStats] = useState({
    documentsUploaded: 0,
    documentsToSign: 0,
    organizationsJoined: 0,
    signaturesCompleted: 0
  })

  // Mock data for now - in real app, fetch from contracts
  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        documentsUploaded: 12,
        documentsToSign: 3,
        organizationsJoined: 2,
        signaturesCompleted: 8
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const quickActions = [
    {
      title: 'Upload Document',
      description: 'Upload a new document for signing',
      icon: '📤',
      action: () => console.log('Upload document'),
      color: 'bg-blue-500'
    },
    {
      title: 'Create Organization',
      description: 'Start a new organization',
      icon: '🏢',
      action: () => console.log('Create organization'),
      color: 'bg-green-500'
    },
    {
      title: 'Sign Document',
      description: 'Sign pending documents',
      icon: '✍️',
      action: () => console.log('Sign document'),
      color: 'bg-purple-500'
    },
    {
      title: 'Verify Signature',
      description: 'Verify document authenticity',
      icon: '🔍',
      action: () => console.log('Verify signature'),
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your documents and signatures.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documents Uploaded</p>
              <p className="text-2xl font-bold text-gray-900">{stats.documentsUploaded}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Signatures</p>
              <p className="text-2xl font-bold text-gray-900">{stats.documentsToSign}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">🏢</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Organizations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.organizationsJoined}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Signatures Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.signaturesCompleted}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">📤</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Document uploaded</p>
                  <p className="text-xs text-gray-500">Contract_Agreement_2024.pdf • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">✍️</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Document signed</p>
                  <p className="text-xs text-gray-500">NDA_Template.pdf • 1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🏢</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Joined organization</p>
                  <p className="text-xs text-gray-500">TechCorp Inc. • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
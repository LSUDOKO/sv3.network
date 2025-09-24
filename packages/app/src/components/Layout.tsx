'use client'

import React, { PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'
import { Connect } from '@/components/Connect'
import { SidebarProviderWrapper } from './AppSidebar'

export function Layout(props: PropsWithChildren) {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className='flex flex-col min-h-screen'>
        <main className='grow flex items-center justify-center p-8'>
          <div className='glass-card rounded-2xl p-8 max-w-md w-full mx-4 animate-float'>
            <div className='text-center'>
              <h1 className='text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Welcome to sv3.network
              </h1>
              <p className='text-muted-foreground mb-6'>
                Connect your wallet to access the decentralized document signing platform
              </p>
              <div className='flex justify-center'>
                <Connect />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <SidebarProviderWrapper>{props.children}</SidebarProviderWrapper>
    </div>
  )
}

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
          <div className='rounded-2xl p-8 max-w-md w-full mx-4 border border-border bg-card shadow-sm animate-fade-in'>
            <div className='text-center space-y-6'>
              <div className='space-y-2'>
                <h1 className='text-4xl font-bold'>Welcome to sv3.network</h1>
                <p className='text-muted-foreground text-lg'>
                  Connect your wallet to access the decentralized document signing platform.
                </p>
              </div>
              <div className='flex justify-center'>
                <Connect />
              </div>
              <div className='text-sm text-muted-foreground'>Secure • Decentralized • Trustless</div>
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

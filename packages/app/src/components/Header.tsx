import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_EMOJI, SITE_NAME } from '@/utils/site'
import { Connect } from './Connect'
import { NotificationsDrawer } from './NotificationsDrawer'

export function Header() {
  return (
    <header className='border-b'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <LinkComponent href='/' className='flex items-center gap-2'>
            <span className='text-2xl font-bold'>{SITE_EMOJI}</span>
            <span className='font-semibold'>{SITE_NAME}</span>
          </LinkComponent>

          <div className='flex items-center gap-4'>
            <Connect />
            <NotificationsDrawer />
          </div>
        </div>
      </div>
    </header>
  )
}

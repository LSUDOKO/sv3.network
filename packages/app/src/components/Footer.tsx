import React from 'react'
import { SITE_EMOJI, SITE_INFO, SOCIAL_GITHUB, SOCIAL_TWITTER } from '@/utils/site'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { NetworkStatus } from './NetworkStatus'
import { LinkComponent } from './LinkComponent'

export function Footer() {
  return (
    <footer className='border-t'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <p className='text-muted-foreground'>
            {SITE_EMOJI} {SITE_INFO}
          </p>
          <div className='flex items-center gap-4'>
            <NetworkStatus />
            <LinkComponent
              href={`https://github.com/${SOCIAL_GITHUB}`}
              className='text-muted-foreground hover:text-foreground'>
              <FaGithub />
            </LinkComponent>
            <LinkComponent
              href={`https://twitter.com/${SOCIAL_TWITTER}`}
              className='text-muted-foreground hover:text-foreground'>
              <FaXTwitter />
            </LinkComponent>
          </div>
        </div>
      </div>
    </footer>
  )
}

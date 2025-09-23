'use client'

import React from 'react'
import { useBlockNumber, useAccount } from 'wagmi'
import { LinkComponent } from './LinkComponent'
import { Badge } from './ui/badge'

export function NetworkStatus() {
  const block = useBlockNumber({ watch: true })
  const { chain } = useAccount()
  const explorerUrl = chain?.blockExplorers?.default.url
  const networkName = chain?.name ?? 'Ethereum'

  return (
    <div className='flex items-center gap-2'>
      <Badge variant='outline'>{networkName}</Badge>
      {explorerUrl && (
        <LinkComponent href={explorerUrl} className='text-xs text-muted-foreground hover:text-foreground'>
          # {block.data?.toString()}
        </LinkComponent>
      )}
      {!explorerUrl && <p className='text-xs text-muted-foreground'># {block.data?.toString()}</p>}
    </div>
  )
}

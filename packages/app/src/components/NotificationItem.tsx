'use client'

import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { type NotificationType, type Notification } from '@/utils/types'
import { LinkComponent } from './LinkComponent'
import { TruncateMiddle } from '@/components/TruncateMiddle'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

dayjs.extend(relativeTime)

function getVariant(type: NotificationType): 'default' | 'destructive' {
  switch (type) {
    case 'success':
    case 'info':
      return 'default'
    case 'error':
    case 'warning':
      return 'destructive'
    default:
      return 'default'
  }
}

function getIcon(type: NotificationType) {
  const className = 'h-4 w-4'
  switch (type) {
    case 'success':
      return <CheckCircleIcon className={className} />
    case 'error':
      return <XCircleIcon className={className} />
    case 'warning':
      return <ExclamationTriangleIcon className={className} />
    case 'info':
    default:
      return <InformationCircleIcon className={className} />
  }
}

export function NotificationItem({ notification }: { notification: Notification }) {
  const { type, message, timestamp, href, from } = notification

  return (
    <Alert variant={getVariant(type)}>
      {getIcon(type)}
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription>
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-xs text-muted-foreground">{dayjs(timestamp).fromNow()}</span>
          {from && (
            <span className="text-xs text-muted-foreground">
              From: <TruncateMiddle content={from} />
            </span>
          )}
          {href && (
            <LinkComponent href={href} className="text-xs">
              View Details
            </LinkComponent>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}
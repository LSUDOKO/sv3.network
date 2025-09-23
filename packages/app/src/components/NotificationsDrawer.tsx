'use client'

import React from 'react'
import { BellIcon as BellOutline } from '@heroicons/react/24/outline'
import { BellIcon as BellSolid } from '@heroicons/react/24/solid'
import { useNotifications } from '@/context/Notifications'
import { NotificationItem } from './NotificationItem'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from './ui/button'

export function NotificationsDrawer() {
  const { notifications, Clear } = useNotifications()
  const className = 'shrink-0 h-5 w-5'

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          {notifications.length > 0 && <BellSolid className={className} />}
          {notifications.length === 0 && <BellOutline className={className} />}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {notifications.length === 0 ? 'No notifications' : `${notifications.length} Notification(s)`}
          </SheetTitle>
        </SheetHeader>
        {notifications.length > 0 && (
          <div className='flex flex-col gap-2 py-4'>
            {notifications.map((notification, index) => (
              <NotificationItem key={`notification_${index}_${notification.timestamp}`} notification={notification} />
            ))}
            <div className='pt-4 text-right'>
              <Button variant='link' onClick={Clear}>
                Clear notifications
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

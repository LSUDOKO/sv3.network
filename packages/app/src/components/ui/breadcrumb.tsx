'use client'

import * as React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: React.ReactNode
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}

function Breadcrumb({
  items,
  className,
  separator = <ChevronRight className='size-4' />,
  onItemClick,
}: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-1 text-sm', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className='text-muted-foreground mx-1'>{separator}</span>}
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              'h-auto p-0 text-sm font-normal',
              index === items.length - 1
                ? 'text-foreground cursor-default'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => onItemClick?.(item, index)}
            disabled={index === items.length - 1}>
            {item.icon && <span className='mr-1'>{item.icon}</span>}
            {item.label}
          </Button>
        </React.Fragment>
      ))}
    </nav>
  )
}

interface BreadcrumbWithHomeProps extends Omit<BreadcrumbProps, 'items'> {
  items: Omit<BreadcrumbItem, 'icon'>[]
  showHome?: boolean
}

function BreadcrumbWithHome({ items, showHome = true, ...props }: BreadcrumbWithHomeProps) {
  const breadcrumbItems = showHome ? [{ label: 'Home', icon: <Home className='size-4' />, href: '/' }, ...items] : items

  return <Breadcrumb items={breadcrumbItems} {...props} />
}

interface BreadcrumbCompactProps {
  currentPage: string
  parentPages?: Array<{
    label: string
    href?: string
  }>
  className?: string
  onNavigate?: (href: string) => void
}

function BreadcrumbCompact({ currentPage, parentPages = [], className, onNavigate }: BreadcrumbCompactProps) {
  const allPages = [...parentPages, { label: currentPage }]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {parentPages.length > 0 && (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => onNavigate?.(parentPages[parentPages.length - 1].href || '/')}
          className='text-muted-foreground hover:text-foreground'>
          ← Back
        </Button>
      )}
      <div className='flex items-center gap-1 text-sm text-muted-foreground'>
        {allPages.map((page, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className='size-3' />}
            <span className={index === allPages.length - 1 ? 'text-foreground font-medium' : ''}>{page.label}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export { Breadcrumb, BreadcrumbWithHome, BreadcrumbCompact }

'use client'

import React from 'react'

interface TruncateMiddleProps {
  content: string
  maxLength?: number
  className?: string
}

export function TruncateMiddle({ content, maxLength = 20, className = '' }: TruncateMiddleProps) {
  if (content.length <= maxLength) {
    return <span className={className}>{content}</span>
  }

  const start = Math.ceil(maxLength / 2) - 2
  const end = Math.floor(maxLength / 2) - 2
  
  const truncated = `${content.slice(0, start)}...${content.slice(-end)}`
  
  return (
    <span className={className} title={content}>
      {truncated}
    </span>
  )
}
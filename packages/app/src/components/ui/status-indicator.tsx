"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, AlertCircle, Clock, Loader2 } from "lucide-react"

interface StatusIndicatorProps {
  status: "success" | "error" | "warning" | "pending" | "loading"
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  className?: string
  children?: React.ReactNode
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    className: "text-green-600 dark:text-green-400",
    bgClassName: "bg-green-50 dark:bg-green-900/20",
    borderClassName: "border-green-200 dark:border-green-800"
  },
  error: {
    icon: XCircle,
    className: "text-red-600 dark:text-red-400",
    bgClassName: "bg-red-50 dark:bg-red-900/20",
    borderClassName: "border-red-200 dark:border-red-800"
  },
  warning: {
    icon: AlertCircle,
    className: "text-yellow-600 dark:text-yellow-400",
    bgClassName: "bg-yellow-50 dark:bg-yellow-900/20",
    borderClassName: "border-yellow-200 dark:border-yellow-800"
  },
  pending: {
    icon: Clock,
    className: "text-blue-600 dark:text-blue-400",
    bgClassName: "bg-blue-50 dark:bg-blue-900/20",
    borderClassName: "border-blue-200 dark:border-blue-800"
  },
  loading: {
    icon: Loader2,
    className: "text-primary",
    bgClassName: "bg-muted",
    borderClassName: "border-border"
  }
}

function StatusIndicator({ 
  status, 
  size = "md", 
  showIcon = true, 
  className,
  children 
}: StatusIndicatorProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  }

  const iconSizeClasses = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5"
  }

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border",
        config.bgClassName,
        config.borderClassName,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <Icon 
          className={cn(
            iconSizeClasses[size],
            config.className,
            status === "loading" && "animate-spin"
          )} 
        />
      )}
      {children}
    </div>
  )
}

interface StatusBadgeProps {
  status: "success" | "error" | "warning" | "pending" | "loading"
  text: string
  size?: "sm" | "md" | "lg"
  className?: string
}

function StatusBadge({ status, text, size = "md", className }: StatusBadgeProps) {
  return (
    <StatusIndicator status={status} size={size} className={className}>
      {text}
    </StatusIndicator>
  )
}

interface StatusDotProps {
  status: "success" | "error" | "warning" | "pending" | "loading"
  size?: "sm" | "md" | "lg"
  className?: string
}

function StatusDot({ status, size = "md", className }: StatusDotProps) {
  const config = statusConfig[status]
  
  const sizeClasses = {
    sm: "size-2",
    md: "size-3",
    lg: "size-4"
  }

  return (
    <div 
      className={cn(
        "rounded-full",
        sizeClasses[size],
        config.bgClassName,
        status === "loading" && "animate-pulse",
        className
      )}
    />
  )
}

export { StatusIndicator, StatusBadge, StatusDot }

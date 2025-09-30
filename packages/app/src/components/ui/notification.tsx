"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "./button"

interface NotificationProps {
  id: string
  title: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: (id: string) => void
  className?: string
}

const notificationConfig = {
  success: {
    icon: CheckCircle,
    className: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
    iconClassName: "text-green-600 dark:text-green-400"
  },
  error: {
    icon: AlertCircle,
    className: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
    iconClassName: "text-red-600 dark:text-red-400"
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
    iconClassName: "text-yellow-600 dark:text-yellow-400"
  },
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
    iconClassName: "text-blue-600 dark:text-blue-400"
  }
}

function Notification({ 
  id, 
  title, 
  description, 
  type = "info", 
  onClose, 
  className 
}: NotificationProps) {
  const config = notificationConfig[type]
  const Icon = config.icon

  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-sm animate-slide-up",
        config.className,
        className
      )}
    >
      <Icon className={cn("size-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm">{title}</h4>
        {description && (
          <p className="text-sm opacity-90 mt-1">{description}</p>
        )}
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onClose(id)}
          className="flex-shrink-0 opacity-70 hover:opacity-100"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}

interface NotificationContainerProps {
  notifications: NotificationProps[]
  onClose?: (id: string) => void
  className?: string
}

function NotificationContainer({ 
  notifications, 
  onClose, 
  className 
}: NotificationContainerProps) {
  if (notifications.length === 0) return null

  return (
    <div className={cn("space-y-2", className)}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={onClose}
        />
      ))}
    </div>
  )
}

interface ToastProps {
  title: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

function Toast({ 
  title, 
  description, 
  type = "info", 
  action, 
  className 
}: ToastProps) {
  const config = notificationConfig[type]
  const Icon = config.icon

  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm animate-slide-up max-w-sm",
        config.className,
        className
      )}
    >
      <Icon className={cn("size-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm">{title}</h4>
        {description && (
          <p className="text-sm opacity-90 mt-1">{description}</p>
        )}
        {action && (
          <Button
            variant="ghost"
            size="sm"
            onClick={action.onClick}
            className="mt-2 h-auto p-0 text-sm font-medium"
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}

export { Notification, NotificationContainer, Toast }

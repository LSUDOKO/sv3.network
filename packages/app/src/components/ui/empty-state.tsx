"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  secondaryAction, 
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12 px-6", className)}>
      <div className="max-w-md mx-auto space-y-6">
        {icon && (
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {action && (
              <Button onClick={action.onClick} className="btn-primary-glass">
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface EmptyStateWithIllustrationProps extends EmptyStateProps {
  illustration: string
  illustrationAlt?: string
}

function EmptyStateWithIllustration({ 
  illustration, 
  illustrationAlt = "Empty state illustration", 
  ...props 
}: EmptyStateWithIllustrationProps) {
  return (
    <div className="text-center py-12 px-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center">
          <img 
            src={illustration} 
            alt={illustrationAlt}
            className="w-32 h-32 object-contain"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{props.title}</h3>
          {props.description && (
            <p className="text-muted-foreground">{props.description}</p>
          )}
        </div>
        {(props.action || props.secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {props.action && (
              <Button onClick={props.action.onClick} className="btn-primary-glass">
                {props.action.label}
              </Button>
            )}
            {props.secondaryAction && (
              <Button variant="outline" onClick={props.secondaryAction.onClick}>
                {props.secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface EmptyStateGridProps {
  items: Array<{
    id: string
    title: string
    description?: string
    icon?: React.ReactNode
    action?: {
      label: string
      onClick: () => void
    }
  }>
  className?: string
}

function EmptyStateGrid({ items, className }: EmptyStateGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {items.map((item) => (
        <div 
          key={item.id}
          className="p-6 border border-border rounded-lg hover:shadow-md transition-all-300 group"
        >
          <div className="space-y-4">
            {item.icon && (
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:scale-110 transition-all-300">
                {item.icon}
              </div>
            )}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
            {item.action && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={item.action.onClick}
                className="w-full"
              >
                {item.action.label}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export { EmptyState, EmptyStateWithIllustration, EmptyStateGrid }

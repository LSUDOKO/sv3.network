"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, Circle } from "lucide-react"

interface Step {
  id: string
  title: string
  description?: string
  completed?: boolean
  current?: boolean
}

interface ProgressIndicatorProps {
  steps: Step[]
  orientation?: "horizontal" | "vertical"
  className?: string
}

function ProgressIndicator({ 
  steps, 
  orientation = "horizontal", 
  className 
}: ProgressIndicatorProps) {
  return (
    <div 
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row items-center" : "flex-col",
        className
      )}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div 
              className={cn(
                "flex items-center justify-center size-8 rounded-full border-2 transition-all-300",
                step.completed 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : step.current
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-muted border-muted-foreground/30 text-muted-foreground"
              )}
            >
              {step.completed ? (
                <CheckCircle className="size-4" />
              ) : (
                <span className="text-sm font-medium">
                  {index + 1}
                </span>
              )}
            </div>
            <div className="ml-3 min-w-0">
              <div 
                className={cn(
                  "text-sm font-medium",
                  step.completed || step.current 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </div>
              )}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "flex-1",
                orientation === "horizontal" 
                  ? "h-px mx-4" 
                  : "w-px h-8 my-2",
                steps[index + 1]?.completed 
                  ? "bg-primary" 
                  : "bg-muted-foreground/30"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

interface CircularProgressProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
  children?: React.ReactNode
}

function CircularProgress({ 
  value, 
  max = 100, 
  size = "md", 
  className,
  children 
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const sizeClasses = {
    sm: "size-16",
    md: "size-24", 
    lg: "size-32"
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg className="size-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-muted-foreground/30"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all-300"
          strokeLinecap="round"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}

interface LinearProgressProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
  showLabel?: boolean
}

function LinearProgress({ 
  value, 
  max = 100, 
  size = "md", 
  className,
  showLabel = false 
}: LinearProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  }

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div 
        className={cn(
          "w-full bg-muted-foreground/30 rounded-full overflow-hidden",
          sizeClasses[size]
        )}
      >
        <div 
          className="h-full bg-primary rounded-full transition-all-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export { ProgressIndicator, CircularProgress, LinearProgress }

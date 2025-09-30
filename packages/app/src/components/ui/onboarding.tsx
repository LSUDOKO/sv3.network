"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { ProgressIndicator } from "./progress-indicator"

interface OnboardingStep {
  id: string
  title: string
  description: string
  content: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  skipable?: boolean
}

interface OnboardingProps {
  steps: OnboardingStep[]
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
  className?: string
}

function Onboarding({ 
  steps, 
  isOpen, 
  onClose, 
  onComplete,
  className 
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set())

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.()
      onClose()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]))
    handleNext()
  }

  const progressSteps = steps.map((step, index) => ({
    id: step.id,
    title: step.title,
    completed: completedSteps.has(index) || index < currentStep,
    current: index === currentStep
  }))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 border-r border-border bg-muted/30 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Getting Started</h2>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onClose}
                >
                  <X className="size-4" />
                </Button>
              </div>
              
              <ProgressIndicator 
                steps={progressSteps}
                orientation="vertical"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">
                {currentStepData.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 p-6 pt-0">
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg">
                  {currentStepData.description}
                </p>
                
                <div className="min-h-[300px]">
                  {currentStepData.content}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!isFirstStep && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="size-4 mr-2" />
                      Previous
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {currentStepData.skipable && (
                    <Button
                      variant="ghost"
                      onClick={handleSkip}
                    >
                      Skip
                    </Button>
                  )}
                  
                  {currentStepData.action ? (
                    <Button onClick={handleStepComplete}>
                      {currentStepData.action.label}
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>
                      {isLastStep ? "Complete" : "Next"}
                      {!isLastStep && <ChevronRight className="size-4 ml-2" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface OnboardingTooltipProps {
  children: React.ReactNode
  title: string
  description: string
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

function OnboardingTooltip({ 
  children, 
  title, 
  description, 
  position = "top",
  className 
}: OnboardingTooltipProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <div 
        className={cn(
          "absolute z-50 w-64 p-4 bg-popover border border-border rounded-lg shadow-lg animate-slide-up",
          position === "top" && "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
          position === "bottom" && "top-full left-1/2 transform -translate-x-1/2 mt-2",
          position === "left" && "right-full top-1/2 transform -translate-y-1/2 mr-2",
          position === "right" && "left-full top-1/2 transform -translate-y-1/2 ml-2"
        )}
      >
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div 
          className={cn(
            "absolute w-2 h-2 bg-popover border border-border rotate-45",
            position === "top" && "top-full left-1/2 transform -translate-x-1/2 -mt-1",
            position === "bottom" && "bottom-full left-1/2 transform -translate-x-1/2 -mb-1",
            position === "left" && "left-full top-1/2 transform -translate-y-1/2 -ml-1",
            position === "right" && "right-full top-1/2 transform -translate-y-1/2 -mr-1"
          )}
        />
      </div>
    </div>
  )
}

export { Onboarding, OnboardingTooltip }

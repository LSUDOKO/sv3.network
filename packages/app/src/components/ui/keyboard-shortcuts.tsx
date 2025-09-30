"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"

interface KeyboardShortcut {
  keys: string[]
  description: string
  category?: string
}

interface KeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[]
  className?: string
}

function KeyboardShortcuts({ shortcuts, className }: KeyboardShortcutsProps) {
  const [open, setOpen] = React.useState(false)

  const groupedShortcuts = React.useMemo(() => {
    const groups: Record<string, KeyboardShortcut[]> = {}
    
    shortcuts.forEach(shortcut => {
      const category = shortcut.category || "General"
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(shortcut)
    })
    
    return groups
  }, [shortcuts])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          Keyboard Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          {keyIndex > 0 && (
                            <span className="text-muted-foreground">+</span>
                          )}
                          <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border">
                            {key}
                          </kbd>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface KeyboardShortcutDisplayProps {
  keys: string[]
  className?: string
}

function KeyboardShortcutDisplay({ keys, className }: KeyboardShortcutDisplayProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-muted-foreground text-xs">+</span>
          )}
          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border">
            {key}
          </kbd>
        </React.Fragment>
      ))}
    </div>
  )
}

export { KeyboardShortcuts, KeyboardShortcutDisplay }

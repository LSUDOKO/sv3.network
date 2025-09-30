"use client"

import * as React from "react"
import { Search, Command, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Command as CommandPrimitive } from "cmdk"
import { Dialog, DialogContent } from "./dialog"

interface CommandItem {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  keywords?: string[]
  action: () => void
  category?: string
}

interface CommandPaletteProps {
  items: CommandItem[]
  placeholder?: string
  className?: string
  onOpenChange?: (open: boolean) => void
}

function CommandPalette({ 
  items, 
  placeholder = "Search commands...", 
  className,
  onOpenChange 
}: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const filteredItems = React.useMemo(() => {
    if (!query) return items

    return items.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.keywords?.some(keyword => 
        keyword.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [items, query])

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    
    filteredItems.forEach(item => {
      const category = item.category || "General"
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(item)
    })
    
    return groups
  }, [filteredItems])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
    if (!newOpen) {
      setQuery("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <div className="flex items-center border-b border-border px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandPrimitive.Input
            value={query}
            onValueChange={setQuery}
            placeholder={placeholder}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                {category}
              </div>
              {categoryItems.map((item) => (
                <CommandPrimitive.Item
                  key={item.id}
                  value={item.title}
                  onSelect={() => {
                    item.action()
                    handleOpenChange(false)
                  }}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  {item.icon && (
                    <span className="mr-2 h-4 w-4">{item.icon}</span>
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-50" />
                </CommandPrimitive.Item>
              ))}
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          )}
        </CommandPrimitive.List>
      </DialogContent>
    </Dialog>
  )
}

interface CommandPaletteTriggerProps {
  children: React.ReactNode
  className?: string
}

function CommandPaletteTrigger({ children, className }: CommandPaletteTriggerProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "relative h-9 w-full justify-start rounded-md bg-muted text-sm font-normal text-muted-foreground shadow-none sm:pr-12",
        className
      )}
    >
      <Search className="mr-2 h-4 w-4" />
      <span className="hidden lg:inline-flex">Search commands...</span>
      <span className="inline-flex lg:hidden">Search...</span>
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  )
}

interface CommandPaletteProviderProps {
  children: React.ReactNode
  items: CommandItem[]
  onOpenChange?: (open: boolean) => void
}

function CommandPaletteProvider({ 
  children, 
  items, 
  onOpenChange 
}: CommandPaletteProviderProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      {children}
      <CommandPalette 
        items={items} 
        onOpenChange={(newOpen) => {
          setOpen(newOpen)
          onOpenChange?.(newOpen)
        }}
      />
    </>
  )
}

export { CommandPalette, CommandPaletteTrigger, CommandPaletteProvider }

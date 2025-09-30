"use client"

import * as React from "react"
import { Search, X, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface SearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  showFilters?: boolean
  onFilterClick?: () => void
  suggestions?: string[]
  onSuggestionClick?: (suggestion: string) => void
}

function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className,
  showFilters = false,
  onFilterClick,
  suggestions = [],
  onSuggestionClick
}: SearchProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClear = () => {
    onChange("")
    inputRef.current?.focus()
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setIsOpen(false)
    onSuggestionClick?.(suggestion)
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {value && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleClear}
              className="size-6"
            >
              <X className="size-3" />
            </Button>
          )}
          {showFilters && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onFilterClick}
              className="size-6"
            >
              <Filter className="size-3" />
            </Button>
          )}
        </div>
      </div>
      
      {suggestions.length > 0 && isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface SearchWithFiltersProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  filters?: Array<{
    key: string
    label: string
    options: Array<{
      value: string
      label: string
    }>
  }>
  activeFilters?: Record<string, string[]>
  onFilterChange?: (key: string, values: string[]) => void
}

function SearchWithFilters({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className,
  filters = [],
  activeFilters = {},
  onFilterChange
}: SearchWithFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)

  return (
    <div className={cn("flex gap-2", className)}>
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1"
      />
      {filters.length > 0 && (
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Filters</h4>
              {filters.map((filter) => (
                <div key={filter.key} className="space-y-2">
                  <label className="text-sm font-medium">{filter.label}</label>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={activeFilters[filter.key]?.includes(option.value) || false}
                          onChange={(e) => {
                            const currentValues = activeFilters[filter.key] || []
                            const newValues = e.target.checked
                              ? [...currentValues, option.value]
                              : currentValues.filter(v => v !== option.value)
                            onFilterChange?.(filter.key, newValues)
                          }}
                          className="rounded border-border"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

interface SearchResultsProps {
  query: string
  results: Array<{
    id: string
    title: string
    description?: string
    type?: string
    onClick?: () => void
  }>
  className?: string
}

function SearchResults({ query, results, className }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-muted-foreground">
          No results found for "{query}"
        </p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      {results.map((result) => (
        <button
          key={result.id}
          onClick={result.onClick}
          className="w-full text-left p-4 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{result.title}</h4>
              {result.type && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {result.type}
                </span>
              )}
            </div>
            {result.description && (
              <p className="text-sm text-muted-foreground">{result.description}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}

export { SearchInput, SearchWithFilters, SearchResults }

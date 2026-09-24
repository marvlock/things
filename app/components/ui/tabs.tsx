"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  baseId: string
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

const useTabs = () => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within Tabs")
  }
  return context
}

const getTabId = (baseId: string, value: string) => `${baseId}-tab-${value}`
const getPanelId = (baseId: string, value: string) => `${baseId}-panel-${value}`

interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value: controlledValue, onValueChange, children, className, ...props }, ref) => {
    const baseId = React.useId()
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
      defaultValue || ""
    )
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback((newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
    }, [isControlled, onValueChange])

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, baseId }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, onKeyDown, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    onKeyDown={(event) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return

      const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'))
      const currentIndex = tabs.indexOf(event.target as HTMLButtonElement)
      if (currentIndex < 0) return

      const nextIndex = event.key === "ArrowRight" ? (currentIndex + 1) % tabs.length
        : event.key === "ArrowLeft" ? (currentIndex - 1 + tabs.length) % tabs.length
        : event.key === "Home" ? 0
        : event.key === "End" ? tabs.length - 1
        : -1

      if (nextIndex >= 0) {
        event.preventDefault()
        tabs[nextIndex].focus()
        tabs[nextIndex].click()
      }
    }}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md border-2 border-foreground bg-muted p-1 neobrutalism-shadow",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, baseId } = useTabs()
    const isActive = selectedValue === value

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={getTabId(baseId, value)}
        aria-controls={getPanelId(baseId, value)}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => onValueChange(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-background hover:text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, baseId } = useTabs()
    const isActive = selectedValue === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={getPanelId(baseId, value)}
        aria-labelledby={getTabId(baseId, value)}
        tabIndex={0}
        className={cn(
          "mt-2 focus-visible:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }

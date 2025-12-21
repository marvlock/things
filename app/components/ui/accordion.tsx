"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  value: string[]
  onValueChange: (value: string[]) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

const useAccordion = () => {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within Accordion")
  }
  return context
}

const AccordionItemContext = React.createContext<{ value: string } | undefined>(undefined)

const useAccordionItem = () => {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionTrigger and AccordionContent must be used within AccordionItem")
  }
  return context
}

interface AccordionProps {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  className?: string
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", defaultValue, value: controlledValue, onValueChange, children, className, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
      () => {
        if (defaultValue === undefined) return []
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      }
    )
    const isControlled = controlledValue !== undefined
    const value = isControlled
      ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
      : uncontrolledValue

    const handleValueChange = React.useCallback((newValue: string[]) => {
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      if (onValueChange) {
        onValueChange(type === "single" ? (newValue[0] || "") : newValue)
      }
    }, [isControlled, onValueChange, type])

    return (
      <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          className={cn("border-2 border-foreground rounded-lg neobrutalism-shadow overflow-hidden", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionItem()
    const { value: openValues, onValueChange, type } = useAccordion()
    const isOpen = openValues.includes(value)

    const handleClick = () => {
      if (type === "single") {
        onValueChange(isOpen ? [] : [value])
      } else {
        onValueChange(
          isOpen
            ? openValues.filter((v) => v !== value)
            : [...openValues, value]
        )
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between bg-primary text-primary-foreground p-4 font-bold transition-colors hover:bg-primary/90",
          className
        )}
        {...props}
      >
        {children}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    )
  }
)
AccordionTrigger.displayName = "AccordionTrigger"

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionItem()
    const { value: openValues } = useAccordion()
    const isOpen = openValues.includes(value)

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
        {...props}
      >
        <div className={cn("p-4 bg-background border-t-2 border-foreground", className)}>
          {children}
        </div>
      </div>
    )
  }
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }


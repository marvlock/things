"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface SelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value?: string
  onValueChange?: (value: string) => void
  triggerRef: React.RefObject<HTMLElement>
  registerItem: (value: string, label: string) => void
  getLabel: (value: string) => string | undefined
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined)

const useSelect = () => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within Select")
  }
  return context
}

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

const Select = ({ value: controlledValue, defaultValue, onValueChange, children }: SelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)
  const valueToLabelMap = React.useRef<Map<string, string>>(new Map())

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const registerItem = React.useCallback((itemValue: string, label: string) => {
    valueToLabelMap.current.set(itemValue, label)
  }, [])

  const getLabel = React.useCallback((itemValue: string) => {
    return valueToLabelMap.current.get(itemValue)
  }, [])

  const handleValueChange = React.useCallback((newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }, [isControlled, onValueChange])

  React.useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      const portalContent = document.querySelector('[data-select-content]')
      
      if (
        portalContent &&
        !portalContent.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick, true)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onValueChange: handleValueChange, triggerRef, registerItem, getLabel }}>
      {children}
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    const { open, setOpen, triggerRef: contextTriggerRef } = useSelect()
    const localTriggerRef = React.useRef<HTMLButtonElement>(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current as HTMLButtonElement)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        (contextTriggerRef as React.MutableRefObject<HTMLElement | null>).current = localTriggerRef.current
      }
    }, [contextTriggerRef])

    const handleClick = () => {
      setOpen(!open)
    }

    return (
      <button
        ref={localTriggerRef}
        onClick={handleClick}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm font-bold ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
          className
        )}
        {...props}
      >
        {children || <span className="text-muted-foreground">{placeholder || "Select an option"}</span>}
        <span className={cn("transition-transform", open && "rotate-180")}>▼</span>
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectValueProps {
  placeholder?: string
}

const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { value, getLabel } = useSelect()
  if (!value) {
    return <>{placeholder || "Select an option"}</>
  }
  const label = getLabel(value)
  return <>{label || value}</>
}
SelectValue.displayName = "SelectValue"

type SelectContentProps = React.HTMLAttributes<HTMLDivElement>

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, triggerRef } = useSelect()
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (!open || !contentRef.current || !triggerRef.current) return

      const content = contentRef.current
      const trigger = triggerRef.current

      const triggerRect = trigger.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = triggerRect.bottom + 4
      let left = triggerRect.left

      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8
      }
      if (left < 8) left = 8
      if (top + contentRect.height > viewportHeight) {
        top = triggerRect.top - contentRect.height - 4
      }
      if (top < 8) top = 8

      content.style.position = "fixed"
      content.style.top = `${top}px`
      content.style.left = `${left}px`
    }, [open, triggerRef])

    if (!open) return null

    const content = (
      <div
        ref={contentRef}
        data-select-content
        className={cn(
          "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border-2 border-foreground bg-background neobrutalism-shadow",
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
SelectContent.displayName = "SelectContent"

type SelectViewportProps = React.HTMLAttributes<HTMLDivElement>

const SelectViewport = React.forwardRef<HTMLDivElement, SelectViewportProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-1", className)}
      {...props}
    />
  )
)
SelectViewport.displayName = "SelectViewport"

interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, registerItem } = useSelect()
    const isSelected = selectedValue === value
    const labelRef = React.useRef<string>()

    React.useEffect(() => {
      const label = typeof children === "string" ? children : (React.isValidElement(children) ? children.props?.children : null) || value
      labelRef.current = label
      registerItem(value, label)
    }, [value, children, registerItem])

    const handleClick = () => {
      onValueChange?.(value)
    }

    return (
      <button
        ref={ref}
        data-select-item-value={value}
        onClick={handleClick}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm font-bold outline-none transition-colors",
          "focus:bg-accent focus:text-accent-foreground",
          isSelected && "bg-accent text-accent-foreground",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SelectItem.displayName = "SelectItem"

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement>

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-bold", className)}
      {...props}
    />
  )
)
SelectLabel.displayName = "SelectLabel"

type SelectGroupProps = React.HTMLAttributes<HTMLDivElement>

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-1", className)}
      {...props}
    />
  )
)
SelectGroup.displayName = "SelectGroup"

type SelectSeparatorProps = React.HTMLAttributes<HTMLDivElement>

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("my-1 h-px bg-foreground", className)}
      {...props}
    />
  )
)
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
}


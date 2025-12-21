"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
} from "@/app/components/ui/select"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function SelectDocsPage() {
  const [value, setValue] = React.useState<string>()

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Select</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Displays a list of options for the user to pick from.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Select component provides a dropdown menu for selecting a single value from a list of options.
            It supports groups, labels, separators, and keyboard navigation.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/select.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface SelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value?: string
  onValueChange?: (value: string) => void
  triggerRef: React.RefObject<HTMLElement>
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

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

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
    <SelectContext.Provider value={{ open, setOpen, value, onValueChange: handleValueChange, triggerRef }}>
      {children}
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    const { open, setOpen, value, triggerRef: contextTriggerRef } = useSelect()
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
        <span className={cn(!value && "text-muted-foreground")}>
          {value ? children : placeholder || "Select an option"}
        </span>
        <span className={cn("transition-transform", open && "rotate-180")}>▼</span>
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

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
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
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

interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useSelect()
    const isSelected = selectedValue === value

    const handleClick = () => {
      onValueChange?.(value)
    }

    return (
      <button
        ref={ref}
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

interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

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

interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

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

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/select.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const SelectContext = React.createContext(undefined)

const useSelect = () => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within Select")
  }
  return context
}

const Select = ({ value: controlledValue, defaultValue, onValueChange, children }) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef(null)
  const valueToLabelMap = React.useRef(new Map())

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const registerItem = React.useCallback((itemValue, label) => {
    valueToLabelMap.current.set(itemValue, label)
  }, [])

  const getLabel = React.useCallback((itemValue) => {
    return valueToLabelMap.current.get(itemValue)
  }, [])

  const handleValueChange = React.useCallback((newValue) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }, [isControlled, onValueChange])

  React.useEffect(() => {
    if (!open) return

    const handleClick = (e) => {
      const target = e.target
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

    const handleEscape = (e) => {
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

const SelectTrigger = React.forwardRef(
  ({ className, placeholder, children, ...props }, ref) => {
    const { open, setOpen, triggerRef: contextTriggerRef } = useSelect()
    const localTriggerRef = React.useRef(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        contextTriggerRef.current = localTriggerRef.current
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

const SelectValue = ({ placeholder }) => {
  const { value, getLabel } = useSelect()
  if (!value) {
    return <>{placeholder || "Select an option"}</>
  }
  const label = getLabel(value)
  return <>{label || value}</>
}
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open, triggerRef } = useSelect()
    const contentRef = React.useRef(null)

    React.useImperativeHandle(ref, () => contentRef.current)

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
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
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

const SelectItem = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, registerItem } = useSelect()
    const isSelected = selectedValue === value
    const labelRef = React.useRef()

    React.useEffect(() => {
      const label = typeof children === "string" ? children : children?.props?.children || value
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

const SelectLabel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-bold", className)}
      {...props}
    />
  )
)
SelectLabel.displayName = "SelectLabel"

const SelectGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-1", className)}
      {...props}
    />
  )
)
SelectGroup.displayName = "SelectGroup"

const SelectSeparator = React.forwardRef(
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
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
}`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import * as React from "react"

function MyComponent() {
  const [value, setValue] = React.useState<string>()

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger placeholder="Select a fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useState } from "react"

function MyComponent() {
  const [value, setValue] = useState()

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger placeholder="Select a fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Default</h3>
              <Select value={value} onValueChange={setValue}>
                <SelectTrigger placeholder="Select a fruit">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With Multiple Groups</h3>
              <Select>
                <SelectTrigger placeholder="Select an option">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Vegetables</SelectLabel>
                    <SelectItem value="carrot">Carrot</SelectItem>
                    <SelectItem value="broccoli">Broccoli</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/sheet">
            <Button variant="outline" size="lg">
              ← Sheet
            </Button>
          </Link>
          <Link href="/docs/components/slider">
            <Button variant="outline" size="lg">
              Slider →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  DatePicker,
  DatePickerInput,
  DatePickerContent,
} from "@/app/components/ui/date-picker"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function DatePickerDocsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 11, 21))

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Date Picker</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A date picker component with calendar popup.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Date Picker component combines an input field with a calendar popup. Users can click 
            the input or calendar icon to open a calendar and select a date. It features bold borders 
            and shadows that match the Things design system. Built from scratch using React and native 
            HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/date-picker.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { Calendar } from "./calendar"
import { Input } from "./input"

interface DatePickerContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value: Date | undefined
  setValue: (date: Date | undefined) => void
}

const DatePickerContext = React.createContext<DatePickerContextValue | undefined>(undefined)

const useDatePicker = () => {
  const context = React.useContext(DatePickerContext)
  if (!context) {
    throw new Error("DatePicker components must be used within DatePicker")
  }
  return context
}

interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value: controlledValue, defaultValue, onValueChange, placeholder = "Pick a date", disabled = false, children, className, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(defaultValue)
    const [open, setOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback((newValue: Date | undefined) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
      setOpen(false)
    }, [disabled, isControlled, onValueChange])

    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    React.useEffect(() => {
      if (!open) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false)
        }
      }

      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [open])

    return (
      <DatePickerContext.Provider value={{
        open,
        setOpen,
        value,
        setValue: handleValueChange,
      }}>
        <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
          {children}
        </div>
      </DatePickerContext.Provider>
    )
  }
)
DatePicker.displayName = "DatePicker"

interface DatePickerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const DatePickerInput = React.forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({ className, placeholder, ...props }, ref) => {
    const { open, setOpen, value } = useDatePicker()
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const formatDate = (date: Date | undefined): string => {
      if (!date) return ""
      const month = date.toLocaleString("default", { month: "short" })
      const day = date.getDate()
      const year = date.getFullYear()
      return \`\${month} \${day}, \${year}\`
    }

    return (
      <div className="relative">
        <Input
          ref={inputRef}
          readOnly
          value={value ? formatDate(value) : ""}
          placeholder={placeholder}
          onClick={() => setOpen(!open)}
          className={cn("pl-10 cursor-pointer", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    )
  }
)
DatePickerInput.displayName = "DatePickerInput"

interface DatePickerContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DatePickerContent = React.forwardRef<HTMLDivElement, DatePickerContentProps>(
  ({ className, ...props }, ref) => {
    const { open, setOpen, value, setValue } = useDatePicker()
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (!open || !contentRef.current) return

      const content = contentRef.current
      const container = content.parentElement?.parentElement
      if (!container) return

      const input = container.querySelector("input")
      if (!input) return

      const inputRect = input.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = inputRect.bottom + 8
      let left = inputRect.left

      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8
      }
      if (top + contentRect.height > viewportHeight) {
        top = inputRect.top - contentRect.height - 8
      }
      if (left < 8) left = 8
      if (top < 8) top = 8

      content.style.position = "fixed"
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
    }, [open])

    if (!open) return null

    const content = (
      <div
        ref={contentRef}
        className={cn(
          "absolute z-50 rounded-lg border-2 border-foreground bg-background neobrutalism-shadow",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <div className="bg-background text-foreground">
          <Calendar
            value={value}
            onValueChange={setValue}
            className="bg-background text-foreground [&_button]:bg-background [&_button]:text-foreground [&_button:hover]:bg-muted [&_button[disabled]]:bg-muted/50 [&_button[disabled]]:text-muted-foreground"
          />
        </div>
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
DatePickerContent.displayName = "DatePickerContent"

export { DatePicker, DatePickerInput, DatePickerContent }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/date-picker.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { Calendar } from "./calendar"
import { Input } from "./input"

const DatePickerContext = React.createContext(undefined)

const useDatePicker = () => {
  const context = React.useContext(DatePickerContext)
  if (!context) {
    throw new Error("DatePicker components must be used within DatePicker")
  }
  return context
}

const DatePicker = React.forwardRef(
  ({ value: controlledValue, defaultValue, onValueChange, placeholder = "Pick a date", disabled = false, children, className, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const [open, setOpen] = React.useState(false)
    const containerRef = React.useRef(null)
    const contentRef = React.useRef(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback((newValue) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
      setOpen(false)
    }, [disabled, isControlled, onValueChange])

    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (event) => {
        if (
          containerRef.current && !containerRef.current.contains(event.target) &&
          contentRef.current && !contentRef.current.contains(event.target)
        ) {
          setOpen(false)
        }
      }

      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside)
      }, 100)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open])

    React.useEffect(() => {
      if (!open) return

      const handleEscape = (e) => {
        if (e.key === "Escape") {
          setOpen(false)
        }
      }

      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [open])

    return (
      <DatePickerContext.Provider value={{
        open,
        setOpen,
        value,
        setValue: handleValueChange,
      }}>
        <div ref={ref} className={cn("relative w-full", className)} {...props}>
          <div ref={containerRef}>
            {children}
          </div>
          {open && ReactDOM.createPortal(
            <DatePickerContent ref={contentRef} />,
            document.body
          )}
        </div>
      </DatePickerContext.Provider>
    )
  }
)
DatePicker.displayName = "DatePicker"

const DatePickerInput = React.forwardRef(
  ({ className, placeholder, ...props }, ref) => {
    const { open, setOpen, value } = useDatePicker()
    const inputRef = React.useRef(null)

    React.useImperativeHandle(ref, () => inputRef.current)

    const formatDate = (date) => {
      if (!date) return ""
      const month = date.toLocaleString("default", { month: "short" })
      const day = date.getDate()
      const year = date.getFullYear()
      return \`\${month} \${day}, \${year}\`
    }

    return (
      <div className="relative">
        <Input
          ref={inputRef}
          readOnly
          value={value ? formatDate(value) : ""}
          placeholder={placeholder}
          onClick={() => setOpen(!open)}
          className={cn("pl-10 cursor-pointer", className)}
          disabled={props.disabled}
          {...props}
        />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          disabled={props.disabled}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    )
  }
)
DatePickerInput.displayName = "DatePickerInput"

const DatePickerContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { value, setValue } = useDatePicker()

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 rounded-lg border-2 border-foreground bg-background neobrutalism-shadow",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        data-date-picker-content
        {...props}
      >
        <div className="bg-background text-foreground">
          <Calendar
            value={value}
            onValueChange={setValue}
            className="bg-background text-foreground [&_button]:bg-background [&_button]:text-foreground [&_button:hover]:bg-muted [&_button[disabled]]:bg-muted/50 [&_button[disabled]]:text-muted-foreground"
          />
        </div>
      </div>
    )
  }
)
DatePickerContent.displayName = "DatePickerContent"

export { DatePicker, DatePickerInput, DatePickerContent }`}
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
  DatePicker,
  DatePickerInput,
  DatePickerContent,
} from "@/components/ui/date-picker"
import { useState } from "react"

function MyComponent() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerInput placeholder="Pick a date" />
      <DatePickerContent />
    </DatePicker>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  DatePicker,
  DatePickerInput,
  DatePickerContent,
} from "@/components/ui/date-picker"
import { useState } from "react"

function MyComponent() {
  const [date, setDate] = useState(undefined)

  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerInput placeholder="Pick a date" />
      <DatePickerContent />
    </DatePicker>
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function, and the 
            <code className="bg-muted px-1 py-0.5 rounded">components/ui/calendar.tsx</code> and 
            <code className="bg-muted px-1 py-0.5 rounded">components/ui/input.tsx</code> components.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-6">
            <DatePicker value={date} onValueChange={setDate}>
              <DatePickerInput placeholder="Pick a date" />
              <DatePickerContent />
            </DatePicker>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/data-table">
            <Button variant="outline" size="lg">
              ← Data Table
            </Button>
          </Link>
          <Link href="/docs/components/dialog">
            <Button variant="outline" size="lg">
              Dialog →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


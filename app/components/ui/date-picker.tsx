"use client"

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
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value: controlledValue, defaultValue, onValueChange, disabled = false, children, className, ...props }) => {
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
      if (newValue !== undefined) {
        setOpen(false)
      }
    }, [disabled, isControlled, onValueChange])

    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node
        const portalContent = document.querySelector('[data-date-picker-content]')
        const isClickInsideContainer = containerRef.current?.contains(target)
        const isClickInsidePortal = portalContent?.contains(target)
        
        if (!isClickInsideContainer && !isClickInsidePortal) {
          setOpen(false)
        }
      }

      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside, true)
      }, 100)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener("mousedown", handleClickOutside, true)
      }
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

type DatePickerInputProps = React.InputHTMLAttributes<HTMLInputElement>

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
      return `${month} ${day}, ${year}`
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

type DatePickerContentProps = React.HTMLAttributes<HTMLDivElement>

const DatePickerContent = React.forwardRef<HTMLDivElement, DatePickerContentProps>(
  ({ className, ...props }, ref) => {
    const { open, value, setValue } = useDatePicker()
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
      content.style.top = `${top}px`
      content.style.left = `${left}px`
    }, [open])

    if (!open) return null

    const handleCalendarChange = (date: Date | undefined) => {
      setValue(date)
    }

    const content = (
      <div
        ref={contentRef}
        data-date-picker-content
        className={cn(
          "absolute z-50 rounded-lg border-2 border-foreground bg-background neobrutalism-shadow",
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <div className="bg-background text-foreground">
          <Calendar
            value={value}
            onValueChange={handleCalendarChange}
            className="bg-background text-foreground [&_button]:bg-background [&_button]:text-foreground [&_button:hover]:bg-muted [&_button[disabled]]:bg-muted/50 [&_button[disabled]]:text-muted-foreground"
          />
        </div>
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
DatePickerContent.displayName = "DatePickerContent"

export { DatePicker, DatePickerInput, DatePickerContent }


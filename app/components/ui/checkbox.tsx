"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? false)

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked)
      }
    }, [checked])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      setIsChecked(e.target.checked)
      onChange?.(e)
    }

    return (
      <label
        className={cn(
          "relative inline-flex h-5 w-5 items-center justify-center cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-sm border-2 border-foreground bg-background transition-colors neobrutalism-shadow-sm",
            isChecked && "bg-primary border-primary",
            disabled && "cursor-not-allowed"
          )}
        >
          {isChecked && (
            <svg
              className="h-3 w-3 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </span>
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }


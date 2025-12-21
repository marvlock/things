"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, length = 6, value = "", onChange, disabled = false, autoFocus = false, ...props }, ref) => {
    const [values, setValues] = React.useState<string[]>(() => {
      const initial = value.split("").slice(0, length)
      return Array.from({ length }, (_, i) => initial[i] || "")
    })
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    React.useEffect(() => {
      const newValues = value.split("").slice(0, length)
      const padded = Array.from({ length }, (_, i) => newValues[i] || "")
      setValues(padded)
    }, [value, length])

    const handleChange = (index: number, newValue: string) => {
      if (disabled) return

      const digit = newValue.slice(-1)
      if (digit && !/^\d$/.test(digit)) return

      const newValues = [...values]
      newValues[index] = digit
      setValues(newValues)

      const otpValue = newValues.join("")
      onChange?.(otpValue)

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === "Backspace") {
        if (!values[index] && index > 0) {
          inputRefs.current[index - 1]?.focus()
        } else {
          const newValues = [...values]
          newValues[index] = ""
          setValues(newValues)
          const otpValue = newValues.join("")
          onChange?.(otpValue)
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault()
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault()
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return

      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").slice(0, length)
      const digits = pastedData.split("").filter(char => /^\d$/.test(char)).slice(0, length)
      
      const newValues = Array.from({ length }, (_, i) => digits[i] || "")
      setValues(newValues)
      
      const otpValue = newValues.join("")
      onChange?.(otpValue)

      const nextIndex = Math.min(digits.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    }

    const handleFocus = (index: number) => {
      inputRefs.current[index]?.select()
    }

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, [autoFocus])

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {Array.from({ length }).map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              disabled={disabled}
              className={cn(
                "flex h-12 w-12 rounded-md border-2 border-foreground bg-background text-center text-lg font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
                className
              )}
              aria-label={`Digit ${index + 1} of ${length}`}
            />
            {index === 2 && (
              <span className="text-foreground text-xl font-bold">.</span>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

type InputOTPGroupProps = React.HTMLAttributes<HTMLDivElement>

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  )
)
InputOTPGroup.displayName = "InputOTPGroup"

interface InputOTPSlotProps extends React.InputHTMLAttributes<HTMLInputElement> {
  index: number
}

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-12 w-12 rounded-md border-2 border-foreground bg-background text-center text-lg font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
        className
      )}
      {...props}
    />
  )
)
InputOTPSlot.displayName = "InputOTPSlot"

type InputOTPSeparatorProps = React.HTMLAttributes<HTMLDivElement>

const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-1 w-1 rounded-full bg-foreground", className)}
      {...props}
    />
  )
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
}


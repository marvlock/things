"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupContextValue {
  value?: string
  onValueChange?: (value: string) => void
  name?: string
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined)

const useRadioGroup = () => {
  const context = React.useContext(RadioGroupContext)
  return context
}

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value: controlledValue, defaultValue, onValueChange, disabled, name, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)
    
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback((newValue: string) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
    }, [disabled, isControlled, onValueChange])

    const generatedId = React.useId()
    const groupName = name || generatedId

    return (
      <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange, name: groupName }}>
        <div
          ref={ref}
          className={cn("space-y-2", className)}
          role="radiogroup"
          {...props}
        />
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  value: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, disabled, ...props }, ref) => {
    const context = useRadioGroup()
    const isChecked = context?.value === value
    const isDisabled = disabled || false

    const handleChange = () => {
      if (!isDisabled) {
        context?.onValueChange?.(value)
      }
    }

    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          type="radio"
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={isDisabled}
          name={context?.name}
          className="sr-only"
          {...props}
        />
        <button
          type="button"
          role="radio"
          aria-checked={isChecked}
          disabled={isDisabled}
          onClick={handleChange}
          className={cn(
            "relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-foreground transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isDisabled && "opacity-50 cursor-not-allowed",
            !isDisabled && "cursor-pointer hover:bg-muted",
            className
          )}
        >
          {isChecked && (
            <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          )}
        </button>
      </div>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

type RadioGroupIndicatorProps = React.HTMLAttributes<HTMLDivElement>

const RadioGroupIndicator = React.forwardRef<HTMLDivElement, RadioGroupIndicatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-2.5 w-2.5 rounded-full bg-foreground", className)}
      {...props}
    />
  )
)
RadioGroupIndicator.displayName = "RadioGroupIndicator"

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
}


"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, defaultValue, onValueChange, min = 0, max = 100, step = 1, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number>(
      value?.[0] ?? defaultValue?.[0] ?? Number(min)
    )

    React.useEffect(() => {
      if (value !== undefined && value[0] !== undefined) {
        setInternalValue(value[0])
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      const newValue = Number(e.target.value)
      setInternalValue(newValue)
      onValueChange?.([newValue])
    }

    const percentage = ((internalValue - Number(min)) / (Number(max) - Number(min))) * 100

    return (
      <div className={cn("relative flex w-full items-center h-6", className)}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          className={cn(
            "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10",
            disabled && "cursor-not-allowed"
          )}
          {...props}
        />
        <div className="relative h-2 w-full rounded-full border-2 border-foreground bg-muted neobrutalism-shadow-sm">
          <div
            className={cn(
              "absolute h-full rounded-full border-2 border-foreground bg-primary transition-all neobrutalism-shadow-sm",
              disabled && "opacity-50"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className={cn(
            "absolute h-5 w-5 -translate-x-1/2 transform rounded-sm border-2 border-foreground bg-background transition-all neobrutalism-shadow-sm pointer-events-none",
            disabled && "opacity-50"
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }


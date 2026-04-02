"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onCheckedChange?: (checked: boolean) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onChange, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? false)

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked)
      }
    }, [checked])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      const checkedVal = e.target.checked
      setIsChecked(checkedVal)
      onCheckedChange?.(checkedVal)
      onChange?.(e)
    }

    return (
      <label
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full border-2 border-foreground transition-all cursor-pointer neobrutalism-shadow-sm",
          isChecked ? "bg-primary" : "bg-muted",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-sm border-2 border-foreground bg-background transition-all peer-active:scale-95",
            isChecked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Label } from "@/app/components/ui/label"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function RadioGroupDocsPage() {
  const [value, setValue] = React.useState("default")

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Radio Group</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A set of checkable buttons where only one can be checked at a time.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Radio Group component provides a set of radio buttons where only one option can be selected at a time.
            It supports controlled and uncontrolled modes, keyboard navigation, and accessibility features.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/radio-group.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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

    const groupName = name || React.useId()

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

export {
  RadioGroup,
  RadioGroupItem,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/radio-group.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext(undefined)

const useRadioGroup = () => {
  const context = React.useContext(RadioGroupContext)
  return context
}

const RadioGroup = React.forwardRef(
  ({ className, value: controlledValue, defaultValue, onValueChange, disabled, name, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback((newValue) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
    }, [disabled, isControlled, onValueChange])

    const groupName = name || React.useId()

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

const RadioGroupItem = React.forwardRef(
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

export {
  RadioGroup,
  RadioGroupItem,
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
                code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import * as React from "react"

function MyComponent() {
  const [value, setValue] = React.useState("default")

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
    </RadioGroup>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import * as React from "react"

function MyComponent() {
  const [value, setValue] = React.useState("default")

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
    </RadioGroup>
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
              <RadioGroup value={value} onValueChange={setValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="default" />
                  <Label htmlFor="default">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="comfortable" />
                  <Label htmlFor="comfortable">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="compact" />
                  <Label htmlFor="compact">Compact</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Disabled</h3>
              <RadioGroup value="default" disabled>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="disabled-default" />
                  <Label htmlFor="disabled-default">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="disabled-comfortable" />
                  <Label htmlFor="disabled-comfortable">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="disabled-compact" />
                  <Label htmlFor="disabled-compact">Compact</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/progress">
            <Button variant="outline" size="lg">
              ← Progress
            </Button>
          </Link>
          <Link href="/docs/components/resizable">
            <Button variant="outline" size="lg">
              Resizable →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


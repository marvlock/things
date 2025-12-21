"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Switch } from "@/app/components/ui/switch"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function SwitchDocsPage() {
  const [checked, setChecked] = React.useState(false)
  const [checked2, setChecked2] = React.useState(true)

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Switch</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A toggle switch component with blocky styling.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Switch component is a toggle control that allows users to turn an option on or off. 
            It features bold borders and shadows that match the Things design system. Built from scratch 
            using React and native HTML input elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/switch.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
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
          "relative inline-flex h-6 w-11 items-center rounded-full border-2 border-foreground transition-colors cursor-pointer neobrutalism-shadow-sm",
          isChecked ? "bg-primary" : "bg-muted",
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
            "inline-block h-4 w-4 transform rounded-sm border-2 border-foreground bg-background transition-transform neobrutalism-shadow-sm",
            isChecked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/switch.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef(
  ({ className, checked, onChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? false)

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked)
      }
    }, [checked])

    const handleChange = (e) => {
      if (disabled) return
      setIsChecked(e.target.checked)
      onChange?.(e)
    }

    return (
      <label
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full border-2 border-foreground transition-colors cursor-pointer neobrutalism-shadow-sm",
          isChecked ? "bg-primary" : "bg-muted",
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
            "inline-block h-4 w-4 transform rounded-sm border-2 border-foreground bg-background transition-transform neobrutalism-shadow-sm",
            isChecked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Switch } from "@/components/ui/switch"
import { useState } from "react"

function MyComponent() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <Switch 
      checked={enabled} 
      onChange={(e) => setEnabled(e.target.checked)} 
    />
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Switch } from "@/components/ui/switch"
import { useState } from "react"

function MyComponent() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <Switch 
      checked={enabled} 
      onChange={(e) => setEnabled(e.target.checked)} 
    />
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
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold">Enable notifications</label>
              <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold">Dark mode</label>
              <Switch checked={checked2} onChange={(e) => setChecked2(e.target.checked)} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold">Disabled switch</label>
              <Switch disabled />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold">Disabled (checked)</label>
              <Switch disabled checked />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/sonner">
            <Button variant="outline" size="lg">
              ← Sonner
            </Button>
          </Link>
          <Link href="/docs/components/table">
            <Button variant="outline" size="lg">
              Table →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


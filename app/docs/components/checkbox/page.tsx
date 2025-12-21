"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Checkbox } from "@/app/components/ui/checkbox"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function CheckboxDocsPage() {
  const [checked, setChecked] = React.useState(false)
  const [checked2, setChecked2] = React.useState(true)

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Checkbox</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A control that allows the user to toggle between checked and not checked.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Checkbox component is a control that allows users to toggle between checked and not checked states. 
            It features bold borders and shadows that match the Things design system. Built from scratch 
            using React and native HTML input elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/checkbox.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

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

export { Checkbox }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/checkbox.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(
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

export { Checkbox }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

function MyComponent() {
  const [checked, setChecked] = useState(false)
  
  return (
    <Checkbox 
      checked={checked} 
      onChange={(e) => setChecked(e.target.checked)} 
    />
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

function MyComponent() {
  const [checked, setChecked] = useState(false)
  
  return (
    <Checkbox 
      checked={checked} 
      onChange={(e) => setChecked(e.target.checked)} 
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
            <div className="flex items-center gap-3">
              <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
              <label className="text-sm font-bold cursor-pointer" onClick={() => setChecked(!checked)}>
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked={checked2} onChange={(e) => setChecked2(e.target.checked)} />
              <label className="text-sm font-bold cursor-pointer" onClick={() => setChecked2(!checked2)}>
                Subscribe to newsletter
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox disabled />
              <label className="text-sm font-bold text-muted-foreground">
                Disabled checkbox
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox disabled checked />
              <label className="text-sm font-bold text-muted-foreground">
                Disabled (checked)
              </label>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/carousel">
            <Button variant="outline" size="lg">
              ← Carousel
            </Button>
          </Link>
          <Link href="/docs/components/collapsible">
            <Button variant="outline" size="lg">
              Collapsible →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


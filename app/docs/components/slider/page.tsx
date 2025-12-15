"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Slider } from "@/app/components/ui/slider"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function SliderDocsPage() {
  const [value, setValue] = React.useState([50])
  const [value2, setValue2] = React.useState([25])

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Slider</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A range slider component with blocky styling.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Slider component allows users to select a value from a range by dragging a handle. 
            It features bold borders and shadows that match the Things design system. Built from scratch 
            using React and native HTML input elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/slider.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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
      <div className={cn("relative flex w-full items-center", className)}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          className="sr-only"
          {...props}
        />
        <div className="relative h-2 w-full rounded-full border-2 border-foreground bg-muted neobrutalism-shadow-sm">
          <div
            className={cn(
              "absolute h-full rounded-full border-2 border-foreground bg-primary transition-all neobrutalism-shadow-sm",
              disabled && "opacity-50"
            )}
            style={{ width: \`\${percentage}%\` }}
          />
        </div>
        <div
          className={cn(
            "absolute h-5 w-5 -translate-x-1/2 transform rounded-sm border-2 border-foreground bg-background transition-all neobrutalism-shadow-sm cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ left: \`\${percentage}%\` }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/slider.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(
  ({ className, value, defaultValue, onValueChange, min = 0, max = 100, step = 1, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(
      value?.[0] ?? defaultValue?.[0] ?? Number(min)
    )

    React.useEffect(() => {
      if (value !== undefined && value[0] !== undefined) {
        setInternalValue(value[0])
      }
    }, [value])

    const handleChange = (e) => {
      if (disabled) return
      const newValue = Number(e.target.value)
      setInternalValue(newValue)
      onValueChange?.([newValue])
    }

    const percentage = ((internalValue - Number(min)) / (Number(max) - Number(min))) * 100

    return (
      <div className={cn("relative flex w-full items-center", className)}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          className="sr-only"
          {...props}
        />
        <div className="relative h-2 w-full rounded-full border-2 border-foreground bg-muted neobrutalism-shadow-sm">
          <div
            className={cn(
              "absolute h-full rounded-full border-2 border-foreground bg-primary transition-all neobrutalism-shadow-sm",
              disabled && "opacity-50"
            )}
            style={{ width: \`\${percentage}%\` }}
          />
        </div>
        <div
          className={cn(
            "absolute h-5 w-5 -translate-x-1/2 transform rounded-sm border-2 border-foreground bg-background transition-all neobrutalism-shadow-sm cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ left: \`\${percentage}%\` }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Slider } from "@/components/ui/slider"
import { useState } from "react"

function MyComponent() {
  const [value, setValue] = useState([50])
  
  return (
    <Slider 
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      step={1}
    />
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Slider } from "@/components/ui/slider"
import { useState } from "react"

function MyComponent() {
  const [value, setValue] = useState([50])
  
  return (
    <Slider 
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      step={1}
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold">Volume</label>
                <span className="text-sm font-bold">{value[0]}%</span>
              </div>
              <Slider value={value} onValueChange={setValue} min={0} max={100} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold">Brightness</label>
                <span className="text-sm font-bold">{value2[0]}%</span>
              </div>
              <Slider value={value2} onValueChange={setValue2} min={0} max={100} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold">Disabled</label>
                <span className="text-sm font-bold">50%</span>
              </div>
              <Slider defaultValue={[50]} disabled />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold">Custom Range (0-200)</label>
                <span className="text-sm font-bold">100</span>
              </div>
              <Slider defaultValue={[100]} min={0} max={200} step={10} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/switch">
            <Button variant="outline" size="lg">
              ← Switch
            </Button>
          </Link>
          <div></div>
        </div>
      </div>
    </div>
  )
}


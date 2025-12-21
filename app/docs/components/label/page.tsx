"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Input } from "@/app/components/ui/input"
import { CodeBlock } from "@/app/components/code-block"

export default function LabelDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Label</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Renders an accessible label associated with controls.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Label component provides accessible labels for form controls.
            It properly associates labels with their inputs for screen readers and improves usability.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/label.tsx</code>:
              </p>
              <CodeBlock
                code={`import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/label.jsx</code>:
              </p>
              <CodeBlock
                code={`import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function MyComponent() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function MyComponent() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
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
              <h3 className="text-xl font-bold mb-4">With Checkbox</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With Input</h3>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With Disabled Input</h3>
              <div className="space-y-2">
                <Label htmlFor="disabled-input">Disabled Field</Label>
                <Input id="disabled-input" type="text" disabled placeholder="This field is disabled" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/input-otp">
            <Button variant="outline" size="lg">
              ← Input OTP
            </Button>
          </Link>
          <Link href="/docs/components/marquee">
            <Button variant="outline" size="lg">
              Marquee →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


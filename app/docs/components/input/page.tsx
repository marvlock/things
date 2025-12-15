import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { CodeBlock } from "@/app/components/code-block"

export default function InputDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Input</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A form input component with bold borders and shadow.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Input component is a form input field with blocky styling. It features thick borders 
            and shadows that match the Things design system. Built from scratch using React and native 
            HTML input elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/input.tsx</code>:
              </p>
              <CodeBlock
                code={`import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/input.jsx</code>:
              </p>
              <CodeBlock
                code={`import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-4">
            <Input placeholder="Enter your email" />
            <Input type="password" placeholder="Password" />
            <Input type="text" placeholder="Disabled" disabled />
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/card">
            <Button variant="outline" size="lg">
              ← Card
            </Button>
          </Link>
          <Link href="/docs/components/textarea">
            <Button variant="outline" size="lg">
              Textarea →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


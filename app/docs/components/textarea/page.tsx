import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { ComponentCode } from "@/app/components/component-code"

export default function TextareaDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Textarea</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A multi-line text input component with blocky styling.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Textarea component provides a multi-line text input with bold borders 
            and shadows that match the Things design system. Built from scratch using React and native 
            HTML textarea elements. No dependencies on any UI library.
          </p>

          <ComponentCode 
            filename="textarea"
            tsCode={`import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }`}
            jsCode={`import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }`}
            usageTs={`import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Enter your message" />
<Textarea rows={5} placeholder="Longer text area" />
<Textarea disabled placeholder="Disabled textarea" />`}
            usageJs={`import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Enter your message" />
<Textarea rows={5} placeholder="Longer text area" />
<Textarea disabled placeholder="Disabled textarea" />`}
          />

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Message</label>
              <Textarea placeholder="Enter your message here..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Description</label>
              <Textarea rows={5} placeholder="Enter a longer description..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Disabled</label>
              <Textarea disabled placeholder="This textarea is disabled" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/tooltip">
            <Button variant="outline" size="lg">
              ← Tooltip
            </Button>
          </Link>
          <div></div>
        </div>
      </div>
    </div>
  )
}


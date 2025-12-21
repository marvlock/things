"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible"
import { CodeBlock } from "@/app/components/code-block"

export default function CollapsibleDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Collapsible</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          An interactive component that expands/collapses a panel.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Collapsible component is an interactive element that allows users to expand or collapse 
            a panel of content. It features bold borders and shadows that match the Things design system. 
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/collapsible.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | undefined>(undefined)

const useCollapsible = () => {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error("Collapsible components must be used within Collapsible")
  }
  return context
}

interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, disabled = false, children, className, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    }, [disabled, isControlled, onOpenChange])

    return (
      <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = "Collapsible"

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange } = useCollapsible()

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onOpenChange(!open)}
        className={cn(
          "flex w-full items-center justify-between bg-primary text-primary-foreground p-4 font-bold transition-colors hover:bg-primary/90 border-2 border-foreground rounded-lg neobrutalism-shadow",
          className
        )}
        {...props}
      >
        {children}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    )
  }
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = useCollapsible()

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
        {...props}
      >
        <div className={cn("p-4 bg-background border-2 border-foreground border-t-0 rounded-b-lg neobrutalism-shadow mt-2", className)}>
          {children}
        </div>
      </div>
    )
  }
)
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/collapsible.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const CollapsibleContext = React.createContext(undefined)

const useCollapsible = () => {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error("Collapsible components must be used within Collapsible")
  }
  return context
}

const Collapsible = React.forwardRef(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, disabled = false, children, className, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const handleOpenChange = React.useCallback((newOpen) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    }, [disabled, isControlled, onOpenChange])

    return (
      <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange } = useCollapsible()

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onOpenChange(!open)}
        className={cn(
          "flex w-full items-center justify-between bg-primary text-primary-foreground p-4 font-bold transition-colors hover:bg-primary/90 border-2 border-foreground rounded-lg neobrutalism-shadow",
          className
        )}
        {...props}
      >
        {children}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    )
  }
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open } = useCollapsible()

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
        {...props}
      >
        <div className={cn("p-4 bg-background border-2 border-foreground border-t-0 rounded-b-lg neobrutalism-shadow mt-2", className)}>
          {children}
        </div>
      </div>
    )
  }
)
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

function MyComponent() {
  return (
    <Collapsible>
      <CollapsibleTrigger>@marvellousz starred 3 repositories</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2">
          <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm">@radix-ui/primitives</div>
          <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm">@radix-ui/colors</div>
          <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm">@stitches/react</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

function MyComponent() {
  return (
    <Collapsible>
      <CollapsibleTrigger>@marvellousz starred 3 repositories</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2">
          <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm">@radix-ui/primitives</div>
          <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm">@radix-ui/colors</div>
          <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm">@stitches/react</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
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
            <Collapsible>
              <CollapsibleTrigger>@marvellousz starred 3 repositories</CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-2">
                  <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm bg-primary text-primary-foreground font-bold">
                    @radix-ui/primitives
                  </div>
                  <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm bg-primary text-primary-foreground font-bold">
                    @radix-ui/colors
                  </div>
                  <div className="p-2 border-2 border-foreground rounded neobrutalism-shadow-sm bg-primary text-primary-foreground font-bold">
                    @stitches/react
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
              <CollapsibleTrigger>Open by default</CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm">This collapsible is open by default.</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/checkbox">
            <Button variant="outline" size="lg">
              ← Checkbox
            </Button>
          </Link>
          <Link href="/docs/components/combobox">
            <Button variant="outline" size="lg">
              Combobox →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


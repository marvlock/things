import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { CodeBlock } from "@/app/components/code-block"

export default function AccordionDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Accordion</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A vertically stacked set of interactive headings that each reveal a section of content.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Accordion component displays a vertically stacked set of interactive headings
            that each reveal a section of content when clicked. It supports both single and
            multiple open items. Built from scratch using React and native HTML elements. No UI library dependencies.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/accordion.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  value: string[]
  onValueChange: (value: string[]) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

const useAccordion = () => {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within Accordion")
  }
  return context
}

interface AccordionProps {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  className?: string
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", defaultValue, value: controlledValue, onValueChange, children, className, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
      () => {
        if (defaultValue === undefined) return []
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      }
    )
    const isControlled = controlledValue !== undefined
    const value = isControlled
      ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
      : uncontrolledValue

    const handleValueChange = React.useCallback((newValue: string[]) => {
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      if (onValueChange) {
        onValueChange(type === "single" ? (newValue[0] || "") : newValue)
      }
    }, [isControlled, onValueChange, type])

    return (
      <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItemContext = React.createContext<{ value: string } | undefined>(undefined)

const useAccordionItem = () => {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionTrigger and AccordionContent must be used within AccordionItem")
  }
  return context
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          className={cn("border-2 border-foreground rounded-lg neobrutalism-shadow overflow-hidden", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionItem()
    const { value: openValues, onValueChange, type } = useAccordion()
    const isOpen = openValues.includes(value)

    const handleClick = () => {
      if (type === "single") {
        onValueChange(isOpen ? [] : [value])
      } else {
        onValueChange(
          isOpen
            ? openValues.filter((v) => v !== value)
            : [...openValues, value]
        )
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between bg-primary text-primary-foreground p-4 font-bold transition-colors hover:bg-primary/90",
          className
        )}
        {...props}
      >
        {children}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
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
AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionItem()
    const { value: openValues } = useAccordion()
    const isOpen = openValues.includes(value)

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
        {...props}
      >
        <div className={cn("p-4 bg-background border-t-2 border-foreground", className)}>
          {children}
        </div>
      </div>
    )
  }
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/accordion.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext(undefined)

const useAccordion = () => {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within Accordion")
  }
  return context
}

const Accordion = React.forwardRef(
  ({ type = "single", defaultValue, value: controlledValue, onValueChange, children, className, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      () => {
        if (defaultValue === undefined) return []
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      }
    )
    const isControlled = controlledValue !== undefined
    const value = isControlled
      ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
      : uncontrolledValue

    const handleValueChange = React.useCallback((newValue) => {
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      if (onValueChange) {
        onValueChange(type === "single" ? (newValue[0] || "") : newValue)
      }
    }, [isControlled, onValueChange, type])

    return (
      <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

const AccordionItemContext = React.createContext(undefined)

const useAccordionItem = () => {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionTrigger and AccordionContent must be used within AccordionItem")
  }
  return context
}

const AccordionItem = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          className={cn("border-2 border-foreground rounded-lg neobrutalism-shadow overflow-hidden", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionItem()
    const { value: openValues, onValueChange, type } = useAccordion()
    const isOpen = openValues.includes(value)

    const handleClick = () => {
      if (type === "single") {
        onValueChange(isOpen ? [] : [value])
      } else {
        onValueChange(
          isOpen
            ? openValues.filter((v) => v !== value)
            : [...openValues, value]
        )
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between bg-primary text-primary-foreground p-4 font-bold transition-colors hover:bg-primary/90",
          className
        )}
        {...props}
      >
        {children}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
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
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionItem()
    const { value: openValues } = useAccordion()
    const isOpen = openValues.includes(value)

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
        {...props}
      >
        <div className={cn("p-4 bg-background border-t-2 border-foreground", className)}>
          {children}
        </div>
      </div>
    )
  }
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function MyComponent() {
  return (
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-4">
            <Accordion type="multiple" defaultValue={["item-1"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the other components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It has smooth transitions when opening and closing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <div></div>
          <Link href="/docs/components/alert">
            <Button variant="outline" size="lg">
              Alert →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


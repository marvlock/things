"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/app/components/ui/hover-card"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function HoverCardDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Hover Card</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          For sighted users to preview content available behind a link.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Hover Card component displays a card when hovering over a trigger element.
            It&apos;s useful for showing additional information or previews without navigating away.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/hover-card.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface HoverCardContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const HoverCardContext = React.createContext<HoverCardContextValue | undefined>(undefined)

const useHoverCard = () => {
  const context = React.useContext(HoverCardContext)
  if (!context) {
    throw new Error("HoverCard components must be used within HoverCard")
  }
  return context
}

interface HoverCardProps {
  openDelay?: number
  closeDelay?: number
  children: React.ReactNode
}

const HoverCard = ({ openDelay = 200, closeDelay = 200, children }: HoverCardProps) => {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </HoverCardContext.Provider>
  )
}

interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { setOpen, triggerRef: contextTriggerRef } = useHoverCard()
    const localTriggerRef = React.useRef<HTMLElement>(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current as HTMLElement)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        contextTriggerRef.current = localTriggerRef.current
      }
    }, [contextTriggerRef])

    const handleMouseEnter = () => {
      setOpen(true)
    }

    const handleMouseLeave = () => {
      setOpen(false)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: localTriggerRef,
        ...props,
      } as any)
    }

    return (
      <span
        ref={localTriggerRef as any}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
HoverCardTrigger.displayName = "HoverCardTrigger"

interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ className, align = "center", side = "bottom", sideOffset = 4, children, ...props }, ref) => {
    const { open, triggerRef } = useHoverCard()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = React.useState(false)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (open) {
        setIsVisible(true)
      } else {
        const timer = setTimeout(() => setIsVisible(false), 200)
        return () => clearTimeout(timer)
      }
    }, [open])

    React.useEffect(() => {
      if (!open || !contentRef.current || !triggerRef.current) return

      const content = contentRef.current
      const trigger = triggerRef.current

      const triggerRect = trigger.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = 0
      let left = 0

      switch (side) {
        case "top":
          top = triggerRect.top - contentRect.height - sideOffset
          break
        case "bottom":
          top = triggerRect.bottom + sideOffset
          break
        case "left":
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
          break
        case "right":
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
          break
      }

      switch (align) {
        case "start":
          left = triggerRect.left
          break
        case "center":
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
          break
        case "end":
          left = triggerRect.right - contentRect.width
          break
      }

      if (side === "left") {
        left = triggerRect.left - contentRect.width - sideOffset
      } else if (side === "right") {
        left = triggerRect.right + sideOffset
      }

      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8
      }
      if (left < 8) left = 8
      if (top + contentRect.height > viewportHeight) {
        top = viewportHeight - contentRect.height - 8
      }
      if (top < 8) top = 8

      content.style.position = "fixed"
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
    }, [open, align, side, sideOffset, triggerRef])

    if (!isVisible) return null

    const content = (
      <div
        ref={contentRef}
        data-hover-card-content
        className={cn(
          "fixed z-50 w-64 rounded-md border-2 border-foreground bg-background p-4 neobrutalism-shadow",
          "transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
HoverCardContent.displayName = "HoverCardContent"

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/hover-card.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const HoverCardContext = React.createContext(undefined)

const useHoverCard = () => {
  const context = React.useContext(HoverCardContext)
  if (!context) {
    throw new Error("HoverCard components must be used within HoverCard")
  }
  return context
}

const HoverCard = ({ openDelay = 200, closeDelay = 200, children }) => {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef(null)

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </HoverCardContext.Provider>
  )
}

const HoverCardTrigger = React.forwardRef(
  ({ className, children, asChild, ...props }, ref) => {
    const { setOpen, triggerRef: contextTriggerRef } = useHoverCard()
    const localTriggerRef = React.useRef(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        contextTriggerRef.current = localTriggerRef.current
      }
    }, [contextTriggerRef])

    const handleMouseEnter = () => {
      setOpen(true)
    }

    const handleMouseLeave = () => {
      setOpen(false)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: localTriggerRef,
        ...props,
      })
    }

    return (
      <span
        ref={localTriggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContent = React.forwardRef(
  ({ className, align = "center", side = "bottom", sideOffset = 4, children, ...props }, ref) => {
    const { open, triggerRef } = useHoverCard()
    const contentRef = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState(false)

    React.useImperativeHandle(ref, () => contentRef.current)

    React.useEffect(() => {
      if (open) {
        setIsVisible(true)
      } else {
        const timer = setTimeout(() => setIsVisible(false), 200)
        return () => clearTimeout(timer)
      }
    }, [open])

    React.useEffect(() => {
      if (!open || !contentRef.current || !triggerRef.current) return

      const content = contentRef.current
      const trigger = triggerRef.current

      const triggerRect = trigger.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = 0
      let left = 0

      switch (side) {
        case "top":
          top = triggerRect.top - contentRect.height - sideOffset
          break
        case "bottom":
          top = triggerRect.bottom + sideOffset
          break
        case "left":
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
          break
        case "right":
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
          break
      }

      switch (align) {
        case "start":
          left = triggerRect.left
          break
        case "center":
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
          break
        case "end":
          left = triggerRect.right - contentRect.width
          break
      }

      if (side === "left") {
        left = triggerRect.left - contentRect.width - sideOffset
      } else if (side === "right") {
        left = triggerRect.right + sideOffset
      }

      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8
      }
      if (left < 8) left = 8
      if (top + contentRect.height > viewportHeight) {
        top = viewportHeight - contentRect.height - 8
      }
      if (top < 8) top = 8

      content.style.position = "fixed"
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
    }, [open, align, side, sideOffset, triggerRef])

    if (!isVisible) return null

    const content = (
      <div
        ref={contentRef}
        data-hover-card-content
        className={cn(
          "fixed z-50 w-64 rounded-md border-2 border-foreground bg-background p-4 neobrutalism-shadow",
          "transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
HoverCardContent.displayName = "HoverCardContent"

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
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
                code={`import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"

function MyComponent() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="https://nextjs.org">Next.js</a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <h4 className="text-sm font-bold">The React Framework</h4>
          <p className="text-sm text-muted-foreground">
            Created and maintained by @vercel.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"

function MyComponent() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="https://nextjs.org">Next.js</a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <h4 className="text-sm font-bold">The React Framework</h4>
          <p className="text-sm text-muted-foreground">
            Created and maintained by @vercel.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
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
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <Button variant="outline">Hover</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold">The React Framework</h4>
                    <p className="text-sm text-muted-foreground">
                      Created and maintained by @vercel.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With Link</h3>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="https://nextjs.org" className="text-primary underline font-bold">
                    Next.js
                  </a>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold">The React Framework</h4>
                    <p className="text-sm text-muted-foreground">
                      Created and maintained by @vercel.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/form">
            <Button variant="outline" size="lg">
              ← Form
            </Button>
          </Link>
          <Link href="/docs/components/image-card">
            <Button variant="outline" size="lg">
              Image Card →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


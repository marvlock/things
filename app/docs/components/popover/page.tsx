"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from "@/app/components/ui/popover"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { CodeBlock } from "@/app/components/code-block"

export default function PopoverDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Popover</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Displays floating content in relation to a target element.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Popover component displays floating content positioned relative to a trigger element.
            It supports customizable positioning, titles, descriptions, and can be closed via click-outside or Escape key.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/popover.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const PopoverContext = React.createContext<PopoverContextValue | undefined>(undefined)

const usePopover = () => {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("Popover components must be used within Popover")
  }
  return context
}

interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Popover = ({ open: controlledOpen, onOpenChange, children }: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  React.useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      const portalContent = document.querySelector('[data-popover-content]')
      
      if (
        portalContent &&
        !portalContent.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        handleOpenChange(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleOpenChange(false)
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick, true)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, handleOpenChange])

  return (
    <PopoverContext.Provider value={{ open, setOpen: handleOpenChange, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  )
}

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, children, onClick, asChild, ...props }, ref) => {
    const { open, setOpen, triggerRef: contextTriggerRef } = usePopover()
    const localTriggerRef = React.useRef<HTMLButtonElement>(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current as HTMLButtonElement)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        (contextTriggerRef as React.MutableRefObject<HTMLElement | null>).current = localTriggerRef.current
      }
    }, [contextTriggerRef])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(!open)
      onClick?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        ref: localTriggerRef,
        ...props,
      } as any)
    }

    return (
      <button
        ref={localTriggerRef}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", side = "bottom", sideOffset = 4, children, ...props }, ref) => {
    const { open, triggerRef } = usePopover()
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

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

    if (!open) return null

    const content = (
      <div
        ref={contentRef}
        data-popover-content
        className={cn(
          "fixed z-50 w-72 rounded-md border-2 border-foreground bg-background p-4 neobrutalism-shadow",
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
PopoverContent.displayName = "PopoverContent"

interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
)
PopoverHeader.displayName = "PopoverHeader"

interface PopoverTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-bold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
PopoverTitle.displayName = "PopoverTitle"

interface PopoverDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const PopoverDescription = React.forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
PopoverDescription.displayName = "PopoverDescription"

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/popover.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const PopoverContext = React.createContext(undefined)

const usePopover = () => {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("Popover components must be used within Popover")
  }
  return context
}

const Popover = ({ open: controlledOpen, onOpenChange, children }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const triggerRef = React.useRef(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback((newOpen) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  React.useEffect(() => {
    if (!open) return

    const handleClick = (e) => {
      const target = e.target
      const portalContent = document.querySelector('[data-popover-content]')
      
      if (
        portalContent &&
        !portalContent.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        handleOpenChange(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleOpenChange(false)
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick, true)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, handleOpenChange])

  return (
    <PopoverContext.Provider value={{ open, setOpen: handleOpenChange, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef(
  ({ className, children, onClick, asChild, ...props }, ref) => {
    const { open, setOpen, triggerRef: contextTriggerRef } = usePopover()
    const localTriggerRef = React.useRef(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        contextTriggerRef.current = localTriggerRef.current
      }
    }, [contextTriggerRef])

    const handleClick = (e) => {
      setOpen(!open)
      onClick?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        ref: localTriggerRef,
        ...props,
      })
    }

    return (
      <button
        ref={localTriggerRef}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef(
  ({ className, align = "center", side = "bottom", sideOffset = 4, children, ...props }, ref) => {
    const { open, triggerRef } = usePopover()
    const contentRef = React.useRef(null)

    React.useImperativeHandle(ref, () => contentRef.current)

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

    if (!open) return null

    const content = (
      <div
        ref={contentRef}
        data-popover-content
        className={cn(
          "fixed z-50 w-72 rounded-md border-2 border-foreground bg-background p-4 neobrutalism-shadow",
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
PopoverContent.displayName = "PopoverContent"

const PopoverHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
)
PopoverHeader.displayName = "PopoverHeader"

const PopoverTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-bold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
PopoverTitle.displayName = "PopoverTitle"

const PopoverDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
PopoverDescription.displayName = "PopoverDescription"

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"

function MyComponent() {
  return (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description</PopoverDescription>
        </PopoverHeader>
        Content here
      </PopoverContent>
    </Popover>
  )
}`}
                language="tsx"
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button>Open popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>
                      Set the dimensions for the layer.
                    </PopoverDescription>
                  </PopoverHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        defaultValue="100%"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="max-width">Max. width</Label>
                      <Input
                        id="max-width"
                        defaultValue="300px"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="max-height">Max. height</Label>
                      <Input
                        id="max-height"
                        defaultValue="none"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With Close Button</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button>Open popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverClose />
                  <PopoverHeader>
                    <PopoverTitle>Are you sure?</PopoverTitle>
                    <PopoverDescription>
                      This action cannot be undone.
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/pagination">
            <Button variant="outline" size="lg">
              ← Pagination
            </Button>
          </Link>
          <Link href="/docs/components/progress">
            <Button variant="outline" size="lg">
              Progress →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


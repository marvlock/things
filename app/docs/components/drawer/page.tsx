"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/app/components/ui/drawer"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function DrawerDocsPage() {
  const [open, setOpen] = React.useState(false)
  const [openBottom, setOpenBottom] = React.useState(false)
  const [openScrollable, setOpenScrollable] = React.useState(false)

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Drawer</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A drawer component that slides out from the edge of the screen.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Drawer component displays a panel that slides in from the edge of the screen.
            It includes a backdrop, close button, and supports keyboard navigation (Escape to close).
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/drawer.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface DrawerContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  side: "top" | "right" | "bottom" | "left"
}

const DrawerContext = React.createContext<DrawerContextValue | undefined>(undefined)

const useDrawer = () => {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("Drawer components must be used within Drawer")
  }
  return context
}

interface DrawerProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "top" | "right" | "bottom" | "left"
  children: React.ReactNode
}

const Drawer = ({ open: controlledOpen, defaultOpen = false, onOpenChange, side = "right", children }: DrawerProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleOpenChange(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, handleOpenChange])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange, side }}>
      {children}
    </DrawerContext.Provider>
  )
}

interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ className, children, onClick, asChild, ...props }, ref) => {
    const { onOpenChange } = useDrawer()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onOpenChange(true)
      onClick?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        ref,
        ...props,
      } as any)
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DrawerTrigger.displayName = "DrawerTrigger"

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange, side } = useDrawer()

    if (!open) return null

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onOpenChange(false)
      }
    }

    const getSideClasses = () => {
      switch (side) {
        case "top":
          return "top-0 left-0 right-0 max-h-[90vh] border-b-2 border-foreground rounded-b-lg"
        case "bottom":
          return "bottom-0 left-0 right-0 max-h-[90vh] border-t-2 border-foreground rounded-t-lg"
        case "left":
          return "top-0 bottom-0 left-0 max-w-[90vw] border-r-2 border-foreground rounded-r-lg"
        case "right":
        default:
          return "top-0 bottom-0 right-0 max-w-[90vw] border-l-2 border-foreground rounded-l-lg"
      }
    }

    const getTransform = () => {
      if (!open) {
        switch (side) {
          case "top":
            return "translateY(-100%)"
          case "bottom":
            return "translateY(100%)"
          case "left":
            return "translateX(-100%)"
          case "right":
          default:
            return "translateX(100%)"
        }
      }
      return "translateX(0) translateY(0)"
    }

    const content = (
      <div
        className="fixed inset-0 z-50"
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 bg-black/50" />
        <div
          ref={ref}
          className={cn(
            "fixed z-50 bg-background p-6 neobrutalism-shadow overflow-y-auto transition-transform duration-300 ease-out",
            getSideClasses(),
            className
          )}
          style={{
            transform: open ? "translateX(0) translateY(0)" : getTransform(),
          }}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 mb-4", className)}
    {...props}
  />
))
DrawerHeader.displayName = "DrawerHeader"

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-bold leading-none tracking-tight", className)}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
    {...props}
  />
))
DrawerFooter.displayName = "DrawerFooter"

const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { onOpenChange } = useDrawer()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpenChange(false)
    onClick?.(e)
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={cn(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span className="sr-only">Close</span>
    </button>
  )
})
DrawerClose.displayName = "DrawerClose"

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/drawer.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const DrawerContext = React.createContext(undefined)

const useDrawer = () => {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("Drawer components must be used within Drawer")
  }
  return context
}

const Drawer = ({ open: controlledOpen, defaultOpen = false, onOpenChange, side = "right", children }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback((newOpen) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        handleOpenChange(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, handleOpenChange])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange, side }}>
      {children}
    </DrawerContext.Provider>
  )
}

const DrawerTrigger = React.forwardRef(
  ({ className, children, onClick, asChild, ...props }, ref) => {
    const { onOpenChange } = useDrawer()

    const handleClick = (e) => {
      onOpenChange(true)
      onClick?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        ref,
        ...props,
      })
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange, side } = useDrawer()

    if (!open) return null

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onOpenChange(false)
      }
    }

    const getSideClasses = () => {
      switch (side) {
        case "top":
          return "top-0 left-0 right-0 max-h-[90vh] border-b-2 border-foreground rounded-b-lg"
        case "bottom":
          return "bottom-0 left-0 right-0 max-h-[90vh] border-t-2 border-foreground rounded-t-lg"
        case "left":
          return "top-0 bottom-0 left-0 max-w-[90vw] border-r-2 border-foreground rounded-r-lg"
        case "right":
        default:
          return "top-0 bottom-0 right-0 max-w-[90vw] border-l-2 border-foreground rounded-l-lg"
      }
    }

    const getTransform = () => {
      if (!open) {
        switch (side) {
          case "top":
            return "translateY(-100%)"
          case "bottom":
            return "translateY(100%)"
          case "left":
            return "translateX(-100%)"
          case "right":
          default:
            return "translateX(100%)"
        }
      }
      return "translateX(0) translateY(0)"
    }

    const content = (
      <div
        className="fixed inset-0 z-50"
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 bg-black/50" />
        <div
          ref={ref}
          className={cn(
            "fixed z-50 bg-background p-6 neobrutalism-shadow overflow-y-auto transition-transform duration-300 ease-out",
            getSideClasses(),
            className
          )}
          style={{
            transform: open ? "translateX(0) translateY(0)" : getTransform(),
          }}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 mb-4", className)}
      {...props}
    />
  )
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-bold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
DrawerDescription.displayName = "DrawerDescription"

const DrawerFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
      {...props}
    />
  )
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerClose = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = useDrawer()

    const handleClick = (e) => {
      onOpenChange(false)
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span className="sr-only">Close</span>
      </button>
    )
  }
)
DrawerClose.displayName = "DrawerClose"

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
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
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-4">
          Content goes here
        </div>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DrawerFooter>
        <DrawerClose />
      </DrawerContent>
    </Drawer>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-4">
          Content goes here
        </div>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DrawerFooter>
        <DrawerClose />
      </DrawerContent>
    </Drawer>
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function, and the required
            UI components (<code className="bg-muted px-1 py-0.5 rounded">button</code>).
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Default</h3>
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button>Open</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="py-4">
                    This is the drawer content. You can put anything here.
                  </div>
                  <DrawerFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={() => setOpen(false)}>Submit</Button>
                  </DrawerFooter>
                  <DrawerClose />
                </DrawerContent>
              </Drawer>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Bottom</h3>
              <Drawer open={openBottom} onOpenChange={setOpenBottom} side="bottom">
                <DrawerTrigger asChild>
                  <Button>Open Bottom Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Bottom Drawer</DrawerTitle>
                    <DrawerDescription>
                      This drawer slides in from the bottom.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="py-4">
                    Content for bottom drawer.
                  </div>
                  <DrawerFooter>
                    <Button variant="outline" onClick={() => setOpenBottom(false)}>Cancel</Button>
                    <Button onClick={() => setOpenBottom(false)}>Submit</Button>
                  </DrawerFooter>
                  <DrawerClose />
                </DrawerContent>
              </Drawer>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With Scrollable Content</h3>
              <Drawer open={openScrollable} onOpenChange={setOpenScrollable}>
                <DrawerTrigger asChild>
                  <Button>Open Scrollable Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Scrollable Content</DrawerTitle>
                    <DrawerDescription>
                      This drawer has scrollable content.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="py-4 space-y-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <p key={i} className="text-sm">
                        This is paragraph {i + 1}. Scroll down to see more content.
                      </p>
                    ))}
                  </div>
                  <DrawerFooter>
                    <Button variant="outline" onClick={() => setOpenScrollable(false)}>Close</Button>
                  </DrawerFooter>
                  <DrawerClose />
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/dialog">
            <Button variant="outline" size="lg">
              ← Dialog
            </Button>
          </Link>
          <Link href="/docs/components/dropdown-menu">
            <Button variant="outline" size="lg">
              Dropdown Menu →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/app/components/ui/sheet"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function SheetDocsPage() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("Pranav Murali")
  const [username, setUsername] = React.useState("@marvellousz")

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Sheet</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Extends the Dialog component to display content that complements the main content of the screen.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Sheet component displays a panel that slides in from the edge of the screen.
            It extends the Dialog component functionality and is perfect for forms, settings, or supplementary content.
            It includes a backdrop, close button, and supports keyboard navigation (Escape to close).
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/sheet.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface SheetContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  side: "top" | "right" | "bottom" | "left"
}

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined)

const useSheet = () => {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error("Sheet components must be used within Sheet")
  }
  return context
}

interface SheetProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "top" | "right" | "bottom" | "left"
  children: React.ReactNode
}

const Sheet = ({ open: controlledOpen, defaultOpen = false, onOpenChange, side = "right", children }: SheetProps) => {
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
    <SheetContext.Provider value={{ open, onOpenChange: handleOpenChange, side }}>
      {children}
    </SheetContext.Provider>
  )
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, children, onClick, asChild, ...props }, ref) => {
    const { onOpenChange } = useSheet()

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
SheetTrigger.displayName = "SheetTrigger"

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange, side } = useSheet()
    const [isAnimating, setIsAnimating] = React.useState(false)

    React.useEffect(() => {
      if (open) {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      } else {
        setIsAnimating(false)
      }
    }, [open])

    if (!open && !isAnimating) return null

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

    const getInitialTransform = () => {
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

    const content = (
      <div
        className="fixed inset-0 z-50"
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 bg-black/50 transition-opacity duration-300" style={{ opacity: open ? 1 : 0 }} />
        <div
          ref={ref}
          className={cn(
            "fixed z-50 bg-background p-6 neobrutalism-shadow overflow-y-auto transition-transform duration-300 ease-out",
            getSideClasses(),
            className
          )}
          style={{
            transform: open ? "translateX(0) translateY(0)" : getInitialTransform(),
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
SheetContent.displayName = "SheetContent"

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 mb-4", className)}
    {...props}
  />
))
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-bold leading-none tracking-tight", className)}
    {...props}
  />
))
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = "SheetDescription"

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
    {...props}
  />
))
SheetFooter.displayName = "SheetFooter"

const SheetClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { onOpenChange } = useSheet()

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
SheetClose.displayName = "SheetClose"

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/sheet.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const SheetContext = React.createContext(undefined)

const useSheet = () => {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error("Sheet components must be used within Sheet")
  }
  return context
}

const Sheet = ({ open: controlledOpen, defaultOpen = false, onOpenChange, side = "right", children }) => {
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
    <SheetContext.Provider value={{ open, onOpenChange: handleOpenChange, side }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger = React.forwardRef(
  ({ className, children, onClick, asChild, ...props }, ref) => {
    const { onOpenChange } = useSheet()

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
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange, side } = useSheet()
    const [isAnimating, setIsAnimating] = React.useState(false)

    React.useEffect(() => {
      if (open) {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      } else {
        setIsAnimating(false)
      }
    }, [open])

    if (!open && !isAnimating) return null

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

    const getInitialTransform = () => {
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

    const content = (
      <div
        className="fixed inset-0 z-50"
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 bg-black/50 transition-opacity duration-300" style={{ opacity: open ? 1 : 0 }} />
        <div
          ref={ref}
          className={cn(
            "fixed z-50 bg-background p-6 neobrutalism-shadow overflow-y-auto transition-transform duration-300 ease-out",
            getSideClasses(),
            className
          )}
          style={{
            transform: open ? "translateX(0) translateY(0)" : getInitialTransform(),
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
SheetContent.displayName = "SheetContent"

const SheetHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 mb-4", className)}
      {...props}
    />
  )
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-bold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
SheetDescription.displayName = "SheetDescription"

const SheetFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
      {...props}
    />
  )
)
SheetFooter.displayName = "SheetFooter"

const SheetClose = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = useSheet()

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
SheetClose.displayName = "SheetClose"

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
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
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function MyComponent() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Configure your Things component library settings here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pranav Murali" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@marvellousz" />
          </div>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
        <SheetClose />
      </SheetContent>
    </Sheet>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function MyComponent() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Configure your Things component library settings here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pranav Murali" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@marvellousz" />
          </div>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
        <SheetClose />
      </SheetContent>
    </Sheet>
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
              <h3 className="text-xl font-bold mb-4">Default (Right Side)</h3>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button>Open</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Configure your Things component library settings here. Click save when you&apos;re done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sheet-name">Name</Label>
                      <Input
                        id="sheet-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sheet-username">Username</Label>
                      <Input
                        id="sheet-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button onClick={() => setOpen(false)}>Save changes</Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                  </SheetFooter>
                  <SheetClose />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/scroll-area">
            <Button variant="outline" size="lg">
              ← Scroll Area
            </Button>
          </Link>
          <Link href="/docs/components/sidebar">
            <Button variant="outline" size="lg">
              Sidebar →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

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
      return React.cloneElement(children as React.ReactElement, {
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

type DrawerContentProps = React.HTMLAttributes<HTMLDivElement>

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange, side } = useDrawer()
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
}


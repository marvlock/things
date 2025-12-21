"use client"

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
      return React.cloneElement(children as React.ReactElement, {
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
      content.style.top = `${top}px`
      content.style.left = `${left}px`
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

type PopoverHeaderProps = React.HTMLAttributes<HTMLDivElement>

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

type PopoverTitleProps = React.HTMLAttributes<HTMLHeadingElement>

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

type PopoverDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

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

type PopoverCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, ...props }, ref) => {
    const { setOpen } = usePopover()
    return (
      <button
        ref={ref}
        onClick={() => setOpen(false)}
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          className
        )}
        {...props}
      >
        ✕
      </button>
    )
  }
)
PopoverClose.displayName = "PopoverClose"

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
}


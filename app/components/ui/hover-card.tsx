"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface HoverCardContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
  handleOpen: () => void
  handleClose: () => void
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
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleOpen = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
    }
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true)
      openTimeoutRef.current = null
    }, openDelay)
  }, [openDelay])

  const handleClose = React.useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false)
      closeTimeoutRef.current = null
    }, closeDelay)
  }, [closeDelay])

  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current)
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerRef, handleOpen, handleClose }}>
      {children}
    </HoverCardContext.Provider>
  )
}

interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { handleOpen, handleClose, triggerRef } = useHoverCard()
    const localTriggerRef = React.useRef<HTMLElement>(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current as HTMLElement)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        ;(triggerRef as React.MutableRefObject<HTMLElement | null>).current = localTriggerRef.current
      }
    }, [triggerRef])

    if (asChild && React.isValidElement(children)) {
      const childProps = {
        onMouseEnter: (e: React.MouseEvent) => {
          handleOpen()
          if (children.props.onMouseEnter) {
            children.props.onMouseEnter(e)
          }
        },
        onMouseLeave: (e: React.MouseEvent) => {
          handleClose()
          if (children.props.onMouseLeave) {
            children.props.onMouseLeave(e)
          }
        },
        ref: localTriggerRef,
        ...props,
      }
      return React.cloneElement(children as React.ReactElement, childProps)
    }

    return (
      <span
        ref={localTriggerRef}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
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
    const { open, triggerRef, handleOpen, handleClose } = useHoverCard()
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
      if (!isVisible || !contentRef.current || !triggerRef.current) return

      const content = contentRef.current
      const trigger = triggerRef.current

      requestAnimationFrame(() => {
        if (!content || !trigger) return

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
      })
    }, [isVisible, align, side, sideOffset, triggerRef])

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
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
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
}


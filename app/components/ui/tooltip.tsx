"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
  handleOpen: () => void
  handleClose: () => void
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined)

const useTooltip = () => {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("Tooltip components must be used within Tooltip")
  }
  return context
}

interface TooltipProps {
  delayDuration?: number
  children: React.ReactNode
}

const Tooltip = ({ delayDuration = 0, children }: TooltipProps) => {
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
    }, delayDuration)
  }, [delayDuration])

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
    }, 100)
  }, [])

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
    <TooltipContext.Provider value={{ open, setOpen, triggerRef, handleOpen, handleClose }}>
      {children}
    </TooltipContext.Provider>
  )
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { handleOpen, handleClose, triggerRef } = useTooltip()
    const localTriggerRef = React.useRef<HTMLElement>(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current as HTMLElement)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        ;(triggerRef as React.MutableRefObject<HTMLElement | null>).current = localTriggerRef.current
      }
    }, [triggerRef])

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      handleOpen()
      props.onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      handleClose()
      props.onMouseLeave?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
      handleOpen()
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      handleClose()
      props.onBlur?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ref: localTriggerRef,
        ...props,
      })
    }

    return (
      <div
        ref={localTriggerRef as React.RefObject<HTMLDivElement>}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", align = "center", children, ...props }, ref) => {
    const { open, triggerRef } = useTooltip()
    const [position, setPosition] = React.useState({ top: 0, left: 0 })
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return

      const updatePosition = () => {
        const trigger = triggerRef.current
        const content = contentRef.current
        if (!trigger || !content) return

        const triggerRect = trigger.getBoundingClientRect()
        const contentRect = content.getBoundingClientRect()
        const scrollX = window.scrollX || window.pageXOffset
        const scrollY = window.scrollY || window.pageYOffset

        let top = 0
        let left = 0

        switch (side) {
          case "top":
            top = triggerRect.top + scrollY - contentRect.height - 8
            break
          case "bottom":
            top = triggerRect.bottom + scrollY + 8
            break
          case "left":
            top = triggerRect.top + scrollY + triggerRect.height / 2 - contentRect.height / 2
            left = triggerRect.left + scrollX - contentRect.width - 8
            break
          case "right":
            top = triggerRect.top + scrollY + triggerRect.height / 2 - contentRect.height / 2
            left = triggerRect.right + scrollX + 8
            break
        }

        switch (align) {
          case "start":
            if (side === "top" || side === "bottom") {
              left = triggerRect.left + scrollX
            } else {
              if (side === "left" || side === "right") {
                top = triggerRect.top + scrollY
              }
            }
            break
          case "end":
            if (side === "top" || side === "bottom") {
              left = triggerRect.right + scrollX - contentRect.width
            } else {
              if (side === "left" || side === "right") {
                top = triggerRect.bottom + scrollY - contentRect.height
              }
            }
            break
          case "center":
          default:
            if (side === "top" || side === "bottom") {
              left = triggerRect.left + scrollX + triggerRect.width / 2 - contentRect.width / 2
            }
            break
        }

        setPosition({ top, left })
      }

      updatePosition()
      window.addEventListener("scroll", updatePosition, true)
      window.addEventListener("resize", updatePosition)

      return () => {
        window.removeEventListener("scroll", updatePosition, true)
        window.removeEventListener("resize", updatePosition)
      }
    }, [open, side, align, triggerRef])

    if (!open) return null

    const content = (
      <div
        ref={contentRef}
        data-tooltip-content
        className={cn(
          "z-50 rounded-md border-2 border-foreground bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground neobrutalism-shadow-sm",
          className
        )}
        style={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        {...props}
      >
        {children}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent }


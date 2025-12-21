"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/components/ui/tooltip"
import { CodeBlock } from "@/app/components/code-block"

export default function TooltipDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Tooltip</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A popup that displays information related to an element when it receives keyboard focus or mouse hover.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Tooltip component displays a small popup with additional information when users hover over
            or focus on an element. It provides contextual help without cluttering the interface.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/tooltip.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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
      return React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ref: localTriggerRef,
        ...props,
      } as any)
    }

    return (
      <div
        ref={localTriggerRef as any}
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
          top: \`\${position.top}px\`,
          left: \`\${position.left}px\`,
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

export { Tooltip, TooltipTrigger, TooltipContent }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/tooltip.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const TooltipContext = React.createContext(undefined)

const useTooltip = () => {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("Tooltip components must be used within Tooltip")
  }
  return context
}

const Tooltip = ({ delayDuration = 0, children }) => {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef(null)
  const openTimeoutRef = React.useRef(null)
  const closeTimeoutRef = React.useRef(null)

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

const TooltipTrigger = React.forwardRef(
  ({ className, children, asChild, ...props }, ref) => {
    const { handleOpen, handleClose, triggerRef } = useTooltip()
    const localTriggerRef = React.useRef(null)

    React.useImperativeHandle(ref, () => localTriggerRef.current)

    React.useEffect(() => {
      if (localTriggerRef.current) {
        triggerRef.current = localTriggerRef.current
      }
    }, [triggerRef])

    const handleMouseEnter = (e) => {
      handleOpen()
      props.onMouseEnter?.(e)
    }

    const handleMouseLeave = (e) => {
      handleClose()
      props.onMouseLeave?.(e)
    }

    const handleFocus = (e) => {
      handleOpen()
      props.onFocus?.(e)
    }

    const handleBlur = (e) => {
      handleClose()
      props.onBlur?.(e)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
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
        ref={localTriggerRef}
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

const TooltipContent = React.forwardRef(
  ({ className, side = "top", align = "center", children, ...props }, ref) => {
    const { open, triggerRef } = useTooltip()
    const [position, setPosition] = React.useState({ top: 0, left: 0 })
    const contentRef = React.useRef(null)

    React.useImperativeHandle(ref, () => contentRef.current)

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
          top: \`\${position.top}px\`,
          left: \`\${position.left}px\`,
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

export { Tooltip, TooltipTrigger, TooltipContent }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

function MyComponent() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

function MyComponent() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
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
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>Add to library</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>Hover</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Different Positions</h3>
              <div className="flex flex-col gap-4 items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>Top</Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Tooltip on top</p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>Left</Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Tooltip on left</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>Right</Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Tooltip on right</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>Bottom</Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Tooltip on bottom</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/tabs">
            <Button variant="outline" size="lg">
              ← Tabs
            </Button>
          </Link>
          <Link href="/docs/components/textarea">
            <Button variant="outline" size="lg">
              Textarea →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    const viewportRef = React.useRef<HTMLDivElement>(null)
    const [showScrollbar, setShowScrollbar] = React.useState(false)

    React.useEffect(() => {
      const viewport = viewportRef.current
      if (!viewport) return

      const checkScroll = () => {
        const hasScroll = viewport.scrollHeight > viewport.clientHeight
        setShowScrollbar(hasScroll)
      }

      checkScroll()
      viewport.addEventListener("scroll", checkScroll)
      
      const resizeObserver = new ResizeObserver(checkScroll)
      resizeObserver.observe(viewport)

      return () => {
        viewport.removeEventListener("scroll", checkScroll)
        resizeObserver.disconnect()
      }
    }, [])

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <div
          ref={viewportRef}
          className="h-full w-full rounded-[inherit] overflow-y-scroll scrollbar-hide"
        >
          {children}
        </div>
        {showScrollbar && (
          <ScrollBar orientation="vertical" />
        )}
      </div>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
}

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute right-0 top-0 z-10 flex touch-none select-none transition-colors",
          orientation === "vertical" &&
            "h-full w-2.5 border-l-2 border-foreground p-[1px]",
          orientation === "horizontal" &&
            "bottom-0 left-0 h-2.5 w-full flex-col border-t-2 border-foreground p-[1px]",
          className
        )}
        {...props}
      >
        <div className="relative flex-1 rounded-full bg-foreground/30" />
      </div>
    )
  }
)
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }


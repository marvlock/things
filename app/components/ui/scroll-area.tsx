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
          "absolute right-0 top-0 z-10 flex touch-none select-none transition-all",
          orientation === "vertical" &&
            "h-full w-[18px] border-l-2 border-foreground bg-background [background-image:radial-gradient(circle,hsl(var(--foreground)/0.1)_1.5px,transparent_1.5px)] [background-size:8px_8px]",
          orientation === "horizontal" &&
            "bottom-0 left-0 h-[18px] w-full flex-col border-t-2 border-foreground bg-background [background-image:radial-gradient(circle,hsl(var(--foreground)/0.1)_1.5px,transparent_1.5px)] [background-size:8px_8px]",
          className
        )}
        {...props}
      >
        <div className={cn(
          "relative flex-1 bg-primary border-2 border-foreground transition-all duration-75",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-foreground hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
          "[background-image:linear-gradient(transparent_0,transparent_40%,hsl(var(--background)/0.3)_40%,hsl(var(--background)/0.3)_42%,transparent_42%,transparent_48%,hsl(var(--background)/0.3)_48%,hsl(var(--background)/0.3)_50%,transparent_50%,transparent_56%,hsl(var(--background)/0.3)_56%,hsl(var(--background)/0.3)_58%,transparent_58%)]",
          orientation === "vertical" ? "mx-[2px] my-[4px]" : "mx-[4px] my-[2px]"
        )} />
      </div>
    )
  }
)
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }


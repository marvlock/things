"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * A scrollable area component.
 * Uses native CSS styled scrollbars for maximum performance and reliability
 * while maintaining the neobrutalist aesthetic.
 */
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-auto neobrutalism-scrollbar", 
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

/**
 * For backwards compatibility with shadcn-like APIs
 */
const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }
>(() => {
  return null // Native scrollbars are used instead
})
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }

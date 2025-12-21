"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({ children, direction = "left", speed = 50, pauseOnHover = false, className, ...props }, ref) => {
    const [isPaused, setIsPaused] = React.useState(false)
    const childrenArray = React.Children.toArray(children)
    
    const duration = `${speed}s`
    const animationName = direction === "left" ? "marquee" : "marquee-right"

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden whitespace-nowrap border-t-2 border-b-2 border-foreground py-4", className)}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className="flex"
          style={{
            animationName: isPaused ? "none" : animationName,
            animationDuration: isPaused ? "0s" : duration,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {React.Children.map(childrenArray, (child, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 px-4">
              {child}
            </div>
          ))}
          {React.Children.map(childrenArray, (child, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 px-4">
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }
)
Marquee.displayName = "Marquee"

type MarqueeItemProps = React.HTMLAttributes<HTMLDivElement>

const MarqueeItem = React.forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-shrink-0", className)}
      {...props}
    />
  )
)
MarqueeItem.displayName = "MarqueeItem"

export { Marquee, MarqueeItem }


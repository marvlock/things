"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Marquee } from "@/app/components/ui/marquee"
import { CodeBlock } from "@/app/components/code-block"

export default function MarqueeDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Marquee</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A scrolling text component that animates horizontally.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Marquee component displays a continuous horizontal scrolling animation.
            It supports customizable speed, direction, and pause on hover functionality.
            Built from scratch using React and CSS animations. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/marquee.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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
    
    const duration = \`\${speed}s\`
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
            <div key={\`first-\${index}\`} className="flex-shrink-0 px-4">
              {child}
            </div>
          ))}
          {React.Children.map(childrenArray, (child, index) => (
            <div key={\`second-\${index}\`} className="flex-shrink-0 px-4">
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }
)
Marquee.displayName = "Marquee"

interface MarqueeItemProps extends React.HTMLAttributes<HTMLDivElement> {}

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

export { Marquee, MarqueeItem }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/marquee.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Marquee = React.forwardRef(
  ({ children, direction = "left", speed = 50, pauseOnHover = false, className, ...props }, ref) => {
    const [isPaused, setIsPaused] = React.useState(false)
    const childrenArray = React.Children.toArray(children)
    
    const duration = \`\${speed}s\`
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
            <div key={\`first-\${index}\`} className="flex-shrink-0 px-4">
              {child}
            </div>
          ))}
          {React.Children.map(childrenArray, (child, index) => (
            <div key={\`second-\${index}\`} className="flex-shrink-0 px-4">
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }
)
Marquee.displayName = "Marquee"

const MarqueeItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-shrink-0", className)}
      {...props}
    />
  )
)
MarqueeItem.displayName = "MarqueeItem"

export { Marquee, MarqueeItem }`}
                language="jsx"
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Also add this CSS animation to your <code className="bg-muted px-1 py-0.5 rounded">globals.css</code>:
          </p>
          <CodeBlock
            code={`@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}`}
            language="css"
          />

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Marquee } from "@/components/ui/marquee"

function MyComponent() {
  return (
    <Marquee>
      <span>Item 1</span>
      <span>Item 2</span>
      <span>Item 3</span>
      <span>Item 4</span>
      <span>Item 5</span>
    </Marquee>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Marquee } from "@/components/ui/marquee"

function MyComponent() {
  return (
    <Marquee>
      <span>Item 1</span>
      <span>Item 2</span>
      <span>Item 3</span>
      <span>Item 4</span>
      <span>Item 5</span>
    </Marquee>
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
              <Marquee>
                <span className="text-lg font-bold">Item 1</span>
                <span className="text-lg font-bold">Item 2</span>
                <span className="text-lg font-bold">Item 3</span>
                <span className="text-lg font-bold">Item 4</span>
                <span className="text-lg font-bold">Item 5</span>
              </Marquee>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Right Direction</h3>
              <Marquee direction="right">
                <span className="text-lg font-bold">Item 1</span>
                <span className="text-lg font-bold">Item 2</span>
                <span className="text-lg font-bold">Item 3</span>
                <span className="text-lg font-bold">Item 4</span>
                <span className="text-lg font-bold">Item 5</span>
              </Marquee>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Faster Speed</h3>
              <Marquee speed={30}>
                <span className="text-lg font-bold">Item 1</span>
                <span className="text-lg font-bold">Item 2</span>
                <span className="text-lg font-bold">Item 3</span>
                <span className="text-lg font-bold">Item 4</span>
                <span className="text-lg font-bold">Item 5</span>
              </Marquee>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Pause on Hover</h3>
              <Marquee pauseOnHover>
                <span className="text-lg font-bold">Item 1</span>
                <span className="text-lg font-bold">Item 2</span>
                <span className="text-lg font-bold">Item 3</span>
                <span className="text-lg font-bold">Item 4</span>
                <span className="text-lg font-bold">Item 5</span>
              </Marquee>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/label">
            <Button variant="outline" size="lg">
              ← Label
            </Button>
          </Link>
          <Link href="/docs/components/menubar">
            <Button variant="outline" size="lg">
              Menubar →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { CodeBlock } from "@/app/components/code-block"

export default function ScrollAreaDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Scroll Area</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Augments native scroll functionality for custom, cross-browser styling.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Scroll Area component provides a custom-styled scrollable container.
            It hides native scrollbars and provides a clean, consistent scrolling experience across browsers.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/scroll-area.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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

export { ScrollArea, ScrollBar }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/scroll-area.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const viewportRef = React.useRef(null)
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

const ScrollBar = React.forwardRef(
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

export { ScrollArea, ScrollBar }`}
                language="jsx"
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Also add this CSS to your <code className="bg-muted px-1 py-0.5 rounded">globals.css</code>:
          </p>
          <CodeBlock
            code={`.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}`}
            language="css"
          />

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { ScrollArea } from "@/components/ui/scroll-area"

function MyComponent() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border-2 border-foreground p-4">
      <div className="space-y-4">
        <p>Long content here...</p>
      </div>
    </ScrollArea>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { ScrollArea } from "@/components/ui/scroll-area"

function MyComponent() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border-2 border-foreground p-4">
      <div className="space-y-4">
        <p>Long content here...</p>
      </div>
    </ScrollArea>
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
              <ScrollArea className="h-[200px] w-[350px] rounded-md border-2 border-foreground bg-primary text-primary-foreground p-4 neobrutalism-shadow">
                <div className="space-y-4">
                  <p>
                    Things is a collection of beautifully designed components built from scratch. Each component is carefully crafted to provide a great user experience while maintaining accessibility and customization options.
                  </p>
                  <p>
                    All components are built using React and Tailwind CSS, with no external dependencies. This ensures fast performance and easy integration into your projects.
                  </p>
                  <p>
                    The design system follows a neobrutalism aesthetic with bold borders, shadows, and clean typography. Every component is fully accessible and follows web standards.
                  </p>
                  <p>
                    You can use these components as building blocks for your applications, customizing them to fit your specific needs. The code is clean, well-documented, and easy to understand.
                  </p>
                </div>
              </ScrollArea>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With Custom Height</h3>
              <ScrollArea className="h-[150px] w-full rounded-md border-2 border-foreground bg-background p-4">
                <div className="space-y-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="text-sm">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/resizable">
            <Button variant="outline" size="lg">
              ← Resizable
            </Button>
          </Link>
          <Link href="/docs/components/sheet">
            <Button variant="outline" size="lg">
              Sheet →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


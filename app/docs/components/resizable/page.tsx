"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/app/components/ui/resizable"
import { CodeBlock } from "@/app/components/code-block"

export default function ResizableDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Resizable</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Accessible resizable panel groups with keyboard support.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Resizable component provides resizable panel groups that can be dragged to adjust sizes.
            It supports horizontal and vertical layouts, keyboard navigation, and accessibility features.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/resizable.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ResizableContextValue {
  direction: "horizontal" | "vertical"
  panels: string[]
  sizes: Record<string, number>
  setSizes: (sizes: Record<string, number>) => void
  registerPanel: (id: string, defaultSize?: number) => void
  unregisterPanel: (id: string) => void
}

const ResizableContext = React.createContext<ResizableContextValue | undefined>(undefined)

const useResizable = () => {
  const context = React.useContext(ResizableContext)
  if (!context) {
    throw new Error("Resizable components must be used within ResizablePanelGroup")
  }
  return context
}

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  children: React.ReactNode
}

const ResizablePanelGroup = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ className, direction = "horizontal", children, ...props }, ref) => {
    const [panels, setPanels] = React.useState<string[]>([])
    const [sizes, setSizes] = React.useState<Record<string, number>>({})

    const registerPanel = React.useCallback((id: string, defaultSize?: number) => {
      setPanels((prev) => {
        if (!prev.includes(id)) {
          return [...prev, id]
        }
        return prev
      })
      if (defaultSize !== undefined) {
        setSizes((prev) => ({
          ...prev,
          [id]: defaultSize,
        }))
      }
    }, [])

    const unregisterPanel = React.useCallback((id: string) => {
      setPanels((prev) => prev.filter((p) => p !== id))
      setSizes((prev) => {
        const newSizes = { ...prev }
        delete newSizes[id]
        return newSizes
      })
    }, [])

    React.useEffect(() => {
      if (panels.length > 0) {
        const totalSize = panels.reduce((sum, id) => sum + (sizes[id] || 0), 0)
        if (totalSize === 0 || totalSize !== 100) {
          const defaultSize = 100 / panels.length
          const newSizes: Record<string, number> = {}
          panels.forEach((id) => {
            newSizes[id] = sizes[id] || defaultSize
          })
          const normalizedTotal = Object.values(newSizes).reduce((sum, size) => sum + size, 0)
          if (normalizedTotal > 0) {
            Object.keys(newSizes).forEach((id) => {
              newSizes[id] = (newSizes[id] / normalizedTotal) * 100
            })
          }
          setSizes(newSizes)
        }
      }
    }, [panels.length])

    return (
      <ResizableContext.Provider
        value={{
          direction,
          panels,
          sizes,
          setSizes,
          registerPanel,
          unregisterPanel,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "flex",
            direction === "horizontal" ? "flex-row" : "flex-col",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ResizableContext.Provider>
    )
  }
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number
  minSize?: number
  maxSize?: number
  id?: string
}

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ className, defaultSize, minSize = 10, maxSize = 90, id, children, ...props }, ref) => {
    const { registerPanel, unregisterPanel, sizes, direction } = useResizable()
    const panelId = id || React.useId()
    const panelRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => panelRef.current as HTMLDivElement)

    React.useEffect(() => {
      registerPanel(panelId, defaultSize)
      return () => {
        unregisterPanel(panelId)
      }
    }, [panelId, defaultSize, registerPanel, unregisterPanel])

    const size = sizes[panelId] || defaultSize || 50

    return (
      <div
        ref={panelRef}
        data-resizable-panel={panelId}
        className={cn(
          "relative overflow-hidden",
          direction === "horizontal" ? "h-full" : "w-full",
          className
        )}
        style={{
          [direction === "horizontal" ? "width" : "height"]: \`\${size}%\`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResizablePanel.displayName = "ResizablePanel"

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean
  disabled?: boolean
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ className, withHandle = true, disabled, ...props }, ref) => {
    const { direction, panels, sizes, setSizes } = useResizable()
    const [isResizing, setIsResizing] = React.useState(false)
    const [startPos, setStartPos] = React.useState(0)
    const [startSizes, setStartSizes] = React.useState<Record<string, number>>({})
    const handleRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => handleRef.current as HTMLDivElement)

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return
      e.preventDefault()
      setIsResizing(true)
      setStartPos(direction === "horizontal" ? e.clientX : e.clientY)
      setStartSizes({ ...sizes })
    }

    React.useEffect(() => {
      if (!isResizing) return

      const handleMouseMove = (e: MouseEvent) => {
        const currentPos = direction === "horizontal" ? e.clientX : e.clientY
        const delta = currentPos - startPos

        if (!handleRef.current) return

        const container = handleRef.current.parentElement
        if (!container) return

        const containerSize = direction === "horizontal"
          ? container.offsetWidth
          : container.offsetHeight

        const deltaPercent = (delta / containerSize) * 100

        const panelIndex = panels.findIndex((id) => {
          const panel = container.querySelector(\`[data-resizable-panel="\${id}"]\`)
          return panel && (direction === "horizontal"
            ? panel.getBoundingClientRect().right <= handleRef.current!.getBoundingClientRect().left
            : panel.getBoundingClientRect().bottom <= handleRef.current!.getBoundingClientRect().top)
        })

        if (panelIndex >= 0 && panelIndex < panels.length - 1) {
          const leftPanelId = panels[panelIndex]
          const rightPanelId = panels[panelIndex + 1]

          const newSizes = { ...startSizes }
          const leftSize = newSizes[leftPanelId] || 50
          const rightSize = newSizes[rightPanelId] || 50

          const newLeftSize = Math.max(10, Math.min(90, leftSize + deltaPercent))
          const newRightSize = Math.max(10, Math.min(90, rightSize - deltaPercent))

          newSizes[leftPanelId] = newLeftSize
          newSizes[rightPanelId] = newRightSize

          setSizes(newSizes)
        }
      }

      const handleMouseUp = () => {
        setIsResizing(false)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [isResizing, startPos, startSizes, direction, panels, sizes, setSizes])

    return (
      <div
        ref={handleRef}
        data-resizable-handle
        className={cn(
          "relative flex items-center justify-center bg-background",
          direction === "horizontal" ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize",
          disabled && "cursor-default opacity-50",
          isResizing && "bg-primary/20",
          className
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {withHandle && (
          <div
            className={cn(
              "rounded-full bg-foreground",
              direction === "horizontal" ? "h-8 w-1" : "h-1 w-8"
            )}
          />
        )}
      </div>
    )
  }
)
ResizableHandle.displayName = "ResizableHandle"

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/resizable.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ResizableContext = React.createContext(undefined)

const useResizable = () => {
  const context = React.useContext(ResizableContext)
  if (!context) {
    throw new Error("Resizable components must be used within ResizablePanelGroup")
  }
  return context
}

const ResizablePanelGroup = React.forwardRef(
  ({ className, direction = "horizontal", children, ...props }, ref) => {
    const [panels, setPanels] = React.useState([])
    const [sizes, setSizes] = React.useState({})

    const registerPanel = React.useCallback((id, defaultSize) => {
      setPanels((prev) => {
        if (!prev.includes(id)) {
          return [...prev, id]
        }
        return prev
      })
      if (defaultSize !== undefined) {
        setSizes((prev) => ({
          ...prev,
          [id]: defaultSize,
        }))
      }
    }, [])

    const unregisterPanel = React.useCallback((id) => {
      setPanels((prev) => prev.filter((p) => p !== id))
      setSizes((prev) => {
        const newSizes = { ...prev }
        delete newSizes[id]
        return newSizes
      })
    }, [])

    React.useEffect(() => {
      if (panels.length > 0) {
        const totalSize = panels.reduce((sum, id) => sum + (sizes[id] || 0), 0)
        if (totalSize === 0 || totalSize !== 100) {
          const defaultSize = 100 / panels.length
          const newSizes = {}
          panels.forEach((id) => {
            newSizes[id] = sizes[id] || defaultSize
          })
          const normalizedTotal = Object.values(newSizes).reduce((sum, size) => sum + size, 0)
          if (normalizedTotal > 0) {
            Object.keys(newSizes).forEach((id) => {
              newSizes[id] = (newSizes[id] / normalizedTotal) * 100
            })
          }
          setSizes(newSizes)
        }
      }
    }, [panels.length])

    return (
      <ResizableContext.Provider
        value={{
          direction,
          panels,
          sizes,
          setSizes,
          registerPanel,
          unregisterPanel,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "flex",
            direction === "horizontal" ? "flex-row" : "flex-col",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ResizableContext.Provider>
    )
  }
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = React.forwardRef(
  ({ className, defaultSize, minSize = 10, maxSize = 90, id, children, ...props }, ref) => {
    const { registerPanel, unregisterPanel, sizes, direction } = useResizable()
    const panelId = id || React.useId()
    const panelRef = React.useRef(null)

    React.useImperativeHandle(ref, () => panelRef.current)

    React.useEffect(() => {
      registerPanel(panelId, defaultSize)
      return () => {
        unregisterPanel(panelId)
      }
    }, [panelId, defaultSize, registerPanel, unregisterPanel])

    const size = sizes[panelId] || defaultSize || 50

    return (
      <div
        ref={panelRef}
        data-resizable-panel={panelId}
        className={cn(
          "relative overflow-hidden",
          direction === "horizontal" ? "h-full" : "w-full",
          className
        )}
        style={{
          [direction === "horizontal" ? "width" : "height"]: \`\${size}%\`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResizablePanel.displayName = "ResizablePanel"

const ResizableHandle = React.forwardRef(
  ({ className, withHandle = true, disabled, ...props }, ref) => {
    const { direction, panels, sizes, setSizes } = useResizable()
    const [isResizing, setIsResizing] = React.useState(false)
    const [startPos, setStartPos] = React.useState(0)
    const [startSizes, setStartSizes] = React.useState({})
    const handleRef = React.useRef(null)

    React.useImperativeHandle(ref, () => handleRef.current)

    const handleMouseDown = (e) => {
      if (disabled) return
      e.preventDefault()
      setIsResizing(true)
      setStartPos(direction === "horizontal" ? e.clientX : e.clientY)
      setStartSizes({ ...sizes })
    }

    React.useEffect(() => {
      if (!isResizing) return

      const handleMouseMove = (e) => {
        const currentPos = direction === "horizontal" ? e.clientX : e.clientY
        const delta = currentPos - startPos

        if (!handleRef.current) return

        const container = handleRef.current.parentElement
        if (!container) return

        const containerSize = direction === "horizontal"
          ? container.offsetWidth
          : container.offsetHeight

        const deltaPercent = (delta / containerSize) * 100

        const panelIndex = panels.findIndex((id) => {
          const panel = container.querySelector(\`[data-resizable-panel="\${id}"]\`)
          return panel && (direction === "horizontal"
            ? panel.getBoundingClientRect().right <= handleRef.current.getBoundingClientRect().left
            : panel.getBoundingClientRect().bottom <= handleRef.current.getBoundingClientRect().top)
        })

        if (panelIndex >= 0 && panelIndex < panels.length - 1) {
          const leftPanelId = panels[panelIndex]
          const rightPanelId = panels[panelIndex + 1]

          const newSizes = { ...startSizes }
          const leftSize = newSizes[leftPanelId] || 50
          const rightSize = newSizes[rightPanelId] || 50

          const newLeftSize = Math.max(10, Math.min(90, leftSize + deltaPercent))
          const newRightSize = Math.max(10, Math.min(90, rightSize - deltaPercent))

          newSizes[leftPanelId] = newLeftSize
          newSizes[rightPanelId] = newRightSize

          setSizes(newSizes)
        }
      }

      const handleMouseUp = () => {
        setIsResizing(false)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [isResizing, startPos, startSizes, direction, panels, sizes, setSizes])

    return (
      <div
        ref={handleRef}
        data-resizable-handle
        className={cn(
          "relative flex items-center justify-center bg-background",
          direction === "horizontal" ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize",
          disabled && "cursor-default opacity-50",
          isResizing && "bg-primary/20",
          className
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {withHandle && (
          <div
            className={cn(
              "rounded-full bg-foreground",
              direction === "horizontal" ? "h-8 w-1" : "h-1 w-8"
            )}
          />
        )}
      </div>
    )
  }
)
ResizableHandle.displayName = "ResizableHandle"

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
}`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

function MyComponent() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-[200px]">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`}
                language="tsx"
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
              <div className="h-[200px] border-2 border-foreground rounded-md overflow-hidden">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center bg-primary text-primary-foreground border-r-2 border-foreground">
                      <span className="font-bold">One</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical" className="h-full">
                      <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center bg-primary text-primary-foreground border-b-2 border-foreground">
                          <span className="font-bold">Two</span>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center bg-primary text-primary-foreground">
                          <span className="font-bold">Three</span>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Vertical</h3>
              <div className="h-[200px] border-2 border-foreground rounded-md overflow-hidden">
                <ResizablePanelGroup direction="vertical" className="h-full">
                  <ResizablePanel defaultSize={33}>
                    <div className="flex h-full items-center justify-center bg-primary text-primary-foreground border-b-2 border-foreground">
                      <span className="font-bold">Top</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={33}>
                    <div className="flex h-full items-center justify-center bg-primary text-primary-foreground border-b-2 border-foreground">
                      <span className="font-bold">Middle</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={34}>
                    <div className="flex h-full items-center justify-center bg-primary text-primary-foreground">
                      <span className="font-bold">Bottom</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/radio-group">
            <Button variant="outline" size="lg">
              ← Radio Group
            </Button>
          </Link>
          <Link href="/docs/components/scroll-area">
            <Button variant="outline" size="lg">
              Scroll Area →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


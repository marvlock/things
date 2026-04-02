"use client"

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
    }, [panels, sizes])

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
  ({ className, defaultSize, id, children, ...props }, ref) => {
    const { registerPanel, unregisterPanel, sizes, direction } = useResizable()
    const generatedId = React.useId()
    const panelId = id || generatedId
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
          [direction === "horizontal" ? "width" : "height"]: `${size}%`,
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

        const leftPanel = handleRef.current.previousElementSibling as HTMLElement
        const rightPanel = handleRef.current.nextElementSibling as HTMLElement

        if (!leftPanel || !rightPanel) return

        const leftPanelId = leftPanel.getAttribute("data-resizable-panel")
        const rightPanelId = rightPanel.getAttribute("data-resizable-panel")

        if (!leftPanelId || !rightPanelId) return

        const container = handleRef.current.parentElement
        if (!container) return

        const containerSize = direction === "horizontal"
          ? container.offsetWidth
          : container.offsetHeight

        const deltaPercent = (delta / containerSize) * 100

        const newSizes = { ...startSizes }
        const leftSize = startSizes[leftPanelId] || 50
        const rightSize = startSizes[rightPanelId] || 50

        const newLeftSize = Math.max(5, Math.min(95, leftSize + deltaPercent))
        const newRightSize = Math.max(5, Math.min(95, rightSize - deltaPercent))

        newSizes[leftPanelId] = newLeftSize
        newSizes[rightPanelId] = newRightSize

        setSizes(newSizes)
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
          "relative flex items-center justify-center bg-background z-10 transition-colors",
          direction === "horizontal" 
            ? "w-2 cursor-col-resize border-x-2 border-foreground hover:bg-primary/10" 
            : "h-2 cursor-row-resize border-y-2 border-foreground hover:bg-primary/10",
          disabled && "cursor-default opacity-50",
          isResizing && "bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
          className
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {withHandle && (
          <div
            className={cn(
              "rounded-full bg-foreground",
              direction === "horizontal" ? "h-6 w-1" : "h-1 w-6"
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
}


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

        const container = handleRef.current.parentElement
        if (!container) return

        const containerSize = direction === "horizontal"
          ? container.offsetWidth
          : container.offsetHeight

        const deltaPercent = (delta / containerSize) * 100

        const panelIndex = panels.findIndex((id) => {
          const panel = container.querySelector(`[data-resizable-panel="${id}"]`)
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
}


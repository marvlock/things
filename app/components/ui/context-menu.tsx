"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface ContextMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  position: { x: number; y: number } | null
  setPosition: (position: { x: number; y: number } | null) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}

const ContextMenuContext = React.createContext<ContextMenuContextValue | undefined>(undefined)

const useContextMenu = () => {
  const context = React.useContext(ContextMenuContext)
  if (!context) {
    throw new Error("ContextMenu components must be used within ContextMenu")
  }
  return context
}

export interface ContextMenuItem {
  id: string
  label?: string
  shortcut?: string
  disabled?: boolean
  checked?: boolean
  onSelect?: () => void
  icon?: React.ReactNode
  separator?: boolean
  submenu?: ContextMenuItem[]
}

interface ContextMenuProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ open: controlledOpen, onOpenChange, children, className, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null)
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    const [, setHoveredSubmenu] = React.useState<string | null>(null)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
      if (!newOpen) {
        setPosition(null)
        setSelectedIndex(-1)
        setHoveredSubmenu(null)
      }
    }, [isControlled, onOpenChange])

    React.useEffect(() => {
      if (!open) return

      const handleClick = () => handleOpenChange(false)
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleOpenChange(false)
        }
      }

      document.addEventListener("click", handleClick, true)
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.removeEventListener("click", handleClick, true)
        document.removeEventListener("keydown", handleEscape)
      }
    }, [open, handleOpenChange])

    return (
      <ContextMenuContext.Provider value={{
        open,
        setOpen: handleOpenChange,
        position,
        setPosition,
        selectedIndex,
        setSelectedIndex,
      }}>
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </ContextMenuContext.Provider>
    )
  }
)
ContextMenu.displayName = "ContextMenu"

type ContextMenuTriggerProps = React.HTMLAttributes<HTMLDivElement>

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { setOpen, setPosition } = useContextMenu()

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setPosition({ x: e.clientX, y: e.clientY })
      setOpen(true)
    }

    return (
      <div
        ref={ref}
        onContextMenu={handleContextMenu}
        className={cn("cursor-context-menu", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContextMenuTrigger.displayName = "ContextMenuTrigger"

interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ContextMenuItem[]
}

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, items, ...props }, ref) => {
    const { open, position, setOpen, setSelectedIndex } = useContextMenu()
    const [hoveredSubmenu, setHoveredSubmenu] = React.useState<string | null>(null)
    const menuRef = React.useRef<HTMLDivElement>(null)
    const submenuRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

    React.useImperativeHandle(ref, () => menuRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (!open || !position || !menuRef.current) return

      const menu = menuRef.current
      const rect = menu.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let x = position.x
      let y = position.y

      if (x + rect.width > viewportWidth) {
        x = viewportWidth - rect.width - 8
      }
      if (y + rect.height > viewportHeight) {
        y = viewportHeight - rect.height - 8
      }
      if (x < 8) x = 8
      if (y < 8) y = 8

      menu.style.left = `${x}px`
      menu.style.top = `${y}px`
    }, [open, position])

    React.useEffect(() => {
      if (!hoveredSubmenu || !submenuRefs.current[hoveredSubmenu]) return

      const submenu = submenuRefs.current[hoveredSubmenu]
      if (!submenu) return

      const rect = submenu.getBoundingClientRect()
      const viewportWidth = window.innerWidth

      let x = position?.x || 0
      const menuWidth = menuRef.current?.offsetWidth || 0
      x = x + menuWidth + 4

      if (x + rect.width > viewportWidth) {
        x = (position?.x || 0) - rect.width - 4
      }
      if (x < 8) x = 8

      submenu.style.left = `${x}px`
      submenu.style.top = `${position?.y || 0}px`
    }, [position, hoveredSubmenu])

    if (!open || !position) return null

    const renderItem = (item: ContextMenuItem, index: number) => {
      if (item.separator) {
        return (
          <div
            key={item.id}
            className="h-px bg-foreground my-1 mx-2"
          />
        )
      }

      const isDisabled = item.disabled
      const isChecked = item.checked
      const hasSubmenu = item.submenu && item.submenu.length > 0
      const isHovered = hoveredSubmenu === item.id

      return (
        <div key={item.id} className="relative">
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled && !hasSubmenu) {
                item.onSelect?.()
                setOpen(false)
              }
            }}
            onMouseEnter={() => {
              if (!isDisabled) {
                setSelectedIndex(index)
                if (hasSubmenu) {
                  setHoveredSubmenu(item.id)
                } else {
                  setHoveredSubmenu(null)
                }
              }
            }}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm font-bold transition-colors text-left",
              isDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-accent hover:text-accent-foreground cursor-pointer",
              className
            )}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {isChecked && (
                <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="flex-1 truncate">{item.label || ""}</span>
            </div>
            <div className="flex items-center gap-4 ml-4">
              {item.shortcut && (
                <span className="text-xs text-muted-foreground font-normal">
                  {item.shortcut}
                </span>
              )}
              {hasSubmenu && (
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </button>
          {hasSubmenu && isHovered && item.submenu && (
            <div
              ref={(el) => {
                submenuRefs.current[item.id] = el
              }}
              className="fixed z-50 min-w-[200px] rounded-md border-2 border-foreground bg-background neobrutalism-shadow p-1"
            >
              {item.submenu.map((subItem, subIndex) => renderItem(subItem, subIndex))}
            </div>
          )}
        </div>
      )
    }

    const content = (
      <div
        ref={menuRef}
        className={cn(
          "fixed z-50 min-w-[200px] rounded-md border-2 border-foreground bg-background neobrutalism-shadow p-1",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {items.map((item, index) => renderItem(item, index))}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
ContextMenuContent.displayName = "ContextMenuContent"

export { ContextMenu, ContextMenuTrigger, ContextMenuContent }


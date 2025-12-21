"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/app/components/ui/context-menu"
import { CodeBlock } from "@/app/components/code-block"

const contextMenuItems = [
  { id: "1", label: "Back", shortcut: "⌘ [", onSelect: () => console.log("Back") },
  { id: "2", label: "Forward", shortcut: "⌘ ]", disabled: true, onSelect: () => console.log("Forward") },
  { id: "3", label: "Reload", shortcut: "⌘ R", onSelect: () => console.log("Reload") },
  { id: "4", label: "More Tools", submenu: [
    { id: "4-1", label: "Extensions", onSelect: () => console.log("Extensions") },
    { id: "4-2", label: "Task Manager", onSelect: () => console.log("Task Manager") },
  ]},
  { id: "sep1", separator: true },
  { id: "5", label: "Show Bookmarks Bar", shortcut: "⇧ ⌘ B", checked: true, onSelect: () => console.log("Toggle Bookmarks") },
  { id: "6", label: "Show Full URLs", onSelect: () => console.log("Toggle URLs") },
  { id: "sep2", separator: true },
  { id: "7", label: "People", disabled: true },
  { id: "8", label: "Pranav Murali", onSelect: () => console.log("Pranav") },
  { id: "9", label: "georgy jacob", onSelect: () => console.log("georgy") },
]

export default function ContextMenuDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Context Menu</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Displays a menu to the user — such as a set of actions or functions.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Context Menu component displays a menu when the user right-clicks on a trigger element. 
            It supports keyboard shortcuts, separators, checkboxes, submenus, and disabled items. 
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/context-menu.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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
  label: string
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

interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

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
    const { open, position, setOpen } = useContextMenu()
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

      menu.style.left = \`\${x}px\`
      menu.style.top = \`\${y}px\`
    }, [open, position])

    React.useEffect(() => {
      if (!hoveredSubmenu || !submenuRefs.current[hoveredSubmenu]) return

      const submenu = submenuRefs.current[hoveredSubmenu]
      if (!submenu) return

      const rect = submenu.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let x = position?.x || 0
      const menuWidth = menuRef.current?.offsetWidth || 0
      x = x + menuWidth + 4

      if (x + rect.width > viewportWidth) {
        x = (position?.x || 0) - rect.width - 4
      }
      if (x < 8) x = 8

      submenu.style.left = \`\${x}px\`
      submenu.style.top = \`\${position?.y || 0}px\`
    }, [hoveredSubmenu, position])

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
              <span className="flex-1 truncate">{item.label}</span>
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

export { ContextMenu, ContextMenuTrigger, ContextMenuContent }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/context-menu.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const ContextMenuContext = React.createContext(undefined)

const useContextMenu = () => {
  const context = React.useContext(ContextMenuContext)
  if (!context) {
    throw new Error("ContextMenu components must be used within ContextMenu")
  }
  return context
}

const ContextMenu = React.forwardRef(
  ({ open: controlledOpen, onOpenChange, children, className, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const [position, setPosition] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(-1)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const handleOpenChange = React.useCallback((newOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
      if (!newOpen) {
        setPosition(null)
        setSelectedIndex(-1)
      }
    }, [isControlled, onOpenChange])

    React.useEffect(() => {
      if (!open) return

      const handleClick = () => handleOpenChange(false)
      const handleEscape = (e) => {
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

const ContextMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { setOpen, setPosition } = useContextMenu()

    const handleContextMenu = (e) => {
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

const ContextMenuContent = React.forwardRef(
  ({ className, items, ...props }, ref) => {
    const { open, position, setOpen } = useContextMenu()
    const [hoveredSubmenu, setHoveredSubmenu] = React.useState(null)
    const menuRef = React.useRef(null)
    const submenuRefs = React.useRef({})

    React.useImperativeHandle(ref, () => menuRef.current)

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

      menu.style.left = \`\${x}px\`
      menu.style.top = \`\${y}px\`
    }, [open, position])

    React.useEffect(() => {
      if (!hoveredSubmenu || !submenuRefs.current[hoveredSubmenu]) return

      const submenu = submenuRefs.current[hoveredSubmenu]
      if (!submenu) return

      const rect = submenu.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let x = position?.x || 0
      const menuWidth = menuRef.current?.offsetWidth || 0
      x = x + menuWidth + 4

      if (x + rect.width > viewportWidth) {
        x = (position?.x || 0) - rect.width - 4
      }
      if (x < 8) x = 8

      submenu.style.left = \`\${x}px\`
      submenu.style.top = \`\${position?.y || 0}px\`
    }, [hoveredSubmenu, position])

    if (!open || !position) return null

    const renderItem = (item, index) => {
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
              <span className="flex-1 truncate">{item.label}</span>
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

export { ContextMenu, ContextMenuTrigger, ContextMenuContent }`}
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
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/components/ui/context-menu"

const items = [
  { id: "1", label: "Back", shortcut: "⌘ [", onSelect: () => console.log("Back") },
  { id: "2", label: "Forward", shortcut: "⌘ ]", disabled: true },
  { id: "3", label: "Reload", shortcut: "⌘ R", onSelect: () => console.log("Reload") },
  { id: "sep1", separator: true },
  { id: "4", label: "Show Bookmarks Bar", shortcut: "⇧ ⌘ B", checked: true },
]

function MyComponent() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="border-2 border-dashed border-foreground p-8 rounded">
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent items={items} />
    </ContextMenu>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/components/ui/context-menu"

const items = [
  { id: "1", label: "Back", shortcut: "⌘ [", onSelect: () => console.log("Back") },
  { id: "2", label: "Forward", shortcut: "⌘ ]", disabled: true },
  { id: "3", label: "Reload", shortcut: "⌘ R", onSelect: () => console.log("Reload") },
  { id: "sep1", separator: true },
  { id: "4", label: "Show Bookmarks Bar", shortcut: "⇧ ⌘ B", checked: true },
]

function MyComponent() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="border-2 border-dashed border-foreground p-8 rounded">
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent items={items} />
    </ContextMenu>
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
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="border-2 border-dashed border-foreground p-8 rounded text-center font-bold">
                  Right click here
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent items={contextMenuItems} />
            </ContextMenu>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/command">
            <Button variant="outline" size="lg">
              ← Command
            </Button>
          </Link>
          <Link href="/docs/components/data-table">
            <Button variant="outline" size="lg">
              Data Table →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


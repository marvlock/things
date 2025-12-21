"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "@/app/components/ui/menubar"
import { CodeBlock } from "@/app/components/code-block"

export default function MenubarDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Menubar</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A horizontal navigation bar with clickable menu items.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Menubar component provides a horizontal navigation bar with dropdown menus.
            It supports keyboard shortcuts, disabled items, separators, and submenus.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/menubar.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0

const formatShortcut = (shortcut: string) => {
  if (isMac) {
    return shortcut.replace(/Mod/g, "⌘").replace(/Alt/g, "⌥").replace(/Shift/g, "⇧").replace(/Ctrl/g, "⌃")
  }
  return shortcut.replace(/Mod/g, "Ctrl")
}

interface MenubarContextValue {
  activeMenu: string | null
  setActiveMenu: (menu: string | null) => void
}

const MenubarContext = React.createContext<MenubarContextValue | undefined>(undefined)

const useMenubar = () => {
  const context = React.useContext(MenubarContext)
  if (!context) {
    throw new Error("Menubar components must be used within Menubar")
  }
  return context
}

interface MenubarProps {
  children: React.ReactNode
}

const Menubar = ({ children }: MenubarProps) => {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!activeMenu) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      const portalContent = document.querySelector('[data-menubar-content]')
      
      if (portalContent && !portalContent.contains(target)) {
        const trigger = document.querySelector(\`[data-menubar-trigger="\${activeMenu}"]\`)
        if (trigger && !trigger.contains(target)) {
          setActiveMenu(null)
        }
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick, true)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [activeMenu])

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <div className="flex items-center gap-1 border-2 border-foreground rounded-md p-1 bg-background neobrutalism-shadow">
        {children}
      </div>
    </MenubarContext.Provider>
  )
}

interface MenubarMenuProps {
  value: string
  children: React.ReactNode
}

const MenubarMenu = ({ value, children }: MenubarMenuProps) => {
  return <>{children}</>
}

interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeMenu, setActiveMenu } = useMenubar()
    const isActive = activeMenu === value

    const handleClick = () => {
      setActiveMenu(isActive ? null : value)
    }

    return (
      <button
        ref={ref}
        data-menubar-trigger={value}
        onClick={handleClick}
        className={cn(
          "px-3 py-1.5 text-sm font-bold rounded-md border-2 border-transparent transition-colors",
          isActive
            ? "bg-primary text-primary-foreground border-foreground neobrutalism-shadow-sm"
            : "hover:bg-muted",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
MenubarTrigger.displayName = "MenubarTrigger"

interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  align?: "start" | "center" | "end"
}

const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, value, align = "start", children, ...props }, ref) => {
    const { activeMenu } = useMenubar()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const triggerRef = React.useRef<HTMLElement | null>(null)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (activeMenu === value) {
        triggerRef.current = document.querySelector(\`[data-menubar-trigger="\${value}"]\`)
      }
    }, [activeMenu, value])

    React.useEffect(() => {
      if (activeMenu !== value || !contentRef.current || !triggerRef.current) return

      const content = contentRef.current
      const trigger = triggerRef.current

      const triggerRect = trigger.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = triggerRect.bottom + 4
      let left = triggerRect.left

      if (align === "end") {
        left = triggerRect.right - contentRect.width
      } else if (align === "center") {
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
      }

      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8
      }
      if (left < 8) left = 8
      if (top + contentRect.height > viewportHeight) {
        top = triggerRect.top - contentRect.height - 4
      }
      if (top < 8) top = 8

      content.style.position = "fixed"
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
    }, [activeMenu, value, align])

    if (activeMenu !== value) return null

    const content = (
      <div
        ref={contentRef}
        data-menubar-content
        className={cn(
          "fixed z-50 min-w-[8rem] rounded-md border-2 border-foreground bg-background p-1 neobrutalism-shadow",
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
MenubarContent.displayName = "MenubarContent"

interface MenubarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  inset?: boolean
}

const MenubarItem = React.forwardRef<HTMLButtonElement, MenubarItemProps>(
  ({ className, disabled, inset, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm font-bold outline-none transition-colors",
          "focus:bg-accent focus:text-accent-foreground",
          disabled && "opacity-50 pointer-events-none",
          inset && "pl-8",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
MenubarItem.displayName = "MenubarItem"

interface MenubarLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenubarLabel = React.forwardRef<HTMLDivElement, MenubarLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-bold", className)}
      {...props}
    />
  )
)
MenubarLabel.displayName = "MenubarLabel"

interface MenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenubarSeparator = React.forwardRef<HTMLDivElement, MenubarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("my-1 h-px bg-foreground", className)}
      {...props}
    />
  )
)
MenubarSeparator.displayName = "MenubarSeparator"

interface MenubarShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  shortcut?: string
}

const MenubarShortcut = React.forwardRef<HTMLSpanElement, MenubarShortcutProps>(
  ({ className, shortcut, children, ...props }, ref) => {
    const displayText = shortcut ? formatShortcut(shortcut) : children
    return (
      <span
        ref={ref}
        className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
        {...props}
      >
        {displayText}
      </span>
    )
  }
)
MenubarShortcut.displayName = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/menubar.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0

const formatShortcut = (shortcut) => {
  if (isMac) {
    return shortcut.replace(/Mod/g, "⌘").replace(/Alt/g, "⌥").replace(/Shift/g, "⇧").replace(/Ctrl/g, "⌃")
  }
  return shortcut.replace(/Mod/g, "Ctrl")
}

const MenubarContext = React.createContext(undefined)

const useMenubar = () => {
  const context = React.useContext(MenubarContext)
  if (!context) {
    throw new Error("Menubar components must be used within Menubar")
  }
  return context
}

const Menubar = ({ children }) => {
  const [activeMenu, setActiveMenu] = React.useState(null)

  React.useEffect(() => {
    if (!activeMenu) return

    const handleClick = (e) => {
      const target = e.target
      const portalContent = document.querySelector('[data-menubar-content]')
      
      if (portalContent && !portalContent.contains(target)) {
        const trigger = document.querySelector(\`[data-menubar-trigger="\${activeMenu}"]\`)
        if (trigger && !trigger.contains(target)) {
          setActiveMenu(null)
        }
      }
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setActiveMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick, true)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [activeMenu])

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <div className="flex items-center gap-1 border-2 border-foreground rounded-md p-1 bg-background neobrutalism-shadow">
        {children}
      </div>
    </MenubarContext.Provider>
  )
}

const MenubarMenu = ({ value, children }) => {
  return <>{children}</>
}

const MenubarTrigger = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { activeMenu, setActiveMenu } = useMenubar()
    const isActive = activeMenu === value

    const handleClick = () => {
      setActiveMenu(isActive ? null : value)
    }

    return (
      <button
        ref={ref}
        data-menubar-trigger={value}
        onClick={handleClick}
        className={cn(
          "px-3 py-1.5 text-sm font-bold rounded-md border-2 border-transparent transition-colors",
          isActive
            ? "bg-primary text-primary-foreground border-foreground neobrutalism-shadow-sm"
            : "hover:bg-muted",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
MenubarTrigger.displayName = "MenubarTrigger"

const MenubarContent = React.forwardRef(
  ({ className, value, align = "start", children, ...props }, ref) => {
    const { activeMenu } = useMenubar()
    const contentRef = React.useRef(null)
    const triggerRef = React.useRef(null)

    React.useImperativeHandle(ref, () => contentRef.current)

    React.useEffect(() => {
      if (activeMenu === value) {
        triggerRef.current = document.querySelector(\`[data-menubar-trigger="\${value}"]\`)
      }
    }, [activeMenu, value])

    React.useEffect(() => {
      if (activeMenu !== value || !contentRef.current || !triggerRef.current) return

      const content = contentRef.current
      const trigger = triggerRef.current

      const triggerRect = trigger.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = triggerRect.bottom + 4
      let left = triggerRect.left

      if (align === "end") {
        left = triggerRect.right - contentRect.width
      } else if (align === "center") {
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
      }

      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8
      }
      if (left < 8) left = 8
      if (top + contentRect.height > viewportHeight) {
        top = triggerRect.top - contentRect.height - 4
      }
      if (top < 8) top = 8

      content.style.position = "fixed"
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
    }, [activeMenu, value, align])

    if (activeMenu !== value) return null

    const content = (
      <div
        ref={contentRef}
        data-menubar-content
        className={cn(
          "fixed z-50 min-w-[8rem] rounded-md border-2 border-foreground bg-background p-1 neobrutalism-shadow",
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
MenubarContent.displayName = "MenubarContent"

const MenubarItem = React.forwardRef(
  ({ className, disabled, inset, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm font-bold outline-none transition-colors",
          "focus:bg-accent focus:text-accent-foreground",
          disabled && "opacity-50 pointer-events-none",
          inset && "pl-8",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
MenubarItem.displayName = "MenubarItem"

const MenubarLabel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-bold", className)}
      {...props}
    />
  )
)
MenubarLabel.displayName = "MenubarLabel"

const MenubarSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("my-1 h-px bg-foreground", className)}
      {...props}
    />
  )
)
MenubarSeparator.displayName = "MenubarSeparator"

const MenubarShortcut = React.forwardRef(
  ({ className, shortcut, children, ...props }, ref) => {
    const displayText = shortcut ? formatShortcut(shortcut) : children
    return (
      <span
        ref={ref}
        className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
        {...props}
      >
        {displayText}
      </span>
    )
  }
)
MenubarShortcut.displayName = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
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
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarShortcut,
  MenubarSeparator,
} from "@/components/ui/menubar"

function MyComponent() {
  return (
    <Menubar>
      <MenubarMenu value="file">
        <MenubarTrigger value="file">File</MenubarTrigger>
        <MenubarContent value="file">
          <MenubarItem>
            New Tab
            <MenubarShortcut shortcut="Mod+T" />
          </MenubarItem>
          <MenubarItem>
            New Window
            <MenubarShortcut shortcut="Mod+N" />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>New Incognito Window</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
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
              <Menubar>
                <MenubarMenu value="file">
                  <MenubarTrigger value="file">File</MenubarTrigger>
                  <MenubarContent value="file">
                    <MenubarItem>
                      New Tab
                      <MenubarShortcut shortcut="Mod+T" />
                    </MenubarItem>
                    <MenubarItem>
                      New Window
                      <MenubarShortcut shortcut="Mod+N" />
                    </MenubarItem>
                    <MenubarItem disabled>New Incognito Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Share
                      <span className="ml-auto">›</span>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu value="edit">
                  <MenubarTrigger value="edit">Edit</MenubarTrigger>
                  <MenubarContent value="edit">
                    <MenubarItem>Undo</MenubarItem>
                    <MenubarItem>Redo</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu value="view">
                  <MenubarTrigger value="view">View</MenubarTrigger>
                  <MenubarContent value="view">
                    <MenubarItem>Zoom In</MenubarItem>
                    <MenubarItem>Zoom Out</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu value="profiles">
                  <MenubarTrigger value="profiles">Profiles</MenubarTrigger>
                  <MenubarContent value="profiles">
                    <MenubarItem>Profile 1</MenubarItem>
                    <MenubarItem>Profile 2</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/marquee">
            <Button variant="outline" size="lg">
              ← Marquee
            </Button>
          </Link>
          <Link href="/docs/components/navigation-menu">
            <Button variant="outline" size="lg">
              Navigation Menu →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


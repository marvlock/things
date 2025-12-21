"use client"

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
        const trigger = document.querySelector(`[data-menubar-trigger="${activeMenu}"]`)
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

const MenubarMenu = ({ children }: MenubarMenuProps) => {
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
        triggerRef.current = document.querySelector(`[data-menubar-trigger="${value}"]`)
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
      content.style.top = `${top}px`
      content.style.left = `${left}px`
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

type MenubarLabelProps = React.HTMLAttributes<HTMLDivElement>

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

type MenubarSeparatorProps = React.HTMLAttributes<HTMLDivElement>

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

interface MenubarSubProps {
  value: string
  children: React.ReactNode
}

const MenubarSub = ({ children }: MenubarSubProps) => {
  const childrenArray = React.Children.toArray(children)
  const trigger = childrenArray.find((child): child is React.ReactElement => {
    if (!React.isValidElement(child) || !child?.type) return false
    const displayName = (child.type as { displayName?: string }).displayName
    return displayName === "MenubarSubTrigger"
  })
  const content = childrenArray.find((child): child is React.ReactElement => {
    if (!React.isValidElement(child) || !child?.type) return false
    const displayName = (child.type as { displayName?: string }).displayName
    return displayName === "MenubarSubContent"
  })
  
  if (trigger && content) {
    return React.cloneElement(trigger, {
      submenu: content,
      children: trigger.props.children,
    })
  }
  
  return <>{children}</>
}

interface MenubarSubTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  submenu?: React.ReactNode
}

const MenubarSubTrigger = React.forwardRef<HTMLButtonElement, MenubarSubTriggerProps>(
  ({ className, children, submenu, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const submenuRef = React.useRef<HTMLDivElement>(null)
    const itemRef = React.useRef<HTMLButtonElement>(null)

    React.useImperativeHandle(ref, () => itemRef.current as HTMLButtonElement)

    React.useEffect(() => {
      if (!isOpen || !submenuRef.current || !itemRef.current) return

      const submenuEl = submenuRef.current
      const item = itemRef.current
      const itemRect = item.getBoundingClientRect()
      const submenuRect = submenuEl.getBoundingClientRect()
      const viewportWidth = window.innerWidth

      let left = itemRect.right + 4
      let top = itemRect.top

      if (left + submenuRect.width > viewportWidth) {
        left = itemRect.left - submenuRect.width - 4
      }
      if (left < 8) left = 8
      if (top + submenuRect.height > window.innerHeight) {
        top = window.innerHeight - submenuRect.height - 8
      }
      if (top < 8) top = 8

      submenuEl.style.position = "fixed"
      submenuEl.style.top = `${top}px`
      submenuEl.style.left = `${left}px`
    }, [isOpen])

    return (
      <>
        <button
          ref={itemRef}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={cn(
            "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm font-bold outline-none transition-colors",
            "focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {children}
          {submenu && <span className="ml-auto">›</span>}
        </button>
        {isOpen && submenu && (
          <div
            ref={submenuRef}
            className="fixed z-50 min-w-[8rem] rounded-md border-2 border-foreground bg-background p-1 neobrutalism-shadow"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {submenu}
          </div>
        )}
      </>
    )
  }
)
MenubarSubTrigger.displayName = "MenubarSubTrigger"

interface MenubarSubContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const MenubarSubContent = React.forwardRef<HTMLDivElement, MenubarSubContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-w-[8rem] rounded-md border-2 border-foreground bg-background p-1 neobrutalism-shadow", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MenubarSubContent.displayName = "MenubarSubContent"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}


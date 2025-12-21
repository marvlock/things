"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface NavigationMenuContextValue {
  activeItem: string | null
  setActiveItem: (item: string | null) => void
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | undefined>(undefined)

const useNavigationMenu = () => {
  const context = React.useContext(NavigationMenuContext)
  if (!context) {
    throw new Error("NavigationMenu components must be used within NavigationMenu")
  }
  return context
}

interface NavigationMenuProps {
  children: React.ReactNode
  className?: string
}

const NavigationMenu = ({ children, className }: NavigationMenuProps) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!activeItem) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      const portalContent = document.querySelector('[data-navigation-menu-content]')
      
      if (portalContent && !portalContent.contains(target)) {
        const trigger = document.querySelector(`[data-navigation-menu-trigger="${activeItem}"]`)
        if (trigger && !trigger.contains(target)) {
          setActiveItem(null)
        }
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null)
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick, true)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [activeItem])

  return (
    <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <nav className={cn("flex items-center gap-1", className)}>
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  )
}

type NavigationMenuListProps = React.HTMLAttributes<HTMLUListElement>

const NavigationMenuList = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
)
NavigationMenuList.displayName = "NavigationMenuList"

interface NavigationMenuItemProps {
  value: string
  children: React.ReactNode
}

const NavigationMenuItem = ({ children }: NavigationMenuItemProps) => {
  return <>{children}</>
}

interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeItem, setActiveItem } = useNavigationMenu()
    const isActive = activeItem === value

    const handleClick = () => {
      setActiveItem(isActive ? null : value)
    }

    return (
      <button
        ref={ref}
        data-navigation-menu-trigger={value}
        onClick={handleClick}
        className={cn(
          "px-4 py-2 text-sm font-bold rounded-md border-2 border-transparent transition-colors flex items-center gap-1",
          isActive
            ? "bg-primary text-primary-foreground border-foreground neobrutalism-shadow-sm"
            : "hover:bg-muted",
          className
        )}
        {...props}
      >
        {children}
        <span className={cn("transition-transform", isActive && "rotate-180")}>
          ▼
        </span>
      </button>
    )
  }
)
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

type NavigationMenuLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "px-4 py-2 text-sm font-bold rounded-md border-2 border-transparent transition-colors hover:bg-muted",
        className
      )}
      {...props}
    />
  )
)
NavigationMenuLink.displayName = "NavigationMenuLink"

interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeItem } = useNavigationMenu()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const triggerRef = React.useRef<HTMLElement | null>(null)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (activeItem === value) {
        triggerRef.current = document.querySelector(`[data-navigation-menu-trigger="${value}"]`)
      }
    }, [activeItem, value])

    React.useEffect(() => {
      if (activeItem !== value || !contentRef.current || !triggerRef.current) return

      const content = contentRef.current
      const trigger = triggerRef.current

      const triggerRect = trigger.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = triggerRect.bottom + 8
      let left = triggerRect.left

      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8
      }
      if (left < 8) left = 8
      if (top + contentRect.height > viewportHeight) {
        top = triggerRect.top - contentRect.height - 8
      }
      if (top < 8) top = 8

      content.style.position = "fixed"
      content.style.top = `${top}px`
      content.style.left = `${left}px`
    }, [activeItem, value])

    if (activeItem !== value) return null

    const content = (
      <div
        ref={contentRef}
        data-navigation-menu-content
        className={cn(
          "fixed z-50 rounded-md border-2 border-foreground bg-background p-6 neobrutalism-shadow",
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
NavigationMenuContent.displayName = "NavigationMenuContent"

type NavigationMenuViewportProps = React.HTMLAttributes<HTMLDivElement>

const NavigationMenuViewport = React.forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
)
NavigationMenuViewport.displayName = "NavigationMenuViewport"

type NavigationMenuIndicatorProps = React.HTMLAttributes<HTMLDivElement>

const NavigationMenuIndicator = React.forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
)
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuIndicator,
}


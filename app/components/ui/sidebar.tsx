"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("Sidebar components must be used within Sidebar")
  }
  return context
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, defaultCollapsed = false, collapsed: controlledCollapsed, onCollapsedChange, children, ...props }, ref) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed)
    const isControlled = controlledCollapsed !== undefined
    const collapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed

    const handleCollapsedChange = React.useCallback((newCollapsed: boolean) => {
      if (!isControlled) {
        setUncontrolledCollapsed(newCollapsed)
      }
      onCollapsedChange?.(newCollapsed)
    }, [isControlled, onCollapsedChange])

    return (
      <SidebarContext.Provider value={{ collapsed, setCollapsed: handleCollapsedChange }}>
        <aside
          ref={ref}
          className={cn(
            "flex flex-col border-r-2 border-foreground bg-background transition-all duration-300",
            collapsed ? "w-16" : "w-64",
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn("flex items-center border-b-2 border-foreground", collapsed ? "p-2" : "p-4", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

interface SidebarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  subtitle?: string
}

const SidebarBrand = React.forwardRef<HTMLDivElement, SidebarBrandProps>(
  ({ className, icon, title, subtitle, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        {icon && (
          <div className={cn("flex-shrink-0", collapsed && "mx-auto")}>
            {icon}
          </div>
        )}
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm truncate">{title}</div>
            {subtitle && (
              <div className="text-xs text-muted-foreground truncate">{subtitle}</div>
            )}
          </div>
        )}
        {children}
      </div>
    )
  }
)
SidebarBrand.displayName = "SidebarBrand"

type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebar()
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto", collapsed ? "p-2" : "p-4", className)}
        {...props}
      />
    )
  }
)
SidebarContent.displayName = "SidebarContent"

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, label, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    return (
      <div
        ref={ref}
        className={cn("space-y-2 mb-6", className)}
        {...props}
      >
        {label && !collapsed && (
          <div className="px-2 text-xs font-bold uppercase text-muted-foreground">
            {label}
          </div>
        )}
        {children}
      </div>
    )
  }
)
SidebarSection.displayName = "SidebarSection"

type SidebarMenuProps = React.HTMLAttributes<HTMLUListElement>

const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("space-y-1", className)}
      {...props}
    />
  )
)
SidebarMenu.displayName = "SidebarMenu"

type SidebarMenuItemProps = React.LiHTMLAttributes<HTMLLIElement>

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
)
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
  icon?: React.ReactNode
  badge?: React.ReactNode
  rightIcon?: React.ReactNode
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, asChild, isActive, icon, badge, rightIcon, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    const buttonClassName = cn(
      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-bold transition-colors",
      "hover:bg-accent hover:text-accent-foreground",
      isActive && "bg-accent text-accent-foreground",
      collapsed && "justify-center px-2",
      className
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(buttonClassName, children.props.className),
        ref,
        ...props,
      })
    }

    return (
      <button
        ref={ref}
        className={buttonClassName}
        {...props}
      >
        {icon && (
          <span className={cn("flex-shrink-0", collapsed && "mx-auto")}>
            {icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{children}</span>
            {badge && <span className="ml-auto">{badge}</span>}
            {rightIcon && <span className="ml-auto">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

interface SidebarMenuSubProps {
  children: React.ReactNode
}

const SidebarMenuSub = ({ children }: SidebarMenuSubProps) => {
  return <>{children}</>
}

interface SidebarMenuSubItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  isActive?: boolean
}

const SidebarMenuSubItem = React.forwardRef<HTMLButtonElement, SidebarMenuSubItemProps>(
  ({ className, icon, isActive, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    if (collapsed) return null

    return (
      <button
        ref={ref}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 pl-8 text-sm font-bold transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-accent text-accent-foreground",
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-1 text-left">{children}</span>
      </button>
    )
  }
)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("my-2 border-t-2 border-foreground", className)}
    {...props}
  />
))
SidebarMenuSeparator.displayName = "SidebarMenuSeparator"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn("border-t-2 border-foreground", collapsed ? "p-2" : "p-4", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <button
      ref={ref}
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border-2 border-foreground bg-background transition-colors hover:bg-accent hover:text-accent-foreground neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
        className
      )}
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <span className="sr-only">Toggle sidebar</span>
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export {
  Sidebar,
  SidebarHeader,
  SidebarBrand,
  SidebarContent,
  SidebarSection,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSeparator,
  SidebarFooter,
  SidebarTrigger,
}


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
} from "@/app/components/ui/navigation-menu"
import { CodeBlock } from "@/app/components/code-block"

export default function NavigationMenuDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Navigation Menu</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A collection of links for site navigation.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Navigation Menu component provides a horizontal navigation bar with dropdown menus.
            It supports two-column layouts with content sections and navigation items.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/navigation-menu.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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
        const trigger = document.querySelector(\`[data-navigation-menu-trigger="\${activeItem}"]\`)
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

interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

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

const NavigationMenuItem = ({ value, children }: NavigationMenuItemProps) => {
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

interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

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
        triggerRef.current = document.querySelector(\`[data-navigation-menu-trigger="\${value}"]\`)
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
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
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

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/navigation-menu.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

const NavigationMenuContext = React.createContext(undefined)

const useNavigationMenu = () => {
  const context = React.useContext(NavigationMenuContext)
  if (!context) {
    throw new Error("NavigationMenu components must be used within NavigationMenu")
  }
  return context
}

const NavigationMenu = ({ children, className }) => {
  const [activeItem, setActiveItem] = React.useState(null)

  React.useEffect(() => {
    if (!activeItem) return

    const handleClick = (e) => {
      const target = e.target
      const portalContent = document.querySelector('[data-navigation-menu-content]')
      
      if (portalContent && !portalContent.contains(target)) {
        const trigger = document.querySelector(\`[data-navigation-menu-trigger="\${activeItem}"]\`)
        if (trigger && !trigger.contains(target)) {
          setActiveItem(null)
        }
      }
    }

    const handleEscape = (e) => {
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

const NavigationMenuList = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
)
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = ({ value, children }) => {
  return <>{children}</>
}

const NavigationMenuTrigger = React.forwardRef(
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

const NavigationMenuLink = React.forwardRef(
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

const NavigationMenuContent = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { activeItem } = useNavigationMenu()
    const contentRef = React.useRef(null)
    const triggerRef = React.useRef(null)

    React.useImperativeHandle(ref, () => contentRef.current)

    React.useEffect(() => {
      if (activeItem === value) {
        triggerRef.current = document.querySelector(\`[data-navigation-menu-trigger="\${value}"]\`)
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
      content.style.top = \`\${top}px\`
      content.style.left = \`\${left}px\`
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

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
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
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

function MyComponent() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="getting-started">
          <NavigationMenuTrigger value="getting-started">
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent value="getting-started">
            <div className="grid grid-cols-2 gap-6 w-[600px]">
              <div>
                <h3 className="text-lg font-bold mb-2">Things</h3>
                <p className="text-sm text-muted-foreground">
                  Beautifully designed components built from scratch.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-1">Introduction</h4>
                  <p className="text-sm text-muted-foreground">
                    Re-usable components built using React and Tailwind CSS.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Installation</h4>
                  <p className="text-sm text-muted-foreground">
                    How to install dependencies and structure your app.
                  </p>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem value="getting-started">
                    <NavigationMenuTrigger value="getting-started">
                      Getting started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent value="getting-started">
            <div className="grid grid-cols-2 gap-6 w-[600px]">
              <div>
                <h3 className="text-lg font-bold mb-2">Things</h3>
                <p className="text-sm text-muted-foreground">
                  Beautifully designed components built from scratch. Accessible. Customizable. No dependencies.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-1">Introduction</h4>
                  <p className="text-sm text-muted-foreground">
                    Re-usable components built using React and Tailwind CSS.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Installation</h4>
                  <p className="text-sm text-muted-foreground">
                    How to install dependencies and structure your app.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Typography</h4>
                  <p className="text-sm text-muted-foreground">
                    Styles for headings, paragraphs, lists...etc
                  </p>
                </div>
              </div>
            </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem value="components">
                    <NavigationMenuTrigger value="components">
                      Components
                    </NavigationMenuTrigger>
                    <NavigationMenuContent value="components">
                      <div className="w-[300px]">
                        <div className="space-y-2">
                          <NavigationMenuLink href="#" className="block">
                            Button
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#" className="block">
                            Input
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#" className="block">
                            Card
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem value="documentation">
                    <NavigationMenuLink href="#">
                      Documentation
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/menubar">
            <Button variant="outline" size="lg">
              ← Menubar
            </Button>
          </Link>
          <Link href="/docs/components/pagination">
            <Button variant="outline" size="lg">
              Pagination →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


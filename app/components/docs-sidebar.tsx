"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = {
  "Getting started": [
    { name: "Introduction", href: "/docs" },
    { name: "Installation", href: "/docs/installation" },
    { name: "Resources", href: "/docs/resources" },
    { name: "Changelog", href: "/docs/changelog" },
  ],
  Components: [
    { name: "Accordion", href: "/docs/components/accordion" },
    { name: "Alert", href: "/docs/components/alert" },
    { name: "Alert Dialog", href: "/docs/components/alert-dialog" },
    { name: "Avatar", href: "/docs/components/avatar" },
    { name: "Badge", href: "/docs/components/badge" },
    { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
    { name: "Button", href: "/docs/components/button" },
    { name: "Calendar", href: "/docs/components/calendar" },
    { name: "Card", href: "/docs/components/card" },
    { name: "Carousel", href: "/docs/components/carousel" },
    { name: "Checkbox", href: "/docs/components/checkbox" },
    { name: "Collapsible", href: "/docs/components/collapsible" },
    { name: "Combobox", href: "/docs/components/combobox" },
    { name: "Command", href: "/docs/components/command" },
    { name: "Context Menu", href: "/docs/components/context-menu" },
    { name: "Data Table", href: "/docs/components/data-table" },
    { name: "Date Picker", href: "/docs/components/date-picker" },
    { name: "Dialog", href: "/docs/components/dialog" },
    { name: "Drawer", href: "/docs/components/drawer" },
    { name: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
    { name: "Form", href: "/docs/components/form" },
    { name: "Hover Card", href: "/docs/components/hover-card" },
    { name: "Image Card", href: "/docs/components/image-card" },
    { name: "Input", href: "/docs/components/input" },
    { name: "Input OTP", href: "/docs/components/input-otp" },
    { name: "Label", href: "/docs/components/label" },
    { name: "Marquee", href: "/docs/components/marquee" },
    { name: "Menubar", href: "/docs/components/menubar" },
    { name: "Navigation Menu", href: "/docs/components/navigation-menu" },
    { name: "Pagination", href: "/docs/components/pagination" },
    { name: "Popover", href: "/docs/components/popover" },
    { name: "Progress", href: "/docs/components/progress" },
    { name: "Radio Group", href: "/docs/components/radio-group" },
    { name: "Resizable", href: "/docs/components/resizable" },
    { name: "Scroll Area", href: "/docs/components/scroll-area" },
    { name: "Select", href: "/docs/components/select" },
    { name: "Sheet", href: "/docs/components/sheet" },
    { name: "Sidebar", href: "/docs/components/sidebar" },
    { name: "Skeleton", href: "/docs/components/skeleton" },
    { name: "Slider", href: "/docs/components/slider" },
    { name: "Sonner", href: "/docs/components/sonner" },
    { name: "Switch", href: "/docs/components/switch" },
    { name: "Table", href: "/docs/components/table" },
    { name: "Tabs", href: "/docs/components/tabs" },
    { name: "Textarea", href: "/docs/components/textarea" },
    { name: "Tooltip", href: "/docs/components/tooltip" },
  ],
}

export function DocsSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-20 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground bg-background neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle sidebar"
      >
        <span className="text-xl font-bold">
          {isCollapsed ? "☰" : "✕"}
        </span>
      </button>

      {/* Sidebar */}
      <nav
        className={cn(
          "h-[calc(100vh-4rem)] border-r-2 border-foreground bg-background overflow-y-auto transition-all duration-300",
          isCollapsed
            ? "w-0 lg:w-16 opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
            : "w-64 opacity-100",
          "fixed top-16 left-0 z-30"
        )}
      >
        <div className={cn("p-6", isCollapsed && "lg:p-2")}>
          {isCollapsed ? (
            <div className="hidden lg:flex justify-center pt-2">
              <button
                className="h-6 w-6 flex items-start justify-center pt-0.5 rounded border-2 border-foreground bg-background neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label="Toggle sidebar"
              >
                <span className="text-xs font-bold leading-none">⋮</span>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(navigation).map(([category, items], index) => (
                <div key={category} className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      {category}
                    </h3>
                    {index === 0 && (
                      <button
                        className="hidden lg:flex h-6 w-6 items-center justify-center rounded border-2 border-foreground bg-background neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        aria-label="Toggle sidebar"
                      >
                        <span className="text-xs font-bold leading-none">⋮</span>
                      </button>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md border-2 border-transparent px-3 py-2 text-sm font-bold transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground border-foreground neobrutalism-shadow-sm"
                            : "hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-20 top-16"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
}


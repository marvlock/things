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
    { name: "Button", href: "/docs/components/button" },
    { name: "Card", href: "/docs/components/card" },
    { name: "Input", href: "/docs/components/input" },
    { name: "Textarea", href: "/docs/components/textarea" },
    { name: "Switch", href: "/docs/components/switch" },
    { name: "Slider", href: "/docs/components/slider" },
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
          "h-[calc(100vh-4rem)] border-r-2 border-foreground bg-background overflow-y-auto transition-all duration-300 relative",
          isCollapsed
            ? "w-0 lg:w-16 opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
            : "w-64 opacity-100",
          "fixed lg:static top-16 left-0 z-30"
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


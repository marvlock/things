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
  ],
}

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="h-[calc(100vh-4rem)] w-64 border-r-2 border-foreground bg-background p-6 overflow-y-auto">
      <div className="space-y-8">
        {Object.entries(navigation).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              {category}
            </h3>
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
    </nav>
  )
}


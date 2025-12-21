"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/app/components/ui/command"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

const commandItems = [
  { id: "1", label: "Calendar", group: "Applications", onSelect: () => console.log("Calendar") },
  { id: "2", label: "Search Emoji", group: "Applications", onSelect: () => console.log("Search Emoji") },
  { id: "3", label: "Calculator", group: "Applications", onSelect: () => console.log("Calculator") },
  { id: "4", label: "Settings", group: "Settings", onSelect: () => console.log("Settings") },
  { id: "5", label: "Profile", group: "Settings", onSelect: () => console.log("Profile") },
  { id: "6", label: "Mail", group: "Applications", onSelect: () => console.log("Mail") },
]

export default function CommandDocsPage() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Command</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Fast, composable, unstyled command menu for React.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Command component is a fast, composable command menu that can be triggered with 
            Command+J (⌘J). It features search functionality, keyboard navigation, and grouping. 
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/command.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { Input } from "./input"

interface CommandContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  searchValue: string
  setSearchValue: (value: string) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  filteredItems: CommandItem[]
  items: CommandItem[]
}

const CommandContext = React.createContext<CommandContextValue | undefined>(undefined)

const useCommand = () => {
  const context = React.useContext(CommandContext)
  if (!context) {
    throw new Error("Command components must be used within Command")
  }
  return context
}

export interface CommandItem {
  id: string
  label: string
  keywords?: string[]
  onSelect?: () => void
  icon?: React.ReactNode
  group?: string
}

interface CommandProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  items: CommandItem[]
  children: React.ReactNode
  className?: string
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, items, children, className, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const [searchValue, setSearchValue] = React.useState("")
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const listRef = React.useRef<HTMLDivElement>(null)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const filteredItems = React.useMemo(() => {
      if (!searchValue) return items
      const search = searchValue.toLowerCase()
      return items.filter(item => {
        const labelMatch = item.label.toLowerCase().includes(search)
        const keywordMatch = item.keywords?.some(kw => kw.toLowerCase().includes(search))
        return labelMatch || keywordMatch
      })
    }, [items, searchValue])

    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
      if (!newOpen) {
        setSearchValue("")
        setSelectedIndex(0)
      }
    }, [isControlled, onOpenChange])

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "j") {
          e.preventDefault()
          handleOpenChange(!open)
        }
        if (e.key === "Escape" && open) {
          handleOpenChange(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, handleOpenChange])

    React.useEffect(() => {
      if (!open) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : prev
          )
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
        } else if (e.key === "Enter" && selectedIndex >= 0 && filteredItems[selectedIndex]) {
          e.preventDefault()
          filteredItems[selectedIndex].onSelect?.()
          handleOpenChange(false)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, filteredItems, selectedIndex, handleOpenChange])

    React.useEffect(() => {
      if (selectedIndex >= 0 && listRef.current) {
        const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "nearest" })
        }
      }
    }, [selectedIndex])

    React.useEffect(() => {
      setSelectedIndex(0)
    }, [searchValue])

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
      return () => {
        document.body.style.overflow = ""
      }
    }, [open])

    return (
      <CommandContext.Provider value={{
        open,
        setOpen: handleOpenChange,
        searchValue,
        setSearchValue,
        selectedIndex,
        setSelectedIndex,
        filteredItems,
        items,
      }}>
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </CommandContext.Provider>
    )
  }
)
Command.displayName = "Command"

interface CommandDialogProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandDialog = React.forwardRef<HTMLDivElement, CommandDialogProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useCommand()

    if (!open) return null

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setOpen(false)
      }
    }

    const content = (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 bg-black/50" />
        <div
          ref={ref}
          className={cn(
            "relative z-50 w-full max-w-lg rounded-lg border-2 border-foreground bg-background neobrutalism-shadow overflow-hidden",
            className
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
CommandDialog.displayName = "CommandDialog"

interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => {
    const { searchValue, setSearchValue } = useCommand()

    return (
      <div className="p-2 border-b-2 border-foreground">
        <Input
          ref={ref}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Type a command or search..."
          className={className}
          {...props}
        />
      </div>
    )
  }
)
CommandInput.displayName = "CommandInput"

interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, ...props }, ref) => {
    const { filteredItems, selectedIndex, setSelectedIndex } = useCommand()
    const listRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement)

    if (filteredItems.length === 0) {
      return (
        <div className="p-8 text-sm text-muted-foreground text-center">
          No results found.
        </div>
      )
    }

    const groupedItems = React.useMemo(() => {
      const groups: Record<string, typeof filteredItems> = {}
      filteredItems.forEach(item => {
        const group = item.group || "Other"
        if (!groups[group]) {
          groups[group] = []
        }
        groups[group].push(item)
      })
      return groups
    }, [filteredItems])

    return (
      <div
        ref={listRef}
        className={cn("max-h-[300px] overflow-y-auto p-2", className)}
        {...props}
      >
        {Object.entries(groupedItems).map(([groupName, groupItems]) => (
          <div key={groupName} className="mb-4 last:mb-0">
            {groupName !== "Other" && (
              <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground uppercase">
                {groupName}
              </div>
            )}
            {groupItems.map((item, index) => {
              const globalIndex = filteredItems.indexOf(item)
              const isHighlighted = selectedIndex === globalIndex

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onSelect?.()
                    setOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 text-sm font-bold rounded transition-colors text-left",
                    isHighlighted
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted",
                    className
                  )}
                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
)
CommandList.displayName = "CommandList"

export { Command, CommandDialog, CommandInput, CommandList }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/command.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { Input } from "./input"

const CommandContext = React.createContext(undefined)

const useCommand = () => {
  const context = React.useContext(CommandContext)
  if (!context) {
    throw new Error("Command components must be used within Command")
  }
  return context
}

const Command = React.forwardRef(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, items, children, className, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const [searchValue, setSearchValue] = React.useState("")
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const listRef = React.useRef(null)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const filteredItems = React.useMemo(() => {
      if (!searchValue) return items
      const search = searchValue.toLowerCase()
      return items.filter(item => {
        const labelMatch = item.label.toLowerCase().includes(search)
        const keywordMatch = item.keywords?.some(kw => kw.toLowerCase().includes(search))
        return labelMatch || keywordMatch
      })
    }, [items, searchValue])

    const handleOpenChange = React.useCallback((newOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
      if (!newOpen) {
        setSearchValue("")
        setSelectedIndex(0)
      }
    }, [isControlled, onOpenChange])

    React.useEffect(() => {
      const handleKeyDown = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "j") {
          e.preventDefault()
          handleOpenChange(!open)
        }
        if (e.key === "Escape" && open) {
          handleOpenChange(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, handleOpenChange])

    React.useEffect(() => {
      if (!open) return

      const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : prev
          )
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
        } else if (e.key === "Enter" && selectedIndex >= 0 && filteredItems[selectedIndex]) {
          e.preventDefault()
          filteredItems[selectedIndex].onSelect?.()
          handleOpenChange(false)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, filteredItems, selectedIndex, handleOpenChange])

    React.useEffect(() => {
      if (selectedIndex >= 0 && listRef.current) {
        const selectedElement = listRef.current.children[selectedIndex]
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "nearest" })
        }
      }
    }, [selectedIndex])

    React.useEffect(() => {
      setSelectedIndex(0)
    }, [searchValue])

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
      return () => {
        document.body.style.overflow = ""
      }
    }, [open])

    return (
      <CommandContext.Provider value={{
        open,
        setOpen: handleOpenChange,
        searchValue,
        setSearchValue,
        selectedIndex,
        setSelectedIndex,
        filteredItems,
        items,
      }}>
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </CommandContext.Provider>
    )
  }
)
Command.displayName = "Command"

const CommandDialog = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useCommand()

    if (!open) return null

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        setOpen(false)
      }
    }

    const content = (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 bg-black/50" />
        <div
          ref={ref}
          className={cn(
            "relative z-50 w-full max-w-lg rounded-lg border-2 border-foreground bg-background neobrutalism-shadow overflow-hidden",
            className
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    )

    return ReactDOM.createPortal(content, document.body)
  }
)
CommandDialog.displayName = "CommandDialog"

const CommandInput = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { searchValue, setSearchValue } = useCommand()

    return (
      <div className="p-2 border-b-2 border-foreground">
        <Input
          ref={ref}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Type a command or search..."
          className={className}
          {...props}
        />
      </div>
    )
  }
)
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { filteredItems, selectedIndex, setSelectedIndex, setOpen } = useCommand()
    const listRef = React.useRef(null)

    React.useImperativeHandle(ref, () => listRef.current)

    if (filteredItems.length === 0) {
      return (
        <div className="p-8 text-sm text-muted-foreground text-center">
          No results found.
        </div>
      )
    }

    const groupedItems = React.useMemo(() => {
      const groups = {}
      filteredItems.forEach(item => {
        const group = item.group || "Other"
        if (!groups[group]) {
          groups[group] = []
        }
        groups[group].push(item)
      })
      return groups
    }, [filteredItems])

    return (
      <div
        ref={listRef}
        className={cn("max-h-[300px] overflow-y-auto p-2", className)}
        {...props}
      >
        {Object.entries(groupedItems).map(([groupName, groupItems]) => (
          <div key={groupName} className="mb-4 last:mb-0">
            {groupName !== "Other" && (
              <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground uppercase">
                {groupName}
              </div>
            )}
            {groupItems.map((item, index) => {
              const globalIndex = filteredItems.indexOf(item)
              const isHighlighted = selectedIndex === globalIndex

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onSelect?.()
                    setOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 text-sm font-bold rounded transition-colors text-left",
                    isHighlighted
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted",
                    className
                  )}
                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
)
CommandList.displayName = "CommandList"

export { Command, CommandDialog, CommandInput, CommandList }`}
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
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command"

const items = [
  { id: "1", label: "Calendar", group: "Applications", onSelect: () => console.log("Calendar") },
  { id: "2", label: "Search Emoji", group: "Applications", onSelect: () => console.log("Search Emoji") },
  { id: "3", label: "Calculator", group: "Applications", onSelect: () => console.log("Calculator") },
]

function MyComponent() {
  const [open, setOpen] = React.useState(false)

  return (
    <Command items={items} open={open} onOpenChange={setOpen}>
      <CommandDialog>
        <CommandInput />
        <CommandList />
      </CommandDialog>
    </Command>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command"

const items = [
  { id: "1", label: "Calendar", group: "Applications", onSelect: () => console.log("Calendar") },
  { id: "2", label: "Search Emoji", group: "Applications", onSelect: () => console.log("Search Emoji") },
  { id: "3", label: "Calculator", group: "Applications", onSelect: () => console.log("Calculator") },
]

function MyComponent() {
  const [open, setOpen] = React.useState(false)

  return (
    <Command items={items} open={open} onOpenChange={setOpen}>
      <CommandDialog>
        <CommandInput />
        <CommandList />
      </CommandDialog>
    </Command>
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Press <kbd className="px-2 py-1 bg-muted border-2 border-foreground rounded font-bold text-xs">⌘</kbd> + <kbd className="px-2 py-1 bg-muted border-2 border-foreground rounded font-bold text-xs">J</kbd> to open the command menu.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-6">
            <div className="text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted border-2 border-foreground rounded font-bold text-xs">⌘</kbd> + <kbd className="px-2 py-1 bg-muted border-2 border-foreground rounded font-bold text-xs">J</kbd> to open
              </p>
              <Button onClick={() => setOpen(true)}>
                Open Command Menu
              </Button>
            </div>
          </div>

          <Command items={commandItems} open={open} onOpenChange={setOpen}>
            <CommandDialog>
              <CommandInput />
              <CommandList />
            </CommandDialog>
          </Command>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/combobox">
            <Button variant="outline" size="lg">
              ← Combobox
            </Button>
          </Link>
          <Link href="/docs/components/context-menu">
            <Button variant="outline" size="lg">
              Context Menu →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

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

type CommandDialogProps = React.HTMLAttributes<HTMLDivElement>

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

type CommandInputProps = React.InputHTMLAttributes<HTMLInputElement>

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

type CommandListProps = React.HTMLAttributes<HTMLDivElement>

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, ...props }, ref) => {
    const { filteredItems, selectedIndex, setSelectedIndex, setOpen } = useCommand()
    const listRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement)

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

    if (filteredItems.length === 0) {
      return (
        <div className="p-8 text-sm text-muted-foreground text-center">
          No results found.
        </div>
      )
    }

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
            {groupItems.map((item) => {
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

type CommandEmptyProps = React.HTMLAttributes<HTMLDivElement>

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-8 text-sm text-muted-foreground text-center", className)}
        {...props}
      >
        No results found.
      </div>
    )
  }
)
CommandEmpty.displayName = "CommandEmpty"

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty }


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
} from "@/app/components/ui/combobox"
import { CodeBlock } from "@/app/components/code-block"

const frameworks = [
  { value: "nextjs", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export default function ComboboxDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Combobox</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Autocomplete input and command palette with a list of suggestions.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Combobox component is an autocomplete input that allows users to search and select 
            from a list of options. It features bold borders and shadows that match the Things design system. 
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/combobox.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

interface ComboboxContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value: string
  setValue: (value: string) => void
  searchValue: string
  setSearchValue: (value: string) => void
  options: ComboboxOption[]
  filteredOptions: ComboboxOption[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}

const ComboboxContext = React.createContext<ComboboxContextValue | undefined>(undefined)

const useCombobox = () => {
  const context = React.useContext(ComboboxContext)
  if (!context) {
    throw new Error("Combobox components must be used within Combobox")
  }
  return context
}

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  ({ value: controlledValue, defaultValue = "", onValueChange, options, placeholder = "Select...", searchPlaceholder = "Search...", disabled = false, children, className, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const filteredOptions = React.useMemo(() => {
      if (!searchValue) return options
      const search = searchValue.toLowerCase()
      return options.filter(option => 
        option.label.toLowerCase().includes(search) || 
        option.value.toLowerCase().includes(search)
      )
    }, [options, searchValue])

    const handleValueChange = React.useCallback((newValue: string) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
      setOpen(false)
      setSearchValue("")
      setSelectedIndex(-1)
    }, [disabled, isControlled, onValueChange])

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false)
          setSearchValue("")
          setSelectedIndex(-1)
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open])

    React.useEffect(() => {
      if (!open) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          )
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        } else if (e.key === "Enter" && selectedIndex >= 0) {
          e.preventDefault()
          handleValueChange(filteredOptions[selectedIndex].value)
        } else if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
          setSearchValue("")
          setSelectedIndex(-1)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, filteredOptions, selectedIndex, handleValueChange])

    React.useEffect(() => {
      if (selectedIndex >= 0 && listRef.current) {
        const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "nearest" })
        }
      }
    }, [selectedIndex])

    return (
      <ComboboxContext.Provider value={{
        open,
        setOpen,
        value,
        setValue: handleValueChange,
        searchValue,
        setSearchValue,
        options,
        filteredOptions,
        selectedIndex,
        setSelectedIndex,
      }}>
        <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
          {children}
        </div>
      </ComboboxContext.Provider>
    )
  }
)
Combobox.displayName = "Combobox"

interface ComboboxTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ComboboxTrigger = React.forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, value, options, placeholder } = useCombobox()
    const selectedOption = options.find(opt => opt.value === value)

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between h-10 rounded-md border-2 border-foreground bg-background text-foreground px-3 py-2 text-sm font-bold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
          className
        )}
        {...props}
      >
        <span className="truncate">
          {children || (selectedOption ? selectedOption.label : placeholder)}
        </span>
        <svg
          className={cn(
            "h-4 w-4 shrink-0 ml-2 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    )
  }
)
ComboboxTrigger.displayName = "ComboboxTrigger"

interface ComboboxContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = useCombobox()

    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 w-full mt-2 border-2 border-foreground bg-background rounded-lg neobrutalism-shadow overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ComboboxContent.displayName = "ComboboxContent"

interface ComboboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  ({ className, ...props }, ref) => {
    const { searchValue, setSearchValue, setOpen } = useCombobox()

    return (
      <div className="p-2 border-b-2 border-foreground">
        <Input
          ref={ref}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            setOpen(true)
          }}
          className={className}
          {...props}
        />
      </div>
    )
  }
)
ComboboxInput.displayName = "ComboboxInput"

interface ComboboxListProps extends React.HTMLAttributes<HTMLDivElement> {}

const ComboboxList = React.forwardRef<HTMLDivElement, ComboboxListProps>(
  ({ className, ...props }, ref) => {
    const { filteredOptions, value, setValue, selectedIndex, setSelectedIndex } = useCombobox()
    const listRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement)

    if (filteredOptions.length === 0) {
      return (
        <div className="p-4 text-sm text-muted-foreground text-center">
          No results found.
        </div>
      )
    }

    return (
      <div
        ref={listRef}
        className={cn("max-h-[300px] overflow-y-auto", className)}
        {...props}
      >
        {filteredOptions.map((option, index) => {
          const isSelected = value === option.value
          const isHighlighted = selectedIndex === index

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue(option.value)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm font-bold transition-colors",
                isSelected
                  ? "bg-accent text-accent-foreground border-l-4 border-l-foreground"
                  : isHighlighted
                  ? "bg-muted"
                  : "hover:bg-muted",
                className
              )}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    )
  }
)
ComboboxList.displayName = "ComboboxList"

export { Combobox, ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxList }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/combobox.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

const ComboboxContext = React.createContext(undefined)

const useCombobox = () => {
  const context = React.useContext(ComboboxContext)
  if (!context) {
    throw new Error("Combobox components must be used within Combobox")
  }
  return context
}

const Combobox = React.forwardRef(
  ({ value: controlledValue, defaultValue = "", onValueChange, options, placeholder = "Select...", searchPlaceholder = "Search...", disabled = false, children, className, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    const containerRef = React.useRef(null)
    const listRef = React.useRef(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const filteredOptions = React.useMemo(() => {
      if (!searchValue) return options
      const search = searchValue.toLowerCase()
      return options.filter(option => 
        option.label.toLowerCase().includes(search) || 
        option.value.toLowerCase().includes(search)
      )
    }, [options, searchValue])

    const handleValueChange = React.useCallback((newValue) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
      setOpen(false)
      setSearchValue("")
      setSelectedIndex(-1)
    }, [disabled, isControlled, onValueChange])

    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setOpen(false)
          setSearchValue("")
          setSelectedIndex(-1)
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open])

    React.useEffect(() => {
      if (!open) return

      const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          )
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        } else if (e.key === "Enter" && selectedIndex >= 0) {
          e.preventDefault()
          handleValueChange(filteredOptions[selectedIndex].value)
        } else if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
          setSearchValue("")
          setSelectedIndex(-1)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, filteredOptions, selectedIndex, handleValueChange])

    React.useEffect(() => {
      if (selectedIndex >= 0 && listRef.current) {
        const selectedElement = listRef.current.children[selectedIndex]
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "nearest" })
        }
      }
    }, [selectedIndex])

    return (
      <ComboboxContext.Provider value={{
        open,
        setOpen,
        value,
        setValue: handleValueChange,
        searchValue,
        setSearchValue,
        options,
        filteredOptions,
        selectedIndex,
        setSelectedIndex,
        placeholder,
        searchPlaceholder,
      }}>
        <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
          {children}
        </div>
      </ComboboxContext.Provider>
    )
  }
)
Combobox.displayName = "Combobox"

const ComboboxTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, value, options, placeholder } = useCombobox()
    const selectedOption = options.find(opt => opt.value === value)

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between h-10 rounded-md border-2 border-foreground bg-background text-foreground px-3 py-2 text-sm font-bold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
          className
        )}
        {...props}
      >
        <span className="truncate">
          {children || (selectedOption ? selectedOption.label : placeholder)}
        </span>
        <svg
          className={cn(
            "h-4 w-4 shrink-0 ml-2 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    )
  }
)
ComboboxTrigger.displayName = "ComboboxTrigger"

const ComboboxContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open } = useCombobox()

    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 w-full mt-2 border-2 border-foreground bg-background rounded-lg neobrutalism-shadow overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ComboboxContent.displayName = "ComboboxContent"

const ComboboxInput = React.forwardRef(
  ({ className, placeholder, ...props }, ref) => {
    const { searchValue, setSearchValue, setOpen, searchPlaceholder } = useCombobox()

    return (
      <div className="p-2 border-b-2 border-foreground">
        <Input
          ref={ref}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            setOpen(true)
          }}
          placeholder={placeholder || searchPlaceholder}
          className={className}
          {...props}
        />
      </div>
    )
  }
)
ComboboxInput.displayName = "ComboboxInput"

const ComboboxList = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { filteredOptions, value, setValue, selectedIndex, setSelectedIndex } = useCombobox()
    const listRef = React.useRef(null)

    React.useImperativeHandle(ref, () => listRef.current)

    if (filteredOptions.length === 0) {
      return (
        <div className="p-4 text-sm text-muted-foreground text-center">
          No results found.
        </div>
      )
    }

    return (
      <div
        ref={listRef}
        className={cn("max-h-[300px] overflow-y-auto", className)}
        {...props}
      >
        {filteredOptions.map((option, index) => {
          const isSelected = value === option.value
          const isHighlighted = selectedIndex === index

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue(option.value)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm font-bold transition-colors",
                isSelected
                  ? "bg-accent text-accent-foreground border-l-2 border-foreground"
                  : isHighlighted
                  ? "bg-muted"
                  : "hover:bg-muted",
                className
              )}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    )
  }
)
ComboboxList.displayName = "ComboboxList"

export { Combobox, ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxList }`}
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
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  { value: "nextjs", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

function MyComponent() {
  return (
    <Combobox options={frameworks} placeholder="Select framework...">
      <ComboboxTrigger />
      <ComboboxContent>
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxList />
      </ComboboxContent>
    </Combobox>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  { value: "nextjs", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

function MyComponent() {
  return (
    <Combobox options={frameworks} placeholder="Select framework...">
      <ComboboxTrigger />
      <ComboboxContent>
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxList />
      </ComboboxContent>
    </Combobox>
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function, and the 
            <code className="bg-muted px-1 py-0.5 rounded">components/ui/input.tsx</code> component.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-6">
            <Combobox options={frameworks} placeholder="Select framework...">
              <ComboboxTrigger />
              <ComboboxContent>
                <ComboboxInput placeholder="Search framework..." />
                <ComboboxList />
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/collapsible">
            <Button variant="outline" size="lg">
              ← Collapsible
            </Button>
          </Link>
          <Link href="/docs/components/command">
            <Button variant="outline" size="lg">
              Command →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


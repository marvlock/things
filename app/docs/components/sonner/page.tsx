"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Toaster, useToast } from "@/app/components/ui/sonner"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

function ToastExamples() {
  const { toast } = useToast()

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-4">Default</h3>
        <Button
          onClick={() => {
            toast({
              title: "Event has been created",
              description: "Sunday, December 03, 2023 at 9:00 AM",
            })
          }}
        >
          Show Toast
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Success</h3>
        <Button
          onClick={() => {
            toast({
              title: "Success",
              description: "Your changes have been saved.",
              variant: "success",
            })
          }}
        >
          Show Success Toast
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Info</h3>
        <Button
          onClick={() => {
            toast({
              title: "Info",
              description: "New update available.",
              variant: "info",
            })
          }}
        >
          Show Info Toast
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Warning</h3>
        <Button
          onClick={() => {
            toast({
              title: "Warning",
              description: "Please review your changes.",
              variant: "warning",
            })
          }}
        >
          Show Warning Toast
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Error</h3>
        <Button
          onClick={() => {
            toast({
              title: "Error",
              description: "Something went wrong.",
              variant: "error",
            })
          }}
        >
          Show Error Toast
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Action</h3>
        <Button
          onClick={() => {
            toast({
              title: "Event has been created",
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo clicked"),
              },
            })
          }}
        >
          Show Toast with Action
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Cancel</h3>
        <Button
          onClick={() => {
            toast({
              title: "Event has been created",
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo clicked"),
              },
              cancel: {
                label: "Cancel",
                onClick: () => console.log("Cancel clicked"),
              },
            })
          }}
        >
          Show Toast with Cancel
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Promise</h3>
        <Button
          onClick={() => {
            const promise = new Promise((resolve) => {
              setTimeout(() => resolve("Success"), 2000)
            })

            toast({
              title: "Loading",
              description: "Please wait...",
              promise,
            })
          }}
        >
          Show Promise Toast
        </Button>
      </div>
    </div>
  )
}

export default function SonnerDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <Toaster />
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Sonner</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          An opinionated toast component for React.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Sonner component provides a toast notification system for displaying temporary messages.
            It supports multiple variants (success, info, warning, error), actions, promises, and customizable positioning.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/sonner.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { Button } from "./button"

type ToastVariant = "default" | "success" | "info" | "warning" | "error"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  action?: {
    label: string
    onClick: () => void
  }
  cancel?: {
    label: string
    onClick: () => void
  }
  duration?: number
  promise?: Promise<any>
}

interface ToastContextValue {
  toasts: Toast[]
  toast: (options: Omit<Toast, "id">) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within Toaster")
  }
  return context
}

interface ToasterProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  children?: React.ReactNode
}

const Toaster = ({ position = "bottom-right", children }: ToasterProps) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((options: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      duration: 5000,
      ...options,
    }

    setToasts((prev) => [...prev, newToast])

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, newToast.duration)
    }

    if (newToast.promise) {
      newToast.promise
        .then(() => {
          setToasts((prev) =>
            prev.map((t) =>
              t.id === id
                ? { ...t, variant: "success", title: "Success", description: "Operation completed successfully" }
                : t
            )
          )
          setTimeout(() => dismiss(id), 3000)
        })
        .catch(() => {
          setToasts((prev) =>
            prev.map((t) =>
              t.id === id
                ? { ...t, variant: "error", title: "Error", description: "Operation failed" }
                : t
            )
          )
          setTimeout(() => dismiss(id), 3000)
        })
    }

    return id
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4"
      case "top-right":
        return "top-4 right-4"
      case "bottom-left":
        return "bottom-4 left-4"
      case "bottom-right":
      default:
        return "bottom-4 right-4"
    }
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {ReactDOM.createPortal(
        <div
          className={cn(
            "fixed z-[100] flex flex-col gap-2 w-full max-w-[420px] p-4",
            getPositionClasses()
          )}
        >
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

interface ToastItemProps {
  toast: Toast
  onDismiss: (id: string) => void
}

const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const getVariantClasses = () => {
    switch (toast.variant) {
      case "success":
        return "bg-green-500 text-white border-green-700"
      case "info":
        return "bg-blue-500 text-white border-blue-700"
      case "warning":
        return "bg-yellow-500 text-white border-yellow-700"
      case "error":
        return "bg-red-500 text-white border-red-700"
      default:
        return "bg-background text-foreground border-foreground"
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border-2 p-4 neobrutalism-shadow",
        getVariantClasses()
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{toast.title}</div>
        {toast.description && (
          <div className="text-xs mt-1 opacity-90">{toast.description}</div>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {toast.action && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.action?.onClick()
              onDismiss(toast.id)
            }}
            className="h-7 px-2 text-xs"
          >
            {toast.action.label}
          </Button>
        )}
        {toast.cancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toast.cancel?.onClick()
              onDismiss(toast.id)
            }}
            className="h-7 px-2 text-xs"
          >
            {toast.cancel.label}
          </Button>
        )}
        <button
          onClick={() => onDismiss(toast.id)}
          className="ml-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { Toaster, useToast }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/sonner.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const ToastContext = React.createContext(undefined)

const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within Toaster")
  }
  return context
}

const Toaster = ({ position = "bottom-right", children }) => {
  const [toasts, setToasts] = React.useState([])

  const toast = React.useCallback((options) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = {
      id,
      duration: 5000,
      ...options,
    }

    setToasts((prev) => [...prev, newToast])

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, newToast.duration)
    }

    if (newToast.promise) {
      newToast.promise
        .then(() => {
          setToasts((prev) =>
            prev.map((t) =>
              t.id === id
                ? { ...t, variant: "success", title: "Success", description: "Operation completed successfully" }
                : t
            )
          )
          setTimeout(() => dismiss(id), 3000)
        })
        .catch(() => {
          setToasts((prev) =>
            prev.map((t) =>
              t.id === id
                ? { ...t, variant: "error", title: "Error", description: "Operation failed" }
                : t
            )
          )
          setTimeout(() => dismiss(id), 3000)
        })
    }

    return id
  }, [])

  const dismiss = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4"
      case "top-right":
        return "top-4 right-4"
      case "bottom-left":
        return "bottom-4 left-4"
      case "bottom-right":
      default:
        return "bottom-4 right-4"
    }
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {ReactDOM.createPortal(
        <div
          className={cn(
            "fixed z-[100] flex flex-col gap-2 w-full max-w-[420px] p-4",
            getPositionClasses()
          )}
        >
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

const ToastItem = ({ toast, onDismiss }) => {
  const getVariantClasses = () => {
    switch (toast.variant) {
      case "success":
        return "bg-green-500 text-white border-green-700"
      case "info":
        return "bg-blue-500 text-white border-blue-700"
      case "warning":
        return "bg-yellow-500 text-white border-yellow-700"
      case "error":
        return "bg-red-500 text-white border-red-700"
      default:
        return "bg-background text-foreground border-foreground"
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border-2 p-4 neobrutalism-shadow",
        getVariantClasses()
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{toast.title}</div>
        {toast.description && (
          <div className="text-xs mt-1 opacity-90">{toast.description}</div>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {toast.action && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.action?.onClick()
              onDismiss(toast.id)
            }}
            className="h-7 px-2 text-xs"
          >
            {toast.action.label}
          </Button>
        )}
        {toast.cancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toast.cancel?.onClick()
              onDismiss(toast.id)
            }}
            className="h-7 px-2 text-xs"
          >
            {toast.cancel.label}
          </Button>
        )}
        <button
          onClick={() => onDismiss(toast.id)}
          className="ml-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { Toaster, useToast }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Toaster, useToast } from "@/components/ui/sonner"

function MyComponent() {
  return (
    <Toaster>
      <ToastButton />
    </Toaster>
  )
}

function ToastButton() {
  const { toast } = useToast()

  return (
    <button
      onClick={() => {
        toast({
          title: "Event has been created",
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }}
    >
      Show Toast
    </button>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Toaster, useToast } from "@/components/ui/sonner"

function MyComponent() {
  return (
    <Toaster>
      <ToastButton />
    </Toaster>
  )
}

function ToastButton() {
  const { toast } = useToast()

  return (
    <button
      onClick={() => {
        toast({
          title: "Event has been created",
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }}
    >
      Show Toast
    </button>
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow">
            <Toaster>
              <ToastExamples />
            </Toaster>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/skeleton">
            <Button variant="outline" size="lg">
              ← Skeleton
            </Button>
          </Link>
          <Link href="/docs/components/table">
            <Button variant="outline" size="lg">
              Table →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


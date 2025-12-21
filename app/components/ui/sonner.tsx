"use client"

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
  promise?: Promise<unknown>
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
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

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
  }, [dismiss])

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
      {isMounted && typeof document !== "undefined" && ReactDOM.createPortal(
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
        "flex items-start gap-3 rounded-lg border-2 p-4 neobrutalism-shadow transition-all",
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

export { Toaster, useToast }


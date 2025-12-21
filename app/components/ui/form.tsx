"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

interface FormContextValue {
  errors: Record<string, string[]>
  touched: Record<string, boolean>
}

const FormContext = React.createContext<FormContextValue | undefined>(undefined)

const useFormContext = () => {
  const context = React.useContext(FormContext)
  return context
}

interface FormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
  className?: string
  errors?: Record<string, string[]>
  touched?: Record<string, boolean>
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ onSubmit, children, className, errors = {}, touched = {}, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit?.(e)
    }

    return (
      <FormContext.Provider value={{ errors, touched }}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={cn("space-y-4", className)}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    )
  }
)
Form.displayName = "Form"

interface FormFieldProps {
  name: string
  children: (props: {
    field: {
      name: string
      value: string
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    }
    error?: string
  }) => React.ReactNode
  value?: unknown
  onChange?: (value: unknown) => void
  onBlur?: () => void
}

const FormField = ({ name, children, value, onChange, onBlur }: FormFieldProps) => {
  const context = useFormContext()
  const [localValue, setLocalValue] = React.useState(value ?? "")
  const [isTouched, setIsTouched] = React.useState(false)

  const fieldValue = value !== undefined ? value : localValue
  const error = context?.errors[name]?.[0]
  const touched = context?.touched[name] ?? isTouched

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (value === undefined) {
      setLocalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleBlur = () => {
    setIsTouched(true)
    onBlur?.()
  }

  return (
    <>
      {children({
        field: {
          name,
          value: String(fieldValue ?? ""),
          onChange: handleChange,
          onBlur: handleBlur,
        },
        error: touched ? error : undefined,
      })}
    </>
  )
}
FormField.displayName = "FormField"

type FormItemProps = React.HTMLAttributes<HTMLDivElement>

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      />
    )
  }
)
FormItem.displayName = "FormItem"

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Label
        ref={ref}
        className={className}
        {...props}
      />
    )
  }
)
FormLabel.displayName = "FormLabel"

type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    )
  }
)
FormDescription.displayName = "FormDescription"

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null

    return (
      <p
        ref={ref}
        className={cn("text-sm font-bold text-destructive", className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
}


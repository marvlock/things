"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function FormDocsPage() {
  const [username, setUsername] = React.useState("ekmas")
  const [errors, setErrors] = React.useState<Record<string, string[]>>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: Record<string, string[]> = {}
    
    if (!username || username.length < 3) {
      newErrors.username = ["Username must be at least 3 characters"]
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!")
    }
  }

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Form</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Building forms with React Hook Form and Zod.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Form component provides a structured way to build forms with validation,
            error handling, and field descriptions. It works seamlessly with React Hook Form
            and Zod for validation, but can also be used standalone. Built from scratch using
            React and native HTML form elements.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/form.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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
      value: any
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    }
    error?: string
  }) => React.ReactNode
  value?: any
  onChange?: (value: any) => void
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsTouched(true)
    onBlur?.()
  }

  return (
    <>
      {children({
        field: {
          name,
          value: fieldValue,
          onChange: handleChange,
          onBlur: handleBlur,
        },
        error: touched ? error : undefined,
      })}
    </>
  )
}
FormField.displayName = "FormField"

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

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

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

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

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
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
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/form.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

const FormContext = React.createContext(undefined)

const useFormContext = () => {
  const context = React.useContext(FormContext)
  return context
}

const Form = React.forwardRef(
  ({ onSubmit, children, className, errors = {}, touched = {}, ...props }, ref) => {
    const handleSubmit = (e) => {
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

const FormField = ({ name, children, value, onChange, onBlur }) => {
  const context = useFormContext()
  const [localValue, setLocalValue] = React.useState(value ?? "")
  const [isTouched, setIsTouched] = React.useState(false)

  const fieldValue = value !== undefined ? value : localValue
  const error = context?.errors[name]?.[0]
  const touched = context?.touched[name] ?? isTouched

  const handleChange = (e) => {
    const newValue = e.target.value
    if (value === undefined) {
      setLocalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleBlur = (e) => {
    setIsTouched(true)
    onBlur?.()
  }

  return (
    <>
      {children({
        field: {
          name,
          value: fieldValue,
          onChange: handleChange,
          onBlur: handleBlur,
        },
        error: touched ? error : undefined,
      })}
    </>
  )
}
FormField.displayName = "FormField"

const FormItem = React.forwardRef(
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

const FormLabel = React.forwardRef(
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

const FormDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(
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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function MyForm() {
  const [username, setUsername] = useState("")
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: Record<string, string[]> = {}
    
    if (!username || username.length < 3) {
      newErrors.username = ["Username must be at least 3 characters"]
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
    }
  }

  return (
    <Form onSubmit={handleSubmit} errors={errors}>
      <FormField
        name="username"
        value={username}
        onChange={(value) => setUsername(value as string)}
      >
        {({ field, error }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <Input {...field} />
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage>{error}</FormMessage>
          </FormItem>
        )}
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function MyForm() {
  const [username, setUsername] = useState("")
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    
    if (!username || username.length < 3) {
      newErrors.username = ["Username must be at least 3 characters"]
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
    }
  }

  return (
    <Form onSubmit={handleSubmit} errors={errors}>
      <FormField
        name="username"
        value={username}
        onChange={(value) => setUsername(value as string)}
      >
        {({ field, error }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <Input {...field} />
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage>{error}</FormMessage>
          </FormItem>
        )}
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function, and the required
            UI components (<code className="bg-muted px-1 py-0.5 rounded">input</code>, <code className="bg-muted px-1 py-0.5 rounded">button</code>,
            <code className="bg-muted px-1 py-0.5 rounded">label</code>).
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Default</h3>
              <Form onSubmit={handleSubmit} errors={errors} touched={touched}>
                <FormField
                  name="username"
                  value={username}
                  onChange={(value) => setUsername(value as string)}
                  onBlur={() => handleBlur("username")}
                >
                  {({ field, error }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Input {...field} />
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage>{error}</FormMessage>
                    </FormItem>
                  )}
                </FormField>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/dropdown-menu">
            <Button variant="outline" size="lg">
              ← Dropdown Menu
            </Button>
          </Link>
          <Link href="/docs/components/hover-card">
            <Button variant="outline" size="lg">
              Hover Card →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


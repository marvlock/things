"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { InputOTP } from "@/app/components/ui/input-otp"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function InputOTPDocsPage() {
  const [otpValue, setOtpValue] = React.useState("")

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Input OTP</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Accessible one-time password input for authentication.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Input OTP component provides a user-friendly way to enter one-time passwords.
            It features automatic focus management, paste support, and keyboard navigation.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/input-otp.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, length = 6, value = "", onChange, disabled = false, autoFocus = false, ...props }, ref) => {
    const [values, setValues] = React.useState<string[]>(() => {
      const initial = value.split("").slice(0, length)
      return Array.from({ length }, (_, i) => initial[i] || "")
    })
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    React.useEffect(() => {
      const newValues = value.split("").slice(0, length)
      const padded = Array.from({ length }, (_, i) => newValues[i] || "")
      setValues(padded)
    }, [value, length])

    const handleChange = (index: number, newValue: string) => {
      if (disabled) return

      const digit = newValue.slice(-1)
      if (digit && !/^\d$/.test(digit)) return

      const newValues = [...values]
      newValues[index] = digit
      setValues(newValues)

      const otpValue = newValues.join("")
      onChange?.(otpValue)

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === "Backspace") {
        if (!values[index] && index > 0) {
          inputRefs.current[index - 1]?.focus()
        } else {
          const newValues = [...values]
          newValues[index] = ""
          setValues(newValues)
          const otpValue = newValues.join("")
          onChange?.(otpValue)
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault()
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault()
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return

      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").slice(0, length)
      const digits = pastedData.split("").filter(char => /^\d$/.test(char)).slice(0, length)
      
      const newValues = Array.from({ length }, (_, i) => digits[i] || "")
      setValues(newValues)
      
      const otpValue = newValues.join("")
      onChange?.(otpValue)

      const nextIndex = Math.min(digits.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    }

    const handleFocus = (index: number) => {
      inputRefs.current[index]?.select()
    }

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, [autoFocus])

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {Array.from({ length }).map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              disabled={disabled}
              className={cn(
                "flex h-12 w-12 rounded-md border-2 border-foreground bg-background text-center text-lg font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
                className
              )}
              aria-label={\`Digit \${index + 1} of \${length}\`}
            />
            {index === 2 && (
              <span className="text-foreground text-xl font-bold">.</span>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

export { InputOTP }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/input-otp.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef(
  ({ className, length = 6, value = "", onChange, disabled = false, autoFocus = false, ...props }, ref) => {
    const [values, setValues] = React.useState(() => {
      const initial = value.split("").slice(0, length)
      return Array.from({ length }, (_, i) => initial[i] || "")
    })
    const inputRefs = React.useRef([])

    React.useEffect(() => {
      const newValues = value.split("").slice(0, length)
      const padded = Array.from({ length }, (_, i) => newValues[i] || "")
      setValues(padded)
    }, [value, length])

    const handleChange = (index, newValue) => {
      if (disabled) return

      const digit = newValue.slice(-1)
      if (digit && !/^\d$/.test(digit)) return

      const newValues = [...values]
      newValues[index] = digit
      setValues(newValues)

      const otpValue = newValues.join("")
      onChange?.(otpValue)

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (index, e) => {
      if (disabled) return

      if (e.key === "Backspace") {
        if (!values[index] && index > 0) {
          inputRefs.current[index - 1]?.focus()
        } else {
          const newValues = [...values]
          newValues[index] = ""
          setValues(newValues)
          const otpValue = newValues.join("")
          onChange?.(otpValue)
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault()
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault()
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handlePaste = (e) => {
      if (disabled) return

      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").slice(0, length)
      const digits = pastedData.split("").filter(char => /^\d$/.test(char)).slice(0, length)
      
      const newValues = Array.from({ length }, (_, i) => digits[i] || "")
      setValues(newValues)
      
      const otpValue = newValues.join("")
      onChange?.(otpValue)

      const nextIndex = Math.min(digits.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    }

    const handleFocus = (index) => {
      inputRefs.current[index]?.select()
    }

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, [autoFocus])

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {Array.from({ length }).map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              disabled={disabled}
              className={cn(
                "flex h-12 w-12 rounded-md border-2 border-foreground bg-background text-center text-lg font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 neobrutalism-shadow",
                className
              )}
              aria-label={\`Digit \${index + 1} of \${length}\`}
            />
            {index === 2 && (
              <span className="text-foreground text-xl font-bold">.</span>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

export { InputOTP }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { InputOTP } from "@/components/ui/input-otp"
import * as React from "react"

function MyComponent() {
  const [otp, setOtp] = React.useState("")

  return (
    <InputOTP
      length={6}
      value={otp}
      onChange={setOtp}
      autoFocus
    />
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { InputOTP } from "@/components/ui/input-otp"
import * as React from "react"

function MyComponent() {
  const [otp, setOtp] = React.useState("")

  return (
    <InputOTP
      length={6}
      value={otp}
      onChange={setOtp}
      autoFocus
    />
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
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Default</h3>
              <InputOTP
                length={6}
                value={otpValue}
                onChange={setOtpValue}
                autoFocus
              />
              {otpValue && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Value: <code className="bg-muted px-1 py-0.5 rounded">{otpValue}</code>
                </p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Disabled</h3>
              <InputOTP
                length={6}
                value="123456"
                disabled
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Custom Length (4 digits)</h3>
              <InputOTP
                length={4}
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/input">
            <Button variant="outline" size="lg">
              ← Input
            </Button>
          </Link>
          <Link href="/docs/components/label">
            <Button variant="outline" size="lg">
              Label →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function ProgressDocsPage() {
  const [progress, setProgress] = React.useState(33)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 10
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Progress</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Displays an indicator showing the completion progress of a task.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Progress component displays a visual indicator of task completion.
            It shows progress as a percentage with a smooth animated fill.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/progress.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full border-2 border-foreground bg-background",
          className
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/progress.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full border-2 border-foreground bg-background",
          className
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Progress } from "@/components/ui/progress"

function MyComponent() {
  return <Progress value={33} />
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Progress } from "@/components/ui/progress"

function MyComponent() {
  return <Progress value={33} />
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
              <Progress value={33} />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">50% Progress</h3>
              <Progress value={50} />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">75% Progress</h3>
              <Progress value={75} />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">100% Progress</h3>
              <Progress value={100} />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Animated</h3>
              <Progress value={progress} />
              <p className="mt-2 text-sm text-muted-foreground">
                Progress: {progress}%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/popover">
            <Button variant="outline" size="lg">
              ← Popover
            </Button>
          </Link>
          <Link href="/docs/components/radio-group">
            <Button variant="outline" size="lg">
              Radio Group →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


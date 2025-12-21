import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Avatar } from "@/app/components/ui/avatar"
import { CodeBlock } from "@/app/components/code-block"

export default function AvatarDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Avatar</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          An image element with a fallback for representing the user.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Avatar component displays a user&apos;s profile image with an automatic
            fallback when the image fails to load or is not provided. It supports
            multiple sizes and can display custom fallback content. Built from scratch
            using React and native HTML img elements. No UI library dependencies.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/avatar.tsx</code>:
              </p>
              <CodeBlock
                code={`import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border-2 border-foreground neobrutalism-shadow",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-16 w-16",
        xl: "h-24 w-24",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarVariants> {
  fallback?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [error, setError] = React.useState(false)

    if (error || !src) {
      return (
        <div
          className={cn(avatarVariants({ size, className }))}
          ref={ref as React.Ref<HTMLDivElement>}
        >
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-sm font-bold">
            {fallback || (alt ? alt.charAt(0).toUpperCase() : "?")}
          </div>
        </div>
      )
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(avatarVariants({ size, className }))}
        onError={() => setError(true)}
        {...props}
      />
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar, avatarVariants }`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/avatar.jsx</code>:
              </p>
              <CodeBlock
                code={`import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border-2 border-foreground neobrutalism-shadow",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-16 w-16",
        xl: "h-24 w-24",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const Avatar = React.forwardRef(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [error, setError] = React.useState(false)

    if (error || !src) {
      return (
        <div
          className={cn(avatarVariants({ size, className }))}
          ref={ref}
        >
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-sm font-bold">
            {fallback || (alt ? alt.charAt(0).toUpperCase() : "?")}
          </div>
        </div>
      )
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(avatarVariants({ size, className }))}
        onError={() => setError(true)}
        {...props}
      />
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar, avatarVariants }`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Avatar } from "@/components/ui/avatar"

<Avatar src="/user.jpg" alt="User" />
<Avatar src="/user.jpg" alt="User" size="lg" />
<Avatar fallback="JD" size="sm" />`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Avatar } from "@/components/ui/avatar"

<Avatar src="/user.jpg" alt="User" />
<Avatar src="/user.jpg" alt="User" size="lg" />
<Avatar fallback="JD" size="sm" />`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-4">
            <div className="flex items-center gap-4">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User"
                size="sm"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User"
                size="lg"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User"
                size="xl"
              />
            </div>
            <div className="flex items-center gap-4">
              <Avatar fallback="JD" size="sm" />
              <Avatar fallback="AB" />
              <Avatar fallback="CD" size="lg" />
              <Avatar fallback="EF" size="xl" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/alert-dialog">
            <Button variant="outline" size="lg">
              ← Alert Dialog
            </Button>
          </Link>
          <Link href="/docs/components/badge">
            <Button variant="outline" size="lg">
              Badge →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

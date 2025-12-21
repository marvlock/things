"use client"

import * as React from "react"
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

export { Avatar, avatarVariants }


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  ImageCard,
  ImageCardImage,
  ImageCardCaption,
} from "@/app/components/ui/image-card"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function ImageCardDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Image Card</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A card component optimized for displaying images with captions.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Image Card component is a specialized card designed for displaying images with captions.
            It features aspect ratio controls and optimized image display. Built from scratch using React
            and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/image-card.tsx</code>:
              </p>
              <CodeBlock
                code={`import * as React from "react"
import { cn } from "@/lib/utils"

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  caption?: string
  aspectRatio?: "square" | "landscape" | "portrait" | "auto"
}

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  ({ className, src, alt, caption, aspectRatio = "auto", ...props }, ref) => {
    const getAspectRatioClass = () => {
      switch (aspectRatio) {
        case "square":
          return "aspect-square"
        case "landscape":
          return "aspect-video"
        case "portrait":
          return "aspect-[3/4]"
        case "auto":
        default:
          return ""
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border-2 border-foreground bg-card text-card-foreground neobrutalism-shadow overflow-hidden",
          className
        )}
        {...props}
      >
        <div className={cn("relative w-full overflow-hidden", getAspectRatioClass())}>
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        </div>
        {caption && (
          <div className="bg-primary text-primary-foreground px-4 py-2 text-center text-sm font-bold">
            {caption}
          </div>
        )}
      </div>
    )
  }
)
ImageCard.displayName = "ImageCard"

interface ImageCardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "square" | "landscape" | "portrait" | "auto"
}

const ImageCardImage = React.forwardRef<HTMLImageElement, ImageCardImageProps>(
  ({ className, aspectRatio = "auto", ...props }, ref) => {
    const getAspectRatioClass = () => {
      switch (aspectRatio) {
        case "square":
          return "aspect-square"
        case "landscape":
          return "aspect-video"
        case "portrait":
          return "aspect-[3/4]"
        case "auto":
        default:
          return ""
      }
    }

    return (
      <div className={cn("relative w-full overflow-hidden", getAspectRatioClass())}>
        <img
          ref={ref}
          className={cn("h-full w-full object-cover", className)}
          {...props}
        />
      </div>
    )
  }
)
ImageCardImage.displayName = "ImageCardImage"

interface ImageCardCaptionProps extends React.HTMLAttributes<HTMLDivElement> {}

const ImageCardCaption = React.forwardRef<HTMLDivElement, ImageCardCaptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-primary text-primary-foreground px-4 py-2 text-center text-sm font-bold", className)}
      {...props}
    />
  )
)
ImageCardCaption.displayName = "ImageCardCaption"

export {
  ImageCard,
  ImageCardImage,
  ImageCardCaption,
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/image-card.jsx</code>:
              </p>
              <CodeBlock
                code={`import * as React from "react"
import { cn } from "@/lib/utils"

const ImageCard = React.forwardRef(
  ({ className, src, alt, caption, aspectRatio = "auto", ...props }, ref) => {
    const getAspectRatioClass = () => {
      switch (aspectRatio) {
        case "square":
          return "aspect-square"
        case "landscape":
          return "aspect-video"
        case "portrait":
          return "aspect-[3/4]"
        case "auto":
        default:
          return ""
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border-2 border-foreground bg-card text-card-foreground neobrutalism-shadow overflow-hidden",
          className
        )}
        {...props}
      >
        <div className={cn("relative w-full overflow-hidden", getAspectRatioClass())}>
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        </div>
        {caption && (
          <div className="bg-primary text-primary-foreground px-4 py-2 text-center text-sm font-bold">
            {caption}
          </div>
        )}
      </div>
    )
  }
)
ImageCard.displayName = "ImageCard"

const ImageCardImage = React.forwardRef(
  ({ className, aspectRatio = "auto", ...props }, ref) => {
    const getAspectRatioClass = () => {
      switch (aspectRatio) {
        case "square":
          return "aspect-square"
        case "landscape":
          return "aspect-video"
        case "portrait":
          return "aspect-[3/4]"
        case "auto":
        default:
          return ""
      }
    }

    return (
      <div className={cn("relative w-full overflow-hidden", getAspectRatioClass())}>
        <img
          ref={ref}
          className={cn("h-full w-full object-cover", className)}
          {...props}
        />
      </div>
    )
  }
)
ImageCardImage.displayName = "ImageCardImage"

const ImageCardCaption = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-primary text-primary-foreground px-4 py-2 text-center text-sm font-bold", className)}
      {...props}
    />
  )
)
ImageCardCaption.displayName = "ImageCardCaption"

export {
  ImageCard,
  ImageCardImage,
  ImageCardCaption,
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
                code={`import { ImageCard } from "@/components/ui/image-card"

function MyComponent() {
  return (
    <ImageCard
      src="/path/to/image.jpg"
      alt="Description"
      caption="Image"
    />
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { ImageCard } from "@/components/ui/image-card"

function MyComponent() {
  return (
    <ImageCard
      src="/path/to/image.jpg"
      alt="Description"
      caption="Image"
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
              <div className="max-w-sm">
                <ImageCard
                  src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=300&fit=crop"
                  alt="Cherry blossoms"
                  caption="Image"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With Compound Components</h3>
              <div className="max-w-sm">
                <div className="rounded-lg border-2 border-foreground bg-card neobrutalism-shadow overflow-hidden">
                  <ImageCardImage
                    src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=300&fit=crop"
                    alt="Cherry blossoms"
                  />
                  <ImageCardCaption>Beautiful Cherry Blossoms</ImageCardCaption>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Square Aspect Ratio</h3>
              <div className="max-w-sm">
                <ImageCard
                  src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=300&fit=crop"
                  alt="Cherry blossoms"
                  caption="Square Image"
                  aspectRatio="square"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Landscape Aspect Ratio</h3>
              <div className="max-w-sm">
                <ImageCard
                  src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=300&fit=crop"
                  alt="Cherry blossoms"
                  caption="Landscape Image"
                  aspectRatio="landscape"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/hover-card">
            <Button variant="outline" size="lg">
              ← Hover Card
            </Button>
          </Link>
          <Link href="/docs/components/input">
            <Button variant="outline" size="lg">
              Input →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


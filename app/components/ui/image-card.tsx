import * as React from "react"
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
          alt=""
          className={cn("h-full w-full object-cover", className)}
          {...props}
        />
      </div>
    )
  }
)
ImageCardImage.displayName = "ImageCardImage"

type ImageCardCaptionProps = React.HTMLAttributes<HTMLDivElement>

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
}


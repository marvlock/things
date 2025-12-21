"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CarouselContextValue {
  currentIndex: number
  totalSlides: number
  goToSlide: (index: number) => void
  goToPrevious: () => void
  goToNext: () => void
}

const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined)

const useCarousel = () => {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("Carousel components must be used within Carousel")
  }
  return context
}

interface CarouselProps {
  children: React.ReactNode
  className?: string
  autoPlay?: boolean
  interval?: number
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, className, autoPlay = false, interval = 3000 }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const childrenArray = React.Children.toArray(children)
    const totalSlides = childrenArray.length

    const goToSlide = React.useCallback((index: number) => {
      if (index < 0) {
        setCurrentIndex(totalSlides - 1)
      } else if (index >= totalSlides) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(index)
      }
    }, [totalSlides])

    const goToPrevious = React.useCallback(() => {
      goToSlide(currentIndex - 1)
    }, [currentIndex, goToSlide])

    const goToNext = React.useCallback(() => {
      goToSlide(currentIndex + 1)
    }, [currentIndex, goToSlide])

    React.useEffect(() => {
      if (autoPlay && totalSlides > 1) {
        const timer = setInterval(() => {
          goToNext()
        }, interval)
        return () => clearInterval(timer)
      }
    }, [autoPlay, interval, goToNext, totalSlides])

    return (
      <CarouselContext.Provider
        value={{
          currentIndex,
          totalSlides,
          goToSlide,
          goToPrevious,
          goToNext,
        }}
      >
        <div ref={ref} className={cn("relative", className)}>
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { currentIndex } = useCarousel()
  const childrenArray = React.Children.toArray(children)

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <div
        className="flex transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className="min-w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { goToPrevious, totalSlides } = useCarousel()

  if (totalSlides <= 1) return null

  return (
    <button
      ref={ref}
      onClick={goToPrevious}
      className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded border-2 border-foreground bg-background hover:bg-muted transition-colors neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
        className
      )}
      aria-label="Previous slide"
      {...props}
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { goToNext, totalSlides } = useCarousel()

  if (totalSlides <= 1) return null

  return (
    <button
      ref={ref}
      onClick={goToNext}
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded border-2 border-foreground bg-background hover:bg-muted transition-colors neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
        className
      )}
      aria-label="Next slide"
      {...props}
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
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}


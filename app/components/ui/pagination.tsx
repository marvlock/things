"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, currentPage = 1, totalPages = 10, onPageChange, showFirstLast = false, siblingCount = 1, ...props }, ref) => {
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange?.(page)
      }
    }

    const getPageNumbers = () => {
      const pages: (number | string)[] = []
      const totalNumbers = siblingCount * 2 + 5
      const totalBlocks = totalNumbers + 2

      if (totalPages <= totalBlocks) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
        return pages
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

      const shouldShowLeftDots = leftSiblingIndex > 2
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount
        const leftRange: number[] = []
        for (let i = 1; i <= leftItemCount; i++) {
          leftRange.push(i)
        }
        return [...leftRange, "...", totalPages]
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount
        const rightRange: number[] = []
        for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
          rightRange.push(i)
        }
        return [1, "...", ...rightRange]
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange: number[] = []
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          middleRange.push(i)
        }
        return [1, "...", ...middleRange, "...", totalPages]
      }

      return pages
    }

    const pageNumbers = getPageNumbers()

    return (
      <nav
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        aria-label="Pagination"
        {...props}
      >
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {showFirstLast && currentPage > siblingCount + 2 && (
          <>
            <PaginationItem onClick={() => handlePageChange(1)}>
              {1}
            </PaginationItem>
            {currentPage > siblingCount + 3 && (
              <PaginationEllipsis />
            )}
          </>
        )}
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return <PaginationEllipsis key={`ellipsis-${index}`} />
          }
          return (
            <PaginationItem
              key={page}
              onClick={() => handlePageChange(page as number)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationItem>
          )
        })}
        {showFirstLast && currentPage < totalPages - siblingCount - 1 && (
          <>
            {currentPage < totalPages - siblingCount - 2 && (
              <PaginationEllipsis />
            )}
            <PaginationItem onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </PaginationItem>
          </>
        )}
        <PaginationNext
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </nav>
    )
  }
)
Pagination.displayName = "Pagination"

interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground text-sm font-bold transition-colors",
        isActive
          ? "bg-primary text-primary-foreground neobrutalism-shadow-sm"
          : "bg-background hover:bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
PaginationItem.displayName = "PaginationItem"

type PaginationPreviousProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex h-10 items-center justify-center gap-1 rounded-md border-2 border-foreground bg-background px-4 text-sm font-bold transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <span>‹</span>
      <span>Previous</span>
    </button>
  )
)
PaginationPrevious.displayName = "PaginationPrevious"

type PaginationNextProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex h-10 items-center justify-center gap-1 rounded-md border-2 border-foreground bg-background px-4 text-sm font-bold transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <span>Next</span>
      <span>›</span>
    </button>
  )
)
PaginationNext.displayName = "PaginationNext"

type PaginationEllipsisProps = React.HTMLAttributes<HTMLSpanElement>

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("flex h-10 w-10 items-center justify-center text-sm font-bold", className)}
      {...props}
    >
      ...
    </span>
  )
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}


"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  Pagination,
} from "@/app/components/ui/pagination"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

export default function PaginationDocsPage() {
  const [currentPage, setCurrentPage] = React.useState(2)

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Pagination</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Displays page numbers and controls for navigating paginated data.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Pagination component provides navigation controls for paginated content.
            It supports previous/next buttons, page numbers, ellipsis for skipped pages, and customizable styling.
            Built from scratch using React and native HTML elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/pagination.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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
            return <PaginationEllipsis key={\`ellipsis-\${index}\`} />
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

interface PaginationPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

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

interface PaginationNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

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

interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

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
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/pagination.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Pagination = React.forwardRef(
  ({ className, currentPage = 1, totalPages = 10, onPageChange, showFirstLast = false, siblingCount = 1, ...props }, ref) => {
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange?.(page)
      }
    }

    const getPageNumbers = () => {
      const pages = []
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
        const leftRange = []
        for (let i = 1; i <= leftItemCount; i++) {
          leftRange.push(i)
        }
        return [...leftRange, "...", totalPages]
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount
        const rightRange = []
        for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
          rightRange.push(i)
        }
        return [1, "...", ...rightRange]
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = []
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
            return <PaginationEllipsis key={\`ellipsis-\${index}\`} />
          }
          return (
            <PaginationItem
              key={page}
              onClick={() => handlePageChange(page)}
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

const PaginationItem = React.forwardRef(
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

const PaginationPrevious = React.forwardRef(
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

const PaginationNext = React.forwardRef(
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

const PaginationEllipsis = React.forwardRef(
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
                code={`import { Pagination } from "@/components/ui/pagination"
import * as React from "react"

function MyComponent() {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  )
}`}
                language="tsx"
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
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">With First/Last</h3>
              <Pagination
                currentPage={5}
                totalPages={20}
                onPageChange={() => {}}
                showFirstLast
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Small Page Count</h3>
              <Pagination
                currentPage={2}
                totalPages={5}
                onPageChange={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/navigation-menu">
            <Button variant="outline" size="lg">
              ← Navigation Menu
            </Button>
          </Link>
          <Link href="/docs/components/popover">
            <Button variant="outline" size="lg">
              Popover →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./dropdown-menu"

export interface Column<T> {
  id: string
  header: string | ((props: { table: unknown }) => React.ReactNode)
  accessorKey?: keyof T
  accessorFn?: (row: T) => React.ReactNode
  enableSorting?: boolean
  enableHiding?: boolean
  cell?: (props: { row: T; value: unknown }) => React.ReactNode
}

interface DataTableContextValue<T> {
  data: T[]
  columns: Column<T>[]
  getRowId: (row: T, index: number) => string
  selectedRows: Set<string>
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<string>>>
  columnVisibility: Record<string, boolean>
  setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  sorting: { id: string; desc: boolean } | null
  setSorting: React.Dispatch<React.SetStateAction<{ id: string; desc: boolean } | null>>
  globalFilter: string
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
  pageIndex: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

const DataTableContext = React.createContext<DataTableContextValue<unknown> | undefined>(undefined)

const useDataTable = <T,>(): DataTableContextValue<T> => {
  const context = React.useContext(DataTableContext)
  if (!context) {
    throw new Error("DataTable components must be used within DataTable")
  }
  return context as unknown as DataTableContextValue<T>
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  getRowId?: (row: T) => string
  children: React.ReactNode
  className?: string
}

function DataTable<T>({ data, columns, getRowId, children, className }: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({})
  const [sorting, setSorting] = React.useState<{ id: string; desc: boolean } | null>(null)
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pageIndex, setPageIndex] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)

  const getRowIdFn = getRowId || ((row: T, index: number) => String(index))

  const handleGlobalFilterChange = React.useCallback((value: string) => {
    setGlobalFilter(value)
    setPageIndex(0)
  }, [])

  return (
    <DataTableContext.Provider value={{
      data,
      columns,
      getRowId: getRowIdFn,
      selectedRows,
      setSelectedRows,
      columnVisibility,
      setColumnVisibility,
      sorting,
      setSorting,
      globalFilter,
      setGlobalFilter: handleGlobalFilterChange,
      pageIndex,
      setPageIndex,
      pageSize,
      setPageSize,
    } as DataTableContextValue<unknown>}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </DataTableContext.Provider>
  )
}

interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchPlaceholder?: string
}

const DataTableToolbar = React.forwardRef<HTMLDivElement, DataTableToolbarProps>(
  ({ className, searchPlaceholder = "Filter...", ...props }, ref) => {
    const { globalFilter, setGlobalFilter } = useDataTable()

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between mb-4", className)}
        {...props}
      >
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <DataTableColumnVisibility />
      </div>
    )
  }
)
DataTableToolbar.displayName = "DataTableToolbar"

const DataTableColumnVisibility = () => {
  const { columns, columnVisibility, setColumnVisibility } = useDataTable()

  const toggleColumn = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }))
  }

  const visibleColumns = columns.filter((col) => col.enableHiding !== false)
  if (visibleColumns.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Columns
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {visibleColumns.map((column) => {
          const isVisible = columnVisibility[column.id] !== false
          return (
            <DropdownMenuItem
              key={column.id}
              onSelect={(e) => {
                e.preventDefault()
                toggleColumn(column.id)
              }}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 w-full">
                <Checkbox 
                  checked={isVisible} 
                  onChange={(e) => {
                    e.stopPropagation()
                    toggleColumn(column.id)
                  }}
                />
                <span className="flex-1">
                  {typeof column.header === "string" ? column.header : column.id}
                </span>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type DataTableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>

const DataTableHeader = React.forwardRef<HTMLTableSectionElement, DataTableHeaderProps>(
  ({ className, ...props }, ref) => {
    const { columns, columnVisibility, sorting, setSorting, selectedRows, setSelectedRows, data, getRowId, pageIndex, pageSize, globalFilter } = useDataTable()

    const visibleColumns = columns.filter((col) => columnVisibility[col.id] !== false)

    const filteredData = React.useMemo(() => {
      let result = [...data]
      
      if (globalFilter) {
        const filter = globalFilter.toLowerCase()
        result = result.filter((row) => {
          return columns.some((column) => {
            if (column.accessorKey) {
              const value = (row as Record<string, unknown>)[column.accessorKey as string]
              return String(value).toLowerCase().includes(filter)
            }
            return false
          })
        })
      }

      if (sorting) {
        const column = columns.find((col) => col.id === sorting.id)
        if (column && column.enableSorting) {
          result = [...result].sort((a, b) => {
            let aValue: unknown
            let bValue: unknown

            if (column.accessorFn) {
              aValue = column.accessorFn(a)
              bValue = column.accessorFn(b)
            } else if (column.accessorKey) {
              aValue = (a as Record<string, unknown>)[column.accessorKey as string]
              bValue = (b as Record<string, unknown>)[column.accessorKey as string]
            } else {
              return 0
            }

            const aStr = String(aValue ?? "")
            const bStr = String(bValue ?? "")
            if (aStr < bStr) return sorting.desc ? 1 : -1
            if (aStr > bStr) return sorting.desc ? -1 : 1
            return 0
          })
        }
      }

      return result
    }, [data, columns, sorting, globalFilter])

    const paginatedData = React.useMemo(() => {
      const start = pageIndex * pageSize
      return filteredData.slice(start, start + pageSize)
    }, [filteredData, pageIndex, pageSize])

    const allSelected = paginatedData.length > 0 && paginatedData.every((row, index) =>
      selectedRows.has(getRowId(row, index))
    )
    const someSelected = paginatedData.some((row, index) =>
      selectedRows.has(getRowId(row, index))
    )

    const toggleAllSelected = () => {
      setSelectedRows((prev) => {
        const next = new Set(prev)
        paginatedData.forEach((row, index) => {
          const id = getRowId(row, index)
          if (allSelected) {
            next.delete(id)
          } else {
            next.add(id)
          }
        })
        return next
      })
    }

    return (
      <thead ref={ref} className={cn("border-b-2 border-foreground", className)} {...props}>
        <tr>
          <th className="h-12 w-12 px-4 text-left">
            <Checkbox
              checked={allSelected}
              onChange={toggleAllSelected}
              className={cn(!allSelected && someSelected && "opacity-50")}
            />
          </th>
          {visibleColumns.map((column) => {
            const isSorted = sorting?.id === column.id
            const canSort = column.enableSorting !== false

            return (
              <th key={column.id} className="h-12 px-4 text-left font-bold">
                {canSort ? (
                  <button
                    onClick={() => {
                      if (isSorted && !sorting.desc) {
                        setSorting({ id: column.id, desc: true })
                      } else if (isSorted && sorting.desc) {
                        setSorting(null)
                      } else {
                        setSorting({ id: column.id, desc: false })
                      }
                    }}
                    className="flex items-center gap-2 hover:text-muted-foreground transition-colors"
                  >
                    {typeof column.header === "string" ? column.header : column.header({ table: {} })}
                    {isSorted && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={sorting.desc ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                        />
                      </svg>
                    )}
                    {!isSorted && canSort && (
                      <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    )}
                  </button>
                ) : (
                  <span>
                    {typeof column.header === "string" ? column.header : column.header({ table: {} })}
                  </span>
                )}
              </th>
            )
          })}
          <th className="h-12 w-12 px-4"></th>
        </tr>
      </thead>
    )
  }
)
DataTableHeader.displayName = "DataTableHeader"

interface DataTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  renderRow?: <T>(row: T, index: number) => React.ReactNode
}

const DataTableBody = React.forwardRef<HTMLTableSectionElement, DataTableBodyProps>(
  ({ className, renderRow, ...props }, ref) => {
    const { data, columns, columnVisibility, selectedRows, setSelectedRows, getRowId, sorting, globalFilter, pageIndex, pageSize } = useDataTable()

    const visibleColumns = columns.filter((col) => columnVisibility[col.id] !== false)

    const filteredData = React.useMemo(() => {
      let result = [...data]
      
      if (globalFilter) {
        const filter = globalFilter.toLowerCase()
        result = result.filter((row) => {
          return columns.some((column) => {
            if (column.accessorKey) {
              const value = (row as Record<string, unknown>)[column.accessorKey as string]
              return String(value).toLowerCase().includes(filter)
            }
            return false
          })
        })
      }

      if (sorting) {
        const column = columns.find((col) => col.id === sorting.id)
        if (column && column.enableSorting) {
          result = [...result].sort((a, b) => {
            let aValue: unknown
            let bValue: unknown

            if (column.accessorFn) {
              aValue = column.accessorFn(a)
              bValue = column.accessorFn(b)
            } else if (column.accessorKey) {
              aValue = (a as Record<string, unknown>)[column.accessorKey as string]
              bValue = (b as Record<string, unknown>)[column.accessorKey as string]
            } else {
              return 0
            }

            const aStr = String(aValue ?? "")
            const bStr = String(bValue ?? "")
            if (aStr < bStr) return sorting.desc ? 1 : -1
            if (aStr > bStr) return sorting.desc ? -1 : 1
            return 0
          })
        }
      }

      return result
    }, [data, columns, sorting, globalFilter])

    const paginatedData = React.useMemo(() => {
      const start = pageIndex * pageSize
      return filteredData.slice(start, start + pageSize)
    }, [filteredData, pageIndex, pageSize])

    const toggleRowSelected = (rowId: string) => {
      setSelectedRows((prev) => {
        const next = new Set(prev)
        if (next.has(rowId)) {
          next.delete(rowId)
        } else {
          next.add(rowId)
        }
        return next
      })
    }

    if (renderRow) {
      return (
        <tbody ref={ref} className={className} {...props}>
          {paginatedData.map((row, index) => renderRow(row, index))}
        </tbody>
      )
    }

    return (
      <tbody ref={ref} className={className} {...props}>
        {paginatedData.map((row, index) => {
          const rowId = getRowId(row, index)
          const isSelected = selectedRows.has(rowId)

          return (
            <tr
              key={rowId}
              className={cn(
                "border-b-2 border-foreground transition-colors",
                isSelected && "bg-muted"
              )}
            >
              <td className="h-12 px-4">
                <Checkbox
                  checked={isSelected}
                  onChange={() => toggleRowSelected(rowId)}
                />
              </td>
              {visibleColumns.map((column) => {
                let value: unknown
                if (column.accessorFn) {
                  value = column.accessorFn(row as unknown)
                } else if (column.accessorKey) {
                  value = (row as Record<string, unknown>)[column.accessorKey as string]
                }

                return (
                  <td key={column.id} className="h-12 px-4">
                    {column.cell ? column.cell({ row, value }) : <span>{String(value ?? "")}</span>}
                  </td>
                )
              })}
              <td className="h-12 px-4">
                <DataTableRowActions row={row} />
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
)
DataTableBody.displayName = "DataTableBody"

interface DataTableRowActionsProps<T = unknown> {
  row: T
}

const DataTableRowActions = <T,>({ }: DataTableRowActionsProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type DataTableFooterProps = React.HTMLAttributes<HTMLDivElement>

const DataTableFooter = React.forwardRef<HTMLDivElement, DataTableFooterProps>(
  ({ className, ...props }, ref) => {
    const { selectedRows, data, globalFilter, pageIndex, pageSize, setPageIndex } = useDataTable()

    const filteredData = React.useMemo(() => {
      let result = [...data]
      
      if (globalFilter) {
        result = result.filter(() => {
          return true
        })
      }

      return result
    }, [data, globalFilter])

    const selectedCount = Array.from(selectedRows).length
    const totalRows = filteredData.length
    const pageCount = Math.ceil(totalRows / pageSize)
    const canPreviousPage = pageIndex > 0
    const canNextPage = pageIndex < pageCount - 1

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between mt-4", className)}
        {...props}
      >
        <div className="text-sm text-muted-foreground">
          {selectedCount} of {totalRows} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => Math.min(pageCount - 1, prev + 1))}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }
)
DataTableFooter.displayName = "DataTableFooter"

export {
  DataTable,
  DataTableToolbar,
  DataTableHeader,
  DataTableBody,
  DataTableFooter,
}

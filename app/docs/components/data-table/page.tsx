"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import {
  DataTable,
  DataTableToolbar,
  DataTableHeader,
  DataTableBody,
  DataTableFooter,
  Column,
} from "@/app/components/ui/data-table"
import { Badge } from "@/app/components/ui/badge"
import { CodeBlock } from "@/app/components/code-block"
import * as React from "react"

type Payment = {
  id: string
  status: "success" | "processing" | "failed"
  email: string
  amount: string
}

const payments: Payment[] = [
  { id: "1", status: "success", email: "ken99@yahoo.com", amount: "$31" },
  { id: "2", status: "success", email: "abe45@gmail.com", amount: "$242.00" },
  { id: "3", status: "processing", email: "monserrat44@gmail.com", amount: "$837.00" },
  { id: "4", status: "success", email: "silas22@gmail.com", amount: "$874.00" },
  { id: "5", status: "failed", email: "carmella@hotmail.com", amount: "$721.00" },
]

const statusColors = {
  success: "default",
  processing: "secondary",
  failed: "destructive",
} as const

export default function DataTableDocsPage() {
  const columns: Column<Payment>[] = [
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      enableSorting: true,
      cell: ({ value }) => (
        <Badge variant={statusColors[value as keyof typeof statusColors] || "default"}>
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </Badge>
      ),
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      enableSorting: true,
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      enableSorting: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Data Table</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Powerful table and datagrids for displaying and managing tabular data.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Data Table component is a powerful, feature-rich table for displaying and managing 
            tabular data. It includes search/filtering, sorting, column visibility toggles, row selection, 
            and pagination. Built from scratch using React and native HTML elements. No dependencies on 
            any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/data-table.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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
} from "./dropdown-menu"

export interface Column<T> {
  id: string
  header: string | ((props: { table: any }) => React.ReactNode)
  accessorKey?: keyof T
  accessorFn?: (row: T) => React.ReactNode
  enableSorting?: boolean
  enableHiding?: boolean
  cell?: (props: { row: T; value: any }) => React.ReactNode
}

// ... (full component code)
// See the actual file for complete implementation`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/data-table.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

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

// ... (full component code)
// See the actual file for complete implementation`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import {
  DataTable,
  DataTableToolbar,
  DataTableHeader,
  DataTableBody,
  DataTableFooter,
  Column,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

type Payment = {
  id: string
  status: "success" | "processing" | "failed"
  email: string
  amount: string
}

const columns: Column<Payment>[] = [
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    cell: ({ value }) => <Badge>{value}</Badge>,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    enableSorting: true,
  },
  {
    id: "amount",
    header: "Amount",
    accessorKey: "amount",
    enableSorting: true,
  },
]

function MyComponent() {
  const data: Payment[] = [
    { id: "1", status: "success", email: "ken99@yahoo.com", amount: "$31" },
    { id: "2", status: "processing", email: "abe45@gmail.com", amount: "$242.00" },
  ]

  return (
    <DataTable data={data} columns={columns}>
      <DataTableToolbar searchPlaceholder="Filter emails..." />
      <div className="rounded-md border-2 border-foreground neobrutalism-shadow">
        <table className="w-full">
          <DataTableHeader />
          <DataTableBody />
        </table>
      </div>
      <DataTableFooter />
    </DataTable>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import {
  DataTable,
  DataTableToolbar,
  DataTableHeader,
  DataTableBody,
  DataTableFooter,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

const columns = [
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    cell: ({ value }) => <Badge>{value}</Badge>,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    enableSorting: true,
  },
  {
    id: "amount",
    header: "Amount",
    accessorKey: "amount",
    enableSorting: true,
  },
]

function MyComponent() {
  const data = [
    { id: "1", status: "success", email: "ken99@yahoo.com", amount: "$31" },
    { id: "2", status: "processing", email: "abe45@gmail.com", amount: "$242.00" },
  ]

  return (
    <DataTable data={data} columns={columns}>
      <DataTableToolbar searchPlaceholder="Filter emails..." />
      <div className="rounded-md border-2 border-foreground neobrutalism-shadow">
        <table className="w-full">
          <DataTableHeader />
          <DataTableBody />
        </table>
      </div>
      <DataTableFooter />
    </DataTable>
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function, and the required 
            UI components (<code className="bg-muted px-1 py-0.5 rounded">input</code>, <code className="bg-muted px-1 py-0.5 rounded">button</code>, 
            <code className="bg-muted px-1 py-0.5 rounded">checkbox</code>, <code className="bg-muted px-1 py-0.5 rounded">dropdown-menu</code>).
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-6">
            <DataTable data={payments} columns={columns}>
              <DataTableToolbar searchPlaceholder="Filter emails..." />
              <div className="rounded-md border-2 border-foreground neobrutalism-shadow overflow-hidden">
                <table className="w-full">
                  <DataTableHeader />
                  <DataTableBody />
                </table>
              </div>
              <DataTableFooter />
            </DataTable>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/context-menu">
            <Button variant="outline" size="lg">
              ← Context Menu
            </Button>
          </Link>
          <Link href="/docs/components/date-picker">
            <Button variant="outline" size="lg">
              Date Picker →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


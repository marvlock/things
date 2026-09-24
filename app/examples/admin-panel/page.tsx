"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Input } from "@/app/components/ui/input"
import {
  Sidebar,
  SidebarHeader,
  SidebarBrand,
  SidebarContent,
  SidebarSection,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
} from "@/app/components/ui/sidebar"
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableToolbar,
  DataTableFooter,
} from "@/app/components/ui/data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"
import { Label } from "@/app/components/ui/label"

type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  createdAt: string
}

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", createdAt: "2025-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "active", createdAt: "2025-01-20" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "inactive", createdAt: "2025-02-01" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "Editor", status: "pending", createdAt: "2025-02-10" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "active", createdAt: "2025-02-15" },
  { id: "6", name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "active", createdAt: "2025-02-20" },
  { id: "7", name: "Eve Adams", email: "eve@example.com", role: "Editor", status: "inactive", createdAt: "2025-03-01" },
  { id: "8", name: "Frank Miller", email: "frank@example.com", role: "Viewer", status: "pending", createdAt: "2025-03-05" },
]

const columns = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name" as keyof User,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email" as keyof User,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role" as keyof User,
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status" as keyof User,
    cell: ({ value }: { value: unknown }) => {
      const status = value as User["status"]
      const variants: Record<User["status"], "default" | "secondary" | "destructive"> = {
        active: "default",
        inactive: "destructive",
        pending: "secondary",
      }
      return <Badge variant={variants[status]}>{status}</Badge>
    },
  },
  {
    id: "createdAt",
    header: "Created",
    accessorKey: "createdAt" as keyof User,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: User }) => {
      return (
        <div className="flex gap-2">
          <EditUserDialog user={row} />
          <DeleteUserDialog userId={row.id} userName={row.name} />
        </div>
      )
    },
  },
]

function EditUserDialog({ user }: { user: User }) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  })

  const handleSave = () => {
    // Simulate save
    console.log("Saving user:", formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor={`user-${user.id}-name`}>Name</Label>
            <Input
              id={`user-${user.id}-name`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`user-${user.id}-email`}>Email</Label>
            <Input
              id={`user-${user.id}-email`}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`user-${user.id}-role`}>Role</Label>
            <Input
              id={`user-${user.id}-role`}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`user-${user.id}-status`}>Status</Label>
            <Input
              id={`user-${user.id}-status`}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as User["status"] })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteUserDialog({ userId, userName }: { userId: string; userName: string }) {
  const [open, setOpen] = React.useState(false)

  const handleDelete = () => {
    // Simulate delete
    console.log("Deleting user:", userId)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user{" "}
            <strong>{userName}</strong> and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function AdminPanelExamplePage() {
  const [activeSection, setActiveSection] = React.useState("dashboard")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  const filteredUsers = React.useMemo(() => {
    if (!searchQuery) return mockUsers
    const query = searchQuery.toLowerCase()
    return mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const stats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((u) => u.status === "active").length,
    pendingUsers: mockUsers.filter((u) => u.status === "pending").length,
    totalRevenue: "$45,231",
  }

  return (
    <div className="flex min-h-screen bg-[#F7F4EE] overflow-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed}>
        <SidebarHeader>
          <SidebarBrand
            icon={
              <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-foreground bg-primary text-primary-foreground neobrutalism-shadow-sm">
                <span className="text-sm font-bold">A</span>
              </div>
            }
            title="Admin Panel"
            subtitle="Management Dashboard"
          >
            <SidebarTrigger />
          </SidebarBrand>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "dashboard"}
                  onClick={() => setActiveSection("dashboard")}
                >
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "users"}
                  onClick={() => setActiveSection("users")}
                >
                  Users
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "settings"}
                  onClick={() => setActiveSection("settings")}
                >
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>
          <Link href="/docs/examples" aria-label="Back to examples" className="block w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-center text-sm font-bold text-foreground hover:bg-accent">
            {sidebarCollapsed ? "←" : "← Back to Examples"}
          </Link>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b-2 border-foreground bg-background p-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">Acme operations</p><h1 className="mt-1 text-3xl font-black uppercase leading-none">
              {activeSection === "dashboard" && "Dashboard"}
              {activeSection === "users" && "User Management"}
              {activeSection === "settings" && "Settings"}
            </h1></div>
            <div className="flex w-full items-center gap-3 sm:w-auto">
              {activeSection === "users" && <Input aria-label="Search users" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="min-w-0 flex-1 sm:w-64" />}
              <Button onClick={() => setActiveSection("users")}>Manage users</Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-6">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-4 bg-[#FFD166]">
                  <CardHeader>
                    <CardTitle>Total Users</CardTitle>
                    <CardDescription>All registered users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalUsers}</div>
                  </CardContent>
                </Card>

                <Card className="border-4 bg-[#56E3A6]">
                  <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                    <CardDescription>Currently active</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.activeUsers}</div>
                  </CardContent>
                </Card>

                <Card className="border-4 bg-[#FF8FAB]">
                  <CardHeader>
                    <CardTitle>Pending Users</CardTitle>
                    <CardDescription>Awaiting approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.pendingUsers}</div>
                  </CardContent>
                </Card>

                <Card className="border-4 bg-[#75C2F6]">
                  <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                    <CardDescription>This month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalRevenue}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="border-4 bg-background">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest user actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between gap-4 border-b-2 border-foreground pb-4 last:border-0 last:pb-0">
                        <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "users" && (
            <div className="space-y-6">
              <Card className="border-4">
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Manage all users in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable data={filteredUsers} columns={columns} getRowId={(row) => row.id}>
                    <DataTableToolbar />
                    <div className="rounded-md border-2 border-foreground">
                      <table className="w-full">
                        <DataTableHeader />
                        <DataTableBody />
                      </table>
                    </div>
                    <DataTableFooter />
                  </DataTable>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="space-y-6">
              <Card className="border-4">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure your admin panel settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="admin-site-name">Site Name</Label>
                      <Input id="admin-site-name" defaultValue="Admin Panel" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-site-description">Site Description</Label>
                      <Input id="admin-site-description" defaultValue="Management Dashboard" />
                    </div>
                    <div className="flex gap-4">
                      <Button>Save Changes</Button>
                      <Button variant="outline">Reset</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

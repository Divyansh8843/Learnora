"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Settings,
  Trash2,
  Ban,
  CheckCircle2,
  AlertCircle,
  Activity,
  TrendingUp,
  BarChart3,
  Search,
} from "lucide-react"

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2024-02-20" },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Moderator",
      status: "Active",
      joinDate: "2024-01-10",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "Inactive",
      joinDate: "2023-12-05",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "User",
      status: "Active",
      joinDate: "2024-03-01",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const stats = [
    { title: "Total Users", value: "1,248", icon: Users, change: "+12%" },
    { title: "Active Users", value: "892", icon: Activity, change: "+5%" },
    { title: "Challenges Created", value: "156", icon: BarChart3, change: "+8%" },
    { title: "Resource Submissions", value: "423", icon: TrendingUp, change: "+15%" },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleBanUser = (id: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: "Banned" } : user)))
  }

  const handleUnbanUser = (id: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: "Active" } : user)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage users, moderate content, and monitor platform activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-foreground">{stat.title}</CardTitle>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-chart-4 mt-2">{stat.change} from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Users className="w-8 h-8" />
                            <p>No users found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === "Active"
                                  ? "bg-chart-4 text-white"
                                  : user.status === "Inactive"
                                    ? "bg-muted text-muted-foreground"
                                    : "bg-destructive text-white"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {user.status === "Active" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleBanUser(user.id)}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <Ban className="w-4 h-4" />
                                </Button>
                              )}
                              {user.status === "Banned" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUnbanUser(user.id)}
                                  className="text-chart-4 hover:text-chart-4 hover:bg-chart-4/10"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    type: "Challenge",
                    title: "Advanced Python Tricks",
                    status: "Pending Review",
                    user: "John Doe",
                  },
                  { id: 2, type: "Resource", title: "Web Development Guide", status: "Approved", user: "Jane Smith" },
                  {
                    id: 3,
                    type: "Group",
                    title: "Machine Learning Study Group",
                    status: "Flagged",
                    user: "Bob Wilson",
                  },
                  {
                    id: 4,
                    type: "Comment",
                    title: "User comment on Python Basics",
                    status: "Pending Review",
                    user: "Alice Brown",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <p className="text-xs text-muted-foreground">by {item.user}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          item.status === "Approved"
                            ? "bg-chart-4 text-white"
                            : item.status === "Flagged"
                              ? "bg-destructive text-white"
                              : "bg-chart-1 text-white"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Platform Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Platform Name</label>
                  <Input defaultValue="Learnora" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Maximum Challenge Duration (minutes)
                  </label>
                  <Input defaultValue="120" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Daily Points Cap</label>
                  <Input defaultValue="500" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Minimum Password Length</label>
                  <Input defaultValue="8" type="number" />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Moderation Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Enable User Verification</p>
                    <p className="text-sm text-muted-foreground mt-1">Require email verification for new accounts</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Content Review Required</p>
                    <p className="text-sm text-muted-foreground mt-1">Require admin approval for new resources</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Auto-Ban Spammers</p>
                    <p className="text-sm text-muted-foreground mt-1">Automatically ban users flagged multiple times</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Update Rules</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

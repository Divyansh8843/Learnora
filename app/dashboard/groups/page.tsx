"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Search, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Python Enthusiasts",
      description: "Learning Python together",
      members: 24,
      createdAt: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Web Development Bootcamp",
      description: "Master modern web development",
      members: 18,
      createdAt: "2024-02-20",
      status: "active",
    },
    {
      id: 3,
      name: "Data Science Squad",
      description: "Explore data science fundamentals",
      members: 32,
      createdAt: "2023-12-10",
      status: "active",
    },
    {
      id: 4,
      name: "JavaScript Masters",
      description: "Advanced JavaScript patterns",
      members: 15,
      createdAt: "2024-03-05",
      status: "inactive",
    },
    {
      id: 5,
      name: "Mobile App Dev",
      description: "Building iOS and Android apps",
      members: 28,
      createdAt: "2024-01-28",
      status: "active",
    },
    {
      id: 6,
      name: "Cloud Computing",
      description: "AWS, Azure, and GCP deep dive",
      members: 21,
      createdAt: "2024-02-14",
      status: "active",
    },
  ])

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteGroup = (id: number) => {
    setGroups(groups.filter((group) => group.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Groups</h1>
          <p className="text-muted-foreground mt-2">
            Join groups, collaborate with peers, and accelerate your learning.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>Start a new learning group and invite members to join.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Group name" />
              <textarea
                placeholder="Group description"
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Create Group</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Users className="w-8 h-8" />
                        <p>No groups found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGroups.map((group) => (
                    <TableRow key={group.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Link
                          href={`/dashboard/groups/${group.id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {group.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {group.members}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={group.status === "active" ? "default" : "secondary"}
                          className={
                            group.status === "active" ? "bg-chart-4 text-white" : "bg-muted text-muted-foreground"
                          }
                        >
                          {group.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(group.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteGroup(group.id)}
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
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Heart, ExternalLink, Star } from "lucide-react"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Python Documentation",
      description: "Official Python language reference and tutorials",
      category: "Documentation",
      type: "Documentation",
      saved: false,
      views: 1240,
      rating: 4.8,
    },
    {
      id: 2,
      title: "MDN Web Docs - JavaScript",
      description: "Comprehensive JavaScript reference guide",
      category: "Documentation",
      type: "Documentation",
      saved: true,
      views: 2840,
      rating: 4.9,
    },
    {
      id: 3,
      title: "React Tutorial",
      description: "Learn React from scratch with interactive examples",
      category: "Tutorial",
      type: "Video",
      saved: false,
      views: 4120,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Data Structures Explained",
      description: "Visual guide to data structures and algorithms",
      category: "Tutorial",
      type: "Article",
      saved: true,
      views: 3450,
      rating: 4.8,
    },
    {
      id: 5,
      title: "CSS Flexbox & Grid",
      description: "Master modern CSS layout techniques",
      category: "Course",
      type: "Video",
      saved: false,
      views: 2980,
      rating: 4.6,
    },
    {
      id: 6,
      title: "SQL Query Optimization",
      description: "Advanced SQL techniques for performance",
      category: "Course",
      type: "Article",
      saved: false,
      views: 1850,
      rating: 4.5,
    },
    {
      id: 7,
      title: "TypeScript Handbook",
      description: "Official TypeScript documentation and guides",
      category: "Documentation",
      type: "Documentation",
      saved: true,
      views: 3200,
      rating: 4.8,
    },
    {
      id: 8,
      title: "Web Performance Tips",
      description: "Optimize your web applications for speed",
      category: "Tutorial",
      type: "Article",
      saved: false,
      views: 2100,
      rating: 4.7,
    },
  ])

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...new Set(resources.map((r) => r.category))]

  const toggleSave = (id: number) => {
    setResources(resources.map((resource) => (resource.id === id ? { ...resource, saved: !resource.saved } : resource)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learning Resources</h1>
        <p className="text-muted-foreground mt-2">Discover and save curated learning resources from the community.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.length === 0 ? (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No resources found</p>
            </CardContent>
          </Card>
        ) : (
          filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-2">{resource.category}</p>
                  </div>
                  <button
                    onClick={() => toggleSave(resource.id)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={resource.saved ? "currentColor" : "none"}
                      stroke={resource.saved ? "currentColor" : "currentColor"}
                      color={resource.saved ? "rgb(239, 68, 68)" : "inherit"}
                    />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>

                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-chart-1 text-chart-1" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">{resource.views.toLocaleString()} views</div>

                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

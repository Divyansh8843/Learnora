"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle2, Clock, Zap, Search, Play, AlertCircle, TrendingUp } from "lucide-react"
import { showSuccessToast } from "@/components/toast-notification"

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Python Variables 101",
      description: "Master Python variable declaration and types",
      difficulty: "Easy",
      category: "Python",
      participants: 342,
      completionRate: 87,
      timeLimit: "15 mins",
      status: "completed",
      points: 50,
    },
    {
      id: 2,
      title: "JavaScript DOM Manipulation",
      description: "Learn to manipulate the DOM with JavaScript",
      difficulty: "Medium",
      category: "JavaScript",
      participants: 218,
      completionRate: 62,
      timeLimit: "30 mins",
      status: "in-progress",
      points: 100,
    },
    {
      id: 3,
      title: "React Hooks Advanced",
      description: "Advanced React Hooks patterns and best practices",
      difficulty: "Hard",
      category: "React",
      participants: 145,
      completionRate: 45,
      timeLimit: "45 mins",
      status: "available",
      points: 150,
    },
    {
      id: 4,
      title: "SQL Query Optimization",
      description: "Write efficient SQL queries and optimize performance",
      difficulty: "Hard",
      category: "SQL",
      participants: 89,
      completionRate: 38,
      timeLimit: "60 mins",
      status: "available",
      points: 200,
    },
    {
      id: 5,
      title: "CSS Flexbox Mastery",
      description: "Build responsive layouts with CSS Flexbox",
      difficulty: "Easy",
      category: "CSS",
      participants: 412,
      completionRate: 91,
      timeLimit: "20 mins",
      status: "completed",
      points: 50,
    },
    {
      id: 6,
      title: "TypeScript Generics",
      description: "Master TypeScript Generics and advanced types",
      difficulty: "Hard",
      category: "TypeScript",
      participants: 156,
      completionRate: 52,
      timeLimit: "40 mins",
      status: "available",
      points: 150,
    },
    {
      id: 7,
      title: "Data Structures Trees",
      description: "Implement and understand tree data structures",
      difficulty: "Medium",
      category: "Algorithms",
      participants: 203,
      completionRate: 68,
      timeLimit: "35 mins",
      status: "in-progress",
      points: 120,
    },
    {
      id: 8,
      title: "Web Performance Optimization",
      description: "Learn techniques to optimize web performance",
      difficulty: "Medium",
      category: "Performance",
      participants: 178,
      completionRate: 71,
      timeLimit: "50 mins",
      status: "available",
      points: 100,
    },
  ])

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || challenge.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  const stats = [
    {
      title: "Total Challenges",
      value: challenges.length.toString(),
      icon: Zap,
    },
    {
      title: "Completed",
      value: challenges.filter((c) => c.status === "completed").length.toString(),
      icon: CheckCircle2,
    },
    {
      title: "In Progress",
      value: challenges.filter((c) => c.status === "in-progress").length.toString(),
      icon: Clock,
    },
    {
      title: "Points Earned",
      value: challenges
        .filter((c) => c.status === "completed")
        .reduce((acc, c) => acc + c.points, 0)
        .toString(),
      icon: TrendingUp,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-chart-4 text-white"
      case "Medium":
        return "bg-chart-1 text-white"
      case "Hard":
        return "bg-destructive text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-chart-4" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-chart-1" />
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const handleStartChallenge = (challengeTitle: string) => {
    showSuccessToast(`Started challenge: ${challengeTitle}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Coding Challenges</h1>
        <p className="text-muted-foreground mt-2">Take on coding challenges, test your skills, and earn points.</p>
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
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Challenge</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChallenges.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Zap className="w-8 h-8" />
                        <p>No challenges found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredChallenges.map((challenge) => (
                    <TableRow key={challenge.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="text-primary hover:underline font-medium cursor-pointer">{challenge.title}</p>
                          <p className="text-xs text-muted-foreground">{challenge.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{challenge.participants}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(challenge.status)}
                          <span className="text-sm capitalize">{challenge.status.replace("-", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                              <Play className="w-3 h-3 mr-1" />
                              Start
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Start Challenge</DialogTitle>
                              <DialogDescription>You're about to start "{challenge.title}"</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="rounded-lg bg-muted p-4">
                                <p className="text-sm font-medium mb-2">Challenge Details:</p>
                                <ul className="text-sm text-muted-foreground space-y-2">
                                  <li>
                                    <strong>Difficulty:</strong> {challenge.difficulty}
                                  </li>
                                  <li>
                                    <strong>Time Limit:</strong> {challenge.timeLimit}
                                  </li>
                                  <li>
                                    <strong>Points:</strong> {challenge.points}
                                  </li>
                                  <li>
                                    <strong>Completion Rate:</strong> {challenge.completionRate}%
                                  </li>
                                </ul>
                              </div>
                              <Button
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                onClick={() => handleStartChallenge(challenge.title)}
                              >
                                Start Challenge
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
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

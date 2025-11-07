"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Search, Flame, Star, Crown } from "lucide-react"

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeframe, setTimeframe] = useState("all-time")
  const [leaderboard, setLeaderboard] = useState([
    {
      id: 1,
      rank: 1,
      username: "alex_dev",
      email: "alex@example.com",
      points: 4850,
      streak: 47,
      challenges: 92,
      tier: "Gold",
    },
    {
      id: 2,
      rank: 2,
      username: "sarah_coder",
      email: "sarah@example.com",
      points: 4620,
      streak: 38,
      challenges: 88,
      tier: "Gold",
    },
    {
      id: 3,
      rank: 3,
      username: "mike_tech",
      email: "mike@example.com",
      points: 4380,
      streak: 32,
      challenges: 84,
      tier: "Silver",
    },
    {
      id: 4,
      rank: 4,
      username: "emma_learns",
      email: "emma@example.com",
      points: 4120,
      streak: 25,
      challenges: 79,
      tier: "Silver",
    },
    {
      id: 5,
      rank: 5,
      username: "james_dev",
      email: "james@example.com",
      points: 3890,
      streak: 21,
      challenges: 75,
      tier: "Silver",
    },
    {
      id: 6,
      rank: 6,
      username: "lisa_code",
      email: "lisa@example.com",
      points: 3650,
      streak: 18,
      challenges: 71,
      tier: "Bronze",
    },
    {
      id: 7,
      rank: 7,
      username: "chris_dev",
      email: "chris@example.com",
      points: 3420,
      streak: 15,
      challenges: 68,
      tier: "Bronze",
    },
    {
      id: 8,
      rank: 8,
      username: "you_user",
      email: "you@example.com",
      points: 3180,
      streak: 12,
      challenges: 64,
      tier: "Bronze",
    },
    {
      id: 9,
      rank: 9,
      username: "david_learn",
      email: "david@example.com",
      points: 2950,
      streak: 9,
      challenges: 60,
      tier: "Bronze",
    },
    {
      id: 10,
      rank: 10,
      username: "sophia_code",
      email: "sophia@example.com",
      points: 2720,
      streak: 6,
      challenges: 56,
      tier: "Regular",
    },
  ])

  const filteredLeaderboard = leaderboard.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />
    return null
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "Silver":
        return "bg-gray-400/10 text-gray-700 dark:text-gray-400"
      case "Bronze":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const topThree = leaderboard.slice(0, 3)
  const stats = [
    {
      title: "Your Position",
      value: "#8",
      icon: Trophy,
      description: "In global rankings",
    },
    {
      title: "Your Points",
      value: "3,180",
      icon: Star,
      description: "Points earned",
    },
    {
      title: "Streak",
      value: "12",
      icon: Flame,
      description: "Days in a row",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Global Leaderboard</h1>
        <p className="text-muted-foreground mt-2">Compete with learners worldwide and climb the ranks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performers This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThree.map((user, index) => (
              <div key={user.id} className="rounded-lg border border-border p-4 text-center">
                <div className="flex justify-center mb-3">{getRankIcon(user.rank)}</div>
                <p className="font-semibold text-foreground text-lg">#{user.rank}</p>
                <p className="text-sm font-medium text-primary mt-2">{user.username}</p>
                <Badge className={`${getTierColor(user.tier)} mt-2 inline-block`}>{user.tier}</Badge>
                <p className="text-2xl font-bold text-foreground mt-4">{user.points.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Streak</TableHead>
                  <TableHead>Challenges</TableHead>
                  <TableHead>Tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaderboard.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-bold text-primary">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}#{user.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{user.username}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">{user.points.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-chart-1" />
                        <span>{user.streak}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.challenges}</TableCell>
                    <TableCell>
                      <Badge className={getTierColor(user.tier)}>{user.tier}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

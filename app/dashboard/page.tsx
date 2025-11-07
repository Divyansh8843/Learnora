"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Trophy, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    {
      title: "Active Groups",
      value: "12",
      description: "You're part of 12 learning groups",
      icon: Users,
      href: "/dashboard/groups",
    },
    {
      title: "Resources",
      value: "48",
      description: "Total resources available",
      icon: BookOpen,
      href: "/dashboard/resources",
    },
    {
      title: "Your Rank",
      value: "#42",
      description: "On the global leaderboard",
      icon: Trophy,
      href: "/dashboard/leaderboard",
    },
    {
      title: "Learning Streak",
      value: "7 days",
      description: "Keep up the momentum!",
      icon: TrendingUp,
      href: "#",
    },
  ]

  return (
    <div className="space-y-8 fade-in-up">
      <div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Welcome to Learnora
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Master skills through challenges, collaborate with peers, and track your progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card
                className="hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-primary/30 hover:border-primary/60 hover:bg-card/80 bg-card/50 backdrop-blur-sm cursor-pointer h-full scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-black text-foreground">{stat.title}</CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/50 shadow-lg shadow-primary/20">
                      <Icon className="w-5 h-5 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          className="lg:col-span-2 border border-primary/30 bg-card/50 backdrop-blur-sm fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader>
            <CardTitle className="font-black text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Challenge", title: "Completed Python Basics", time: "2 hours ago" },
                { type: "Group", title: "Joined Web Development Group", time: "1 day ago" },
                { type: "Resource", title: "Saved React Tutorial", time: "3 days ago" },
                { type: "Leaderboard", title: "Climbed 5 positions", time: "5 days ago" },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 pb-4 border-b border-border/30 last:border-b-0 last:pb-0 hover:bg-primary/5 px-2 py-1 rounded transition-colors duration-200"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 shadow-lg shadow-primary/50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground font-medium">{activity.type}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap font-medium">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card
          className="border border-primary/30 bg-card/50 backdrop-blur-sm fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <CardHeader>
            <CardTitle className="font-black text-lg">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                asChild
                className="w-full justify-start bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50 hover:bg-primary/30 text-foreground hover:border-primary/80 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
              >
                <Link href="/dashboard/groups">Create New Group</Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50 hover:bg-primary/30 text-foreground hover:border-primary/80 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
              >
                <Link href="/dashboard/resources">Browse Resources</Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50 hover:bg-primary/30 text-foreground hover:border-primary/80 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
              >
                <Link href="/dashboard/leaderboard">View Leaderboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

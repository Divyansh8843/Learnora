"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, Award, Edit2, Trophy, BookOpen, Zap, Flame } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Developer",
    email: "john@example.com",
    username: "john_dev",
    bio: "Passionate about learning and solving problems",
    location: "San Francisco, CA",
    website: "https://johndeveloper.com",
    joinDate: "2024-01-15",
  })

  const [formData, setFormData] = useState(profile)

  const stats = [
    {
      title: "Total Points",
      value: "3,180",
      icon: Award,
      subtitle: "Points earned",
    },
    {
      title: "Challenges",
      value: "64",
      icon: Zap,
      subtitle: "Completed",
    },
    {
      title: "Learning Streak",
      value: "12",
      icon: Flame,
      subtitle: "Days",
    },
    {
      title: "Groups Joined",
      value: "12",
      icon: User,
      subtitle: "Active groups",
    },
  ]

  const achievements = [
    { id: 1, title: "First Challenge", description: "Completed your first challenge", date: "2024-01-20", icon: Zap },
    {
      id: 2,
      title: "7-Day Streak",
      description: "Maintained a 7-day learning streak",
      date: "2024-02-15",
      icon: Flame,
    },
    { id: 3, title: "Group Founder", description: "Created your first learning group", date: "2024-02-28", icon: User },
    { id: 4, title: "Top 100", description: "Reached top 100 on the leaderboard", date: "2024-03-10", icon: Trophy },
    { id: 5, title: "Challenge Master", description: "Completed 50 challenges", date: "2024-03-20", icon: Award },
    {
      id: 6,
      title: "Knowledge Sharer",
      description: "Added 10 learning resources",
      date: "2024-04-05",
      icon: BookOpen,
    },
  ]

  const recentActivity = [
    { type: "Challenge", action: "Completed Python Variables 101", date: "2 hours ago" },
    { type: "Resource", action: "Saved JavaScript DOM Manipulation", date: "5 hours ago" },
    { type: "Group", action: "Joined Data Science Squad", date: "1 day ago" },
    { type: "Challenge", action: "Completed CSS Flexbox Mastery", date: "2 days ago" },
    { type: "Achievement", action: "Earned 7-Day Streak badge", date: "5 days ago" },
  ]

  const handleSaveProfile = () => {
    setProfile(formData)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your profile and view your achievements</p>
        </div>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your profile information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Username</label>
                <Input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Bio</label>
                <Input name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Location</label>
                <Input name="location" value={formData.location} onChange={handleChange} placeholder="City, Country" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Website</label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="text-xs text-muted-foreground mt-2">{stat.subtitle}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-lg font-semibold text-foreground">{profile.name}</p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="text-foreground font-medium mt-1">@{profile.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium mt-1">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium mt-1">{profile.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-foreground font-medium mt-1">{new Date(profile.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="text-foreground mt-2">{profile.bio}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.type}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{activity.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div key={achievement.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-chart-1" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

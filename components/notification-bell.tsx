"use client"

import { useState } from "react"
import { Bell, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: number
  title: string
  message: string
  timestamp: string
  read: boolean
  type: "achievement" | "challenge" | "group" | "system"
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Achievement Unlocked!",
      message: "You earned the '7-Day Streak' achievement",
      timestamp: "2 minutes ago",
      read: false,
      type: "achievement",
    },
    {
      id: 2,
      title: "Challenge Completed",
      message: "Great job completing 'Python Variables 101'!",
      timestamp: "1 hour ago",
      read: false,
      type: "challenge",
    },
    {
      id: 3,
      title: "New Group Message",
      message: "You have 3 new messages in Data Science Squad",
      timestamp: "3 hours ago",
      read: true,
      type: "group",
    },
    {
      id: 4,
      title: "Leaderboard Update",
      message: "You moved up 5 positions on the leaderboard",
      timestamp: "Yesterday",
      read: true,
      type: "system",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "bg-chart-4/10 text-chart-4"
      case "challenge":
        return "bg-chart-1/10 text-chart-1"
      case "group":
        return "bg-primary/10 text-primary"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground line-clamp-1">{notification.title}</p>
                      <span
                        className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                          notification.read ? "bg-transparent" : "bg-primary"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notification.id)
                    }}
                    className="text-muted-foreground hover:text-foreground flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

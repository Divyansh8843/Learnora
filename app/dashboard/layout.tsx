"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, BookOpen, Trophy, User, Settings, LogOut, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NotificationBell } from "@/components/notification-bell"
import { Toaster } from "sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("userEmail")

    if (!token) {
      router.push("/auth/login")
      return
    }

    setIsAuthenticated(true)
    setUserEmail(email || "user@example.com")
    setMounted(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userEmail")
    router.push("/auth/login")
  }

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Groups",
      href: "/dashboard/groups",
      icon: Users,
    },
    {
      title: "Resources",
      href: "/dashboard/resources",
      icon: BookOpen,
    },
    {
      title: "Challenges",
      href: "/dashboard/challenges",
      icon: Zap,
    },
    {
      title: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: Trophy,
    },
  ]

  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2 py-4">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-sm">L</span>
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-sidebar-foreground">Learnora</h1>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.href} className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                  <Link href="/dashboard/profile" className="flex items-center gap-3">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/dashboard/settings" className="flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sidebar-foreground"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="-ml-1" />
              <div className="flex-1" />
              <NotificationBell />
              <div className="text-sm text-muted-foreground">{userEmail}</div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="p-6">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  )
}

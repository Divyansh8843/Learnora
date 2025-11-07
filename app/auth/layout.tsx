import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - Learnora",
  description: "Sign in or create your Learnora account",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Learnora</h1>
          <p className="text-muted-foreground text-lg">Master skills through challenges</p>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Learn Together</h3>
            <p className="text-muted-foreground">Join thousands of learners tackling challenges</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Compete & Grow</h3>
            <p className="text-muted-foreground">Track your progress on the leaderboard</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Build Community</h3>
            <p className="text-muted-foreground">Collaborate with peers in learning groups</p>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">{children}</div>
    </div>
  )
}

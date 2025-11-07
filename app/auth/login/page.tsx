"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      if (!email || !password) {
        setError("Please fill in all fields")
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        return
      }

      // Mock successful login
      localStorage.setItem("token", "mock-token")
      localStorage.setItem("userEmail", email)

      router.push("/dashboard")
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md fade-in-up">
      <Card className="p-8 border-primary/30 shadow-lg card-hover backdrop-blur-sm">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 glow-primary">
            <span className="text-foreground font-black text-xl">L</span>
          </div>
          <h2 className="text-3xl font-black text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to your Learnora account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground button-glow"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

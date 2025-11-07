"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, Lock, User, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields")
        return
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }

      if (!formData.email.includes("@")) {
        setError("Please enter a valid email")
        return
      }

      // Mock successful signup
      localStorage.setItem("userEmail", formData.email)
      router.push("/auth/verify-email")
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = formData.password.length >= 8 ? "strong" : formData.password.length >= 4 ? "medium" : "weak"

  return (
    <div className="w-full max-w-md">
      <Card className="p-8 border-border/50 shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
          <p className="text-muted-foreground mt-2">Join Learnora and start learning</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 bg-muted/50 border-border/50"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 bg-muted/50 border-border/50"
                disabled={isLoading}
              />
            </div>
            {formData.password && (
              <p
                className={`text-xs mt-2 font-medium ${
                  passwordStrength === "strong"
                    ? "text-chart-4"
                    : passwordStrength === "medium"
                      ? "text-chart-1"
                      : "text-destructive"
                }`}
              >
                Password strength: {passwordStrength}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 bg-muted/50 border-border/50"
                disabled={isLoading}
              />
            </div>
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <div className="flex items-center gap-2 mt-2 text-xs text-chart-4 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Passwords match
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

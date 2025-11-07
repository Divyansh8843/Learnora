"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!email) {
        setError("Please enter your email address")
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        return
      }

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <Card className="p-8 border-border/50 shadow-lg">
        {!isSubmitted ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">Reset Password</h2>
              <p className="text-muted-foreground mt-2">Enter your email to receive a password reset link</p>
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

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/50">
              <Link
                href="/auth/login"
                className="flex items-center gap-2 text-sm text-primary hover:underline font-medium justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-chart-4" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Check Your Email</h2>
              <p className="text-muted-foreground mt-2">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            <div className="bg-muted/50 border border-border/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                Click the link in the email to reset your password. If you don't see it, check your spam folder.
              </p>
            </div>

            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-sm text-primary hover:underline font-medium justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </>
        )}
      </Card>
    </div>
  )
}

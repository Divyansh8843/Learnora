"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, CheckCircle2, Loader2 } from "lucide-react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("userEmail")
    setEmail(storedEmail || "")
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsVerified(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleResendEmail = () => {
    setTimeLeft(60)
    setIsVerified(false)
  }

  return (
    <div className="w-full max-w-md">
      <Card className="p-8 border-border/50 shadow-lg">
        {!isVerified ? (
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Mail className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Verify Your Email</h2>
              <p className="text-muted-foreground mt-2">
                We've sent a verification email to
                <br />
                <strong>{email || "your email"}</strong>
              </p>
            </div>

            <div className="bg-muted/50 border border-border/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                Click the link in the email to verify your account. This link expires in 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>

              <Button
                type="button"
                className="w-full bg-muted hover:bg-muted/90 text-foreground"
                disabled={timeLeft > 0}
                onClick={handleResendEmail}
              >
                {timeLeft > 0 ? `Resend Email (${timeLeft}s)` : "Resend Email"}
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground">
                Wrong email?{" "}
                <Link href="/auth/signup" className="font-medium text-primary hover:underline">
                  Sign up again
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-chart-4" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Email Verified!</h2>
              <p className="text-muted-foreground mt-2">Your account is ready to use</p>
            </div>

            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Go to Dashboard
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}

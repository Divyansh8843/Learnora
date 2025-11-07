"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

export function ToastNotification() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return null
}

// Helper functions to show notifications
export function showSuccessToast(message: string) {
  toast.success(message, {
    position: "top-right",
    duration: 4000,
  })
}

export function showErrorToast(message: string) {
  toast.error(message, {
    position: "top-right",
    duration: 4000,
  })
}

export function showLoadingToast(message: string) {
  return toast.loading(message, {
    position: "top-right",
  })
}

export function updateToast(toastId: string | number, message: string, type: "success" | "error" = "success") {
  toast.dismiss(toastId)
  if (type === "success") {
    toast.success(message, {
      position: "top-right",
      duration: 4000,
    })
  } else {
    toast.error(message, {
      position: "top-right",
      duration: 4000,
    })
  }
}

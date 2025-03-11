"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"

interface AuthCheckProps {
  children: ReactNode
  fallback: ReactNode | (() => void)
  
}

export default function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      if (typeof fallback === "function") {
        fallback()
      } else if (typeof fallback === "string") {
        router.push(fallback as string)
      }
    }
  }, [user, isLoading, fallback, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-white"></div>
      </div>
    )
  }

  // If authenticated, show the protected content
  return user ? <>{children}</> : null
}


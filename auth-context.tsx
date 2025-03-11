"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define avatar options
const defaultAvatars = [
  "/placeholder.svg?height=200&width=200&text=A",
  "/placeholder.svg?height=200&width=200&text=B",
  "/placeholder.svg?height=200&width=200&text=C",
  "/placeholder.svg?height=200&width=200&text=D",
  "/placeholder.svg?height=200&width=200&text=E",
]

type User = {
  id: string
  name: string
  email: string
  avatarUrl: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    // Simulate checking for a stored session
    const checkAuth = async () => {
      try {
        // In a real app, you would check for a token in localStorage or cookies
        // and validate it with your backend
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Get a random default avatar
  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * defaultAvatars.length)
    return defaultAvatars[randomIndex]
  }

  // Generate a deterministic avatar based on email
  const getAvatarForEmail = (email: string) => {
    // Simple hash function to get a consistent index based on email
    const hash = email.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const index = hash % defaultAvatars.length
    return defaultAvatars[index]
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would validate credentials with your backend
      const mockUser = {
        id: "user-1",
        name: email.split("@")[0],
        email: email,
        avatarUrl: getAvatarForEmail(email),
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would redirect to Google OAuth
      const mockEmail = "user@gmail.com"
      const mockUser = {
        id: "google-user-1",
        name: "Google User",
        email: mockEmail,
        avatarUrl: getAvatarForEmail(mockEmail),
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


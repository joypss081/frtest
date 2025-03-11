"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "./auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithGoogle, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
      router.push("/gallery")
    } catch (err) {
      setError("登錄失敗。請檢查您的憑據。")
    }
  }

  const handleGoogleLogin = async () => {
    setError("")

    try {
      await loginWithGoogle()
      router.push("/gallery")
    } catch (err) {
      setError("Google登錄失敗。請重試。")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="mx-auto w-full max-w-md bg-[#1E1E1E] text-white shadow-xl">
        <CardHeader className="space-y-1 px-4 py-5 sm:px-6 sm:py-6">
          <CardTitle className="text-center text-xl font-bold sm:text-2xl">登入</CardTitle>
          <CardDescription className="text-center text-xs text-gray-400 sm:text-sm">
            輸入您的憑據以訪問您的賬戶
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {error && (
            <div className="rounded-md bg-red-900/30 p-3 text-center text-xs text-red-300 sm:text-sm">{error}</div>
          )}

          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="relative flex w-full items-center justify-center space-x-2 border-gray-700 bg-transparent hover:bg-gray-800"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                fill="#EA4335"
              />
              <path
                d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0909 11.9998 19.0909C8.86633 19.0909 6.21896 17.0807 5.27682 14.2696L1.2373 17.3366C3.19263 21.2953 7.26484 24.0001 11.9998 24.0001C14.9327 24.0001 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                fill="#34A853"
              />
              <path
                d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                fill="#4A90E2"
              />
              <path
                d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                fill="#FBBC05"
              />
            </svg>
            <span className="text-xs sm:text-sm">使用Google登錄</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1E1E1E] px-2 text-gray-400">或繼續使用</span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-xs text-gray-300 sm:text-sm">
                電子郵箱
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9 border-gray-700 bg-gray-800 text-sm text-white placeholder:text-gray-500 sm:h-10"
              />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs text-gray-300 sm:text-sm">
                  密碼
                </Label>
                <Button variant="link" className="h-auto p-0 text-xs text-gray-400">
                  忘記密碼？
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-9 border-gray-700 bg-gray-800 text-sm text-white sm:h-10"
              />
            </div>
            <Button
              type="submit"
              className="h-9 w-full bg-white text-black hover:bg-gray-200 sm:h-10"
              disabled={isLoading}
            >
              {isLoading ? "登錄中..." : "登錄"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 px-4 py-4 sm:px-6 sm:py-5">
          <div className="text-center text-xs text-gray-400 sm:text-sm">
            還沒有賬戶？{" "}
            <Button variant="link" className="h-auto p-0 text-xs text-white sm:text-sm">
              註冊
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


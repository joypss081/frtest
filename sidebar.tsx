"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, LogOut, User, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import AvatarGenerator from "./avatar-generator"

interface SidebarProps {
  userName?: string
  userEmail?: string
  avatarUrl?: string
  onLogout?: () => void
  isVisible?: boolean
  onClose?: () => void
  isMobile?: boolean
  onToggle?: (expanded: boolean) => void
}

export default function Sidebar({
  userName = "訪客",
  userEmail = "guest@example.com",
  avatarUrl = "",
  onLogout,
  isVisible = true,
  onClose,
  isMobile = false,
  onToggle,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(!isMobile)
  const [avatarError, setAvatarError] = useState(false)

  // Reset expanded state when mobile status changes
  useEffect(() => {
    setIsExpanded(!isMobile)
  }, [isMobile])

  // Notify parent component when sidebar state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(isExpanded)
    }
  }, [isExpanded, onToggle])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  // If not visible, don't render on mobile
  if (isMobile && !isVisible) {
    return null
  }

  return (
    <div
      className={`fixed left-0 top-0 z-40 flex h-full flex-col transition-all duration-300 ${
        isMobile
          ? "w-64 transform shadow-2xl" + (isVisible ? " translate-x-0" : " -translate-x-full")
          : isExpanded
            ? "w-64"
            : "w-16"
      }`}
    >
      <div className="flex h-full flex-col bg-[#1A1A1A] shadow-xl">
        {/* Mobile close button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">關閉選單</span>
          </Button>
        )}

        {/* Desktop toggle button */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-12 flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-md"
            aria-label={isExpanded ? "收起側邊欄" : "展開側邊欄"}
          >
            {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}

        {/* User profile section */}
        <div className={`p-4 ${isMobile ? "pt-10" : ""} ${isExpanded ? "" : "items-center"}`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              {avatarUrl && !avatarError ? (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatarUrl} alt={userName} onError={() => setAvatarError(true)} />
                  <AvatarFallback className="bg-gray-700 text-white">
                    <AvatarGenerator seed={userEmail} size={40} />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <AvatarGenerator seed={userEmail} size={40} />
              )}
            </div>

            {(isExpanded || isMobile) && (
              <div className="overflow-hidden">
                <p className="truncate text-sm font-medium text-white">{userName}</p>
                <p className="truncate text-xs text-gray-400">{userEmail}</p>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Menu items */}
        <div className="flex-1 overflow-y-auto p-3">
          {/* Logout is now the primary action */}
          <div
            className={`mb-2 flex cursor-pointer items-center rounded-md bg-red-900/30 p-2 text-red-300 hover:bg-red-800/50 hover:text-red-200 ${
              isExpanded || isMobile ? "" : "justify-center"
            }`}
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
            {(isExpanded || isMobile) && <span className="ml-3 text-sm font-medium">退出登錄</span>}
          </div>

          {/* Other menu items are secondary */}
          <div
            className={`mb-2 flex items-center rounded-md p-2 text-gray-300 hover:bg-gray-800 ${
              isExpanded || isMobile ? "" : "justify-center"
            }`}
          >
            <User className="h-5 w-5" />
            {(isExpanded || isMobile) && <span className="ml-3 text-sm">個人資料</span>}
          </div>
          {/* Add more menu items as needed */}
        </div>

        {/* Footer section */}
        <div className="p-4">
          <div className="text-xs text-gray-500 text-center">{(isExpanded || isMobile) && "© 2024 JO上傳測試"}</div>
        </div>
      </div>
    </div>
  )
}


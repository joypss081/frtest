"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import Sidebar from "./sidebar"
import ImageModal from "./image-modal"
import { useAuth } from "./auth-context"
import { Button } from "@/components/ui/button"

export default function ImageGallery() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
  }

  const handleSidebarToggle = (expanded: boolean) => {
    setSidebarExpanded(expanded)
  }

  const galleryItems = [
    {
      id: 1,
      title: "山水風景",
      description: "日落時分的寧靜山景",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "海浪",
      description: "拍打海岸的洶湧波浪",
      imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "森林小徑",
      description: "穿越古老森林的寧靜小路",
      imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      title: "沙漠沙丘",
      description: "延伸至地平線的金色沙丘",
      imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 5,
      title: "城市天際線",
      description: "暮色中的城市建築輪廓",
      imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 6,
      title: "秋色",
      description: "寧靜公園中鮮艷的秋葉",
      imageUrl: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 7,
      title: "熱帶海灘",
      description: "清澈的海水和潔白的沙灘",
      imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 8,
      title: "北極光",
      description: "夜空中舞動的極光",
      imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 9,
      title: "薰衣草田",
      description: "延伸至地平線的無盡紫色花海",
      imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 10,
      title: "雪山",
      description: "覆蓋著純淨白雪的雄偉山峰",
      imageUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 11,
      title: "瀑布",
      description: "穿過茂密綠植的壯觀水流",
      imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 12,
      title: "星空",
      description: "照亮黑暗夜空的璀璨星辰",
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop&q=60",
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-50 rounded-full bg-[#1A1A1A] text-white shadow-md md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">切換選單</span>
        </Button>
      )}

      {/* Sidebar - conditionally shown on mobile */}
      <Sidebar
        userName={user?.name || "訪客"}
        userEmail={user?.email || ""}
        avatarUrl={user?.avatarUrl}
        onLogout={handleLogout}
        isVisible={!isMobile || isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isMobile={isMobile}
        onToggle={handleSidebarToggle}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={galleryItems}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />

      {/* Main content */}
      <div
        className={`min-h-screen bg-black transition-all duration-300 ${
          isMobile
            ? "p-4 pt-16"
            : sidebarExpanded
              ? "p-6 pl-[272px] md:p-8 md:pl-[272px] lg:p-10 lg:pl-[272px]"
              : "p-6 pl-[80px] md:p-8 md:pl-[80px] lg:p-10 lg:pl-[80px]"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">檢視頁面</h1>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-lg bg-[#1E1E1E] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => openModal(index)}
              >
                <div className="p-3 sm:p-4">
                  <div className="relative h-40 w-full overflow-hidden rounded-md sm:h-48">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"></div>
                  </div>
                  <div className="pt-3 sm:pt-4">
                    <h3 className="text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
                    <p className="mt-1 text-xs text-[#E0E0E0] sm:mt-2 sm:text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


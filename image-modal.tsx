"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: {
    id: number
    title: string
    description: string
    imageUrl: string
  }[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function ImageModal({ isOpen, onClose, images, currentIndex, onNavigate }: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const currentImage = images[currentIndex]

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, currentIndex, images.length, onClose])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    onNavigate(prevIndex)
    setIsLoading(true)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length
    onNavigate(nextIndex)
    setIsLoading(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">關閉</span>
      </Button>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-8 w-8" />
        <span className="sr-only">上一張</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={handleNext}
      >
        <ChevronRight className="h-8 w-8" />
        <span className="sr-only">下一張</span>
      </Button>

      {/* Image container */}
      <div className="relative flex h-full w-full flex-col items-center justify-center p-4 md:p-10">
        <div className="relative h-[70vh] w-full max-w-5xl">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-white"></div>
            </div>
          )}
          <Image
            src={currentImage.imageUrl || "/placeholder.svg"}
            alt={currentImage.title}
            fill
            className={`object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setIsLoading(false)}
            sizes="(max-width: 768px) 100vw, 80vw"
            crossOrigin="anonymous"
            priority
          />
        </div>

        {/* Image info */}
        <div className="mt-4 w-full max-w-5xl text-center">
          <h2 className="text-xl font-bold text-white md:text-2xl">{currentImage.title}</h2>
          <p className="mt-2 text-sm text-gray-300 md:text-base">{currentImage.description}</p>
        </div>
      </div>
    </div>
  )
}


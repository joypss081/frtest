"use client"

import { useEffect, useRef } from "react"

interface AvatarGeneratorProps {
  seed: string
  size?: number
  className?: string
}

// Generate a color based on the seed string
const getColorFromSeed = (seed: string): string => {
  // Simple hash function to get a consistent hue based on seed
  const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = hash % 360

  // Use HSL to generate a color with good saturation and lightness
  return `hsl(${hue}, 70%, 60%)`
}

export default function AvatarGenerator({ seed, size = 40, className = "" }: AvatarGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Generate background color based on seed
    const bgColor = getColorFromSeed(seed)

    // Fill background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, size, size)

    // Generate a pattern based on seed
    const patternSeed = seed.split("").map((c) => c.charCodeAt(0))

    // Draw geometric pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"

    // Create a 3x3 grid of shapes
    const cellSize = size / 3

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Use the seed to determine if we should draw in this cell
        // Make it symmetrical by using the same value for mirrored positions
        const shouldDraw =
          j <= 1
            ? patternSeed[(i * 3 + j) % patternSeed.length] % 2 === 0
            : patternSeed[(i * 3 + (2 - j)) % patternSeed.length] % 2 === 0

        if (shouldDraw) {
          const x = j * cellSize
          const y = i * cellSize

          // Draw a shape
          ctx.beginPath()

          // Choose shape based on position
          const shapeType = patternSeed[i + j] % 3

          if (shapeType === 0) {
            // Circle
            ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2, 0, Math.PI * 2)
          } else if (shapeType === 1) {
            // Square
            ctx.rect(x + cellSize / 4, y + cellSize / 4, cellSize / 2, cellSize / 2)
          } else {
            // Triangle
            ctx.moveTo(x + cellSize / 2, y + cellSize / 4)
            ctx.lineTo(x + cellSize / 4, y + (3 * cellSize) / 4)
            ctx.lineTo(x + (3 * cellSize) / 4, y + (3 * cellSize) / 4)
            ctx.closePath()
          }

          ctx.fill()
        }
      }
    }

    // Add initial if provided
    if (seed) {
      const initial = seed.charAt(0).toUpperCase()

      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.font = `bold ${size / 2}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(initial, size / 2, size / 2)
    }
  }, [seed, size])

  return <canvas ref={canvasRef} width={size} height={size} className={`rounded-full ${className}`} />
}


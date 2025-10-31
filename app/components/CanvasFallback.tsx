"use client"

import React, { useRef, useEffect, useCallback } from 'react'

interface CanvasFallbackProps {
  width?: number
  height?: number
  count?: number
}

export default function CanvasFallback({ 
  count = 50,
}: CanvasFallbackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number>(Date.now())
  
  // Simplified 2D spiral entity data structure
  const entitiesRef = useRef<Array<{
    baseAngle: number
    phase: number
    scale: number
  }>>([])

  // Initialize entities
  useEffect(() => {
    const entities = []
    for (let i = 0; i < count; i++) {
      entities.push({
        baseAngle: (i / count) * Math.PI * 6,
        phase: Math.random() * Math.PI * 2,
        scale: 0.8 + Math.random() * 0.4,
      })
    }
    entitiesRef.current = entities
  }, [count])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const centerX = width / 2
    const centerY = height / 2
    const time = (Date.now() - startTimeRef.current) / 1000

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, width, height)

    // Draw spiral entities
    entitiesRef.current.forEach((entity, i) => {
      const angle = entity.baseAngle + time * 0.5 * (1 + i / count * 0.3)
      const radius = Math.min(width, height) * 0.15 + angle * 2
      
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      // Calculate opacity based on distance and lifecycle
      const distanceFromCenter = Math.sqrt(
        (x - centerX) ** 2 + (y - centerY) ** 2
      ) / (Math.min(width, height) / 2)
      const opacity = Math.max(0.2, 1 - distanceFromCenter * 0.5)
      
      // Cyan color for security entities
      ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`
      ctx.beginPath()
      const size = 3 * entity.scale * (1 + Math.sin(time * 2 + i * 0.1) * 0.3)
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
      
      // Add glow effect
      ctx.shadowColor = '#00ffff'
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // Draw simplified particles (green dots following spiral)
    for (let i = 0; i < count * 3; i++) {
      const particlePhase = time * 0.3 + (i / (count * 3)) * Math.PI * 8
      const particleRadius = Math.min(width, height) * 0.1 + particlePhase * 1.5
      
      const px = centerX + Math.cos(particlePhase) * particleRadius
      const py = centerY + Math.sin(particlePhase) * particleRadius
      
      const particleOpacity = 0.6 * (1 - (particleRadius / (Math.min(width, height) * 0.4)))
      
      if (particleOpacity > 0.1) {
        ctx.fillStyle = `rgba(0, 255, 136, ${particleOpacity})`
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [count])

  // Handle canvas resize
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      canvas.width = rect.width
      canvas.height = rect.height
    }
  }, [])

  useEffect(() => {
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, updateCanvasSize])

  return (
    <div className="w-full h-[80vh] md:h-[75vh] lg:h-[85vh] relative rounded-2xl overflow-hidden shadow-2xl bg-black/80">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'radial-gradient(circle, #001122 0%, #000000 100%)' }}
        aria-label="Simplified 2D cybersecurity visualization with spiral patterns"
        role="img"
      />
      
      {/* Performance notice */}
      <div className="absolute bottom-4 left-4 text-xs text-green-400/70 bg-black/50 px-2 py-1 rounded">
        2D Mode - Optimized for Performance
      </div>
      
      {/* Accessibility info */}
      <div className="sr-only">
        <p>
          A simplified 2D visualization showing cybersecurity entities moving in spiral patterns.
          This version is optimized for devices with limited processing power.
        </p>
      </div>
    </div>
  )
}
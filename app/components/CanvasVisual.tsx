"use client"

import React, { useRef, useEffect, useCallback, useState } from "react"

// Interface for component props
interface CanvasVisualProps {
  width?: number
  height?: number
  count?: number
  particles?: number
}

// Detect device capabilities
function useDeviceCapabilities() {
  const [isLowPerf, setIsLowPerf] = useState(false)
  
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const cores = navigator.hardwareConcurrency || 4
      const isLowPowerDevice = cores <= 2
      setIsLowPerf(isLowPowerDevice)
    }
  }, [])
  
  return { isLowPerf }
}

// Enhanced Canvas 2D implementation with security matrix visualization
export default function CanvasVisual({ 
  count = 120, 
  particles = 600,
}: CanvasVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number>(Date.now())
  const { isLowPerf } = useDeviceCapabilities()
  
  // Adjust for performance
  const adjustedCount = isLowPerf ? Math.min(count * 0.5, 60) : count
  const adjustedParticles = isLowPerf ? Math.min(particles * 0.6, 300) : particles
  
  // Entity and particle data structures
  const entitiesRef = useRef<Array<{
    baseAngle: number
    phase: number
    scale: number
    hue: number
  }>>([])
  
  const particlesRef = useRef<Array<{
    angle: number
    radius: number
    life: number
    maxLife: number
    phase: number
    speed: number
  }>>([])

  // Initialize entities and particles
  useEffect(() => {
    // Initialize security entities (cyan spirals)
    const entities = []
    for (let i = 0; i < adjustedCount; i++) {
      entities.push({
        baseAngle: (i / adjustedCount) * Math.PI * 8, // 8 spiral turns
        phase: Math.random() * Math.PI * 2,
        scale: 0.8 + Math.random() * 0.6,
        hue: 180 + Math.random() * 20, // Cyan range
      })
    }
    entitiesRef.current = entities
    
    // Initialize particles (green matrix effect)
    const particleArray = []
    for (let i = 0; i < adjustedParticles; i++) {
      particleArray.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 200,
        life: Math.random() * 8,
        maxLife: 6 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
      })
    }
    particlesRef.current = particleArray
  }, [adjustedCount, adjustedParticles])

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const centerX = width / 2
    const centerY = height / 2
    const time = (Date.now() - startTimeRef.current) / 1000
    const maxRadius = Math.min(width, height) * 0.4

    // Clear canvas with fade effect for trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, width, height)

    // Draw security entities (cyan spiral)
    ctx.shadowBlur = 0
    entitiesRef.current.forEach((entity, i) => {
      const angle = entity.baseAngle + time * 0.6 * (1 + i / adjustedCount * 0.3)
      const spiralRadius = Math.min(width, height) * 0.1 + angle * 3
      
      // Keep within bounds
      if (spiralRadius > maxRadius) return
      
      const x = centerX + Math.cos(angle) * spiralRadius
      const y = centerY + Math.sin(angle) * spiralRadius
      
      // Calculate opacity based on distance and lifecycle
      const distanceFromCenter = spiralRadius / maxRadius
      const opacity = Math.max(0.3, 1 - distanceFromCenter * 0.6)
      const pulseOpacity = opacity * (0.8 + 0.2 * Math.sin(time * 3 + i * 0.1))
      
      // Draw security entity with glow
      const size = 4 * entity.scale * (1 + Math.sin(time * 2 + i * 0.1) * 0.3)
      
      // Outer glow
      ctx.shadowColor = `hsla(${entity.hue}, 100%, 70%, 0.8)`
      ctx.shadowBlur = 15
      ctx.fillStyle = `hsla(${entity.hue}, 100%, 60%, ${pulseOpacity})`
      ctx.beginPath()
      ctx.arc(x, y, size * 1.5, 0, Math.PI * 2)
      ctx.fill()
      
      // Core entity
      ctx.shadowBlur = 5
      ctx.fillStyle = `hsla(${entity.hue}, 100%, 80%, ${pulseOpacity * 1.2})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw matrix particles (green)
    ctx.shadowBlur = 0
    particlesRef.current.forEach((particle, i) => {
      // Update particle
      particle.angle += particle.speed * 0.016 // 60fps target
      particle.radius += particle.speed * 0.5
      particle.life -= 0.016
      
      // Respawn particle when it dies or goes too far
      if (particle.life <= 0 || particle.radius > maxRadius) {
        particle.angle = Math.random() * Math.PI * 2
        particle.radius = 10 + Math.random() * 50
        particle.life = particle.maxLife
        particle.phase = Math.random() * Math.PI * 2
      }
      
      // Calculate position with spiral influence
      const spiralInfluence = 0.3
      const baseAngle = particle.angle + time * 0.4
      const actualAngle = baseAngle + Math.sin(particle.phase + time) * spiralInfluence
      
      const x = centerX + Math.cos(actualAngle) * particle.radius
      const y = centerY + Math.sin(actualAngle) * particle.radius
      
      // Calculate alpha based on life and distance
      const lifeAlpha = particle.life / particle.maxLife
      const distanceAlpha = 1 - (particle.radius / maxRadius)
      const alpha = lifeAlpha * distanceAlpha * 0.8
      
      if (alpha > 0.1) {
        const size = 2 * (1 + Math.sin(particle.phase + time * 2) * 0.5)
        
        // Particle glow
        ctx.shadowColor = 'rgba(0, 255, 136, 0.8)'
        ctx.shadowBlur = 8
        ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    })
    
    // Reset shadow for next frame
    ctx.shadowBlur = 0

    animationRef.current = requestAnimationFrame(animate)
  }, [adjustedCount, adjustedParticles])

  // Handle canvas resize
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      canvas.width = rect.width * (isLowPerf ? 1 : window.devicePixelRatio || 1)
      canvas.height = rect.height * (isLowPerf ? 1 : window.devicePixelRatio || 1)
      
      // Scale canvas back down if using high DPI
      if (!isLowPerf && window.devicePixelRatio > 1) {
        canvas.style.width = rect.width + 'px'
        canvas.style.height = rect.height + 'px'
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
      }
    }
  }, [isLowPerf])

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
    <div className="w-full h-[80vh] md:h-[75vh] lg:h-[85vh] relative rounded-2xl overflow-hidden shadow-2xl bg-black/90">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(0, 17, 34, 0.8) 0%, rgba(0, 0, 0, 1) 70%)'
        }}
        aria-label="Interactive cybersecurity visualization with spiral security entities and Matrix-inspired particle effects"
        role="img"
      />
      
      {/* Performance indicator */}
      {isLowPerf && (
        <div className="absolute top-4 right-4 text-xs text-green-400/70 bg-black/50 px-2 py-1 rounded">
          Optimized Mode
        </div>
      )}
      
      {/* Accessibility info */}
      <div className="sr-only">
        <p>
          Advanced cybersecurity visualization showing security entities moving in protective 
          spiral patterns around a central core, with Matrix-inspired green particles creating 
          dynamic shield effects. The animation represents layered security defense systems.
        </p>
      </div>
      
      {/* Interactive overlay for better accessibility */}
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-4">
        <div className="text-xs text-cyan-400/60 bg-black/30 px-3 py-1 rounded-full">
          Security Matrix Active • {adjustedCount} Entities • {adjustedParticles} Particles
        </div>
      </div>
    </div>
  )
}

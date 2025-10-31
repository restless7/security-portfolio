"use client"

import React, { useRef, useEffect, useCallback, useState } from "react"
import { useSearchParams } from "next/navigation"

interface MatrixRainProps {
  density?: number
  characterSets?: string[]
  orbitalParticles?: number
  independentParticles?: number
}

// Preset configurations for each egg
const PRESETS = {
  home: {
    density: 0.9,
    orbitalParticles: 60,
    independentParticles: 120,
    glowColor: '#00FF41',
    label: 'CLASSIC_MATRIX',
    characterSet: 'classic',
    gravity: 0.1,
    collisionIntensity: 0.8,
    morphSpeed: 1.0,
    orbitSpeed: 1.0,
    fallingSpeed: 1.0
  },
  services: {
    density: 1.3,
    orbitalParticles: 120,
    independentParticles: 200,
    glowColor: '#00FFFF',
    label: 'RESTRICTED_ZONE',
    characterSet: 'alchemy',
    gravity: 0.25,
    collisionIntensity: 1.5,
    morphSpeed: 2.5,
    orbitSpeed: 3.0,
    fallingSpeed: 2.0
  },
  blog: {
    density: 0.5,
    orbitalParticles: 20,
    independentParticles: 40,
    glowColor: '#00FF88',
    label: 'WHITE_RABBIT',
    characterSet: 'runes',
    gravity: 0.05,
    collisionIntensity: 0.3,
    morphSpeed: 0.3,
    orbitSpeed: 0.3,
    fallingSpeed: 0.5
  },
  skills: {
    density: 1.5,
    orbitalParticles: 150,
    independentParticles: 250,
    glowColor: '#FFAA00',
    label: 'SYSTEM_OVERRIDE',
    characterSet: 'glitch',
    gravity: 0.3,
    collisionIntensity: 2.0,
    morphSpeed: 3.0,
    orbitSpeed: 4.0,
    fallingSpeed: 3.0
  },
  about: {
    density: 0.8,
    orbitalParticles: 80,
    independentParticles: 120,
    glowColor: '#9966FF',
    label: 'IDENTITY_DECRYPT',
    characterSet: 'ancient',
    gravity: 0.15,
    collisionIntensity: 1.0,
    morphSpeed: 0.8,
    orbitSpeed: 1.5,
    fallingSpeed: 1.2
  },
  contact: {
    density: 0.4,
    orbitalParticles: 40,
    independentParticles: 60,
    glowColor: '#FF3366',
    label: 'SECURE_CHANNEL',
    characterSet: 'cosmic',
    gravity: 0.08,
    collisionIntensity: 0.5,
    morphSpeed: 0.5,
    orbitSpeed: 0.8,
    fallingSpeed: 0.7
  },
  projects: {
    density: 1.2,
    orbitalParticles: 100,
    independentParticles: 180,
    glowColor: '#00FFAA',
    label: 'META_CHAOS',
    characterSet: 'chaos',
    gravity: 0.2,
    collisionIntensity: 1.2,
    morphSpeed: 2.0,
    orbitSpeed: 2.5,
    fallingSpeed: 1.8
  },
  default: {
    density: 0.9,
    orbitalParticles: 60,
    independentParticles: 120,
    glowColor: '#00FF41',
    label: 'MATRIX_RAIN',
    characterSet: 'classic',
    gravity: 0.1,
    collisionIntensity: 0.8,
    morphSpeed: 1.0,
    orbitSpeed: 1.0,
    fallingSpeed: 1.0
  }
} as const

// Character sets for morphing effect
const CHARACTER_SETS = {
  classic: [
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン", // Katakana
    "0123456789ABCDEF", // Hex
    "01", // Binary
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Latin
  ],
  alchemy: [
    "🜁🜂🜃🜄🜅🜆🜇🜈🜉🜊🜋🜌🜍🜎🜏🜐🜑🜒🜓🜔🜕🜖🜗🜘🜙🜚🜛🜜🜝🜞🜟🜠🜡🜢🜣🜤🜥🜦🜧🜨🜩🜪🜫🜬🜭🜮🜯🜰🜱🜲🜳🜴🜵🜶🜷🜸🜹🜺🜻🜼🜽🜾🜿",
    "⚗⚛⚜⛤⛧⛥⚠☠☢☣☤☥☦☧☨☩☪☫☬☭☮☯☸♆♇♈♉♊♋♌♍♎♏♐♑♒♓",
    "0123456789ABCDEF",
  ],
  runes: [
    "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰ",
    "ᛱᛲᛳᛴᛵᛶᛷᛸ",
  ],
  binary: [
    "01",
    "010101010101",
    "10101010",
  ],
  glitch: [
    "▓▒░█▀▄■□▪▫",
    "╔╗╚╝║═╠╣╦╩╬",
    "░▒▓█",
    "!@#$%^&*()_+-=[]{}|;:,.<>?",
  ],
  cosmic: [
    "✦✧✨✩✪✫✬✭✮✯✰✱✲✳✴✵✶✷✸✹✺✻✼✽✾✿❀❁❂❃❄❅❆❇❈❉❊❋",
    "⋆⋇⋈⋉⋊⋋⋌⍟⍣⍤⍥⍨⍩",
    "∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅",
  ],
  ancient: [
    "𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏𓀐𓀑𓀒𓀓𓀔𓀕",
    "𐀀𐀁𐀂𐀃𐀄𐀅𐀆𐀇𐀈𐀉𐀊𐀋𐀍𐀎𐀏𐀐𐀑𐀒𐀓𐀔𐀕",
    "αβγδεζηθικλμνξοπρστυφχψω",
  ],
  chaos: [
    "⚡⚠⚛⚜⚝⚞⚟⚢⚣⚤⚥⚦⚧⚨⚩",
    "0123456789ABCDEF",
    "▓▒░█",
    "アイウエオカキクケコサシスセソ",
    "!@#$%^&*",
  ]
} as const

// Particle types with different behaviors
enum ParticleType {
  FALLING = 'falling',
  ORBITAL = 'orbital', 
  INDEPENDENT = 'independent',
  ATTRACTOR = 'attractor'
}

// Chain link structure for blog mode
interface ChainLink {
  particleAIndex: number
  particleBIndex: number
  strength: number      // 0-1, determines bond strength and break probability
  age: number           // How long the link has existed
  localOffsetX: number  // Fixed relative X position in molecule
  localOffsetY: number  // Fixed relative Y position in molecule
  bondLength: number    // Original distance when bond formed
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  char: string
  life: number
  maxLife: number
  type: ParticleType
  scale: number
  opacity: number
  morphTimer: number
  morphSpeed: number
  characterSet: string
  orbitRadius?: number
  orbitAngle?: number
  orbitSpeed?: number
  centerX?: number
  centerY?: number
  chainId?: number       // For blog mode - identifies which chain this particle belongs to
  isChainHead?: boolean  // For blog mode - true if this is the head of a chain
  inMolecule?: boolean   // For blog mode - true if particle is part of a rigid molecular structure
  moleculeAnchor?: boolean // For blog mode - true if this is the anchor point that drives molecule motion
}

export default function MatrixRain({
  density: propDensity,
  characterSets: propCharacterSets,
  orbitalParticles: propOrbitalParticles,
  independentParticles: propIndependentParticles
}: MatrixRainProps) {
  const searchParams = useSearchParams()
  const eggId = searchParams?.get('egg') || 'default'
  
  // Get preset based on egg ID
  const preset = PRESETS[eggId as keyof typeof PRESETS] || PRESETS.default
  
  // Use preset values or fallback to props
  const density = propDensity ?? preset.density
  const orbitalParticles = propOrbitalParticles ?? preset.orbitalParticles
  const independentParticles = propIndependentParticles ?? preset.independentParticles
  const characterSets = propCharacterSets ?? CHARACTER_SETS[preset.characterSet as keyof typeof CHARACTER_SETS]
  const glowColor = preset.glowColor
  const modeLabel = preset.label
  const gravity = preset.gravity
  const collisionIntensity = preset.collisionIntensity
  const morphSpeedMultiplier = preset.morphSpeed
  const orbitSpeedMultiplier = preset.orbitSpeed
  const fallingSpeedMultiplier = preset.fallingSpeed
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const attractorRef = useRef<{x: number, y: number, strength: number}>({ x: 0, y: 0, strength: 0.1 })
  
  // Chain system for blog mode (WHITE_RABBIT)
  const chainLinksRef = useRef<ChainLink[]>([])
  const chainCounterRef = useRef(0)
  
  // Performance monitoring
  const [fps, setFps] = useState(60)
  const fpsCounterRef = useRef({ frames: 0, lastTime: 0 })
  
  // Chain configuration for blog mode
  const CHAIN_CONFIG = {
    linkProbability: 0.15,        // 15% chance to form link when particles are close
    linkDistance: 35,             // Distance threshold for linking (closer for molecular bonds)
    breakProbability: 0.08,       // 8% chance to break on collision
    partialBreakProbability: 0.25, // 25% chance for partial break (only one link)
    minStrength: 0.3,             // Minimum link strength
    maxStrength: 1.0,             // Maximum link strength
    strengthDecay: 0.0005,        // Link strength decay per frame
    growthBonus: 0.02,            // Strength increase when chain grows
    maxChainLength: 12,           // Maximum particles in a chain
    molecularSpacing: 28,         // Preferred spacing between bonded particles (like atomic radii)
    rigidity: 0.95,               // How rigid the molecular structure is (0-1)
  }

  // Initialize particles system
  const initializeParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    
    // Calculate columns for falling matrix rain
    const fontSize = 16
    const columns = Math.floor(width / fontSize) * density
    
    // Create falling matrix rain particles
    for (let i = 0; i < columns; i++) {
      const x = (i / columns) * width + Math.random() * fontSize
      const characterSet = characterSets[Math.floor(Math.random() * characterSets.length)]
      
      particles.push({
        x,
        y: Math.random() * height - height,
        vx: (Math.random() - 0.5) * 3 * fallingSpeedMultiplier,
        vy: (1 + Math.random() * 3) * fallingSpeedMultiplier,
        char: characterSet[Math.floor(Math.random() * characterSet.length)],
        life: Math.random() * 300,
        maxLife: 200 + Math.random() * 300,
        type: ParticleType.FALLING,
        scale: 0.8 + Math.random() * 0.4,
        opacity: 0.3 + Math.random() * 0.7,
        morphTimer: 0,
        morphSpeed: (0.008 + Math.random() * 0.012) * morphSpeedMultiplier,
        characterSet,
      })
    }
    
    // Create orbital particles around single center
    const orbitalCenters = [
      { x: width * 0.5, y: height * 0.5 }  // Single centered spiral
    ]
    
    for (let i = 0; i < orbitalParticles; i++) {
      const center = orbitalCenters[i % orbitalCenters.length]
      const characterSet = characterSets[Math.floor(Math.random() * characterSets.length)]
      const orbitRadius = 50 + Math.random() * 150
      const orbitAngle = (i / orbitalParticles) * Math.PI * 2
      
      particles.push({
        x: center.x + Math.cos(orbitAngle) * orbitRadius,
        y: center.y + Math.sin(orbitAngle) * orbitRadius,
        vx: 0,
        vy: 0,
        char: characterSet[Math.floor(Math.random() * characterSet.length)],
        life: 100,
        maxLife: 100,
        type: ParticleType.ORBITAL,
        scale: 0.6 + Math.random() * 0.4,
        opacity: 0.7 + Math.random() * 0.3,
        morphTimer: 0,
        morphSpeed: (0.005 + Math.random() * 0.008) * morphSpeedMultiplier,
        characterSet,
        orbitRadius,
        orbitAngle,
        orbitSpeed: (0.001 + Math.random() * 0.002) * orbitSpeedMultiplier,
        centerX: center.x,
        centerY: center.y,
      })
    }
    
    // Create independent particles with Brownian motion
    for (let i = 0; i < independentParticles; i++) {
      const characterSet = characterSets[Math.floor(Math.random() * characterSets.length)]
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2 * morphSpeedMultiplier,
        vy: (Math.random() - 0.5) * 2 * morphSpeedMultiplier,
        char: characterSet[Math.floor(Math.random() * characterSet.length)],
        life: Math.random() * 400,
        maxLife: 300 + Math.random() * 400,
        type: ParticleType.INDEPENDENT,
        scale: 0.4 + Math.random() * 0.6,
        opacity: 0.2 + Math.random() * 0.6,
        morphTimer: 0,
        morphSpeed: (0.003 + Math.random() * 0.005) * morphSpeedMultiplier,
        characterSet,
      })
    }
    
    particlesRef.current = particles
  }, [density, characterSets, orbitalParticles, independentParticles])

  // Chain linking system for blog mode
  const handleChainLinking = useCallback(() => {
    if (eggId !== 'blog') return  // Only for blog mode
    
    const particles = particlesRef.current
    const links = chainLinksRef.current
    
    // Check for new potential links
    for (let i = 0; i < particles.length; i++) {
      const particleA = particles[i]
      if (particleA.type === ParticleType.ORBITAL) continue
      
      for (let j = i + 1; j < particles.length; j++) {
        const particleB = particles[j]
        if (particleB.type === ParticleType.ORBITAL) continue
        
        // Skip if already linked
        const alreadyLinked = links.some(
          link => 
            (link.particleAIndex === i && link.particleBIndex === j) ||
            (link.particleAIndex === j && link.particleBIndex === i)
        )
        if (alreadyLinked) continue
        
        // Calculate distance
        const dx = particleB.x - particleA.x
        const dy = particleB.y - particleA.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Check if within linking distance
        if (distance < CHAIN_CONFIG.linkDistance && distance > 0) {
          // Probabilistic linking
          if (Math.random() < CHAIN_CONFIG.linkProbability) {
            // Check chain lengths
            const chainALinks = links.filter(l => l.particleAIndex === i || l.particleBIndex === i).length
            const chainBLinks = links.filter(l => l.particleAIndex === j || l.particleBIndex === j).length
            
            // Prevent excessive branching - max 2 connections per particle
            if (chainALinks >= 2 || chainBLinks >= 2) continue
            
            // Calculate total chain size
            const getChainSize = (startIndex: number, visited = new Set<number>()): number => {
              if (visited.has(startIndex)) return 0
              visited.add(startIndex)
              let size = 1
              links.forEach(link => {
                if (link.particleAIndex === startIndex && !visited.has(link.particleBIndex)) {
                  size += getChainSize(link.particleBIndex, visited)
                } else if (link.particleBIndex === startIndex && !visited.has(link.particleAIndex)) {
                  size += getChainSize(link.particleAIndex, visited)
                }
              })
              return size
            }
            
            const chainSize = getChainSize(i)
            if (chainSize >= CHAIN_CONFIG.maxChainLength) continue
            
            // Create new link with fixed molecular bond
            const initialStrength = CHAIN_CONFIG.minStrength + 
              Math.random() * (CHAIN_CONFIG.maxStrength - CHAIN_CONFIG.minStrength)
            
            // Calculate fixed local offset for molecular structure
            const bondLength = Math.min(distance, CHAIN_CONFIG.molecularSpacing)
            const angle = Math.atan2(dy, dx)
            const localOffsetX = Math.cos(angle) * bondLength
            const localOffsetY = Math.sin(angle) * bondLength
            
            links.push({
              particleAIndex: i,
              particleBIndex: j,
              strength: initialStrength,
              age: 0,
              localOffsetX,
              localOffsetY,
              bondLength
            })
            
            // Assign or propagate chain IDs and molecular flags
            if (particleA.chainId === undefined && particleB.chainId === undefined) {
              // New chain/molecule
              const newChainId = chainCounterRef.current++
              particleA.chainId = newChainId
              particleB.chainId = newChainId
              particleA.isChainHead = true
              particleA.moleculeAnchor = true  // First particle drives the molecule
              particleA.inMolecule = true
              particleB.inMolecule = true
            } else if (particleA.chainId !== undefined && particleB.chainId === undefined) {
              // Add to existing chain
              particleB.chainId = particleA.chainId
              particleB.inMolecule = true
            } else if (particleB.chainId !== undefined && particleA.chainId === undefined) {
              // Add to existing chain
              particleA.chainId = particleB.chainId
              particleA.inMolecule = true
            }
            // If both have chain IDs, merge chains
            else if (particleA.chainId !== particleB.chainId) {
              const oldChainId = particleB.chainId!
              const newChainId = particleA.chainId!
              particles.forEach(p => {
                if (p.chainId === oldChainId) {
                  p.chainId = newChainId
                  p.inMolecule = true
                }
              })
            }
            
            // Visual feedback - pulse both particles
            particleA.scale = Math.min(1.5, particleA.scale * 1.2)
            particleB.scale = Math.min(1.5, particleB.scale * 1.2)
            particleA.opacity = Math.min(1, particleA.opacity * 1.3)
            particleB.opacity = Math.min(1, particleB.opacity * 1.3)
          }
        }
      }
    }
    
    // Update existing links
    for (let i = links.length - 1; i >= 0; i--) {
      const link = links[i]
      link.age++
      
      // Gradually decay strength
      link.strength -= CHAIN_CONFIG.strengthDecay
      
      // Check if link is too weak or particles are too far
      const particleA = particles[link.particleAIndex]
      const particleB = particles[link.particleBIndex]
      
      if (!particleA || !particleB) {
        links.splice(i, 1)
        continue
      }
      
      const dx = particleB.x - particleA.x
      const dy = particleB.y - particleA.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Break if too far or too weak
      if (distance > CHAIN_CONFIG.linkDistance * 2.5 || link.strength <= 0) {
        links.splice(i, 1)
        
        // Check if particle is now isolated
        const hasOtherLinks = (particleIndex: number) => 
          links.some(l => l.particleAIndex === particleIndex || l.particleBIndex === particleIndex)
        
        if (!hasOtherLinks(link.particleAIndex)) {
          particleA.chainId = undefined
          particleA.isChainHead = false
          particleA.inMolecule = false
          particleA.moleculeAnchor = false
        }
        if (!hasOtherLinks(link.particleBIndex)) {
          particleB.chainId = undefined
          particleB.isChainHead = false
          particleB.inMolecule = false
          particleB.moleculeAnchor = false
        }
      }
      // Note: Rigid body positioning is handled in updateParticles, not here
    }
  }, [eggId])

  // Collision detection and response with chain breaking
  const handleCollisions = useCallback((particles: Particle[]) => {
    const collisionRadius = 20 * collisionIntensity  // Collision detection radius
    const links = chainLinksRef.current
    
    for (let i = 0; i < particles.length; i++) {
      const particleA = particles[i]
      if (particleA.type === ParticleType.ORBITAL) continue  // Skip orbital particles
      
      for (let j = i + 1; j < particles.length; j++) {
        const particleB = particles[j]
        if (particleB.type === ParticleType.ORBITAL) continue  // Skip orbital particles
        
        // Calculate distance between particles
        const dx = particleB.x - particleA.x
        const dy = particleB.y - particleA.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < collisionRadius && distance > 0) {
          // Normalize collision vector
          const normalX = dx / distance
          const normalY = dy / distance
          
          // Calculate relative velocity
          const relativeVx = particleB.vx - particleA.vx
          const relativeVy = particleB.vy - particleA.vy
          
          // Calculate relative velocity in collision normal direction
          const speed = relativeVx * normalX + relativeVy * normalY
          
          // Do not resolve if velocities are separating
          if (speed < 0) continue
          
          // Collision response - elastic collision
          const restitution = 0.8 * collisionIntensity  // Bounce factor
          const impulse = speed * restitution
          
          // Apply impulse to particles
          particleA.vx += impulse * normalX * 0.5
          particleA.vy += impulse * normalY * 0.5
          particleB.vx -= impulse * normalX * 0.5
          particleB.vy -= impulse * normalY * 0.5
          
          // Separate particles to prevent overlap
          const separation = (collisionRadius - distance) * 0.5
          particleA.x -= normalX * separation
          particleA.y -= normalY * separation
          particleB.x += normalX * separation
          particleB.y += normalY * separation
          
          // Visual effect - slightly increase opacity on collision
          particleA.opacity = Math.min(1, particleA.opacity * 1.1)
          particleB.opacity = Math.min(1, particleB.opacity * 1.1)
          
          // Chain breaking logic for blog mode
          if (eggId === 'blog' && impulse > 0.5) {  // Only break on significant collisions
            // Check if either particle is part of a chain
            const affectedLinks: number[] = []
            links.forEach((link, linkIndex) => {
              if (link.particleAIndex === i || link.particleBIndex === i ||
                  link.particleAIndex === j || link.particleBIndex === j) {
                affectedLinks.push(linkIndex)
              }
            })
            
            if (affectedLinks.length > 0) {
              // Determine if we break the chain
              if (Math.random() < CHAIN_CONFIG.breakProbability) {
                // Complete break - destroy all links involving these particles
                affectedLinks.reverse().forEach(linkIndex => {
                  const link = links[linkIndex]
                  links.splice(linkIndex, 1)
                  
                  // Clear chain IDs if isolated
                  const hasOtherLinks = (particleIndex: number) => 
                    links.some(l => l.particleAIndex === particleIndex || l.particleBIndex === particleIndex)
                  
                  if (!hasOtherLinks(link.particleAIndex)) {
                    particles[link.particleAIndex].chainId = undefined
                    particles[link.particleAIndex].isChainHead = false
                    particles[link.particleAIndex].inMolecule = false
                    particles[link.particleAIndex].moleculeAnchor = false
                  }
                  if (!hasOtherLinks(link.particleBIndex)) {
                    particles[link.particleBIndex].chainId = undefined
                    particles[link.particleBIndex].isChainHead = false
                    particles[link.particleBIndex].inMolecule = false
                    particles[link.particleBIndex].moleculeAnchor = false
                  }
                })
                
                // Visual feedback - explosion effect
                particleA.scale = Math.min(2, particleA.scale * 1.5)
                particleB.scale = Math.min(2, particleB.scale * 1.5)
              } else if (Math.random() < CHAIN_CONFIG.partialBreakProbability) {
                // Partial break - only break one random link
                const randomLinkIndex = affectedLinks[Math.floor(Math.random() * affectedLinks.length)]
                const link = links[randomLinkIndex]
                links.splice(randomLinkIndex, 1)
                
                const hasOtherLinks = (particleIndex: number) => 
                  links.some(l => l.particleAIndex === particleIndex || l.particleBIndex === particleIndex)
                
                if (!hasOtherLinks(link.particleAIndex)) {
                  particles[link.particleAIndex].chainId = undefined
                  particles[link.particleAIndex].isChainHead = false
                  particles[link.particleAIndex].inMolecule = false
                  particles[link.particleAIndex].moleculeAnchor = false
                }
                if (!hasOtherLinks(link.particleBIndex)) {
                  particles[link.particleBIndex].chainId = undefined
                  particles[link.particleBIndex].isChainHead = false
                  particles[link.particleBIndex].inMolecule = false
                  particles[link.particleBIndex].moleculeAnchor = false
                }
              } else {
                // No break - but weaken the links
                affectedLinks.forEach(linkIndex => {
                  links[linkIndex].strength *= 0.85
                })
              }
            }
          }
        }
      }
    }
  }, [eggId])

  // Molecular rigid-body positioning for blog mode
  const updateMolecularPositions = useCallback(() => {
    if (eggId !== 'blog') return
    
    const particles = particlesRef.current
    const links = chainLinksRef.current
    
    // Group particles by molecule (chainId)
    const molecules = new Map<number, number[]>()
    particles.forEach((particle, index) => {
      if (particle.chainId !== undefined && particle.inMolecule) {
        if (!molecules.has(particle.chainId)) {
          molecules.set(particle.chainId, [])
        }
        molecules.get(particle.chainId)!.push(index)
      }
    })
    
    // Update each molecule as a rigid body
    molecules.forEach((particleIndices, chainId) => {
      // Find the anchor particle (drives the molecule's motion)
      let anchorIndex = particleIndices.find(i => particles[i].moleculeAnchor)
      if (anchorIndex === undefined) {
        // No anchor, assign one
        anchorIndex = particleIndices[0]
        particles[anchorIndex].moleculeAnchor = true
      }
      
      const anchor = particles[anchorIndex]
      
      // Position all other particles relative to anchor using fixed offsets
      particleIndices.forEach(particleIndex => {
        if (particleIndex === anchorIndex) return
        
        const particle = particles[particleIndex]
        
        // Find the link that connects this particle to the molecule
        const connectingLink = links.find(link => 
          (link.particleAIndex === particleIndex || link.particleBIndex === particleIndex) &&
          particleIndices.includes(link.particleAIndex) && 
          particleIndices.includes(link.particleBIndex)
        )
        
        if (connectingLink) {
          // Calculate position based on fixed molecular bond
          const isParticleA = connectingLink.particleAIndex === particleIndex
          const otherIndex = isParticleA ? connectingLink.particleBIndex : connectingLink.particleAIndex
          const otherParticle = particles[otherIndex]
          
          // Position relative to the other bonded particle
          const targetX = otherParticle.x + (isParticleA ? -connectingLink.localOffsetX : connectingLink.localOffsetX)
          const targetY = otherParticle.y + (isParticleA ? -connectingLink.localOffsetY : connectingLink.localOffsetY)
          
          // Apply rigid positioning with slight interpolation for smoothness
          particle.x = particle.x * (1 - CHAIN_CONFIG.rigidity) + targetX * CHAIN_CONFIG.rigidity
          particle.y = particle.y * (1 - CHAIN_CONFIG.rigidity) + targetY * CHAIN_CONFIG.rigidity
          
          // Inherit velocity from anchor (molecule moves as one)
          particle.vx = anchor.vx * 0.9
          particle.vy = anchor.vy * 0.9
        }
      })
    })
  }, [eggId])

  // Advanced particle update logic
  const updateParticles = useCallback((deltaTime: number, width: number, height: number) => {
    const attractor = attractorRef.current
    
    particlesRef.current.forEach((particle, index) => {
      // Character morphing
      particle.morphTimer += particle.morphSpeed
      if (particle.morphTimer >= 1) {
        particle.char = particle.characterSet[
          Math.floor(Math.random() * particle.characterSet.length)
        ]
        particle.morphTimer = 0
      }
      
      
      // Behavior based on particle type
      switch (particle.type) {
        case ParticleType.FALLING:
          // Only apply forces to anchor particles in molecules (blog mode)
          if (eggId === 'blog' && particle.inMolecule && !particle.moleculeAnchor) {
            // Non-anchor particles in molecules don't move independently
            break
          }
          
          // More free-roaming behavior instead of strict falling
          particle.y += particle.vy * deltaTime * 60
          particle.x += particle.vx * deltaTime * 60
          
          // Add random drift for more organic movement
          // Molecules move more slowly and smoothly
          const driftMultiplier = (eggId === 'blog' && particle.inMolecule) ? 0.3 : 1.0
          particle.vx += (Math.random() - 0.5) * 0.05 * driftMultiplier
          particle.vy += (Math.random() - 0.5) * 0.02 * driftMultiplier
          
          // Apply slight damping (more damping for molecules)
          const dampingFactor = (eggId === 'blog' && particle.inMolecule) ? 0.99 : 0.998
          particle.vx *= dampingFactor
          particle.vy *= dampingFactor
          
          // Keep within bounds with wrapping
          if (particle.x < -50) particle.x = width + 50
          if (particle.x > width + 50) particle.x = -50
          if (particle.y > height + 50) {
            particle.y = -50 - Math.random() * 100
            particle.x = Math.random() * width
            particle.life = particle.maxLife
          }
          break
          
        case ParticleType.ORBITAL:
          if (particle.orbitAngle !== undefined && particle.centerX !== undefined && particle.centerY !== undefined) {
            particle.orbitAngle += particle.orbitSpeed! * deltaTime * 60
            
            // Add orbital decay/expansion
            if (particle.orbitRadius) {
              particle.orbitRadius += Math.sin(particle.orbitAngle * 3) * 0.1
              particle.orbitRadius = Math.max(20, Math.min(200, particle.orbitRadius))
            }
            
            particle.x = particle.centerX + Math.cos(particle.orbitAngle) * particle.orbitRadius!
            particle.y = particle.centerY + Math.sin(particle.orbitAngle) * particle.orbitRadius!
          }
          break
          
        case ParticleType.INDEPENDENT:
          // Only apply forces to anchor particles in molecules (blog mode)
          if (eggId === 'blog' && particle.inMolecule && !particle.moleculeAnchor) {
            // Non-anchor particles in molecules don't move independently
            break
          }
          
          // Brownian motion with attractor influence
          const dx = attractor.x - particle.x
          const dy = attractor.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 0) {
            const force = attractor.strength / (distance * distance + 1)
            const forceMultiplier = (eggId === 'blog' && particle.inMolecule) ? 0.5 : 1.0
            particle.vx += (dx / distance) * force * deltaTime * 60 * forceMultiplier
            particle.vy += (dy / distance) * force * deltaTime * 60 * forceMultiplier
          }
          
          // Add random walk (reduced for molecules)
          const walkMultiplier = (eggId === 'blog' && particle.inMolecule) ? 0.3 : 1.0
          particle.vx += (Math.random() - 0.5) * 0.1 * walkMultiplier
          particle.vy += (Math.random() - 0.5) * 0.1 * walkMultiplier
          
          // Apply velocity damping
          particle.vx *= 0.99
          particle.vy *= 0.99
          
          // Update position
          particle.x += particle.vx * deltaTime * 60
          particle.y += particle.vy * deltaTime * 60
          
          // Wrap around screen edges
          if (particle.x < -50) particle.x = width + 50
          if (particle.x > width + 50) particle.x = -50
          if (particle.y < -50) particle.y = height + 50
          if (particle.y > height + 50) particle.y = -50
          break
      }
      
      // Life cycle management - different for each type
      if (particle.type === ParticleType.FALLING) {
        particle.life -= deltaTime * 10  // Much slower life decay for falling
        particle.opacity = Math.max(0.3, Math.min(1, particle.life / particle.maxLife))
        
        if (particle.life <= 0) {
          particle.life = particle.maxLife
          particle.y = -50 - Math.random() * 100
        }
      } else if (particle.type === ParticleType.ORBITAL) {
        // Orbital particles maintain consistent life and opacity
        particle.life = particle.maxLife
        particle.opacity = 0.7 + Math.sin(Date.now() * 0.001 + particle.orbitAngle!) * 0.2
      } else {
        // Independent particles have slower life decay
        particle.life -= deltaTime * 8  // Much slower life decay for independent
        particle.opacity = Math.max(0.2, Math.min(0.8, particle.life / particle.maxLife))
        
        if (particle.life <= 0) {
          particle.life = particle.maxLife
          particle.x = Math.random() * width
          particle.y = Math.random() * height
        }
      }
    })
  }, [eggId])

  // Render particles on canvas
  const renderParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const neonGreen = glowColor
    const particles = particlesRef.current
    
    // NO LINK RENDERING for blog mode - molecules are visualized as chunks sticking together
    
    // Render particles
    particles.forEach(particle => {
      if (particle.opacity <= 0.05) return
      
      // Extra glow for chain head particles in blog mode
      if (eggId === 'blog' && particle.isChainHead) {
        ctx.globalAlpha = particle.opacity * 0.4
        ctx.fillStyle = neonGreen
        ctx.shadowBlur = 20
        ctx.shadowColor = neonGreen
        ctx.font = `${18 * particle.scale}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(particle.char, particle.x, particle.y)
        ctx.shadowBlur = 0
      }
      
      // Render main character
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = neonGreen
      ctx.font = `${16 * particle.scale}px 'JetBrains Mono', monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Add subtle character spacing variation
      const jitter = particle.type === ParticleType.INDEPENDENT ? 
        (Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.5) : 0
      
      // Add pulsing effect for chained particles in blog mode
      if (eggId === 'blog' && particle.chainId !== undefined) {
        const pulse = Math.sin(Date.now() * 0.003 + particle.chainId) * 0.1 + 1
        ctx.font = `${16 * particle.scale * pulse}px 'JetBrains Mono', monospace`
      }
      
      ctx.fillText(
        particle.char, 
        particle.x + jitter, 
        particle.y
      )
    })
    
    ctx.globalAlpha = 1
  }, [eggId, glowColor])

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const { width, height } = canvas
    const currentTime = Date.now()
    const deltaTime = Math.min((currentTime - (fpsCounterRef.current.lastTime || currentTime)) / 1000, 0.033)
    
    // FPS monitoring
    fpsCounterRef.current.frames++
    if (currentTime - fpsCounterRef.current.lastTime > 1000) {
      setFps(fpsCounterRef.current.frames)
      fpsCounterRef.current.frames = 0
      fpsCounterRef.current.lastTime = currentTime
    }
    
    // Clear canvas completely - no trail effect
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)
    
    // Update mouse-based attractor with gravity influence
    attractorRef.current.x = width * 0.5 + Math.sin(currentTime * 0.001 * gravity * 10) * 100
    attractorRef.current.y = height * 0.5 + Math.cos(currentTime * 0.001 * gravity * 10) * 50
    attractorRef.current.strength = gravity
    
    updateParticles(deltaTime, width, height)
    
    // Handle chain linking for blog mode
    if (eggId === 'blog') {
      handleChainLinking()
      updateMolecularPositions()  // Apply rigid-body positioning
    }
    
    // Handle particle collisions
    handleCollisions(particlesRef.current)
    
    renderParticles(ctx, width, height)
    
    animationRef.current = requestAnimationFrame(animate)
  }, [eggId, updateParticles, renderParticles, handleCollisions, handleChainLinking, updateMolecularPositions])

  // Canvas resize handler
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = window.innerWidth * (window.devicePixelRatio || 1)
    canvas.height = window.innerHeight * (window.devicePixelRatio || 1)
    
    if (window.devicePixelRatio > 1) {
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
    }
    
    // Reinitialize particles for new dimensions
    initializeParticles(window.innerWidth, window.innerHeight)
  }, [initializeParticles])

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
    <div className="fixed inset-0 bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #001100 100%)' }}
        aria-label="Advanced Matrix-style generative art with morphing characters, orbital mechanics, and independent particle behaviors"
        role="img"
      />
      
      {/* Performance monitor */}
      <div className="absolute top-4 right-4 text-xs font-mono bg-black/30 px-2 py-1 rounded" style={{ color: `${glowColor}80` }}>
        <div>MODE: {modeLabel}</div>
        <div>FPS: {fps} | Particles: {particlesRef.current.length}</div>
        {eggId === 'blog' && (
          <div>Chains: {chainLinksRef.current.length} links</div>
        )}
      </div>
      
      {/* Accessibility description */}
      <div className="sr-only">
        <p>
          Advanced generative art visualization featuring morphing digital characters 
          falling like rain, particles orbiting gravitational centers, and independent 
          entities following Brownian motion patterns. The system represents complex 
          data flow and cybersecurity network activity in real-time.
        </p>
      </div>
    </div>
  )
}
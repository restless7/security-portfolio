import { useMemo, useRef } from 'react'
import { BufferGeometry, Float32BufferAttribute } from 'three'

export interface ParticleParams {
  count: number
  size: number
  emissionRate: number
  lifetime: number
  spiralInfluence: number
  noiseIntensity: number
}

export const DEFAULT_PARTICLE_PARAMS: ParticleParams = {
  count: 800,
  size: 0.012,
  emissionRate: 0.1,
  lifetime: 6.0,
  spiralInfluence: 0.8,
  noiseIntensity: 0.02,
}

export function useParticles(params: Partial<ParticleParams> = {}) {
  const particleParams = { ...DEFAULT_PARTICLE_PARAMS, ...params }
  
  // Create particle geometry with necessary attributes
  const particleGeometry = useMemo(() => {
    const geometry = new BufferGeometry()
    const { count } = particleParams
    
    // Position attribute (x, y, z)
    const positions = new Float32Array(count * 3)
    
    // Life attribute (current life remaining)
    const life = new Float32Array(count)
    
    // Phase attribute (for wave-like motion)
    const phase = new Float32Array(count)
    
    // Velocity attribute (dx, dy, dz)
    const velocity = new Float32Array(count * 3)
    
    // Initialize particles with random values
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Random starting positions in a small sphere around origin
      positions[i3 + 0] = (Math.random() - 0.5) * 0.1
      positions[i3 + 1] = (Math.random() - 0.5) * 0.1
      positions[i3 + 2] = (Math.random() - 0.5) * 0.05
      
      // Random lifetime distribution
      life[i] = Math.random() * particleParams.lifetime
      
      // Random phase for wave motion
      phase[i] = Math.random() * Math.PI * 2
      
      // Small initial velocities
      velocity[i3 + 0] = (Math.random() - 0.5) * 0.01
      velocity[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocity[i3 + 2] = (Math.random() - 0.5) * 0.005
    }
    
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('aLife', new Float32BufferAttribute(life, 1))
    geometry.setAttribute('aPhase', new Float32BufferAttribute(phase, 1))
    geometry.setAttribute('aVelocity', new Float32BufferAttribute(velocity, 3))
    
    return geometry
  }, [particleParams.count, particleParams.lifetime])
  
  // Update particle positions and states
  const updateParticles = (time: number, deltaTime: number) => {
    if (!particleGeometry) return
    
    const positions = (particleGeometry.getAttribute('position') as any).array as Float32Array
    const lifeAttr = (particleGeometry.getAttribute('aLife') as any).array as Float32Array
    const phaseAttr = (particleGeometry.getAttribute('aPhase') as any).array as Float32Array
    const velocityAttr = (particleGeometry.getAttribute('aVelocity') as any).array as Float32Array
    
    const { count, spiralInfluence, noiseIntensity } = particleParams
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Update phase for wave motion
      phaseAttr[i] += deltaTime * (0.5 + (i % 10) * 0.05)
      
      // Spiral motion influence (particles follow the main spiral loosely)
      const spiralPhase = time * 0.4 + (i / count) * Math.PI * 6 + phaseAttr[i] * 0.3
      const spiralRadius = 0.6 + 0.003 * spiralPhase * 15
      
      // Target spiral position
      const targetX = Math.cos(spiralPhase) * spiralRadius
      const targetY = Math.sin(spiralPhase) * spiralRadius
      const targetZ = Math.sin(spiralPhase * 0.5 + i * 0.1) * 0.02
      
      // Current position
      const currentX = positions[i3 + 0]
      const currentY = positions[i3 + 1] 
      const currentZ = positions[i3 + 2]
      
      // Apply spiral influence (soft attraction to spiral path)
      const attractionForce = spiralInfluence * deltaTime
      velocityAttr[i3 + 0] += (targetX - currentX) * attractionForce
      velocityAttr[i3 + 1] += (targetY - currentY) * attractionForce
      velocityAttr[i3 + 2] += (targetZ - currentZ) * attractionForce
      
      // Add some noise for organic movement
      velocityAttr[i3 + 0] += (Math.random() - 0.5) * noiseIntensity * deltaTime
      velocityAttr[i3 + 1] += (Math.random() - 0.5) * noiseIntensity * deltaTime
      velocityAttr[i3 + 2] += (Math.random() - 0.5) * noiseIntensity * 0.5 * deltaTime
      
      // Apply velocity damping
      velocityAttr[i3 + 0] *= 0.98
      velocityAttr[i3 + 1] *= 0.98
      velocityAttr[i3 + 2] *= 0.98
      
      // Update positions based on velocity
      positions[i3 + 0] += velocityAttr[i3 + 0]
      positions[i3 + 1] += velocityAttr[i3 + 1]
      positions[i3 + 2] += velocityAttr[i3 + 2]
      
      // Handle particle lifecycle - respawn when life expires
      lifeAttr[i] -= deltaTime
      if (lifeAttr[i] <= 0) {
        // Reset particle to spawn near center with new life
        positions[i3 + 0] = (Math.random() - 0.5) * 0.2
        positions[i3 + 1] = (Math.random() - 0.5) * 0.2
        positions[i3 + 2] = (Math.random() - 0.5) * 0.1
        lifeAttr[i] = particleParams.lifetime + Math.random() * 2
        phaseAttr[i] = Math.random() * Math.PI * 2
      }
    }
    
    // Mark attributes as needing update
    const positionAttr = particleGeometry.getAttribute('position')
    const lifeBufferAttr = particleGeometry.getAttribute('aLife')
    const phaseBufferAttr = particleGeometry.getAttribute('aPhase')
    const velocityBufferAttr = particleGeometry.getAttribute('aVelocity')
    
    if (positionAttr) positionAttr.needsUpdate = true
    if (lifeBufferAttr) lifeBufferAttr.needsUpdate = true
    if (phaseBufferAttr) phaseBufferAttr.needsUpdate = true
    if (velocityBufferAttr) velocityBufferAttr.needsUpdate = true
  }
  
  return {
    particleParams,
    particleGeometry,
    updateParticles,
  }
}
import { useMemo } from 'react'

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

// Particle system temporarily disabled for Next.js 15 compatibility
// three.js dependency removed to resolve React version conflicts
export function useParticles(params: Partial<ParticleParams> = {}) {
  const particleParams = { ...DEFAULT_PARTICLE_PARAMS, ...params }

  const particleGeometry = useMemo(() => null, [])

  const updateParticles = (_time: number, _deltaTime: number) => {
    // No-op stub
  }

  return {
    particleParams,
    particleGeometry,
    updateParticles,
  }
}
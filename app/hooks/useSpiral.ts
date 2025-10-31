import { useMemo } from 'react'

export interface SpiralParams {
  baseRadius: number
  radialStep: number
  angularSpeed: number
  verticalSpread: number
  turns: number
}

export const DEFAULT_SPIRAL_PARAMS: SpiralParams = {
  baseRadius: 0.8,
  radialStep: 0.008,
  angularSpeed: 0.6,
  verticalSpread: 0.05,
  turns: 8,
}

export function useSpiral(count: number, params: Partial<SpiralParams> = {}) {
  const spiralParams = { ...DEFAULT_SPIRAL_PARAMS, ...params }
  
  // Pre-compute base angles for each character instance
  const baseAngles = useMemo(() => {
    const angles = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Distribute instances across multiple spiral turns
      angles[i] = (i / count) * Math.PI * spiralParams.turns
    }
    return angles
  }, [count, spiralParams.turns])

  // Calculate spiral position for a given instance at time t
  const getSpiralPosition = (instanceIndex: number, time: number) => {
    const baseAngle = baseAngles[instanceIndex]
    const currentAngle = baseAngle + time * spiralParams.angularSpeed * (1 + instanceIndex / count * 0.3)
    
    // Spiral radius grows with angle
    const radius = spiralParams.baseRadius + spiralParams.radialStep * currentAngle * 25
    
    const x = Math.cos(currentAngle) * radius
    const y = Math.sin(currentAngle) * radius
    const z = Math.sin(currentAngle * 0.7 + instanceIndex * 0.1) * spiralParams.verticalSpread
    
    return { x, y, z, angle: currentAngle, radius }
  }

  // Get all spiral positions for all instances at current time
  const getAllSpiralPositions = (time: number) => {
    const positions = []
    for (let i = 0; i < count; i++) {
      positions.push(getSpiralPosition(i, time))
    }
    return positions
  }

  return {
    spiralParams,
    baseAngles,
    getSpiralPosition,
    getAllSpiralPositions,
  }
}
# Security Portfolio - Generative Art Canvas

## Overview

An interactive generative art visualization that showcases cybersecurity concepts through dynamic spiral patterns and Matrix-inspired particle effects. Built with Next.js, Three.js, and @react-three/fiber for high-performance WebGL rendering.

## Features

- **Spiral Security Entities**: Instanced characters moving in concentric spirals representing layered defense mechanisms
- **Particle Shield System**: BufferGeometry-based particles with no gravity, following spiral patterns with Matrix green glow
- **Performance Adaptive**: Automatically adjusts complexity based on device capabilities
- **Accessibility Compliant**: WCAG guidelines with screen reader support and semantic markup
- **Responsive Design**: Adapts to all screen sizes with proper aspect ratios

## Technical Stack

- **Next.js 14** with App Router
- **Three.js** for 3D graphics
- **@react-three/fiber** for React integration
- **Custom GLSL shaders** for particle effects
- **TypeScript** for type safety
- **TailwindCSS** for styling

## Architecture

```
app/security-portfolio/
├── page.tsx                 # Main route with canvas integration
├── README.md               # This documentation
└── components/
    ├── CanvasVisual.tsx    # Main 3D canvas component
    └── CanvasFallback.tsx  # 2D fallback for low-performance devices

app/hooks/
├── useSpiral.ts            # Spiral trajectory calculations
└── useParticles.ts         # Particle system management
```

## Component Structure

### CanvasVisual.tsx
- **SpiralScene**: Core Three.js scene with instanced mesh and particles
- **ResponsiveCanvas**: Wrapper handling resize, performance, and accessibility
- **useDeviceCapabilities**: Hook for detecting low-performance devices

### Hooks
- **useSpiral**: Manages spiral mathematics and position calculations
- **useParticles**: Handles particle system state and BufferGeometry updates

## Configuration Parameters

### Spiral Parameters (useSpiral.ts)
```typescript
interface SpiralParams {
  baseRadius: number      // Starting radius (default: 0.8)
  radialStep: number      // Radius growth rate (default: 0.008)
  angularSpeed: number    // Rotation speed (default: 0.6)
  verticalSpread: number  // Z-axis variation (default: 0.05)
  turns: number          // Total spiral turns (default: 8)
}
```

### Particle Parameters (useParticles.ts)
```typescript
interface ParticleParams {
  count: number           // Particle count (default: 800)
  size: number           // Particle size (default: 0.012)
  emissionRate: number   // Spawn rate (default: 0.1)
  lifetime: number       // Particle lifespan (default: 6.0)
  spiralInfluence: number // Attraction to spiral (default: 0.8)
  noiseIntensity: number // Random movement (default: 0.02)
}
```

## Performance Optimizations

### Automatic Device Detection
- **High-performance**: Full 3D rendering with shader effects
- **Low-performance**: Reduced instance/particle counts
- **Very low-performance**: 2D canvas fallback

### GPU Optimizations
- InstancedMesh for character rendering (GPU instancing)
- BufferGeometry for particle systems
- Custom GLSL shaders for particle effects
- Frustum culling enabled
- Conditional antialiasing

### Memory Management
- Geometry reuse and caching
- Proper cleanup in useEffect hooks
- requestAnimationFrame for smooth animations

## Accessibility Features

- **ARIA Labels**: Descriptive labels for screen readers
- **Semantic Markup**: Proper role attributes
- **Keyboard Navigation**: Focusable elements where appropriate
- **Performance Indicators**: Visual feedback for optimization modes
- **Alternative Descriptions**: Screen reader content for visual elements

## Usage

### Basic Implementation
```tsx
import CanvasVisual from "@/app/components/CanvasVisual"

export default function Page() {
  return (
    <CanvasVisual 
      count={120}        // Security entities
      particles={600}    // Particle count
    />
  )
}
```

### With Custom Parameters
```tsx
<CanvasVisual 
  count={200}
  particles={1000}
  // Spiral parameters passed through to hooks
/>
```

## Development

### Local Setup
1. Ensure dependencies are installed: `npm install three @react-three/fiber @react-three/drei`
2. Run development server: `npm run dev`
3. Navigate to `/security-portfolio`

### Performance Testing
- Monitor FPS with browser dev tools
- Test on various device types
- Use `navigator.hardwareConcurrency` for device capability detection
- Check memory usage with Three.js dev tools

### Tuning Guidelines
- **High FPS (>60)**: Increase particle/instance counts
- **Low FPS (<30)**: Decrease counts or enable fallback mode  
- **Memory Issues**: Reduce geometry complexity or particle lifetime
- **Mobile Devices**: Use 2D fallback or very low counts

## Customization

### Colors
Modify the theme colors in the shader uniforms and material properties:
```typescript
// Cyan entities
color={new Color(0x00ffff)}

// Matrix green particles  
vec3 color = vec3(0.0, 1.0, 0.4);
```

### Animation Speed
Adjust timing parameters in the animation loops:
```typescript
const spiralParams = {
  angularSpeed: 0.5,  // Slower/faster rotation
  // ...
}
```

### Visual Effects
- Modify shader code for different particle appearances
- Adjust lighting for different moods
- Change geometry for different entity shapes

## Browser Compatibility

- **Modern Browsers**: Full WebGL2 support recommended
- **Safari**: WebGL1 fallback available
- **Mobile**: Performance optimization automatic
- **Old Browsers**: 2D canvas fallback

## Testing

### Visual Regression Tests
```bash
# Capture baseline screenshots
npm run test:visual

# Compare against baseline
npm run test:visual:compare
```

### Performance Tests
```bash
# FPS monitoring
npm run test:performance

# Memory profiling
npm run test:memory
```

### Accessibility Tests  
```bash
# Lighthouse audit
npm run test:lighthouse

# WCAG compliance
npm run test:accessibility
```

## Troubleshooting

### Common Issues

**Canvas Not Rendering**
- Check WebGL support: `canvas.getContext('webgl2')`
- Verify Three.js version compatibility
- Ensure proper component mounting with dynamic import

**Poor Performance**
- Enable performance mode in component props
- Reduce instance/particle counts
- Use 2D fallback for very low-end devices

**Memory Leaks**
- Ensure proper geometry disposal
- Clear animation frames on unmount
- Remove event listeners in cleanup

**Accessibility Warnings**
- Add proper ARIA labels
- Ensure color contrast compliance
- Provide alternative content for screen readers

## Security Considerations

- **CSP Compliance**: Uses inline styles minimally
- **XSS Prevention**: No dynamic script injection
- **Resource Loading**: All assets served from same origin
- **Performance Limits**: Automatic throttling prevents resource exhaustion

## Future Enhancements

- **WebGPU Support**: For even better performance
- **Advanced Post-Processing**: Bloom, tone mapping, SSAO
- **Interactive Controls**: User-adjustable parameters
- **Data Visualization**: Real security metrics integration
- **VR/AR Support**: Immersive security visualization

---

**Author**: Sebastian García - Cybersecurity Specialist  
**Last Updated**: October 2024  
**Environment**: Next.js 14, Three.js, React 19
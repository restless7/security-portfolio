import { Metadata } from "next"
import CanvasVisual from "@/app/components/CanvasVisual"

export const metadata: Metadata = {
  title: "Security Portfolio - Generative Art | Sebastian García",
  description: "Interactive generative art visualization showcasing cybersecurity concepts through dynamic spiral patterns and matrix-inspired effects.",
  keywords: "generative art, cybersecurity visualization, interactive graphics, three.js, security portfolio",
}

export default function SecurityPortfolioPage() {
  return (
    <div className="min-h-screen matrix-bg">
      {/* Hero Section with Canvas */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent cyber-glow">
                Security Matrix
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              An interactive visualization of cybersecurity concepts through generative art. 
              Watch as security entities move in protective spirals while defensive particles 
              create a dynamic shield matrix around the system core.
            </p>
          </div>

          {/* Canvas Container */}
          <div className="relative">
            <CanvasVisual 
              count={120}
              particles={600}
            />
          </div>

          {/* Controls/Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="security-card p-6">
              <h3 className="text-cyan-400 font-semibold mb-3">Security Entities</h3>
              <p className="text-gray-300 text-sm">
                Cybersecurity components moving in concentric spirals, 
                representing layered defense mechanisms protecting the system core.
              </p>
            </div>
            
            <div className="security-card p-6">
              <h3 className="text-green-400 font-semibold mb-3">Particle Shield</h3>
              <p className="text-gray-300 text-sm">
                Dynamic particle system creating protective barriers with 
                Matrix-inspired green glow effects and autonomous movement patterns.
              </p>
            </div>
            
            <div className="security-card p-6">
              <h3 className="text-cyan-400 font-semibold mb-3">Adaptive System</h3>
              <p className="text-gray-300 text-sm">
                Performance-optimized rendering that adapts to device capabilities 
                while maintaining smooth 60fps visualization of security concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technical Implementation
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Built with performance and security in mind using modern web technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="security-card p-6 text-center">
              <div className="text-2xl mb-3">⚡</div>
              <h4 className="text-cyan-400 font-semibold mb-2">Canvas 2D</h4>
              <p className="text-gray-300 text-sm">Hardware-accelerated 2D rendering for smooth 60fps performance</p>
            </div>
            
            <div className="security-card p-6 text-center">
              <div className="text-2xl mb-3">🔒</div>
              <h4 className="text-green-400 font-semibold mb-2">Client-Only</h4>
              <p className="text-gray-300 text-sm">Secure client-side rendering with no server dependencies</p>
            </div>
            
            <div className="security-card p-6 text-center">
              <div className="text-2xl mb-3">📱</div>
              <h4 className="text-cyan-400 font-semibold mb-2">Responsive</h4>
              <p className="text-gray-300 text-sm">Adaptive rendering across all device types and sizes</p>
            </div>
            
            <div className="security-card p-6 text-center">
              <div className="text-2xl mb-3">♿</div>
              <h4 className="text-green-400 font-semibold mb-2">Accessible</h4>
              <p className="text-gray-300 text-sm">WCAG compliant with keyboard navigation support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
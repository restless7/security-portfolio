"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import MatrixRain from "@/app/components/MatrixRain"

function MatrixContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const egg = searchParams.get("egg") || "default"

  return (
    <>
      <MatrixRain />
      
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 text-xs font-mono text-green-400/70 hover:text-green-400 transition-colors bg-black/30 px-3 py-2 rounded backdrop-blur-sm border border-green-400/20 hover:border-green-400/50"
        aria-label="Return to previous page"
      >
        ← ESC
      </button>
      
      {/* System status overlay */}
      <div className="fixed bottom-4 left-4 text-xs text-green-400/30 font-mono bg-black/20 px-3 py-2 rounded backdrop-blur-sm">
        <div className="flex gap-4">
          <span>MATRIX_RAIN.EXE</span>
          <span>•</span>
          <span>MODE: {egg.toUpperCase()}</span>
          <span>•</span>
          <span>NEURAL_NETWORK_ACTIVE</span>
        </div>
      </div>
    </>
  )
}

export default function MatrixRainPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono text-sm animate-pulse">LOADING MATRIX...</div>
      </div>
    }>
      <MatrixContent />
    </Suspense>
  )
}

"use client"

import { Shield, CheckCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/app/lib/utils"

interface SecurityScore {
  score: number
  grade: string
  status: 'loading' | 'success' | 'error'
  lastScanned?: Date
}

export function SecurityScorecard() {
  const [securityData, setSecurityData] = useState<SecurityScore>({
    score: 0,
    grade: 'Loading...',
    status: 'loading'
  })
  const [isMounted, setIsMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    let cancelled = false
    
    async function fetchSecurityScore() {
      try {
        const res = await fetch('/api/security-posture', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch security score')
        
        const data = await res.json()
        
        if (!cancelled) {
          setSecurityData({
            score: data.score,
            grade: data.grade,
            status: 'success',
            lastScanned: new Date(data.timestamp)
          })
        }
      } catch (error) {
        console.error('Security score fetch error:', error)
        if (!cancelled) {
          setSecurityData({
            score: 0,
            grade: 'Error',
            status: 'error'
          })
        }
      }
    }
    
    fetchSecurityScore()
    
    return () => { cancelled = true }
  }, [isMounted])

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-[#00ff88]' // Green
    if (score >= 90) return 'text-[#00ffff]' // Cyan  
    if (score >= 80) return 'text-[#ffaa00]' // Warning
    return 'text-[#ff4444]' // Danger
  }

  const getGradientColor = (score: number) => {
    if (score >= 95) return 'from-[#00ff88]/20 to-[#00ff88]/5'
    if (score >= 90) return 'from-[#00ffff]/20 to-[#00ffff]/5'
    if (score >= 80) return 'from-[#ffaa00]/20 to-[#ffaa00]/5'
    return 'from-[#ff4444]/20 to-[#ff4444]/5'
  }

  return (
    <div className="inline-flex items-center justify-center">
      <div className={cn(
        "security-card p-6 bg-gradient-to-br",
        securityData.status === 'success' ? getGradientColor(securityData.score) : "from-[#333333]/20 to-[#333333]/5"
      )}>
        <div className="flex items-center justify-center gap-4">
          {securityData.status === 'loading' && (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#00ffff] border-t-transparent"></div>
              <span className="text-sm text-[#888888]">Scanning security posture...</span>
            </div>
          )}

          {securityData.status === 'success' && (
            <>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00ff88]" />
                <span className="text-sm font-medium text-[#888888]">Security Score</span>
              </div>
              
              <div className="text-center">
                <div className={cn("text-3xl font-bold", getScoreColor(securityData.score))}>
                  {securityData.grade}
                </div>
                <div className="text-sm text-[#888888]">
                  {securityData.score}/100
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                <span className="text-xs text-[#888888]">
                  Scanned {securityData.lastScanned?.toLocaleTimeString()}
                </span>
              </div>
            </>
          )}

          {securityData.status === 'error' && (
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-[#ff4444]" />
              <span className="text-sm text-[#888888]">Security scan failed</span>
            </div>
          )}
        </div>

        {securityData.status === 'success' && (
          <div className="mt-4 text-center">
            <p className="text-xs text-[#888888] mb-2">
              This site implements comprehensive security measures
            </p>
            <div className="flex justify-center gap-2">
              <span className="px-2 py-1 bg-[#00ff88]/10 text-[#00ff88] text-xs rounded">CSP</span>
              <span className="px-2 py-1 bg-[#00ffff]/10 text-[#00ffff] text-xs rounded">HSTS</span>
              <span className="px-2 py-1 bg-[#00ff88]/10 text-[#00ff88] text-xs rounded">XSS Protection</span>
              <span className="px-2 py-1 bg-[#00ffff]/10 text-[#00ffff] text-xs rounded">Rate Limiting</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

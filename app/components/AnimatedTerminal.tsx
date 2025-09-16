"use client"

import { useState, useEffect } from "react"

const commands = [
  "whoami",
  "ls -la /skills",
  "cat /experience/cybersecurity.txt",
  "grep -r 'vulnerabilities' /projects",
  "sudo nmap -sS portfolio.security",
  "echo 'Welcome to my secure portfolio'"
]

export function AnimatedTerminal() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return (
      <div className="font-mono text-sm">
        <span className="text-green-400">whoami</span>
        <span className="animate-pulse text-cyan-400">|</span>
      </div>
    )
  }

  useEffect(() => {
    if (!isMounted) return
    
    const command = commands[currentCommand]
    
    if (isTyping && currentText.length < command.length) {
      const timer = setTimeout(() => {
        setCurrentText(command.substring(0, currentText.length + 1))
      }, Math.random() * 100 + 50) // Variable typing speed
      
      return () => clearTimeout(timer)
    } else if (isTyping && currentText.length === command.length) {
      const timer = setTimeout(() => {
        setIsTyping(false)
      }, 1500)
      
      return () => clearTimeout(timer)
    } else if (!isTyping) {
      const timer = setTimeout(() => {
        setCurrentText("")
        setCurrentCommand((prev) => (prev + 1) % commands.length)
        setIsTyping(true)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [currentCommand, currentText, isTyping, isMounted])

  return (
    <div className="font-mono text-sm">
      <span className="text-green-400">{currentText}</span>
      <span className="animate-pulse text-cyan-400">|</span>
    </div>
  )
}

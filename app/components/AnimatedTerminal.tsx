"use client";

import { useState, useEffect } from "react";

const commands = [
  "whoami --role # systems-architect · founder @ apex",
  "ls ./systems # apex-platform second-brain cyber-core ice",
  "cat ./philosophy.md # engineering beyond the prototype",
  "curl -sI https://www.sentineldev.me | head -n 5",
];

export function AnimatedTerminal() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined" && window.matchMedia) {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;

    const command = commands[currentCommand];

    if (isTyping && currentText.length < command.length) {
      const timer = setTimeout(() => {
        setCurrentText(command.substring(0, currentText.length + 1));
      }, 45);
      return () => clearTimeout(timer);
    } else if (isTyping && currentText.length === command.length) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2200);
      return () => clearTimeout(timer);
    } else if (!isTyping) {
      const timer = setTimeout(() => {
        setCurrentText("");
        setCurrentCommand((prev) => (prev + 1) % commands.length);
        setIsTyping(true);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [currentCommand, currentText, isTyping, isMounted, prefersReducedMotion]);

  if (!isMounted || prefersReducedMotion) {
    return (
      <div className="font-mono text-xs sm:text-sm text-[#EFF2F2] truncate">
        <span>{commands[0]}</span>
      </div>
    );
  }

  return (
    <div className="font-mono text-xs sm:text-sm text-[#EFF2F2] truncate">
      <span>{currentText}</span>
      <span className="animate-pulse text-[#2F8CFF]">_</span>
    </div>
  );
}

"use client";

import { Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/app/lib/utils";

interface SecurityScore {
  score: number;
  grade: string;
  status: "loading" | "success" | "error";
  lastScanned?: Date;
}

export function SecurityScorecard() {
  const [securityData, setSecurityData] = useState<SecurityScore>({
    score: 0,
    grade: "Checking",
    status: "loading",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let cancelled = false;

    async function fetchSecurityScore() {
      try {
        const res = await fetch("/api/security-posture", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch security score");

        const data = await res.json();

        if (!cancelled) {
          setSecurityData({
            score: data.score,
            grade: data.grade,
            status: "success",
            lastScanned: new Date(data.timestamp),
          });
        }
      } catch {
        if (!cancelled) {
          setSecurityData({
            score: 0,
            grade: "Unavailable",
            status: "error",
          });
        }
      }
    }

    fetchSecurityScore();

    return () => {
      cancelled = true;
    };
  }, [isMounted]);

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-[#8FD3FF]";
    if (score >= 90) return "text-[#2F8CFF]";
    if (score >= 80) return "text-[#ffaa00]";
    return "text-[#ff4444]";
  };

  return (
    <div className="arch-panel px-5 py-4 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {securityData.status === "loading" && (
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#2F8CFF] border-t-transparent" />
            <span className="font-mono text-xs text-[#94A3B8]">
              Checking live posture endpoint...
            </span>
          </div>
        )}

        {securityData.status === "success" && (
          <>
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#2F8CFF]" />
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#CBD5E1]">
                  Live Site Controls
                </p>
                <p className="text-xs text-[#94A3B8]">
                  Checked via <span className="font-mono">/api/security-posture</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-wrap gap-1.5">
                {["CSP", "HSTS", "Zod", "Rate Limit"].map((badge) => (
                  <span
                    key={badge}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#0B1119] border border-[#1E2B3A] text-[#CBD5E1]"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="text-right pl-3 border-l border-[#1E2B3A]">
                <div className={cn("font-mono text-xl font-semibold leading-none", getScoreColor(securityData.score))}>
                  {securityData.grade}
                </div>
                <div className="font-mono text-[11px] text-[#94A3B8] mt-1 inline-flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-[#2F8CFF]" />
                  {securityData.score}/100
                </div>
              </div>
            </div>
          </>
        )}

        {securityData.status === "error" && (
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#ffaa00]" />
            <span className="font-mono text-xs text-[#94A3B8]">
              Live posture check unavailable
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle } from "lucide-react";
import type { Service } from "@/app/services/servicesData";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="security-card p-6 sm:p-7 h-full flex flex-col justify-between">
      <div>
        <div className="mb-5">
          <p className="font-mono text-xs text-[#8FD3FF] mb-2">{service.label}</p>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#EFF2F2]">
            {service.title}
          </h3>
          <p className="text-sm text-[#94A3B8] mb-3">{service.subtitle}</p>
          <p className="font-mono text-[11px] inline-block px-2.5 py-1 rounded bg-[#0B1119] border border-[#1E2B3A] text-[#CBD5E1]">
            {service.deliveryChannel}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[#8FD3FF] mb-3">
            Scope &amp; Focus
          </h4>
          <ul className="space-y-2">
            {service.packageFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2.5 text-[#CBD5E1]">
                <CheckCircle className="w-4 h-4 text-[#2F8CFF] mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#0B1119] border border-[#1E2B3A] rounded-md p-4">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[#8FD3FF] mb-1.5">
            Expected Outcome
          </h4>
          <p className="text-sm text-[#94A3B8] leading-relaxed">{service.outcome}</p>
        </div>

        {service.external ? (
          <a
            href={service.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-[#2F8CFF]/60 bg-[#101824] px-5 py-2.5 text-sm font-semibold text-[#EFF2F2] hover:bg-[#1E2B3A] transition-colors"
          >
            {service.ctaLabel}
            <ArrowUpRight className="w-4 h-4 text-[#8FD3FF]" />
          </a>
        ) : (
          <Link
            href={service.ctaLink}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#EFF2F2] px-5 py-2.5 text-sm font-semibold text-[#0B1119] hover:bg-white transition-colors"
          >
            {service.ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import type { Service } from "@/app/services/servicesData";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="security-card p-8 h-full flex flex-col hover:border-[#00ffff]/50 transition-all duration-300 group">
      {/* Header */}
      <div className="mb-6">
        <div className="text-5xl mb-4">{service.emoji}</div>
        <h3 className="text-2xl font-bold mb-2 text-[#00ffff] group-hover:text-[#00ff88] transition-colors">
          {service.title}
        </h3>
        <p className="text-base text-[#cccccc] mb-3">
          {service.subtitle}
        </p>
        <p className="text-lg font-bold text-[#00ffff]">
          {service.priceRange}
        </p>
      </div>

      {/* Package Features */}
      <div className="mb-6 flex-grow">
        <h4 className="text-sm font-semibold text-[#00ff88] mb-3 uppercase tracking-wide">
          Package Includes:
        </h4>
        <ul className="space-y-2">
          {service.packageFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-[#cccccc]">
              <CheckCircle className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome */}
      <div className="mb-6 bg-[#00ffff]/5 border border-[#00ffff]/20 rounded-md p-4">
        <h4 className="text-sm font-semibold text-[#00ffff] mb-2 flex items-center gap-2">
          <span className="text-[#00ffff]">→</span> What You Get:
        </h4>
        <p className="text-sm text-[#cccccc] leading-relaxed">
          {service.outcome}
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href={service.ctaLink}
        className="terminal-border rounded-md bg-[#00ffff] px-6 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-[#00ff88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ffff] transition-all duration-300"
      >
        Schedule Consultation
      </Link>
    </div>
  );
}

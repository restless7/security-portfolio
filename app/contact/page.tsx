"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Building,
  Building2,
  CheckCircle,
  Eye,
  FileText,
  Github,
  Instagram,
  Lock,
  Mail,
  MessageSquare,
  Send,
  Shield,
  User,
} from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/app/lib/validations";
import { cn } from "@/app/lib/utils";
import { NextModuleCTA } from "@/app/components/NextModuleCTA";

const securityFeatures = [
  {
    icon: Shield,
    title: "Schema Validation",
    description:
      "All inputs are checked client- and server-side against Zod schemas before processing.",
  },
  {
    icon: Lock,
    title: "Input Sanitization",
    description:
      "Submitted text is trimmed and sanitized to neutralize script or markup payloads.",
  },
  {
    icon: Eye,
    title: "Rate Limiting",
    description:
      "Submission routes enforce rate limits to prevent automated abuse and spam.",
  },
  {
    icon: AlertTriangle,
    title: "Minimal Data Scope",
    description:
      "Information is collected strictly for responding to your inquiry and never sold or shared.",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const watchedMessage = watch("message", "");
  const watchedSubject = watch("subject", "");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(
          "Your message has been received. I will follow up as soon as possible."
        );
        reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(
        "Unable to send message right now. Please email sebastian.garciacasanova@gmail.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1119] text-[#EFF2F2] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EFF2F2] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#2F8CFF]" />
            Back to Home
          </Link>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
            Contact / Direct Channel
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#EFF2F2] mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
            Reach out directly for technical discussions around systems architecture,
            applied AI systems, security engineering, or infrastructure. Commercial client
            engagements and custom software delivery are coordinated through{" "}
            <a
              href="https://www.apexaisolutions.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EFF2F2] underline decoration-[#2F8CFF]/80 underline-offset-4 hover:text-white"
            >
              APEX AI Solutions
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="security-card p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1E2B3A]">
                <div className="flex items-center gap-2.5">
                  <Send className="w-5 h-5 text-[#2F8CFF]" />
                  <h2 className="text-xl font-semibold text-[#EFF2F2]">
                    Direct Message
                  </h2>
                </div>
                <span className="font-mono text-xs text-[#94A3B8]">
                  Zod · Rate-limited
                </span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#EFF2F2] mb-2"
                    >
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className={cn(
                          "w-full pl-10 pr-4 py-2.5 bg-[#0B1119] border rounded-md text-sm text-[#EFF2F2] placeholder:text-[#94A3B8]/50 focus:outline-none focus:ring-2 transition-colors",
                          errors.name
                            ? "border-red-400 focus:ring-red-400/40"
                            : "border-[#1E2B3A] focus:border-[#2F8CFF] focus:ring-[#2F8CFF]/30"
                        )}
                        placeholder="Your name"
                        maxLength={50}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#EFF2F2] mb-2"
                    >
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className={cn(
                          "w-full pl-10 pr-4 py-2.5 bg-[#0B1119] border rounded-md text-sm text-[#EFF2F2] placeholder:text-[#94A3B8]/50 focus:outline-none focus:ring-2 transition-colors",
                          errors.email
                            ? "border-red-400 focus:ring-red-400/40"
                            : "border-[#1E2B3A] focus:border-[#2F8CFF] focus:ring-[#2F8CFF]/30"
                        )}
                        placeholder="you@domain.com"
                        maxLength={100}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company Field */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-[#EFF2F2] mb-2"
                  >
                    Organization{" "}
                    <span className="text-xs font-normal text-[#94A3B8]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 bg-[#0B1119] border rounded-md text-sm text-[#EFF2F2] placeholder:text-[#94A3B8]/50 focus:outline-none focus:ring-2 transition-colors",
                        errors.company
                          ? "border-red-400 focus:ring-red-400/40"
                          : "border-[#1E2B3A] focus:border-[#2F8CFF] focus:ring-[#2F8CFF]/30"
                      )}
                      placeholder="Company or team"
                      maxLength={100}
                    />
                  </div>
                  {errors.company && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errors.company.message}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#EFF2F2] mb-2"
                  >
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                    <input
                      {...register("subject")}
                      type="text"
                      id="subject"
                      className={cn(
                        "w-full pl-10 pr-16 py-2.5 bg-[#0B1119] border rounded-md text-sm text-[#EFF2F2] placeholder:text-[#94A3B8]/50 focus:outline-none focus:ring-2 transition-colors",
                        errors.subject
                          ? "border-red-400 focus:ring-red-400/40"
                          : "border-[#1E2B3A] focus:border-[#2F8CFF] focus:ring-[#2F8CFF]/30"
                      )}
                      placeholder="Architecture inquiry, security review, or collaboration"
                      maxLength={200}
                    />
                    <span className="absolute right-3 top-3 font-mono text-[11px] text-[#94A3B8]">
                      {watchedSubject?.length || 0}/200
                    </span>
                  </div>
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#EFF2F2] mb-2"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={6}
                      className={cn(
                        "w-full pl-10 pr-16 py-2.5 bg-[#0B1119] border rounded-md text-sm text-[#EFF2F2] placeholder:text-[#94A3B8]/50 focus:outline-none focus:ring-2 transition-colors resize-y",
                        errors.message
                          ? "border-red-400 focus:ring-red-400/40"
                          : "border-[#1E2B3A] focus:border-[#2F8CFF] focus:ring-[#2F8CFF]/30"
                      )}
                      placeholder="Share your system context, architectural goals, or collaboration details..."
                      maxLength={2000}
                    />
                    <span className="absolute right-3 bottom-3 font-mono text-[11px] text-[#94A3B8]">
                      {watchedMessage?.length || 0}/2000
                    </span>
                  </div>
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-[#2F8CFF]/10 border border-[#2F8CFF]/30 rounded-md flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#8FD3FF] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#EFF2F2]">
                        Message sent
                      </p>
                      <p className="text-xs text-[#CBD5E1] mt-0.5">{submitMessage}</p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-md flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#EFF2F2]">
                        Submission error
                      </p>
                      <p className="text-xs text-[#CBD5E1] mt-0.5">{submitMessage}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={cn(
                      "inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-colors",
                      isValid && !isSubmitting
                        ? "bg-[#EFF2F2] text-[#0B1119] hover:bg-white"
                        : "bg-[#1E2B3A] text-[#94A3B8] cursor-not-allowed"
                    )}
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                  <span className="font-mono text-xs text-[#94A3B8]">
                    Schema status:{" "}
                    {isValid ? (
                      <span className="text-[#8FD3FF]">ready</span>
                    ) : (
                      <span className="text-[#94A3B8]">incomplete</span>
                    )}
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="arch-panel p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[#EFF2F2]">Direct Channels</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#8FD3FF]">
                    Email
                  </p>
                  <a
                    href="mailto:sebastian.garciacasanova@gmail.com"
                    className="font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] break-all"
                  >
                    sebastian.garciacasanova@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#8FD3FF]">
                    Location
                  </p>
                  <p className="text-xs text-[#94A3B8]">Colombia (America/Bogota, UTC-5)</p>
                </div>
                <div className="pt-2 border-t border-[#1E2B3A] flex flex-col gap-2">
                  <a
                    href="https://instagram.com/sebgarcia.systems"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Instagram className="w-3.5 h-3.5 text-[#2F8CFF]" />
                      @sebgarcia.systems
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                  </a>
                  <a
                    href="https://github.com/restless7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Github className="w-3.5 h-3.5 text-[#2F8CFF]" />
                      github.com/restless7
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="arch-panel p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#2F8CFF]" />
                <h2 className="text-base font-semibold text-[#EFF2F2]">
                  APEX AI Solutions
                </h2>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                We engineer the systems modern businesses depend on. Secure by design.
                Resilient by architecture. Built for the real world.
              </p>
              <a
                href="https://www.apexaisolutions.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF]"
              >
                apexaisolutions.dev
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2F8CFF]" />
              </a>
            </div>

            <div className="arch-panel p-6 space-y-4">
              <h2 className="text-base font-semibold text-[#EFF2F2]">
                Endpoint Safeguards
              </h2>
              <div className="space-y-3">
                {securityFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start gap-3">
                      <div className="p-1.5 rounded bg-[#0B1119] border border-[#1E2B3A] shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#2F8CFF]" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-[#EFF2F2]">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        <NextModuleCTA
          href="/projects"
          title="Selected Engineering Work"
          description="Explore architectural case studies and verified system implementations."
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Tag, User } from "lucide-react";
import { blogPosts, type BlogPost } from "./blogData";
import { cn } from "@/app/lib/utils";
import { NextModuleCTA } from "@/app/components/NextModuleCTA";

const categories: Array<"All" | BlogPost["category"]> = [
  "All",
  "Architecture Notes",
  "Applied AI",
  "Security Engineering",
  "Application Security",
  "Infrastructure",
  "Engineering Decisions",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0B1119] text-[#EFF2F2] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EFF2F2] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8FD3FF]" />
            Back to Home
          </Link>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
            Writing / Technical Reflections
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#EFF2F2] mb-4">
            Engineering Notes
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
            Technical notes on software architecture, applied AI governance, security
            engineering, and system tradeoffs. Written from practical implementation
            rather than generic industry slogans.
          </p>
        </div>

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter notes by topic"
          className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-[#1E2B3A]"
        >
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 rounded-md font-mono text-xs transition-colors border",
                  active
                    ? "bg-[#EFF2F2] text-[#0B1119] border-[#EFF2F2] font-semibold"
                    : "bg-[#101824] text-[#94A3B8] border-[#1E2B3A] hover:border-[#2F8CFF]/70 hover:text-[#EFF2F2]"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="arch-panel p-10 text-center mb-16">
            <BookOpen className="w-6 h-6 text-[#8FD3FF] mx-auto mb-3" />
            <p className="text-sm text-[#94A3B8]">
              No notes published under <span className="text-[#EFF2F2]">{selectedCategory}</span>{" "}
              yet. Select another category or check back as new architecture notes are
              added.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="security-card p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#0B1119] border border-[#1E2B3A] text-[#8FD3FF]">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-[#94A3B8]">
                      {post.date}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-semibold text-[#EFF2F2] mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#94A3B8] mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#8FD3FF]" />
                      {post.author}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#8FD3FF]" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-[#0B1119] border border-[#1E2B3A] text-[#94A3B8]"
                      >
                        <Tag className="w-3 h-3 text-[#8FD3FF]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
                  >
                    Read engineering note
                    <ArrowRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <NextModuleCTA
          href="/contact"
          title="Contact & Collaboration"
          description="Discuss systems architecture, security engineering, or technical collaboration directly."
        />
      </div>
    </div>
  );
}

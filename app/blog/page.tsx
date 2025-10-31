"use client"

import Link from "next/link";
import { BookOpen, ArrowRight, Clock, User, Tag } from "lucide-react";
import { blogPosts } from "./blogData";
import { openMatrix } from "@/app/lib/openMatrix";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-12 h-12 text-[#00ffff] cyber-glow" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              <span className="text-[#00ffff]">Security Insights</span>
              <br />
              <span className="text-[#00ff88]">& Best Practices</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[#888888]">
              Practical guides, real-world case studies, and battle-tested strategies for 
              securing modern applications. Learn from years of hands-on security experience.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {blogPosts.length === 0 ? (
            <div className="security-card p-12 text-center">
              <p className="text-[#888888] text-lg">
                No posts available yet. Check back soon for security insights and best practices!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="security-card p-8 flex flex-col hover:border-[#00ffff]/50 transition-all duration-300 group"
                >
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/30">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00ffff] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#888888] mb-6 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#666666] mb-6">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-[#00ff88] bg-[#00ff88]/5 rounded border border-[#00ff88]/20"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#00ffff] hover:text-[#00ff88] font-semibold transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="px-6 py-20 lg:px-8 bg-[#111111]/50 relative">
        {/* Matrix Easter Egg - subtle corner */}
        <span 
          onClick={() => openMatrix("blog")}
          className="absolute top-8 right-8 text-[#00ff88]/30 hover:text-[#00ff88] transition-all duration-500 text-xl cursor-pointer"
          title="Follow the white rabbit"
          aria-label="Hidden path"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openMatrix("blog") }}
        >
          ✿✪✿
        </span>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            <span className="text-[#00ffff]">Stay Updated</span>{" "}
            <span className="text-[#00ff88]">on Security Trends</span>
          </h2>
          <p className="text-lg text-[#888888] mb-8 max-w-2xl mx-auto">
            Get notified when new security insights and best practices are published. 
            Join security professionals who stay ahead of emerging threats.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="terminal-border rounded-md bg-[#00ffff] px-8 py-4 text-base font-semibold text-black shadow-sm hover:bg-[#00ff88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ffff] transition-all duration-300 inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="security-card px-8 py-4 text-base font-semibold leading-6 text-[#00ffff] hover:text-[#00ff88] transition-colors duration-300 inline-flex items-center gap-2"
            >
              View Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

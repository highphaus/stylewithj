'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';

const journalEntries = [
  {
    id: 1,
    title: "How First Impressions Shape Opportunities",
    category: "Personal Branding",
    date: "Mar 12, 2025",
    excerpt: "Your appearance communicates before you even speak. The way we present ourselves influences the opportunities we're offered, the relationships we build, and the confidence we project.",
    image: "/images/img04.jpeg",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Building Executive Presence Through Style",
    category: "Style & Presence",
    date: "Mar 05, 2025",
    excerpt: "Executive presence isn't just about what you wear—it's about how you command a room. We explore the relationship between strategic dressing and leadership perception.",
    image: "/images/img05.jpeg",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "The Psychology of Personal Appearance",
    category: "Confidence",
    date: "Feb 28, 2025",
    excerpt: "Research consistently shows that how we dress directly impacts how we feel and how we perform. Understanding this psychology is the first step to intentional dressing.",
    image: "/images/img06.jpeg",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Wardrobe Essentials Every Professional Should Own",
    category: "Wardrobe Strategy",
    date: "Feb 15, 2025",
    excerpt: "A capsule wardrobe isn't about minimalism—it's about precision. These are the foundational pieces that form the backbone of a powerful professional wardrobe.",
    image: "/images/img07.jpeg",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "How Personal Branding Starts With You",
    category: "Personal Branding",
    date: "Feb 02, 2025",
    excerpt: "Before you build a brand online, you build one in person. Every interaction, every outfit, every choice of word shapes how the world perceives you.",
    image: "/images/img08.jpeg",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Color and the Language It Speaks for You",
    category: "Style & Presence",
    date: "Jan 20, 2025",
    excerpt: "Color is the most immediate and powerful tool in your wardrobe. Each shade carries psychological weight that can influence mood, perception, and authority.",
    image: "/images/img09.jpeg",
    readTime: "6 min read",
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />

      {/* ── HERO BANNER ── */}
      <div className="relative w-full h-[55vh] bg-[#111] overflow-hidden flex items-end">
        <Image
          src="/images/img03.jpeg"
          alt="Journal"
          fill
          priority
          className="object-cover object-center opacity-60 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 pb-16">
          <span className="text-[10px] tracking-[0.5em] uppercase font-light text-white/50 block mb-4">
            Reflections & Perspectives
          </span>
          <h1 className="font-sans text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1]">
            Journal
          </h1>
        </div>
      </div>

      {/* ── ARTICLE GRID ── */}
      <main className="max-w-7xl mx-auto px-8 lg:px-16 py-24">

        {/* Featured Article (First Entry) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Link href="#" className="group grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#E5E2DC] hover:border-[#1A1A1A] transition-colors duration-500">
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden bg-[#EFECE6]">
              <Image
                src={journalEntries[0].image}
                alt={journalEntries[0].title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-10 lg:p-16 bg-[#FAF9F6]">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[9px] tracking-[0.4em] uppercase font-light text-[#1A1A1A]/50">
                  {journalEntries[0].category}
                </span>
                <div className="w-6 h-[1px] bg-[#1A1A1A]/20" />
                <span className="text-[9px] tracking-[0.3em] uppercase font-light text-[#1A1A1A]/40">
                  {journalEntries[0].readTime}
                </span>
              </div>
              <h2 className="font-sans text-3xl md:text-4xl font-light leading-[1.2] tracking-wide mb-6 group-hover:italic transition-all duration-500">
                {journalEntries[0].title}
              </h2>
              <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed mb-8 max-w-md">
                {journalEntries[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#1A1A1A]/40">
                  {journalEntries[0].date}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-light border-b border-[#1A1A1A]/30 pb-0.5 group-hover:border-[#1A1A1A] transition-colors duration-300">
                  Read Article →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E2DC]">
          {journalEntries.slice(1).map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#FAF9F6]"
            >
              <Link href="#" className="group flex flex-col h-full">
                <div className="relative h-[280px] overflow-hidden bg-[#EFECE6]">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[9px] tracking-[0.4em] uppercase font-light text-[#1A1A1A]/50">
                      {entry.category}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl font-light leading-[1.3] tracking-wide mb-4 group-hover:italic transition-all duration-500 flex-1">
                    {entry.title}
                  </h3>
                  <p className="text-xs font-light text-[#1A1A1A]/60 leading-relaxed mb-6 line-clamp-3">
                    {entry.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]/10">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-light text-[#1A1A1A]/40">
                      {entry.date}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-light text-[#1A1A1A]/50 group-hover:text-[#1A1A1A] transition-colors duration-300">
                      {entry.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <AtelierFooter />
    </div>
  );
}

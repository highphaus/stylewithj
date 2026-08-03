'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Look, seedLooks } from '@/lib/looks-data';

const STORAGE_KEY = 'swj_looks';

function getLooks(): Look[] {
  if (typeof window === 'undefined') return seedLooks;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedLooks;
  } catch {
    return seedLooks;
  }
}

export default function LookPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [looks, setLooks] = useState<Look[]>([]);
  const [look, setLook] = useState<Look | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const all = getLooks();
    setLooks(all);
    const idx = all.findIndex(l => l.id === id);
    if (idx === -1) {
      router.replace('/lookbook');
      return;
    }
    setLook(all[idx]);
    setCurrentIndex(idx);
  }, [id, router]);

  const prev = looks[currentIndex - 1] ?? null;
  const next = looks[currentIndex + 1] ?? null;

  if (!look) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.3em] text-black/40 uppercase">Loading…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.main
          key={look.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-16"
        >
          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="flex flex-col lg:flex-row min-h-[calc(100dvh-64px)]">

            {/* LEFT: FULL-BLEED IMAGE */}
            <div className="w-full lg:w-[58%] h-[100dvh] lg:h-[calc(100dvh-64px)] relative bg-[#0D0D0D] flex-shrink-0 sticky top-16">
              <Image
                src={look.image}
                alt={look.title}
                fill
                className="object-cover object-top"
                priority
                unoptimized
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              {/* Look number badge */}
              <div className="absolute top-6 left-6 bg-black/75 backdrop-blur-md text-white px-3 py-1 text-[8px] tracking-[0.3em] font-mono uppercase border border-white/10 rounded-xs">
                LOOK /{look.num}
              </div>
            </div>

            {/* RIGHT: STORY PANEL */}
            <div className="w-full lg:w-[42%] flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-10 lg:py-16 overflow-y-auto bg-[#FAF9F6]">

              {/* TOP: Category + Title */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-5 border-b border-black/10">
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/45 font-bold">
                    /{look.num} OF {String(looks.length).padStart(2, '0')}
                  </span>
                  <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[8px] tracking-[0.2em] font-mono uppercase font-semibold rounded-xs">
                    {look.category}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
                  {look.title}
                </h1>

                {/* Story */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/40 font-bold">
                    THE STORY
                  </span>
                  <p className="font-sans text-sm text-black/80 font-light leading-relaxed border-l-2 border-black/20 pl-4 py-1">
                    {look.story}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex flex-col gap-1 bg-[#EFECE6] p-4 rounded-xs border border-black/5">
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">CONCEPT</span>
                    <span className="font-sans text-xs text-black/90 font-medium">{look.concept}</span>
                  </div>
                  <div className="flex flex-col gap-1 bg-[#EFECE6] p-4 rounded-xs border border-black/5">
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">FABRIC & DRAPE</span>
                    <span className="font-sans text-xs text-black/90 font-medium">{look.fabric}</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 flex flex-col gap-1 bg-[#EFECE6] p-4 rounded-xs border border-black/5">
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">OCCASION</span>
                    <span className="font-sans text-xs text-black/90 font-medium">{look.occasion}</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM: CTA + Navigation */}
              <div className="flex flex-col gap-5 pt-10 mt-10 border-t border-black/10">
                {/* CTA */}
                <Link
                  href="/connect"
                  className="group flex items-center justify-between w-full px-6 py-4 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-all rounded-xs shadow-md"
                >
                  <span>Inquire About This Look</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform">→</span>
                </Link>

                {/* Prev / Next navigation */}
                <div className="flex gap-3">
                  {prev ? (
                    <Link
                      href={`/lookbook/${prev.id}`}
                      className="group flex-1 flex items-center gap-3 px-4 py-3 border border-black/15 hover:border-black/40 rounded-xs transition-all text-left"
                    >
                      <span className="text-black/40 group-hover:text-black transition-colors text-sm">←</span>
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-black/40 uppercase">Previous</span>
                        <span className="font-sans text-xs text-black/80 font-medium line-clamp-1">{prev.title}</span>
                      </div>
                    </Link>
                  ) : <div className="flex-1" />}

                  {next ? (
                    <Link
                      href={`/lookbook/${next.id}`}
                      className="group flex-1 flex items-center justify-end gap-3 px-4 py-3 border border-black/15 hover:border-black/40 rounded-xs transition-all text-right"
                    >
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-black/40 uppercase">Next</span>
                        <span className="font-sans text-xs text-black/80 font-medium line-clamp-1">{next.title}</span>
                      </div>
                      <span className="text-black/40 group-hover:text-black transition-colors text-sm">→</span>
                    </Link>
                  ) : <div className="flex-1" />}
                </div>

                {/* Back to lookbook */}
                <Link
                  href="/lookbook"
                  className="text-center font-mono text-[9px] tracking-[0.25em] uppercase text-black/40 hover:text-black transition-colors"
                >
                  ← Back to Lookbook
                </Link>
              </div>
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

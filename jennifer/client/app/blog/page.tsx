'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';
import { BLOG_POSTS } from '@/lib/blog-data';

const categories = [
  { label: 'ALL GUIDES', value: 'all' },
  { label: 'WORKWEAR & TECH LEADERSHIP', value: 'Workwear & Tech Leadership' },
  { label: 'BANGALORE CLIMATE & SEASONAL', value: 'Bangalore Climate & Seasonal' },
  { label: 'LOCAL SHOPPING & BOUTIQUES', value: 'Local Shopping & Boutiques' },
  { label: 'WEDDINGS & OCCASION WEAR', value: 'Weddings & Occasion Wear' },
];

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />

      {/* ── 1. TYPOGRAPHIC PURE HEADER ── */}
      <header className="pt-32 sm:pt-40 pb-8 sm:pb-12 px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-2 sm:mb-3 font-semibold">
          ✦ STYLING JOURNAL
        </span>
        <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-none text-black">
          Style, decoded.
        </h1>
        <p className="font-serif text-sm sm:text-xl lg:text-2xl text-black/60 font-light italic leading-relaxed mt-3 sm:mt-5 max-w-3xl">
          Curated styling advice, Bangalore weather guides, executive workwear, local shopping itineraries, and trousseau edits.
        </p>
      </header>

      <main className="px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto py-8 sm:py-12">
        
        {/* ── 2. CATEGORY FILTERS & SEARCH BAR (AT THE VERY TOP) ── */}
        <section className="mb-10 pb-6 border-b border-black/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            {/* Responsive Category Filter Pills: Smooth Horizontal Track on Mobile, Wrap on Desktop */}
            <div className="w-full md:w-auto overflow-hidden">
              <div className="flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-2.5 md:px-3.5 md:py-2 text-[9px] sm:text-[9.5px] tracking-[0.12em] uppercase font-mono transition-all rounded-xs border cursor-pointer shrink-0 whitespace-nowrap active:scale-95 touch-manipulation ${
                        isActive
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold shadow-xs'
                          : 'bg-white text-black/80 border-black/15 hover:border-black/40 hover:text-black font-medium'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search guide or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-black/15 px-3.5 py-2.5 md:py-2 text-xs font-sans text-black placeholder:text-black/40 focus:outline-none focus:border-black rounded-xs shadow-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-black/50">
            <span>Showing {filteredPosts.length} Styling Guides</span>
            <span className="text-[10px] uppercase font-bold text-black/40">Style with J</span>
          </div>
        </section>

        {/* ── 3. FEATURED ARTICLE BANNER ── */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="mb-14 sm:mb-16">
            <div className="bg-[#EFECE6] border border-black/10 rounded-xs overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[440px] bg-[#0D0D0D]">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[8px] tracking-[0.25em] uppercase font-semibold px-3 py-1 backdrop-blur-sm">
                  FEATURED STYLE GUIDE
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[9px] text-black/50 font-bold uppercase">{featuredPost.category}</span>
                    <span className="text-black/30">•</span>
                    <span className="font-mono text-[9px] text-black/40">{featuredPost.readTime}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-black leading-snug mb-3">
                    {featuredPost.title}
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-4">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-all rounded-xs shadow-xs"
                  >
                    Read Full Guide →
                  </Link>
                  <span className="font-mono text-[8.5px] text-black/40">Bangalore, IN</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 4. ARTICLES GRID ── */}
        <section className="mb-20">
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center bg-[#EFECE6] border border-black/10 rounded-xs">
              <p className="font-serif text-lg text-black/60 italic">No articles found matching your criteria.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-4 font-mono text-[9px] tracking-[0.2em] uppercase text-black font-semibold border-b border-black pb-0.5 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col bg-white border border-black/10 hover:border-black/30 transition-all duration-300 rounded-xs overflow-hidden shadow-xs hover:shadow-md"
                >
                  <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] bg-[#0D0D0D] overflow-hidden block">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 bg-black/80 text-white font-mono text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 backdrop-blur-sm">
                      {post.category}
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[8.5px] text-black/40">{post.readTime}</span>
                        <span className="text-black/20">•</span>
                        <span className="font-mono text-[8.5px] text-black/40">{post.publishDate}</span>
                      </div>

                      <h3 className="font-serif text-xl text-black font-light leading-snug group-hover:text-black/70 transition-colors mb-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="font-sans text-xs text-black/65 font-light leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-black font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                      >
                        <span>Read Article</span>
                        <span>→</span>
                      </Link>
                      <span className="font-mono text-[8px] text-black/40 uppercase font-semibold">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>

      <AtelierFooter />
    </div>
  );
}

'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import LookbookGrid from '@/components/sections/LookbookGrid';
import AtelierFooter from '@/components/sections/AtelierFooter';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased">
      <Navigation />

      {/* ── 1. ARCHIVAL EDITS / CURATED COLLECTIONS ── */}
      <main className="pt-24 sm:pt-28">
        <LookbookGrid />
      </main>

      <AtelierFooter />
    </div>
  );
}

'use client';
import React, { Suspense } from 'react';
import ServicesContent from '@/components/ServicesContent';

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-[10px] tracking-[0.4em] uppercase font-light text-[#1A1A1A]/40">Loading...</div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}

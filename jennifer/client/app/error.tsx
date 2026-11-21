'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error captured by boundary:', error);
  }, [error]);

  const handleResetDataAndReload = () => {
    try {
      // Clear potentially oversized or malformed about/hero cache
      localStorage.removeItem('swj_about');
      localStorage.removeItem('swj_hero');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col items-center justify-center px-6 py-16 selection:bg-black selection:text-white">
      <div className="max-w-md w-full bg-white border border-black/10 p-8 sm:p-10 rounded-xs shadow-sm flex flex-col items-center text-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/45 mb-3 font-semibold">
          ✦ STYLE WITH J &middot; SYSTEM NOTICE
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] tracking-tight mb-3">
          Unable to Load Section
        </h2>

        <p className="font-sans text-xs sm:text-sm text-black/60 leading-relaxed font-light mb-8">
          The requested page encountered an unexpected asset issue. You can reload the page or reset the cached styling data to restore the default studio content.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={() => reset()}
            className="w-full sm:flex-1 py-3.5 px-6 bg-[#1A1A1A] hover:bg-black text-white text-[9.5px] uppercase font-mono tracking-[0.2em] font-medium transition-all rounded-xs shadow-xs cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={handleResetDataAndReload}
            className="w-full sm:flex-1 py-3.5 px-6 border border-black/20 hover:border-black text-[#1A1A1A] text-[9.5px] uppercase font-mono tracking-[0.18em] font-medium transition-colors rounded-xs cursor-pointer"
          >
            Reset Defaults
          </button>
        </div>

        <div className="pt-6 mt-6 border-t border-black/8 w-full flex justify-center">
          <Link
            href="/"
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors"
          >
            &larr; Return to Atelier Home
          </Link>
        </div>
      </div>
    </div>
  );
}

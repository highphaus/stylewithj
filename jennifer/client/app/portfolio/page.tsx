import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LookbookGrid from '@/components/sections/LookbookGrid';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-thalina-bg text-thalina-text">
      <Navigation />
      
      <main className="pt-28 pb-12">
        <LookbookGrid />
      </main>

      <Footer />
    </div>
  );
}

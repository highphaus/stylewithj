import React from 'react';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#5D4037] font-sans antialiased selection:bg-[#A1887F] selection:text-[#FFFFFF] scroll-smooth">
      <Navigation />
      
      <main>
        <div className="pt-32 pb-16 px-6 lg:px-12 text-center bg-[#FFFFFF]">
          <h1 className="font-serif text-5xl md:text-6xl text-[#5D4037] font-medium tracking-wide">
            Meet Jennifer
          </h1>
        </div>
        <AboutSection hideButton={true} />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}

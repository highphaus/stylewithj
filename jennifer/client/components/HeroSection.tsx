import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80" 
          alt="Jenny - Image Consultant" 
          className="w-full h-full object-cover object-top"
        />
      </div>
    </section>
  );
}

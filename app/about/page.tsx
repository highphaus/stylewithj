import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-thalina-bg text-thalina-text">
      <Navigation />
      
      <main className="pt-40 pb-24 px-6 lg:px-12 max-w-[1000px] mx-auto">
        <h1 className="font-sans text-5xl md:text-6xl font-light mb-20 text-center tracking-tight">About Me</h1>
        
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80" 
              alt="Jennifer" 
              className="w-full h-auto object-cover grayscale"
            />
          </div>
          
          <div className="w-full md:w-1/2 font-sans font-light text-lg leading-relaxed space-y-8">
            <p>
              With over a decade of experience in fashion editorial, personal styling, and executive image consulting, my mission has always been simple: to help people feel unequivocally confident in their own skin.
            </p>
            <p>
              I began my career in the styling closets of major fashion publications before realizing my true passion lay not in dressing models, but in transforming the wardrobes of real people. Whether it's an executive needing a closet refresh, or someone looking to reinvent their personal brand, I approach every client with empathy, creativity, and a sharp eye for detail.
            </p>
            <p>
              Your clothing is a powerful tool. Let me help you use it.
            </p>
            
            <div className="pt-12">
              <span className="block font-medium uppercase tracking-widest text-sm mb-6">Brands I've Worked With</span>
              <div className="flex flex-wrap gap-8 text-thalina-text/60">
                <span className="font-sans text-xl">Vogue</span>
                <span className="font-sans text-xl">GQ</span>
                <span className="font-sans text-xl">Chanel</span>
                <span className="font-sans text-xl">Dior</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import React from 'react';
import Link from 'next/link';

const transformations = [
  { 
    before: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop", 
    after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    title: "Corporate Professional Transformation",
    desc: "From inconsistent wardrobe choices to a polished professional image that reflects leadership and confidence."
  },
  { 
    before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop", 
    after: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    title: "Personal Reinvention",
    desc: "A complete style and grooming transformation designed to build confidence and self-expression."
  },
  { 
    before: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop", 
    after: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop",
    title: "Creator Personal Branding",
    desc: "Developing a visual identity that supports content creation and audience growth."
  }
];

export default function Transformations({ hideButton = false }: { hideButton?: boolean }) {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#5D4037] text-[#FFFFFF]">
      <div className="max-w-7xl mx-auto text-center">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#FFFFFF]/50 block mb-6">
          TRANSFORMATION SECTION
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
          Real People. Real Transformations.
        </h2>
        <p className="font-sans text-base text-[#FFFFFF]/80 leading-relaxed max-w-2xl mx-auto mb-16">
          Every transformation begins with understanding who you are today and where you want to be tomorrow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {transformations.map((item, i) => (
            <div key={i} className="flex flex-col text-left">
              <div className="flex gap-1 overflow-hidden mb-6">
                <div className="relative w-1/2 h-[400px]">
                  <img src={item.before} alt="Before" className="w-full h-full object-cover" />
                  <span className="absolute bottom-4 left-4 text-[9px] tracking-widest uppercase font-bold bg-[#5D4037]/80 px-2 py-1">BEFORE</span>
                </div>
                <div className="relative w-1/2 h-[400px]">
                  <img src={item.after} alt="After" className="w-full h-full object-cover" />
                  <span className="absolute bottom-4 right-4 text-[9px] tracking-widest uppercase font-bold bg-[#5D4037]/80 px-2 py-1">AFTER</span>
                </div>
              </div>
              <h3 className="font-serif text-xl mb-3 font-medium">{item.title}</h3>
              <p className="font-sans text-sm text-[#FFFFFF]/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {!hideButton && (
          <Link href="/transformations" className="border border-[#FFFFFF]/30 text-[#FFFFFF] px-8 py-4 text-[10px] font-bold tracking-widest uppercase hover:bg-[#FFFFFF] hover:text-[#5D4037] transition-colors inline-flex items-center gap-4">
            Explore More Transformations
            <span className="text-lg leading-none">&rarr;</span>
          </Link>
        )}
      </div>
    </section>
  );
}

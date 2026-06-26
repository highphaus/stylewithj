import React from 'react';
import Link from 'next/link';

const transformations = [
  { before: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop", after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
  { before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop", after: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
  { before: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop", after: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop" },
  { before: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop", after: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop" }
];

export default function Transformations({ hideButton = false }: { hideButton?: boolean }) {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#5D4037] text-[#FFFFFF]">
      <div className="max-w-7xl mx-auto text-center">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#FFFFFF]/50 block mb-16">
          REAL PEOPLE. REAL TRANSFORMATIONS.
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {transformations.map((item, i) => (
            <div key={i} className="flex gap-1 overflow-hidden">
              <div className="relative w-1/2 h-[400px]">
                <img src={item.before} alt="Before" className="w-full h-full object-cover" />
                <span className="absolute bottom-4 left-4 text-[9px] tracking-widest uppercase font-bold bg-[#5D4037]/50 px-2 py-1">BEFORE</span>
              </div>
              <div className="relative w-1/2 h-[400px]">
                <img src={item.after} alt="After" className="w-full h-full object-cover" />
                <span className="absolute bottom-4 right-4 text-[9px] tracking-widest uppercase font-bold bg-[#5D4037]/50 px-2 py-1">AFTER</span>
              </div>
            </div>
          ))}
        </div>

        {!hideButton && (
          <Link href="/transformations" className="border border-[#FFFFFF]/30 text-[#FFFFFF] px-8 py-4 text-[10px] font-bold tracking-widest uppercase hover:bg-[#FFFFFF] hover:text-[#5D4037] transition-colors inline-flex items-center gap-4">
            VIEW MORE TRANSFORMATIONS
            <span className="text-lg leading-none">&rarr;</span>
          </Link>
        )}
      </div>
    </section>
  );
}

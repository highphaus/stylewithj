// src/components/sections/SplitScroll.tsx
'use client';

import Image from 'next/image';

interface LookbookItem {
  id: string;
  src: string;
  alt: string;
}

const yslLooks: LookbookItem[] = [
  { id: '1', src: '/images/img15.jpeg', alt: 'Silhouette Editorial 01' },
  { id: '2', src: '/images/img16.jpeg', alt: 'Silhouette Editorial 02' },
  { id: '3', src: '/images/img30.jpeg', alt: 'Silhouette Editorial 03' },
  { id: '4', src: '/images/img31.jpeg', alt: 'Silhouette Editorial 04' }
];

export default function SplitScroll() {
  return (
    <section className="w-full bg-[#FAF9F6] border-t border-neutral-200">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        
        {/* LEFT CANVAS: Stationary / Sticky (Locks on Desktop, Stacks on Mobile) */}
        <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 bg-[#EAE9E4] flex flex-col justify-between p-8 md:p-16 border-b md:border-b-0 md:border-r border-neutral-200">
          <div>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-neutral-400 block mb-3">
              Winter Collection
            </span>
            <h3 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-[#1A1A1A]">
              The Horizon <br /> Silhouettes.
            </h3>
          </div>
          
          <div className="mt-12 md:mt-0">
            <p className="font-sans text-xs tracking-widest text-neutral-500 uppercase font-light max-w-xs leading-relaxed mb-6">
              A study in continuous motion and fixed structural form.
            </p>
            <span className="font-mono text-[10px] tracking-widest text-neutral-400">
              01 // Scroll to explore
            </span>
          </div>
        </div>

        {/* RIGHT CANVAS: The Continuous Vertical Scroll Feed */}
        <div className="w-full md:w-1/2 flex flex-col">
          {yslLooks.map((look) => (
            <div 
              key={look.id} 
              className="w-full aspect-[3/4] relative overflow-hidden border-b border-neutral-200 last:border-b-0 bg-neutral-100"
            >
              <Image
                src={look.src}
                alt={look.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-[1.01] ease-out"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
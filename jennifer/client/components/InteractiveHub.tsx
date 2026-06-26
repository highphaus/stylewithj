// jennifer/client/components/InteractiveHub.tsx
'use client';

import { useState } from 'react';

const SERVICES_DATA = {
  Weddings: [
    {
      title: 'Bride Styling',
      desc: 'A flawless roadmap curated specifically to elevate your luxury bridal lookbooks.',
      badge: 'Top Service',
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Couple Styling',
      desc: 'Coordinated, breathtaking visual alignments for couples across milestone ceremonies.',
      badge: 'Bespoke Integration',
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Trousseau Styling',
      desc: 'End-to-end luxury packing arrangements matched with dynamic occasion frameworks.',
      badge: 'Full Practicality',
      img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80',
    },
  ],
  Personal: [
    {
      title: 'Style Makeover',
      desc: 'Complete transformation designed around professional color analytics and physical contours.',
      badge: '1-on-1 Sessions',
      img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Capsule Wardrobe',
      desc: 'Build minimalist collection blocks with maximal variety from premium selections.',
      badge: 'Everyday Practicality',
      img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Personal Shopping',
      desc: 'Exclusive luxury showroom mapping with targeted designer discount permissions.',
      badge: 'Premium Access',
      img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80',
    },
  ],
};

type TabKeys = 'Weddings' | 'Personal';

export default function InteractiveHub() {
  const [activeTab, setActiveTab] = useState<TabKeys>('Weddings');

  return (
    <section id="services" className="bg-white py-24 border-t border-[#E0D9CE]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#6B5E56] uppercase block mb-2">
            Our Expertise
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#332922]">
            Personalized Style Experiences
          </h2>
        </div>

        {/* Tab Selection Row */}
        <div className="flex justify-center gap-10 mb-16 border-b border-[#E0D9CE]/40 pb-2">
          {(Object.keys(SERVICES_DATA) as TabKeys[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-[#332922]' : 'text-[#6B5E56] opacity-40'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#332922] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA[activeTab].map((item, index) => (
            <div
              key={index}
              className="bg-[#F7F5F0] rounded-2xl overflow-hidden group border border-[#E0D9CE]/40 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Image — plain <img> to avoid next/image overhead on external URLs */}
              <div className="h-64 w-full bg-[#E0D9CE] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-[#4A3B32] uppercase bg-[#E0D9CE]/40 px-2.5 py-1 rounded-md inline-block">
                  {item.badge}
                </span>
                <h3 className="text-xl font-serif text-[#332922] font-semibold flex items-center gap-2">
                  {item.title} <span className="text-base opacity-50">→</span>
                </h3>
                <p className="text-[#6B5E56] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
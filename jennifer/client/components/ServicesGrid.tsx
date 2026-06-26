import React from 'react';
import Link from 'next/link';

const services = [
  {
    title: "Personal Styling",
    desc: "Discover your style personality and dress with purpose.",
    image: "https://images.unsplash.com/photo-1485230895905-ef40ba366951?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Wardrobe Strategy",
    desc: "Curated wardrobe that fits your lifestyle, body and goals.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Grooming & Style",
    desc: "Elevate your grooming, hair, skincare and overall presentation.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Image & Presence",
    desc: "Enhance your body language, communication and confidence.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Personal Branding",
    desc: "Align your image with your goals and the message you want to put out.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-32 px-6 lg:px-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#5D4037]/50 block mb-6">
            HOW I CAN HELP YOU
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#5D4037] font-medium italic">
            A Holistic Approach to Your Image
          </h2>
        </div>

        <div className="flex flex-col gap-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
              >
                {/* Image */}
                <div className={`relative h-[500px] lg:h-[700px] w-full ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover shadow-2xl"
                  />
                  {/* Decorative Number */}
                  <div className={`absolute top-10 ${isEven ? '-right-10' : '-left-10'} hidden lg:block`}>
                    <span className="font-serif text-9xl italic text-[#5D4037]/5 tracking-tighter">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className={`flex flex-col justify-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <span className="font-serif text-2xl italic text-[#5D4037]/40 mb-6 block">
                    0{index + 1}
                  </span>
                  <h3 className="font-serif text-4xl md:text-5xl text-[#5D4037] mb-8 font-medium">
                    {service.title}
                  </h3>
                  <p className="font-sans text-base text-[#5D4037]/80 leading-relaxed mb-10 max-w-md">
                    {service.desc}
                  </p>
                  
                  <Link href="/connect" className="inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#5D4037] hover:opacity-60 transition-opacity pb-2 border-b border-[#5D4037]/30 self-start">
                    Explore Service
                    <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

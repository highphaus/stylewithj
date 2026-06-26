// jennifer/client/components/Masterclasses.tsx
export default function Masterclasses() {
  const MASTERCLASSES = [
    {
      title: "Capsule Wardrobe Masterclass",
      desc: "Learn the mathematical rules to building a minimalist, high-versatility wardrobe for everyday elevation.",
      modules: ["The 3-Color Rule", "Textile Longevity Metrics", "Seasonal Rotations"],
      price: "$149",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Indian Wear Proportion Matrix",
      desc: "Master the art of draping, lehenga styling, and color blocking specifically formulated for South Asian events.",
      modules: ["Drape Architectures", "Jewelry Proportioning", "Textile Weights"],
      price: "$199",
      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Corporate Executive Blueprint",
      desc: "Command authority in every room with tailoring frameworks designed explicitly for female founders and executives.",
      modules: ["Power Shoulder Alignment", "Monochromatic Confidence", "Zoom/Camera Colors"],
      price: "$249",
      img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-[#E0D9CE]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#6B5E56] uppercase block mb-3">Recorded Education</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#332922] font-light">Digital Masterclasses</h2>
            <p className="mt-4 text-sm text-[#6B5E56] leading-relaxed">
              Access the exact frameworks and mathematical formulas we use for our private celebrity clients, formatted into self-paced video modules.
            </p>
          </div>
          <button className="text-[10px] font-bold tracking-widest uppercase text-[#332922] border-b border-[#332922] pb-1 hover:text-[#6B5E56] hover:border-[#6B5E56] transition-colors whitespace-nowrap">
            View All Courses &rarr;
          </button>
        </div>

        <div className="space-y-8">
          {MASTERCLASSES.map((course, idx) => (
            <div key={idx} className="group bg-[#F7F5F0] border border-[#E0D9CE]/40 hover:border-[#332922]/30 rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 shadow-sm hover:shadow-md">
              {/* Image Section */}
              <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden bg-[#E0D9CE]">
                <img 
                  src={course.img} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-luxury"
                />
              </div>
              
              {/* Content Section */}
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif text-[#332922]">{course.title}</h3>
                    <span className="text-lg font-serif italic text-[#6B5E56]">{course.price}</span>
                  </div>
                  <p className="text-sm text-[#6B5E56] leading-relaxed max-w-xl mb-6">
                    {course.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {course.modules.map((mod, i) => (
                      <span key={i} className="text-[9px] font-mono tracking-widest uppercase bg-white border border-[#E0D9CE] text-[#6B5E56] px-3 py-1.5 rounded-sm">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-[#E0D9CE]/60">
                  <button className="text-xs font-bold tracking-widest uppercase text-[#332922] hover:text-[#6B5E56] transition-colors flex items-center gap-2">
                    Enroll Now <span className="transform group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

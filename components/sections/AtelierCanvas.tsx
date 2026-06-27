// src/components/sections/AtelierCanvas.tsx
'use client';

import { useRef, useState, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function AtelierCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Handle drawing interaction loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI screen sharp alignment configurations
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw the baseline archival dress form geometry silhouette vector
    ctx.strokeStyle = 'rgba(26, 26, 26, 0.08)';
    ctx.lineWidth = 1;
    
    // Minimal geometric silhouette shape coordinates
    ctx.beginPath();
    ctx.moveTo(rect.width / 2 - 30, 80);  // Neck Left
    ctx.lineTo(rect.width / 2 + 30, 80);  // Neck Right
    ctx.lineTo(rect.width / 2 + 65, 120); // Shoulder Right
    ctx.lineTo(rect.width / 2 + 35, 220); // Waist Right
    ctx.lineTo(rect.width / 2 + 50, 340); // Hip Right
    ctx.lineTo(rect.width / 2 - 50, 340); // Hip Left
    ctx.lineTo(rect.width / 2 - 35, 220); // Waist Left
    ctx.lineTo(rect.width / 2 - 65, 120); // Shoulder Left
    ctx.closePath();
    ctx.stroke();

    // Render client custom pattern drafting line arrays
    if (points.length > 0) {
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([1, 2]); // Fine tailoring stitch pattern line layout
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.setLineDash([]); // Reset structure
    }
  }, [points]);

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setPoints([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    setCoords({ x: Math.round(currentX), y: Math.round(currentY) });

    if (!isDrawing) return;
    setPoints((prev) => [...prev, { x: currentX, y: currentY }]);
  };

  const handleClear = () => {
    setPoints([]);
  };

  return (
    <section ref={containerRef} className="bg-[#FAF9F6] py-44 border-t border-neutral-200 text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* ─── LEFT COLUMN: CORE INTENT MANIFESTO (Cols 1-5) ─── */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-mono">
              Workspace Core // Interactive
            </span>
          </div>

          <h3 className="font-serif text-4xl md:text-5xl font-light tracking-wide leading-tight mb-8">
            The Interactive <br />
            <span className="italic font-normal text-neutral-500">Drafting Studio</span>
          </h3>

          <p className="font-sans text-xs tracking-widest text-neutral-400 uppercase font-light leading-relaxed mb-12">
            Click, drag, and sketch custom structural tailoring seams onto our archival geometric dress form matrix baseline.
          </p>

          <button 
            onClick={handleClear}
            className="font-mono text-[9px] tracking-[0.3em] text-black hover:text-neutral-400 uppercase border border-black px-6 py-3 self-start transition-colors bg-transparent duration-300"
          >
            Clear Draft Pattern [ × ]
          </button>
        </div>

        {/* ─── RIGHT COLUMN: THE WORKSPACE DRAWING MATRIX (Cols 7-12) ─── */}
        <div className="lg:col-span-6 lg:col-start-7 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[440px] aspect-[1/1] bg-neutral-50 border border-neutral-200/80 shadow-[0_40px_80px_rgba(0,0,0,0.01)] cursor-crosshair overflow-hidden flex flex-col justify-between p-6">
            
            {/* Fine Drafting Coordinate Grid Accent underlays */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="relative z-10 flex justify-between font-mono text-[8px] tracking-widest text-neutral-400">
              <span>CANVAS // POSTURE_V.01</span>
              <span>READOUT // X:{coords.x} Y:{coords.y}</span>
            </div>

            {/* THE HARDCORE INTERACTIVE VECTOR CANVAS LAYOUT ELEMENT */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              className="absolute inset-0 w-full h-full z-20"
            />

            <div className="relative z-10 flex justify-between font-mono text-[8px] tracking-wider text-neutral-400 border-t border-neutral-200/60 pt-4">
              <span>DRAPING MODE: MANUAL SEAM</span>
              <span className="animate-pulse text-neutral-500">● ATELIER_STITCH_ON</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
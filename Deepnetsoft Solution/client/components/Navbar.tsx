'use client';
import { useState } from 'react';

interface Props {
  onAddMenu: () => void;
  onAddItem: () => void;
}

export default function Navbar({ onAddMenu, onAddItem }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        background: '#12161a',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 100
      }}
    >
      <div
        style={{
          maxWidth: 1600,
          margin: '0 auto',
          padding: '0 60px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Logo Icon - Adjusted to fit with the absolute text */}
        <div style={{ position: 'absolute', left: 80, top: 22, width: 55, height: 55 }}>
          <svg viewBox="0 0 100 100">
            <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="var(--gold)" />
            <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="#12161a" />
            <text x="50" y="62" textAnchor="middle" fill="var(--gold)" style={{ fontSize: 40, fontWeight: 900, fontFamily: 'serif' }}>D</text>
          </svg>
        </div>

        {/* Branding Text - Exact Figma Specs */}
        <div style={{ 
          position: 'absolute',
          top: 39,
          left: 150,
          width: 250, // Slightly wider to accommodate Oswald at 35px
          height: 49,
          display: 'flex',
          alignItems: 'center',
          opacity: 1,
          transform: 'rotate(0deg)',
        }}>
          <span style={{ 
            fontSize: '35px', 
            fontWeight: 400, 
            letterSpacing: '0.03em', 
            fontFamily: "'Oswald', sans-serif",
            whiteSpace: 'nowrap',
            lineHeight: '100%',
            textTransform: 'uppercase'
          }}>
            <span style={{ color: '#0796ef' }}>DEEP</span><span style={{ color: '#fff' }}>NET</span><span style={{ color: '#fff' }}>SOFT</span>
          </span>
        </div>

        {/* Desktop Links - Right */}
        <div className="hidden md:flex" style={{ marginLeft: 'auto', gap: 40, alignItems: 'center' }}>
          <a href="#home" style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>HOME</a>
          <a href="#menu" style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.05em' }}>MENU</a>
          <a href="#reser" style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>MAKE A RESERVATION</a>
          <a href="#contact" style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>CONTACT US</a>
        </div>

        {/* Mobile Hamburger - Right */}
        <div 
          className="md:hidden" 
          style={{ marginLeft: 'auto', cursor: 'pointer', zIndex: 110 }} 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div style={{ width: 30, height: 3, background: '#ad8b3a', marginBottom: 6 }} />
          <div style={{ width: 30, height: 3, background: '#ad8b3a', marginBottom: 6 }} />
          <div style={{ width: 30, height: 3, background: '#ad8b3a' }} />
        </div>

        {/* Tiny Admin Controls (Stealth) */}
        <div style={{ position: 'absolute', bottom: 5, right: 60, opacity: 0.05, display: 'flex', gap: 10 }}>
           <button onClick={onAddMenu} style={{ fontSize: '9px', color: '#fff' }}>[M]</button>
           <button onClick={onAddItem} style={{ fontSize: '9px', color: '#fff' }}>[I]</button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div style={{ 
          position: 'fixed',
          top: 100,
          left: 0,
          right: 0,
          background: '#12161a', 
          padding: '40px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 30,
          borderBottom: '2px solid var(--gold)',
          zIndex: 120,
          textAlign: 'center'
        }} className="md:hidden">
            <a href="#home" style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>HOME</a>
            <a href="#menu" style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 700 }}>MENU</a>
            <a href="#reser" style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>MAKE A RESERVATION</a>
            <a href="#contact" style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>CONTACT US</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .md-hidden { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

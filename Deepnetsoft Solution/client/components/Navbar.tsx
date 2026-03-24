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
        background: 'rgba(10,10,10,0.98)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(15px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 70
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 40px',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Logo - Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 15, cursor: 'pointer' }}>
          <div style={{ width: 45, height: 45 }}>
            <svg viewBox="0 0 100 100">
              <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="var(--gold)" />
              <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="#000" />
              <text x="50" y="62" textAnchor="middle" fill="var(--gold)" style={{ fontSize: 40, fontWeight: 900, fontFamily: 'serif' }}>D</text>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '0.05em' }}>
              <span style={{ color: 'var(--blue-text)' }}>DEEP</span><span style={{ color: '#fff' }}>NET</span>
            </span>
            <span style={{ color: '#858585', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '0.05em' }}>SOFT</span>
          </div>
        </div>

        {/* Desktop Links - Right */}
        <div className="hidden md:flex" style={{ marginLeft: 'auto', gap: 30, alignItems: 'center' }}>
          <a href="#home" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.05em' }}>HOME</a>
          <a href="#menu" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>MENU</a>
          <a href="#reser" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>MAKE A RESERVATION</a>
          <a href="#contact" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>CONTACT US</a>
        </div>

        {/* Mobile Hamburger - Right */}
        <div 
          className="md:hidden" 
          style={{ marginLeft: 'auto', cursor: 'pointer', zIndex: 110 }} 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div style={{ width: 25, height: 2, background: '#fff', marginBottom: 5 }} />
          <div style={{ width: 25, height: 2, background: '#fff', marginBottom: 5 }} />
          <div style={{ width: 25, height: 2, background: '#fff' }} />
        </div>

        {/* Admin Links - Hidden in corner */}
        <div style={{ position: 'absolute', bottom: -20, right: 0, opacity: 0.1, display: 'flex', gap: 5 }}>
           <button onClick={onAddMenu} style={{ fontSize: '8px' }}>+M</button>
           <button onClick={onAddItem} style={{ fontSize: '8px' }}>+I</button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div style={{ 
          position: 'fixed',
          top: 70,
          left: 0,
          right: 0,
          background: 'rgba(5,5,5,0.98)', 
          padding: '30px 40px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 25,
          borderBottom: '1px solid var(--gold)',
          zIndex: 120
        }} className="md:hidden">
            <a href="#home" style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 600 }}>HOME</a>
            <a href="#menu" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>MENU</a>
            <a href="#reser" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>MAKE A RESERVATION</a>
            <a href="#contact" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>CONTACT US</a>
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

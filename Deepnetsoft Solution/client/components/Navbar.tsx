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
        {/* Mobile Hamburger - Left */}
        <div 
          className="md:hidden" 
          style={{ position: 'absolute', left: 24, zIndex: 50, cursor: 'pointer' }} 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div style={{ width: 25, height: 2, background: '#fff', marginBottom: 5 }} />
          <div style={{ width: 25, height: 2, background: '#fff', marginBottom: 5 }} />
          <div style={{ width: 25, height: 2, background: '#fff' }} />
        </div>

        {/* Desktop Links - Left (Flex 1 for centering) */}
        <div className="hidden md:flex" style={{ flex: 1, gap: 30, justifyContent: 'flex-start' }}>
          <a href="#home" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.05em' }}>HOME</a>
          <a href="#menu" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>MENU</a>
        </div>

        {/* Center Logo Area (Absolute centered on mobile, centered within flex on desktop) */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 15, 
          cursor: 'pointer',
          position: 'static',
          zIndex: 60
        }} className="mobile-center-logo">
          <div style={{ width: 50, height: 50 }}>
            <svg viewBox="0 0 100 100">
              <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="var(--gold)" />
              <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="#000" />
              <text x="50" y="62" textAnchor="middle" fill="var(--gold)" style={{ fontSize: 40, fontWeight: 900, fontFamily: 'serif' }}>D</text>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '0.05em' }}>
              <span style={{ color: '#fff' }}>DEEP</span><span style={{ color: 'var(--gold)' }}>NET</span>
            </span>
            <span style={{ color: '#858585', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '0.05em' }}>SOFT</span>
          </div>
        </div>

        {/* Desktop Links - Right (Flex 1 for centering) */}
        <div className="hidden md:flex" style={{ flex: 1, gap: 30, justifyContent: 'flex-end' }}>
          <a href="#reser" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>MAKE A RESERVATION</a>
          <a href="#contact" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>CONTACT US</a>
        </div>

        {/* Admin Links - Floating Right */}
        <div style={{ position: 'absolute', right: 10, display: 'flex', gap: 10, opacity: 0.2 }}>
           <button onClick={onAddMenu} style={{ fontSize: '10px' }}>+M</button>
           <button onClick={onAddItem} style={{ fontSize: '10px' }}>+I</button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div style={{ background: '#000', padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: 20 }} className="md:hidden">
            <a href="#home" style={{ color: 'var(--gold)' }}>HOME</a>
            <a href="#menu" style={{ color: '#fff' }}>MENU</a>
            <a href="#reser" style={{ color: '#fff' }}>MAKE A RESERVATION</a>
            <a href="#contact" style={{ color: '#fff' }}>CONTACT US</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
          .mobile-center-logo {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </nav>
  );
}

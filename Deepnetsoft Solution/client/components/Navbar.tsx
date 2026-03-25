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
        top: -2,
        zIndex: 100,
        height: 98
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 60px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
           position: 'relative',
        }}
      >
        {/* Logo Icon - Centered Centerpiece */}
        <div style={{ 
          position: 'absolute', 
          left: '50%', 
          top: '100%', 
          transform: 'translate(-50%, -50%)', 
          width: 85, 
          height: 85,
          zIndex: 10 
        }}>
          <img src="/logo.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Center Logo" />
        </div>


        {/* Branding Text */}
        <div style={{ 
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '10px',
          height: '100%'
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
            <span style={{ color: '#ad8b3a' }}>DEEP</span><span style={{ color: '#fff' }}>NET</span><span style={{ color: '#fff' }}>SOFT</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex" style={{ 
          marginLeft: 'auto',
          display: 'flex',
          gap: 30,
          alignItems: 'flex-end',
          paddingBottom: '10px',
          height: '100%'
        }}>
          <a href="#home" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 400, letterSpacing: '0.03em', fontFamily: "'Oswald', sans-serif", color: '#fff' }}>HOME</a>
          <a href="#menu" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 400, letterSpacing: '0.03em', fontFamily: "'Oswald', sans-serif", color: 'var(--gold)' }}>MENU</a>
          <a href="#reservation" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 400, letterSpacing: '0.03em', fontFamily: "'Oswald', sans-serif", color: '#fff' }}>MAKE A RESERVATION</a>
          <a href="#contact" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 400, letterSpacing: '0.03em', fontFamily: "'Oswald', sans-serif", color: '#fff' }}>CONTACT US</a>
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
            <a href="#reservation" style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>MAKE A RESERVATION</a>
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

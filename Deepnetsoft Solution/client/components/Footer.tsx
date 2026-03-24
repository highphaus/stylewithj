'use client';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#000',
        color: '#fff',
        padding: '60px 0 20px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 40,
        }}
      >
        {/* Connect With Us */}
        <div className="footer-card">
          <h4 className="footer-title">CONNECT WITH US</h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', marginBottom: 10 }}>+91 940 061 3433</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>info@deepnetsoft.com</p>
        </div>

        {/* Logo Section */}
        <div className="footer-card">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 15 }}>
            <div style={{ position: 'relative', width: 45, height: 45 }}>
              <svg viewBox="0 0 100 100">
                <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="var(--gold)" strokeWidth="3" />
                <text x="50" y="62" textAnchor="middle" fill="var(--gold)" style={{ fontSize: 40, fontWeight: 900, fontFamily: 'serif' }}>D</text>
              </svg>
            </div>
          </div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: 15 }}>
            <span style={{ color: '#fff' }}>DEEPNET</span> <span style={{ color: 'var(--gold)' }}>SOFT</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, opacity: 0.6 }}>
            {['f', 't', 'y', 'i'].map(s => <span key={s} style={{ cursor: 'pointer', fontSize: '1.2rem' }}>{s}</span>)}
          </div>
        </div>

        {/* Find Us */}
        <div className="footer-card">
          <h4 className="footer-title">FIND US</h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.6 }}>First floor, Geo infopark,<br />Infopark EXPY, Kakkanad</p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '40px auto 0',
          padding: '20px 24px 0',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        <span>© 2026 Deepnetsoft Solutions. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}

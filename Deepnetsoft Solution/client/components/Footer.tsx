'use client';

export default function Footer() {
  return (
    <footer
      id="contact"
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
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
          flexWrap: 'wrap'
        }}
      >
        {/* Connect With Us */}
        <div style={{ 
          border: '1px solid #C19A6B', 
          borderRadius: 15, 
          padding: '30px', 
          width: 370, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h4 style={{ color: '#C19A6B', fontSize: '16px', fontWeight: 500, marginBottom: 20, letterSpacing: '1px' }}>CONNECT WITH US</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ color: '#C19A6B' }}>☎</span>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>+91 940 061 3433</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#C19A6B' }}>✉</span>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>info@deepnetsoft.com</p>
          </div>
        </div>

        {/* Logo Section */}
        <div style={{ 
          border: '1px solid #C19A6B', 
          borderRadius: 15, 
          padding: '30px', 
          width: 370, 
          textAlign: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 80, height: 80, background: '#000' }}>
            <img src="/logo.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Logo" />
          </div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400, fontSize: '32px', letterSpacing: '0.05em', margin: '20px 0 10px', textTransform: 'uppercase' }}>
            <span style={{ color: '#C19A6B' }}>DEEP</span> <span style={{ color: '#fff' }}>NET</span> <span style={{ color: '#888' }}>SOFT</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 15, opacity: 0.6, marginTop: 15 }}>
            {/* Facebook */}
            <svg style={{ cursor: 'pointer', width: 20, height: 20, fill: '#888' }} viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            {/* Twitter */}
            <svg style={{ cursor: 'pointer', width: 20, height: 20, fill: '#888' }} viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9 12.15 12.15 0 01-8.82-4.48 4.28 4.28 0 001.32 5.7 4.26 4.26 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 003.99 2.97 8.58 8.58 0 01-5.3 1.83c-.34 0-.68-.02-1.02-.06a12.12 12.12 0 006.56 1.92c7.88 0 12.19-6.53 12.19-12.19 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 4.56a8.55 8.55 0 01-2.46.69 4.3 4.3 0 001.88-2.38z" />
            </svg>
            {/* YouTube */}
            <svg style={{ cursor: 'pointer', width: 22, height: 22, fill: '#888' }} viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
            </svg>
            {/* Instagram */}
            <svg style={{ cursor: 'pointer', width: 20, height: 20, fill: '#888' }} viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        </div>

        {/* Find Us */}
        <div style={{ 
          border: '1px solid #C19A6B', 
          borderRadius: 15, 
          padding: '30px', 
          width: 370, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h4 style={{ color: '#C19A6B', fontSize: '16px', fontWeight: 500, marginBottom: 20, letterSpacing: '1px' }}>FIND US</h4>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>First floor, Geo infopark,<br />Infopark EXPY, Kakkanad</p>
          </div>
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

'use client';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '350px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      {/* Background Image with Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          filter: 'grayscale(100%) brightness(0.7)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, padding: '0 24px' }}>
        <h1
          className="menu-title-shadow"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(5rem, 15vw, 9rem)',
            fontWeight: 900,
            marginBottom: 0,
            letterSpacing: '0.05em',
            color: '#fff',
            lineHeight: 1
          }}
        >
          MENU
        </h1>
        <p
          className="serif-accent"
          style={{
            maxWidth: 750,
            fontSize: '1.3rem',
            lineHeight: 1.5,
            margin: '20px auto 0',
            color: 'rgba(255,255,255,0.6)',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.
        </p>
      </div>
    </section>
  );
}

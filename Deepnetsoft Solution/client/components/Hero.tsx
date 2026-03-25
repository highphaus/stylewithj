'use client';

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        height: '311px',
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
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
          backgroundImage: 'url("/aefd7aa0f81b6208cb3da0f5ecc0f0d109ca4bd0.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 1px',
          opacity: 0.2, // Reduced to make the white text and title fully legible
          zIndex: 0
        }}
      />

      {/* Center Wrapper for MENU Title */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '177px', 
          height: '111px', 
          top: '100px', // Adjusted for optimal spacing
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: '75px',
            lineHeight: '100%',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            textShadow: '4px 3px 0px #800020',
            margin: 0
          }}
        >
          MENU
        </h1>
      </div>

      {/* Center Wrapper for Description Paragraph */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '681px', 
          height: '44px', 
          top: '230px', // Brought near MENU title
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <p
          style={{
            fontFamily: "'Kelly Slab', serif",
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#BBBBBB',
            margin: 0
          }}
        >
          Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.
        </p>
      </div>
    </section>
  );
}

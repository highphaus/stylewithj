// src/components/ui/SmoothScroll.tsx
'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Create a highly responsive spring transition to mimic fluid motion physics
  const transformSpring = useSpring(scrollY, {
    stiffness: 45,
    damping: 15,
    mass: 0.2
  });

  // Invert the scroll value to move the layout upwards smoothly
  const y = useTransform(transformSpring, (value) => -value);

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        document.body.style.height = `${scrollRef.current.getBoundingClientRect().height}px`;
      }
    };

    // Initialize layout height mapping and recalculate on dynamic image loads
    handleResize();
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      document.body.style.height = ''; // Reset body height on unmount
    };
  }, []);

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full overflow-hidden will-change-transform z-10"
      >
        {children}
      </motion.div>
    </>
  );
}
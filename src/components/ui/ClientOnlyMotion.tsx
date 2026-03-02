'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ============================================
// CLIENT-ONLY MOTION WRAPPER
// Verhindert Hydration-Mismatch bei Animationen
// ============================================

interface ClientOnlyMotionProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  style?: React.CSSProperties;
  [key: string]: any; // Allow other motion props
}

export function ClientOnlyMotion({ 
  children, 
  className, 
  initial, 
  whileInView, 
  viewport, 
  transition, 
  style,
  ...otherProps 
}: ClientOnlyMotionProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Server: Render static div without animations
  if (!isClient) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Client: Render with full animations
  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      {...otherProps}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SAFE ANIMATE ON SCROLL COMPONENT
// ============================================

interface SafeAnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export function SafeAnimateOnScroll({ 
  children, 
  className = '', 
  delay = 0,
  style 
}: SafeAnimateOnScrollProps) {
  return (
    <ClientOnlyMotion
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </ClientOnlyMotion>
  );
}
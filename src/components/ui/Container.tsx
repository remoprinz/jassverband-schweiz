'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'full' | 'narrow' | 'wide';
  className?: string;
}

const sizes = {
  // Basiert auf den Design-Tokens in globals.css
  full: 'container-main',                    // Volle Breite (1152px + padding)
  narrow: 'max-w-3xl mx-auto px-6 md:px-8', // FAQ/Formular-Breite (~768px)
  wide: 'max-w-5xl mx-auto px-6 md:px-8',   // Mittlere Breite (~1024px)
};

export function Container({ children, size = 'full', className = '' }: ContainerProps) {
  return (
    <div className={`${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
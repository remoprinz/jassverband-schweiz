'use client';

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  background?: 'white' | 'cream' | 'dark' | 'transparent' | 'trust';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

const backgrounds = {
  white: 'bg-white',
  cream: 'bg-[var(--color-cream)]',
  dark: 'bg-black',
  transparent: 'bg-transparent',
  trust: 'bg-[#e8e4dc]',  // Trust section background
};

const spacings = {
  none: '',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-24',
};

export function Section({ 
  children, 
  background = 'white', 
  spacing = 'lg', 
  className = '',
  id 
}: SectionProps) {
  return (
    <section id={id} className={`${backgrounds[background]} ${spacings[spacing]} ${className}`}>
      {children}
    </section>
  );
}
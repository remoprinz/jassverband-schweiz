'use client';

import React from 'react';
import { Section, Container, SectionHeader } from '@/components/ui';

interface StandardSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  background?: 'white' | 'cream' | 'dark' | 'transparent' | 'trust';
  containerSize?: 'full' | 'narrow' | 'wide';
  headerCentered?: boolean;
  headerLight?: boolean;
  headerSize?: 'sm' | 'md' | 'lg';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

/**
 * StandardSection - Wiederverwendbares Pattern für Sections
 * 
 * Kombiniert Section + Container + SectionHeader für konsistente Layouts
 */
export function StandardSection({
  title,
  subtitle,
  children,
  background = 'white',
  containerSize = 'full',
  headerCentered = true,
  headerLight = false,
  headerSize = 'lg',
  spacing = 'lg',
  className = '',
  id,
}: StandardSectionProps) {
  return (
    <Section background={background} spacing={spacing} className={className} id={id}>
      <Container size={containerSize}>
        {(title || subtitle) && (
          <SectionHeader
            title={title || ''}
            subtitle={subtitle}
            centered={headerCentered}
            light={headerLight}
            size={headerSize}
          />
        )}
        {children}
      </Container>
    </Section>
  );
}
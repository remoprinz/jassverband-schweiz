'use client';

import { motion } from 'framer-motion';
import React from 'react';

// ============================================
// BASE CARD - Wiederverwendbare Basis
// ============================================
interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function BaseCard({ children, className = '', hover = true, onClick }: BaseCardProps) {
  return (
    <motion.div
      className={`bg-white transition-all duration-300 ${hover ? 'hover:-translate-y-1' : ''} ${className}`}
      style={{
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
      }}
      whileHover={hover ? { boxShadow: 'var(--shadow-card-hover)' } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PRICING CARD - Für Mitgliedschafts-Packages
// ============================================
interface PricingCardProps {
  title: string;
  price: number | string;
  period?: string;
  features: (string | null | undefined)[];
  isHighlighted?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  ctaText: string;
  badge?: string;
}

export function PricingCard({
  title,
  price,
  period = 'Jahr',
  features,
  isHighlighted = false,
  isSelected = false,
  onSelect,
  ctaText,
  badge,
}: PricingCardProps) {
  return (
    <motion.div
      className="relative h-full flex flex-col p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderRadius: 'var(--radius-card)',
        boxShadow: isHighlighted ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        backgroundColor: isHighlighted ? 'var(--color-primary)' : '#ffffff',
        color: isHighlighted ? '#ffffff' : '#000000',
        border: isSelected ? '2px solid var(--color-primary)' : 'none',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {badge && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full"
          style={{ backgroundColor: '#000000', color: '#ffffff' }}
        >
          {badge}
        </div>
      )}
      
      <h3
        className="mb-2"
        style={{
          fontFamily: 'var(--font-capita), Capita, Georgia, serif',
          fontWeight: 700,
          fontSize: 'var(--font-size-20)',
          lineHeight: '1.2',
          letterSpacing: 'var(--letter-spacing-normal)',
        }}
      >
        {title}
      </h3>
      
      <div className="mb-6">
        <span 
          style={{ 
            fontFamily: 'var(--font-capita), Capita, Georgia, serif', 
            fontWeight: 700, 
            fontSize: '36px' 
          }}
        >
          {typeof price === 'string' ? price : `CHF ${price}`}
        </span>
        {typeof price === 'number' && (
          <span style={{ opacity: 0.7, fontSize: 'var(--font-size-16)' }}>
            {' '} / {period}
          </span>
        )}
      </div>
      
      <ul className="space-y-3 mb-8 flex-1">
        {features.filter(Boolean).map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg 
              className="w-5 h-5 shrink-0 mt-0.5" 
              style={{ color: isHighlighted ? '#ffffff' : 'var(--color-primary)' }} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span 
              style={{ 
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', 
                fontSize: 'var(--font-size-15)', 
                lineHeight: '1.5', 
                opacity: isHighlighted ? 0.9 : 0.65 
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={onSelect}
        className="w-full mt-auto font-bold transition-all transform hover:-translate-y-0.5 btn-primary"
        style={{
          backgroundColor: isHighlighted ? '#ffffff' : 'var(--color-primary)',
          color: isHighlighted ? 'var(--color-primary)' : '#ffffff',
        }}
      >
        {ctaText}
      </button>
    </motion.div>
  );
}

// ============================================
// FAQ CARD - Für häufige Fragen
// ============================================
interface FAQCardProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
  linkUrl?: string;
  linkLabel?: string;
}

export function FAQCard({ 
  question, 
  answer, 
  isOpen = false, 
  onToggle,
  linkUrl,
  linkLabel 
}: FAQCardProps) {
  return (
    <motion.div
      className="overflow-hidden transition-all duration-300"
      style={{ 
        borderRadius: 'var(--radius-card)', 
        backgroundColor: '#ffffff', 
        boxShadow: 'var(--shadow-card)' 
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onToggle}
        className="w-full px-8 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        style={{
          fontFamily: 'var(--font-capita), Capita, Georgia, serif',
          fontWeight: 700,
          fontSize: 'var(--font-size-17)',
          color: '#000000',
        }}
      >
        {question}
        <svg
          className="w-5 h-5 shrink-0 ml-4 transition-transform duration-300"
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
            color: 'var(--color-primary)' 
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <motion.div 
          className="px-8 pb-5"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p 
            style={{ 
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', 
              fontSize: 'var(--font-size-16)', 
              lineHeight: '1.5', 
              color: 'var(--color-foreground-muted)' 
            }}
          >
            {answer}
          </p>
          {linkUrl && linkLabel && (
            <a
              href={linkUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 underline underline-offset-2 hover:no-underline transition-all"
              style={{ color: '#000000', fontWeight: 600 }}
            >
              {linkLabel}
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// ============================================
// PROJECT CARD - Für Ecosystem
// ============================================
interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
  ctaText: string;
  external?: boolean;
}

export function ProjectCard({ title, description, href, icon, ctaText, external = true }: ProjectCardProps) {
  const isDisabled = !href || href === '#';

  const content = (
    <>
      {icon && (
        <div className={`w-12 h-12 mb-5 text-black ${!isDisabled ? 'group-hover:text-[var(--color-primary)]' : ''} transition-colors duration-300`}>
          {icon}
        </div>
      )}
      
      <h3 
        className={`mb-3 ${!isDisabled ? 'group-hover:text-[var(--color-primary)]' : ''} transition-colors duration-300`}
        style={{ 
          fontFamily: 'var(--font-capita), Capita, Georgia, serif',
          fontWeight: 700,
          fontSize: 'var(--font-size-28)',
          lineHeight: '1',
          letterSpacing: 'var(--letter-spacing-normal)',
          color: '#000000'
        }}
      >
        {title}
      </h3>
      
      <p 
        className="mb-5"
        style={{ 
          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          fontWeight: 400,
          fontSize: 'var(--font-size-16)',
          lineHeight: '1.5',
          color: 'var(--color-foreground-muted)'
        }}
      >
        {description}
      </p>
      
      <div 
        className="flex items-center"
        style={{
          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          fontWeight: 500,
          fontSize: 'var(--font-size-15)',
          color: isDisabled ? 'var(--color-foreground-muted)' : 'var(--color-primary)'
        }}
      >
        <span>{isDisabled ? 'In Entwicklung' : ctaText}</span>
        {!isDisabled && (
          <svg 
            className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </div>
    </>
  );

  if (isDisabled) {
    return (
      <BaseCard className="p-8" hover={false}>
        {content}
      </BaseCard>
    );
  }

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className="block bg-white p-8 group transition-all duration-300"
      style={{
        borderRadius: 'var(--radius-card-lg)',
        boxShadow: 'var(--shadow-card)'
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: 'var(--shadow-card-hover)' 
      }}
      transition={{ duration: 0.25 }}
    >
      {content}
    </motion.a>
  );
}
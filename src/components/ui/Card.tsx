'use client';

import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-white border border-[var(--color-border)] rounded-2xl p-6 ${className}`}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ProjectCard({ title, description, href, icon, className = '' }: ProjectCardProps) {
  const isDisabled = !href || href === '#';
  
  const content = (
    <>
      {icon && (
        <div className={`w-12 h-12 mb-4 text-[var(--color-primary)] ${!isDisabled ? 'group-hover:scale-110' : ''} transition-transform`}>
          {icon}
        </div>
      )}
      <h3 className={`text-xl font-bold mb-2 text-[var(--color-foreground)] ${!isDisabled ? 'group-hover:text-[var(--color-primary)]' : ''} transition-colors`}>
        {title}
      </h3>
      <p className="text-[var(--color-foreground-muted)]">
        {description}
      </p>
      {!isDisabled && (
        <div className="mt-4 flex items-center text-[var(--color-primary)] font-medium">
          <span>Besuchen</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
      {isDisabled && (
        <div className="mt-4 flex items-center text-[var(--color-foreground-muted)] font-medium">
          <span>In Entwicklung</span>
        </div>
      )}
    </>
  );

  if (isDisabled) {
    return (
      <div className={`block bg-white border border-[var(--color-border)] rounded-2xl p-8 ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white border border-[var(--color-border)] rounded-2xl p-8 group ${className}`}
      whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.a>
  );
}

interface ValueCardProps {
  title: string;
  icon: React.ReactNode;
}

export function ValueCard({ title, icon }: ValueCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-16 h-16 mb-4 text-[var(--color-primary)]">
        {icon}
      </div>
      <h4 className="font-semibold text-lg">{title}</h4>
    </motion.div>
  );
}

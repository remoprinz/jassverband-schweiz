'use client';

import { motion } from 'framer-motion';

interface EcosystemProps {
  title: string;
  subtitle: string;
  jasswiki: { title: string; description: string };
  jassguru: { title: string; description: string };
  jassmeister: { title: string; description: string };
}

const icons = {
  jasswiki: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 8v32" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16h8M12 24h8M12 32h8M28 16h8M28 24h8M28 32h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  jassguru: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="20" width="8" height="20" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="20" y="14" width="8" height="26" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="32" y="8" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M6 44h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  jassmeister: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 12v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 6v2M24 40v2M6 24h2M40 24h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

interface EcosystemCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  ctaText: string;
}

function EcosystemCard({ title, description, href, icon, ctaText }: EcosystemCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white p-8 group transition-all duration-300"
      style={{
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)' 
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Icon - 48x48px */}
      <div 
        className="w-12 h-12 mb-5 text-black group-hover:text-[#ff0000] transition-colors duration-300"
      >
        {icon}
      </div>
      
      {/* Card Title - Figma: Capita Bold 28px */}
      <h3 
        className="mb-3 group-hover:text-[#ff0000] transition-colors duration-300"
        style={{ 
          fontFamily: 'var(--font-capita), Capita, Georgia, serif',
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: '1',
          letterSpacing: '-0.4px',
          color: '#000000'
        }}
      >
        {title}
      </h3>
      
      {/* Description - Figma: Inter Regular 16px */}
      <p 
        className="mb-5"
        style={{ 
          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#6b6b6b'
        }}
      >
        {description}
      </p>
      
      {/* CTA Link - Figma: Inter Medium 15px, Rot */}
      <div 
        className="flex items-center"
        style={{
          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          fontWeight: 500,
          fontSize: '15px',
          color: '#ff0000'
        }}
      >
        <span>{ctaText}</span>
        <svg 
          className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.a>
  );
}

export function Ecosystem({ title, subtitle, jasswiki, jassguru, jassmeister }: EcosystemProps) {
  const projects = [
    { key: 'jasswiki', href: 'https://jasswiki.ch', icon: icons.jasswiki, ctaText: 'Erkunden', ...jasswiki },
    { key: 'jassguru', href: 'https://jassguru.ch', icon: icons.jassguru, ctaText: 'Spielen', ...jassguru },
    { key: 'jassmeister', href: 'https://jassmeister.web.app', icon: icons.jassmeister, ctaText: 'Anmelden', ...jassmeister },
  ];

  return (
    <section 
      className="py-20 md:py-24"
      style={{ backgroundColor: '#f0eee7' }}
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Section Title - Figma: Capita Bold 42px */}
          <motion.h2
            className="mb-4"
            style={{ 
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 42px)',
              lineHeight: '1.37',
              letterSpacing: '-0.96px',
              color: '#000000'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          
          {/* Subtitle - Figma: Inter Regular 20px */}
          <motion.p
            className="max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              lineHeight: '1.6',
              color: '#6b6b6b'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>
        
        {/* Cards Grid - Figma: 3 columns, 32px gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EcosystemCard
                title={project.title}
                description={project.description}
                href={project.href}
                icon={project.icon}
                ctaText={project.ctaText}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { StandardSection } from '@/components/layout/StandardSection';
import { EnhancedProjectCard } from '@/components/ui';

interface EcosystemProps {
  title: string;
  subtitle: string;
  jasswiki: { title: string; description: string };
  jassguru: { title: string; description: string };
  jassmeister: { title: string; description: string };
  jasskalkulator: { title: string; description: string };
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
  jasskalkulator: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="6" width="32" height="36" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="12" y="10" width="24" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="16" cy="26" r="2" fill="currentColor" />
      <circle cx="24" cy="26" r="2" fill="currentColor" />
      <circle cx="32" cy="26" r="2" fill="currentColor" />
      <circle cx="16" cy="34" r="2" fill="currentColor" />
      <circle cx="24" cy="34" r="2" fill="currentColor" />
      <circle cx="32" cy="34" r="2" fill="currentColor" />
    </svg>
  ),
};


export function Ecosystem({ title, subtitle, jasswiki, jassguru, jassmeister, jasskalkulator }: EcosystemProps) {
  const projects = [
    { key: 'jasswiki', href: 'https://jasswiki.ch', icon: icons.jasswiki, ctaText: 'Erkunden', ...jasswiki },
    { key: 'jassguru', href: 'https://jassguru.ch', icon: icons.jassguru, ctaText: 'Spielen', ...jassguru },
    { key: 'jassmeister', href: 'https://jassmeister.web.app', icon: icons.jassmeister, ctaText: 'Anmelden', ...jassmeister },
    { key: 'jasskalkulator', href: '/jasskalkulator', icon: icons.jasskalkulator, ctaText: 'Berechnen', ...jasskalkulator },
  ];

  return (
    <StandardSection
      title={title}
      subtitle={subtitle}
      background="cream"
      containerSize="full"  // ✅ Consistent with other content sections
      spacing="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <EnhancedProjectCard
              title={project.title}
              description={project.description}
              href={project.href}
              icon={project.icon}
              ctaText={project.ctaText}
            />
          </motion.div>
        ))}
      </div>
    </StandardSection>
  );
}

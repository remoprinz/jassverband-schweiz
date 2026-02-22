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
      className="block bg-white border border-[var(--color-border)] rounded-xl p-6 lg:p-8 group hover:border-[var(--color-primary)]/30 transition-all"
      whileHover={{ y: -4, boxShadow: 'var(--shadow-card-hover)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-10 h-10 lg:w-12 lg:h-12 mb-4 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
        {icon}
      </div>
      <h3 
        className="text-lg lg:text-xl font-bold mb-2 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors"
        style={{ fontFamily: 'var(--font-capita), Georgia, serif' }}
      >
        {title}
      </h3>
      <p className="text-[var(--color-foreground-muted)] text-sm lg:text-base mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center text-[var(--color-primary)] font-medium text-sm">
        <span>{ctaText}</span>
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.a>
  );
}

export function Ecosystem({ title, subtitle, jasswiki, jassguru, jassmeister }: EcosystemProps) {
  const projects = [
    { key: 'jasswiki', href: 'https://jasswiki.ch', icon: icons.jasswiki, ctaText: 'Besuchen', ...jasswiki },
    { key: 'jassguru', href: 'https://jassguru.ch', icon: icons.jassguru, ctaText: 'Besuchen', ...jassguru },
    { key: 'jassmeister', href: 'https://jassmeister.web.app', icon: icons.jassmeister, ctaText: 'Besuchen', ...jassmeister },
  ];

  return (
    <section className="section-spacing bg-[var(--color-cream)]">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-[var(--color-foreground)]"
            style={{ fontFamily: 'var(--font-capita), Georgia, serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-[var(--color-foreground-muted)] text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>
        
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

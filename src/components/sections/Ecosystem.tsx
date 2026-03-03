'use client';

import { motion } from 'framer-motion';
import { StandardSection } from '@/components/layout/StandardSection';
import { EnhancedProjectCard } from '@/components/ui';

interface EcosystemProject {
  title: string;
  description: string;
}

interface EcosystemProps {
  title: string;
  subtitle: string;
  whatsapp: EcosystemProject;
  jasswiki: EcosystemProject;
  jasskalkulator: EcosystemProject;
  jassguru: EcosystemProject;
  jasskarten: EcosystemProject;
  jassreisen: EcosystemProject;
  jassmeister: EcosystemProject;
  jasstrainer: EcosystemProject;
  jassturniere: EcosystemProject;
}

const icons = {
  whatsapp: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 6C14.06 6 6 14.06 6 24c0 3.18.83 6.16 2.28 8.76L6 42l9.48-2.2A17.9 17.9 0 0024 42c9.94 0 18-8.06 18-18S33.94 6 24 6z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M18 20c0-1 .5-3 3-3s3 2 3 3v1c0 1-.5 2-1.5 3l-3 3v1h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="18" r="2" fill="currentColor" />
    </svg>
  ),
  jasswiki: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 8v32" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16h8M12 24h8M12 32h8M28 16h8M28 24h8M28 32h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
  jassguru: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="20" width="8" height="20" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="20" y="14" width="8" height="26" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="32" y="8" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M6 44h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  jasskarten: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="6" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(-8 18 20)" />
      <rect x="20" y="14" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(8 30 28)" />
      <circle cx="18" cy="16" r="3" fill="currentColor" />
      <circle cx="30" cy="32" r="3" fill="currentColor" />
    </svg>
  ),
  jassreisen: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M8 36l8-24h4l6 14 6-14h4l8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M6 40h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
  jasstrainer: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 42c0-8 5-14 12-14s12 6 12 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M32 20l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 24H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  jassturniere: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M16 6h16v6a8 8 0 01-16 0V6z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 20v8" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="28" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 36h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 6h4M34 6h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 6c-2 0-4 2-4 4s2 4 4 4h6M38 6c2 0 4 2 4 4s-2 4-4 4h-6" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="24" cy="42" r="3" fill="currentColor" />
    </svg>
  ),
};

type BadgeType = 'free' | 'member' | 'preview';

function BadgePill({ type }: { type: BadgeType }) {
  const config: Record<BadgeType, { label: string; bg: string; color: string }> = {
    free: { label: 'Frei zugänglich', bg: 'rgba(34, 139, 34, 0.12)', color: '#228b22' },
    member: { label: 'Für Mitglieder', bg: 'rgba(255, 0, 0, 0.08)', color: 'var(--color-primary)' },
    preview: { label: 'Vorschau', bg: 'rgba(0, 0, 0, 0.06)', color: 'var(--color-foreground-muted)' },
  };
  const c = config[type];
  return (
    <span
      className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
      style={{ backgroundColor: c.bg, color: c.color }}
    >
      {c.label}
    </span>
  );
}


export function Ecosystem({
  title,
  subtitle,
  whatsapp,
  jasswiki,
  jasskalkulator,
  jassguru,
  jasskarten,
  jassreisen,
  jassmeister,
  jasstrainer,
  jassturniere,
}: EcosystemProps) {
  const projects: Array<{
    key: string;
    href: string;
    icon: React.ReactNode;
    ctaText: string;
    external?: boolean;
    comingSoon?: boolean;
    badge: BadgeType;
    title: string;
    description: string;
  }> = [
    { key: 'whatsapp', href: '#', icon: icons.whatsapp, ctaText: 'Beitreten', badge: 'member', comingSoon: true, ...whatsapp },
    { key: 'jasswiki', href: 'https://jasswiki.ch', icon: icons.jasswiki, ctaText: 'Erkunden', badge: 'free', ...jasswiki },
    { key: 'jasskalkulator', href: '/jasskalkulator', icon: icons.jasskalkulator, ctaText: 'Berechnen', badge: 'free', external: false, ...jasskalkulator },
    { key: 'jassguru', href: 'https://jassguru.ch', icon: icons.jassguru, ctaText: 'Profil erstellen', badge: 'member', ...jassguru },
    { key: 'jasskarten', href: '#', icon: icons.jasskarten, ctaText: 'Bestellen', badge: 'member', comingSoon: true, ...jasskarten },
    { key: 'jassreisen', href: 'https://trumpf-as.ch', icon: icons.jassreisen, ctaText: 'Entdecken', badge: 'member', ...jassreisen },
    { key: 'jassmeister', href: 'https://jassmeister.web.app', icon: icons.jassmeister, ctaText: 'Anmelden', badge: 'member', ...jassmeister },
    { key: 'jasstrainer', href: '#', icon: icons.jasstrainer, ctaText: 'Trainieren', badge: 'free', comingSoon: true, ...jasstrainer },
    { key: 'jassturniere', href: '#', icon: icons.jassturniere, ctaText: 'Entdecken', badge: 'member', comingSoon: true, ...jassturniere },
  ];

  return (
    <StandardSection
      title={title}
      subtitle={subtitle}
      background="white"
      containerSize="full"
      spacing="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="relative h-full"
          >
            <div className="absolute top-3 right-3 z-10">
              <BadgePill type={project.badge} />
            </div>
            <EnhancedProjectCard
              title={project.title}
              description={project.description}
              href={project.comingSoon ? '#' : project.href}
              icon={project.icon}
              ctaText={project.comingSoon ? 'In Entwicklung' : project.ctaText}
              external={'external' in project ? project.external : !project.href?.startsWith('/')}
            />
          </motion.div>
        ))}
      </div>
    </StandardSection>
  );
}

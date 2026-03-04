'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StandardSection } from '@/components/layout/StandardSection';
import { EnhancedProjectCard } from '@/components/ui';
import { PiCalculatorFill } from 'react-icons/pi';
import { IoChatbubbles } from 'react-icons/io5';
import { FaTrophy } from 'react-icons/fa6';

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
    <span className="w-full h-full rounded-full bg-[#1FA84E] flex items-center justify-center">
      <IoChatbubbles className="w-[60%] h-[60%] text-white" />
    </span>
  ),
  jasswiki: (
    <span className="w-full h-full rounded-full overflow-hidden flex items-center justify-start bg-white">
      <Image
        src="/images/icons/jasswiki-logo-hero.png"
        alt="JassWiki"
        width={48}
        height={48}
        className="w-full h-full object-cover scale-[1.18] origin-center"
      />
    </span>
  ),
  jasskalkulator: (
    <span className="w-full h-full rounded-full bg-[#FF8A00] flex items-center justify-center">
      <PiCalculatorFill className="w-[55%] h-[55%] text-white" />
    </span>
  ),
  jassguru: (
    <Image
      src="/images/icons/guru_round.png"
      alt="JassGuru"
      width={48}
      height={48}
      className="w-full h-full object-cover object-left"
    />
  ),
  jasskarten: (
    <span className="w-full h-full flex items-center justify-start">
      <Image
        src="/images/icons/Logo-Positiv-1.svg"
        alt="JassKarten"
        width={84}
        height={48}
        className="w-auto h-full object-contain object-left scale-[2] origin-left"
      />
    </span>
  ),
  jassreisen: (
    <span className="w-full h-full flex items-center justify-start overflow-visible">
      <Image
        src="/images/icons/trumpf-as.png"
        alt="JassReisen"
        width={48}
        height={48}
        className="w-auto h-full object-contain object-left scale-[3.2] origin-left"
      />
    </span>
  ),
  jassmeister: (
    <span className="w-full h-full flex items-center justify-start overflow-visible">
      <Image
        src="/images/icons/jvs-logo-farbig-kurz.svg"
        alt="JassMeisterschaft"
        width={48}
        height={48}
        className="w-auto h-full object-contain object-left scale-[1.85] origin-left"
      />
    </span>
  ),
  jasstrainer: (
    <span className="w-full h-full flex items-center justify-start overflow-visible">
      <Image
        src="/images/icons/jasstrainer_goepf.svg"
        alt="JassTrainer"
        width={48}
        height={48}
        className="w-auto h-full object-contain object-left scale-[3.2] origin-left"
      />
    </span>
  ),
  jassturniere: (
    <span className="w-full h-full rounded-full bg-[#D4AF37] flex items-center justify-center">
      <FaTrophy className="w-[55%] h-[55%] text-white" />
    </span>
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
    { key: 'jassmeister', href: 'https://jassmeister.web.app', icon: icons.jassmeister, ctaText: 'Anmelden', badge: 'member', ...jassmeister, title: 'JassMeisterschaft' },
    { key: 'jassguru', href: 'https://jassguru.ch', icon: icons.jassguru, ctaText: 'Profil erstellen', badge: 'member', ...jassguru },
    { key: 'whatsapp', href: '#', icon: icons.whatsapp, ctaText: 'Beitreten', badge: 'member', comingSoon: true, ...whatsapp, title: 'JassBegegnung' },

    { key: 'jasskarten', href: 'https://schweizerjass.ch/', icon: icons.jasskarten, ctaText: 'Karten bestellen', badge: 'member', ...jasskarten },
    { key: 'jassturniere', href: '#', icon: icons.jassturniere, ctaText: 'Entdecken', badge: 'member', comingSoon: true, ...jassturniere, title: 'JassTurniere' },
    { key: 'jassreisen', href: 'https://trumpf-as.ch', icon: icons.jassreisen, ctaText: 'Entdecken', badge: 'member', ...jassreisen },

    { key: 'jasskalkulator', href: '/jasskalkulator', icon: icons.jasskalkulator, ctaText: 'Berechnen', badge: 'free', external: false, ...jasskalkulator },
    { key: 'jasstrainer', href: '#', icon: icons.jasstrainer, ctaText: 'Trainieren', badge: 'free', comingSoon: true, ...jasstrainer, title: 'JassTrainer Göpf' },
    { key: 'jasswiki', href: 'https://jasswiki.ch', icon: icons.jasswiki, ctaText: 'Erkunden', badge: 'free', ...jasswiki },
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

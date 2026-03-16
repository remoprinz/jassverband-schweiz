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

interface BadgeLabels {
  free: string;
  member: string;
  preview: string;
}

interface CtaLabels {
  jassmeister: string;
  jassguru: string;
  whatsapp: string;
  jasskarten: string;
  jassturniere: string;
  jassreisen: string;
  jasskalkulator: string;
  jasstrainer: string;
  jasswiki: string;
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
  badges: BadgeLabels;
  comingSoonLabel: string;
  ctaLabels: CtaLabels;
}

const icons = {
  whatsapp: (
    <span className="w-full h-full rounded-full bg-[#1FA84E] flex items-center justify-center">
      <IoChatbubbles className="w-[60%] h-[60%] text-white" />
    </span>
  ),
  jasswiki: (
    <span className="w-full h-full rounded-full bg-white flex items-center justify-center">
      <svg viewBox="4524 6774 32 34" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4551.0908203125,6788.0712890625C4550.88916015625,6787.42724609375,4550.62255859375,6786.806640625,4550.3154296875,6786.2109375L4552.76220703125,6782.81982421875L4550.65478515625,6780.71728515625L4548.5390625,6778.60693359375L4545.1396484375,6781.0478515625C4544.5419921875,6780.74169921875,4543.92041015625,6780.48388671875,4543.2744140625,6780.2744140625L4542.60400390625,6776.150390625L4536.62890625,6776.150390625L4535.95849609375,6780.2744140625C4535.3046875,6780.48388671875,4534.68310546875,6780.74169921875,4534.08544921875,6781.0478515625L4530.68603515625,6778.60693359375L4528.5703125,6780.71728515625L4526.462890625,6782.81982421875L4528.90966796875,6786.2109375C4528.6025390625,6786.806640625,4528.3359375,6787.42724609375,4528.13427734375,6788.0712890625L4524,6788.748046875L4524,6794.70068359375L4528.13427734375,6795.376953125C4528.3359375,6796.021484375,4528.6025390625,6796.64990234375,4528.90966796875,6797.23779296875L4526.462890625,6800.62890625L4528.5703125,6802.73095703125L4530.68603515625,6804.83349609375L4534.08544921875,6802.40087890625C4534.68310546875,6802.70703125,4535.3046875,6802.96484375,4535.95849609375,6803.17431640625L4536.62890625,6807.29833984375L4542.60400390625,6807.29833984375L4543.2744140625,6803.17431640625C4543.9287109375,6802.97265625,4544.55029296875,6802.70703125,4545.14794921875,6802.40087890625L4548.5390625,6804.83349609375L4550.65478515625,6802.73095703125L4552.76220703125,6800.62890625L4550.3154296875,6797.23779296875C4550.62255859375,6796.64990234375,4550.88916015625,6796.021484375,4551.0908203125,6795.376953125L4555.22509765625,6794.70068359375L4555.22509765625,6788.748046875L4551.0908203125,6788.0712890625Z" fill="#ff0000" fillRule="nonzero"/>
        <path d="M4532.955078125,6791.72021484375C4532.955078125,6788.05517578125,4535.9345703125,6785.0830078125,4539.60888671875,6785.0830078125C4543.28271484375,6785.0830078125,4546.25439453125,6788.05517578125,4546.25439453125,6791.72021484375C4546.25439453125,6795.38525390625,4543.2744140625,6798.357421875,4539.60888671875,6798.357421875C4535.94287109375,6798.357421875,4532.955078125,6795.38525390625,4532.955078125,6791.72021484375Z" fill="#ff0000" fillRule="nonzero"/>
        <path d="M4539.59228515625,6799.60595703125C4538.373046875,6797.22998046875,4537.3798828125,6796.6259765625,4535.3369140625,6795.2646484375C4533.1650390625,6793.82275390625,4531.404296875,6791.470703125,4532.19580078125,6788.92529296875C4533.27001953125,6785.501953125,4537.63037109375,6784.82568359375,4539.59228515625,6787.7412109375C4541.5546875,6784.82568359375,4545.90673828125,6785.494140625,4546.98876953125,6788.92529296875C4547.7880859375,6791.462890625,4546.02783203125,6793.814453125,4543.84765625,6795.2646484375C4541.8046875,6796.6259765625,4540.8115234375,6797.22998046875,4539.59228515625,6799.60595703125Z" fill="#ffffff" fillRule="evenodd"/>
      </svg>
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
    <Image
      src="/images/icons/logo-jassmeisterschaft.svg"
      alt="JassMeisterschaft"
      width={48}
      height={48}
      className="w-full h-full object-contain"
    />
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

function BadgePill({ type, labels }: { type: BadgeType; labels: BadgeLabels }) {
  const config: Record<BadgeType, { bg: string; color: string }> = {
    free: { bg: 'rgba(34, 139, 34, 0.12)', color: '#228b22' },
    member: { bg: 'rgba(255, 0, 0, 0.08)', color: 'var(--color-primary)' },
    preview: { bg: 'rgba(0, 0, 0, 0.06)', color: 'var(--color-foreground-muted)' },
  };
  const c = config[type];
  return (
    <span
      className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
      style={{ backgroundColor: c.bg, color: c.color }}
    >
      {labels[type]}
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
  badges,
  comingSoonLabel,
  ctaLabels,
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
    { key: 'jassmeister', href: 'https://jassmeister.web.app', icon: icons.jassmeister, ctaText: ctaLabels.jassmeister, badge: 'member', ...jassmeister },
    { key: 'jassguru', href: 'https://jassguru.ch', icon: icons.jassguru, ctaText: ctaLabels.jassguru, badge: 'member', ...jassguru },
    { key: 'whatsapp', href: 'https://chat.whatsapp.com/Cgc2tJxsGNV4SXU87cYeCX', icon: icons.whatsapp, ctaText: ctaLabels.whatsapp, badge: 'member', ...whatsapp },

    { key: 'jasskarten', href: 'https://schweizerjass.ch/', icon: icons.jasskarten, ctaText: ctaLabels.jasskarten, badge: 'member', ...jasskarten },
    { key: 'jassturniere', href: '#', icon: icons.jassturniere, ctaText: ctaLabels.jassturniere, badge: 'member', comingSoon: true, ...jassturniere },
    { key: 'jassreisen', href: 'https://trumpf-as.ch', icon: icons.jassreisen, ctaText: ctaLabels.jassreisen, badge: 'member', ...jassreisen },

    { key: 'jasskalkulator', href: '/jasskalkulator', icon: icons.jasskalkulator, ctaText: ctaLabels.jasskalkulator, badge: 'free', external: false, ...jasskalkulator },
    { key: 'jasstrainer', href: '#', icon: icons.jasstrainer, ctaText: ctaLabels.jasstrainer, badge: 'free', comingSoon: true, ...jasstrainer },
    { key: 'jasswiki', href: 'https://jasswiki.ch', icon: icons.jasswiki, ctaText: ctaLabels.jasswiki, badge: 'free', ...jasswiki },
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
              <BadgePill type={project.badge} labels={badges} />
            </div>
            <EnhancedProjectCard
              title={project.title}
              description={project.description}
              href={project.comingSoon ? '#' : project.href}
              icon={project.icon}
              ctaText={project.comingSoon ? comingSoonLabel : project.ctaText}
              external={'external' in project ? project.external : !project.href?.startsWith('/')}
            />
          </motion.div>
        ))}
      </div>
    </StandardSection>
  );
}

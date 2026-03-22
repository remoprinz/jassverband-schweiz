'use client';

import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/lib/social-links';

type Variant = 'on-light' | 'on-dark';
type Size = 'sm' | 'md';

const labels = {
  whatsapp: { de: 'WhatsApp-Community', fr: 'Communauté WhatsApp', it: 'Community WhatsApp' },
  instagram: { de: 'Instagram', fr: 'Instagram', it: 'Instagram' },
  linkedin: { de: 'LinkedIn', fr: 'LinkedIn', it: 'LinkedIn' },
} as const;

interface SocialIconLinksProps {
  variant?: Variant;
  size?: Size;
  locale?: string;
  className?: string;
}

export function SocialIconLinks({
  variant = 'on-light',
  size = 'md',
  locale = 'de',
  className = '',
}: SocialIconLinksProps) {
  const loc = locale === 'fr' || locale === 'it' ? locale : 'de';
  const btn =
    size === 'sm'
      ? 'w-8 h-8 rounded-full flex items-center justify-center transition-colors'
      : 'w-10 h-10 rounded-full flex items-center justify-center transition-colors';
  const iconClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  const light =
    'bg-[var(--color-background)] text-[var(--color-foreground-muted)] hover:bg-[var(--color-primary)] hover:text-white';
  const dark =
    'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white';

  const styleClass = variant === 'on-dark' ? dark : light;

  const items = [
    {
      href: SOCIAL_LINKS.whatsappCommunity,
      label: labels.whatsapp[loc],
      Icon: FaWhatsapp,
    },
    {
      href: SOCIAL_LINKS.instagram,
      label: labels.instagram[loc],
      Icon: FaInstagram,
    },
    {
      href: SOCIAL_LINKS.linkedInCompany,
      label: labels.linkedin[loc],
      Icon: FaLinkedinIn,
    },
  ] as const;

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`.trim()}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} ${styleClass}`}
          aria-label={label}
        >
          <Icon className={iconClass} aria-hidden />
        </a>
      ))}
    </div>
  );
}

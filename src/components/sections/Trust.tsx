'use client';

import { motion } from 'framer-motion';

interface TrustProps {
  badge: string;
  text: string;
}

export function Trust({ badge, text }: TrustProps) {
  return (
    <section className="py-16 bg-[var(--color-background-alt)]">
      <div className="container-main">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full" />
            <span className="font-semibold text-[var(--color-foreground)]">{badge}</span>
          </div>
          <span className="hidden sm:inline text-[var(--color-foreground-muted)]">—</span>
          <span className="text-[var(--color-foreground-muted)]">{text}</span>
        </motion.div>
      </div>
    </section>
  );
}

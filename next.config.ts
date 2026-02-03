import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

const nextConfig: NextConfig = {
  // Using Vercel's dynamic rendering (free tier)
  // No static export needed - Vercel handles this optimally
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);

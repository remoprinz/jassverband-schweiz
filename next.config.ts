import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

const createConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Separate build directories for dev/prod to prevent cache conflicts
    distDir: isDev ? ".next-dev" : ".next",

    images: {
      // CRITICAL: Enable Next.js Image Optimization for production
      unoptimized: isDev, // Only unoptimized in dev for faster rebuilds
      
      // Modern format support - WebP/AVIF automatic conversion
      formats: ['image/avif', 'image/webp'],
      
      // Quality levels for responsive images
      qualities: [75, 85, 90, 95],
      
      // Device sizes for responsive srcset
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      
      // Image sizes for next/image with sizes prop
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      
      // Minimize layout shift
      minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for optimized images
    },

    // Production caching headers for static assets
    async headers() {
      return [
        {
          // Cache all static assets aggressively
          source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          // Cache Next.js static assets
          source: '/_next/static/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          // Cache optimized images from Next.js
          source: '/_next/image/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          // Video files - long cache
          source: '/assets/videos/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },

    // Webpack configuration
    webpack: (config, { dev }) => {
      if (dev) {
        // Disable cache in dev for stability on synced/network filesystems
        config.cache = false;
      }
      return config;
    },

    // Enable compression
    compress: true,

    // Strict mode for better React performance
    reactStrictMode: true,

    // PoweredBy header removal (minor security + smaller response)
    poweredByHeader: false,

    // Trailing slashes consistency
    trailingSlash: false,
  };
};

// Export with phase-aware configuration
export default (phase: string) => withNextIntl(createConfig(phase));

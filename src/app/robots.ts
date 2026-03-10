import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    host: 'https://jassverband.ch',
    sitemap: 'https://jassverband.ch/sitemap.xml',
  };
}

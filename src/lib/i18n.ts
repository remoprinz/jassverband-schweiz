import { getRequestConfig } from 'next-intl/server';

export const locales = ['de', 'fr', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`./dictionaries/${locale}.json`)).default
  };
});

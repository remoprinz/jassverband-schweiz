import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const capita = localFont({
  src: "../../fonts/Capita/Capita-Bold.woff2",
  weight: "700",
  variable: "--font-capita",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://jassverband.ch";

const keywordsByLocale: Record<string, string> = {
  de: "Jassverband Schweiz, Schweizer Jass, Schieber, Lebendige Tradition, Kartenspiel Schweiz, JassWiki, JassGuru, Jass lernen",
  fr: "Fédération Suisse de Jass, Jass suisse, Schieber, Tradition vivante, Jeu de cartes suisse, JassWiki, JassGuru",
  it: "Federazione Svizzera di Jass, Jass svizzero, Schieber, Tradizione vivente, Gioco di carte svizzero, JassWiki, JassGuru",
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: keywordsByLocale[locale] || keywordsByLocale.de,
    authors: [{ name: "Jassverband Schweiz", url: BASE_URL }],
    creator: "Jassverband Schweiz",
    publisher: "Jassverband Schweiz",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "de": `${BASE_URL}/de`,
        "fr": `${BASE_URL}/fr`,
        "it": `${BASE_URL}/it`,
        "x-default": `${BASE_URL}/de`,
      },
    },
    openGraph: {
      title: "Jassverband Schweiz",
      description: t("description"),
      url: BASE_URL,
      siteName: "Jassverband Schweiz",
      locale: `${locale}_CH`,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Jassverband Schweiz",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Jassverband Schweiz",
      description: t("description"),
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const nav = messages.nav as { home: string; verband: string; news: string; projekte: string; partner: string; kontakt: string };
  const footer = messages.footer as { tagline: string; legal: string; impressum: string; datenschutz: string; copyright: string };

  return (
    <html lang={locale}>
      <head>
        <OrganizationSchema />
      </head>
      <body className={`${inter.variable} ${capita.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} nav={nav} />
          <MainWrapper locale={locale}>
            {children}
          </MainWrapper>
          <Footer locale={locale} content={footer} nav={nav} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

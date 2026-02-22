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
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const capita = localFont({
  src: [
    {
      path: "../../../../public/fonts/Capita/Capita-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Capita/Capita-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-capita",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: "Jassverband Schweiz",
      description: t("description"),
      url: "https://jassverband.ch",
      siteName: "Jassverband Schweiz",
      locale: `${locale}_CH`,
      type: "website",
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
      <body className={`${inter.variable} ${capita.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} nav={nav} />
          <main className="pt-16 md:pt-20">
            {children}
          </main>
          <Footer locale={locale} content={footer} nav={nav} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

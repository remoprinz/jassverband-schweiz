import { Metadata } from "next";

const BASE_URL = "https://jassverband.ch";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const meta: Record<string, { title: string; description: string }> = {
    de: {
      title: "Kontakt | Jassverband Schweiz",
      description: "Kontaktieren Sie den Jassverband Schweiz für Medienanfragen, Partnerschaften, Mitgliedschaften und allgemeine Fragen.",
    },
    fr: {
      title: "Contact | Fédération Suisse de Jass",
      description: "Contactez la Fédération Suisse de Jass pour les médias, partenariats, adhésions et questions générales.",
    },
    it: {
      title: "Contatto | Federazione Svizzera di Jass",
      description: "Contatta la Federazione Svizzera di Jass per media, partnership, adesioni e domande generali.",
    },
  };

  const current = meta[locale] ?? meta.de;

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/kontakt`,
      languages: {
        de: `${BASE_URL}/de/kontakt`,
        fr: `${BASE_URL}/fr/kontakt`,
        it: `${BASE_URL}/it/kontakt`,
        "x-default": `${BASE_URL}/de/kontakt`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default function KontaktLayout({ children }: Props) {
  return <>{children}</>;
}

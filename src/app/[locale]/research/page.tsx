import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://jassverband.ch";

const SERIF = "var(--font-capita), Capita, Georgia, serif";
const SANS = "var(--font-inter), Inter, system-ui, sans-serif";

const META: Record<string, { title: string; description: string }> = {
  de: {
    title: "Forschung | Jassverband Schweiz",
    description:
      "Forschung des Jassverbands Schweiz: Wie lässt sich das Denken eines Jassers in Regeln fassen — und einer erklärbaren Jass-KI beibringen?",
  },
  fr: {
    title: "Recherche | Fédération Suisse de Jass",
    description:
      "La recherche de la Fédération Suisse de Jass : comment traduire la pensée d'un joueur de jass en règles — et l'enseigner à une IA explicable ?",
  },
  it: {
    title: "Ricerca | Federazione Svizzera di Jass",
    description:
      "La ricerca della Federazione Svizzera di Jass: come tradurre il pensiero di un giocatore di jass in regole — e insegnarlo a un'IA spiegabile?",
  },
};

const PAGE: Record<string, { eyebrow: string; title: string; lede: string; more: string }> = {
  de: {
    eyebrow: "Jassverband Schweiz",
    title: "Forschung",
    lede: "Der Jassverband Schweiz erforscht, wie sich das Denken eines Jassers in Regeln fassen lässt — gemeinsam mit einer Schweizer Hochschule für angewandte Forschung. Das Ziel: eine Jass-KI, die stark spielt und dabei jeden Zug erklären kann.",
    more: "Lesen",
  },
  fr: {
    eyebrow: "Fédération Suisse de Jass",
    title: "Recherche",
    lede: "La Fédération Suisse de Jass étudie comment traduire la pensée d'un joueur de jass en règles — avec une haute école suisse de recherche appliquée. L'objectif : une IA de jass qui joue fort et sait expliquer chaque coup. (Publication en allemand.)",
    more: "Lire",
  },
  it: {
    eyebrow: "Federazione Svizzera di Jass",
    title: "Ricerca",
    lede: "La Federazione Svizzera di Jass studia come tradurre il pensiero di un giocatore di jass in regole — con una scuola universitaria svizzera di ricerca applicata. L'obiettivo: un'IA del jass che gioca forte e sa spiegare ogni mossa. (Pubblicazione in tedesco.)",
    more: "Leggi",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.de;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/research`,
      languages: {
        de: `${BASE_URL}/de/research`,
        fr: `${BASE_URL}/fr/research`,
        it: `${BASE_URL}/it/research`,
        "x-default": `${BASE_URL}/de/research`,
      },
    },
    openGraph: { title: meta.title, description: meta.description, type: "website" },
  };
}

export default async function ResearchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const p = PAGE[locale] || PAGE.de;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${p.title} — Jassverband Schweiz`,
    url: `${BASE_URL}/${locale}/research`,
    inLanguage: locale,
    hasPart: [
      {
        "@type": "ScholarlyArticle",
        headline: "Wie AlphaJass denkt — Drei Bilder, vier Siebe, ein Satz",
        url: `${BASE_URL}/de/research/wie-alphajass-denkt`,
        inLanguage: "de-CH",
      },
      {
        "@type": "ScholarlyArticle",
        headline: "Wie stark AlphaJass spielt — die Messung",
        url: `${BASE_URL}/de/research/wie-stark-alphajass-spielt`,
        inLanguage: "de-CH",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-spacing" style={{ background: "var(--color-cream)", paddingTop: "120px" }}>
        <div className="container-main">
          {/* Kopf */}
          <div style={{ maxWidth: 720, margin: "0 auto 3rem", textAlign: "center" }}>
            <p style={{ fontFamily: SANS, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-primary)", fontWeight: 700, margin: "0 0 1rem" }}>
              {p.eyebrow}
            </p>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 46px)",
                lineHeight: 1.15,
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-foreground)",
                margin: "0 0 1rem",
              }}
            >
              {p.title}
            </h1>
            <p style={{ fontFamily: SANS, fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--color-foreground-muted)", margin: 0 }}>
              {p.lede}
            </p>
          </div>

          {/* Paper-Karten */}
          <div style={{ maxWidth: 720, margin: "0 auto", display: "grid", gap: "1rem" }}>
            {[
              {
                href: `/${locale}/research/wie-alphajass-denkt`,
                eyebrow: "AlphaJass · Doktrin-Architektur",
                title: "Wie AlphaJass denkt",
                desc: "Drei Bilder, vier Siebe, ein Satz — wie eine Maschine das Denken eines Jassers nachbildet und dabei jeden Zug erklären kann. Der Bauplan.",
              },
              {
                href: `/${locale}/research/wie-stark-alphajass-spielt`,
                eyebrow: "AlphaJass · Messung",
                title: "Wie stark AlphaJass spielt",
                desc: "+31.97 Punkte pro Deal gegen einen unbewegten Massstab — die empirische Messung, jede Zahl mit Seed, Skript und Artefakt. Das Ergebnis.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 16,
                  padding: "1.6rem 1.8rem",
                  textDecoration: "none",
                }}
              >
                <p style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-primary)", margin: "0 0 0.6rem" }}>
                  {card.eyebrow}
                </p>
                <h2
                  className="group-hover:text-[var(--color-primary)] transition-colors"
                  style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.25, color: "var(--color-foreground)", margin: "0 0 0.6rem" }}
                >
                  {card.title}
                </h2>
                <p style={{ fontFamily: SANS, fontSize: "15.5px", lineHeight: 1.6, color: "var(--color-foreground-muted)", margin: "0 0 1rem" }}>
                  {card.desc}
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: SERIF, fontWeight: 700, fontSize: "15px", color: "var(--color-primary)" }}>
                  {p.more}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import {
  getUpcomingTournamentsForLocale,
  getPastTournamentsForLocale,
  type Tournament,
} from "@/lib/tournaments/tournaments";

interface TurnierePageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://jassverband.ch";

const META: Record<string, { title: string; description: string }> = {
  de: {
    title: "Jassturniere | Jassverband Schweiz",
    description:
      "Jassturniere in der Schweiz — kuratiert vom Jassverband Schweiz. Datum, Ort, Modus und Anmeldung auf einen Blick, maschinenlesbar als schema.org-Event.",
  },
  fr: {
    title: "Tournois de Jass | Fédération Suisse de Jass",
    description:
      "Tournois de jass en Suisse — sélectionnés par la Fédération Suisse de Jass. Date, lieu, format et inscription en un coup d'œil.",
  },
  it: {
    title: "Tornei di Jass | Federazione Svizzera di Jass",
    description:
      "Tornei di jass in Svizzera — selezionati dalla Federazione Svizzera di Jass. Data, luogo, formato e iscrizione in breve.",
  },
};

const PAGE: Record<
  string,
  { title: string; subtitle: string; upcoming: string; past: string; empty: string; details: string }
> = {
  de: {
    title: "Turniere",
    subtitle: "Jassturniere aus der ganzen Schweiz — kuratiert vom Jassverband.",
    upcoming: "Kommende Turniere",
    past: "Vergangene Turniere",
    empty: "Aktuell sind keine Turniere ausgeschrieben.",
    details: "Details & Anmeldung",
  },
  fr: {
    title: "Tournois",
    subtitle: "Des tournois de jass de toute la Suisse — sélectionnés par la Fédération.",
    upcoming: "Prochains tournois",
    past: "Tournois passés",
    empty: "Aucun tournoi annoncé pour le moment.",
    details: "Détails & inscription",
  },
  it: {
    title: "Tornei",
    subtitle: "Tornei di jass da tutta la Svizzera — selezionati dalla Federazione.",
    upcoming: "Prossimi tornei",
    past: "Tornei passati",
    empty: "Al momento non ci sono tornei annunciati.",
    details: "Dettagli & iscrizione",
  },
};

const localeMap: Record<string, string> = { de: "de-CH", fr: "fr-CH", it: "it-CH" };

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(localeMap[locale] || "de-CH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: TurnierePageProps): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.de;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/turniere`,
      languages: {
        de: `${BASE_URL}/de/turniere`,
        fr: `${BASE_URL}/fr/turniere`,
        it: `${BASE_URL}/it/turniere`,
        "x-default": `${BASE_URL}/de/turniere`,
      },
    },
    openGraph: { title: meta.title, description: meta.description, type: "website" },
  };
}

function TournamentCard({
  tournament,
  locale,
  detailsLabel,
}: {
  tournament: Tournament;
  locale: string;
  detailsLabel: string;
}) {
  const content =
    tournament[locale as keyof Pick<Tournament, "de" | "fr" | "it">] || tournament.de;

  return (
    <Link
      href={`/${locale}/turniere/${tournament.slug}`}
      className="group flex flex-col sm:flex-row gap-5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-4 sm:p-5"
      style={{ background: "var(--color-background)", border: "1px solid var(--color-border)" }}
    >
      {tournament.poster && (
        <div
          className="relative w-full sm:w-[132px] flex-shrink-0 rounded-xl overflow-hidden border border-[var(--color-border)] self-start"
          style={{ maxWidth: 132, aspectRatio: tournament.poster.aspect ?? 210 / 297 }}
        >
          <Image
            src={tournament.poster.src}
            alt={tournament.poster.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="132px"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div
          className="flex flex-wrap items-center gap-2 mb-2"
          style={{
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "var(--color-primary)",
            fontWeight: 600,
          }}
        >
          <time dateTime={tournament.startDate}>{formatDate(tournament.startDate, locale)}</time>
          <span aria-hidden="true" style={{ color: "var(--color-foreground-muted)" }}>
            ·
          </span>
          <span style={{ color: "var(--color-foreground-muted)", fontWeight: 400 }}>
            {tournament.location.addressLocality}
          </span>
        </div>

        <h2
          className="text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors mb-2"
          style={{
            fontFamily: "var(--font-capita), Capita, Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(18px, 2.2vw, 22px)",
            lineHeight: 1.3,
          }}
        >
          {content.title}
        </h2>

        <p
          className="text-[var(--color-foreground-muted)] line-clamp-2 mb-3"
          style={{
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
            fontSize: "15px",
            lineHeight: 1.6,
          }}
        >
          {content.excerpt}
        </p>

        <span
          className="inline-flex items-center gap-1.5 text-[var(--color-primary)]"
          style={{
            fontFamily: "var(--font-capita), Capita, Georgia, serif",
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          {detailsLabel}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default async function TurnierePage({ params }: TurnierePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const p = PAGE[locale] || PAGE.de;
  const upcoming = getUpcomingTournamentsForLocale(locale);
  const past = getPastTournamentsForLocale(locale);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: p.title,
    itemListElement: upcoming.map((tournament, index) => {
      const content =
        tournament[locale as keyof Pick<Tournament, "de" | "fr" | "it">] || tournament.de;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: content.title,
        url: `${BASE_URL}/${locale}/turniere/${tournament.slug}`,
      };
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: p.title, item: `${BASE_URL}/${locale}/turniere` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="section-spacing" style={{ background: "var(--color-cream)", paddingTop: "120px" }}>
        <div className="container-main">
          <div className="mb-12 md:mb-16 text-center max-w-[720px] mx-auto">
            <h1
              className="text-[var(--color-foreground)] mb-3"
              style={{
                fontFamily: "var(--font-capita), Capita, Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 42px)",
                lineHeight: 1.2,
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              {p.title}
            </h1>
            <p
              className="text-[var(--color-foreground-muted)]"
              style={{
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: "clamp(16px, 2vw, 18px)",
                lineHeight: 1.6,
              }}
            >
              {p.subtitle}
            </p>
          </div>

          {upcoming.length === 0 && past.length === 0 && (
            <div className="text-center py-16">
              <p
                className="text-[var(--color-foreground-muted)]"
                style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif", fontSize: "16px" }}
              >
                {p.empty}
              </p>
            </div>
          )}

          {upcoming.length > 0 && (
            <section className="max-w-[760px] mx-auto">
              <div className="grid grid-cols-1 gap-5">
                {upcoming.map((tournament) => (
                  <TournamentCard
                    key={tournament.slug}
                    tournament={tournament}
                    locale={locale}
                    detailsLabel={p.details}
                  />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section className="max-w-[760px] mx-auto mt-14 md:mt-16">
              <h2
                className="text-[var(--color-foreground)] mb-6"
                style={{
                  fontFamily: "var(--font-capita), Capita, Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(20px, 2.5vw, 24px)",
                }}
              >
                {p.past}
              </h2>
              <div className="grid grid-cols-1 gap-5">
                {past.map((tournament) => (
                  <TournamentCard
                    key={tournament.slug}
                    tournament={tournament}
                    locale={locale}
                    detailsLabel={p.details}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

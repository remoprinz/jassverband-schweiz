import { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getTournamentBySlug,
  getAllTournaments,
  isTournamentVisibleInLocale,
  type Tournament,
  type TournamentContent,
} from "@/lib/tournaments/tournaments";
import { SocialIconLinks } from "@/components/layout/SocialIconLinks";

interface TournamentPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const BASE_URL = "https://jassverband.ch";
const LOCALES = ["de", "fr", "it"] as const;

export async function generateStaticParams() {
  const tournaments = getAllTournaments();
  // Nur die Sprachen bauen, in denen das Turnier sichtbar ist (Soft-Launch).
  return LOCALES.flatMap((locale) =>
    tournaments
      .filter((tournament) => isTournamentVisibleInLocale(tournament, locale))
      .map((tournament) => ({ locale, slug: tournament.slug }))
  );
}

function localizedContent(tournament: Tournament, locale: string): TournamentContent {
  return (
    tournament[locale as keyof Pick<Tournament, "de" | "fr" | "it">] || tournament.de
  );
}

export async function generateMetadata({
  params,
}: TournamentPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tournament = getTournamentBySlug(slug);
  if (!tournament) return { title: "Tournament not found" };

  const content = localizedContent(tournament, locale);
  const ogImage = tournament.poster?.src || "/images/og-image.jpg";

  return {
    title: `${content.title} | Jassverband Schweiz`,
    description: content.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${locale}/turniere/${slug}`,
      languages: {
        de: `${BASE_URL}/de/turniere/${slug}`,
        fr: `${BASE_URL}/fr/turniere/${slug}`,
        it: `${BASE_URL}/it/turniere/${slug}`,
        "x-default": `${BASE_URL}/de/turniere/${slug}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.excerpt,
      type: "website",
      images: [
        {
          url: `${BASE_URL}${ogImage}`,
          alt: tournament.poster?.alt || content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.excerpt,
      images: [`${BASE_URL}${ogImage}`],
    },
  };
}

const localeMap: Record<string, string> = {
  de: "de-CH",
  fr: "fr-CH",
  it: "it-CH",
};

function capitalizeFirst(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDateLong(iso: string, locale: string): string {
  // Wochentag kommt in fr/it kleingeschrieben — nur der erste Buchstabe wird
  // grossgeschrieben (CSS-capitalize würde im FR fälschlich «Septembre» grossschreiben).
  return capitalizeFirst(
    new Date(iso).toLocaleDateString(localeMap[locale] || "de-CH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
}

function formatTime(iso: string, locale: string): string {
  return new Date(iso).toLocaleTimeString(localeMap[locale] || "de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDeadline(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(localeMap[locale] || "de-CH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// --- Markdown-Renderer (gleiche Logik wie die News-Artikel) ---
function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.*$)/gim, '<h3 class="article-h3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="article-h2">$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2" class="text-[var(--color-primary)] hover:underline">$1</a>'
    )
    .replace(/^> (.*$)/gim, '<blockquote class="article-quote">$1</blockquote>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    .split("\n\n")
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<h3") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p class="article-p">${trimmed}</p>`;
    })
    .join("");
}

type UILabels = {
  back: string;
  facts: string;
  date: string;
  doors: string;
  location: string;
  format: string;
  price: string;
  deadline: string;
  organizer: string;
  register: string;
  registerVia: string;
  smsHint: string;
  mapLink: string;
  from: string;
  to: string;
};

const LABELS: Record<string, UILabels> = {
  de: {
    back: "Zurück zu Turniere",
    facts: "Auf einen Blick",
    date: "Datum",
    doors: "Türöffnung",
    location: "Ort",
    format: "Modus",
    price: "Startgeld",
    deadline: "Anmeldeschluss",
    organizer: "Veranstalter",
    register: "Jetzt anmelden",
    registerVia: "Anmeldung",
    smsHint: "Anmeldung im Zweierteam per SMS oder über den QR-Code auf dem Plakat.",
    mapLink: "Auf Karte zeigen",
    from: "ab",
    to: "bis",
  },
  fr: {
    back: "Retour aux tournois",
    facts: "En un coup d'œil",
    date: "Date",
    doors: "Ouverture des portes",
    location: "Lieu",
    format: "Format",
    price: "Finance d'inscription",
    deadline: "Délai d'inscription",
    organizer: "Organisateur",
    register: "S'inscrire",
    registerVia: "Inscription",
    smsHint: "Inscription par équipe de deux, par SMS ou via le QR-code sur l'affiche.",
    mapLink: "Voir sur la carte",
    from: "dès",
    to: "à",
  },
  it: {
    back: "Torna ai tornei",
    facts: "In breve",
    date: "Data",
    doors: "Apertura porte",
    location: "Luogo",
    format: "Formato",
    price: "Quota d'iscrizione",
    deadline: "Termine d'iscrizione",
    organizer: "Organizzatore",
    register: "Iscriviti",
    registerVia: "Iscrizione",
    smsHint: "Iscrizione a coppie, per SMS o tramite il QR-code sul manifesto.",
    mapLink: "Mostra sulla mappa",
    from: "dalle",
    to: "alle",
  },
};

export default async function TournamentPage({ params }: TournamentPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tournament = getTournamentBySlug(slug);
  if (!tournament) notFound();
  // Soft-Launch-Gate: in nicht freigeschalteten Sprachen nicht erreichbar.
  if (!isTournamentVisibleInLocale(tournament, locale)) notFound();

  const content = localizedContent(tournament, locale);
  const t = LABELS[locale] || LABELS.de;
  const canonicalUrl = `${BASE_URL}/${locale}/turniere/${slug}`;

  const dateLabel = formatDateLong(tournament.startDate, locale);
  const timeLabel = `${formatTime(tournament.startDate, locale)}–${formatTime(
    tournament.endDate,
    locale
  )}`;
  const priceLabel = tournament.price
    ? `${tournament.price.amount} ${tournament.price.currency}`
    : undefined;
  const mapUrl = tournament.location.mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        tournament.location.mapsQuery
      )}`
    : undefined;
  const phoneHref = tournament.registrationPhone
    ? `sms:${tournament.registrationPhone.replace(/\s/g, "")}`
    : undefined;

  // --- schema.org/Event (JSON-LD) — der maschinenlesbare Kern ---
  const eventJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: content.title,
    startDate: tournament.startDate,
    endDate: tournament.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: content.excerpt,
    inLanguage: locale,
    url: canonicalUrl,
    ...(tournament.poster ? { image: [`${BASE_URL}${tournament.poster.src}`] } : {}),
    location: {
      "@type": "Place",
      name: tournament.location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: tournament.location.streetAddress,
        postalCode: tournament.location.postalCode,
        addressLocality: tournament.location.addressLocality,
        addressRegion: tournament.location.addressRegion,
        addressCountry: tournament.location.addressCountry,
      },
    },
    organizer: {
      "@type": "Organization",
      name: tournament.organizer.name,
      ...(tournament.organizer.url ? { url: tournament.organizer.url } : {}),
    },
    ...(tournament.price
      ? {
          isAccessibleForFree: false,
          offers: {
            "@type": "Offer",
            price: String(tournament.price.amount),
            priceCurrency: tournament.price.currency,
            availability: "https://schema.org/InStock",
            ...(tournament.registrationDeadline
              ? { validThrough: tournament.registrationDeadline }
              : {}),
            // Nur eine echte Anmelde-URL setzen — keine erfundene URL.
            ...(tournament.registrationUrl
              ? { url: tournament.registrationUrl }
              : {}),
          },
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Turniere",
        item: `${BASE_URL}/${locale}/turniere`,
      },
      { "@type": "ListItem", position: 3, name: content.title, item: canonicalUrl },
    ],
  };

  const bodyHtml = renderMarkdown(content.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="py-12 md:py-20" style={{ background: "var(--color-cream)" }}>
        <div className="container-main">
          <div className="max-w-[760px] mx-auto">
            {/* Back Link */}
            <Link
              href={`/${locale}/turniere`}
              className="inline-flex items-center gap-2 text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors mb-10 md:mb-12"
              style={{
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: "15px",
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.back}
            </Link>

            {/* Header */}
            <header className="mb-8 md:mb-10">
              {tournament.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {tournament.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        background: "rgba(255, 0, 0, 0.08)",
                        color: "var(--color-primary)",
                        fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1
                className="text-[var(--color-foreground)] mb-6"
                style={{
                  fontFamily: "var(--font-capita), Capita, Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 4.5vw, 42px)",
                  lineHeight: 1.2,
                  letterSpacing: "var(--letter-spacing-tight)",
                }}
              >
                {content.title}
              </h1>

              <p
                className="text-[var(--color-foreground)]"
                style={{
                  fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  lineHeight: 1.6,
                  opacity: 0.75,
                }}
              >
                {content.excerpt}
              </p>
            </header>

            {/* Poster + Fakten nebeneinander (ab md) */}
            <div className="grid gap-6 md:gap-8 md:grid-cols-[minmax(0,300px)_1fr] items-start mb-10 md:mb-12">
              {tournament.poster && (
                <div
                  className="relative w-full mx-auto md:mx-0 rounded-xl overflow-hidden border border-[var(--color-border)]"
                  style={{ maxWidth: 300, aspectRatio: tournament.poster.aspect ?? 210 / 297 }}
                >
                  <Image
                    src={tournament.poster.src}
                    alt={tournament.poster.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority
                  />
                </div>
              )}

              {/* Fakten-Block */}
              <div
                className="rounded-2xl p-6 md:p-7"
                style={{ background: "var(--color-background)", border: "1px solid var(--color-border)" }}
              >
                <h2
                  className="mb-5 text-[var(--color-foreground)]"
                  style={{
                    fontFamily: "var(--font-capita), Capita, Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(18px, 2.4vw, 22px)",
                  }}
                >
                  {t.facts}
                </h2>

                <dl className="space-y-4">
                  <FactRow label={t.date}>
                    {dateLabel}
                    <br />
                    {timeLabel}
                    {tournament.doorsOpenTime ? ` · ${t.doors} ${tournament.doorsOpenTime}` : ""}
                  </FactRow>

                  <FactRow label={t.location}>
                    {tournament.location.name}
                    <br />
                    {tournament.location.streetAddress}, {tournament.location.postalCode}{" "}
                    {tournament.location.addressLocality}
                    {mapUrl && (
                      <>
                        {" "}
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-primary)] hover:underline"
                        >
                          {t.mapLink}
                        </a>
                      </>
                    )}
                  </FactRow>

                  <FactRow label={t.format}>{content.format}</FactRow>

                  {priceLabel && (
                    <FactRow label={t.price}>
                      {priceLabel}
                      {content.priceNote ? ` — ${content.priceNote}` : ""}
                    </FactRow>
                  )}

                  <FactRow label={t.organizer}>
                    {tournament.organizer.url ? (
                      <a
                        href={tournament.organizer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] hover:underline"
                      >
                        {tournament.organizer.name}
                      </a>
                    ) : (
                      tournament.organizer.name
                    )}
                  </FactRow>

                  {tournament.registrationDeadline && (
                    <FactRow label={t.deadline}>
                      {formatDeadline(tournament.registrationDeadline, locale)}
                    </FactRow>
                  )}
                </dl>

                {/* Anmelde-CTA */}
                <div className="mt-6">
                  {tournament.registrationUrl ? (
                    <a
                      href={tournament.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex w-full justify-center"
                    >
                      {t.register}
                    </a>
                  ) : (
                    <div>
                      {phoneHref && (
                        <a href={phoneHref} className="btn-primary inline-flex w-full justify-center">
                          {t.register}: SMS {tournament.registrationPhone}
                        </a>
                      )}
                      <p
                        className="mt-3 text-[var(--color-foreground-muted)]"
                        style={{
                          fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                          fontSize: "13px",
                          lineHeight: 1.5,
                        }}
                      >
                        {t.smsHint}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Editorialer Text */}
            <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {/* Footer: Social */}
            <footer
              className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span
                className="text-[var(--color-foreground-muted)]"
                style={{
                  fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                  fontSize: "14px",
                }}
              >
                {locale === "de" ? "Social Media" : locale === "fr" ? "Réseaux sociaux" : "Social media"}
              </span>
              <SocialIconLinks variant="on-light" size="md" locale={locale} />
            </footer>
          </div>
        </div>
      </article>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .article-body .article-p {
              font-family: var(--font-inter), Inter, system-ui, sans-serif;
              font-weight: 400;
              font-size: clamp(16px, 1.8vw, 18px);
              line-height: 1.75;
              color: var(--color-foreground);
              margin-bottom: 1.5em;
            }
            .article-body .article-h2 {
              font-family: var(--font-capita), Capita, Georgia, serif;
              font-weight: 700;
              font-size: clamp(22px, 3vw, 28px);
              line-height: 1.3;
              color: var(--color-foreground);
              margin-top: 2.5em;
              margin-bottom: 0.8em;
            }
            .article-body .article-h3 {
              font-family: var(--font-capita), Capita, Georgia, serif;
              font-weight: 700;
              font-size: clamp(18px, 2.5vw, 22px);
              line-height: 1.3;
              color: var(--color-foreground);
              margin-top: 2em;
              margin-bottom: 0.6em;
            }
            .article-body .article-quote {
              font-family: var(--font-capita), Capita, Georgia, serif;
              font-style: italic;
              font-size: clamp(18px, 2.2vw, 22px);
              line-height: 1.5;
              color: var(--color-foreground);
              border-left: 3px solid var(--color-primary);
              padding-left: 1.25em;
              margin: 1.5em 0;
            }
            .article-body strong { font-weight: 600; }
          `,
        }}
      />
    </>
  );
}

function FactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt
        className="text-[var(--color-foreground-muted)]"
        style={{
          fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </dt>
      <dd
        className="text-[var(--color-foreground)]"
        style={{
          fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
          fontSize: "15px",
          lineHeight: 1.5,
        }}
      >
        {children}
      </dd>
    </div>
  );
}

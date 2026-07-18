import { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

/**
 * RESEARCH-SPEC «Belief, Konventionen, Training» — die Retraining-Spec.
 * Dritte Seite der /research-Reihe (Bauplan · Messung · Spec), gebaut für den
 * Kickoff mit der Partner-Hochschule (DOKTRIN-DOKTOR III, 18.07.26, Remos Auftrag).
 *
 * REGELN:
 * - Hochschule UNGENANNT («Partner-Hochschule»), bis das Einverständnis vorliegt.
 * - Keine Messzahlen hier — die leben im Mess-Paper (STATIK-Hoheit). Strukturelle
 *   Fakten (36×3, fünf Stufen) sind Code-Fakten, keine Behauptungen.
 * - noindex + kein Sitemap-Eintrag, wie die Geschwister-Seiten (privat, Direktlink).
 * - Jasssprache geeicht: anziehen/verwerfen/Puur/Nell/Bock; «ausspielen», nie «führen».
 */

const BASE_URL = "https://jassverband.ch";
const CANONICAL = `${BASE_URL}/de/research/belief-und-training`;

const SERIF = "var(--font-capita), Capita, Georgia, serif";
const SANS = "var(--font-inter), Inter, system-ui, sans-serif";
const INK = "var(--color-foreground)";
const MUTED = "var(--color-foreground-muted)";
const RED = "var(--color-primary)";
const LINE = "rgba(22,21,19,0.14)";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Belief, Konventionen, Training — die Retraining-Spec";
  const description =
    "Wie das Belief der Jass-KI das Modell füttert, warum ein Checkpoint zu genau einer Welt gehört, und woher die Trainingsdaten kommen: Self-Play mit schaltbaren Konventionen, später echte Partien.";
  return {
    title: `${title} | Jassverband Schweiz`,
    description,
    // Privat (Remo 18.07.): nur per Direktlink, nicht öffentlich indexiert.
    robots: { index: false, follow: false },
    alternates: {
      canonical: CANONICAL,
      languages: {
        de: `${BASE_URL}/de/research/belief-und-training`,
        fr: `${BASE_URL}/fr/research/belief-und-training`,
        it: `${BASE_URL}/it/research/belief-und-training`,
        "x-default": CANONICAL,
      },
    },
    openGraph: { title, description, type: "article", url: `${BASE_URL}/${locale}/research/belief-und-training` },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: "Belief, Konventionen, Training",
  alternativeHeadline: "Die Retraining-Spec — ein Checkpoint gehört zu genau einer Welt",
  inLanguage: "de-CH",
  datePublished: "2026-07-18",
  version: "1.0",
  url: CANONICAL,
  about: [
    { "@type": "Thing", name: "Jass (Schweizer Kartenspiel)" },
    { "@type": "Thing", name: "Belief-Modellierung unter imperfekter Information" },
    { "@type": "Thing", name: "Self-Play-Training" },
  ],
  author: { "@type": "Organization", name: "Jassverband Schweiz", url: BASE_URL },
  publisher: { "@type": "Organization", name: "Jassverband Schweiz", url: BASE_URL },
};

function P({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: "clamp(16px, 1.9vw, 18px)", lineHeight: 1.75, color: INK, margin: "1.2em 0" }}>
      {children}
    </p>
  );
}

function H({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: SERIF,
        fontWeight: 700,
        fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
        color: INK,
        margin: "2.4em 0 0.2em",
        borderBottom: `2px solid ${INK}`,
        paddingBottom: "0.4rem",
      }}
    >
      {children}
    </h2>
  );
}

function Riegel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2rem 1fr", gap: "0.9rem", alignItems: "baseline", padding: "0.55rem 0", borderBottom: `1px solid ${LINE}` }}>
      <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.2rem", color: MUTED, textAlign: "center" }}>{n}</span>
      <span style={{ fontFamily: SANS, fontSize: "15.5px", lineHeight: 1.6, color: INK }}>{children}</span>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article style={{ background: "var(--color-cream)" }} className="py-12 md:py-20">
        <div className="container-main">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Link href={`/${locale}/research`} style={{ fontFamily: SANS, fontSize: "14px", color: MUTED, textDecoration: "none" }} className="hover:underline">
              ← Forschung
            </Link>

            <p style={{ fontFamily: SANS, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: RED, fontWeight: 700, margin: "1.8rem 0 0.9rem" }}>
              AlphaJass · Trainings-Spec
            </p>
            <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(2.1rem, 6vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.01em", color: INK, margin: "0 0 0.9rem" }}>
              Belief, Konventionen, Training
            </h1>
            <p style={{ fontFamily: SANS, fontSize: "clamp(17px, 2.2vw, 20px)", lineHeight: 1.65, color: INK, opacity: 0.82, maxWidth: "60ch", margin: 0 }}>
              Die Spec für das gemeinsame Retraining mit der Partner-Hochschule: wie das Belief das Modell
              füttert, warum ein Checkpoint zu genau <strong>einer</strong> Welt gehört — und woher die
              Daten kommen, heute und im Verlauf der Kampagne.
            </p>

            <H>Das Belief als Modell-Futter</H>
            <P>
              Aus Sicht jedes Sitzes hält die Engine eine Belief-Matrix über die verdeckten Karten: pro Karte,
              pro Mitspieler eine Einschätzung. Beweisbares (eigene Hand, gefallene Karten, wer eine Farbe
              nicht bedienen konnte) schreibt hartes ja/nein; alles andere bleibt weich. Der
              Encoder des Modells sieht daraus je Karte drei Werte — Partner, Gegner rechts, Gegner links.
            </P>
            <P>
              Konventionen schärfen dieses Bild: Wer mit dem <strong>König anzieht, verspricht den Ober</strong>;
              wer mit dem <strong>Ass anzieht, solange noch Trumpf im Spiel ist, verspricht den König</strong>.
              Streng gelesen wird aus «vielleicht» ein Sitz. Diese strenge Lesart ist heute{" "}
              <strong>aufgezeichnet, aber nicht angewendet</strong> (Opt-in, ausgeschaltet): das trainierte
              Modell hat die weiche Welt gelernt, und sein Input bleibt unangetastet, bis es neu trainiert ist.
            </P>

            <H>Ein Checkpoint, eine Welt</H>
            <P>
              Der Grund für die Disziplin: Schaltet man die Inputs härter, ohne das Modell neu zu trainieren,
              driftet der Input still unter dem Modell weg — die Fehlerklasse, die niemand bemerkt, bis der
              Bot «komisch» spielt. Daraus folgen die Riegel:
            </P>
            <div style={{ margin: "1.6em 0", padding: "0.4rem 1.2rem 0.9rem", border: `1px solid ${LINE}`, background: "rgba(255,255,255,0.55)", borderRadius: 12 }}>
              <Riegel n="1">Kein Umschalten ohne neues Checkpoint.</Riegel>
              <Riegel n="2">Schalter und Checkpoint reisen im selben Commit — Rollback ist ein einziger Schritt.</Riegel>
              <Riegel n="3">Vor jedem Wechsel ein Eval-Gate: paarige Kartengaben, neues gegen altes Checkpoint, jede Zahl mit Seed, Skript und Artefakt.</Riegel>
              <Riegel n="4">Jeder Datensatz trägt seine Schalter-Stellung im Namen — kein Mischbetrieb.</Riegel>
              <Riegel n="5">Die Arena spielt eine eingefrorene Kopie der Engine; ein Wechsel wirkt erst mit dem Deploy und wird von aussen verifiziert.</Riegel>
            </div>

            <H>Der Konventionen-Container</H>
            <P>
              Konventionen sind in der Engine eine eigene, schaltbare Klasse — pro Sitz erkannt, pro Bot
              schaltbar. Das trägt auf <strong>beiden Seiten</strong>: Ein Self-Play-Sitz kann mit
              abgeschalteter Konvention erzeugt werden (er sendet keine Anzieh-Signale, spielt nicht
              Nell-vor-Puur) — und auf der Empfänger-Seite sorgt der <strong>Kill-Switch</strong> dafür,
              dass die Beliefs der Mitspieler korrekt reagieren: Bricht ein Sitz eine Konvention beobachtbar
              (die versprochene Karte fällt woanders, oder er kann die versprochene Farbe nicht bedienen),
              werden seine strengen Deutungen ausgeblendet und das Belief fällt auf die weiche Lesart zurück.
            </P>
            <P>
              Erst diese Zweiseitigkeit macht Self-Play mit Konventions-Brechern <strong>konsistent</strong> —
              nicht nur möglich. Für das Retraining heisst das: Der strenge Datensatz enthält einen Anteil
              Partien mit konventionsbrüchigen Sitzen, damit das Modell beide Welten sieht — die strenge und
              die Rückfall-Welt. Das Mischungsverhältnis ist eine Eval-Frage, kein Bauchentscheid.
            </P>
            <P>
              Die Grenze bleibt ehrlich: <strong>Konventionen sind Information nur durch Einhaltung.</strong>{" "}
              Bei einem Sitz, der sich an nichts hält, degradiert das Belief kontrolliert auf die beweisbare
              ja/nein-Schicht — es wird nie falsch, nur leerer.
            </P>

            <H>Datenstrategie über die Zeit</H>
            <P>
              <strong>Heute:</strong> Self-Play — konventionstreue Sitze plus geschaltete Brecher-Sitze,
              erzeugt aus derselben Engine, die auch die Arena spielt.
            </P>
            <P>
              <strong>Die Kampagne:</strong> Mit der wachsenden Zahl echter Partien in der Arena entsteht
              die nächste Sample-Quelle — aufgezeichnete Spiele, ausschliesslich im Rahmen von Einwilligung
              und Pseudonymisierung.
            </P>
            <P>
              <strong>Langfrist:</strong> Auch das erratische Verhalten realer Jasserinnen und Jasser fliesst
              ins Training ein. Die Labels dafür liefert das Spielerbild: pro Sitz die erkannte Verwerf-Schule
              und der Konventionsstatus — dieselbe Brille, die heute schon den Kill-Switch speist.
            </P>

            <H>Abnahme</H>
            <P>
              Für jede behauptete Verbesserung gilt das Hausgesetz der Messung: paarige Kartengaben mit
              Seitentausch, fester Seed, jede Zahl mit Seed, Skript und Artefakt im Repository — wie im
              Mess-Paper dokumentiert. Der laufende Server meldet den aktiven Konventions-Stand öffentlich
              unter <code>/health</code>.
            </P>

            <p style={{ fontFamily: SANS, fontSize: "12px", letterSpacing: "0.06em", color: MUTED, marginTop: "2.6rem", textTransform: "uppercase" }}>
              Jassverband Schweiz · Trainings-Spec · Stand 18.07.2026
            </p>

            <p style={{ fontFamily: SANS, fontSize: "14.5px", color: MUTED, marginTop: "1.6rem" }}>
              → Der Motor dahinter:{" "}
              <Link href={`/${locale}/research/wie-alphajass-denkt`} style={{ color: RED }} className="hover:underline">
                Wie AlphaJass denkt
              </Link>
              . Die Messung:{" "}
              <Link href={`/${locale}/research/wie-stark-alphajass-spielt`} style={{ color: RED }} className="hover:underline">
                Wie stark AlphaJass spielt
              </Link>.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

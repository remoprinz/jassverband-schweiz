import { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

/**
 * RESEARCH-PAPER «Wie stark AlphaJass spielt» — die MESSUNG (Ergebnis).
 * Geschwister-Seite zum Architektur-Paper «Wie AlphaJass denkt».
 *
 * Zahlen WORTGETREU aus dem STATIK-freigegebenen Messtext portiert (LADDER 006–009,
 * jassai 20f941b, 16.07.26). KEINE Zahl ohne Artefakt. Gesperrt: superhuman,
 * «pro Partie» (es ist pro Deal), Zombie-49.5%. Kernzahl +31.97 gg. unbewegter
 * Heuristik-Massstab; +68.49 nur als Einordnung. Alle Werte: weislos, kein Mensch gemessen.
 */

const BASE_URL = "https://jassverband.ch";
const CANONICAL = `${BASE_URL}/de/research/wie-stark-alphajass-spielt`;

const SERIF = "var(--font-capita), Capita, Georgia, serif";
const SANS = "var(--font-inter), Inter, system-ui, sans-serif";
const INK = "var(--color-foreground)";
const MUTED = "var(--color-foreground-muted)";
const RED = "var(--color-primary)";
const LINE = "rgba(22,21,19,0.14)";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Wie stark AlphaJass spielt — die Messung";
  const description =
    "Die empirische Messung der Jass-KI des Jassverbands Schweiz: +31.97 Punkte pro Deal gegen einen unbewegten Massstab, jede Zahl mit Seed, Skript und Artefakt. Mit benannten Grenzen.";
  return {
    title: `${title} | Jassverband Schweiz`,
    description,
    alternates: {
      canonical: CANONICAL,
      languages: {
        de: `${BASE_URL}/de/research/wie-stark-alphajass-spielt`,
        fr: `${BASE_URL}/fr/research/wie-stark-alphajass-spielt`,
        it: `${BASE_URL}/it/research/wie-stark-alphajass-spielt`,
        "x-default": CANONICAL,
      },
    },
    openGraph: { title, description, type: "article", url: `${BASE_URL}/${locale}/research/wie-stark-alphajass-spielt` },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: "Wie stark AlphaJass spielt",
  alternativeHeadline: "Die Messung — +31.97 Punkte pro Deal gegen einen unbewegten Massstab",
  inLanguage: "de-CH",
  datePublished: "2026-07-17",
  version: "1.0",
  url: CANONICAL,
  about: [
    { "@type": "Thing", name: "Jass (Schweizer Kartenspiel)" },
    { "@type": "Thing", name: "Erklärbare künstliche Intelligenz" },
    { "@type": "Thing", name: "Empirische Evaluation" },
  ],
  author: { "@type": "Organization", name: "Jassverband Schweiz", url: BASE_URL },
  publisher: { "@type": "Organization", name: "Jassverband Schweiz", url: BASE_URL },
  isBasedOn: {
    "@type": "Dataset",
    name: "AlphaJass Evaluations-Artefakte (LADDER-Läufe 006–009)",
    description:
      "Paarige Evaluationen, 1000 Kartengaben mit Seitentausch, Seed 42; Roh-JSON mit Seed, Checkpoint-SHA256, Commit-Stand und Fallback-Zählern im jassai-Repository.",
    dateCreated: "2026-07-16",
    creator: { "@type": "Organization", name: "Jassverband Schweiz" },
  },
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

const th: React.CSSProperties = { textAlign: "left", padding: "10px 12px", borderBottom: `2px solid ${INK}`, fontWeight: 600, color: INK, verticalAlign: "bottom" };
const td: React.CSSProperties = { padding: "10px 12px", borderBottom: `1px solid ${LINE}`, verticalAlign: "top", color: INK };

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
              AlphaJass · Messung
            </p>
            <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(2.1rem, 6vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.01em", color: INK, margin: "0 0 0.9rem" }}>
              Wie stark AlphaJass spielt
            </h1>
            <p style={{ fontFamily: SANS, fontSize: "clamp(17px, 2.2vw, 20px)", lineHeight: 1.65, color: INK, opacity: 0.82, maxWidth: "60ch", margin: 0 }}>
              Eine Jass-KI, die von einer Doktrin geführt wird — wie stark spielt sie? Hier steht die Messung. Jede Zahl
              trägt Seed, Skript und Artefakt; keine erscheint ohne Beweisstück.
            </p>

            <H>Gemessen, nicht behauptet</H>
            <P>
              Gemessen wird paarig: 1000 Kartengaben («Deals» — eine Kartengabe, neun Stiche, 157 Punkte; <em>nicht</em>{" "}
              eine ganze Partie), jede zweimal gespielt mit vertauschten Seiten, identische Blätter für beide Seiten,
              fester Seed. Kein Rosinenpicken möglich. Als Massstab dient der hauseigene Heuristik-Bot — sein Code ist
              über beide Messstände byte-identisch, ein Gegner, der sich nicht bewegt hat.
            </P>
            <div style={{ overflowX: "auto", margin: "1.6em 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: SANS, fontSize: 15, lineHeight: 1.5 }}>
                <thead>
                  <tr>
                    <th style={th}>Paarung (1000 paarige Deals, Seed 42)</th>
                    <th style={th}>vor dem Doktrin-Umbau</th>
                    <th style={th}>
                      nach dem Doktrin-Umbau
                      <br />
                      <span style={{ fontWeight: 400, color: MUTED, fontSize: 12 }}>
                        Messstand jassai&nbsp;20f941b · 16.07.26
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={td}><strong>AlphaJass</strong> gegen den unveränderten Heuristik-Massstab</td>
                    <td style={td}>−6.82 Punkte/Deal</td>
                    <td style={td}>
                      <strong style={{ color: RED }}>+31.97 Punkte/Deal</strong>
                      <br />
                      <span style={{ color: MUTED, fontSize: 13 }}>95%-CI [+27.34, +36.39] · p&nbsp;&lt;&nbsp;10⁻⁶</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={td}>Regelbasierte Konventions-Baseline gegen denselben Massstab</td>
                    <td style={td}>−27.15</td>
                    <td style={td}>−25.61 <span style={{ color: MUTED }}>(unverändert)</span></td>
                  </tr>
                  <tr>
                    <td style={td}>AlphaJass gegen die Konventions-Baseline</td>
                    <td style={td}>+22.90</td>
                    <td style={td}>+68.49</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <P>
              Die Geschichte in diesen Zahlen:{" "}
              <strong>Vor dem Doktrin-Umbau verlor AlphaJass gegen eine einfache Heuristik. Nach dem Umbau schlägt es sie
              um rund 32 Punkte pro Deal.</strong>{" "}Der grösste Treiber ist ausgerechnet Undenufe — zuvor die dokumentierte
              Schwäche des Systems, von −25.7 auf +28.7 Punkte pro Durchgang gedreht. Der grosse Abstand zur
              Konventions-Baseline (+68.49) ist echt, aber mit Vorsicht zu lesen: Diese Baseline unterliegt ihrerseits
              dem einfachen Massstab und ist darum kein starker Referenzgegner. Die aussagekräftige Zahl ist der
              Vergleich gegen den Gegner, der sich nicht bewegt hat.
            </P>

            <H>Was noch nicht gemessen ist</H>
            <P>Wir halten diesen Abschnitt für den wichtigsten. Wer seine Schwäche benennt, dem darf man die Stärke glauben.</P>
            <ul style={{ fontFamily: SANS, fontSize: "clamp(16px, 1.9vw, 18px)", lineHeight: 1.8, color: INK, paddingLeft: "1.4em" }}>
              <li>
                <strong>Gegen Menschen ist nichts gemessen.</strong> Das teilt AlphaJass mit dem gesamten publizierten
                Feld — die Frage «schlagen die besten Jass-Programme die besten Menschen?» ist offen.<sup>1</sup> Wir
                beantworten sie erst, wenn wir sie messen können.
              </li>
              <li>
                <strong>Der Wys ist gespielt, aber nicht vermessen.</strong> Die Arena weist; keine unserer Zahlen deckt
                es ab. Alle Werte gelten für <strong>weisloses Schieber</strong>.
              </li>
              <li>
                <strong>Die Absicht kommt heute aus der Doktrin, nicht aus dem Netz.</strong> Das Netz wählt Karten
                innerhalb des Erlaubten; die Absicht selbst wird symbolisch bestimmt. Sie dem Netz beizubringen, ist die
                Baustelle der nächsten Generation.
              </li>
              <li>
                <strong>Jede Zahl hat ein Datum.</strong> Was hier steht, ist gegen einen <em>eingefrorenen</em> Stand
                gemessen — jassai&nbsp;<code style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "0.85em" }}>20f941b</code>, 16.&nbsp;Juli 2026 —, nicht gegen die Arena von heute. Der Motor wird seither
                weitergebaut; sobald ein neuer Stand steht, wird neu gemessen und neu datiert, nicht nachgebessert.
              </li>
            </ul>
            <P>
              Alle Gegner sind hauseigene Bots; <strong>menschliche Spielstärke ist nicht gemessen.</strong> In
              36&nbsp;000 Entscheidungen je Seite gab es null Rückfälle auf Notlogik. Und es gilt das Hausgesetz dieses
              Dokuments: <strong>Keine Zahl ohne Beweisstück — jeder Wert trägt Seed, Skript und Artefakt im Repository.</strong>
            </P>

            {/* Beweisstücke */}
            <div style={{ margin: "2.6em 0 0", padding: "18px 20px", border: `1px solid ${LINE}`, background: "rgba(255,255,255,0.55)", borderRadius: 12 }}>
              <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 18, margin: "0 0 0.5em", color: INK }}>Beweisstücke</h3>
              <p style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.6, color: MUTED, margin: "0.6em 0" }}>
                Alle Messwerte stammen aus den Evaluations-Läufen 006–009 vom 16.&nbsp;Juli 2026 (Ledger{" "}
                <code>results/LADDER.md</code> im jassai-Repository; Roh-JSON je Lauf mit Seed, n, Konfidenzintervall,
                p-Wert, Fallback-Zählern, Checkpoint-SHA256 und Commit-Stand). Der laufende Server meldet den aktiven
                Konventions-Stand öffentlich unter <code>/health</code>.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.6, color: MUTED, margin: "0.6em 0" }}>
                <strong>Quelle:</strong> ¹&nbsp;Universität Bern, Digital Sustainability Group: «Can the Best Jass AIs
                Beat the Top Humans?» (offene Forschungsfrage); Stolze&nbsp;&amp;&nbsp;Koller (2020), «Challenging Human
                Supremacy: Evaluating MCTS and Deep Learning for the Trick Taking Card Game Jass»,
                doi:10.1007/978-3-030-61534-5_45.
              </p>
            </div>

            <p style={{ fontFamily: SANS, fontSize: "12px", letterSpacing: "0.06em", color: MUTED, marginTop: "2.6rem", textTransform: "uppercase" }}>
              Jassverband Schweiz · Messung · Stand 16.07.2026
            </p>

            <p style={{ fontFamily: SANS, fontSize: "14.5px", color: MUTED, marginTop: "1.6rem" }}>
              → Wie diese Stärke zustande kommt, steht im Bauplan:{" "}
              <Link href={`/${locale}/research/wie-alphajass-denkt`} style={{ color: RED }} className="hover:underline">
                Wie AlphaJass denkt
              </Link>.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

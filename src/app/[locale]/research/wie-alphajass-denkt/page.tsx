import { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

/**
 * RESEARCH-PAPER «Wie AlphaJass denkt — Drei Bilder, vier Siebe, ein Satz»
 *
 * JVS-gebrandete Fassung der Doktrin-Architektur-Vorlage (Artifact 17f9d321).
 * Struktur der Vorlage, Look des Verbands (Creme/Capita/Rot statt dunkel).
 *
 * REGELN (AUSHÄNGESCHILD 17.07.26):
 * - Jasssprache gegen den jasswiki-Korpus geeicht: «das Nell» (nicht den),
 *   «Farbe bedienen»/«kein Untertrumpfen» (belegte Verben statt «Bedienpflicht»).
 *   anziehen/aufbauen/verwerfen/halten/Puur/Bock/Matsch = korpus-belegt.
 * - Status-Badges sind die EHRLICHKEITS-GRENZE: was gebaut ist, heisst «Gebaut»;
 *   das Farbenbild ist «Phase 0» (Entwurf, NICHT live) — keine Behauptung ohne
 *   Artefakt (STATIK-Regel). Badges von GEOMETER gegen die Anlage verifiziert.
 * - Inhalt Deutsch (Doktrin-Sprache); die Seiten-Chrome (Nav/Footer) lokalisiert.
 */

const BASE_URL = "https://jassverband.ch";
const CANONICAL = `${BASE_URL}/de/research/wie-alphajass-denkt`;

// Farb-Töne, für Creme-Hintergrund lesbar abgedunkelt
const C = {
  ink: "var(--color-foreground)",
  muted: "var(--color-foreground-muted)",
  red: "var(--color-primary)",
  serif: "var(--font-capita), Capita, Georgia, serif",
  sans: "var(--font-inter), Inter, system-ui, sans-serif",
  gebaut: "#2e7d3f",
  geplant: "#b6841c",
  laeuft: "#2f6f9f",
  rosen: "#c0392b",
  eichel: "#a9763a",
  schilten: "#2f6f9f",
  schellen: "#b6841c",
  line: "rgba(22,21,19,0.14)",
  cardBg: "rgba(255,255,255,0.55)",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Wie AlphaJass denkt — Drei Bilder, vier Siebe, ein Satz";
  const description =
    "Die Doktrin-Architektur der Jass-KI des Jassverbands Schweiz: drei Fakten-Bilder, ein Trichter aus vier Sieben, und jeder Schritt spricht einen Satz. Erklärbarkeit als Bauprinzip, nicht als Nachgedanke.";
  return {
    title: `${title} | Jassverband Schweiz`,
    description,
    // Privat (Remo 18.07.): nur per Direktlink, nicht öffentlich indexiert.
    robots: { index: false, follow: false },
    alternates: {
      canonical: CANONICAL,
      languages: {
        de: `${BASE_URL}/de/research/wie-alphajass-denkt`,
        fr: `${BASE_URL}/fr/research/wie-alphajass-denkt`,
        it: `${BASE_URL}/it/research/wie-alphajass-denkt`,
        "x-default": CANONICAL,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/research/wie-alphajass-denkt`,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: "Wie AlphaJass denkt",
  alternativeHeadline: "Drei Bilder, vier Siebe, ein Satz — die Doktrin-Architektur",
  inLanguage: "de-CH",
  datePublished: "2026-07-17",
  version: "1.0",
  url: CANONICAL,
  about: [
    { "@type": "Thing", name: "Jass (Schweizer Kartenspiel)" },
    { "@type": "Thing", name: "Erklärbare künstliche Intelligenz" },
    { "@type": "Thing", name: "Intention-Engine" },
  ],
  author: { "@type": "Organization", name: "Jassverband Schweiz", url: BASE_URL },
  publisher: { "@type": "Organization", name: "Jassverband Schweiz", url: BASE_URL },
};

function Band({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.9rem",
        flexWrap: "wrap",
        margin: "0 0 1.5rem",
        borderBottom: `2px solid ${C.ink}`,
        paddingBottom: "0.7rem",
      }}
    >
      <span
        style={{
          fontFamily: C.sans,
          fontSize: "12px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.muted,
          fontWeight: 600,
        }}
      >
        {n}
      </span>
      <h2
        style={{
          fontFamily: C.serif,
          fontWeight: 700,
          fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
          margin: 0,
          color: C.ink,
        }}
      >
        {title}
      </h2>
      <span
        style={{
          fontFamily: C.sans,
          fontSize: "13.5px",
          color: C.muted,
          marginLeft: "auto",
        }}
      >
        {sub}
      </span>
    </div>
  );
}

function Status({ kind, children }: { kind: "gebaut" | "geplant" | "laeuft"; children: ReactNode }) {
  const color = kind === "gebaut" ? C.gebaut : kind === "geplant" ? C.geplant : C.laeuft;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        fontFamily: C.sans,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "0.24rem 0.6rem",
        borderRadius: 100,
        border: `1px solid ${color}`,
        color,
        width: "fit-content",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {children}
    </span>
  );
}

function Bild({
  status,
  statusKind,
  title,
  children,
  file,
}: {
  status: string;
  statusKind: "gebaut" | "geplant" | "laeuft";
  title: string;
  children: ReactNode;
  file?: string;
}) {
  return (
    <div
      style={{
        background: C.cardBg,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: "1.3rem 1.3rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      <Status kind={statusKind}>{status}</Status>
      <h3 style={{ fontFamily: C.serif, fontSize: "1.2rem", fontWeight: 700, margin: "0.2rem 0 0", color: C.ink }}>
        {title}
      </h3>
      <div style={{ fontFamily: C.sans, fontSize: "14.5px", lineHeight: 1.6, color: C.muted }}>{children}</div>
      {file && (
        <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "12px", color: C.muted, marginTop: "auto" }}>
          {file}
        </span>
      )}
    </div>
  );
}

function Sieve({
  n,
  title,
  flag,
  out,
  width,
  children,
}: {
  n: string;
  title: string;
  flag?: string;
  out: string;
  width: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width,
        maxWidth: "100%",
        background: C.cardBg,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: "1.1rem 1.4rem",
        display: "grid",
        gridTemplateColumns: "2rem 1fr auto",
        alignItems: "center",
        gap: "1.1rem",
      }}
    >
      <span style={{ fontFamily: C.serif, fontStyle: "italic", fontSize: "1.5rem", color: C.muted, textAlign: "center" }}>
        {n}
      </span>
      <div>
        <h3 style={{ fontFamily: C.serif, fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.2rem", color: C.ink }}>
          {title}
          {flag && (
            <span
              style={{
                fontFamily: C.sans,
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.red,
                border: `1px solid ${C.red}`,
                borderRadius: 4,
                padding: "0.05rem 0.4rem",
                marginLeft: "0.6rem",
                verticalAlign: "middle",
              }}
            >
              {flag}
            </span>
          )}
        </h3>
        <p style={{ fontFamily: C.sans, fontSize: "14px", lineHeight: 1.6, color: C.muted, margin: 0 }}>{children}</p>
      </div>
      <span
        style={{
          fontFamily: C.sans,
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: C.muted,
          textAlign: "right",
          whiteSpace: "nowrap",
        }}
      >
        {out}
      </span>
    </div>
  );
}

const SUITS = [
  { name: "Rosen", strength: "Ass + 3", role: "anziehen", color: C.rosen },
  { name: "Eichel", strength: "König²", role: "aufbauen", color: C.eichel },
  { name: "Schilten", strength: "7, Under", role: "verwerfen", color: C.schilten },
  { name: "Schellen", strength: "1 Trumpf", role: "halten", color: C.schellen },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article style={{ background: "var(--color-cream)" }} className="py-12 md:py-20">
        <div className="container-main">
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            {/* Zurück */}
            <Link
              href={`/${locale}/research`}
              style={{ fontFamily: C.sans, fontSize: "14px", color: C.muted, textDecoration: "none" }}
              className="hover:underline"
            >
              ← Forschung
            </Link>

            {/* Kopf */}
            <p
              style={{
                fontFamily: C.sans,
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.red,
                fontWeight: 700,
                margin: "1.8rem 0 0.9rem",
              }}
            >
              AlphaJass · Doktrin-Architektur
            </p>
            <h1
              style={{
                fontFamily: C.serif,
                fontWeight: 700,
                fontSize: "clamp(2.1rem, 6vw, 3.4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: C.ink,
                margin: "0 0 0.9rem",
              }}
            >
              Wie AlphaJass denkt
            </h1>
            <p style={{ fontFamily: C.sans, fontSize: "clamp(17px, 2.2vw, 20px)", lineHeight: 1.65, color: C.ink, opacity: 0.82, maxWidth: "60ch", margin: 0 }}>
              Kein if-then-Baum. Die Maschine hält <strong>drei Bilder</strong> immer aktuell, lässt die
              Entscheidung durch <strong>vier Siebe</strong> fliessen — und jeder Schritt spricht{" "}
              <strong>einen Satz</strong>. Das ist der ganze Motor. Der Rest ist Training.
            </p>

            <hr style={{ border: 0, height: 1, background: C.line, margin: "3rem 0" }} />

            {/* DREI BILDER */}
            <Band n="Was die Maschine weiss" title="Drei Bilder" sub="Fakten, keine Entscheide — alle gleichzeitig aktuell" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem" }}>
              <Bild status="Gebaut" statusKind="gebaut" title="Situationsbild" file="netz/situationsbild.py">
                Die Lage. Rund 47 Fakten: wer gewinnt, meine Rolle, Matsch-Gefahr, Trumpfzahl, Punkte übrig.
              </Bild>

              <Bild status="Phase 0 — das eine Neue" statusKind="geplant" title="Farbenbild">
                Die vier Farben, Trumpf ist Zeile&nbsp;4. Pro Zeile: <strong style={{ color: C.ink }}>Stärke + Rolle</strong>.
                Der Plan steht nach dem Austeilen.
                <div style={{ marginTop: "0.8rem", borderTop: `1px solid ${C.line}`, paddingTop: "0.7rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {SUITS.map((s) => (
                    <div key={s.name} style={{ display: "grid", gridTemplateColumns: "12px 4.5rem 1fr auto", alignItems: "center", gap: "0.5rem", fontSize: "13px" }}>
                      <span style={{ width: 11, height: 11, borderRadius: 3, background: s.color }} />
                      <span style={{ color: C.ink }}>{s.name}</span>
                      <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "11.5px", color: C.muted }}>{s.strength}</span>
                      <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "11.5px", color: s.color, textAlign: "right" }}>{s.role}</span>
                    </div>
                  ))}
                </div>
              </Bild>

              <Bild status="Scanner gebaut" statusKind="laeuft" title="Spielerbild" file="netz/spielerbild.py">
                Die Brille pro Sitz: welche Schulen jeder folgt — Nell-vor-Puur, Verwerf-Schule, Austrumpf-Zählung.
                Der Scanner steht; seine Brille fliesst noch nicht in die Kartenwahl.
              </Bild>
            </div>

            {/* Doppelnutzen */}
            <div
              style={{
                marginTop: "1.4rem",
                background: "rgba(182,132,28,0.08)",
                border: `1px solid rgba(182,132,28,0.32)`,
                borderRadius: 12,
                padding: "1rem 1.2rem",
                fontFamily: C.sans,
                fontSize: "14.5px",
                lineHeight: 1.6,
                color: C.ink,
              }}
            >
              <strong>Der Doppelnutzen des Farbenbilds.</strong> Eine Tabelle, zwei Verwendungen: seine{" "}
              <strong>Rollen</strong> werden Lage-Wörter, gegen die die Intentionen prüfen (Sieb&nbsp;2) — und seine{" "}
              <strong>Stärke-Ordnung</strong> wählt später die Farbe (Sieb&nbsp;3). Es <em>verfeinert</em> das System,
              statt es zu verkomplizieren.
            </div>

            <hr style={{ border: 0, height: 1, background: C.line, margin: "3rem 0" }} />

            {/* VIER SIEBE */}
            <Band n="Wie die Entscheidung fliesst" title="Vier Siebe" sub="Der Trichter — von allen Karten zur einen" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
              <Sieve n="1" title="Spielregel-Riegel" out="→ erlaubte Karten" width="100%">
                Schneidet auf die <strong style={{ color: C.ink }}>legalen</strong> Züge. Farbe bedienen, kein
                Untertrumpfen — nichts Illegales überlebt.
              </Sieve>
              <span style={{ color: C.muted }}>▼</span>
              <Sieve n="2" title="Intention-Netz" flag="Konvention zuoberst" out="→ eine Absicht" width="92%">
                Alle Regeln <strong style={{ color: C.ink }}>gleichzeitig</strong> über die drei Bilder gehalten.
                Konvention schlägt Kalkül; bei Überlapp gewinnt die <strong style={{ color: C.ink }}>spezifischste</strong>{" "}
                Regel — kein fester Rang (ein Gleichstand heisst: ein Lage-Wort fehlt).
              </Sieve>
              <span style={{ color: C.muted }}>▼</span>
              <Sieve n="3" title="Karten-Wahl — die zwei Lineale" out="→ die Karte" width="84%">
                Das Verb der Absicht × <strong style={{ color: C.schilten }}>Farbenbild</strong> (welche Farbe) ×{" "}
                <strong style={{ color: C.schellen }}>Rang-Lineal</strong> (was «hoch/tief» hier heisst). Der Schnittpunkt
                ist die Karte.
              </Sieve>
              <span style={{ color: C.muted }}>▼</span>
              <Sieve n="4" title="Riegel" out="→ geprüft" width="76%">
                Letztes Netz: keine Karte ausserhalb der erlaubten Menge, kein Zwang ohne Karte. Nicht abschaltbar.
              </Sieve>
            </div>

            <hr style={{ border: 0, height: 1, background: C.line, margin: "3rem 0" }} />

            {/* EIN SATZ */}
            <Band n="Warum jeder Zug erklärbar ist" title="Ein Satz" sub="Lage → Absicht → Griff, nie getippt — erzeugt" />
            <div
              style={{
                background: "rgba(255,255,255,0.6)",
                border: `1px solid ${C.line}`,
                borderRadius: 16,
                padding: "1.6rem 1.8rem",
                maxWidth: 620,
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <p style={{ fontFamily: C.sans, fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gebaut, margin: "0 0 0.7rem" }}>
                Ausgabe · Trumpf spielen: stärkster ausser dem Nell
              </p>
              <blockquote style={{ fontFamily: C.serif, fontStyle: "italic", fontSize: "clamp(1.1rem, 2.4vw, 1.4rem)", lineHeight: 1.5, color: C.ink, margin: 0 }}>
                „Der Partner hat den Puur geführt — das Nell wird gleich zum Bock. Also das Nell aufheben und den
                anderen Trumpf zugeben.“
              </blockquote>
              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem 1.4rem", fontFamily: C.sans, fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: C.muted }}>
                <span>Lage · Partner führt Puur</span>
                <span>Absicht · Bock aufbauen</span>
                <span>Griff · Nell schützen</span>
              </div>
            </div>

            {/* Notizen */}
            <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ borderLeft: `2px solid ${C.line}`, padding: "0.2rem 0 0.2rem 1rem", fontFamily: C.sans, fontSize: "14px", lineHeight: 1.6, color: C.muted }}>
                <strong style={{ color: C.ink }}>Der Team-Schalter (G29).</strong> Ob ich meinen Plan überhaupt spiele,
                entscheidet die Rolle: offensiv <strong style={{ color: C.ink }}>gestalte</strong> ich das Farbenbild,
                defensiv <strong style={{ color: C.ink }}>reagiere</strong> ich — eigener Plan nur bei starkem Blatt.
              </div>
              <div style={{ borderLeft: `2px solid ${C.line}`, padding: "0.2rem 0 0.2rem 1rem", fontFamily: C.sans, fontSize: "14px", lineHeight: 1.6, color: C.muted }}>
                <strong style={{ color: C.ink }}>Warum es Gen 2 überlebt.</strong> Konventionen bleiben ewig (ein
                Selfplay-Modell erfindet sie nie). Die Strategie hinter Farbenbild und Linealen tauscht ein gelerntes
                Modell gegen eine gelernte Heuristik — Rahmen und Satz bleiben.
              </div>
            </div>

            {/* Legende + Signatur */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.4rem", marginTop: "2.4rem", fontFamily: C.sans, fontSize: "12.5px", color: C.muted }}>
              {[
                { c: C.gebaut, t: "gebaut" },
                { c: C.geplant, t: "Phase 0 (nächster Bau)" },
                { c: C.laeuft, t: "läuft" },
              ].map((l) => (
                <span key={l.t} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.c }} />
                  {l.t}
                </span>
              ))}
            </div>

            <p style={{ fontFamily: C.sans, fontSize: "12px", letterSpacing: "0.06em", color: C.muted, marginTop: "2.6rem", textTransform: "uppercase" }}>
              Jassverband Schweiz · Drei Bilder · vier Siebe · ein Satz · Stand 17.07.2026
            </p>

            <p style={{ fontFamily: C.sans, fontSize: "14.5px", color: C.muted, marginTop: "1.6rem" }}>
              → Wie stark dieser Motor spielt, steht in der Messung:{" "}
              <Link
                href={`/${locale}/research/wie-stark-alphajass-spielt`}
                style={{ color: C.red }}
                className="hover:underline"
              >
                Wie stark AlphaJass spielt
              </Link>.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

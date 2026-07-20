"use client";

import { useMemo, useState } from "react";
import type { SchaltpultData, SchaltpultRegel, SchaltpultTyp } from "./schaltpultData";

/**
 * Das interaktive Schaltpult — JVS-Creme-Portierung von GEOMETERs Denksystem-Whitepaper
 * (Artifact c4eeca5b). Suche + Filter über die Regel-Registry, driftfrei: die Daten
 * kommen aus schaltpultData.ts, das GEOMETER code-aktuell aus jassai erzeugt.
 *
 * Typ-Farbcodierung bewusst erhalten (didaktisch): Konvention grün · Strategie gold ·
 * Riegel terrakotta — sonst verliert das Board seine Lesbarkeit.
 */

const KON = "#2e7d3f";
const STR = "#b6841c";
const RIE = "#a6503c";
const INK = "var(--color-foreground)";
const MUTED = "var(--color-foreground-muted)";
const SANS = "var(--font-inter), Inter, system-ui, sans-serif";
const MONO = "ui-monospace, Menlo, Consolas, monospace";
const LINE = "rgba(22,21,19,0.14)";
const SURFACE = "rgba(255,255,255,0.6)";

const TYP_COLOR: Record<SchaltpultTyp, string> = { konvention: KON, strategie: STR, riegel: RIE };
const TYP_BG: Record<SchaltpultTyp, string> = {
  konvention: "rgba(46,125,63,0.10)",
  strategie: "rgba(182,132,28,0.10)",
  riegel: "rgba(166,80,60,0.10)",
};
const TYP_LABEL: Record<SchaltpultTyp, string> = {
  konvention: "Konventionen — schaltbare Absprachen",
  strategie: "Strategie — universell, fest",
  riegel: "Riegel — Auffang",
};
const VERB_COLOR: Record<string, string> = { ZWANG: KON, FILTER: STR, VERBOT: RIE, FRAGE: "#6e7c74" };
const VERBGLOSS: Record<string, string> = {
  ZWANG: "spiele diese Karte",
  FILTER: "nur aus dieser Menge",
  VERBOT: "nie diese Karte",
  FRAGE: "delegiert ans Modell",
};
const ORDER: SchaltpultTyp[] = ["konvention", "strategie", "riegel"];
const FILTERS: { key: "alle" | SchaltpultTyp; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "konvention", label: "Konvention" },
  { key: "strategie", label: "Strategie" },
  { key: "riegel", label: "Riegel" },
];

function matches(r: SchaltpultRegel, term: string): boolean {
  if (!term) return true;
  const hay = `${r.id} ${r.intent} ${r.g_ref ?? ""} ${r.selektor} ${r.wenn.join(" ")}`.toLowerCase();
  return hay.includes(term);
}

function Chip({ cond }: { cond: string }) {
  const neg = cond.startsWith("nicht ");
  const txt = neg ? cond.slice(6) : cond;
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 12,
        padding: "3px 8px",
        borderRadius: 6,
        background: "rgba(255,255,255,0.5)",
        border: `1px solid ${LINE}`,
        color: neg ? RIE : MUTED,
        textDecoration: neg ? "line-through" : "none",
        textDecorationColor: neg ? "rgba(166,80,60,0.55)" : undefined,
        whiteSpace: "nowrap",
      }}
    >
      {txt}
    </span>
  );
}

function RuleCard({ r }: { r: SchaltpultRegel }) {
  const color = TYP_COLOR[r.typ];
  return (
    <div
      style={{
        background: SURFACE,
        border: `1px solid ${LINE}`,
        borderLeft: `4px solid ${color}`,
        borderRadius: 11,
        padding: "15px 17px",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "9px 12px", marginBottom: 11 }}>
        <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: INK }}>{r.id}</span>
        {r.g_ref && (
          <span style={{ fontFamily: SANS, fontSize: 11, color: MUTED, border: `1px solid ${LINE}`, padding: "1px 7px", borderRadius: 5 }}>
            {r.g_ref}
          </span>
        )}
        <span
          style={{
            fontFamily: SANS,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.05em",
            marginLeft: "auto",
            padding: "3px 9px",
            borderRadius: 20,
            background: TYP_BG[r.typ],
            color,
          }}
        >
          {r.intent}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, marginRight: 2 }}>
          Wenn
        </span>
        {r.wenn.map((c, i) => (
          <Chip key={i} cond={c} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${LINE}` }}>
        <span
          style={{
            fontFamily: SANS,
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: "0.06em",
            padding: "3px 9px",
            borderRadius: 6,
            color: "#fff",
            background: VERB_COLOR[r.dann_art] ?? "#6e7c74",
          }}
        >
          {r.dann_art}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 12.5, color: INK }}>{r.selektor}</span>
        <span style={{ fontFamily: SANS, fontSize: 13, color: MUTED, fontStyle: "italic" }}>— {VERBGLOSS[r.dann_art] ?? ""}</span>
      </div>
    </div>
  );
}

export default function SchaltpultBoard({ data }: { data: SchaltpultData }) {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState<"alle" | SchaltpultTyp>("alle");
  const t = term.trim().toLowerCase();

  const groups = useMemo(() => {
    return ORDER.filter((typ) => filter === "alle" || filter === typ)
      .map((typ) => ({ typ, rules: data.regeln.filter((r) => r.typ === typ && matches(r, t)) }))
      .filter((g) => g.rules.length > 0);
  }, [data.regeln, filter, t]);

  const shown = groups.reduce((n, g) => n + g.rules.length, 0);

  // Legende: nur Prädikate, die in einer Regel vorkommen (nicht-Präfix entfernt)
  const usedPraed = useMemo(() => {
    const used = new Set<string>();
    data.regeln.forEach((r) =>
      r.wenn.forEach((c) => {
        const k = c.replace(/^nicht /, "").split(" ")[0];
        if (data.praedikate[k]) used.add(k);
      }),
    );
    return [...used].sort();
  }, [data.regeln, data.praedikate]);

  return (
    <div>
      <style>{`
        .sp-input:focus { border-color: ${KON} !important; box-shadow: 0 0 0 3px rgba(46,125,63,0.16); }
        .sp-fbtn { transition: .14s; cursor: pointer; }
        .sp-fbtn:hover { border-color: ${MUTED}; }
        .sp-legend > summary { list-style: none; }
        .sp-legend > summary::-webkit-details-marker { display: none; }
        .sp-legend > summary::before { content: "+"; color: ${KON}; font-size: 18px; margin-right: 8px; }
        .sp-legend[open] > summary::before { content: "\\2013"; }
      `}</style>

      {/* Steuerung */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", margin: "0 0 16px" }}>
        <div style={{ flex: 1, minWidth: 220, position: "relative" }}>
          <input
            className="sp-input"
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="ANZIEHEN, hat_puur, geschoben, G14 …"
            aria-label="Regeln durchsuchen"
            style={{
              width: "100%",
              fontFamily: MONO,
              fontSize: 14,
              color: INK,
              background: "rgba(255,255,255,0.7)",
              border: `1px solid ${LINE}`,
              borderRadius: 9,
              padding: "11px 14px",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const col = f.key === "alle" ? INK : TYP_COLOR[f.key as SchaltpultTyp];
            return (
              <button
                key={f.key}
                type="button"
                className="sp-fbtn"
                aria-pressed={active}
                onClick={() => setFilter(f.key)}
                style={{
                  fontFamily: SANS,
                  fontSize: 12.5,
                  fontWeight: 600,
                  padding: "8px 13px",
                  borderRadius: 20,
                  border: `1px solid ${active ? col : LINE}`,
                  background: active ? col : "rgba(255,255,255,0.5)",
                  color: active ? "#fff" : MUTED,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <p style={{ fontFamily: SANS, fontSize: 12.5, color: MUTED, margin: "0 0 16px", letterSpacing: "0.02em" }}>
        <b style={{ color: INK, fontWeight: 600 }}>{shown}</b> von <b style={{ color: INK, fontWeight: 600 }}>{data.regeln.length}</b> Regeln
        {t ? ` für «${term}»` : ""}
      </p>

      {/* Board */}
      {groups.length === 0 ? (
        <p style={{ textAlign: "center", color: MUTED, padding: 40, fontStyle: "italic", fontFamily: SANS }}>
          Keine Regel passt auf «{term}».
        </p>
      ) : (
        groups.map((g) => (
          <div key={g.typ}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "26px 0 12px" }}>
              <h4 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 800, margin: 0, letterSpacing: "0.02em", color: TYP_COLOR[g.typ] }}>
                {TYP_LABEL[g.typ]} · {g.rules.length}
              </h4>
              <span style={{ flex: 1, height: 1, background: LINE }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {g.rules.map((r, i) => (
                <RuleCard key={`${r.id}-${i}`} r={r} />
              ))}
            </div>
          </div>
        ))
      )}

      {/* Prädikat-Legende */}
      <details className="sp-legend" style={{ marginTop: 24, border: `1px solid ${LINE}`, borderRadius: 11, background: "rgba(255,255,255,0.4)" }}>
        <summary style={{ cursor: "pointer", padding: "15px 18px", fontFamily: SANS, fontSize: 14, fontWeight: 700, color: INK }}>
          Prädikat-Legende — was jeder Auslöser bedeutet
        </summary>
        <div style={{ padding: "4px 18px 18px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px 24px" }}>
          {usedPraed.map((k) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, padding: "7px 0", borderTop: `1px solid ${LINE}`, alignItems: "baseline" }}>
              <code style={{ fontFamily: MONO, fontSize: 12.5, color: KON, whiteSpace: "nowrap" }}>{k}</code>
              <span style={{ fontFamily: SANS, fontSize: 13.5, color: MUTED }}>{data.praedikate[k]}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

/**
 * TYPEN + Verdrahtung des interaktiven Schaltpults.
 *
 * Die DATEN liegen in `schaltpultData.json` — GEOMETER erzeugt sie CODE-AKTUELL aus jassai
 * (regeln.py + intentionen.py + situationsbild), driftfrei: kein Abtippen. Beim nächsten
 * Doktrin-Umbau wird nur die `.json` neu eingespielt, Typen + Darstellung bleiben.
 *
 * Aktueller Stand: jassai 37bbf9d (2026-07-19), gegen /health als live verifiziert —
 * 73 Regeln (26 Konvention · 44 Strategie · 3 Riegel), 18 Intentionen, 46 Prädikate.
 *
 * Hinweis (GEOMETER): `typ` ist die Datenwahrheit (Feld in regeln.py), nicht die
 * Kommentar-Überschrift — das Board gruppiert nach dem Feld. Die Kennzahl «conventions:106»
 * aus /health ist eine jass-server-Grösse, NICHT die Regelzahl (die ist 73).
 */

import raw from "./schaltpultData.json";

export type SchaltpultTyp = "konvention" | "strategie" | "riegel";
export type SchaltpultDannArt = "ZWANG" | "FILTER" | "VERBOT" | "FRAGE";

export interface SchaltpultRegel {
  id: string;
  typ: SchaltpultTyp;
  klasse?: number;
  intent: string;
  selektor: string;
  dann_art: SchaltpultDannArt;
  g_ref?: string;
  wenn: string[];
}

export interface SchaltpultStand {
  commit?: string;
  datum?: string;
  n_regeln?: number;
  n_konventionen?: number;
  n_strategie?: number;
  n_riegel?: number;
  n_intentionen?: number;
}

export interface SchaltpultData {
  stand: SchaltpultStand;
  intentionen: Record<string, string>;
  praedikate: Record<string, string>;
  regeln: SchaltpultRegel[];
}

export const SCHALTPULT = raw as unknown as SchaltpultData;

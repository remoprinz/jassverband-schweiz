/**
 * TURNIERE — Jassverband Schweiz
 *
 * Maschinenlesbarer Turnier-Hub: Jeder Eintrag wird auf der Detailseite als
 * schema.org/Event (JSON-LD) ausgeliefert, damit Suchmaschinen und
 * KI-Assistenten das Turnier als strukturiertes Ereignis erkennen
 * (Datum, Ort, Preis, Veranstalter, Anmeldung).
 *
 * So fügen Sie ein Turnier hinzu:
 * 1. Bestehenden Block kopieren, slug/Datum/Ort/Preis anpassen.
 * 2. Strukturierte Felder (startDate, location, price …) exakt und belegt füllen —
 *    NICHTS erfinden. Fehlt eine Angabe, Feld weglassen.
 * 3. Plakat als WebP unter public/assets/turniere/<slug>/ ablegen.
 * 4. Editorialen Text (de/fr/it) als Markdown einfügen — die Logistik steht im
 *    Fakten-Block (aus den strukturierten Feldern), der Text erzählt die Geschichte.
 * 5. Speichern und pushen → Turnier ist live und im Sitemap.
 */

export interface TournamentLocation {
  /** Name des Austragungsorts, z. B. "Salle de gym de Randogne". */
  name: string;
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  /** Kantonskürzel, z. B. "VS". */
  addressRegion: string;
  /** Ländercode, z. B. "CH". */
  addressCountry: string;
  /** Optionaler Suchbegriff für einen Google-Maps-Link. */
  mapsQuery?: string;
}

export interface TournamentOrganizer {
  name: string;
  /** Website / Instagram des Veranstalters. */
  url?: string;
}

export interface TournamentPoster {
  src: string;
  alt: string;
  /** Seitenverhältnis Breite/Höhe (Default 210/297 = A-Format Hochformat). */
  aspect?: number;
}

export interface TournamentPrice {
  amount: number;
  /** ISO-Währung, z. B. "CHF". */
  currency: string;
}

export interface TournamentContent {
  title: string;
  excerpt: string;
  /** Editorialer Fliesstext (Markdown) — die Geschichte, nicht die Logistik. */
  content: string;
  /** Einzeiler zum Spielmodus (steht im Fakten-Block). */
  format: string;
  /** Zusatz zum Preis, z. B. "pro Zweierteam, Raclette inklusive". */
  priceNote: string;
}

export interface Tournament {
  slug: string;
  publishedAt: string; // ISO-Datum: YYYY-MM-DD
  updatedAt?: string;
  featured: boolean;

  // --- Strukturiert, sprachunabhängig (füttern das schema.org/Event) ---
  /** Beginn inkl. Zeitzone, z. B. "2026-09-05T10:00:00+02:00". */
  startDate: string;
  /** Ende inkl. Zeitzone. */
  endDate: string;
  /** Türöffnung / Rendez-vous als Anzeige-Zeit, z. B. "09:45". */
  doorsOpenTime?: string;
  location: TournamentLocation;
  organizer: TournamentOrganizer;
  price?: TournamentPrice;
  /** Anmelde-Link (z. B. Google-Formular). Fehlt er, greift Telefon/QR als Fallback. */
  registrationUrl?: string;
  /** Anmelde-Telefon / SMS, z. B. "+41 79 190 66 13". */
  registrationPhone?: string;
  /** Anmeldeschluss als ISO-Datum, z. B. "2026-08-31". */
  registrationDeadline?: string;
  poster?: TournamentPoster;
  tags: string[];
  /** Soft-Launch-Schalter: sichtbar NUR in diesen Locales. Fehlt das Feld,
   *  ist das Turnier in allen Sprachen sichtbar. Beispiel: ["fr"] = nur Romandie. */
  visibleLocales?: string[];

  // --- Lokalisiert ---
  de: TournamentContent;
  fr: TournamentContent;
  it: TournamentContent;
}

export const tournaments: Tournament[] = [
  {
    slug: "tournoi-de-jass-randogne-mollens",
    publishedAt: "2026-07-15",
    featured: true,
    startDate: "2026-09-05T10:00:00+02:00",
    endDate: "2026-09-05T17:00:00+02:00",
    doorsOpenTime: "09:45",
    location: {
      name: "Salle de gym de Randogne",
      streetAddress: "Route Cantonale Sierre-Montana 26",
      postalCode: "3975",
      addressLocality: "Randogne",
      addressRegion: "VS",
      addressCountry: "CH",
      mapsQuery: "Salle de gym Randogne, Route Cantonale Sierre-Montana 26, 3975 Randogne",
    },
    organizer: {
      name: "Jeunesse de Randogne-Mollens",
      url: "https://www.instagram.com/jeunesse_randogne_mollens/",
    },
    price: { amount: 50, currency: "CHF" },
    // Anmelde-Formular: aus dem QR-Code des Original-Plakats dekodiert und
    // verifiziert (HTTP 200, Titel «Inscriptions - Tournoi de jass», nennt
    // Randogne/binôme/raclette/5 septembre) — nicht geraten.
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScjhuqPhWR59OwwGWQeiyIfwxjUaecCVv2PdFllWORWVD12oA/viewform",
    registrationPhone: "+41 79 190 66 13",
    registrationDeadline: "2026-08-31",
    poster: {
      src: "/assets/turniere/tournoi-de-jass-randogne-mollens/plakat.webp",
      alt: "Plakat: Tournoi de Jass der Jeunesse Randogne-Mollens am 5. September 2026 in der Turnhalle Randogne.",
      aspect: 210 / 297,
    },
    tags: ["Turnier", "Wallis", "Nachwuchs"],
    // Soft-Launch (16.07.26, Auftrag Remo): vorerst NUR in der Romandie (FR)
    // einblenden. Zum Ausrollen auf DE/IT dieses Feld erweitern oder entfernen.
    visibleLocales: ["fr"],
    fr: {
      title: "Tournoi de Jass de la Jeunesse de Randogne-Mollens",
      excerpt:
        "Le 5 septembre 2026, la Jeunesse de Randogne-Mollens organise son tournoi de jass en atout libre à la salle de gym de Randogne — 50 CHF par binôme, raclette comprise. La Fédération Suisse de Jass soutient avec plaisir la relève.",
      format:
        "5 matchs de qualification en poule, puis phases finales (1 à 5 matchs selon le tableau). Jeu en atout libre, 8 manches par partie.",
      priceNote: "par binôme, raclette de midi comprise · paiement Twint ou cash",
      content: `## Quand la jeunesse jasse

La Jeunesse de Randogne-Mollens réunit une quarantaine de jeunes de 16 à 30 ans. Née en 2022 sous l'impulsion de l'association Anim' Randogne-Bluche, elle s'est donné pour but « de dynamiser la vie des villages, et de tisser et conserver des liens entre les jeunes de la région ». Week-ends à la cabane, vin chaud de Noël, bar à ski sur la place d'Ycoor, soirées raclette, grillades et **jeux de société** le premier samedi du mois : ce tournoi de jass s'inscrit tout naturellement dans leur ADN.

## Pourquoi nous en parlons

À la Fédération Suisse de Jass, nous ne nous contentons pas de lister les tournois : nous mettons en avant celles et ceux qui font vivre le jass sur le terrain. Une jeunesse valaisanne qui organise elle-même son tournoi — et qui n'imaginerait pas un jass sans raclette —, c'est exactement la relève que nous voulons soutenir.

## S'inscrire

Les inscriptions se font par équipe de deux, via le formulaire (QR-code sur l'affiche) ou par SMS au 079 190 66 13, jusqu'au 31 août 2026.`,
    },
    de: {
      title: "Jassturnier der Jeunesse Randogne-Mollens",
      excerpt:
        "Am 5. September 2026 richtet die Jeunesse Randogne-Mollens ihr Jassturnier im freien Trumpf in der Turnhalle Randogne aus — 50 CHF pro Zweierteam, Raclette inklusive. Der Jassverband Schweiz unterstützt den Nachwuchs mit Freude.",
      format:
        "5 Qualifikationsrunden in Gruppen, danach Finalphasen (1 bis 5 Spiele je nach Tableau). Gespielt wird mit freiem Trumpf, 8 Runden pro Partie.",
      priceNote: "pro Zweierteam, Mittags-Raclette inklusive · Zahlung per Twint oder bar",
      content: `## Wenn die Jugend jasst

Die Jeunesse Randogne-Mollens versammelt rund vierzig junge Leute zwischen 16 und 30 Jahren. 2022 auf Impuls des Vereins Anim' Randogne-Bluche gegründet, hat sie sich vorgenommen, «das Dorfleben zu beleben und die Bande zwischen den Jungen der Region zu knüpfen und zu bewahren». Hütten-Wochenenden, Weihnachts-Glühwein, Ski-Bar auf dem Ycoor-Platz, Raclette-, Grill- und **Gesellschaftsspiel-Abende** am ersten Samstag im Monat: Ein Jassturnier passt bruchlos in diese DNA.

## Warum wir darüber schreiben

Der Jassverband Schweiz listet Turniere nicht bloss auf — wir stellen jene vor, die den Jass vor Ort am Leben halten. Eine Walliser Jeunesse, die ihr Turnier selbst organisiert und sich einen Jass ohne Raclette gar nicht vorstellen mag, ist genau der Nachwuchs, den wir fördern wollen.

## Anmelden

Angemeldet wird im Zweierteam — über das Formular (QR-Code auf dem Plakat) oder per SMS an 079 190 66 13, bis zum 31. August 2026.`,
    },
    it: {
      title: "Torneo di Jass della Jeunesse Randogne-Mollens",
      excerpt:
        "Il 5 settembre 2026 la Jeunesse Randogne-Mollens organizza il suo torneo di jass a briscola libera nella palestra di Randogne — 50 CHF a coppia, raclette inclusa. La Federazione Svizzera di Jass sostiene con piacere le nuove leve.",
      format:
        "5 turni di qualificazione a gironi, poi le fasi finali (da 1 a 5 partite secondo il tabellone). Si gioca a briscola libera, 8 mani per partita.",
      priceNote: "a coppia, raclette di mezzogiorno inclusa · pagamento con Twint o in contanti",
      content: `## Quando la gioventù gioca a jass

La Jeunesse Randogne-Mollens riunisce una quarantina di giovani tra i 16 e i 30 anni. Nata nel 2022 su impulso dell'associazione Anim' Randogne-Bluche, si è data l'obiettivo di «dare slancio alla vita dei villaggi e di tessere e conservare i legami tra i giovani della regione». Weekend in capanna, vin brulé di Natale, bar sugli sci sulla piazza di Ycoor, serate raclette, grigliate e **giochi di società** il primo sabato del mese: un torneo di jass rientra perfettamente nel loro DNA.

## Perché ne parliamo

La Federazione Svizzera di Jass non si limita a elencare i tornei: mette in luce chi fa vivere il jass sul territorio. Una gioventù vallesana che organizza da sé il proprio torneo — e che non immaginerebbe un jass senza raclette — è esattamente la leva che vogliamo sostenere.

## Iscriversi

L'iscrizione avviene a coppie, tramite il modulo (QR-code sul manifesto) o per SMS al 079 190 66 13, entro il 31 agosto 2026.`,
    },
  },
];

export function getAllTournaments(): Tournament[] {
  return [...tournaments].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

/** Ist das Turnier in dieser Sprache sichtbar? (Soft-Launch-Gate.) */
export function isTournamentVisibleInLocale(tournament: Tournament, locale: string): boolean {
  return !tournament.visibleLocales || tournament.visibleLocales.includes(locale);
}

/** Gibt es in dieser Sprache überhaupt sichtbare Turniere? (Für Nav/Sitemap.) */
export function hasVisibleTournaments(locale: string): boolean {
  return tournaments.some((t) => isTournamentVisibleInLocale(t, locale));
}

/** Alle in dieser Sprache sichtbaren Turniere (chronologisch). */
export function getTournamentsForLocale(locale: string): Tournament[] {
  return getAllTournaments().filter((t) => isTournamentVisibleInLocale(t, locale));
}

export function getTournamentBySlug(slug: string): Tournament | undefined {
  return tournaments.find((tournament) => tournament.slug === slug);
}

/** Turniere, deren Ende in der Zukunft liegt (Referenzzeitpunkt: Build/Render). */
export function getUpcomingTournaments(reference: Date = new Date()): Tournament[] {
  return getAllTournaments().filter(
    (tournament) => new Date(tournament.endDate).getTime() >= reference.getTime()
  );
}

/** Bereits vergangene Turniere, neueste zuerst. */
export function getPastTournaments(reference: Date = new Date()): Tournament[] {
  return getAllTournaments()
    .filter((tournament) => new Date(tournament.endDate).getTime() < reference.getTime())
    .reverse();
}

/** Kommende Turniere, in dieser Sprache sichtbar. */
export function getUpcomingTournamentsForLocale(locale: string, reference: Date = new Date()): Tournament[] {
  return getUpcomingTournaments(reference).filter((t) => isTournamentVisibleInLocale(t, locale));
}

/** Vergangene Turniere, in dieser Sprache sichtbar (neueste zuerst). */
export function getPastTournamentsForLocale(locale: string, reference: Date = new Date()): Tournament[] {
  return getPastTournaments(reference).filter((t) => isTournamentVisibleInLocale(t, locale));
}

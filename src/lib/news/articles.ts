/**
 * NEWS ARTICLES - Jassverband Schweiz
 * 
 * So fügen Sie einen neuen Artikel hinzu:
 * 1. Kopieren Sie einen bestehenden Artikel-Block
 * 2. Ändern Sie slug, Datum, Titel, etc.
 * 3. Fügen Sie den Content als Markdown ein
 * 4. Speichern und pushen → Artikel ist live
 */

export interface Author {
  name: string;
  role: string;
  image?: string;
}

export interface NewsArticle {
  slug: string;
  publishedAt: string; // ISO date: YYYY-MM-DD
  updatedAt?: string;
  author: Author;
  readingTime: number; // in minutes
  featured: boolean;
  image?: string;
  imageAlt?: string;
  tags: string[];
  de: {
    title: string;
    excerpt: string;
    content: string; // Markdown
  };
  fr: {
    title: string;
    excerpt: string;
    content: string;
  };
  it: {
    title: string;
    excerpt: string;
    content: string;
  };
}

export const authors: Record<string, Author> = {
  remo: {
    name: "Remo Prinz",
    role: "Präsident",
  },
  erich: {
    name: "Dr. Erich Studerus",
    role: "Aktuar",
  },
  fabian: {
    name: "Fabian Cadonau",
    role: "Vizepräsident",
  },
  jvs: {
    name: "Jassverband Schweiz",
    role: "Redaktion",
  },
};

export const articles: NewsArticle[] = [
  {
    slug: "gruendung-jassverband-schweiz",
    publishedAt: "2026-01-15",
    author: authors.remo,
    readingTime: 4,
    featured: true,
    tags: ["verband", "gründung", "meilenstein"],
    de: {
      title: "Jassverband Schweiz offiziell gegründet",
      excerpt: "Am 15. Januar 2026 wurde in Zürich der Jassverband Schweiz (JVS) gegründet. Ein historischer Schritt für das Schweizer Nationalspiel.",
      content: `
## Ein historischer Tag für das Jassen

Am 15. Januar 2026 wurde in Zürich Geschichte geschrieben: Die Gründungsmitglieder Remo Prinz, Fabian Cadonau und Dr. Erich Studerus haben den **Jassverband Schweiz (JVS)** ins Leben gerufen.

### Unsere Vision

Der Jassverband Schweiz hat sich zum Ziel gesetzt, das Jassen als **immaterielles Kulturerbe** der Schweiz zu fördern und für kommende Generationen zu bewahren. Dabei setzen wir auf drei Säulen:

1. **Tradition bewahren** – Jassen ist beim Bundesamt für Kultur als "Lebendige Tradition" gelistet
2. **Jugend fördern** – Mit der Schweizer Jugend Team-Schiebermeisterschaft bringen wir strategisches Denken in Schulen
3. **Zukunft gestalten** – Digitale Plattformen und ein nationales Elo-System modernisieren den Sport

### Was kommt als Nächstes?

Im ersten Jahr fokussieren wir uns auf die **Schweizer Jugend Team-Schiebermeisterschaft**. Dieses Leuchtturmprojekt soll zeigen, dass Jassen mehr ist als ein Kartenspiel – es ist ein strategischer Denksport, der kognitive Fähigkeiten schärft und Teamwork fördert.

Wir freuen uns auf eine spannende Zukunft und laden alle Jass-Enthusiasten ein, Teil dieser Bewegung zu werden.

*Der Vorstand des Jassverbands Schweiz*
      `.trim(),
    },
    fr: {
      title: "Fédération Suisse de Jass officiellement fondée",
      excerpt: "Le 15 janvier 2026, la Fédération Suisse de Jass (JVS) a été fondée à Zurich. Une étape historique pour le jeu national suisse.",
      content: `
## Un jour historique pour le Jass

Le 15 janvier 2026, l'histoire a été écrite à Zurich : les membres fondateurs Remo Prinz, Fabian Cadonau et Dr. Erich Studerus ont créé la **Fédération Suisse de Jass (JVS)**.

### Notre vision

La Fédération Suisse de Jass s'est fixé pour objectif de promouvoir le Jass en tant que **patrimoine culturel immatériel** de la Suisse et de le préserver pour les générations futures.

*Le comité de la Fédération Suisse de Jass*
      `.trim(),
    },
    it: {
      title: "Federazione Svizzera di Jass ufficialmente fondata",
      excerpt: "Il 15 gennaio 2026, la Federazione Svizzera di Jass (JVS) è stata fondata a Zurigo. Un passo storico per il gioco nazionale svizzero.",
      content: `
## Un giorno storico per il Jass

Il 15 gennaio 2026, la storia è stata scritta a Zurigo: i membri fondatori Remo Prinz, Fabian Cadonau e Dr. Erich Studerus hanno creato la **Federazione Svizzera di Jass (JVS)**.

### La nostra visione

La Federazione Svizzera di Jass si è posta l'obiettivo di promuovere il Jass come **patrimonio culturale immateriale** della Svizzera e di preservarlo per le generazioni future.

*Il comitato della Federazione Svizzera di Jass*
      `.trim(),
    },
  },
  {
    slug: "jugendmeisterschaft-2026-ankuendigung",
    publishedAt: "2026-02-01",
    author: authors.jvs,
    readingTime: 3,
    featured: true,
    tags: ["meisterschaft", "jugend", "turnier"],
    de: {
      title: "Schweizer Jugend Team-Schiebermeisterschaft 2026: Anmeldung eröffnet",
      excerpt: "Die erste nationale Jass-Meisterschaft für junge Teams startet. Jetzt anmelden und Teil der Geschichte werden.",
      content: `
## Die erste nationale Jugend-Meisterschaft

Es ist offiziell: Die **Schweizer Jugend Team-Schiebermeisterschaft 2026** nimmt Anmeldungen entgegen!

### Wer kann teilnehmen?

- Teams bestehend aus **2 Spielern** (feste Partnerschaft)
- Alter: **16 bis 25 Jahre**
- Wohnsitz in der Schweiz

### Wie funktioniert es?

1. **Online-Qualifikation** – Spielt euch in die Top-Rankings
2. **Regionale Finals** – Die besten Teams treten gegeneinander an
3. **Nationales Finale** – Der Showdown um den Titel

### Warum mitmachen?

- 🏆 **Ruhm und Ehre** – Werdet die ersten Schweizer Jugend-Meister
- 📊 **Offizielles Elo-Rating** – Eure Leistung wird messbar
- 🤝 **Community** – Lernt Gleichgesinnte kennen

[Jetzt anmelden auf jassmeister.web.app](https://jassmeister.web.app)
      `.trim(),
    },
    fr: {
      title: "Championnat Suisse de Jass par équipes jeunesse 2026 : Inscriptions ouvertes",
      excerpt: "Le premier championnat national de Jass pour jeunes équipes démarre. Inscrivez-vous maintenant et faites partie de l'histoire.",
      content: `
## Le premier championnat national jeunesse

C'est officiel : le **Championnat Suisse de Jass par équipes jeunesse 2026** accepte les inscriptions !

[Inscrivez-vous maintenant sur jassmeister.web.app](https://jassmeister.web.app)
      `.trim(),
    },
    it: {
      title: "Campionato Svizzero di Jass a squadre giovanili 2026: Iscrizioni aperte",
      excerpt: "Il primo campionato nazionale di Jass per squadre giovani inizia. Iscriviti ora e fai parte della storia.",
      content: `
## Il primo campionato nazionale giovanile

È ufficiale: il **Campionato Svizzero di Jass a squadre giovanili 2026** accetta iscrizioni!

[Iscriviti ora su jassmeister.web.app](https://jassmeister.web.app)
      `.trim(),
    },
  },
];

// Helper functions
export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getAllArticles(): NewsArticle[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedArticles(): NewsArticle[] {
  return getAllArticles().filter((article) => article.featured);
}

export function getArticlesByTag(tag: string): NewsArticle[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

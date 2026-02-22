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
    readingTime: 6,
    featured: true,
    tags: ["verband", "gründung", "meilenstein"],
    de: {
      title: "Jassverband Schweiz offiziell gegründet",
      excerpt: "Am 15. Januar 2026 wurde in Zürich der Jassverband Schweiz (JVS) gegründet. Ein historischer Schritt für das Schweizer Nationalspiel.",
      content: `
## Ein historischer Tag für das Jassen

Am 15. Januar 2026 wurde in Zürich Geschichte geschrieben: Die Gründungsmitglieder Remo Prinz, Fabian Cadonau und Dr. Erich Studerus haben den **Jassverband Schweiz (JVS)** ins Leben gerufen.

Das Jassen ist mehr als ein Kartenspiel. Es ist ein Stück Schweizer Identität, das in Beizen und Stuben, an Familientischen und in Vereinslokalen lebendig bleibt. Es verbindet Generationen, überbrückt Sprachgrenzen und schafft Momente echter Begegnung in einer zunehmend digitalen Welt.

### Unsere Philosophie: Tradition trifft Innovation

Wir glauben, dass wahre Tradition nicht in Museen gehört. Sie lebt, wenn sie gelebt wird. Der Jassverband Schweiz steht für eine einfache Überzeugung: **Das Jassen verdient eine moderne Zukunft, ohne seine Seele zu verlieren.**

Das bedeutet konkret:

- **Wir bewahren, was zählt.** Die Rituale, die Begriffe, die kleinen Traditionen am Tisch – vom "Stöck-Wys-Stich" bis zum respektvollen Umgang mit dem Gegner.
- **Wir öffnen, was verstaubt wirkt.** Jassen ist kein Sport für ältere Herren. Es ist ein strategischer Denksport, der junge Köpfe fordert und fördert.
- **Wir digitalisieren, ohne zu vergessen.** Unsere Plattformen – JassWiki, JassGuru, Jassmeister – sind Werkzeuge, nicht Ersatz. Der echte Jass findet immer noch am Tisch statt.

### Die drei Säulen unserer Mission

**1. Tradition bewahren**  
Das Jassen ist beim Bundesamt für Kultur als "Lebendige Tradition" gelistet – eine Ehre, die verpflichtet. Wir dokumentieren Wissen, sammeln Varianten und sorgen dafür, dass dieses Erbe nicht in Vergessenheit gerät.

**2. Jugend fördern**  
Mit der Schweizer Jugend Team-Schiebermeisterschaft bringen wir strategisches Denken und echte Teamarbeit in Schulen und Universitäten. Jassen schärft den Geist: Wahrscheinlichkeitsrechnung, Mustererkennung, Kommunikation ohne Worte – Fähigkeiten, die weit über den Kartentisch hinaus wertvoll sind.

**3. Zukunft gestalten**  
Ein nationales Elo-System macht Leistung messbar und vergleichbar. Digitale Plattformen ermöglichen Training und Austausch. Aber am Ende zählt, was zählt: vier Menschen, 36 Karten, und die Frage, wer den besseren Durchblick hat.

### Warum jetzt?

Das Jassen erlebt einen stillen Wandel. Die Generation, die es am Stammtisch gelernt hat, wird älter. Gleichzeitig entdecken junge Menschen das Spiel neu – oft über digitale Wege. Der Jassverband Schweiz will diese Brücke sein: zwischen analog und digital, zwischen Tradition und Moderne, zwischen den Generationen.

### Was kommt als Nächstes?

Im ersten Jahr fokussieren wir uns auf die **Schweizer Jugend Team-Schiebermeisterschaft 2026**. Dieses Leuchtturmprojekt soll zeigen, was möglich ist, wenn man das Jassen ernst nimmt – als Sport, als Kulturgut, als Gemeinschaft.

Wir laden alle ein, Teil dieser Bewegung zu werden. Ob als Spieler, Partner, oder einfach als jemand, der findet: Das Jassen hat eine moderne Zukunft verdient.

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

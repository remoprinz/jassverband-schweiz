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

export interface ArticleVideo {
  src: string;
  poster: string;
  alt?: string;
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
  video?: ArticleVideo;
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
    author: authors.jvs,
    readingTime: 2,
    featured: true,
    image: "/assets/videos/video-poster.jpg",
    imageAlt: "Bundesrat zur Systemrelevanz des Jassens",
    video: {
      src: "/assets/videos/Video_Berset_SVJ_1.mp4",
      poster: "/assets/videos/video-poster.jpg",
      alt: "Bundesrat zur Frage: Weshalb braucht es den Jassverband?",
    },
    tags: ["Verband", "Gründung"],
    de: {
      title: "Schwingen hat einen Verband. Jodeln hat einen Verband. Jassen hat jetzt auch einen.",
      excerpt: "Das meistgespielte Kartenspiel der Schweiz hatte bisher keinen nationalen Verband. Seit dem 15. Januar 2026 hat sich das geändert.",
      content: `Jassen steht seit 2014 auf der Liste der Lebendigen Traditionen der Schweiz — geführt vom Bundesamt für Kultur, gleichauf mit Schwingen, Jodeln und dem Alphorn. Alle drei haben seit Jahrzehnten nationale Verbände. Das Jassen hatte keinen. Warum eigentlich nicht?

Ehrliche Antwort: Wir wissen es auch nicht. Also haben wir einen gegründet.

Der Jassverband Schweiz ist am 15. Januar 2026 in Zürich entstanden — mit dem Ziel, eine Tradition, die seit Generationen gelebt wird, mit Elan in die Zukunft zu führen. Nicht, weil am Stammtisch etwas falsch läuft. Sondern weil wir dem Jassen jetzt das Format geben, das ihm zusteht: ein nationales Netzwerk, eine zentrale Anlaufstelle und Sichtbarkeit über die eigene Viererrunde hinaus.

Was der Verband konkret plant — von der Digitalisierung bis zu einem neuen Turnierformat —, darüber werden wir laufend berichten. Etwas vorweg: Es wird eine Schweizermeisterschaft geben. Dazu aber später mehr.

Dass das Jassen einen Verband verdient, hat übrigens schon der Bundesrat festgehalten — auf seine Weise:

[VIDEO]

> «Ja, weil normalerweise, wenn man jasst, passiert das zu viert.»

Der Jassverband Schweiz wurde von Remo Prinz, Fabian Cadonau und Dr. Erich Studerus gegründet.`,
    },
    fr: {
      title: "La lutte suisse a sa fédération. Le yodel a sa fédération. Le Jass a désormais la sienne.",
      excerpt: "Le jeu de cartes le plus joué de Suisse n'avait jusqu'ici aucune fédération nationale. Depuis le 15 janvier 2026, c'est chose faite.",
      content: `Le Jass figure depuis 2014 sur la liste des Traditions vivantes de Suisse — tenue par l'Office fédéral de la culture, au même titre que la lutte suisse, le yodel et le cor des Alpes. Ces trois traditions disposent depuis des décennies de fédérations nationales. Le Jass n'en avait pas. Pourquoi, au juste?

Réponse honnête: nous ne le savons pas non plus. Alors nous en avons fondé une.

La Fédération Suisse de Jass est née le 15 janvier 2026 à Zurich — avec l'ambition de mener vers l'avenir une tradition qui se vit depuis des générations. Non pas parce que quelque chose ne tourne pas rond au bistrot. Mais parce que le Jass mérite désormais le cadre qui lui revient: un réseau national, un point de contact central et une visibilité au-delà de sa propre table de quatre.

Ce que la fédération prévoit concrètement — de la numérisation à un nouveau format de tournoi —, nous en parlerons régulièrement. Un avant-goût: il y aura un championnat suisse. Mais nous y reviendrons.

Que le Jass mérite une fédération, le Conseil fédéral l'a d'ailleurs déjà relevé — à sa manière:

[VIDEO]

> «Oui, parce que normalement, quand on joue au Jass, ça se passe à quatre.»

La Fédération Suisse de Jass a été fondée par Remo Prinz, Fabian Cadonau et Dr. Erich Studerus.`,
    },
    it: {
      title: "La lotta svizzera ha una federazione. Lo jodel ha una federazione. Ora ce l'ha anche il Jass.",
      excerpt: "Il gioco di carte più praticato in Svizzera non aveva finora nessuna federazione nazionale. Dal 15 gennaio 2026 è cambiato tutto.",
      content: `Il Jass figura dal 2014 nella lista delle Tradizioni viventi della Svizzera — curata dall'Ufficio federale della cultura, accanto alla lotta svizzera, allo jodel e al corno delle Alpi. Tutte e tre queste tradizioni hanno da decenni delle federazioni nazionali. Il Jass no. Come mai, in realtà?

Risposta sincera: non lo sappiamo nemmeno noi. Così ne abbiamo fondata una.

La Federazione Svizzera di Jass è nata il 15 gennaio 2026 a Zurigo — con l'obiettivo di portare con slancio nel futuro una tradizione vissuta da generazioni. Non perché all'osteria qualcosa non funzioni. Ma perché al Jass diamo finalmente la cornice che merita: una rete nazionale, un punto di riferimento centrale e visibilità oltre il proprio tavolo da quattro.

Cosa prevede concretamente la federazione — dalla digitalizzazione a un nuovo formato di torneo —, ne parleremo regolarmente. Un'anticipazione: ci sarà un campionato svizzero. Ma ne riparleremo.

Che il Jass meriti una federazione, lo ha d'altronde già osservato il Consiglio federale — a modo suo:

[VIDEO]

> «Sì, perché normalmente, quando si gioca a Jass, lo si fa in quattro.»

La Federazione Svizzera di Jass è stata fondata da Remo Prinz, Fabian Cadonau e Dr. Erich Studerus.`,
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

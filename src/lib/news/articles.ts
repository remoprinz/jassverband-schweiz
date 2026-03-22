/**
 * NEWS ARTICLES - Jassverband Schweiz
 * 
 * So fügen Sie einen neuen Artikel hinzu:
 * 1. Kopieren Sie einen bestehenden Artikel-Block
 * 2. Ändern Sie slug, Datum, Titel, etc.
 * 3. Fügen Sie den Content als Markdown ein
 * 4. Optional: Bilder via [IMAGE_1], [IMAGE_2], ... und inlineImages[] einfügen
 * 5. Local-only Medien unter public/assets/local-only/ ablegen (nicht in Git)
 * 6. Speichern und pushen → Artikel ist live
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

export interface ArticleInlineImage {
  token: string; // e.g. IMAGE_1 used as [IMAGE_1] in markdown
  src: string;
  alt: string;
  caption?: string;
  localOnly?: boolean;
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
  inlineImages?: ArticleInlineImage[];
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
    slug: "grueezi-bern-jassverband-schweiz-bundeshaus",
    publishedAt: "2026-03-12",
    author: authors.jvs,
    readingTime: 3,
    featured: true,
    image: "/assets/news/grueezi-bern/photo-1-fabian-pierre-andre.png",
    imageAlt:
      "Fabian im Gespräch mit Nationalratspräsident Pierre-André in der Wandelhalle des Bundeshauses.",
    tags: ["Volkskultur", "Bundeshaus", "Verband"],
    de: {
      title: "Grüezi Bern: Der Jassverband im Bundeshaus",
      excerpt:
        "Auf Einladung von Nationalrätin Stefanie Heimgartner stellte sich der Jassverband Schweiz am «Tag der Volkskultur» erstmals im politischen Zentrum der Schweiz vor.",
      content: `Wer am 11. März durch die Wandelhalle des Bundeshauses schritt, begegnete Trachten, Volksmusik, regionalen Festen und gelebtem Brauchtum. Und erstmals dabei: Das Jassen. Remo und Fabian machten einen Abstecher nach Bundesbern – und nutzten die Gelegenheit, den neu gegründeten Jassverband Schweiz erstmals im politischen Umfeld vorzustellen.

## Das Nationalspiel im Herzen der Politik

Dass das Jassen zur Schweizer Volkskultur gehört, steht ausser Frage. Bislang fehlte jedoch eine nationale Organisation, die dieses Kulturgut sichtbar koordiniert. Genau hier setzt der Jassverband Schweiz an – mit dem Ziel, dem Jassen eine gemeinsame Struktur zu geben, damit Tradition, Wissensvermittlung und moderne Spielformen künftig unter einem Dach weiterentwickelt werden können.

## Begegnungen auf höchster Ebene

Dass in Bundesbern über Partei- und Kantonsgrenzen hinweg gejasst wird, zeigte sich in den vielen Gesprächen des Tages.

[IMAGE_1]

[IMAGE_2]

## Danke, Steffi!

Dass dieser Abstecher überhaupt möglich wurde, ist der Initiative von Nationalrätin Stefanie Heimgartner zu verdanken. Als Organisatorin des bekannten SVP-Jass weiss sie aus eigener Erfahrung, welche verbindende Kraft in den 36 Karten steckt. Ihre Einladung ermöglichte es, dass sich der Jassverband Schweiz erstmals im politischen Zentrum des Landes vorstellen konnte.

## Viel Jass-Erfahrung im Bundeshaus

Der Austausch zeigte schnell: Im Bundeshaus wird nicht nur Politik gemacht – hier wird auch gejasst. Viele Parlamentarierinnen und Parlamentarier haben eigene Jassgeschichten zu erzählen, organisieren Turniere und nehmen am Parlamentarier-Jass teil.

[IMAGE_3]

## Auftakt mit Wirkung

Schwingen hat seinen Verband seit 1895. Jodeln seit 1910. Das Jassen hat seit dem 15. Januar 2026 seines – und seit dem 11. März weiss Bern davon.`,
    },
    fr: {
      title: "Salut Berne: la Fédération Suisse de Jass au Palais fédéral",
      excerpt:
        "Sur invitation de la conseillère nationale Stefanie Heimgartner, la Fédération Suisse de Jass s'est présentée pour la première fois au centre politique du pays, lors de la «Journée de la culture populaire».",
      content: `Le 11 mars, celles et ceux qui traversaient la Wandelhalle du Palais fédéral rencontraient costumes traditionnels, musique populaire, fêtes régionales et traditions vivantes. Et pour la première fois: le Jass. Remo et Fabian ont fait un détour par Berne et ont saisi l'occasion de présenter la jeune Fédération Suisse de Jass dans un cadre politique.

## Le jeu national au coeur de la politique

Que le Jass fasse partie de la culture populaire suisse ne fait aucun doute. Jusqu'ici, il manquait toutefois une organisation nationale capable de coordonner et de rendre visible ce patrimoine. C'est précisément là qu'intervient la Fédération Suisse de Jass: donner une structure commune au Jass afin de faire évoluer, sous un même toit, tradition, transmission du savoir et formes de jeu modernes.

## Des rencontres au plus haut niveau

Les nombreux échanges de la journée ont montré qu'à Berne, on joue au Jass au-delà des partis et des cantons.

## Merci, Steffi!

Cette visite n'aurait pas été possible sans l'initiative de la conseillère nationale Stefanie Heimgartner. En tant qu'organisatrice du célèbre «SVP-Jass», elle connaît de première main la force de cohésion des 36 cartes. Son invitation a permis à la Fédération Suisse de Jass de se présenter pour la première fois au coeur politique du pays.

## Beaucoup de compétence Jass au Palais fédéral

Les discussions ont aussi montré qu'au Palais fédéral siègent de nombreuses et nombreux passionnés de Jass. Au stand de la fédération, un groupe s'est formé, riche en expérience tant politique que jassistique.

## Un début qui compte

La lutte suisse a sa fédération depuis 1895. Le yodel depuis 1910. Le Jass a la sienne depuis le 15 janvier 2026 – et depuis le 11 mars, Berne le sait.`,
    },
    it: {
      title: "Grüezi Berna: la Federazione Svizzera di Jass a Palazzo federale",
      excerpt:
        "Su invito della consigliera nazionale Stefanie Heimgartner, la Federazione Svizzera di Jass si è presentata per la prima volta al centro politico della Svizzera durante la «Giornata della cultura popolare».",
      content: `L'11 marzo, chi attraversava la Wandelhalle di Palazzo federale incontrava costumi tradizionali, musica popolare, feste regionali e tradizioni vive. E per la prima volta c'era anche il Jass. Remo e Fabian hanno fatto tappa a Berna, cogliendo l'occasione per presentare la neo-fondata Federazione Svizzera di Jass in un contesto politico.

## Il gioco nazionale nel cuore della politica

Che il Jass appartenga alla cultura popolare svizzera è fuori discussione. Finora mancava però un'organizzazione nazionale capace di coordinare e valorizzare visibilmente questo patrimonio culturale. Proprio qui interviene la Federazione Svizzera di Jass: offrire una struttura comune al Jass, affinché tradizione, trasmissione del sapere e forme di gioco moderne possano svilupparsi sotto lo stesso tetto.

## Incontri ai massimi livelli

I molti colloqui della giornata hanno mostrato che a Berna si gioca a Jass oltre i confini di partito e di cantone.

## Grazie, Steffi!

Questa visita è stata possibile grazie all'iniziativa della consigliera nazionale Stefanie Heimgartner. In qualità di organizzatrice del noto «SVP-Jass», conosce bene la forza aggregante delle 36 carte. Il suo invito ha permesso alla Federazione Svizzera di Jass di presentarsi per la prima volta nel centro politico del Paese.

## Grande competenza di Jass a Palazzo federale

Gli scambi hanno mostrato anche che a Palazzo federale siedono numerose e numerosi appassionati di Jass. Allo stand della federazione si è riunito un gruppo con molta esperienza, sia politica sia jassistica.

## Un avvio con impatto

La lotta svizzera ha la sua federazione dal 1895. Lo jodel dal 1910. Il Jass ha la sua dal 15 gennaio 2026 – e dall'11 marzo anche Berna lo sa.`,
    },
    inlineImages: [
      {
        token: "IMAGE_1",
        src: "/assets/news/grueezi-bern/photo-1-fabian-pierre-andre.png",
        alt: "Fabian im Gespräch mit Nationalratspräsident Pierre-André in der Wandelhalle des Bundeshauses.",
        caption:
          "Jasslobbyismus auf höchstmöglicher Ebene: Fabian im Gespräch mit Nationalratspräsident Pierre-André.",
      },
      {
        token: "IMAGE_2",
        src: "/assets/news/grueezi-bern/photo-2-fabian-stefan.png",
        alt: "Fabian zusammen mit Ständeratspräsident Stefan im Bundeshaus.",
        caption:
          "Da liess sich auch Ständeratspräsident Stefan nicht lange bitten.",
      },
      {
        token: "IMAGE_3",
        src: "/assets/news/grueezi-bern/photo-3-gruppe.png",
        alt: "Ständerat Markus, Nationalrätin Steffi und Nationalrat Thomas am Stand des Jassverbands.",
        caption:
          "Ständerat Markus (Gründer der Glarner Jassmeisterschaften), Nationalrätin Steffi (Organisatorin des SVP-Jass) und Nationalrat Thomas (amtierender Jasskönig Parlamentarier-Jass).",
      },
    ],
  },
  {
    slug: "gruendung-jassverband-schweiz",
    publishedAt: "2026-01-15",
    author: authors.jvs,
    readingTime: 2,
    featured: true,
    image: "https://qlwo3d8gkia0vga2.public.blob.vercel-storage.com/videos/video-poster.jpg",
    imageAlt: "Bundesrat zur Systemrelevanz des Jassens",
    video: {
      src: "https://qlwo3d8gkia0vga2.public.blob.vercel-storage.com/videos/Video_Berset_SVJ_1.mp4",
      poster: "https://qlwo3d8gkia0vga2.public.blob.vercel-storage.com/videos/video-poster.jpg",
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

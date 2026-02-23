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
      title: "Jassverband Schweiz gegründet: Eine neue Ära für das Schweizer Nationalspiel",
      excerpt: "Am 15. Januar 2026 wurde in Zürich der Jassverband Schweiz (JVS) gegründet – mit einer klaren Vision: Jeder Mensch in der Schweiz lernt jassen.",
      content: `
## Der Jassverband Schweiz ist da

Am 15. Januar 2026 wurde in Zürich der **Jassverband Schweiz (JVS)** gegründet. Mit diesem Schritt erhält das Schweizer Nationalspiel erstmals eine professionelle Organisation, die sich seiner Förderung, Erhaltung und Modernisierung verschreibt.

Die Gründungsmitglieder – Remo Prinz (Präsident), Fabian Cadonau (Vizepräsident) und Dr. Erich Studerus (Aktuar) – eint eine gemeinsame Vision: **Jeder Mensch in der Schweiz lernt jassen.**

## Warum braucht das Jassen einen Verband?

Das Jassen ist beim [Bundesamt für Kultur als «Lebendige Tradition»](https://www.lebendige-traditionen.ch/) gelistet – eine Auszeichnung, die es mit dem Schwingen, dem Jodeln und dem Alphorn teilt. Doch lebendige Traditionen brauchen aktive Pflege.

Während das Jassen in Wirtshäusern und Wohnzimmern weiterhin gespielt wird, fehlt es an:

- **Zentralem Wissen:** Regeln werden regional unterschiedlich interpretiert
- **Nachwuchsförderung:** Junge Menschen finden schwer Zugang
- **Digitaler Infrastruktur:** Keine einheitliche Plattform für Training und Wettkampf

Der Jassverband Schweiz schliesst diese Lücken.

## Das digitale Ökosystem

Der JVS baut auf einem bestehenden Fundament auf – drei digitale Plattformen, die gemeinsam das umfassendste Jass-Angebot der Schweiz bilden:

### [JassWiki](https://jasswiki.ch)
Die Enzyklopädie des Jassens. Über 100 Artikel zu Regeln, Varianten, Geschichte und Strategie. Werbefrei, offen für alle, ständig aktualisiert.

### [JassGuru](https://jassguru.ch)
Die digitale Jasstafel mit integriertem Elo-System. Hier wird jedes Spiel erfasst, jede Leistung messbar. Von der Punktetafel bis zur nationalen Rangliste.

### Jassmeister *(in Entwicklung)*
Die Wettkampf-Plattform. Turniere organisieren, Teams verwalten, Meisterschaften austragen – alles an einem Ort.

## Die drei Säulen unserer Mission

Der Jassverband Schweiz verfolgt drei strategische Ziele:

### 1. Tradition bewahren

Das Jass-Wissen darf nicht verloren gehen. Wir dokumentieren Varianten, sammeln historische Quellen und sorgen dafür, dass die Begriffe – vom **Nell** bis zum **Weis** – korrekt überliefert werden.

### 2. Zugang vereinfachen

Jassen soll keine Geheimwissenschaft sein. Mit verständlichen Anleitungen, digitalen Lerntools und offenen Plattformen machen wir den Einstieg so einfach wie möglich.

### 3. Zukunft gestalten

Ein nationales Elo-System macht Leistung messbar. Digitale Turniere ermöglichen Wettkampf über Kantonsgrenzen hinweg. Der Jass der Zukunft ist vernetzt – aber der echte Jass findet immer noch am Tisch statt.

## Teil der Bewegung werden

Der Jassverband Schweiz ist offen für alle, die das Jassen lieben – ob als Gelegenheitsspieler, ambitionierter Wettkämpfer oder kulturell Interessierte.

Im Gründungsjahr 2026 bieten wir den exklusiven **Pionier-Status**: Alle Mitglieder, die jetzt beitreten, werden dauerhaft als Gründungsmitglieder geführt.

**[Jetzt mitmachen](/de/mitmachen)** und Teil der Geschichte werden.

---

*«Tradition trifft Innovation» – das ist mehr als ein Slogan. Es ist unser Versprechen.*

*Der Vorstand des Jassverbands Schweiz*
      `.trim(),
    },
    fr: {
      title: "Fédération Suisse de Jass fondée : Une nouvelle ère pour le jeu national suisse",
      excerpt: "Le 15 janvier 2026, la Fédération Suisse de Jass (JVS) a été fondée à Zurich – avec une vision claire : Chaque personne en Suisse apprend à jouer au Jass.",
      content: `
## La Fédération Suisse de Jass est là

Le 15 janvier 2026, la **Fédération Suisse de Jass (JVS)** a été fondée à Zurich. Le jeu national suisse reçoit ainsi pour la première fois une organisation professionnelle dédiée à sa promotion, sa préservation et sa modernisation.

Les membres fondateurs – Remo Prinz (Président), Fabian Cadonau (Vice-président) et Dr. Erich Studerus (Secrétaire) – partagent une vision commune : **Chaque personne en Suisse apprend à jouer au Jass.**

## Pourquoi le Jass a-t-il besoin d'une fédération ?

Le Jass est inscrit comme [«Tradition vivante»](https://www.lebendige-traditionen.ch/) auprès de l'Office fédéral de la culture – une distinction qu'il partage avec la lutte suisse, le yodel et le cor des Alpes. Mais les traditions vivantes nécessitent un entretien actif.

Alors que le Jass continue d'être joué dans les bistrots et les salons, il manque :

- **Un savoir centralisé :** Les règles sont interprétées différemment selon les régions
- **La promotion de la relève :** Les jeunes ont du mal à y accéder
- **Une infrastructure numérique :** Pas de plateforme unifiée pour l'entraînement et la compétition

La Fédération Suisse de Jass comble ces lacunes.

## L'écosystème numérique

La JVS s'appuie sur une base existante – trois plateformes numériques qui forment ensemble l'offre de Jass la plus complète de Suisse :

### [JassWiki](https://jasswiki.ch)
L'encyclopédie du Jass. Plus de 100 articles sur les règles, variantes, histoire et stratégie. Sans publicité, ouvert à tous, constamment mis à jour.

### [JassGuru](https://jassguru.ch)
Le tableau de Jass numérique avec système Elo intégré. Chaque partie est enregistrée, chaque performance mesurable.

### Jassmeister *(en développement)*
La plateforme de compétition. Organiser des tournois, gérer des équipes, disputer des championnats – tout en un seul endroit.

## Les trois piliers de notre mission

### 1. Préserver la tradition
Le savoir du Jass ne doit pas se perdre. Nous documentons les variantes et veillons à ce que les termes soient correctement transmis.

### 2. Simplifier l'accès
Le Jass ne doit pas être une science secrète. Avec des guides compréhensibles et des outils numériques, nous facilitons au maximum l'initiation.

### 3. Façonner l'avenir
Un système Elo national rend la performance mesurable. Les tournois numériques permettent la compétition au-delà des frontières cantonales.

## Rejoindre le mouvement

La Fédération Suisse de Jass est ouverte à tous ceux qui aiment le Jass.

En 2026, nous offrons le **statut de Pionnier** exclusif : Tous les membres qui adhèrent maintenant seront enregistrés en permanence comme membres fondateurs.

**[Participer maintenant](/fr/participer)** et faire partie de l'histoire.

---

*«Tradition et Innovation» – c'est plus qu'un slogan. C'est notre promesse.*

*Le comité de la Fédération Suisse de Jass*
      `.trim(),
    },
    it: {
      title: "Federazione Svizzera di Jass fondata: Una nuova era per il gioco nazionale svizzero",
      excerpt: "Il 15 gennaio 2026, la Federazione Svizzera di Jass (JVS) è stata fondata a Zurigo – con una visione chiara: Ogni persona in Svizzera impara a giocare a Jass.",
      content: `
## La Federazione Svizzera di Jass è qui

Il 15 gennaio 2026, la **Federazione Svizzera di Jass (JVS)** è stata fondata a Zurigo. Il gioco nazionale svizzero riceve così per la prima volta un'organizzazione professionale dedicata alla sua promozione, conservazione e modernizzazione.

I membri fondatori – Remo Prinz (Presidente), Fabian Cadonau (Vicepresidente) e Dr. Erich Studerus (Segretario) – condividono una visione comune: **Ogni persona in Svizzera impara a giocare a Jass.**

## Perché il Jass ha bisogno di una federazione?

Il Jass è iscritto come [«Tradizione vivente»](https://www.lebendige-traditionen.ch/) presso l'Ufficio federale della cultura – una distinzione che condivide con la lotta svizzera, lo jodel e il corno delle Alpi. Ma le tradizioni viventi richiedono una cura attiva.

Mentre il Jass continua a essere giocato nelle osterie e nei salotti, manca:

- **Un sapere centralizzato:** Le regole vengono interpretate diversamente a seconda delle regioni
- **La promozione dei giovani:** I giovani fanno fatica ad accedervi
- **Un'infrastruttura digitale:** Nessuna piattaforma unificata per l'allenamento e la competizione

La Federazione Svizzera di Jass colma queste lacune.

## L'ecosistema digitale

La JVS si basa su una fondazione esistente – tre piattaforme digitali che insieme formano l'offerta di Jass più completa della Svizzera:

### [JassWiki](https://jasswiki.ch)
L'enciclopedia del Jass. Oltre 100 articoli su regole, varianti, storia e strategia. Senza pubblicità, aperto a tutti, costantemente aggiornato.

### [JassGuru](https://jassguru.ch)
Il tabellone digitale del Jass con sistema Elo integrato. Ogni partita viene registrata, ogni prestazione è misurabile.

### Jassmeister *(in sviluppo)*
La piattaforma di competizione. Organizzare tornei, gestire squadre, disputare campionati – tutto in un unico posto.

## I tre pilastri della nostra missione

### 1. Preservare la tradizione
Il sapere del Jass non deve andare perso. Documentiamo le varianti e ci assicuriamo che i termini vengano trasmessi correttamente.

### 2. Semplificare l'accesso
Il Jass non deve essere una scienza segreta. Con guide comprensibili e strumenti digitali, rendiamo l'iniziazione il più semplice possibile.

### 3. Plasmare il futuro
Un sistema Elo nazionale rende la prestazione misurabile. I tornei digitali permettono la competizione oltre i confini cantonali.

## Unirsi al movimento

La Federazione Svizzera di Jass è aperta a tutti coloro che amano il Jass.

Nel 2026, offriamo lo **status di Pioniere** esclusivo: Tutti i membri che aderiscono ora saranno registrati permanentemente come membri fondatori.

**[Partecipa ora](/it/partecipa)** e fai parte della storia.

---

*«Tradizione e Innovazione» – è più di uno slogan. È la nostra promessa.*

*Il comitato della Federazione Svizzera di Jass*
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

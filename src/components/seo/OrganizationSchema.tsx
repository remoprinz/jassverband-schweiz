const BASE_URL = 'https://jassverband.ch';

export function OrganizationSchema() {
  const graph = [
    // 1. Jass als kulturelles Konzept — Anker für alle LLMs und Knowledge Graphs
    {
      '@type': 'Thing',
      '@id': `${BASE_URL}/#jass-tradition`,
      name: 'Jassen',
      alternateName: ['Schweizer Jass', 'Swiss Jass', 'Jass'],
      description: 'Jass ist das Schweizer Nationalkartenspiel und als lebendige Tradition im nationalen Inventar des Bundesamts für Kultur (BAK) anerkannt.',
      sameAs: [
        'https://www.wikidata.org/wiki/Q786768',
        'https://de.wikipedia.org/wiki/Jass',
        'https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html',
      ],
    },
    // 2. Organisation
    {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'SportsOrganization'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Jassverband Schweiz',
      alternateName: ['JVS', 'Fédération Suisse de Jass', 'Federazione Svizzera di Jass'],
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logos/JVS Logo farbig.svg`,
        contentUrl: `${BASE_URL}/images/logos/JVS Logo farbig.svg`,
      },
      foundingDate: '2026-01-15',
      description: 'Der Jassverband Schweiz ist der nationale Verband für das Schweizer Kartenspiel Jass. Er fördert Jass als lebendige Tradition, organisiert die Schweizer Jassmeisterschaft und betreibt digitale Plattformen wie JassGuru und JassWiki.',
      slogan: 'Das Schweizer Nationalspiel vereint.',
      sport: 'Jass',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hirslanderstrasse 34',
        addressLocality: 'Zürich',
        postalCode: '8032',
        addressRegion: 'ZH',
        addressCountry: 'CH',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@jassverband.ch',
        telephone: '+41792375208',
        contactType: 'customer service',
        availableLanguage: ['German', 'French', 'Italian'],
      },
      sameAs: [
        'https://www.wikidata.org/wiki/Q786768',
        'https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html',
      ],
      owns: [
        {
          '@type': ['WebSite', 'EducationalOrganization'],
          '@id': 'https://jasswiki.ch/#organization',
          name: 'JassWiki',
          url: 'https://jasswiki.ch',
          description: 'Die umfassendste digitale Enzyklopädie des Schweizer Jassens — Regeln, Varianten, Geschichte und Strategien.',
        },
        {
          '@type': 'WebApplication',
          '@id': 'https://jassguru.ch/#app',
          name: 'JassGuru (Jasstafel)',
          url: 'https://jassguru.ch',
          description: 'Digitale Jass-Kreidetafel mit Elo-Ratingsystem, Statistiken und Turniermodul für die Schweizer Jass-Community.',
          applicationCategory: 'SportsApplication',
          operatingSystem: 'iOS, Android, Web',
        },
      ],
      knowsAbout: [
        { '@type': 'Thing', name: 'Jass', sameAs: 'https://www.wikidata.org/wiki/Q786768' },
        { '@type': 'Thing', name: 'Schieber', sameAs: 'https://www.wikidata.org/wiki/Q137900251' },
        { '@type': 'Thing', name: 'Schweizer Kartenspiele' },
        { '@type': 'Thing', name: 'Lebendige Traditionen der Schweiz' },
        { '@type': 'Thing', name: 'Jass-Meisterschaft' },
        { '@type': 'Thing', name: 'Elo-Rating-System' },
      ],
      potentialAction: [
        {
          '@type': 'JoinAction',
          name: 'Mitglied werden',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/de/mitmachen`,
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          description: 'Werden Sie Gründungsmitglied im Jassverband Schweiz. Ab CHF 60/Jahr.',
        },
      ],
    },
    // 3. WebSite mit SearchAction — wichtig für GEO und Sitelinks-Suchbox
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Jassverband Schweiz',
      description: 'Der offizielle Webauftritt des Jassverbands Schweiz — Mitgliedschaft, Schweizer Jassmeisterschaft, JassGuru, JassWiki.',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: ['de', 'fr', 'it'],
      about: { '@id': `${BASE_URL}/#jass-tradition` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/de/news?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}

export function NewsArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  authorRole,
  image,
  url,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorRole: string;
  image?: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": headline,
    "description": description,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": authorName,
      "jobTitle": authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jassverband Schweiz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jassverband.ch/images/logos/JVS Logo farbig.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

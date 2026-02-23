export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jassverband Schweiz",
    "alternateName": ["JVS", "Fédération Suisse de Jass", "Federazione Svizzera di Jass"],
    "url": "https://jassverband.ch",
    "logo": "https://jassverband.ch/images/logos/JVS Logo farbig.svg",
    "foundingDate": "2026-01-15",
    "description": "Der Jassverband Schweiz fördert das Schweizer Nationalspiel als modernen Denksport. Jugendförderung, digitale Plattformen, nationale Meisterschaften.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hirslanderstrasse 34",
      "addressLocality": "Zürich",
      "postalCode": "8032",
      "addressRegion": "ZH",
      "addressCountry": "CH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@jassverband.ch",
      "telephone": "+41792375208",
      "contactType": "customer service",
      "availableLanguage": ["German", "French", "Italian"]
    },
    "sameAs": [
      // Social Media (auskommentiert bis Kanäle existieren)
      // "https://www.linkedin.com/company/jassverband-schweiz",
      // "https://www.instagram.com/jassverband_schweiz",
      // "https://www.youtube.com/@jassverbandschweiz"
    ],
    "owns": [
      {
        "@type": "WebSite",
        "name": "JassWiki",
        "url": "https://jasswiki.ch",
        "description": "Die Enzyklopädie des Jassens"
      },
      {
        "@type": "WebSite",
        "name": "JassGuru",
        "url": "https://jassguru.ch",
        "description": "Digitale Jass-Plattform mit Elo-System"
      }
    ],
    "knowsAbout": [
      "Jass",
      "Schieber",
      "Schweizer Kartenspiele",
      "Lebendige Traditionen der Schweiz"
    ],
    "potentialAction": {
      "@type": "JoinAction",
      "name": "Mitglied werden",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://jassverband.ch/de/mitmachen",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "description": "Werden Sie Gründungsmitglied im Jassverband Schweiz und unterstützen Sie die Jass-Kultur."
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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

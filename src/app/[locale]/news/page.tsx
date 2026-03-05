import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getAllArticles,
  type NewsArticle,
} from "@/lib/news/articles";
import { ArticleVideoPlayer } from "@/components/news/ArticleVideoPlayer";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "News | Jassverband Schweiz",
    fr: "Actualités | Fédération Suisse de Jass",
    it: "Notizie | Federazione Svizzera di Jass",
  };

  const descriptions: Record<string, string> = {
    de: "Neuigkeiten vom Jassverband Schweiz — Gründung, Schweizermeisterschaft, Community und mehr.",
    fr: "Actualités de la Fédération Suisse de Jass — fondation, championnat suisse, communauté et plus.",
    it: "Novità dalla Federazione Svizzera di Jass — fondazione, campionato svizzero, comunità e altro.",
  };

  return {
    title: titles[locale] || titles.de,
    description: descriptions[locale] || descriptions.de,
    alternates: {
      canonical: `https://jassverband.ch/${locale}/news`,
      languages: {
        de: "https://jassverband.ch/de/news",
        fr: "https://jassverband.ch/fr/news",
        it: "https://jassverband.ch/it/news",
        "x-default": "https://jassverband.ch/de/news",
      },
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      type: "website",
    },
  };
}

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const localeMap: Record<string, string> = {
    de: "de-CH",
    fr: "fr-CH",
    it: "it-CH",
  };
  return date.toLocaleDateString(localeMap[locale] || "de-CH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// --- Markdown renderer (same logic as article page) ---

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.*$)/gim, '<h3 class="article-h3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="article-h2">$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2" class="text-[var(--color-primary)] hover:underline">$1</a>'
    )
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="article-quote">$1</blockquote>'
    )
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    .split("\n\n")
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<h3") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p class="article-p">${trimmed}</p>`;
    })
    .join("");
}

function renderArticleContent(
  content: string,
  article: NewsArticle
): Array<{ type: "html" | "video"; html?: string }> {
  const parts = content.split("[VIDEO]");
  const segments: Array<{ type: "html" | "video"; html?: string }> = [];

  parts.forEach((part, index) => {
    const trimmed = part.trim();
    if (trimmed) {
      segments.push({ type: "html", html: renderMarkdown(trimmed) });
    }
    if (index < parts.length - 1 && article.video) {
      segments.push({ type: "video" });
    }
  });

  return segments;
}

// --- Inline Full Article (for feed mode, <= 4 articles) ---

function InlineArticle({
  article,
  locale,
  isFirst,
}: {
  article: NewsArticle;
  locale: string;
  isFirst: boolean;
}) {
  const content =
    article[locale as keyof Pick<NewsArticle, "de" | "fr" | "it">] ||
    article.de;
  const readingTimeLabel: Record<string, string> = {
    de: "Min. Lesezeit",
    fr: "min de lecture",
    it: "min di lettura",
  };

  const segments = renderArticleContent(content.content, article);

  return (
    <article
      className={`max-w-[720px] ${isFirst ? "" : "mt-16 md:mt-20 pt-16 md:pt-20 border-t"}`}
      style={!isFirst ? { borderColor: "var(--color-border)" } : undefined}
    >
      {/* Header */}
      <header className="mb-8 md:mb-10">
        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  background: "rgba(255, 0, 0, 0.08)",
                  color: "var(--color-primary)",
                  fontFamily:
                    "var(--font-inter), Inter, system-ui, sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title — H1 for first, H2 for rest */}
        {isFirst ? (
          <h1
            className="text-[var(--color-foreground)] mb-5"
            style={{
              fontFamily: "var(--font-capita), Capita, Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4.5vw, 42px)",
              lineHeight: 1.2,
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            {content.title}
          </h1>
        ) : (
          <h2
            className="text-[var(--color-foreground)] mb-5"
            style={{
              fontFamily: "var(--font-capita), Capita, Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 3.5vw, 32px)",
              lineHeight: 1.25,
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            <Link
              href={`/${locale}/news/${article.slug}`}
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {content.title}
            </Link>
          </h2>
        )}

        {/* Lead */}
        <p
          className="text-[var(--color-foreground)] mb-6"
          style={{
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(17px, 2vw, 20px)",
            lineHeight: 1.6,
            opacity: 0.7,
          }}
        >
          {content.excerpt}
        </p>

        {/* Meta */}
        <div
          className="flex flex-wrap items-center gap-4 text-[var(--color-foreground-muted)]"
          style={{
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
            fontSize: "14px",
          }}
        >
          <span
            className="font-medium"
            style={{ color: "var(--color-foreground)" }}
          >
            {article.author.name}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt, locale)}
          </time>
          <span aria-hidden="true">·</span>
          <span>
            {article.readingTime}{" "}
            {readingTimeLabel[locale] || readingTimeLabel.de}
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="article-body">
        {segments.map((segment, index) => {
          if (segment.type === "video" && article.video) {
            return (
              <div key={`video-${index}`} className="my-8 md:my-10">
                <ArticleVideoPlayer
                  src={article.video.src}
                  poster={article.video.poster}
                  alt={article.video.alt}
                />
              </div>
            );
          }
          if (segment.type === "html" && segment.html) {
            return (
              <div
                key={`content-${index}`}
                dangerouslySetInnerHTML={{ __html: segment.html }}
              />
            );
          }
          return null;
        })}
      </div>

      {/* Share row */}
      <div
        className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <span
          className="text-[var(--color-foreground-muted)]"
          style={{
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
            fontSize: "13px",
          }}
        >
          {locale === "de"
            ? "Teilen"
            : locale === "fr"
              ? "Partager"
              : "Condividi"}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(content.title + " https://jassverband.ch/" + locale + "/news/" + article.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[var(--color-background)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors text-[var(--color-foreground-muted)]"
            aria-label="WhatsApp"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(content.title)}&url=${encodeURIComponent("https://jassverband.ch/" + locale + "/news/" + article.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[var(--color-background)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors text-[var(--color-foreground-muted)]"
            aria-label="X"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://jassverband.ch/" + locale + "/news/" + article.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[var(--color-background)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors text-[var(--color-foreground-muted)]"
            aria-label="LinkedIn"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

// --- Card for grid mode (>= 5 articles) ---

function ArticleCard({
  article,
  locale,
}: {
  article: NewsArticle;
  locale: string;
}) {
  const content =
    article[locale as keyof Pick<NewsArticle, "de" | "fr" | "it">] ||
    article.de;
  const readingTimeLabel: Record<string, string> = {
    de: "Min. Lesezeit",
    fr: "min de lecture",
    it: "min di lettura",
  };

  return (
    <Link
      href={`/${locale}/news/${article.slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        background: "var(--color-background)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="relative h-48 overflow-hidden">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt || content.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 flex items-center justify-center">
            <span className="text-4xl opacity-20">♠</span>
          </div>
        )}
        {article.video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--color-primary)] rounded-full shadow-lg">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div
          className="flex items-center gap-3 mb-3"
          style={{
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "var(--color-foreground-muted)",
          }}
        >
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt, locale)}
          </time>
          <span aria-hidden="true">·</span>
          <span>
            {article.readingTime}{" "}
            {readingTimeLabel[locale] || readingTimeLabel.de}
          </span>
        </div>

        <h2
          className="text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors mb-2"
          style={{
            fontFamily: "var(--font-capita), Capita, Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(17px, 2vw, 20px)",
            lineHeight: 1.35,
          }}
        >
          {content.title}
        </h2>

        <p
          className="text-[var(--color-foreground-muted)] line-clamp-2"
          style={{
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {content.excerpt}
        </p>
      </div>
    </Link>
  );
}

// --- Compact list item (for older articles in feed mode) ---

function CompactArticleRow({
  article,
  locale,
}: {
  article: NewsArticle;
  locale: string;
}) {
  const content =
    article[locale as keyof Pick<NewsArticle, "de" | "fr" | "it">] ||
    article.de;

  return (
    <Link
      href={`/${locale}/news/${article.slug}`}
      className="group flex items-start gap-4 py-5 border-b transition-colors"
      style={{ borderColor: "var(--color-border)" }}
    >
      {article.image && (
        <div className="relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={article.image}
            alt={article.imageAlt || content.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3
          className="text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors mb-1"
          style={{
            fontFamily: "var(--font-capita), Capita, Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(15px, 1.8vw, 17px)",
            lineHeight: 1.35,
          }}
        >
          {content.title}
        </h3>
        <span
          className="text-[var(--color-foreground-muted)]"
          style={{
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
            fontSize: "13px",
          }}
        >
          {formatDate(article.publishedAt, locale)}
        </span>
      </div>
    </Link>
  );
}

// --- Threshold: switch from feed to grid ---

const GRID_MODE_THRESHOLD = 5;

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;

  const pageContent: Record<
    string,
    { title: string; subtitle: string; more: string }
  > = {
    de: {
      title: "News",
      subtitle: "Neuigkeiten vom Jassverband Schweiz",
      more: "Weitere Artikel",
    },
    fr: {
      title: "Actualités",
      subtitle: "Nouvelles de la Fédération Suisse de Jass",
      more: "Autres articles",
    },
    it: {
      title: "Notizie",
      subtitle: "Novità dalla Federazione Svizzera di Jass",
      more: "Altri articoli",
    },
  };

  const allArticles = getAllArticles();
  const { title, subtitle, more } = pageContent[locale] || pageContent.de;
  const useFeedMode = allArticles.length < GRID_MODE_THRESHOLD;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://jassverband.ch/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `https://jassverband.ch/${locale}/news`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div
        className="section-spacing"
        style={{ background: "var(--color-cream)" }}
      >
        <div className="container-main">
          {/* Page Header */}
          <div className="mb-12 md:mb-16 text-center">
            <h1
              className="text-[var(--color-foreground)] mb-3"
              style={{
                fontFamily:
                  "var(--font-capita), Capita, Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 42px)",
                lineHeight: 1.2,
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              {title}
            </h1>
            <p
              className="text-[var(--color-foreground-muted)]"
              style={{
                fontFamily:
                  "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: "clamp(16px, 2vw, 18px)",
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* === FEED MODE (< 5 articles): inline full articles === */}
          {useFeedMode && allArticles.length > 0 && (
            <section>
              {/* Newest article rendered inline in full — centered */}
              <div className="max-w-[720px] mx-auto">
                <InlineArticle
                  article={allArticles[0]}
                  locale={locale}
                  isFirst={true}
                />
              </div>

              {/* Older articles as compact list */}
              {allArticles.length > 1 && (
                <div className="max-w-[720px] mx-auto mt-16 md:mt-20">
                  <h2
                    className="text-[var(--color-foreground)] mb-6"
                    style={{
                      fontFamily:
                        "var(--font-capita), Capita, Georgia, serif",
                      fontWeight: 700,
                      fontSize: "clamp(20px, 2.5vw, 24px)",
                      lineHeight: 1.3,
                    }}
                  >
                    {more}
                  </h2>
                  <div>
                    {allArticles.slice(1).map((article) => (
                      <CompactArticleRow
                        key={article.slug}
                        article={article}
                        locale={locale}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* === GRID MODE (>= 5 articles): card grid === */}
          {!useFeedMode && allArticles.length > 0 && (
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    locale={locale}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {allArticles.length === 0 && (
            <div className="text-center py-16">
              <p
                className="text-[var(--color-foreground-muted)]"
                style={{
                  fontFamily:
                    "var(--font-inter), Inter, system-ui, sans-serif",
                  fontSize: "16px",
                }}
              >
                {locale === "de"
                  ? "Noch keine Artikel vorhanden."
                  : locale === "fr"
                    ? "Aucun article disponible."
                    : "Nessun articolo disponibile."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Article Typography (shared with inline rendering) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .article-body .article-p {
              font-family: var(--font-inter), Inter, system-ui, sans-serif;
              font-weight: 400;
              font-size: clamp(16px, 1.8vw, 18px);
              line-height: 1.75;
              color: var(--color-foreground);
              margin-bottom: 1.5em;
            }
            .article-body .article-h2 {
              font-family: var(--font-capita), Capita, Georgia, serif;
              font-weight: 700;
              font-size: clamp(22px, 3vw, 28px);
              line-height: 1.3;
              color: var(--color-foreground);
              margin-top: 2.5em;
              margin-bottom: 0.8em;
            }
            .article-body .article-h3 {
              font-family: var(--font-capita), Capita, Georgia, serif;
              font-weight: 700;
              font-size: clamp(18px, 2.5vw, 22px);
              line-height: 1.3;
              color: var(--color-foreground);
              margin-top: 2em;
              margin-bottom: 0.6em;
            }
            .article-body .article-quote {
              font-family: var(--font-capita), Capita, Georgia, serif;
              font-style: italic;
              font-size: clamp(18px, 2.2vw, 22px);
              line-height: 1.5;
              color: var(--color-foreground);
              border-left: 3px solid var(--color-primary);
              padding-left: 1.25em;
              margin: 1.5em 0;
            }
            .article-body strong {
              font-weight: 600;
            }
          `,
        }}
      />
    </>
  );
}

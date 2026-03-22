import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getAllArticles,
  type NewsArticle,
} from "@/lib/news/articles";
import { ArticleVideoPlayer } from "@/components/news/ArticleVideoPlayer";
import { SocialIconLinks } from "@/components/layout/SocialIconLinks";

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
): Array<{
  type: "html" | "video" | "image";
  html?: string;
  image?: NonNullable<NewsArticle["inlineImages"]>[number];
}> {
  const parts = content.split(/(\[VIDEO\]|\[IMAGE_[A-Z0-9_]+\])/g);
  const segments: Array<{
    type: "html" | "video" | "image";
    html?: string;
    image?: NonNullable<NewsArticle["inlineImages"]>[number];
  }> = [];

  parts.forEach((part) => {
    const trimmed = part.trim();
    if (!trimmed) return;

    if (trimmed === "[VIDEO]") {
      if (article.video) segments.push({ type: "video" });
      return;
    }

    const imageTokenMatch = trimmed.match(/^\[(IMAGE_[A-Z0-9_]+)\]$/);
    if (imageTokenMatch) {
      const token = imageTokenMatch[1];
      const image = article.inlineImages?.find((item) => item.token === token);
      if (image) segments.push({ type: "image", image });
      return;
    }

    segments.push({ type: "html", html: renderMarkdown(trimmed) });
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
  const canRenderLocalMedia =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ENABLE_LOCAL_NEWS_MEDIA === "true";

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
          if (segment.type === "image" && segment.image) {
            const image = segment.image;
            const showImage = !image.localOnly || canRenderLocalMedia;
            if (!showImage) return null;
            return (
              <figure key={`image-${index}`} className="my-8 md:my-10">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[var(--color-border)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
                {image.caption && (
                  <figcaption
                    className="mt-3 text-[var(--color-foreground-muted)]"
                    style={{
                      fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    {image.caption}
                  </figcaption>
                )}
              </figure>
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
            ? "Social Media"
            : locale === "fr"
              ? "Réseaux sociaux"
              : "Social media"}
        </span>
        <SocialIconLinks variant="on-light" size="sm" locale={locale} />
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
        style={{ background: "var(--color-cream)", paddingTop: "120px" }}
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

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug, getAllArticles, type NewsArticle } from "@/lib/news/articles";
import { ArticleVideoPlayer } from "@/components/news/ArticleVideoPlayer";
import { SocialIconLinks } from "@/components/layout/SocialIconLinks";

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  const locales = ["de", "fr", "it"];
  
  return locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  const content = article[locale as keyof Pick<NewsArticle, "de" | "fr" | "it">] || article.de;
  const ogImage = article.image || "/images/og-image.jpg";

  return {
    title: `${content.title} | Jassverband Schweiz`,
    description: content.excerpt,
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: `https://jassverband.ch/${locale}/news/${slug}`,
      languages: {
        de: `https://jassverband.ch/de/news/${slug}`,
        fr: `https://jassverband.ch/fr/news/${slug}`,
        it: `https://jassverband.ch/it/news/${slug}`,
        "x-default": `https://jassverband.ch/de/news/${slug}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: `https://jassverband.ch${ogImage}`,
          width: 1200,
          height: 630,
          alt: article.imageAlt || content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.excerpt,
      images: [`https://jassverband.ch${ogImage}`],
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

function renderArticleContent(
  content: string,
  article: NewsArticle
): {
  segments: Array<{
    type: "html" | "video" | "image";
    html?: string;
    image?: NonNullable<NewsArticle["inlineImages"]>[number];
  }>;
} {
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

  return { segments };
}

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
    .replace(/^> (.*$)/gim, '<blockquote class="article-quote">$1</blockquote>')
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const content =
    article[locale as keyof Pick<NewsArticle, "de" | "fr" | "it">] || article.de;

  const backLabel: Record<string, string> = {
    de: "Zurück zu News",
    fr: "Retour aux actualités",
    it: "Torna alle notizie",
  };

  const readingTimeLabel: Record<string, string> = {
    de: "Min. Lesezeit",
    fr: "min de lecture",
    it: "min di lettura",
  };

  const { segments } = renderArticleContent(content.content, article);
  const canRenderLocalMedia =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ENABLE_LOCAL_NEWS_MEDIA === "true";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: content.title,
      description: content.excerpt,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      image: article.image
        ? `https://jassverband.ch${article.image}`
        : undefined,
      author: {
        "@type": article.author.name === "Jassverband Schweiz" ? "Organization" : "Person",
        name: article.author.name,
      },
      publisher: {
        "@type": "Organization",
        name: "Jassverband Schweiz",
        url: "https://jassverband.ch",
        logo: {
          "@type": "ImageObject",
          url: "https://jassverband.ch/images/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://jassverband.ch/${locale}/news/${slug}`,
      },
    },
    ...(article.video
      ? [
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name:
              article.video.alt ||
              "Weshalb braucht es den Jassverband?",
            description: content.excerpt,
            thumbnailUrl: `https://jassverband.ch${article.video.poster}`,
            contentUrl: `https://jassverband.ch${article.video.src}`,
            uploadDate: article.publishedAt,
            publisher: {
              "@type": "Organization",
              name: "Jassverband Schweiz",
            },
          },
        ]
      : []),
  ];

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
        name: "News",
        item: `https://jassverband.ch/${locale}/news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.title,
        item: `https://jassverband.ch/${locale}/news/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <article
        className="py-12 md:py-20"
        style={{ background: "var(--color-cream)" }}
      >
        <div className="container-main">
          <div className="max-w-[720px] mx-auto">
            {/* Back Link */}
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors mb-10 md:mb-12"
              style={{
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: "15px",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {backLabel[locale] || backLabel.de}
            </Link>

            {/* Article Header */}
            <header className="mb-10 md:mb-12">
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

              {/* Title */}
              <h1
                className="text-[var(--color-foreground)] mb-6"
                style={{
                  fontFamily:
                    "var(--font-capita), Capita, Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 4.5vw, 42px)",
                  lineHeight: 1.2,
                  letterSpacing: "var(--letter-spacing-tight)",
                }}
              >
                {content.title}
              </h1>

              {/* Lead / Excerpt */}
              <p
                className="text-[var(--color-foreground)] mb-8"
                style={{
                  fontFamily:
                    "var(--font-inter), Inter, system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  lineHeight: 1.6,
                  opacity: 0.75,
                }}
              >
                {content.excerpt}
              </p>

              {/* Meta: Author, Date, Reading Time */}
              <div
                className="flex flex-wrap items-center gap-4 pb-8 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: "var(--color-primary)",
                      color: "white",
                      fontFamily:
                        "var(--font-inter), Inter, system-ui, sans-serif",
                    }}
                  >
                    {article.author.name === "Jassverband Schweiz"
                      ? "JVS"
                      : article.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                  </div>
                  <div>
                    <div
                      className="font-medium text-[var(--color-foreground)]"
                      style={{
                        fontFamily:
                          "var(--font-inter), Inter, system-ui, sans-serif",
                        fontSize: "15px",
                      }}
                    >
                      {article.author.name}
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 text-[var(--color-foreground-muted)]"
                  style={{
                    fontFamily:
                      "var(--font-inter), Inter, system-ui, sans-serif",
                    fontSize: "14px",
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
              </div>
            </header>

            {/* Article Body */}
            <div className="article-body">
              {segments.map((segment, index) => {
                if (segment.type === "video" && article.video) {
                  return (
                    <div key={`video-${index}`} className="my-10 md:my-12">
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
                    <figure key={`image-${index}`} className="my-10 md:my-12">
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

            {/* Article Footer */}
            <footer
              className="mt-14 pt-8 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* Share */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <span
                  className="text-[var(--color-foreground-muted)]"
                  style={{
                    fontFamily:
                      "var(--font-inter), Inter, system-ui, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  {locale === "de"
                    ? "Social Media"
                    : locale === "fr"
                      ? "Réseaux sociaux"
                      : "Social media"}
                </span>
                <SocialIconLinks variant="on-light" size="md" locale={locale} />
              </div>

              {/* CTA */}
              <div
                className="mt-10 p-6 md:p-8 rounded-2xl text-center"
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="text-[var(--color-foreground)] mb-4"
                  style={{
                    fontFamily:
                      "var(--font-capita), Capita, Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(20px, 3vw, 24px)",
                    lineHeight: 1.3,
                  }}
                >
                  {locale === "de"
                    ? "Werde Gründungsmitglied"
                    : locale === "fr"
                      ? "Deviens membre fondateur"
                      : "Diventa membro fondatore"}
                </p>
                <p
                  className="text-[var(--color-foreground-muted)] mb-6"
                  style={{
                    fontFamily:
                      "var(--font-inter), Inter, system-ui, sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.6,
                  }}
                >
                  {locale === "de"
                    ? "Saison 1 läuft. Alle, die jetzt beitreten, werden dauerhaft als Gründungsmitglieder geführt."
                    : locale === "fr"
                      ? "La saison 1 est lancée. Tous les membres qui adhèrent maintenant seront enregistrés comme membres fondateurs."
                      : "La stagione 1 è iniziata. Tutti i membri che aderiscono ora saranno registrati come membri fondatori."}
                </p>
                <Link
                  href={`/${locale}/mitmachen`}
                  className="btn-primary inline-flex"
                >
                  {locale === "de"
                    ? "Mitglied werden"
                    : locale === "fr"
                      ? "Devenir membre"
                      : "Diventa membro"}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>

      {/* Article Typography Styles */}
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

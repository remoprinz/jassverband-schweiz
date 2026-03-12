import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug, getAllArticles, type NewsArticle } from "@/lib/news/articles";
import { ArticleVideoPlayer } from "@/components/news/ArticleVideoPlayer";

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
                    ? "Artikel teilen"
                    : locale === "fr"
                      ? "Partager"
                      : "Condividi"}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(content.title)}&url=${encodeURIComponent(`https://jassverband.ch/${locale}/news/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors text-[var(--color-foreground-muted)]"
                    aria-label="Share on X"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://jassverband.ch/${locale}/news/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors text-[var(--color-foreground-muted)]"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(content.title + " " + `https://jassverband.ch/${locale}/news/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors text-[var(--color-foreground-muted)]"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
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

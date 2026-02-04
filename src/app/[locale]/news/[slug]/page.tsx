import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getAllArticles, type NewsArticle } from "@/lib/news/articles";

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

  return {
    title: `${content.title} | Jassverband Schweiz`,
    description: content.excerpt,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: content.title,
      description: content.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.excerpt,
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

// Simple Markdown to HTML converter (basic support)
function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-[var(--color-primary)] hover:underline" target="_blank" rel="noopener">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 list-decimal">$2</li>')
    // Paragraphs
    .split('\n\n')
    .map(para => `<p class="mb-4">${para}</p>`)
    .join('');
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const content = article[locale as keyof Pick<NewsArticle, "de" | "fr" | "it">] || article.de;
  
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

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: content.title,
    description: content.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Jassverband Schweiz",
      url: "https://jassverband.ch",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jassverband.ch/${locale}/news/${slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="section-spacing">
        <div className="container-main max-w-3xl">
          {/* Back Link */}
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel[locale] || backLabel.de}
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] mb-6 leading-tight">
              {content.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-[var(--color-foreground-muted)] mb-8">
              {content.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-[var(--color-border)]">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center text-lg font-bold text-[var(--color-foreground-muted)]">
                  {article.author.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium">{article.author.name}</div>
                  <div className="text-sm text-[var(--color-foreground-muted)]">{article.author.role}</div>
                </div>
              </div>

              {/* Date & Reading Time */}
              <div className="flex items-center gap-4 text-sm text-[var(--color-foreground-muted)]">
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt, locale)}
                </time>
                <span>•</span>
                <span>{article.readingTime} {readingTimeLabel[locale] || readingTimeLabel.de}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-[var(--color-foreground)] prose-p:text-[var(--color-foreground)] prose-a:text-[var(--color-primary)] prose-strong:text-[var(--color-foreground)]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.content) }}
          />

          {/* Share & CTA */}
          <footer className="mt-16 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-[var(--color-foreground-muted)]">
                {locale === "de" ? "Artikel teilen:" : locale === "fr" ? "Partager l'article:" : "Condividi l'articolo:"}
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(content.title)}&url=${encodeURIComponent(`https://jassverband.ch/${locale}/news/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://jassverband.ch/${locale}/news/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}

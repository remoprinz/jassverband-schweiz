import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getAllArticles, getFeaturedArticles, type NewsArticle } from "@/lib/news/articles";
import { SectionHeader } from "@/components/ui";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    de: "News & Aktuelles | Jassverband Schweiz",
    fr: "Actualités | Fédération Suisse de Jass",
    it: "Notizie | Federazione Svizzera di Jass",
  };
  
  const descriptions: Record<string, string> = {
    de: "Aktuelle Nachrichten, Turnierankündigungen und Neuigkeiten vom Jassverband Schweiz.",
    fr: "Dernières nouvelles, annonces de tournois et actualités de la Fédération Suisse de Jass.",
    it: "Ultime notizie, annunci di tornei e novità dalla Federazione Svizzera di Jass.",
  };

  return {
    title: titles[locale] || titles.de,
    description: descriptions[locale] || descriptions.de,
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

function ArticleCard({ article, locale, featured = false }: { article: NewsArticle; locale: string; featured?: boolean }) {
  const content = article[locale as keyof Pick<NewsArticle, "de" | "fr" | "it">] || article.de;
  const readingTimeLabel: Record<string, string> = {
    de: "Min. Lesezeit",
    fr: "min de lecture",
    it: "min di lettura",
  };

  return (
    <Link
      href={`/${locale}/news/${article.slug}`}
      className={`group block bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      {/* Image Placeholder */}
      <div className={`bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 ${featured ? "h-64 md:h-full" : "h-48"} flex items-center justify-center`}>
        <div className="text-6xl opacity-20">♠</div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-[var(--color-foreground-muted)] mb-3">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt, locale)}
          </time>
          <span>•</span>
          <span>{article.readingTime} {readingTimeLabel[locale] || readingTimeLabel.de}</span>
        </div>

        {/* Title */}
        <h2 className={`font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors mb-3 ${
          featured ? "text-2xl md:text-3xl" : "text-xl"
        }`}>
          {content.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[var(--color-foreground-muted)] mb-4 line-clamp-3">
          {content.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center text-sm font-bold text-[var(--color-foreground-muted)]">
            {article.author.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="text-sm font-medium">{article.author.name}</div>
            <div className="text-xs text-[var(--color-foreground-muted)]">{article.author.role}</div>
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-[var(--color-background-alt)] text-[var(--color-foreground-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  
  const titles: Record<string, { title: string; subtitle: string }> = {
    de: { title: "News & Aktuelles", subtitle: "Neuigkeiten rund um den Jassverband Schweiz" },
    fr: { title: "Actualités", subtitle: "Nouvelles de la Fédération Suisse de Jass" },
    it: { title: "Notizie", subtitle: "Novità dalla Federazione Svizzera di Jass" },
  };

  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const regularArticles = allArticles.filter((a) => !a.featured);

  const { title, subtitle } = titles[locale] || titles.de;

  return (
    <div className="section-spacing">
      <div className="container-main">
        <SectionHeader title={title} subtitle={subtitle} />

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={locale}
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        {regularArticles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">
              {locale === "de" ? "Weitere Artikel" : locale === "fr" ? "Autres articles" : "Altri articoli"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
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
            <div className="text-6xl mb-4">📰</div>
            <p className="text-[var(--color-foreground-muted)]">
              {locale === "de" ? "Noch keine Artikel vorhanden." : "Aucun article disponible."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

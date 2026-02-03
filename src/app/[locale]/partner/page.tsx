import { getTranslations } from "next-intl/server";
import { SectionHeader, Button, Card } from "@/components/ui";

interface PartnerPageProps {
  params: Promise<{ locale: string }>;
}

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    key: "culture",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    key: "youth",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    key: "digital",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    key: "reach",
  },
];

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partner" });

  return (
    <div className="section-spacing">
      <div className="container-main">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        {/* Why Support */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t("why.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <Card key={reason.key} className="flex items-start gap-4">
                <div className="text-[var(--color-primary)] shrink-0">
                  {reason.icon}
                </div>
                <p className="text-[var(--color-foreground)]">
                  {t(`why.${reason.key}`)}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-background-dark)] text-white rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Interessiert?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Kontaktieren Sie uns für ein unverbindliches Gespräch über Partnerschaften und Sponsoring-Möglichkeiten.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`/${locale}/kontakt`} size="lg">
              {t("cta")}
            </Button>
            <a
              href="/documents/sponsoring-jvs.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t("brochure")}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

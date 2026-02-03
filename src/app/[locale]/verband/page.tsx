import { getTranslations } from "next-intl/server";
import { SectionHeader, Card, ValueCard } from "@/components/ui";

interface VerbandPageProps {
  params: Promise<{ locale: string }>;
}

const vorstand = [
  { name: "Remo Prinz", role: "Präsident", bio: "Gründer und Visionär des Jassverbands Schweiz" },
  { name: "Fabian Cadonau", role: "Vizepräsident", bio: "Strategie und Partnerschaften" },
  { name: "Dr. Erich Studerus", role: "Aktuar", bio: "Wissenschaft und Dokumentation" },
];

const valueIcons = {
  respect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  fairplay: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  integrity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  inclusion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

export default async function VerbandPage({ params }: VerbandPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "verband" });

  return (
    <div className="section-spacing">
      <div className="container-main">
        {/* Intro */}
        <section className="mb-20">
          <SectionHeader title={t("title")} />
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-3xl mx-auto text-center">
            {t("intro")}
          </p>
        </section>

        {/* Vorstand */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t("vorstand")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vorstand.map((member) => (
              <Card key={member.name} className="text-center">
                {/* Photo Placeholder */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--color-foreground-muted)]">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-[var(--color-primary)] font-medium mb-2">{member.role}</p>
                <p className="text-sm text-[var(--color-foreground-muted)]">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-20 bg-[var(--color-background-alt)] rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t("values.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ValueCard title={t("values.respect")} icon={valueIcons.respect} />
            <ValueCard title={t("values.fairplay")} icon={valueIcons.fairplay} />
            <ValueCard title={t("values.integrity")} icon={valueIcons.integrity} />
            <ValueCard title={t("values.inclusion")} icon={valueIcons.inclusion} />
          </div>
        </section>

        {/* Statuten */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("statuten.title")}</h2>
          <a
            href="/documents/statuten-jvs.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-foreground)] text-white rounded-full hover:bg-[var(--color-foreground)]/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t("statuten.download")}
          </a>
        </section>
      </div>
    </div>
  );
}

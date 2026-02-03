import { getTranslations } from "next-intl/server";
import { Hero, Pillars, Tournament, Ecosystem, Trust } from "@/components/sections";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        cta={t("hero.cta")}
      />
      
      <Pillars
        title={t("pillars.title")}
        tradition={{
          title: t("pillars.tradition.title"),
          description: t("pillars.tradition.description"),
        }}
        youth={{
          title: t("pillars.youth.title"),
          description: t("pillars.youth.description"),
        }}
        future={{
          title: t("pillars.future.title"),
          description: t("pillars.future.description"),
        }}
      />

      <Tournament
        title={t("tournament.title")}
        subtitle={t("tournament.subtitle")}
        cta={t("tournament.cta")}
      />

      <Ecosystem
        title={t("ecosystem.title")}
        subtitle={t("ecosystem.subtitle")}
        jasswiki={{
          title: t("ecosystem.jasswiki.title"),
          description: t("ecosystem.jasswiki.description"),
        }}
        jassguru={{
          title: t("ecosystem.jassguru.title"),
          description: t("ecosystem.jassguru.description"),
        }}
        jassmeister={{
          title: t("ecosystem.jassmeister.title"),
          description: t("ecosystem.jassmeister.description"),
        }}
      />

      <Trust
        badge={t("trust.badge")}
        text={t("trust.text")}
      />
    </>
  );
}

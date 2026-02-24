import { getTranslations } from "next-intl/server";
import { Hero, Vision, MissionTiles, Tournament, Ecosystem, Trust } from "@/components/sections";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const leitbildUrl = "https://jassverband-schweiz.vercel.app/de/leitbild";

  const missionItems = Array.from({ length: 6 }, (_, i) => ({
    title: t(`mission.items.${i}.title`),
    mission: t(`mission.items.${i}.mission`),
  }));

  return (
    <>
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        cta={t("hero.cta")}
      />

      <Vision
        title={t("vision.title")}
        subtitle={t("vision.subtitle")}
        copy={t("vision.copy")}
        cta={t("vision.cta")}
        ctaHref={leitbildUrl}
      />

      <MissionTiles
        title={t("mission.title")}
        items={missionItems}
        cta={t("mission.cta")}
        ctaHref={leitbildUrl}
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

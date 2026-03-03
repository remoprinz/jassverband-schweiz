import { getTranslations } from "next-intl/server";
import { Hero, Vision, StatistikTeaser, SystemrelevanzVideo, MissionTiles, Tournament, Ecosystem, HomeFaq, Trust } from "@/components/sections";

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

  const faqItems = Array.from({ length: 8 }, (_, i) => ({
    question: t(`homeFaq.items.${i}.question`),
    answer: t(`homeFaq.items.${i}.answer`),
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

      <StatistikTeaser
        title={t("statistikTeaser.title")}
        subtitle={t("statistikTeaser.subtitle")}
        copy={t("statistikTeaser.copy")}
        cta1={t("statistikTeaser.cta1")}
        cta2={t("statistikTeaser.cta2")}
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

      <SystemrelevanzVideo
        title={t("systemrelevanz.title")}
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
        jasskalkulator={{
          title: t("ecosystem.jasskalkulator.title"),
          description: t("ecosystem.jasskalkulator.description"),
        }}
        jasskarten={{
          title: t("ecosystem.jasskarten.title"),
          description: t("ecosystem.jasskarten.description"),
        }}
        jasstrainer={{
          title: t("ecosystem.jasstrainer.title"),
          description: t("ecosystem.jasstrainer.description"),
        }}
      />

      <HomeFaq
        title={t("homeFaq.title")}
        items={faqItems}
      />

      <Trust
        badge={t("trust.badge")}
        text={t("trust.text")}
      />
    </>
  );
}

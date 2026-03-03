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

  const faqItems = Array.from({ length: 8 }, (_, i) => {
    const item: any = {
      question: t(`homeFaq.items.${i}.question`),
      answer: t(`homeFaq.items.${i}.answer`),
    };
    
    // Check if links exist for this item
    try {
      const linksCount = t.raw(`homeFaq.items.${i}.links`)?.length || 0;
      if (linksCount > 0) {
        item.links = Array.from({ length: linksCount }, (_, j) => ({
          text: t(`homeFaq.items.${i}.links.${j}.text`),
          url: t(`homeFaq.items.${i}.links.${j}.url`),
        }));
      }
    } catch (e) {
      // No links for this item
    }
    
    return item;
  });

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
        intro={t("statistikTeaser.intro")}
        copy={t("statistikTeaser.copy")}
        cta1={t("statistikTeaser.cta1")}
        cta1Link={t("statistikTeaser.cta1Link")}
        cta2={t("statistikTeaser.cta2")}
        cta2Link={t("statistikTeaser.cta2Link")}
        pdfTitle={t("statistikTeaser.pdfTitle")}
        pdfLink1Label={t("statistikTeaser.pdfLink1Label")}
        pdfLink1Url={t("statistikTeaser.pdfLink1Url")}
        pdfLink2Label={t("statistikTeaser.pdfLink2Label")}
        pdfLink2Url={t("statistikTeaser.pdfLink2Url")}
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

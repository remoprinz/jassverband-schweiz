import { getTranslations } from "next-intl/server";
import {
  Hero,
  Vision,
  Schweizermeisterschaft,
  MissionTiles,
  SystemrelevanzVideo,
  Ecosystem,
  Trust,
  HomeFAQ,
} from "@/components/sections";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const verbandUrl = `/${locale}/verband`;

  const missionItems = Array.from({ length: 3 }, (_, i) => ({
    title: t(`mission.items.${i}.title`),
    mission: t(`mission.items.${i}.mission`),
  }));

  const homeFaqQuestions = [
    {
      question: t("homeFaq.q1.question"),
      answer: t("homeFaq.q1.answer"),
    },
    {
      question: t("homeFaq.q2.question"),
      answer: t("homeFaq.q2.answer"),
    },
    {
      question: t("homeFaq.q3.question"),
      answer: t("homeFaq.q3.answer"),
    },
    {
      question: t("homeFaq.q4.question"),
      answer: t("homeFaq.q4.answer"),
    },
  ];

  return (
    <>
      {/* 1. Hero — Holztisch + Filz */}
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        cta={t("hero.cta")}
        locale={locale}
        altTable={t("hero.altTable")}
        altFelt={t("hero.altFelt")}
        altCard={t("hero.altCard")}
      />

      {/* 2. Vision — Kreidetafel */}
      <Vision
        title={t("vision.title")}
        subtitle={t("vision.subtitle")}
        copy={t("vision.copy")}
        cta={t("vision.cta")}
        ctaHref={`${verbandUrl}#vision`}
      />

      {/* 3. Schweizermeisterschaft — Filz + Overlay */}
      <Schweizermeisterschaft
        title={t("schweizermeisterschaft.title")}
        subtitle={t("schweizermeisterschaft.subtitle")}
        copy={t("schweizermeisterschaft.copy")}
        jugend={t("schweizermeisterschaft.jugend")}
        cta={t("schweizermeisterschaft.cta")}
        locale={locale}
      />

      {/* 4. Mission — Cream (3 Kacheln) */}
      <MissionTiles
        title={t("mission.title")}
        items={missionItems}
        cta={t("mission.cta")}
        ctaHref={verbandUrl}
      />

      {/* 5. SystemrelevanzVideo — Schwarz */}
      <SystemrelevanzVideo
        title={t("systemrelevanz.title")}
      />

      {/* 6. Ecosystem — Weiss (9 Kacheln, 3x3) */}
      <Ecosystem
        title={t("ecosystem.title")}
        subtitle={t("ecosystem.subtitle")}
        whatsapp={{
          title: t("ecosystem.whatsapp.title"),
          description: t("ecosystem.whatsapp.description"),
        }}
        jasswiki={{
          title: t("ecosystem.jasswiki.title"),
          description: t("ecosystem.jasswiki.description"),
        }}
        jasskalkulator={{
          title: t("ecosystem.jasskalkulator.title"),
          description: t("ecosystem.jasskalkulator.description"),
        }}
        jassguru={{
          title: t("ecosystem.jassguru.title"),
          description: t("ecosystem.jassguru.description"),
        }}
        jasskarten={{
          title: t("ecosystem.jasskarten.title"),
          description: t("ecosystem.jasskarten.description"),
        }}
        jassreisen={{
          title: t("ecosystem.jassreisen.title"),
          description: t("ecosystem.jassreisen.description"),
        }}
        jassmeister={{
          title: t("ecosystem.jassmeister.title"),
          description: t("ecosystem.jassmeister.description"),
        }}
        jasstrainer={{
          title: t("ecosystem.jasstrainer.title"),
          description: t("ecosystem.jasstrainer.description"),
        }}
        jassturniere={{
          title: t("ecosystem.jassturniere.title"),
          description: t("ecosystem.jassturniere.description"),
        }}
        badges={{
          free: t("ecosystem.badges.free"),
          member: t("ecosystem.badges.member"),
          preview: t("ecosystem.badges.preview"),
        }}
        comingSoonLabel={t("ecosystem.comingSoon")}
        ctaLabels={{
          jassmeister: t("ecosystem.cta.jassmeister"),
          jassguru: t("ecosystem.cta.jassguru"),
          whatsapp: t("ecosystem.cta.whatsapp"),
          jasskarten: t("ecosystem.cta.jasskarten"),
          jassturniere: t("ecosystem.cta.jassturniere"),
          jassreisen: t("ecosystem.cta.jassreisen"),
          jasskalkulator: t("ecosystem.cta.jasskalkulator"),
          jasstrainer: t("ecosystem.cta.jasstrainer"),
          jasswiki: t("ecosystem.cta.jasswiki"),
        }}
      />

      {/* 7. Testimonials — Cream (auskommentiert bis echte Testimonials vorhanden) */}
      {/* <Testimonials
        title="Was Jasser sagen"
        testimonials={[
          { name: "Nationalrätin", role: "Politik", quote: "Jassen ist Schweizer Kulturgut. Der Verband sorgt dafür, dass es so bleibt." },
          { name: "Student ETH", role: "Zürich", quote: "Endlich kann ich meine Spielstärke messen. Das Elo-System ist genial." },
          { name: "Rentner", role: "Bern", quote: "Ich jasse seit 50 Jahren. Der Verband bringt uns alle zusammen." },
          { name: "Büezer", role: "Luzern", quote: "Die Schweizermeisterschaft ist genau das, was gefehlt hat." },
          { name: "Lehrerin", role: "St. Gallen", quote: "Wir spielen Jassen im Unterricht. Die Schüler lieben es." },
        ]}
      /> */}

      {/* 8. Trust — Trust (#e8e4dc) */}
      <Trust
        badge={t("trust.badge")}
        text={t("trust.text")}
        description={t("trust.description")}
        linkText={t("trust.linkText")}
        altBadge={t("trust.altBadge")}
      />

      {/* 9. FAQ — Weiss */}
      <HomeFAQ
        title={t("homeFaq.title")}
        questions={homeFaqQuestions}
      />
    </>
  );
}

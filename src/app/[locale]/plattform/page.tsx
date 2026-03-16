import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Ecosystem, Hero } from "@/components/sections";

interface PlattformenPageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://jassverband.ch";

export async function generateMetadata({ params }: PlattformenPageProps): Promise<Metadata> {
  const { locale } = await params;

  const meta: Record<string, { title: string; description: string }> = {
    de: {
      title: "Plattform | Jassverband Schweiz",
      description: "Das digitale Jass-Ökosystem des Jassverbands Schweiz mit JassGuru, JassWiki und weiteren Projekten.",
    },
    fr: {
      title: "Plateforme | Fédération Suisse de Jass",
      description: "L'écosystème numérique du Jass en Suisse avec JassGuru, JassWiki et d'autres projets.",
    },
    it: {
      title: "Piattaforma | Federazione Svizzera di Jass",
      description: "L'ecosistema digitale dello Jass in Svizzera con JassGuru, JassWiki e altri progetti.",
    },
  };

  const current = meta[locale] ?? meta.de;

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/plattform`,
      languages: {
        de: `${BASE_URL}/de/plattform`,
        fr: `${BASE_URL}/fr/plattform`,
        it: `${BASE_URL}/it/plattform`,
        "x-default": `${BASE_URL}/de/plattform`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PlattformenPage({ params }: PlattformenPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div>
      <Hero
        title={t("plattform.hero.title")}
        subtitle={t("plattform.hero.subtitle")}
        cta={t("plattform.hero.cta")}
        locale={locale}
        ctaHref={`/${locale}/jasskalkulator`}
        preserveTitleLineBreaks
        mobileFlow
        mobileFlowTitleSize="clamp(22px, 8.5vw, 36px)"
        teaser={{
          label: "JassKalkulator",
          badge: t("plattform.hero.teaserBadge"),
          text: t("plattform.hero.teaserText"),
        }}
        altTable={t("hero.altTable")}
        altFelt={t("hero.altFelt")}
        altCard={t("hero.altCard")}
      />

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
    </div>
  );
}

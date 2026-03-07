import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections";
import { VerbandContent } from "./VerbandContent";

interface VerbandPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: VerbandPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("verband.title")} | Jassverband Schweiz`,
    description: t("verband.intro"),
    alternates: {
      canonical: `https://jassverband.ch/${locale}/verband`,
      languages: {
        de: "/de/verband",
        fr: "/fr/verband",
        it: "/it/verband",
      },
    },
  };
}

const praesidiumBase = [
  {
    name: "Remo Prinz",
    key: "remo" as const,
    location: "Zürich",
    image: "/images/praesidium/remo-freigestellt.png",
    imageOffsetY: 8,
    imageScale: 1.1,
  },
  {
    name: "Fabian Cadonau",
    key: "fabian" as const,
    location: "Flims",
    image: "/images/praesidium/fabian-freigestellt.png",
    imageOffsetY: 8,
    imageScale: 1.05,
  },
  {
    name: "Dr. Erich Studerus",
    key: "erich" as const,
    location: "Basel",
    image: "/images/praesidium/studi-freigestellt.png",
    imageOffsetY: 1,
    imageScale: 1.07,
  },
];

export default async function VerbandPage({ params }: VerbandPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tLeitbild = await getTranslations({ locale, namespace: "leitbild" });

  const praesidium = praesidiumBase.map((p) => ({
    ...p,
    role: t(`verband.praesidium.${p.key}.role`),
    quote: t(`verband.praesidium.${p.key}.quote`),
    description: t(`verband.praesidium.${p.key}.description`),
  }));

  const vision = {
    title: tLeitbild("visionTitle"),
    subtitle: tLeitbild("visionSubtitle"),
    copy: tLeitbild("visionCopy"),
  };

  const missions = Array.from({ length: 6 }, (_, i) => ({
    title: tLeitbild(`missions.${i}.title`),
    mission: tLeitbild(`missions.${i}.mission`),
    kernidee: tLeitbild(`missions.${i}.kernidee`),
  }));

  return (
    <div>
      <Hero
        title={t("verband.hero.title")}
        subtitle={t("verband.hero.subtitle")}
        cta={t("verband.hero.cta")}
        locale={locale}
        ctaHref={`/${locale}/mitmachen`}
        preserveTitleLineBreaks
        mobileFlow
        mobileUniformTitleSize
        mobileSubtitleMarginTop="74px"
        altTable={t("hero.altTable")}
        altFelt={t("hero.altFelt")}
        altCard={t("hero.altCard")}
      />
      <VerbandContent
        praesidiumTitle={t("verband.praesidiumTitle")}
        praesidiumSubtitle={t("verband.praesidiumSubtitle")}
        statutenTitle={t("verband.statuten.title")}
        statutenDownload={t("verband.statuten.download")}
        statutenDescription={t("verband.statuten.description")}
        vision={vision}
        missionsTitle={tLeitbild("missionsTitle")}
        missions={missions}
        praesidium={praesidium}
      />
    </div>
  );
}

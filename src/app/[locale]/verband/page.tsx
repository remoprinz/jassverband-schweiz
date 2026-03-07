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

const praesidium = [
  {
    name: "Remo Prinz",
    role: "Präsident",
    location: "Zürich",
    image: "/images/praesidium/remo-freigestellt.png",
    imageOffsetY: 8,
    imageScale: 1.1,
    quote: "Ich glaube nicht an Glück. Daher konzentriere ich mich beim Ablupfen besonders.",
    description:
      "Remo treibt die Digitalisierung des Schweizer Nationalspiels voran. Mit JassGuru und JassWiki macht er Wissen, Regeln und Resultate erstmals schweizweit zugänglich. Im Verband sorgt er dafür, dass Tradition und Technologie zusammenfinden.",
  },
  {
    name: "Fabian Cadonau",
    role: "Vizepräsident",
    location: "Flims",
    image: "/images/praesidium/fabian-freigestellt.png",
    imageOffsetY: 8,
    imageScale: 1.05,
    quote: "Im Jassen spiegelt sich die Welt.",
    description:
      "Fabian kennt die Schweizer Jassszene wie kaum ein anderer. Als Redaktor von Trumpf-As und erfahrener Turnierleiter weiss er, was Spielerinnen und Spieler bewegt. Im Verband bringt er die Perspektive vom Stammtisch bis zum Turniersaal ein.",
  },
  {
    name: "Dr. Erich Studerus",
    role: "Aktuar",
    location: "Basel",
    image: "/images/praesidium/studi-freigestellt.png",
    imageOffsetY: 1,
    imageScale: 1.07,
    quote: "Jassen ist wie eine Gleichung: Am Ende muss es irgendwie aufgehen.",
    description:
      "Erich ist Statistik-Dozent an der FHNW und betreibt seit 2008 jassstatistik.ch. Im Verband sorgt er dafür, dass alles seinen richtigen Weg geht — rechtlich, organisatorisch, dokumentarisch.",
  },
];

export default async function VerbandPage({ params }: VerbandPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tLeitbild = await getTranslations({ locale, namespace: "leitbild" });

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
        title={"Damit Jassen\nlebendig bleibt."}
        subtitle="Seit dem 15. Januar 2026 setzen wir uns aktiv für die Erhaltung und Förderung der Schweizer Jasskultur ein."
        cta="Mitglied werden"
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

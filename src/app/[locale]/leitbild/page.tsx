import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LeitbildContent } from "./LeitbildContent";

interface LeitbildPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LeitbildPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("leitbild.title");

  return {
    title: `${title} | Jassverband Schweiz`,
    description: t("vision.text"),
  };
}

export default async function LeitbildPage({ params }: LeitbildPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const vision = {
    title: t("leitbild.visionTitle"),
    text: t("leitbild.visionText"),
  };

  const missions = Array.from({ length: 6 }, (_, i) => ({
    title: t(`leitbild.missions.${i}.title`),
    mission: t(`leitbild.missions.${i}.mission`),
    kernidee: t(`leitbild.missions.${i}.kernidee`),
  }));

  const missionsTitle = t("leitbild.missionsTitle");

  return (
    <div className="section-spacing">
      <LeitbildContent
        vision={vision}
        missionsTitle={missionsTitle}
        missions={missions}
      />
    </div>
  );
}

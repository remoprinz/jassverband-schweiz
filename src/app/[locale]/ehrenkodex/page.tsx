import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { EhrenkodexContent } from "./EhrenkodexContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("ehrenkodex.title")} | Jassverband Schweiz`,
    description: t("ehrenkodex.intro").slice(0, 160),
  };
}

export default async function EhrenkodexPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <EhrenkodexContent
      title={t("ehrenkodex.title")}
      subtitle={t("ehrenkodex.subtitle")}
      intro={t("ehrenkodex.intro")}
      fairplayTitle={t("ehrenkodex.fairplayTitle")}
      fairplayIntro={t("ehrenkodex.fairplayIntro")}
      fairplay1Title={t("ehrenkodex.fairplay1Title")}
      fairplay1Text={t("ehrenkodex.fairplay1Text")}
      fairplay2Title={t("ehrenkodex.fairplay2Title")}
      fairplay2Text={t("ehrenkodex.fairplay2Text")}
      fairplay3Title={t("ehrenkodex.fairplay3Title")}
      fairplay3Text={t("ehrenkodex.fairplay3Text")}
      konsequenzenTitle={t("ehrenkodex.konsequenzenTitle")}
      konsequenzenIntro={t("ehrenkodex.konsequenzenIntro")}
      konsequenzenWarning={t("ehrenkodex.konsequenzenWarning")}
      konsequenzenList={[
        t("ehrenkodex.konsequenzenList.0"),
        t("ehrenkodex.konsequenzenList.1"),
        t("ehrenkodex.konsequenzenList.2"),
        t("ehrenkodex.konsequenzenList.3"),
      ]}
      konsequenzenFooter={t("ehrenkodex.konsequenzenFooter")}
      botschafterTitle={t("ehrenkodex.botschafterTitle")}
      botschafterText1={t("ehrenkodex.botschafterText1")}
      botschafterText2={t("ehrenkodex.botschafterText2")}
      zielTitle={t("ehrenkodex.zielTitle")}
      zielText={t("ehrenkodex.zielText")}
      zielQuote={t("ehrenkodex.zielQuote")}
      cta={t("ehrenkodex.cta")}
      locale={locale}
    />
  );
}

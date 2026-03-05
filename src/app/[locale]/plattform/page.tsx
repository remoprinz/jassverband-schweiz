import { getTranslations } from "next-intl/server";
import { Ecosystem, Hero } from "@/components/sections";

interface PlattformenPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlattformenPage({ params }: PlattformenPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div>
      <Hero
        title={"Gemeinsam stärker\n— statt isoliert."}
        subtitle="In unserem Ökosystem führen wir Tools, Experten und Jass-Wissen zusammen."
        cta="jetzt testen"
        locale={locale}
        ctaHref={`/${locale}/jasskalkulator`}
        preserveTitleLineBreaks
        teaser={{
          label: "JassKalkulator",
          text: "Beende das Rätselraten und lerne deine Chancen beim Ansagen kennen:",
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
      />
    </div>
  );
}

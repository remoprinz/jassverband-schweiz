import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui";

interface DatenschutzPageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://jassverband.ch";

export async function generateMetadata({ params }: DatenschutzPageProps): Promise<Metadata> {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    de: "Datenschutz | Jassverband Schweiz",
    fr: "Protection des données | Fédération Suisse de Jass",
    it: "Protezione dei dati | Federazione Svizzera di Jass",
  };

  return {
    title: titleByLocale[locale] ?? titleByLocale.de,
    alternates: {
      canonical: `${BASE_URL}/${locale}/datenschutz`,
      languages: {
        de: `${BASE_URL}/de/datenschutz`,
        fr: `${BASE_URL}/fr/datenschutz`,
        it: `${BASE_URL}/it/datenschutz`,
        "x-default": `${BASE_URL}/de/datenschutz`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function DatenschutzPage({ params }: DatenschutzPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "datenschutz" });

  return (
    <div className="section-spacing">
      <div className="container-main max-w-3xl">
        <SectionHeader title={t("title")} centered={false} />

        <div className="prose prose-lg max-w-none">
          <p className="lead">{t("intro")}</p>

          <h2>{t("responsible")}</h2>
          <p>
            Jassverband Schweiz (JVS)<br />
            Hirslanderstrasse 34<br />
            8032 Zürich<br />
            E-Mail: <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>
          </p>

          <h2>{t("dataCollection")}</h2>
          <p>{t("dataCollectionText")}</p>
          <ul>
            {(t.raw("dataItems") as string[]).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{t("purposeSection")}</h2>
          <p>{t("purposeText")}</p>

          <h2>{t("cookies")}</h2>
          <p>{t("cookiesText")}</p>

          <h2>{t("externalLinks")}</h2>
          <p>{t("externalLinksText")}</p>

          <h2>{t("rights")}</h2>
          <p>
            {t("rightsText")}{" "}
            <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>.
          </p>

          <h2>{t("law")}</h2>
          <p>{t("lawText")}</p>

          <p className="text-sm text-[var(--color-foreground-muted)] mt-12">
            {t("updated")}
          </p>
        </div>
      </div>
    </div>
  );
}

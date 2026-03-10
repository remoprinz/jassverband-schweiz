import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui";

interface ImpressumPageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://jassverband.ch";

export async function generateMetadata({ params }: ImpressumPageProps): Promise<Metadata> {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    de: "Impressum | Jassverband Schweiz",
    fr: "Mentions légales | Fédération Suisse de Jass",
    it: "Note legali | Federazione Svizzera di Jass",
  };

  return {
    title: titleByLocale[locale] ?? titleByLocale.de,
    alternates: {
      canonical: `${BASE_URL}/${locale}/impressum`,
      languages: {
        de: `${BASE_URL}/de/impressum`,
        fr: `${BASE_URL}/fr/impressum`,
        it: `${BASE_URL}/it/impressum`,
        "x-default": `${BASE_URL}/de/impressum`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function ImpressumPage({ params }: ImpressumPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impressum" });

  return (
    <div className="section-spacing">
      <div className="container-main max-w-3xl">
        <SectionHeader title={t("title")} centered={false} />

        <div className="prose prose-lg max-w-none">
          <h2>{t("verein")}</h2>
          <p>
            <strong>Jassverband Schweiz (JVS)</strong><br />
            {t("legalForm")}
          </p>

          <h3>{t("contact")}</h3>
          <p>
            Hirslanderstrasse 34<br />
            8032 Zürich<br />
            Schweiz
          </p>
          <p>
            E-Mail: <a href="mailto:info@jassverband.ch">info@jassverband.ch</a><br />
            Telefon: <a href="tel:+41792375208">+41 79 237 52 08</a>
          </p>

          <h3>{t("responsible")}</h3>
          <p>
            Remo Prinz, {t("presidentRole")}<br />
            E-Mail: <a href="mailto:remo@jassverband.ch">remo@jassverband.ch</a>
          </p>

          <h3>{t("founding")}</h3>
          <p>{t("foundingDate")}</p>

          <h3>{t("purpose")}</h3>
          <p>{t("purposeText")}</p>

          <h3>{t("disclaimer")}</h3>
          <p>{t("disclaimerText1")}</p>
          <p>{t("disclaimerText2")}</p>
        </div>
      </div>
    </div>
  );
}

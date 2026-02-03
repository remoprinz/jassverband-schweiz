import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui";

interface ImpressumPageProps {
  params: Promise<{ locale: string }>;
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
            Verein nach Art. 60 ff. ZGB
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
            Remo Prinz, Präsident<br />
            E-Mail: <a href="mailto:remo@jassverband.ch">remo@jassverband.ch</a>
          </p>

          <h3>Gründungsdatum</h3>
          <p>15. Januar 2026</p>

          <h3>Vereinszweck</h3>
          <p>
            Der Verein bezweckt die Förderung, Erhaltung und innovative Vermittlung des Jassens 
            als schweizerisches immaterielles Kulturgut sowie als strategischer Denksport.
          </p>

          <h3>Haftungsausschluss</h3>
          <p>
            Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, 
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte 
            externer Links. Für den Inhalt der verlinkten Seiten sind ausschliesslich deren 
            Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </div>
  );
}

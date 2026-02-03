import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui";

interface DatenschutzPageProps {
  params: Promise<{ locale: string }>;
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

          <h2>Verantwortliche Stelle</h2>
          <p>
            Jassverband Schweiz (JVS)<br />
            Hirslanderstrasse 34<br />
            8032 Zürich<br />
            E-Mail: <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>
          </p>

          <h2>Erhebung und Verarbeitung von Daten</h2>
          <p>
            Wir erheben personenbezogene Daten nur, wenn Sie uns diese im Rahmen einer 
            Kontaktanfrage freiwillig mitteilen. Dies umfasst:
          </p>
          <ul>
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Ihre Nachricht</li>
          </ul>

          <h2>Verwendungszweck</h2>
          <p>
            Die von Ihnen übermittelten Daten werden ausschliesslich zur Bearbeitung 
            Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>

          <h2>Cookies und Tracking</h2>
          <p>
            Diese Website verwendet <strong>keine Cookies</strong> und 
            <strong> keine Tracking-Tools</strong>. Wir erfassen keine Nutzungsdaten 
            und erstellen keine Nutzerprofile.
          </p>

          <h2>Externe Links</h2>
          <p>
            Unsere Website enthält Links zu externen Websites (jasswiki.ch, jassguru.ch, 
            jassmeister.web.app). Für die Datenschutzpraktiken dieser externen Seiten 
            sind wir nicht verantwortlich.
          </p>

          <h2>Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung 
            Ihrer bei uns gespeicherten Daten. Kontaktieren Sie uns hierfür unter 
            <a href="mailto:info@jassverband.ch"> info@jassverband.ch</a>.
          </p>

          <h2>Anwendbares Recht</h2>
          <p>
            Es gilt das Schweizerische Datenschutzgesetz (revDSG). Gerichtsstand ist Zürich.
          </p>

          <p className="text-sm text-[var(--color-foreground-muted)] mt-12">
            Stand: Februar 2026
          </p>
        </div>
      </div>
    </div>
  );
}

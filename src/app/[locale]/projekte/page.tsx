import { getTranslations } from "next-intl/server";
import { SectionHeader, ProjectCard } from "@/components/ui";

interface ProjektePageProps {
  params: Promise<{ locale: string }>;
}

const icons = {
  jasswiki: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  jassguru: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  jassmeister: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

export default async function ProjektePage({ params }: ProjektePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const projects = [
    {
      key: "jasswiki",
      href: "https://jasswiki.ch",
      icon: icons.jasswiki,
      title: t("ecosystem.jasswiki.title"),
      description: t("ecosystem.jasswiki.description"),
    },
    {
      key: "jassguru",
      href: "https://jassguru.ch",
      icon: icons.jassguru,
      title: t("ecosystem.jassguru.title"),
      description: t("ecosystem.jassguru.description"),
    },
    {
      key: "jassmeister",
      href: "https://jassmeister.web.app",
      icon: icons.jassmeister,
      title: t("ecosystem.jassmeister.title"),
      description: t("ecosystem.jassmeister.description"),
    },
  ];

  return (
    <div className="section-spacing">
      <div className="container-main">
        <SectionHeader
          title={t("projekte.title")}
          subtitle={t("projekte.subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.key}
              title={project.title}
              description={project.description}
              href={project.href}
              icon={<div className="w-12 h-12">{project.icon}</div>}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-[var(--color-background-alt)] rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            Gemeinsam für die Zukunft des Jassens
          </h3>
          <p className="text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            Alle Plattformen sind Teil des digitalen Ökosystems des Jassverbands Schweiz. 
            Sie ergänzen sich gegenseitig und bieten der Jass-Community ein umfassendes Angebot 
            von Wissen über Training bis zum Wettkampf.
          </p>
        </div>
      </div>
    </div>
  );
}

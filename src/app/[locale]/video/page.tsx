import { SystemrelevanzVideo } from '@/components/sections/SystemrelevanzVideo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Jassen ist systemrelevant | Jassverband Schweiz',
    description: 'Weshalb braucht die Schweiz einen nationalen Jassverband? Alain Berset erklärt es.',
  };
}

export default async function VideoPage({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-black">
      {/* Video — mit Standard-Abständen wie andere Seiten */}
      <div className="w-full">
        <SystemrelevanzVideo title="Weshalb braucht es den Jassverband?" />
      </div>

      {/* Minimaler Footer */}
      <div className="text-center pb-6 text-white/40 text-sm">
        <a href={`/${locale}`} className="hover:text-white/70 transition-colors">
          www.jassverband.ch
        </a>
      </div>
    </main>
  );
}

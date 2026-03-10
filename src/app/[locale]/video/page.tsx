import { SystemrelevanzVideo } from '@/components/sections/SystemrelevanzVideo';
import Image from 'next/image';

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
    <main className="min-h-screen bg-black flex flex-col">
      {/* Minimaler Header */}
      <div className="flex justify-center pt-8 pb-4">
        <a href={`/${locale}`}>
          <Image
            src="/images/logos/JVS Logo weiss.svg"
            alt="Jassverband Schweiz"
            width={180}
            height={48}
            className="h-10 w-auto"
          />
        </a>
      </div>

      {/* Video — zentriert, prominent */}
      <div className="flex-1 flex items-center">
        <div className="w-full">
          <SystemrelevanzVideo title="Weshalb braucht es den Jassverband?" />
        </div>
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

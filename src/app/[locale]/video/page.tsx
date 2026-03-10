import { SystemrelevanzVideo } from '@/components/sections/SystemrelevanzVideo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Jassen ist systemrelevant | Jassverband Schweiz',
    description: 'Weshalb braucht die Schweiz einen nationalen Jassverband? Alain Berset erklärt es.',
  };
}

export default async function VideoPage({ params }: Props) {
  await params;

  return (
    <main className="min-h-screen bg-black">
      <div className="w-full">
        <SystemrelevanzVideo title="Weshalb braucht es den Jassverband?" />
      </div>
    </main>
  );
}

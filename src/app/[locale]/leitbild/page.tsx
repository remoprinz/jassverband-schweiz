import { redirect } from "next/navigation";

interface LeitbildPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LeitbildPage({ params }: LeitbildPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/verband`);
}

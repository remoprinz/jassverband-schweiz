import { redirect } from "next/navigation";
import { setRequestLocale } from 'next-intl/server';

interface LeitbildPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LeitbildPage({ params }: LeitbildPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect(`/${locale}/verband`);
}

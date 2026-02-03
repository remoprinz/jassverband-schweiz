import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jassverband Schweiz",
  description: "Der Jassverband Schweiz fördert das Schweizer Nationalspiel als modernen Denksport.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

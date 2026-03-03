import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jassverband Schweiz",
  description: "Der Jassverband Schweiz fördert das Schweizer Nationalspiel als modernen Denksport.",
  icons: {
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180" }],
    icon: [
      { url: "/favicon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=2", type: "image/png", sizes: "16x16" },
    ],
    shortcut: ["/favicon.ico?v=2"],
  },
  manifest: "/site.webmanifest?v=2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

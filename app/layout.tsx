import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://things.marvlock.com"),
  title: {
    default: "Things — Neobrutalist React Components",
    template: "%s | Things",
  },
  description: "An open-source collection of accessible, neobrutalist React components built with Tailwind CSS.",
  applicationName: "Things",
  keywords: ["React components", "Tailwind CSS", "shadcn", "accessible UI", "neobrutalism"],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Things",
    title: "Things — Neobrutalist React Components",
    description: "Accessible, neobrutalist React components built with Tailwind CSS.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Things — Neobrutalist React Components",
    description: "Accessible, neobrutalist React components built with Tailwind CSS.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
}

import { SmoothScroll } from "./components/smooth-scroll";
import { AskAIFAB } from "./components/ask-ai-fab";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={space_grotesk.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Things",
              url: "https://things.marvlock.com",
              description: "An open-source collection of accessible, neobrutalist React components built with Tailwind CSS.",
            }),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <AskAIFAB />
      </body>
    </html>
  );
}

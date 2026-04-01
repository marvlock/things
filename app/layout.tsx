import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Things",
  description: "A collection of things-styled components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={space_grotesk.className}>{children}</body>
    </html>
  );
}
      
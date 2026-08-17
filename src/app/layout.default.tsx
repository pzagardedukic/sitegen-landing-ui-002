import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppProviders from "./AppProviders";
import { getHomeMeta } from "@/core/static";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";

const homeMeta = getHomeMeta();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={homeMeta.primaryLanguage}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <OrganizationJsonLd />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

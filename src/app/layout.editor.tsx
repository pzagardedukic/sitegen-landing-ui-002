import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppProviders from "./AppProviders";
import { getHomeMeta } from "@/core/static";

const homeMeta = getHomeMeta();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={homeMeta.primaryLanguage}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

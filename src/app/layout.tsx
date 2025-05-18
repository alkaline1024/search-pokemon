import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Search Pokémon",
  description: "Pokédex Search Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="segment fixed top-0 right-0 left-0 z-10 flex h-16 items-center justify-start gap-4 !rounded-none">
          <Image width={42} height={42} src="/images/logo.png" alt="Logo" />
          <h1 className="text-lg font-semibold">
            <span className="text-primary-500">Search</span> Pokémon
          </h1>
        </div>
        <div className="container mx-auto mt-16">{children}</div>
      </body>
    </html>
  );
}

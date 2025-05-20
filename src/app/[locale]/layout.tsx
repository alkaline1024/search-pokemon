import "@/app/globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Lato, Noto_Sans_Thai } from "next/font/google";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import ScrollToTopButton from "@/app/_components/ScrollToTopButton";
import { FavoritePageButton, ChangeLanguageButton } from "@/app/_components";

const loto = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Search Pokémon",
  description: "Pokédex Search Web App",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${locale === "th" ? notoSansThai.className : loto.className} antialiased`}
      >
        <NextIntlClientProvider>
          <div className="segment fixed top-0 right-0 left-0 z-10 flex h-16 items-center justify-between gap-4 !rounded-none">
            <Link href="/pokemons" className="flex items-center gap-4">
              <Image width={42} height={42} src="/images/logo.png" alt="Logo" />
              <h1 className="text-lg font-semibold">
                <span className="text-primary-500">Search</span> Pokémon
              </h1>
            </Link>

            <div className="flex items-center gap-4">
              <FavoritePageButton />
              <ChangeLanguageButton />
            </div>
          </div>
          <div className="container mx-auto mt-16">{children}</div>
          <ScrollToTopButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

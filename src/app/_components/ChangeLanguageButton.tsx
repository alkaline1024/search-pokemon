"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ChangeLanguageButton() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const newLocale = locale === "th" ? "en" : "th";
  return (
    <Link
      href={
        pathname
          ? `/${pathname.replace(/^\/(en|th)/, newLocale)}`
          : `/${newLocale}`
      }
      className="flex w-22 items-center justify-center gap-3 rounded bg-white py-2 font-medium text-gray-600 shadow transition-all hover:bg-gray-100 hover:shadow-lg"
      title={locale === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
    >
      <Image
        width={30}
        height={18}
        src={`/images/flags/flag-${locale === "en" ? "th" : "en"}.png`}
        alt={`Flag ${locale === "en" ? "th" : "en"}`}
      />
      {locale === "th" ? "EN" : "TH"}
    </Link>
  );
}

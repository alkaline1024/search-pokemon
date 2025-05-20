"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const FavoritePageButton = () => {
  const t = useTranslations();
  const { locale } = useParams();
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/${locale}/favorites`);
  return (
    <Link
      href="/favorites"
      className={`group ${isActive ? "!bg-primary-500 !text-white" : "hover:bg-primary-500 bg-white hover:text-white hover:shadow-lg"} flex cursor-pointer items-center gap-2 rounded px-4 py-2 font-medium text-gray-600 shadow transition-all`}
    >
      <span
        className={`${isActive ? "filled" : ""} material-symbols-outlined mt-1`}
      >
        favorite
      </span>
      {t("my-favorite")}
    </Link>
  );
};

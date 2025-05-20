"use client";

import { PokeCardList } from "@/app/_components";
import { AppButton } from "@/app/_components/AppButton";
import { getFavorites } from "@/utils/favourite";
import { useTranslations } from "next-intl";

export default function PokemonListPage() {
  const favoritePokemons = getFavorites();
  const t = useTranslations();
  return (
    <div className="grid gap-4 p-4">
      <AppButton />
      <h1 className="pt-4 text-center text-2xl font-bold">
        {t("my-favorite-pokemon")}
      </h1>
      {favoritePokemons.length <= 0 ? (
        <div className="text-center opacity-60">
          <span>{t("no-favorites")}</span>
        </div>
      ) : (
        <PokeCardList pokemons={favoritePokemons} />
      )}
    </div>
  );
}

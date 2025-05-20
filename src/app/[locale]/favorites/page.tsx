"use client";

import { PokeCardList } from "@/app/_components";
import { AppButton } from "@/app/_components/AppButton";
import { getFavorites } from "@/utils/favourite";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function PokemonListPage() {
  const t = useTranslations();
  const favoritePokemons = getFavorites();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div className="grid gap-4 p-4 max-lg:px-2">
      <AppButton />
      <h1 className="pt-4 text-center text-2xl font-bold">
        {t("my-favorite-pokemon")}
      </h1>
      {favoritePokemons.length <= 0 ? (
        loaded && (
          <div className="text-center opacity-60">
            <span>{t("no-favorites")}</span>
          </div>
        )
      ) : (
        <PokeCardList pokemons={favoritePokemons} />
      )}
    </div>
  );
}

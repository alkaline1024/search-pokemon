import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { PokeCard, PokeCardSkeleton } from "./PokeCard";
import { PokeTypeLabel } from "./PokeTypeLabel";

export const PokeCardList = ({
  pokemons,
  className = "",
  loading = false,
  loadingAmount = 0,
  searching = false,
  searchText = "",
  filterType = "",
  onTypeClick,
}: {
  pokemons: IPokemonCard[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
  loading?: boolean;
  loadingAmount?: number;
  searching?: boolean;
  searchText?: string;
  filterType?: string;
  onTypeClick?: (type: string) => void;
}) => {
  const t = useTranslations();
  if (!loading && !searching && pokemons.length === 0) {
    if (searchText.length > 0 || filterType.length > 0) {
      return (
        <div className="h-full w-full py-8 text-center">
          <div className="text-2xl font-bold">{t("pokemon-not-found")}</div>
          <div className="mt-4 space-y-4 text-sm">
            <div className="text-gray-500">
              {t("pokemon-search-not-found-description")}
            </div>
            <div className="mx-auto flex items-center justify-center gap-2">
              {filterType && <PokeTypeLabel type={filterType} />}
              <div className="truncate">{searchText && `"${searchText}"`}</div>
            </div>
          </div>
        </div>
      );
    }

    setTimeout(() => {
      return (
        <div className="h-full w-full py-8 text-center">
          <div className="text-2xl font-bold">{t("pokemon-not-found")}</div>
          <div className="mt-2 text-sm text-gray-500">
            {t("try-again-later")}
          </div>
        </div>
      );
    }, 300);
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {loading
        ? Array.from({ length: loadingAmount }).map((_, idx) =>
            PokeCardSkeleton(idx),
          )
        : pokemons.map((pokemon) => {
            return (
              <PokeCard
                key={pokemon.id}
                pokemon={pokemon}
                onTypeClick={onTypeClick}
              />
            );
          })}
      {searching ? PokeCardSkeleton(0) : null}
    </div>
  );
};

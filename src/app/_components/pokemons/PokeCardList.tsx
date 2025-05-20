import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { PokeCard, PokeCardSkeleton } from "./PokeCard";

export interface PokeCardListProps {
  pokemons: IPokemonCard[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
  loading?: boolean;
  loadingAmount?: number;
  searching?: boolean;
  onTypeClick?: (type: string) => void;
}

export const PokeCardList = ({
  pokemons,
  className = "",
  loading = false,
  loadingAmount = 0,
  searching = false,
  onTypeClick,
}: PokeCardListProps) => {
  const t = useTranslations();
  if (!loading && !searching && pokemons.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center py-8">
        <div className="text-center">
          <div className="text-2xl font-bold">{t("pokemon-not-found")}</div>
          <div className="mt-2 text-sm text-gray-500">
            {t("try-again-later")}
          </div>
        </div>
      </div>
    );
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
                <PokeCard key={pokemon.id} pokemon={pokemon} onTypeClick={onTypeClick} />
            );
          })}
      {searching ? PokeCardSkeleton(0) : null}
    </div>
  );
};

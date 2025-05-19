"use client";

import { HTMLAttributes } from "react";
import Image from "next/image";

interface PokeCardListProps {
  pokemons: IPokemon[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
  loading?: boolean;
  loadingAmount?: number;
  searching?: boolean;
  onTypeClick?: (type: string) => void;
}

export const PokeCardSkeleton = (idx: number) => (
  <div key={`loading-skeleton-${idx}`}>
    <div className="flex animate-pulse flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow">
      <div className="h-32 w-full rounded bg-gray-100" />
      <div className="space-y-[6px] text-center">
        <div className="mx-auto h-5 w-12 rounded bg-gray-100" />
        <div className="mx-auto h-6 w-32 rounded bg-gray-200" />
        <div className="flex flex-wrap justify-center gap-1">
          <span className="h-6 w-16 rounded bg-gray-100" />
          <span className="h-6 w-16 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  </div>
);

export const PokeCard = ({
  pokemon,
  onTypeClick,
}: {
  pokemon: IPokemon;
  onTypeClick?: (type: string) => void;
}) => (
  <div key={pokemon.id}>
    <div
      id={pokemon.id}
      className="segment flex cursor-pointer flex-col gap-4 transition-all"
    >
      <Image
        id={`${pokemon.id}-image`}
        src={pokemon.image}
        alt={pokemon.name}
        unoptimized
        width={128}
        height={128}
        loading="lazy"
        priority={false}
        className="mx-auto h-32 object-contain object-center"
      />
      <div className="text-center">
        <div className="text-sm opacity-60">#{pokemon.number}</div>
        <div className="text-lg font-bold">{pokemon.name}</div>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`type type-${type.toLowerCase()} cursor-pointer border-2 border-white transition-shadow hover:shadow-xl hover:outline-2`}
              tabIndex={0}
              role="button"
              onClick={() => onTypeClick?.(type)}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const PokeCardList = ({
  pokemons,
  className = "",
  loading = false,
  loadingAmount = 0,
  searching = false,
  onTypeClick,
}: PokeCardListProps) => {
  if (!loading && pokemons.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center py-8">
        <div className="text-center">
          <div className="text-2xl font-bold">Pokémon Not Found</div>
          <div className="mt-2 text-sm text-gray-500">
            Please try again later or check your network connection.
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

"use client";

import { HTMLAttributes } from "react";
import Image from "next/image";

interface PokeCardListProps {
  pokemons: IPokemon[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
  loading?: boolean;
}

export default function PokeCardList({
  pokemons,
  className = "",
  loading = false,
}: PokeCardListProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {loading
        ? Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="flex animate-pulse flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow"
            >
              <div className="h-32 w-full rounded bg-gray-200" />
              <div className="space-y-[6px] text-center">
                <div className="mx-auto h-5 w-12 rounded bg-gray-200" />
                <div className="mx-auto h-7 w-32 rounded bg-gray-300" />
                <div className="flex flex-wrap justify-center gap-1">
                  <span className="h-7 w-16 rounded bg-gray-200" />
                  <span className="h-7 w-16 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))
        : pokemons.map((pokemon) => {
            return (
              <div key={pokemon.id}>
                <div
                  id={pokemon.id}
                  className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow"
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
                    className="h-32 w-full object-contain object-center"
                  />
                  <div className="text-center">
                    <div className="text-sm opacity-60">#{pokemon.number}</div>
                    <div className="text-lg font-bold">{pokemon.name}</div>
                    <div className="mt-1 flex flex-wrap justify-center gap-1">
                      {pokemon.types.map((type) => (
                        <span
                          key={type}
                          className={`type type-${type.toLowerCase()} `}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}

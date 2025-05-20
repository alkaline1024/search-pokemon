"use client";

import Image from "next/image";
import Link from "next/link";
import { PokeTypeLabel } from "./PokeTypeLabel";
import { pokemonClassNames } from "@/utils/pokemonClasses";
import { HTMLAttributes, useState } from "react";
import { isFavorite, toggleInFavorites } from "@/utils/favourite";

export const PokeCardSkeleton = (idx: number) => (
  <div key={`loading-skeleton-${idx}`}>
    <div className="flex animate-pulse flex-col gap-4 rounded-lg border-4 border-white bg-white p-4 shadow">
      <div className="h-48 w-full rounded border-2 border-white bg-gray-100" />
      <div className="space-y-[6px] py-4 text-center">
        <div className="mx-auto h-5 w-12 rounded bg-gray-100" />
        <div className="mx-auto h-6 w-32 rounded bg-gray-200" />
        <div className="flex flex-wrap justify-center gap-1">
          <span className="h-[32px] w-16 rounded bg-gray-100" />
          <span className="h-[32px] w-16 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  </div>
);

export const PokeCard = ({
  pokemon,
  className = "",
  disabledFavorite = false,
  onTypeClick,
}: {
  pokemon: IPokemonDetail | IPokemonCard | IPokemonEvolution;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  disabledFavorite?: boolean;
  onTypeClick?: (type: string) => void;
}) => {
  const pokemonTypes = pokemon.types.map((type) => type.toLowerCase());
  let fromColor = "";
  let toColor = "";
  let type1Class;
  let type2Class;
  if (pokemonTypes.length >= 1) {
    const type1 = pokemonTypes[0];
    const type2 = pokemonTypes[1];
    type1Class = pokemonClassNames[type1];
    type2Class = pokemonClassNames[type2];
    if (type1Class) {
      fromColor = type1Class.fromColor;
    }
    if (type2Class) {
      toColor = type2Class.toColor;
    } else {
      toColor = type1Class.toColor;
    }
  }

  const [favorite, setFavorite] = useState(isFavorite(pokemon));
  const [animate, setAnimate] = useState(false);
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleInFavorites(pokemon);
    setFavorite(isFavorite(pokemon));
    setAnimate(true);
    setTimeout(() => setAnimate(false), 400);
  };

  return (
    <Link
      id={pokemon.id}
      key={pokemon.id}
      className={`segment group relative flex cursor-pointer flex-col gap-4 border-4 border-white bg-gradient-to-br transition-all ${fromColor} via-transparent via-50% ${toColor} ${className}`}
      href={`/pokemons/${pokemon.name.replaceAll(".", "_")}`}
      prefetch={true}
    >
      {!disabledFavorite && (
        <button
          className={`absolute top-1 right-1 flex aspect-square w-9 cursor-pointer items-center justify-center rounded-full border-2 text-gray-300 opacity-60 transition-all group-hover:opacity-100 ${favorite ? "border-primary-400 hover:scale-90" : "hover:scale-125"}`}
          onClick={(e) => handleToggleFavorite(e)}
        >
          <span
            className={`material-symbols-outlined !text-[22px] ${favorite ? "filled text-primary-400 drop-shadow-lg" : ""} ${animate ? "animate-favorite-bounce" : ""}`}
          >
            favorite
          </span>
        </button>
      )}
      <div className="size-full border-2 border-gray-50 bg-white">
        <Image
          id={`${pokemon.id}-image`}
          src={pokemon.image}
          alt={pokemon.name}
          unoptimized
          width={256}
          height={256}
          loading="lazy"
          priority={false}
          className="mx-auto h-48 object-contain object-center p-6"
        />
      </div>
      <div className="py-4 text-center">
        <div className="text-sm opacity-60">#{pokemon.number}</div>
        <div className="text-lg font-bold">{pokemon.name}</div>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {pokemon.types.map((type) => (
            <PokeTypeLabel key={type} type={type} onClick={onTypeClick} />
          ))}
        </div>
      </div>
    </Link>
  );
};

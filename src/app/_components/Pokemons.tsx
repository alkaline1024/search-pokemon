"use client";

import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

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
}) => {
  return (
    <div key={pokemon.id}>
      <Link
        id={pokemon.id}
        className="segment flex cursor-pointer flex-col gap-4 bg-gradient-to-br transition-all"
        href={`/pokemons/${pokemon.name}`}
      >
        <div className="size-full rounded-full bg-white p-10">
          <Image
            id={`${pokemon.id}-image`}
            src={pokemon.image}
            alt={pokemon.name}
            unoptimized
            width={256}
            height={256}
            loading="lazy"
            priority={false}
            className="aspect-square object-contain object-center"
          />
        </div>
        <div className="text-center">
          <div className="text-sm opacity-60">#{pokemon.number}</div>
          <div className="text-lg font-bold">{pokemon.name}</div>
          <div className="mt-1 flex flex-wrap justify-center gap-1">
            {pokemon.types.map((type) => (
              <PokeTypeLabel key={type} type={type} onClick={onTypeClick} />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

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

export const PokeTypeLabel = ({
  type,
  variant = "solid",
  disabledHover = false,
  className,
  onClick,
}: {
  type: string;
  variant?: "solid" | "outline";
  disabledHover?: boolean;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  onClick?: (type: string) => void;
}) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const typeClasses: {
    [key: string]: {
      textColor: string;
      borderColor: string;
      outlineColor: string;
      backgroundColor: string;
    };
  } = {
    grass: {
      textColor: "text-type-grass-500",
      borderColor: "border-type-grass-500",
      outlineColor: "outline-type-grass-500",
      backgroundColor: "bg-type-grass-500 hover:bg-type-grass-600",
    },
    fire: {
      textColor: "text-type-fire-500",
      borderColor: "border-type-fire-500",
      outlineColor: "outline-type-fire-500",
      backgroundColor: "bg-type-fire-500 hover:bg-type-fire-600",
    },
    water: {
      textColor: "text-type-water-500",
      borderColor: "border-type-water-500",
      outlineColor: "outline-type-water-500",
      backgroundColor: "bg-type-water-500 hover:bg-type-water-600",
    },
    electric: {
      textColor: "text-type-electric-500",
      borderColor: "border-type-electric-500",
      outlineColor: "outline-type-electric-500",
      backgroundColor: "bg-type-electric-500 hover:bg-type-electric-600",
    },
    ice: {
      textColor: "text-type-ice-500",
      borderColor: "border-type-ice-500",
      outlineColor: "outline-type-ice-500",
      backgroundColor: "bg-type-ice-500 hover:bg-type-ice-600",
    },
    fighting: {
      textColor: "text-type-fighting-500",
      borderColor: "border-type-fighting-500",
      outlineColor: "outline-type-fighting-500",
      backgroundColor: "bg-type-fighting-500 hover:bg-type-fighting-600",
    },
    poison: {
      textColor: "text-type-poison-500",
      borderColor: "border-type-poison-500",
      outlineColor: "outline-type-poison-500",
      backgroundColor: "bg-type-poison-500 hover:bg-type-poison-600",
    },
    ground: {
      textColor: "text-type-ground-500",
      borderColor: "border-type-ground-500",
      outlineColor: "outline-type-ground-500",
      backgroundColor: "bg-type-ground-500 hover:bg-type-ground-600",
    },
    flying: {
      textColor: "text-type-flying-500",
      borderColor: "border-type-flying-500",
      outlineColor: "outline-type-flying-500",
      backgroundColor: "bg-type-flying-500 hover:bg-type-flying-600",
    },
    psychic: {
      textColor: "text-type-psychic-500",
      borderColor: "border-type-psychic-500",
      outlineColor: "outline-type-psychic-500",
      backgroundColor: "bg-type-psychic-500 hover:bg-type-psychic-600",
    },
    bug: {
      textColor: "text-type-bug-500",
      borderColor: "border-type-bug-500",
      outlineColor: "outline-type-bug-500",
      backgroundColor: "bg-type-bug-500 hover:bg-type-bug-600",
    },
    rock: {
      textColor: "text-type-rock-500",
      borderColor: "border-type-rock-500",
      outlineColor: "outline-type-rock-500",
      backgroundColor: "bg-type-rock-500 hover:bg-type-rock-600",
    },
    ghost: {
      textColor: "text-type-ghost-500",
      borderColor: "border-type-ghost-500",
      outlineColor: "outline-type-ghost-500",
      backgroundColor: "bg-type-ghost-500 hover:bg-type-ghost-600",
    },
    dragon: {
      textColor: "text-type-dragon-500",
      borderColor: "border-type-dragon-500",
      outlineColor: "outline-type-dragon-500",
      backgroundColor: "bg-type-dragon-500 hover:bg-type-dragon-600",
    },
    dark: {
      textColor: "text-type-dark-500",
      borderColor: "border-type-dark-500",
      outlineColor: "outline-type-dark-500",
      backgroundColor: "bg-type-dark-500 hover:bg-type-dark-600",
    },
    steel: {
      textColor: "text-type-steel-500",
      borderColor: "border-type-steel-500",
      outlineColor: "outline-type-steel-500",
      backgroundColor: "bg-type-steel-500 hover:bg-type-steel-600",
    },
    fairy: {
      textColor: "text-type-fairy-500",
      borderColor: "border-type-fairy-500",
      outlineColor: "outline-type-fairy-500",
      backgroundColor: "bg-type-fairy-500 hover:bg-type-fairy-600",
    },
    default: {
      textColor: "text-gray-500",
      borderColor: "border-gray-500",
      outlineColor: "outline-gray-500",
      backgroundColor: "bg-gray-500 hover:bg-gray-600",
    },
  };

  const currentTypeClass =
    typeClasses[type.toLowerCase()] || typeClasses.default;

  return (
    <button
      onClick={(event) => {
        if (onClick) {
          event.preventDefault();
          onClick(type);
        } else {
          router.push(
            `/pokemons${searchParams.get("type") !== type ? `?type=${type}` : ""}`,
          );
        }
      }}
      className={`type-label flex h-8 cursor-pointer items-center justify-center border-white transition-colors hover:shadow-lg ${variant === "solid" ? `text-white ring-white ${disabledHover ? "outline-1" : "outline-offset-2 hover:ring-1 hover:outline-1"} ${currentTypeClass.backgroundColor} ${currentTypeClass.outlineColor}` : `bg-transparent outline-1 ${currentTypeClass.textColor}`} ${className || ""}`}
    >
      {t(type.toLowerCase())}
    </button>
  );
};

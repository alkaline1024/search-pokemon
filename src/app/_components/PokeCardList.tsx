import { HTMLAttributes } from "react";
import Image from "next/image";

interface PokeCardListProps {
  pokemons: IPokemon[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export default function PokeCardList({
  pokemons,
  className = "",
}: PokeCardListProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={128}
              height={128}
              className="h-32 w-full rounded-lg border bg-white object-contain"
              priority={true}
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
      ))}
    </div>
  );
}

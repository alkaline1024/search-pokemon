"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import apolloClient from "@/lib/apolloClient";
import { GET_POKEMON_BY_NAME } from "@/graphql/pokemonQueries";
import { PokeTypeLabel } from "@/app/_components";
import { PokeEvolutionTree } from "@/app/_components/Pokemons/PokeEvolutionTree";
import { AppButton } from "@/app/_components/AppButton";
import { AttackTable } from "@/app/_components/Pokemons/AttackTable";

const PokemonDetailSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] animate-pulse flex-wrap justify-center gap-4 px-4">
      <div className="w-full">
        <div className="flex max-w-[384px] items-end justify-center gap-2">
          <div className="h-8 w-32 rounded bg-gray-200" />
          <div className="h-6 w-16 rounded bg-gray-200" />
        </div>
      </div>
      <div className="segment w-full max-w-[384px] space-y-4">
        <div className="h-[384px] w-full rounded-lg bg-gray-200" />
        <div>
          <div className="mt-2 h-6 w-32 rounded bg-gray-200" />
          <div className="mt-2 flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-16 rounded bg-gray-100" />
            ))}
          </div>
          <div className="mt-2 h-6 w-32 rounded bg-gray-200" />
          <div className="mb-2 flex flex-wrap gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-16 rounded bg-gray-100" />
            ))}
          </div>
          <div className="mt-2 h-6 w-32 rounded bg-gray-200" />
          <div className="mb-2 flex flex-wrap gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-16 rounded bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex grow flex-col space-y-4">
        <div className="segment *:border-gray-200 *:not-first:pt-3 *:not-last:border-b *:not-last:pb-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <div>
                <div className="h-5 w-20 rounded bg-gray-200" />
                <div className="h-5 w-24 rounded bg-gray-100" />
              </div>
              <div>
                <div className="h-5 w-20 rounded bg-gray-200" />
                <div className="h-5 w-24 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
        <div className="segment grow">
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="space-y-4 pt-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-8 w-full rounded bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
      <div className="segment mb-32 w-full">
        <div className="h-6 w-32 rounded bg-gray-200" />
        <div className="mt-4 flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 w-24 rounded bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<IPokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const t = useTranslations();
  const tDetail = useTranslations("PokemonDetailPage");

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      const decodedName = decodeURIComponent(name as string).replaceAll(
        "_",
        ".",
      );
      const result = await apolloClient.query({
        query: GET_POKEMON_BY_NAME,
        variables: { name: decodedName },
        fetchPolicy: "cache-first",
      });
      const found = result.data.pokemon;
      setPokemon(found || null);
      setLoading(false);
    };
    fetchPokemon();
  }, [name]);

  return (
    <div className="grid gap-4 p-4 max-lg:px-0">
      <AppButton />
      {loading ? (
        <PokemonDetailSkeleton />
      ) : !pokemon ? (
        <div className="flex h-full w-full items-center justify-center py-16">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {tDetail("pokemon-not-found")}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {tDetail("pokemon-not-found-description")}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-center gap-4 px-4">
          <div className="w-full">
            <div className="flex max-w-[384px] items-end justify-center gap-2">
              <div className="text-3xl font-semibold">{pokemon.name}</div>
              <div className="text-2xl opacity-60">#{pokemon.number}</div>
            </div>
          </div>
          <div className="segment w-full max-w-[384px] space-y-4">
            <Image
              ref={imgRef}
              priority
              width={384}
              height={384}
              src={pokemon.image}
              alt={pokemon.name}
              className="h-auto w-full rounded-lg bg-white object-contain px-8 py-4"
            />
            <div>
              <div className="mt-2 border-t border-gray-200 pt-2 pb-2 text-start font-semibold">
                {t("pokemon-type")}
              </div>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <PokeTypeLabel key={type} type={type} className="grow" />
                ))}
              </div>
              <div className="mt-2 border-t border-gray-200 pt-2 pb-2 text-start font-semibold">
                {t("resistant")}
              </div>
              <div className="mb-2 flex flex-wrap gap-1">
                {pokemon.resistant.map((type) => (
                  <PokeTypeLabel key={type} type={type} />
                ))}
              </div>
              <div className="mt-2 border-t border-gray-200 pt-2 pb-2 text-start font-semibold">
                {t("weaknesses")}
              </div>
              <div className="mb-2 flex flex-wrap gap-1">
                {pokemon.weaknesses.map((type) => (
                  <PokeTypeLabel key={type} type={type} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex grow flex-col space-y-4">
            <div className="segment *:border-gray-200 *:not-first:pt-3 *:not-last:border-b *:not-last:pb-3">
              <div className="grid grid-cols-2">
                <div>
                  <div className="font-semibold">{t("classification")}</div>
                  <div>{pokemon.classification}</div>
                </div>
                <div>
                  <div className="font-semibold">{t("flee-rate")}</div>
                  <div>{pokemon.fleeRate}</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <div className="font-semibold">{t("height")}</div>
                  <div>
                    {pokemon.height.minimum} - {pokemon.height.maximum}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">{t("max-cp")}</div>
                  <div>{pokemon.maxCP}</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <div className="font-semibold">{t("weight")}</div>
                  <div>
                    {pokemon.weight.minimum} - {pokemon.weight.maximum}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">{t("max-hp")}</div>
                  <div>{pokemon.maxHP}</div>
                </div>
              </div>
            </div>
            <div className="segment grow">
              <div className="text-xl font-semibold">{t("attacks")}</div>
              <div className="space-y-4 pt-4">
                <AttackTable attacks={pokemon.attacks.fast} attackType="fast" />
                <AttackTable
                  attacks={pokemon.attacks.special}
                  attackType="special"
                />
              </div>
            </div>
          </div>
          <div className="segment mb-32 w-full">
            <div className="mb-4 text-start text-xl font-semibold">
              {t("evolutions")}
            </div>
            <PokeEvolutionTree pokemon={pokemon} />
          </div>
        </div>
      )}
    </div>
  );
}

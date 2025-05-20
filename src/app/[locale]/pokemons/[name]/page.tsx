"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import apolloClient from "@/lib/apolloClient";
import { GET_POKEMON_BY_NAME } from "@/graphql/pokemonQueries";
import {  PokeTypeLabel } from "@/app/_components";
import { PokeEvolutionTree } from "@/app/_components/pokemons/PokeEvolutionTree";

const AttackTable = ({
  attacks,
  attackType,
}: {s
  attacks: IPokemonAttack["fast"] | IPokemonAttack["special"];
  attackType: "fast" | "special";
}) => {
  const t = useTranslations();
  return (
    <table className="w-full table-auto text-start">
      <thead>
        <tr className="border-b border-gray-300 text-gray-800">
          <td className="w-2/3 py-2 font-semibold">
            {t("AttackTable.attack-type-with-count", {
              type: attackType,
              count: attacks.length,
            })}
          </td>
          <td>{t("AttackTable.type")}</td>
          <td>{t("AttackTable.damage")}</td>
        </tr>
      </thead>
      <tbody>
        {attacks.map((attack) => (
          <tr key={attack.name}>
            <td>{attack.name}</td>
            <td>
              <div className="flex">
                <PokeTypeLabel
                  className="mx-[2px] my-[2px]"
                  type={attack.type}
                />
              </div>
            </td>
            <td>{attack.damage}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
      const result = await apolloClient.query({
        query: GET_POKEMON_BY_NAME,
        variables: { name },
        fetchPolicy: "cache-first",
      });
      const found = result.data.pokemon;
      setPokemon(found || null);
      setLoading(false);
    };
    fetchPokemon();
  }, [name]);

  return (
    <div className="grid gap-4 p-4">
      <Link
        href="/pokemons"
        className="mx-auto flex items-center gap-2 rounded bg-white px-4 py-2 font-semibold shadow"
      >
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={24}
          height={24}
          className="h-[24px] w-[24px]"
        />
        <p>
          <span className="text-primary-500">Search</span> Pokémon
        </p>
      </Link>
      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-16 text-lg">
          <span className="material-symbols-outlined animate-spin !text-4xl opacity-40">
            autorenew
          </span>
          <span className="ml-2">{t("loading")}</span>
        </div>
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
            <div className="text-start text-xl font-semibold">
              {t("evolutions")}
            </div>
            <PokeEvolutionTree pokemon={pokemon} />
          </div>
        </div>
      )}
    </div>
  );
}

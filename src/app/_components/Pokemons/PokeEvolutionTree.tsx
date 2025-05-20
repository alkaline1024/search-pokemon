import { PokeCard } from "./PokeCard";
import { PokeCandy } from "./PokeCandy";
import { useTranslations } from "use-intl";

function EvolutionNode({
  pokemon,
  showArrow = false,
}: {
  pokemon: IPokemonEvolution;
  showArrow?: boolean;
}) {
  return (
    <div className="flex items-center gap-5">
      <PokeCard pokemon={pokemon} disabledFavorite={true} />
      {pokemon.evolutionRequirements && (
        <div className="flex flex-col items-center gap-3">
          {showArrow && (
            <span className="material-symbols-outlined !text-7xl drop-shadow-md">
              arrow_right_alt
            </span>
          )}
          <div className="flex items-center gap-1">
            <PokeCandy pokemon={pokemon} />
            <span className="text-sm">X</span>
            <span className="text-lg">
              {pokemon.evolutionRequirements.amount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export const PokeEvolutionTree = ({
  pokemon,
}: {
  pokemon: IPokemonEvolution;
}) => {
  const t = useTranslations();

  if (!pokemon.evolutions || !pokemon.evolutions[0]) {
    return <div className="pt-4 opacity-60">{t("no-evolutions")}</div>;
  }

  const firstEvo = pokemon.evolutions[0];
  const secondEvo = firstEvo.evolutions && firstEvo.evolutions[0];

  return (
    <div className="flex items-center justify-start gap-5 pt-4">
      <EvolutionNode pokemon={pokemon} showArrow={!!firstEvo} />
      {firstEvo && (
        <div className="flex items-center justify-center gap-5 pt-4">
          <EvolutionNode pokemon={firstEvo} showArrow={!!secondEvo} />
          {secondEvo && (
            <PokeCard pokemon={secondEvo} disabledFavorite={true} />
          )}
        </div>
      )}
    </div>
  );
};

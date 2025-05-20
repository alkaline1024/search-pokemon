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
    <div className="flex items-center max-lg:flex-col lg:gap-4">
      <PokeCard pokemon={pokemon} disabledFavorite={true} />
      {pokemon.evolutionRequirements && (
        <div className="flex flex-col items-center justify-center gap-3 max-lg:flex-row">
          {showArrow && (
            <div>
              <div className="lg:hidden">
                <span className="material-symbols-outlined mt-6 !text-7xl drop-shadow-md">
                  arrow_downward_alt
                </span>
              </div>
              <div className="max-lg:hidden">
                <span className="material-symbols-outlined !text-7xl drop-shadow-md">
                  arrow_right_alt
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-1 max-lg:gap-2">
            <PokeCandy pokemon={pokemon} />
            <span className="text-sm">X</span>
            <span className="text-lg max-lg:text-xl">
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
    <div className="flex items-center justify-start gap-5 max-lg:flex-col lg:pt-4">
      <EvolutionNode pokemon={pokemon} showArrow={!!firstEvo} />
      {firstEvo && (
        <div className="flex items-center justify-center gap-5 max-lg:flex-col lg:pt-4">
          <EvolutionNode pokemon={firstEvo} showArrow={!!secondEvo} />
          {secondEvo && (
            <PokeCard pokemon={secondEvo} disabledFavorite={true} />
          )}
        </div>
      )}
    </div>
  );
};

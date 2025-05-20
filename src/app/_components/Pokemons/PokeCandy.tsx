import { pokemonClassNames } from "@/utils/pokemonClasses";

export interface PokeCandyProps {
  pokemon: IPokemonEvolution;
}

export const PokeCandy = ({ pokemon }: PokeCandyProps) => {
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
      fromColor = type1Class.fromColorContrast;
    }
    if (type2Class) {
      toColor = type2Class.toColorContrast;
    } else {
      toColor = type1Class.toColorContrast;
    }
  }

  const tooltip = pokemon.evolutionRequirements?.name || "";

  return (
    <div className="group relative inline-block cursor-help">
      <div
        className={`aspect-square h-5 max-h-5 w-5 max-w-5 rounded-full border-1 border-white bg-gradient-to-r bg-blend-soft-light shadow-xl shadow-black/25 ${fromColor} ${toColor}`}
      />
      {tooltip && (
        <div className="text-md pointer-events-none absolute top-full left-1/2 z-10 mt-2 w-max -translate-x-1/2 scale-95 rounded bg-gray-900 px-2 py-1 text-white opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
          {tooltip}
        </div>
      )}
    </div>
  );
};

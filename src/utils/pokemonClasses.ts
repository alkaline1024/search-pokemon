export type PokemonType =
  | "grass"
  | "fire"
  | "water"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export interface TypeClass {
  textColor: string;
  borderColor: string;
  outlineColor: string;
  backgroundColor: string;
  fromColor: string;
  fromColorContrast: string;
  toColor: string;
  toColorContrast: string;
}

export const pokemonClassNames: {
  [key: "default" | PokemonType | string]: TypeClass;
} = {
  grass: {
    textColor: "text-type-grass-500",
    borderColor: "border-type-grass-500",
    outlineColor: "outline-type-grass-500",
    backgroundColor: "bg-type-grass-500 hover:bg-type-grass-600",
    fromColor: "from-type-grass-500/20",
    fromColorContrast: "from-type-grass-500",
    toColor: "to-type-grass-500/20",
    toColorContrast: "to-type-grass-500",
  },
  fire: {
    textColor: "text-type-fire-500",
    borderColor: "border-type-fire-500",
    outlineColor: "outline-type-fire-500",
    backgroundColor: "bg-type-fire-500 hover:bg-type-fire-600",
    fromColor: "from-type-fire-500/20",
    fromColorContrast: "from-type-fire-500",
    toColor: "to-type-fire-500/20",
    toColorContrast: "to-type-fire-500",
  },
  water: {
    textColor: "text-type-water-500",
    borderColor: "border-type-water-500",
    outlineColor: "outline-type-water-500",
    backgroundColor: "bg-type-water-500 hover:bg-type-water-600",
    fromColor: "from-type-water-500/20",
    fromColorContrast: "from-type-water-500",
    toColor: "to-type-water-500/20",
    toColorContrast: "to-type-water-500",
  },
  electric: {
    textColor: "text-type-electric-500",
    borderColor: "border-type-electric-500",
    outlineColor: "outline-type-electric-500",
    backgroundColor: "bg-type-electric-500 hover:bg-type-electric-600",
    fromColor: "from-type-electric-500/20",
    fromColorContrast: "from-type-electric-500",
    toColor: "to-type-electric-500/20",
    toColorContrast: "to-type-electric-500",
  },
  ice: {
    textColor: "text-type-ice-500",
    borderColor: "border-type-ice-500",
    outlineColor: "outline-type-ice-500",
    backgroundColor: "bg-type-ice-500 hover:bg-type-ice-600",
    fromColor: "from-type-ice-500/20",
    fromColorContrast: "from-type-ice-500",
    toColor: "to-type-ice-500/20",
    toColorContrast: "to-type-ice-500",
  },
  fighting: {
    textColor: "text-type-fighting-500",
    borderColor: "border-type-fighting-500",
    outlineColor: "outline-type-fighting-500",
    backgroundColor: "bg-type-fighting-500 hover:bg-type-fighting-600",
    fromColor: "from-type-fighting-500/20",
    fromColorContrast: "from-type-fighting-500",
    toColor: "to-type-fighting-500/20",
    toColorContrast: "to-type-fighting-500",
  },
  poison: {
    textColor: "text-type-poison-500",
    borderColor: "border-type-poison-500",
    outlineColor: "outline-type-poison-500",
    backgroundColor: "bg-type-poison-500 hover:bg-type-poison-600",
    fromColor: "from-type-poison-500/20",
    fromColorContrast: "from-type-poison-500",
    toColor: "to-type-poison-500/20",
    toColorContrast: "to-type-poison-500",
  },
  ground: {
    textColor: "text-type-ground-500",
    borderColor: "border-type-ground-500",
    outlineColor: "outline-type-ground-500",
    backgroundColor: "bg-type-ground-500 hover:bg-type-ground-600",
    fromColor: "from-type-ground-500/20",
    fromColorContrast: "from-type-ground-500",
    toColor: "to-type-ground-500/20",
    toColorContrast: "to-type-ground-500",
  },
  flying: {
    textColor: "text-type-flying-500",
    borderColor: "border-type-flying-500",
    outlineColor: "outline-type-flying-500",
    backgroundColor: "bg-type-flying-500 hover:bg-type-flying-600",
    fromColor: "from-type-flying-500/20",
    fromColorContrast: "from-type-flying-500",
    toColor: "to-type-flying-500/20",
    toColorContrast: "to-type-flying-500",
  },
  psychic: {
    textColor: "text-type-psychic-500",
    borderColor: "border-type-psychic-500",
    outlineColor: "outline-type-psychic-500",
    backgroundColor: "bg-type-psychic-500 hover:bg-type-psychic-600",
    fromColor: "from-type-psychic-500/20",
    fromColorContrast: "from-type-psychic-500",
    toColor: "to-type-psychic-500/20",
    toColorContrast: "to-type-psychic-500",
  },
  bug: {
    textColor: "text-type-bug-500",
    borderColor: "border-type-bug-500",
    outlineColor: "outline-type-bug-500",
    backgroundColor: "bg-type-bug-500 hover:bg-type-bug-600",
    fromColor: "from-type-bug-500/20",
    fromColorContrast: "from-type-bug-500",
    toColor: "to-type-bug-500/20",
    toColorContrast: "to-type-bug-500",
  },
  rock: {
    textColor: "text-type-rock-500",
    borderColor: "border-type-rock-500",
    outlineColor: "outline-type-rock-500",
    backgroundColor: "bg-type-rock-500 hover:bg-type-rock-600",
    fromColor: "from-type-rock-500/20",
    fromColorContrast: "from-type-rock-500",
    toColor: "to-type-rock-500/20",
    toColorContrast: "to-type-rock-500",
  },
  ghost: {
    textColor: "text-type-ghost-500",
    borderColor: "border-type-ghost-500",
    outlineColor: "outline-type-ghost-500",
    backgroundColor: "bg-type-ghost-500 hover:bg-type-ghost-600",
    fromColor: "from-type-ghost-500/20",
    fromColorContrast: "from-type-ghost-500",
    toColor: "to-type-ghost-500/20",
    toColorContrast: "to-type-ghost-500",
  },
  dragon: {
    textColor: "text-type-dragon-500",
    borderColor: "border-type-dragon-500",
    outlineColor: "outline-type-dragon-500",
    backgroundColor: "bg-type-dragon-500 hover:bg-type-dragon-600",
    fromColor: "from-type-dragon-500/20",
    fromColorContrast: "from-type-dragon-500",
    toColor: "to-type-dragon-500/20",
    toColorContrast: "to-type-dragon-500",
  },
  dark: {
    textColor: "text-type-dark-500",
    borderColor: "border-type-dark-500",
    outlineColor: "outline-type-dark-500",
    backgroundColor: "bg-type-dark-500 hover:bg-type-dark-600",
    fromColor: "from-type-dark-500/20",
    fromColorContrast: "from-type-dark-500",
    toColor: "to-type-dark-500/20",
    toColorContrast: "to-type-dark-500",
  },
  steel: {
    textColor: "text-type-steel-500",
    borderColor: "border-type-steel-500",
    outlineColor: "outline-type-steel-500",
    backgroundColor: "bg-type-steel-500 hover:bg-type-steel-600",
    fromColor: "from-type-steel-500/20",
    fromColorContrast: "from-type-steel-500",
    toColor: "to-type-steel-500/20",
    toColorContrast: "to-type-steel-500",
  },
  fairy: {
    textColor: "text-type-fairy-500",
    borderColor: "border-type-fairy-500",
    outlineColor: "outline-type-fairy-500",
    backgroundColor: "bg-type-fairy-500 hover:bg-type-fairy-600",
    fromColor: "from-type-fairy-500/20",
    fromColorContrast: "from-type-fairy-500",
    toColor: "to-type-fairy-500/20",
    toColorContrast: "to-type-fairy-500",
  },
  normal: {
    textColor: "text-type-normal-500",
    borderColor: "border-type-normal-500",
    outlineColor: "outline-type-normal-500",
    backgroundColor: "bg-type-normal-500 hover:bg-type-normal-600",
    fromColor: "from-type-normal-500/20",
    fromColorContrast: "from-type-normal-500",
    toColor: "to-type-normal-500/20",
    toColorContrast: "to-type-normal-500",
  },
  default: {
    textColor: "text-gray-500",
    borderColor: "border-gray-500",
    outlineColor: "outline-gray-500",
    backgroundColor: "bg-gray-500 hover:bg-gray-600",
    fromColor: "from-type-gray-500/20",
    fromColorContrast: "from-type-gray-500",
    toColor: "to-type-gray-500/20",
    toColorContrast: "to-type-gray-500",
  },
};

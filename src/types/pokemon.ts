declare global {
  type IPokemon = import("@/types/pokemon").IPokemon;
}

export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface PokemonAttack {
  fast: Array<{
    name: string;
    type: string;
    damage: number;
  }>;
  special: Array<{
    name: string;
    type: string;
    damage: number;
  }>;
}

export interface PokemonEvolutionRequirement {
  amount: number;
  name: string;
}

export interface IPokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  weight: PokemonDimension;
  height: PokemonDimension;
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  attacks: PokemonAttack;
  evolutions?: IPokemon[];
  evolutionRequirements?: PokemonEvolutionRequirement;
}

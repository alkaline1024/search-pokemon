declare global {
  type IPokemon = import("@/types/pokemon").IPokemon;
  type IPokemonAttack = import("@/types/pokemon").IPokemonAttack;
  type IPokemonDimension = import("@/types/pokemon").IPokemonDimension;
  type IPokemonEvolutionRequirement =
    import("@/types/pokemon").IPokemonEvolutionRequirement;
}

export interface IPokemonDimension {
  minimum: string;
  maximum: string;
}

export interface IPokemonAttack {
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

export interface IPokemonEvolutionRequirement {
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
  weight: IPokemonDimension;
  height: IPokemonDimension;
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  attacks: IPokemonAttack;
  evolutions?: IPokemon[];
  evolutionRequirements?: IPokemonEvolutionRequirement;
}

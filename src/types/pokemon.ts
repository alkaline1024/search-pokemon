declare global {
  type IPokemonDetail = import("@/types/pokemon").IPokemonDetail;
  type IPokemonCard = import("@/types/pokemon").IPokemonCard;
  type IPokemonEvolution = import("@/types/pokemon").IPokemonEvolution;
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

export interface IPokemonCard {
  id: string;
  number: string;
  name: string;
  image: string;
  types: string[];
}

export interface IPokemonEvolution extends IPokemonCard {
  evolutions: IPokemonEvolution[];
  evolutionRequirements: IPokemonEvolutionRequirement;
}

export interface IPokemonDetail extends IPokemonCard {
  classification: string;
  resistant: string[];
  weaknesses: string[];
  weight: IPokemonDimension;
  height: IPokemonDimension;
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  attacks: IPokemonAttack;
  evolutions: IPokemonEvolution[];
  evolutionRequirements: IPokemonEvolutionRequirement;
}

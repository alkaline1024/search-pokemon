declare global {
  type IPokemon = import("@/types/pokemon").IPokemon;
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
  weight: { minimum: string; maximum: string };
  height: { minimum: string; maximum: string };
  fleeRate: number;
  maxCP: number;
  maxHP: number;
}

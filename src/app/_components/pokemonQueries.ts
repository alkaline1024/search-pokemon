import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      classification
      types
      resistant
      weaknesses
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      fleeRate
      maxCP
      maxHP
    }
  }
`;
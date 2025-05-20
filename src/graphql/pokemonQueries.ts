import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      types
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      image
      types
      evolutionRequirements {
        amount
        name
      }
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        image
        types
        evolutionRequirements {
          amount
          name
        }
        evolutions {
          id
          number
          name
          image
          types
          evolutionRequirements {
            amount
            name
          }
        }
      }
    }
  }
`;

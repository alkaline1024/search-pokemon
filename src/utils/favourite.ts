"use client";

export const getFavorites: () => IPokemonCard[] = () => {
  if (typeof window === "undefined") return [];
  const favoritePokemons: IPokemonCard[] = JSON.parse(
    localStorage.getItem("favorites") || "[]",
  );
  return favoritePokemons;
};

export const isFavorite = (pokemon: IPokemonCard) => {
  const favoritePokemons = getFavorites();
  const favoriteIds = favoritePokemons.map((pokemon) => pokemon.id);
  return favoriteIds.includes(pokemon.id);
};

export const addFavorite = (pokemon: IPokemonCard) => {
  const favoritePokemons = getFavorites();
  const favoriteIds = favoritePokemons.map((pokemon) => pokemon.id);
  if (!favoriteIds.includes(pokemon.id)) {
    favoritePokemons.push(pokemon);
    localStorage.setItem("favorites", JSON.stringify(favoritePokemons));
  }
};

export const removeFavorite = (pokemon: IPokemonCard) => {
  const favoritePokemons = getFavorites();
  const favoriteIds = favoritePokemons.map((pokemon) => pokemon.id);
  const index = favoriteIds.indexOf(pokemon.id);
  if (index > -1) {
    favoritePokemons.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favoritePokemons));
  }
};

export const toggleInFavorites = (pokemon: IPokemonCard) => {
  const favoritePokemons = getFavorites();
  const favoriteIds = favoritePokemons.map((pokemon) => pokemon.id);
  if (!favoriteIds.includes(pokemon.id)) {
    addFavorite(pokemon);
  } else {
    removeFavorite(pokemon);
  }
};

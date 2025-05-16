"use client";

import { useEffect, useState } from "react";
import { GET_POKEMONS } from "./_components/pokemonQueries";
import apolloClient from "./_components/apolloClient";
import PokeCardList from "./_components/PokeCardList";

export default function Home() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = apolloClient.watchQuery({
      query: GET_POKEMONS,
      variables: { first: 20 },
      fetchPolicy: "no-cache",
    });

    const subscription = observer.subscribe({
      next: ({ data }) => {
        setPokemons(data.pokemons ?? []);
        setLoading(false);
      },
      error: (error) => {
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <div className="p-4">
      <PokeCardList pokemons={pokemons} loading={loading} />
    </div>
  );
}

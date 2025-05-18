"use client";

import { useEffect, useState, useRef } from "react";
import { GET_POKEMONS } from "./_components/pokemonQueries";
import apolloClient from "./_components/apolloClient";
import PokeCardList from "./_components/PokeCardList";

export default function Home() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Constants
  const INIT_FIRST = 20;
  const OFFSET = 20;

  // Refs
  const fetchedCount = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchPokemons = (first: number) => {
    setLoading(true);
    const observer = apolloClient.watchQuery({
      query: GET_POKEMONS,
      variables: { first },
      fetchPolicy: "no-cache",
    });
    const subscription = observer.subscribe({
      next: ({ data }) => {
        const newPokemons = data.pokemons ?? [];
        const newPokemonCount = newPokemons.length - pokemons.length;
        if (newPokemonCount < INIT_FIRST) setHasMore(false);
        setPokemons(newPokemons);
        setLoading(false);
        fetchedCount.current = newPokemons.length;
        subscription.unsubscribe();
      },
      error: () => {
        setLoading(false);
        setHasMore(false);
        subscription.unsubscribe();
      },
    });
  };

  // Initial fetch
  useEffect(() => {
    fetchPokemons(INIT_FIRST);
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) {
      return;
    }
    function handleScroll() {
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const containerHeight = container.scrollHeight;
      if (scrollTop + windowHeight >= containerHeight) {
        fetchPokemons(fetchedCount.current + OFFSET);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="space-y-4 p-4" style={{ overflowAnchor: "none" }}>
      <div ref={containerRef}>
        <PokeCardList
          pokemons={pokemons}
          loading={loading && pokemons.length === 0}
        />
      </div>
      {hasMore && (
        <div>
          <PokeCardList pokemons={[]} loading={true} loadingAmount={OFFSET} />
        </div>
      )}
    </div>
  );
}

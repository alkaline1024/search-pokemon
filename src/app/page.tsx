"use client";

import { useEffect, useState, useRef } from "react";
import { GET_POKEMONS } from "./_components/pokemonQueries";
import apolloClient from "./_components/apolloClient";
import PokeCardList from "./_components/PokeCardList";

export default function Home() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const hasSearchText = searchText.length > 0;

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
      fetchPolicy: "cache-first",
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
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);
    fetchPokemons(INIT_FIRST);
  }, []);

  // Fetch more pokemons when
  // 1. Scroll to bottom
  // 2. Content not filled the container
  useEffect(() => {
    if (!hasMore || loading) {
      return;
    }

    function isFetchTrigger() {
      const container = containerRef.current;
      if (!container) {
        return false;
      }

      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const containerHeight = container.scrollHeight;

      // 1. Scroll to bottom
      if (scrollTop + windowHeight >= containerHeight - 200) {
        return true;
      }
      // 2. Content not filled the container
      if (containerHeight <= windowHeight) {
        return true;
      }

      return false;
    }

    if (isFetchTrigger()) {
      fetchPokemons(fetchedCount.current + OFFSET);
    }

    function handleScroll() {
      if (isFetchTrigger()) {
        fetchPokemons(fetchedCount.current + OFFSET);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pokemons, hasMore, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6 py-6">
      <div className="group w-1/2 rounded-full shadow-sm transition-shadow focus-within:!shadow-lg">
        <div className="relative">
          <span
            className={`${hasSearchText ? "scale-0 !opacity-0" : "scale-100"} material-icons absolute top-1/2 left-4 origin-left -translate-y-1/2 opacity-60 transition-all duration-300 group-focus-within:text-gray-800 group-focus-within:opacity-100`}
          >
            search
          </span>
          <input
            type="text"
            className={`${hasSearchText ? "pr-24" : "pl-12"} w-full rounded-full bg-white px-6 py-4 !outline-0 duration-300`}
            placeholder="Search Pokémon..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div
            className={`${hasSearchText ? "scale-100 opacity-100" : "scale-0 opacity-0"} absolute top-1/2 right-4 flex origin-right -translate-y-1/2 gap-1 transition-all`}
          >
            <span
              className="material-icons cursor-pointer rounded-full p-2 hover:bg-gray-200"
              onClick={() => {
                setSearchText("");
                fetchPokemons(INIT_FIRST);
              }}
            >
              close
            </span>
            <span className="my-2 h-auto w-[1px] bg-gray-200" />
            <span
              className="material-icons cursor-pointer rounded-full p-2 hover:bg-gray-200"
              onClick={() => {
                fetchPokemons(INIT_FIRST);
              }}
            >
              search
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col"
        style={{
          overflowAnchor: "none",
          gap: pokemons.length > 0 ? "1rem" : "0",
        }}
      >
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
    </div>
  );
}

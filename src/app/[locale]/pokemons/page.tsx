"use client";

import { useEffect, useState, useRef } from "react";
import { GET_POKEMONS } from "@/graphql/pokemonQueries";
import apolloClient from "@/lib/apolloClient";
import { PokeCardList, PokeTypeLabel } from "@/app/_components/Pokemons";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

const pokemonTypes = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  // "Dark",
  "Steel",
  "Fairy",
];

export default function PokemonListPage() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const hasSearchText = searchText.length > 0;
  const hasFilter = filterType.length > 0;

  // Constants
  const INIT_FIRST = 20;
  const OFFSET = 20;

  // Refs
  const fetchedCount = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchPokemons = (first: number) => {
    if (!hasMore) {
      setFilteredPokemons(pokemons);
      return true;
    }

    setLoading(true);
    const observer = apolloClient.watchQuery({
      query: GET_POKEMONS,
      variables: { first },
      fetchPolicy: "cache-first",
    });
    const subscription = observer.subscribe({
      next: ({ data }) => {
        const newPokemons: IPokemon[] = data.pokemons ?? [];
        if (newPokemons.length < first) {
          setPokemons(newPokemons);
          setHasMore(false);
        }
        setFilteredPokemons(newPokemons);
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

  const abortController = useRef<AbortController | null>(null);
  // Manual search: fetch by OFFSET and filter until all pokemons have been fetched
  const searchPokemons = async () => {
    if (abortController.current) {
      console.log("Aborting previous request");
      abortController.current.abort();
    }
    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    if (!hasSearchText && !filterType) {
      fetchPokemons(INIT_FIRST);
      return false;
    }

    const findAndSetFilteredPokemons = (target: IPokemon[]) => {
      const filtered = target.filter((pokemon) => {
        const matchName = hasSearchText
          ? pokemon.name.toLowerCase().includes(searchText.toLowerCase())
          : true;
        const matchType = filterType
          ? pokemon.types.includes(filterType)
          : true;
        return matchName && matchType;
      });
      setFilteredPokemons(filtered);
    };

    if (!hasMore) {
      findAndSetFilteredPokemons(pokemons);
      return true;
    }

    setSearching(true);
    let offset = OFFSET;
    let fetching = true;
    while (fetching) {
      if (newAbortController.signal.aborted) {
        fetching = false;
        break;
      }
      
      const result = await apolloClient.query({
        query: GET_POKEMONS,
        variables: { first: offset },
        fetchPolicy: "cache-first",
      });

      if (newAbortController.signal.aborted) {
        fetching = false;
        break;
      }

      const newPokemons: IPokemon[] = result.data.pokemons ?? [];
      findAndSetFilteredPokemons(newPokemons);

      // All pokemons have been fetched
      if (newPokemons.length < offset) {
        setPokemons(newPokemons);
        setHasMore(false);
        fetching = false;
        break;
      }
      offset += OFFSET;
    }
    setSearching(false);
  };

  // Fetch on search
  useEffect(() => {
    searchPokemons();
  }, [searchText, filterType]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initial fetch
  const searchTextParam = searchParams.get("search");
  const filterTypeParam = searchParams.get("type");
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);

    if (searchTextParam) setSearchText(searchTextParam);
    if (filterTypeParam) setFilterType(filterTypeParam);
    if (!searchTextParam && !filterTypeParam) fetchPokemons(INIT_FIRST);
    else router.replace("/pokemons");
  }, []);

  // Fetch more pokemons when
  // 1. Scroll to bottom
  // 2. Content not filled the container
  useEffect(() => {
    if (!hasMore || loading || hasSearchText) {
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
  }, [filteredPokemons, hasMore, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6 py-6">
      <div className="group w-1/2 rounded-full shadow-sm transition-shadow focus-within:!shadow-lg">
        <div className="relative">
          <span
            className={`${hasSearchText ? "scale-0 !opacity-0" : "scale-100"} material-symbols-outlined absolute top-1/2 left-4 origin-left -translate-y-1/2 opacity-60 transition-all duration-300 group-focus-within:text-gray-800 group-focus-within:opacity-100`}
          >
            search
          </span>
          <input
            type="text"
            className={`${hasSearchText ? "pr-24" : "pl-12"} w-full rounded-full bg-white px-6 py-4 !outline-0 duration-300`}
            placeholder={t("search-placeholder")}
            value={searchText}
            onChange={(e) => {
              const searchInput = e.target.value;
              if (!searchInput) {
                setSearchText("");
              } else {
                setSearchText(searchInput);
              }
            }}
          />
          <div
            className={`${hasSearchText ? "scale-100 opacity-100" : "scale-0 opacity-0"} absolute top-1/2 right-4 flex origin-right -translate-y-1/2 gap-1 transition-all`}
          >
            <span
              className="material-symbols-outlined cursor-pointer rounded-full p-2 hover:bg-gray-200"
              onClick={() => {
                setSearchText("");
              }}
            >
              close
            </span>
            <span className="my-2 h-auto w-[1px] bg-gray-200" />
            {!searching ? (
              <span
                className="material-symbols-outlined cursor-pointer rounded-full p-2 hover:bg-gray-200"
                onClick={() => {}}
              >
                search
              </span>
            ) : (
              <span className="material-symbols-outlined rotate-180 animate-spin rounded-full p-2">
                autorenew
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="segment flex flex-col gap-4">
        <div className="border-b border-gray-200 pb-2 text-lg font-bold">
          {t("filter-by-type")}
        </div>

        <div className="flex flex-wrap gap-2">
          {pokemonTypes.map((type) => (
            <PokeTypeLabel
              key={type}
              type={type}
              onClick={(type) => {
                setFilterType(filterType === type ? "" : type);
              }}
              variant={filterType === type ? "solid" : "outline"}
              disabledHover={true}
            />
          ))}
        </div>
      </div>
      <div
        className="flex flex-col"
        style={{
          overflowAnchor: "none",
          gap: filteredPokemons.length > 0 ? "1rem" : "0",
        }}
      >
        <div ref={containerRef}>
          <PokeCardList
            pokemons={filteredPokemons}
            loading={loading && filteredPokemons.length === 0}
            searching={searching}
            onTypeClick={(type) => setFilterType(type)}
          />
        </div>
        {!hasSearchText && !hasFilter && hasMore && (
          <div>
            <PokeCardList pokemons={[]} loading={true} loadingAmount={OFFSET} />
          </div>
        )}
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

const TMDB_BASE = "https://api.themoviedb.org/3";
const COLLECTION_ID = process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/original/";

// -- Query Keys --

export const tmdbKeys = {
  all: ["tmdb"] as const,
  collection: () => [...tmdbKeys.all, "collection"] as const,
  collectionPoster: () => [...tmdbKeys.all, "collection", "poster"] as const,
  movie: (id: number) => [...tmdbKeys.all, "movie", id] as const,
};

// -- Fetch Functions --

export async function fetchCollection() {
  const { data } = await Axios.get(
    `${TMDB_BASE}/collection/${COLLECTION_ID}?api_key=${API_KEY}`
  );
  return data;
}

export async function fetchMovie(movieId: number) {
  const { data } = await Axios.get(
    `${TMDB_BASE}/movie/${movieId}?api_key=${API_KEY}`
  );
  return data;
}

// -- Query Hooks --

interface CollectionData {
  parts: Movie[];
  poster_path: string;
  backdrop_path: string;
  name: string;
  id: number;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
}

export function useCollectionQuery(initialData?: CollectionData) {
  return useQuery({
    queryKey: tmdbKeys.collection(),
    queryFn: fetchCollection,
    initialData,
    staleTime: 10 * 60 * 1000, // 10 min — movie collection data rarely changes
  });
}

export function useCollectionMovies(initialMovies?: Movie[]) {
  return useQuery({
    queryKey: tmdbKeys.collection(),
    queryFn: fetchCollection,
    select: (data: CollectionData) => data.parts,
    initialData: initialMovies
      ? ({ parts: initialMovies } as CollectionData)
      : undefined,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCollectionPoster() {
  return useQuery({
    queryKey: tmdbKeys.collectionPoster(),
    queryFn: async () => {
      const data = await fetchCollection();
      return IMAGE_BASE + data.poster_path;
    },
    staleTime: 30 * 60 * 1000, // 30 min — poster URL almost never changes
  });
}

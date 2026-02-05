import Axios from "axios";
import prisma from "./prisma";
import { getBondActor } from "./bondActors";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_COLLECTION_ID = process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID;

async function fetchMovieDetails(tmdbId) {
  const res = await Axios.get(
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
  );
  return res.data;
}

export async function syncMovies() {
  // 1. Fetch the Bond collection to get all movie IDs
  const collectionRes = await Axios.get(
    `https://api.themoviedb.org/3/collection/${TMDB_COLLECTION_ID}?api_key=${TMDB_API_KEY}`
  );
  const parts = collectionRes.data.parts;

  // 2. Fetch full details for each movie and upsert
  const results = await Promise.all(
    parts.map(async (part) => {
      const movie = await fetchMovieDetails(part.id);

      return prisma.movie.upsert({
        where: { tmdbId: movie.id },
        update: {
          title: movie.title,
          releaseDate: new Date(movie.release_date),
          runtime: movie.runtime || 0,
          budget: movie.budget || 0,
          revenue: movie.revenue || 0,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          popularity: movie.popularity,
          bondActor: getBondActor(movie.title),
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          overview: movie.overview,
          tagline: movie.tagline,
          imdbId: movie.imdb_id,
          homepage: movie.homepage,
        },
        create: {
          tmdbId: movie.id,
          title: movie.title,
          releaseDate: new Date(movie.release_date),
          runtime: movie.runtime || 0,
          budget: movie.budget || 0,
          revenue: movie.revenue || 0,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          popularity: movie.popularity,
          bondActor: getBondActor(movie.title),
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          overview: movie.overview,
          tagline: movie.tagline,
          imdbId: movie.imdb_id,
          homepage: movie.homepage,
        },
      });
    })
  );

  return results;
}

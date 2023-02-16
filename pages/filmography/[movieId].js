//working at getStaticDynamicpage -- [movieId]

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

export async function getStaticPaths() {
  // making notations
  const response = await fetch(
    "https://api.themoviedb.org/3/collection/"
    + process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID +
    "?api_key=" + process.env.NEXT_PUBLIC_TMDB_API_KEY
  )
    .then((res) => res.data.parts)
    .catch((err) => console.log("error: ", err));

  // console.log("response: ", response)

  const paths = await response.map((movie) => {
    return {
      params: { movieId: movie.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // comment to commit, push
  const moviesFacts = await Axios.get(
    "https://api.themoviedb.org/3/movie/" +
      params.movieId +
      "?api_key=" + process.env.NEXT_PUBLIC_TMDB_API_KEY
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // console.log("movie Details: ", moviesFacts);

  return {
    props: {
      movieFacts: moviesFacts,
    },
  };
}

const MovieId = ({ movieFacts }) => {
  const baseURL = "https://image.tmdb.org/t/p/original";

  let movie_w_backdrop_path = baseURL + `${movieFacts.backdrop_path}`;
  let movie_w_poster_path = baseURL + `${movieFacts.poster_path}`;

  return (
    <>
      <Image
        src={movie_w_backdrop_path}
        fill
        alt="good_pic"
        className="-z-10"
      />
      <div className="text-white text-xl">
        <h1 className="text-5xl text-center m-8"> {movieFacts.title} </h1>
        <div className="pr-24 pl-24">
          {/* MOVIE CONTENT */}
          {movieFacts.original_title === movieFacts.title ? (
            <div key="1"></div>
          ) : (
            <p>Originally released as + {movieFacts.original_title}</p>
          )}
          <p> {movieFacts.tagline} </p>
          <p> {movieFacts.overview} </p>
          <p> {movieFacts.runtime} minute runtime </p>
          <p> Released {movieFacts.release_date} </p>
          <br />
          {/* RECEPTION AND RATINGS */}
          <p> Avg ⭐ (of 10): &emsp; {movieFacts.vote_average} </p>
          <p> # of votes cast: &emsp; {movieFacts.vote_count} </p>
          <p> Revenue: ${movieFacts.revenue} </p>
          <p> Profitability: ${movieFacts.revenue - movieFacts.budget} </p>
          <p> {movieFacts.vote_count.toLocaleString("en-US")} </p>
          <p> Popularity: {movieFacts.popularity} </p>
          {/* TODO: understand popularity definition */}
          <br />

          {/* PRODUCTION DETAILS */}
          <p> Movie Budget: ${movieFacts.budget} </p>
          <p> {movieFacts.production_companies[0]?.name} </p>
          <p> {movieFacts.production_countries[0]?.name} </p>
          <p> {movieFacts.genres[0].name} </p>
          <br />

          {/* ADDL RESOURCES */}
          <p>
            <Link
              href={movieFacts.homepage ? movieFacts.homepage : "DNE"}
              className="underline text-blue-500 font-bold hover:text-2xl"
            >
              {" "}
              {movieFacts.homepage
                ? movieFacts.original_title + "'s official homepage"
                : "DNE"}{" "}
            </Link>
          </p>
          <p>
            <Link
              href={
                movieFacts.imdb_id
                  ? "https://www.imdb.com/title/" + movieFacts.imdb_id
                  : "DNE"
              }
              className="underline text-green-500 font-bold hover:text-2xl"
            >
              {" "}
              {movieFacts.imdb_id
                ? movieFacts.original_title + "'s IMDB page"
                : ""}{" "}
            </Link>
          </p>
          <br />

          {/* TODO: find place for poster */}

          <Image
            src={movie_w_poster_path}
            height={500}
            width={333}
            alt={movieFacts.title + " poster"}
            className="z-10"
          />
          <br />
        </div>
      </div>
    </>
  );
};

export default MovieId;

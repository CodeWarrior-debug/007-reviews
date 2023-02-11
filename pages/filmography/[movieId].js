import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

export async function getStaticProps(){
  return {
    props: {

    }
  }
}

export async function getStaticPaths(){
  return {
    paths: [],
    fallback: false
  }
}

const MovieId = (props) => {
  const baseURL = "https://image.tmdb.org/t/p/original";

  const router = useRouter();
  const [movieFacts, setMovieFacts] = useState({});

  let movie_w_backdrop_path = baseURL + `${movieFacts.backdrop_path}`;
  let movie_w_poster_path = baseURL + `${movieFacts.poster_path}`;

  useEffect(() => {
    console.log("1 movie number id:", router.query.movieId);

    const fetchData = async () => {
      const data = await getMovieDeets();
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMovieDeets = async () => {
    await Axios.get(
      "https://api.themoviedb.org/3/movie/" +
        router.query.movieId +
        "?api_key=ef49b4888abc2e14ec134b8ae835513d"
    )
      .then((res) => res.data)
      .then((data) => setMovieFacts(data))
      .catch((err) => console.log(err));

    // console.log("2 movie Facts: ", movieFacts);
    // console.log("3 bg image pth", movie_w_backdrop_path);
  };

  return (
    <>
      <Image src={movie_w_backdrop_path} fill alt="good_pic" className="-z-10" />
      <div className="text-white text-xl">
        <h1 className="text-5xl text-center m-8"> {movieFacts.title} </h1>
        <div className="pr-24 pl-24">

{/* MOVIE CONTENT */}
{movieFacts.original_title === movieFacts.title ? (
    <div></div>
) : (
    <p>Originally released as + {movieFacts.original_title}</p>
)}
    <p> {movieFacts.tagline} </p>
    <p> {movieFacts.overview} </p>
    <p> {movieFacts.runtime} minute runtime </p>
    <p> Released {movieFacts.release_date} </p>
    <br/>
{/* RECEPTION AND RATINGS */}
        <p> Avg ⭐ (of 10): &emsp; {movieFacts.vote_average} </p>
        <p> # of votes cast: &emsp; {movieFacts.vote_count} </p>
        <p> Revenue: ${movieFacts.revenue} </p>
        <p> Profitability: ${movieFacts.revenue - movieFacts.budget} </p>
    {/* <p> {movieFacts.vote_count.toLocaleString("en-US")} </p> */}
        <p> Popularity: {movieFacts.popularity} </p>
        {/* TODO: understand popularity definition */}
        <br/>


{/* PRODUCTION DETAILS */}
        <p> Movie Budget: ${movieFacts.budget} </p>
        {/* <p> {movieFacts.production_companies[0]?.name} </p> */}
        {/* <p> {movieFacts.production_countries[0]?.name} </p> */}
        {/* <p> {movieFacts.genres[0].} </p> */}
        <br/>



{/* ADDL RESOURCES */}
        <p>

        <Link href={movieFacts.homepage ? movieFacts.homepage : "DNE"} className="underline text-blue-500 font-bold hover:text-2xl">
          {" "}
          {movieFacts.homepage
            ? movieFacts.original_title + "'s official homepage"
            : "DNE"}{" "}
        </Link>
        </p>
        <p>

        <Link href={movieFacts.imdb_id ? "https://www.imdb.com/title/" + movieFacts.imdb_id : "DNE"} className="underline text-green-500 font-bold hover:text-2xl">
          {" "}
          {movieFacts.imdb_id
            ? movieFacts.original_title + "'s IMDB page"
            : ""}{" "}
        </Link>
        </p>
        <br/>

        
        {/* TODO: find place for poster */}


        <Image src={movie_w_poster_path} height={500} width={333} alt={movieFacts.title + " poster"} className="z-10" />
<br/>

        </div>
      </div>

    </>
  );
};

export default MovieId;

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import  Axios from "axios";

const MovieId = () => {

    const baseURL = "https://image.tmdb.org/t/p/original/";

  const router = useRouter();
  const [movieFacts,setMovieFacts] = useState({});
  const [movieId, setMovieId] = useState(router.query.movieId)
  let movie_w_backdrop_path= baseURL +`${movieFacts.backdrop_path}`



  useEffect(() => {
    console.log("movie number id:", movieId);

    const fetchData = async () =>{

      const data = await getMovieDeets();
    }

    fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getMovieDeets = async ()=>{

    await Axios.get(
        // "https://api.themoviedb.org/3/movie/253?api_key=ef49b4888abc2e14ec134b8ae835513d"

        "https://api.themoviedb.org/3/movie/" +
        movieId +
        "?api_key=ef49b4888abc2e14ec134b8ae835513d"
    )
    
    // .then((res)=>console.log("data shape:", res.data))
    .then((res)=>res.data)
    
    .then((data)=>setMovieFacts(data))
    .catch((err)=>console.log(err))

        console.log("movieFacts: ", movieFacts)
        console.log("backdrop: ", movie_w_backdrop_path)

  }


  return (
    <>
      {/* <div className="bg-[url('/img/hero-pattern.svg')]"></div> */}
      <div className={ ` bg-url[(' ${ movie_w_backdrop_path } ')] ` } ></div>
      
      
    </>
  );
};

export default MovieId;

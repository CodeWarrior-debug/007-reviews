import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import  Axios from "axios";

const MovieId = () => {

    const baseURL = "https://image.tmdb.org/t/p/original/";
    
    const router = useRouter();
    const [movieFacts,setMovieFacts] = useState({});
    
    let movie_w_backdrop_path= baseURL +`${movieFacts.backdrop_path}`

  useEffect(() => {
    console.log("movie number id:", router.query.movieId);

    getMovieDeets();

    console.log("movie Facts: ", movieFacts)
    console.log("bg image pth", movie_w_backdrop_path)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getMovieDeets = async ()=>{

    await Axios.get(
        "https://api.themoviedb.org/3/movie/253?api_key=ef49b4888abc2e14ec134b8ae835513d"
    )
    // .then((res)=>console.log("data shape:", res.data))
    .then((res)=>res.data)
    .then((data)=>setMovieFacts(data))
    .catch((err)=>console.log(err))

        // console.log('movie Facts: ', movieFacts)

  }


  return (
    <>
      {/* <div className="bg-[url('/img/hero-pattern.svg')]"></div> */}
      <div className={ ` bg-url(' ${ movie_w_backdrop_path } ') ` } ></div>
      
      
    </>
  );
};

export default MovieId;

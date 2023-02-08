import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "./Card";
import "tailwindcss/tailwind.css";

export default function MovieCards() {
  const [movies, setMovies] = useState([]);




  useEffect( () => {
    getBondMovies();
    
  }, []);

  const getBondMovies = async () => {
    await Axios.get(
      "https://api.themoviedb.org/3/collection/645?api_key=ef49b4888abc2e14ec134b8ae835513d"
    )
      .then((res) => res.data)
      // .then(data=>console.log(data.parts))
      .then((data) => setMovies(data.parts))
      .catch((err) => console.log("error: ", err));
  };

//  const handleClick = () =>{
//   //not working
//   setMovies(
//    movies.sort((a,b)=>a.original_title - b.original_title))
    
//   }

  return (
    <>
      <div className="grid grid-cols-3 gap-6 ml-32 mr-32">
        {movies.map((movie) => {
          const baseURL = "https://image.tmdb.org/t/p/original/";
          // let movie_w_backdrop_path= baseURL +`${movie.backdrop_path}`
          let movie_w_poster_path = baseURL + `${movie.poster_path}`;

          return (
            <>
            
            <Card
                key={movie.id}
                original_title={movie.original_title}
                overview={movie.overview}
                popularity={movie.popularity}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
              poster_path={movie_w_poster_path}
              
              />
            </>
          );
        })}
      </div>
    </>
  );
}

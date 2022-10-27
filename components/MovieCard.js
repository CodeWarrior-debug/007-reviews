import React, {useState, useEffect} from 'react';
import Axios from 'axios';

export default function MovieCard() {

const [movies, setMovies] = useState([]);


  useEffect(()=> {

    getBondMovies();
    console.log(movies);

  }
  
  
  , [])


const getBondMovies = async () =>{

  await Axios.get("https://api.themoviedb.org/3/collection/645?api_key=ef49b4888abc2e14ec134b8ae835513d")
  .then(res=>res.data)
  // .then(data=>console.log(data.parts))
  .then(data=>setMovies(data.parts))
  .catch(err => console.log('error: ', err))
}


  return (
    <>
    <div>
    {movies.map((movie)=>{

      return(

      <p>{movie.original_title}</p>
      

      
      )
    })}




    
  </div>
  </>
  );
}

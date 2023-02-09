import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import  Axios from "axios";

const MovieId = () => {

    const baseURL = "https://image.tmdb.org/t/p/original";
    
    const router = useRouter();
    const [movieFacts,setMovieFacts] = useState({});
    
    let movie_w_backdrop_path= baseURL +`${movieFacts.backdrop_path}`

  useEffect(() => {
    console.log("1 movie number id:", router.query.movieId);

    const fetchData = async ()=>{

        const data = await getMovieDeets();

    }

    fetchData();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getMovieDeets = async ()=>{

    await Axios.get(
        "https://api.themoviedb.org/3/movie/" + router.query.movieId + "?api_key=ef49b4888abc2e14ec134b8ae835513d"
    )
    // .then((res)=>setMovieFacts(res.data))
    .then((res)=>res.data)
    .then((data)=>setMovieFacts(data))
    .catch((err)=>console.log(err))

        console.log("2 movie Facts: ", movieFacts)
    console.log("3 bg image pth", movie_w_backdrop_path)

  }

//  const {original_language, belongs_to_collection} = movieFacts;
  return (
    <>
      {/* <div className="bg-[url('/img/hero-pattern.svg')]"></div> */}
      {/* <div className={ ` bg-url(' ${ movie_w_backdrop_path } ') ` } ></div> */}
      {/* <div className=  "bg-[url('https://image.tmdb.org/t/p/original//v28YYcN5p9hD8PKGAeWLz0ugsfX.jpg')]" ></div> */}
      {/*  */}

<h1>James Here</h1>
      
      
      
    </>
  );
};

export default MovieId;

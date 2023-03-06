import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Axios from 'axios'
import Image from "next/image"

export default function Home() {

const [backdrop, setBackdrop] = useState("")
const [poster, setPoster] = useState("")
const baseURL = "https://image.tmdb.org/t/p/original/";


  useEffect(()=>{

    const getResponse = Axios.get(
      "https://api.themoviedb.org/3/collection/" +
        process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID +
        "?api_key=" +
        process.env.NEXT_PUBLIC_TMDB_API_KEY
    )
      // .then((res) => res.data.parts)
      // .then((res) =>  setPoster(baseURL + res.data.poster_path), setBackdrop(baseURL + res.data.backdrop_path) ) 
      .then((res) =>  setPoster(baseURL + res.data.poster_path))
      
      .catch((err) => console.log("error: ", err));
    
    const data = async()=>{
      await getResponse
    }


    
      data();


    },[])



  return (
    <>
      <Head>
        <title>007-Reviews</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <main className="bg-[#161616] text-white h-screen">
        
          <Navbar className="min-h-[15vh]"/>

          <div className="h-[25rem] aspect-[9/16] relative">

          <Image
          src={poster}
          fill
          alt="Bond Colleciton Poster"
          />
          </div>
          {/* <Image
          src={backdrop}
          fill
          alt="Bond Backdrop Poster"
          /> */}

          

          
          <h2 className="text-3xl text-center mt-8 mb-8 min-h-[80vh] grid place-items-center leading-12"> {" "} Bond. James Bond. <br /> <br /> Reviewed.{" "} </h2>


          

          {/* TODO cluster of images, charts here? */}
          <Footer />
        
      </main>
    </>
  );
}

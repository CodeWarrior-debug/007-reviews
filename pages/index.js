import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Axios from "axios";
import Image from "next/image";
import { Montserrat } from "@next/font/google";
import cls from 'classnames'

const montserrat = Montserrat({ style: "normal" }, { subsets: ["latin"] });

export default function Home() {

  // const [backdrop, setBackdrop] = useState("");
  const [poster, setPoster] = useState("");
  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const getPoster = Axios.get(
      "https://api.themoviedb.org/3/collection/" +
        process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID +
        "?api_key=" +
        process.env.NEXT_PUBLIC_TMDB_API_KEY
    )

      .then((res) => setPoster(baseURL + res.data.poster_path))

      .catch((err) => console.log("error: ", err));

    // const getBackdrop = Axios.get( //   "https://api.themoviedb.org/3/collection/" + //     process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID + //     "?api_key=" + //     process.env.NEXT_PUBLIC_TMDB_API_KEY // ) //   .then((res) =>  setBackdrop(baseURL + res.data.backdrop_path)) //   .catch((err) => console.log("error: ", err));

    const data = async () => {
      await getPoster;
      // await getBackdrop
    };

    data();
  }, []);

  return (
    <>
      <Head>
        <title>007-Reviews</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <main className={cls(montserrat.className,"bg-[#161616] text-white h-full min-h-screen")} >
        <div className="sticky top-0 bg-[#161616]">
        <Navbar  />
        </div>

        <div className="min-h-[76vh] grid place-items-center">
          <div>
            <p className="text-center leading-loose text-7xl uppercase font-thin">James Bond</p>
            {/* NEXT IMAGE WITH WRAPPER BELOW */}
            <div className="h-[46rem] aspect-[2/3] relative ">
              {" "}
              <Image src={poster} fill alt="Bond Collection Poster" priority className="rounded-2xl"/>
            </div>
            <p className="text-center leading-loose text-7xl font-thin uppercase">007 Reviews</p>
          </div>
        </div>

        {/* <h2 className="text-3xl text-center mt-8 mb-8 min-h-[80vh] grid place-items-center leading-12"> {" "} Bond. James Bond. <br /> <br /> Reviewed.{" "} </h2> */}

        <Footer />
      </main>
    </>
  );
}

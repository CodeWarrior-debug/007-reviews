import Head from "next/head";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import cls from "classnames";
import { useCollectionPoster } from "../lib/queries/tmdb";

const montserrat = Montserrat({ style: "normal", subsets: ["latin"] });

export default function Home() {
  const { data: poster } = useCollectionPoster();

  return (
    <>
      <Head>
        <title>007-Reviews</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <main
        className={cls(
          montserrat.className,
          "bg-[#161616] text-white h-full min-h-screen"
        )}
      >
        <Navbar />

        <div className="min-h-[76vh] grid place-items-center">
          <div className="flex flex-col items-center">
            <p className="animate-fade-in-up text-5xl text-center leading-loose md:text-7xl uppercase font-extrabold text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c] ">
              James Bond
            </p>
            <div className="h-[24rem] lg:h-[46rem] aspect-[2/3] relative flex flex-row justify-center">
              {poster ? (
                <Image
                  src={poster}
                  fill
                  alt="Bond Collection Poster"
                  priority
                  className="animate-fade-in-scale animation-delay-300 rounded-2xl"
                  sizes="100vw"
                />
              ) : (
                <div className="h-[24rem] lg:h-[46rem] aspect-[2/3] bg-[#252429] rounded-2xl animate-pulse" />
              )}
            </div>
            <p className="animate-fade-in-up animation-delay-600 text-5xl leading-loose text-center uppercase md:text-7xl font-extrabold text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c]">
              007 Reviews
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

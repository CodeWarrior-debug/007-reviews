import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { format } from "date-fns";
import cls from "classnames";
import Link from "next/link";
import Image from "next/image";
import numeral from "numeral";
import { useRef, useState, useEffect } from "react";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../lib/db";
import converter from "number-to-words";
import OneMovieReview from "../../components/OneMovieReview";
import { Montserrat } from "next/font/google";
import type { GetStaticPaths, GetStaticProps } from "next";
import { fetchCollection, fetchMovie } from "../../lib/queries/tmdb";

const montserrat = Montserrat({ style: "normal", subsets: ["latin"] });

interface MovieFacts {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  release_date: string;
  runtime: number;
  revenue: number;
  budget: number;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  homepage: string | null;
  imdb_id: string | null;
}

interface MovieIdProps {
  movieFacts: MovieFacts;
}

const MovieId = ({ movieFacts }: MovieIdProps) => {
  const [posterDisplayLabel, setPosterDisplayLabel] = useState("Hide Details");
  const [review, setReview] = useState("");
  const [myDatas, setMyDatas] = useState<Record<string, unknown>>({});
  const [posterOnly, setPosterOnly] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const reviewRef = useRef<HTMLInputElement>(null);

  const baseURL = "https://image.tmdb.org/t/p/original";
  const movie_w_backdrop_path = baseURL + `${movieFacts.backdrop_path}`;

  const dateStringToDate = (dateString: string) => {
    if (!dateString) return "Unknown";
    try {
      const [yearStr, mthStr, dayStr] = dateString.split("-");
      return format(
        new Date(parseInt(yearStr), parseInt(mthStr) - 1, parseInt(dayStr)),
        "MMMM d, yyyy"
      );
    } catch {
      return dateString;
    }
  };

  const retrieveReview = async () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const collectionName = "users";
    const docID = localStorage.getItem("userEmail");
    if (!docID) return;
    const docRef = doc(db, collectionName, docID);

    const getOneDoc = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const numID = converter.toWords(movieFacts.id).toString();
          const data = docSnap.data();
          setMyDatas(data);
          setReview(data[numID] as string);
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    };
    await getOneDoc();
  };

  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      retrieveReview();
      setIsLoggedIn(true);
      reviewRef.current?.focus();
    }
  }, [review]);

  const handleViewClick = async () => {
    if (posterOnly === "hidden") {
      setPosterOnly("");
      setPosterDisplayLabel("Hide Details");
    } else {
      setPosterOnly("hidden");
      setPosterDisplayLabel("Show Details");
    }
  };

  const handleUpdateClick = async () => {
    if (!reviewRef.current) return;
    setReview(reviewRef.current.value);
    const dialog = document.querySelector("dialog");
    const collectionName = "users";
    const docID = localStorage.getItem("userEmail") ?? "";
    const documentRef = doc(db, collectionName, docID);
    const reviewString = reviewRef.current.value;
    const reviewNumber = parseFloat(reviewString);
    const movieID = converter.toWords(movieFacts.id);

    const updateOneReview = async () => {
      if (reviewNumber > 10 || reviewNumber < 0) {
        dialog?.show();
        setTimeout(function () {
          dialog?.close();
        }, 3000);
      }
      await updateDoc(documentRef, { [movieID]: reviewNumber });
    };
    await updateOneReview();
  };

  return (
    <>
      <dialog>
        <span> Use a number equal to or between 0 and 10.</span>
      </dialog>

      <div className="text-white text-xl relative bg-[#161616] mvID2:bg-transparent">
        <Image
          src={movie_w_backdrop_path}
          fill
          alt="movie_backdrop_pic"
          className="hidden mvID2:flex -z-10 fixed top-0 left-0 aspect-[16/9] min-h-screen bg-[#161616]"
          priority
        />
        <Navbar />
        <div className="grid grid-flow-row grid-cols-3 mb-16 place-items-center">
          <div className="col-span-1 flex flex-row gap-2 m-8">
            <Link
              href="/"
              className="p-2 text-xs text-center bg-slate-600 mvID3:text-base mvID2:text-xl mvID1:text-3xl rounded-xl"
            >
              Home
            </Link>
            <Link
              href="/filmography"
              className="p-2 text-xs text-center bg-slate-600 mvID3:text-base mvID2:text-xl mvID1:text-3xl rounded-xl"
            >
              Films List
            </Link>
          </div>
          <h1
            className={cls(
              " text-base m-2 mvID3:text-xl mvID2:text-3xl mvID1:text-5xl text-center mvID2:m-8 col-span-1 font-extrabold bg-blend-darken bg-black/70 backdrop-blur-sm rounded-3xl p-2 mvID3:p-4 uppercase",
              montserrat.className
            )}
          >
            {" "}
            {movieFacts.title}{" "}
          </h1>

          <div className="col-span-1">
            <button
              className="p-2 m-8 text-xs text-center bg-slate-600 mvID3:text-base mvID2:text-xl mvID1:text-3xl rounded-xl"
              onClick={handleViewClick}
            >
              {" "}
              {posterDisplayLabel}{" "}
            </button>
          </div>
        </div>

        <div
          className={cls(
            posterOnly,
            "flex flex-row flex-wrap justify-center w-screen"
          )}
        >
          <div className="flex flex-row w-full mvID1:w-3/5">
            <div className="grid pl-8 pr-8 mvID3:pr-24 mvID3:pl-24 place-items-center">
              <div className="w-4/5 p-4 mb-8 bg-black/70 backdrop-blur-sm bg-blend-darken rounded-3xl">
                <p> In {movieFacts.title}... </p>
                <br />
                <p> {movieFacts.tagline} </p>
                <br />
                <p className=""> {movieFacts.overview} </p>
              </div>

              <div className="grid h-64 mvID2:hidden place-items-center">
                <Image
                  src={movie_w_backdrop_path}
                  width={360}
                  height={640}
                  alt="movie_backdrop_pic_small"
                  className="mvID2:hidden aspect-[16/9] rounded-xl"
                  priority
                />
              </div>

              <div className="bg-[#252429] rounded-2xl w-[85%] mvID1:w-[400px] mvID1:h-[200px]">
                <OneMovieReview
                  userReview={parseFloat(review) || 0}
                  audienceReview={parseFloat(
                    movieFacts.vote_average.toString()
                  )}
                />
              </div>
              <div className="mt-4 bg-blend-darken bg-[#252429] rounded p-2 mb-8 w-76 flex flex-row items-center">
                <label className="font-[600] mr-1 mvID4:mr-2 text-xs mvID2:text-sm">
                  Your Review = {review}
                </label>
                <input
                  id="rating"
                  type="number"
                  name="rating"
                  min="0"
                  max="10"
                  className="w-10 h-6 text-sm font-semibold text-center text-black rounded "
                  ref={reviewRef}
                ></input>
                <button
                  className="p-1 ml-1 text-xs font-semibold text-black bg-white rounded cursor-pointer mvID4:ml-2 z-60 mvID2:text-sm hover:bg-slate-800 hover:text-white w-28"
                  onClick={handleUpdateClick}
                >
                  Update Review
                </button>
              </div>

              {isLoggedIn ? (
                ""
              ) : (
                <div className="mt-4 bg-blend-darken bg-[#252429] rounded p-2 w-full mvID1:w-2/5 ">
                  <h3 className="font-[600] text-white text-base text-center mb-8">
                    Reviews Will Save If Signed In. &emsp; &emsp;
                    <Link href="/login" className="underline">
                      {" "}
                      SIGN IN{" "}
                    </Link>
                  </h3>
                </div>
              )}
            </div>
          </div>

          <div
            className={cls(
              montserrat.className,
              "flex flex-col w-full mvID1:w-2/5 mvID1:min-w-[349px] justify-center items-center"
            )}
          >
            <div className="bg-blend-darken bg-black/70 backdrop-blur-sm rounded-3xl w-1/2 p-4 pt-2 min-w-[143px] flex flex-col mb-16 items-between">
              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold">
                    <p>Movie</p>
                  </div>
                  <div className="mb-3">{movieFacts.title}</div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold">
                    <p>Run Time</p>
                  </div>
                  <div className="mb-3">
                    {(movieFacts.runtime / 60).toFixed(1)} HR
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold">
                    <p>Release Date</p>
                  </div>
                  <div className="mb-3">
                    <p> {dateStringToDate(movieFacts.release_date)} </p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold">
                    <p>Revenue</p>
                  </div>
                  <div className="mb-3">
                    ${numeral(movieFacts.revenue).format("0,0")}
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold">
                    <p>Profit</p>
                  </div>
                  <div className="mb-3">
                    $
                    {numeral(movieFacts.revenue - movieFacts.budget).format(
                      "0,0"
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold ">
                    <p>Avg Rating</p>
                  </div>
                  <div className="mb-3 ">
                    {numeral(movieFacts.vote_average).format("0.0")} / 10
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold">
                    <p>Votes</p>
                  </div>
                  <div className="mb-3">
                    {numeral(movieFacts.vote_count).format("0,0")}
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold">
                    <p>TMDB Trend Score</p>
                  </div>
                  <div className="mb-3">
                    {" "}
                    {numeral(movieFacts.popularity).format("0.0")} / 100
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="font-semibold">
                    <p>Movie Budget</p>
                  </div>
                  <div className="mb-3">
                    {" "}
                    ${numeral(movieFacts.budget).format("0,0")}
                  </div>
                </div>
              </div>

              <br />

              <p className="text-center">
                <Link
                  href={movieFacts.homepage ? movieFacts.homepage : "#"}
                  className="font-bold text-blue-500 underline hover:text-2xl"
                >
                  {" "}
                  {movieFacts.homepage ? "Official Homepage" : ""}
                </Link>
              </p>
              <br />
              <p className="text-center">
                <Link
                  href={
                    movieFacts.imdb_id
                      ? "https://www.imdb.com/title/" + movieFacts.imdb_id
                      : "/404"
                  }
                  className="font-bold text-green-500 underline hover:text-2xl"
                >
                  {movieFacts.imdb_id ? "IMDB Infopage" : ""}{" "}
                </Link>
              </p>
            </div>
          </div>
          <div className="bg-blend-darken bg-[#161616]/70 rounded-3xl p-2 mb-8">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchCollection();
  const paths = data.parts.map((movie: { id: number }) => ({
    params: { movieId: movie.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<MovieIdProps> = async ({
  params,
}) => {
  const moviesFacts = await fetchMovie(Number(params?.movieId));

  return {
    props: {
      movieFacts: moviesFacts,
    },
    revalidate: 3600,
  };
};

export default MovieId;

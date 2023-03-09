import {format} from "date-fns"
import cls from "classnames"
import Link from "next/link";
import Image from "next/image";
import Axios from "axios";
import numeral from "numeral";
import { useRef, useState, useEffect } from "react";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../lib/db";
var converter = require("number-to-words");
import OneMovieReview from "../../components/OneMovieReview";
import {Montserrat} from "@next/font/google"

const montserrat = Montserrat({ style: "normal" }, { subsets: ["latin"] });

const MovieId = ({ movieFacts }) => {


  //initial states
  const [posterDisplayLabel, setPosterDisplayLabel]=useState("Hide Details")
  const [review, setReview] = useState("");
  const [myDatas, setMyDatas] = useState("");
  const [posterOnly, setPosterOnly] = useState("");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const reviewRef = useRef(null);

//reusable variables
  const baseURL = "https://image.tmdb.org/t/p/original";
  let movie_w_backdrop_path = baseURL + `${movieFacts.backdrop_path}`;
  // let movie_w_poster_path = baseURL + `${movieFacts.poster_path}`;

  //converter for datestrings, current strings are YYYY-MM-DD
  const dateStringToDate = (dateString) => {
    const yearStr = dateString.substr(0, 4);
    const mthStr = dateString.substr(5, 2);
    const dayStr = dateString.substr(8, 2);

    return format(new Date(yearStr, mthStr, dayStr), "MMMMMMM d, yyyy");
  };

  //



  const retrieveReview = async () => {
    //get movie review from Firestore if it exists
    //setup
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const collectionName = "users";
    const docID = localStorage.getItem("userEmail");
    const docRef = doc(db, collectionName, docID);
    //retrieve review
    const getOneDoc = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("getOneDoc: ", docSnap.data());

          const numID = converter.toWords(movieFacts.id).toString();

          setMyDatas(docSnap.data());
          setReview(myDatas[numID]);
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

    retrieveReview();

    reviewRef.current.focus();

  }, [review]);

  const handleViewClick = async () => {
    if (posterOnly === "hidden") {
      setPosterOnly("");
    } else {
      setPosterOnly("hidden");
    }
  };

  const handleUpdateClick = async () => {
    

    //UPDATE ONE DOC

    //****************************
    setReview(reviewRef.current.value);
    const collectionName = "users";
    const docID = localStorage.getItem("userEmail");
    const documentRef = doc(db, collectionName, docID);
    const reviewString = reviewRef.current.value;
    const reviewNumber = parseFloat(reviewString);
    const movieID = converter.toWords(movieFacts.id);

    //*************************

    // Change the review accordingly
    const updateOneReview = async () =>

     { 
      //validation condition
      if (reviewNumber > 10 || reviewNumber < 0){
        
        return window.alert('Use a number equal to or between 0 and 10.')
        // console.log(reviewNumber)

      }

      await updateDoc(documentRef, { [movieID]: reviewNumber });
    
    
    }
    await updateOneReview();


    //*************************
  };

  return (
    <>
      <Image
        src={movie_w_backdrop_path}
        fill
        alt="movie_backdrop_pic"
        className="-z-10"
      />
      <div className="text-white text-xl">
        {/* <Link href="/filmography">
          <h2 className="fixed top-8 left-0 text-white text-4xl bg-blue-500">
            ◀️ BACK
          </h2>
        </Link> */}
        
        <div className="grid place-items-center grid-cols-3 ">
          <Link href="/filmography" className="text-center m-8 col-span-1 bg-slate-600 text-3xl rounded-xl p-2"> &lt; RETURN </Link>
          <h1 className="text-5xl text-center m-8 col-span-1"> {movieFacts.title} </h1>
          <button className="text-center m-8 col-span-1 bg-slate-600 text-3xl rounded-xl p-2" onClick={handleViewClick}> {posterDisplayLabel} </button>
        </div>

        {/* <button
          className="fixed top-8 right-0 text-white text-4xl bg-blue-500"
          onClick={handleViewClick}
        >
          POSTER ONLY
        </button> */}
        {/* SPACER */}
        <div className="h-[9vh]"></div>
        {/* WRAPPER TO SET HIDE/SHOW status */}
        <div className={cls(posterOnly, "flex flex-row flex-wrap w-screen") }>
            <div className="flex flex-row w-3/5">

          <div className="pr-24 pl-24">
            {/* MOVIE CONTENT */}


            <p> In {movieFacts.title}... </p>
            <br/>
            <p> {movieFacts.tagline} </p>
            <br/>
            <p className="w-4/5"> {movieFacts.overview} </p>
            <br/>
                                  {/* Your Review Chart */}
          <div style={{ width: 400, height: 200 }} className="bg-[#252429]">
            <OneMovieReview
              userReview={parseFloat(review)}
              audienceReview={parseFloat(movieFacts.vote_average)}
            />
          </div>
            <div className='mt-4'>
              <label className="font-[600] mr-4 ">
                Current Review = {review}
              </label>
              <input
                id="rating"
                type="number"
                name="rating"
                min="0"
                max="10"
                className="text-black text-center"
                ref={reviewRef}
              ></input>
              <button
                className="ml-4 bg-white text-black font-semibold rounded"
                onClick={handleUpdateClick}
              >
                Update Review
              </button>
            </div>
            </div>
            </div>

          
          


          <div className= {cls(montserrat.className,"flex flex-col w-2/5" )}>

              {/* MOVIE SPECS */}
              <div className="bg-blend-darken bg-black opacity-60 rounded-4xl w-1/2 p-4 pt-2">
                                {/* SPEC */}
                                <div className='mt-2'>
                    <div className="flex flex-row">
                      <div className="flex flex-row justify-start font-semibold w-1/2"><p>Movie</p></div>
                      <div className="w-1/2 flex flex-row justify-end text-right font-thin mb-3">{movieFacts.title}</div>

                  </div>

                {/* </> */}
                  {/* <svg className='h-1 w-4/5'> <line x1="0" y1="0" y2="0" style={{stroke:"rgb(255,255,255)", strokeWidth:2}} /> </svg> */}
                
                </div> {/* SPEC END*/}
                
                
                
                {/* SPEC */}
                  <div className='mt-2'>
                    <div className="flex flex-row">
                      <div className="flex flex-row justify-start font-semibold w-1/2"><p>Run Time</p></div>
                      <div className="w-1/2 flex flex-row justify-end text-right font-thin mb-3">{(movieFacts.runtime / 60).toFixed(1)} HR</div>

                  </div>

                  {/* <svg className='h-1 w-4/5'> <line x1="0" y1="0" y2="0" style={{stroke:"rgb(255,255,255)", strokeWidth:2}} /> </svg> */}
                
                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="flex flex-row">
                      <div className="flex flex-row justify-start font-semibold w-1/2"><p>Release Date</p></div>
                      <div className="w-1/2 flex flex-row justify-end text-right font-thin mb-3">
                          <p> {dateStringToDate(movieFacts.release_date)} </p>
                        
                      </div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="flex flex-row">
                      <div className="flex flex-row justify-start font-semibold w-1/2"><p>Revenue</p></div>
                      <div className="w-1/2 flex flex-row justify-end text-right font-thin mb-3">
                       ${numeral(movieFacts.revenue).format("0,0")}
                      </div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="flex flex-row">
                      <div className="flex flex-row justify-start font-semibold w-1/2"><p>Profit</p></div>
                      <div className="w-1/2 flex flex-row justify-end text-right font-thin mb-3">
                      ${numeral(movieFacts.revenue - movieFacts.budget).format( "0,0" )}
                      </div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="flex flex-row">
                      <div className="flex flex-row justify-start font-semibold w-1/2"><p>Avg Rating</p></div>
                      <div className="w-1/2 flex flex-row justify-end text-right font-thin mb-3">{numeral(movieFacts.vote_average).format("0.0")} / 10</div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="flex flex-row">
                      <div className="flex flex-row justify-start font-semibold w-1/2"><p>Votes</p></div>
                      <div className="w-1/2 flex flex-row justify-end text-right font-thin mb-3">
                      {numeral(movieFacts.vote_count).format( "0,0" )}
                      </div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  {/* <div className='mt-2'>
                    <div className="flex flex-row">
                      <div className="flex flex-row justify-start font-semibold w-1/2"><p>SPEC</p></div>
                      <div className="w-1/2 flex flex-row justify-end text-right font-thin mb-3">DATA</div>
                  </div>

                </div>  */}
                
                {/* SPEC END*/}
               


                {/* <Image
                src={grayLine}
                width={100}
                height={8}
                alt="dividing line"
                className=""
                /> */}

            {/* <p className="bg-blend-lighten"> {(movieFacts.runtime / 60).toFixed(1)} hr runtime </p> */}
            {/* <p> Released {dateStringToDate(movieFacts.release_date)} </p> */}
            <br />
            {/* RECEPTION AND RATINGS */}


            <p> {" "} TMDB Trending Score: &emsp;{" "} {numeral(movieFacts.popularity).format("0.0")}{" "} </p>
            {/* TODO: understand popularity definition */}
            

            {/* PRODUCTION DETAILS */}
            <p>
              {" "}
              Movie Budget: &emsp; ${numeral(movieFacts.budget).format(
                "0,0"
              )}{" "}
            </p>

            <br />

            {/* ADDL RESOURCES */}
            <p>
              <Link
                href={movieFacts.homepage ? movieFacts.homepage : "DNE"}
                className="underline text-blue-500 font-bold hover:text-2xl"
              >
                {" "}
                {movieFacts.homepage
                  ? movieFacts.original_title + "'s official homepage"
                  : "No official homepage"}
              </Link>
            </p>
            <p>
              <Link
                href={
                  movieFacts.imdb_id
                    ? "https://www.imdb.com/title/" + movieFacts.imdb_id
                    : "/404"
                }
                className="underline text-green-500 font-bold hover:text-2xl"
              >
                
                {movieFacts.imdb_id
                  ? movieFacts.original_title + "'s IMDB page"
                  : ""}{" "}
              </Link>
            </p>
            </div>
            <br />
            

            {/* TODO: find place for poster */}

            {/* <Image
              src={movie_w_poster_path}
              height={500}
              width={333}
              alt={movieFacts.title + " poster"}
              className="z-10"
            /> */}
            <br />
          </div>
          </div>



        </div>
    </>
  );
};

export async function getStaticPaths() {
  // CRUCIAL - need to have environment variables set in  https://vercel.com/YOURID/YOURPROJECTNAME/settings/environment-variables to get them to work in all environments
  
  const response = await Axios.get(
    "https://api.themoviedb.org/3/collection/" +
      process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID +
      "?api_key=" +
      process.env.NEXT_PUBLIC_TMDB_API_KEY
  )
    .then((res) => res.data.parts)
    .catch((err) => console.log("error: ", err));

  // console.log("response: ", response)

  const paths = await response.map((movie) => {
    return {
      params: { 
                movieId: movie.id.toString()
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
    // true attempt
  };
}

export async function getStaticProps({ params }) {
  // comment to commit, push
  const moviesFacts = await Axios.get(
    "https://api.themoviedb.org/3/movie/" +
      params.movieId +
      "?api_key=" +
      process.env.NEXT_PUBLIC_TMDB_API_KEY
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // console.log("movie Details: ", moviesFacts);

  return {
    props: {
      movieFacts: moviesFacts,
    },
    revalidate: 3600,
  };
}

export default MovieId;

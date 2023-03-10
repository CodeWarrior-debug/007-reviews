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
// import Navbar from "../../components/Navbar"

const montserrat = Montserrat({ style: "normal" }, { subsets: ["latin"] });

const MovieId = ({ movieFacts }) => {


  //initial states
  const [posterDisplayLabel, setPosterDisplayLabel]=useState("Hide Details")
  const [review, setReview] = useState("");
  const [myDatas, setMyDatas] = useState("");
  const [posterOnly, setPosterOnly] = useState("");
  const [isLoggedIn,setIsLoggedIn]=useState(false)
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

    if (localStorage.getItem("userEmail")){
      retrieveReview();
      setIsLoggedIn(true)

      reviewRef.current.focus();
    }



  }, []);

  const handleViewClick = async () => {
    if (posterOnly === "hidden") {
      setPosterOnly("");
      setPosterDisplayLabel("Hide Details")
    } else {
      setPosterOnly("hidden");
      setPosterDisplayLabel("Show Details")
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
  <div className="relative ">
  {/* <div className="relative hidden lg:block"> */}

      <Image
        src={movie_w_backdrop_path}
        fill
        alt="movie_backdrop_pic"
        className="-z-10 aspect-[16/9] min-h-screen"
        priority
      />
      
      <div className="text-white text-xl">
        
        <div className="grid place-items-center grid-cols-3 grid-flow-row ">
          <Link href="/filmography" className="text-center m-8 col-span-1 bg-slate-600 text-3xl rounded-xl p-2"> &lt; Return </Link>
          <h1 className={cls("text-5xl text-center m-8 col-span-1 font-extrabold bg-blend-darken bg-black opacity-70 rounded-3xl p-4 uppercase", montserrat.className)} > {movieFacts.title} </h1>
          <button className="text-center m-8 col-span-1 bg-slate-600 text-3xl rounded-xl p-2" onClick={handleViewClick}> {posterDisplayLabel} </button>
        </div>


        {/* SPACER */}
        <div className="h-[9vh]"></div>

        {/* WRAPPER TO SET HIDE/SHOW status */}
        <div className={cls(posterOnly, "flex flex-row flex-wrap w-screen") }>
            <div className="flex flex-row w-3/5">

          <div className="pr-24 pl-24 grid place-items-center ">
            {/* MOVIE CONTENT */}
          <div className="bg-blend-darken bg-black opacity-70 rounded-3xl w-4/5 p-4 mb-4">

            <p> In {movieFacts.title}... </p>
            <br/>
            <p> {movieFacts.tagline} </p>
            <br/>
            <p className=""> {movieFacts.overview} </p>
          </div>
            {/* Your Review Chart */}
            
          <div style={{ width: 400, height: 200 }} className="bg-[#252429] rounded-2xl">
            <OneMovieReview
              userReview={parseFloat(review)}
              audienceReview={parseFloat(movieFacts.vote_average)}
            />
          </div>
            <div className='mt-4 bg-blend-darken bg-[#252429] rounded p-2 w-3/10'>
              <label className="font-[600] mr-4 text-base">
                Your Review = {review}
              </label>
              <input
                id="rating"
                type="number"
                name="rating"
                min="0"
                max="10"
                className="text-black text-center rounded"
                ref={reviewRef}
              ></input>
              <button
                className="ml-4 bg-white text-black font-semibold text-base p-1 hover:bg-slate-400 hover:text-white rounded"
                onClick={handleUpdateClick}
              >
                Update Review
              </button>
              
            </div>
            
              {
isLoggedIn? 
             ""
             :
            <div className='mt-4 bg-blend-darken bg-[#252429] rounded p-2 w-2/5'>
             <h3 className="font-[600] text-white text-base text-center">Reviews Will Save If Signed In. &emsp; &emsp;   <Link href="/login" className="underline"> SIGN IN </Link> </h3>
            </div>
             
              }
            </div>
            </div>

          
          


          <div className= {cls(montserrat.className,"flex flex-col w-2/5" )}>

              {/* MOVIE SPECS */}
              <div className="bg-blend-darken bg-black opacity-70 rounded-3xl w-1/2 p-4 pt-2">
                                {/* SPEC */}
                                <div className='mt-2'>
                    <div className="grid grid-cols-2 justify-items-stretch">
                      <div className="grid col-span-1 justify-self-start"><p>Movie</p></div>
                      <div className="grid col-span-1 justify-self-end">{movieFacts.title}</div>
                  </div>

                
                </div> {/* SPEC END*/}
                
                
                
                {/* SPEC */}
                  <div className='mt-2'>
                    <div className="grid grid-cols-2 justify-items-stretch">
                      <div className="grid col-span-1 justify-self-start"><p>Run Time</p></div>
                      <div className="grid col-span-1 justify-self-end">{(movieFacts.runtime / 60).toFixed(1)} HR</div>

                  </div>

                
                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="grid grid-cols-2 justify-items-stretch">
                      <div className="grid col-span-1 justify-self-start"><p>Release Date</p></div>
                      <div className="grid col-span-1 justify-self-end">
                          <p> {dateStringToDate(movieFacts.release_date)} </p>
                        
                      </div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="grid grid-cols-2 justify-items-stretch">
                      <div className="grid col-span-1 justify-self-start"><p>Revenue</p></div>
                      <div className="grid col-span-1 justify-self-end">
                       ${numeral(movieFacts.revenue).format("0,0")}
                      </div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="grid grid-cols-2 justify-items-stretch">
                      <div className="grid col-span-1 justify-self-start"><p>Profit</p></div>
                      <div className="grid col-span-1 justify-self-end">
                      ${numeral(movieFacts.revenue - movieFacts.budget).format( "0,0" )}
                      </div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="grid grid-cols-2 justify-items-stretch">
                      <div className="grid col-span-1 justify-self-start"><p>Avg Rating</p></div>
                      <div className="grid col-span-1 justify-self-end">{numeral(movieFacts.vote_average).format("0.0")} / 10</div>
                  </div>

                </div> {/* SPEC END*/}
                  {/* SPEC */}
                  <div className='mt-2'>
                    <div className="grid grid-cols-2 justify-items-stretch">
                      <div className="grid col-span-1 justify-self-start"><p>Votes</p></div>
                      <div className="basis-1/2  flex flex-row justify-end text-right font-base mb-3">
                      {numeral(movieFacts.vote_count).format( "0,0" )}
                      </div>
                  </div>

                </div> 

                                  {/* SPEC TEST*/}
                                  {/* <div className='mt-2'>
                    <div className="flex flex-row flex-wrap justify-around">
                      <div ><p>Avg Rating</p></div>
                      <div >{numeral(movieFacts.vote_average).format("0.0")} / 10</div>
                  </div>

                </div>  */}
                {/* SPEC END TEST */}


                                                  {/* SPEC TEST*/}
                    <div className='mt-2'>
                    <div className="grid grid-cols-2 justify-items-stretch">
                      <div className="grid col-span-1 justify-self-start"><p>Avg Rating</p></div>
                      <div className="grid col-span-1 justify-self-end">{numeral(movieFacts.vote_average).format("0.0")} / 10</div>
                  </div>

                </div> {/* SPEC END TEST*/}
               


  
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
                  ? "Official Homepage"
                  : ""}
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
                  ? "IMDB Infopage"
                  : ""}{" "}
              </Link>
            </p>
            </div>
            <br />
            

            


            <br />
          </div>
          </div>



        </div>
  </div>

<div className=" lg:hidden" >
  <div className="relative min-h-[4vw] flex flex-col justify-center">
  <div className="flex flex-row justify-center items-center">
          <Link href="/filmography" className="text-center m-8 bg-slate-600 text-3xl text-white rounded-xl p-2 basis-full"> Return </Link>
          <h1 className={cls("text-5xl text-center m-8  font-extrabold bg-blend-darken text-white bg-black opacity-70 basis-full rounded-3xl p-4 uppercase", montserrat.className)} > {movieFacts.title} </h1>
          <button className="text-center m-8  bg-slate-600 text-3xl rounded-xl p-2 basis-full text-white" onClick={handleViewClick}> {posterDisplayLabel} </button>
        </div>


    <Image
        src={movie_w_backdrop_path}
        fill
        alt="movie_backdrop_pic"
        className="-z-10 aspect-[16/9] min-h-screen"
        priority
      />                  
  </div>

   {/* WRAPPER TO SET HIDE/SHOW status */}
   <div className={cls(posterOnly, "flex flex-row flex-wrap justify-center w-screen") }>
            <div className="flex flex-row justify-center">

          <div className="pr-24 pl-24 grid place-items-center ">
            {/* MOVIE CONTENT */}
          <div className="bg-blend-darken text-white bg-black opacity-70 rounded-3xl w-3/5 p-4 mb-4 ">

            <p> In {movieFacts.title}... </p>
            <br/>
            <p> {movieFacts.tagline} </p>
            <br/>
            <p className=""> {movieFacts.overview} </p>
          </div>
          </div>
          </div>






          {/* END WRAPPER */}
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

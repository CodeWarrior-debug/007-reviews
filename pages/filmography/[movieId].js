import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import Axios from "axios";
import numeral from "numeral";
import { useRef,useState,useEffect } from "react";
import { getFirestore, getDoc, doc,updateDoc} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from '../../lib/db'
var converter = require('number-to-words')
import OneMovieReview from "../../components/OneMovieReview";



const MovieId = ({ movieFacts }) => {

  const [review, setReview]=useState("")
  const [myDatas, setMyDatas]=useState("")
  const [posterOnly, setPosterOnly] = useState("")
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)


  const reviewRef = useRef(null);
  const baseURL = "https://image.tmdb.org/t/p/original";
  let movie_w_backdrop_path = baseURL + `${movieFacts.backdrop_path}`;
  let movie_w_poster_path = baseURL + `${movieFacts.poster_path}`;

  //current strings are YYYY-MM-DD
  const dateStringToDate = (dateString) => {
    const yearStr = dateString.substr(0, 4);
    const mthStr = dateString.substr(5, 2);
    const dayStr = dateString.substr(8, 2);

    return format(new Date(yearStr, mthStr, dayStr), "MMMMMMM d, yyyy");
  };

  const retrieveReview = async () =>{
        //READ ONE DOC, INPUT HERE
        const app = initializeApp(firebaseConfig)
        const db = getFirestore(app)
        const collectionName = "users"
        const docID = localStorage.getItem("userEmail")
        
        
            //     // ******************************************************
            const docRef = doc(db, collectionName, docID);

                const getOneDoc=async() =>{
                try {
                    const docSnap = await getDoc(docRef);
                    if(docSnap.exists()) {
                        // console.log("getOneDoc: ", docSnap.data());
                    
                        const numID = converter.toWords(movieFacts.id).toString()

                        setMyDatas( docSnap.data() );
                        setReview(myDatas[numID])
                            

                    } else {
                        console.log("Document does not exist")
                    }
                
                } catch(error) {
                    console.log(error)
                }
                
              }
              await getOneDoc();



  }



  useEffect(()=>{

    
     retrieveReview();

     reviewRef.current.focus()
    

  }, [review])

  const handleViewClick = async ()=>{
    if (posterOnly==="hidden"){
      setPosterOnly("")
    } else {
      setPosterOnly("hidden")
    }
  }

  const handleUpdateClick = async () => {
    // window.alert(reviewRef.current.value);

        //UPDATE ONE DOC

        //****************************
        setReview(reviewRef.current.value)
        const collectionName = "users"
        const docID = localStorage.getItem("userEmail")
        const documentRef = doc(db, collectionName, docID);
        const reviewString = reviewRef.current.value
        const reviewNumber = parseFloat(reviewString)
        const movieID = converter.toWords(movieFacts.id)

        //*************************

        // Change the review accordingly
        const updateOneReview= async ()=>

      // if (reviewNumber>10){
      //   window.alert('Value should be less than or equal to 10.')
      // }

        await updateDoc(documentRef, { [movieID]: reviewNumber });

        await updateOneReview();

        //*************************

  };

  return (
    <>
      <Image
        src={movie_w_backdrop_path}
        fill
        alt="good_pic"
        className="-z-10"
      />
      <div className="text-white text-xl">
        <Link href="/filmography">
          <h2 className="fixed top-8 left-0 text-white text-4xl bg-blue-500">◀️ BACK</h2>
        </Link>
        <h1 className="text-5xl text-center m-8"> {movieFacts.title} </h1>
        <button className="fixed top-8 right-0 text-white text-4xl bg-blue-500"
        onClick={handleViewClick}>POSTER ONLY</button>

        <div className={posterOnly}>
        {/* TEST AREA */}

        <div style={{width:400,height:200}} className="bg-white">
          
          <OneMovieReview userReview={parseFloat(review)} audienceReview={parseFloat(movieFacts.vote_average)} />
        </div>

        {/* TEST AREA END */}

        <div className="pr-24 pl-24">
          {/* MOVIE CONTENT */}
          {movieFacts.original_title === movieFacts.title ? (
            <div></div>
          ) : (
            <p>Originally released as + {movieFacts.original_title}</p>
          )}
          <div>
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
            <button className="ml-4 bg-white text-black font-semibold rounded" onClick={handleUpdateClick}>Update Review</button>
          </div>
          <p> {movieFacts.tagline} </p>
          <p> {movieFacts.overview} </p>
          <p> {(movieFacts.runtime / 60).toFixed(1)} hr runtime </p>
          <p> Released {dateStringToDate(movieFacts.release_date)} </p>
          <br />
          {/* RECEPTION AND RATINGS */}
          <p>
            {" "}
            Avg ⭐ of 10: &emsp;{" "}
            {numeral(movieFacts.vote_average).format("0.0")}{" "}
          </p>
          <p>
            {" "}
            Votes cast: &emsp; {numeral(movieFacts.vote_count).format(
              "0,0"
            )}{" "}
          </p>
          <p> Revenue: &emsp; ${numeral(movieFacts.revenue).format("0,0")} </p>
          <p>
            {" "}
            Profit: &emsp; &emsp; $
            {numeral(movieFacts.revenue - movieFacts.budget).format("0,0")}{" "}
          </p>
          <p>
            {" "}
            Popularity: &emsp; {numeral(movieFacts.popularity).format(
              "0.0"
            )}{" "}
          </p>
          {/* TODO: understand popularity definition */}
          <br />

          {/* PRODUCTION DETAILS */}
          <p>
            {" "}
            Movie Budget: &emsp; ${numeral(movieFacts.budget).format(
              "0,0"
            )}{" "}
          </p>
          {/* <p> {movieFacts.production_companies[0]?.name} </p>
          <p> {movieFacts.production_countries[0]?.name} </p>
          <p> {movieFacts.genres[0].name} </p> */}
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
                : "DNE"}{" "}
            </Link>
          </p>
          <p>
            <Link
              href={
                movieFacts.imdb_id
                  ? "https://www.imdb.com/title/" + movieFacts.imdb_id
                  : "DNE"
              }
              className="underline text-green-500 font-bold hover:text-2xl"
            >
              {" "}
              {movieFacts.imdb_id
                ? movieFacts.original_title + "'s IMDB page"
                : ""}{" "}
            </Link>
          </p>
          <br />

          {/* TODO: find place for poster */}

          <Image
            src={movie_w_poster_path}
            height={500}
            width={333}
            alt={movieFacts.title + " poster"}
            className="z-10"
          />
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
      params: { movieId: movie.id.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
    // blocking attempt, try true next
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
  };
}

export default MovieId;

import Card from "../../components/Card";
import Axios from "axios";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { isLoggedIn } from "../../lib/isLoggedIn";

export default function Filmography({ movies }) {
  return (
    <>

    {/* <Link> */}

      <Navbar className="min-h-[10vh]" />
      {/* TODO why login not responding */}
      {isLoggedIn ? 
        <h2 className="text-red-600 font-semibold m-4 text-center text-3xl"> Log In To Add Reviews </h2>
       : 
        ""
      }

      <div className="grid grid-auto-rows grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-32 mr-32">
        {/* TODO how do i get these cells to be equal height */}
        {movies.map((movie, index) => {
          const baseURL = "https://image.tmdb.org/t/p/original/";

          let movie_w_poster_path = baseURL + `${movie.poster_path}`;

          return (
            <>
              <Card
                key={index}
                movieId={movie.id}
                original_title={movie.original_title}
                overview={movie.overview}
                popularity={movie.popularity}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
                poster_path={movie_w_poster_path}
                className="h-full"
              />
            </>
          );
        })}
      </div>
      <Footer />
      </>
    
  );
}
export async function getStaticProps() {
  const response = await Axios.get(
    "https://api.themoviedb.org/3/collection/" +
      process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID +
      "?api_key=" +
      process.env.NEXT_PUBLIC_TMDB_API_KEY
  )
    .then((res) => res.data.parts)
    .catch((err) => console.log("error: ", err));

  // console.log(response)

  return {
    props: {
      movies: response,
    },
  };
}

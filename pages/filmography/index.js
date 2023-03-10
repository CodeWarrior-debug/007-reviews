import Card from "../../components/Card";
import Axios from "axios";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";



export default function Filmography({ movies }) {
  return (
    <>
      <div className="bg-[#161616] text-white">
        
          <div className=" sticky top-0 bg-[#161616] z-20">

          {/* <Navbar className="md:min-h-[5vh] lg:min-h-[10vh]" /> */}
          <Navbar  />
        </div>


        <div className="flex flex-row justify-center flex-wrap flex-auto gap-4 ml-[10%] mr-[10%]">
          {movies.map((movie, index) => {
            const baseURL = "https://image.tmdb.org/t/p/original/";

            let movie_w_poster_path = baseURL + `${movie.poster_path}`;

            return (
              <>
                <Card
                  key={index}
                  movieId={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  poster_path={movie_w_poster_path}
                  className="h-full max-w-[12em] max-h-[196px]"
                  
                />
              </>
            );
          })}
        </div>
        <Footer />
      </div>
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
    revalidate:3600 //in seconds, so once per hour
  };
}

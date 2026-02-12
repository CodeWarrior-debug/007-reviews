import Card from "../../components/Card";
import Axios from "axios";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import type { GetStaticProps } from "next";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface FilmographyProps {
  movies: Movie[];
}

export default function Filmography({ movies }: FilmographyProps) {
  return (
    <>
      <div className="bg-[#161616] text-white ">
        <div className=" sticky top-0 bg-[#161616] z-20 mb-8">
          <Navbar />
        </div>

        <div className="flex flex-row justify-center flex-wrap flex-auto gap-4 ml-[10%] mr-[10%]">
          {movies.map((movie, index) => {
            const baseURL = "https://image.tmdb.org/t/p/original/";
            const movie_w_poster_path = baseURL + `${movie.poster_path}`;

            return (
              <Card
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                overview={movie.overview}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                poster_path={movie_w_poster_path}
                className="h-full max-w-[12em] max-h-[196px]"
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<FilmographyProps> = async () => {
  const response = await Axios.get(
    "https://api.themoviedb.org/3/collection/" +
      process.env.NEXT_PUBLIC_TMDB_COLLECTION_ID +
      "?api_key=" +
      process.env.NEXT_PUBLIC_TMDB_API_KEY
  )
    .then((res) => res.data.parts)
    .catch((err) => console.log("error: ", err));

  return {
    props: {
      movies: response,
    },
    revalidate: 3600,
  };
};

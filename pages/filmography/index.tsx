import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import type { GetStaticProps } from "next";
import { fetchCollection, useCollectionMovies } from "../../lib/queries/tmdb";
import type { Movie } from "../../lib/queries/tmdb";

interface FilmographyProps {
  movies: Movie[];
}

export default function Filmography({ movies }: FilmographyProps) {
  const { data: cachedMovies } = useCollectionMovies(movies);
  const displayMovies = cachedMovies ?? movies;

  return (
    <>
      <div className="bg-[#161616] text-white ">
        <Navbar />

        <div className="flex flex-row justify-center flex-wrap flex-auto gap-4 ml-[10%] mr-[10%] mt-8">
          {displayMovies.map((movie) => {
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
  const data = await fetchCollection();

  return {
    props: {
      movies: data.parts,
    },
    revalidate: 3600,
  };
};

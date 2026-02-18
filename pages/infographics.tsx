import cls from "classnames";
import Footer from "../components/Footer";
import React from "react";
import Axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ChartArea, ScriptableContext } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Montserrat } from "next/font/google";
import Navbar from "../components/Navbar";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
ChartJS.register(ChartDataLabels);

const montserrat = Montserrat({ style: "normal", subsets: ["latin"] });

interface Movie {
  id: number;
  original_title: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
}

interface InfographicsProps {
  movies: Movie[];
}

const Infographics = ({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let width: number, height: number, gradient: CanvasGradient;

  const getGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea
  ) => {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, 0, 0, 450);
      gradient.addColorStop(0, "rgba(191, 149, 63, 0.7)");
      gradient.addColorStop(0.5, "rgba(191, 149, 63, 0.35)");
      gradient.addColorStop(1, "rgba(191, 149, 63, 0)");
    }
    return gradient;
  };

  const bgColorFn = function (context: ScriptableContext<"bar">) {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) {
      return;
    }
    return getGradient(ctx, chartArea);
  };

  const optionsRatings = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#C0C2C9",
          font: { size: 13 },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: { min: 0, max: 10 },
    },
    plugins: {
      legend: { position: "top" as const },
      datalabels: {
        color: "#fff",
        rotation: 270,
        align: "center" as const,
      },
      title: {
        display: true,
        text: "007 Reviews by Movie",
        color: "#fff",
        font: { size: 24 },
      },
    },
  };

  const dataRatings = {
    labels: movies.map((movie: Movie) => movie.original_title),
    datasets: [
      {
        data: movies.map((movie: Movie) => movie.vote_average.toFixed(1)),
        label: "Rating 0-10",
        backgroundColor: bgColorFn,
        pointBackgroundColor: "white",
        borderWidth: 0,
        borderColor: "#8A6E2F",
      },
    ],
  };

  const optionsVotes = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#C0C2C9",
          font: { size: 13 },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: { position: "top" as const },
      datalabels: {
        color: "#fff",
        rotation: 270,
        align: "end" as const,
        offset: 10,
      },
      title: {
        display: true,
        text: "007 Votes by Movie (TMDB)",
        color: "#fff",
        font: { size: 24 },
      },
    },
  };

  const dataVotes = {
    labels: movies.map((movie: Movie) => movie.original_title),
    datasets: [
      {
        data: movies.map((movie: Movie) => movie.vote_count),
        label: "# TMDB Votes",
        backgroundColor: bgColorFn,
        pointBackgroundColor: "white",
        borderWidth: 0,
        borderColor: "#8A6E2F",
      },
    ],
  };

  const optionsPopularity = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#C0C2C9",
          font: { size: 13 },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: { position: "top" as const },
      datalabels: {
        color: "#fff",
        rotation: 270,
        align: "center" as const,
      },
      title: {
        display: true,
        text: "007 Trending Score (TMDB) by Movie",
        color: "#fff",
        font: { size: 24 },
      },
    },
  };

  const dataPopularity = {
    labels: movies.map((movie: Movie) => movie.original_title),
    datasets: [
      {
        data: movies.map((movie: Movie) => movie.popularity.toFixed(1)),
        label: "Popularity Now 0-100",
        backgroundColor: bgColorFn,
        pointBackgroundColor: "white",
        borderWidth: 0,
        borderColor: "#8A6E2F",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#161616] p-12 h-full min-h-screen w-full text-white grid grid-cols-12 ">
        <div className="col-span-12">
          <h1
            className={cls(
              montserrat.className,
              "text-xl mvID4:text-4xl font-extrabold mt-8 mb-12 text-center"
            )}
          >
            007 INFOGRAPHICS
          </h1>
        </div>
        <div className="col-span-0 "></div>

        <div className="grid w-full col-span-12 place-items-center">
          <h3
            className={cls(
              montserrat.className,
              "text-white text-center mb-8"
            )}
          >
            {" "}
            Hover/Touch Graphs For Details{" "}
          </h3>

          <div className="overflow-x-auto w-[80%] max-w-[1040px] mb-12">
            <div className="min-w-[600px]">
              <Bar
                options={optionsRatings}
                data={dataRatings}
                className="max-h-[500px]"
              />
            </div>
          </div>
          <div className="overflow-x-auto w-[80%] max-w-[1040px] mb-12">
            <div className="min-w-[600px]">
              <Bar
                options={optionsVotes}
                data={dataVotes}
                className="max-h-[500px]"
              />
            </div>
          </div>
          <div className="overflow-x-auto w-[80%] max-w-[1040px] mb-12">
            <div className="min-w-[600px]">
              <Bar
                options={optionsPopularity}
                data={dataPopularity}
                className="max-h-[500px]"
              />
            </div>
          </div>

          <Footer />
        </div>

        <div className="col-span-0 "></div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<InfographicsProps> = async () => {
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

export default Infographics;

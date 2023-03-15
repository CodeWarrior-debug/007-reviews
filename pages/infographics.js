import cls from "classnames"
import Footer from "../components/Footer";
import React from "react";
import Axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Montserrat } from "@next/font/google";
import Navbar from "../components/Navbar"
ChartJS.register(ChartDataLabels);

const montserrat = Montserrat({style:"normal"},{subsets:"latin"})

const Infographics = ({ movies }) => {


  let width, height, gradient;

  const getGradient = (ctx, chartArea) => {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render// or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;

      gradient = ctx.createLinearGradient(0, 0, 0, 450);

      gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
      gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
    }

    return gradient;
  };




  const optionsRatings = {
    responsive: true,
    scales:{
      x:{
        ticks:
        {
          color:'#C0C2C9',
          font: {
            size:13
          }
        }
      },
        y:{
            min:0,
            max:10
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels:{
        color:"#fff",
        rotation:270,
        align: 'center',
        // offset: '15'
      },
      title: {
        display: true,
        text: '007 Reviews by Movie',
        color:'#fff',
        font:{
          size:24
        }
      },
    },
    
  };

  const dataRatings = {
    labels: movies.map(movie=>movie.original_title),
    datasets: [
      {
        data: movies.map(movie=>movie.vote_average.toFixed(1)),
        label:"Rating 0-10",
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            return getGradient(ctx, chartArea);
          },
          pointBackgroundColor: "white",
          borderWidth: 0,
          borderColor: "#911215",        
      },
    ],
  };

  const optionsVotes = {
    responsive: true,
    scales:{
      x:{
        ticks:{color:'#C0C2C9',
        font: {
          size:13
        }}
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels:{
        color:"#fff",
        rotation:270,
        align: 'end',
        offset: '10'
      },
      title: {
        display: true,
        text: '007 Votes by Movie (TMDB)',
        color:'#fff',
        font:{
          size:24
        }
      },
    },
  };

  const dataVotes = {
    labels: movies.map(movie=>movie.original_title),
    datasets: [
      {
        data: movies.map(movie=>(movie.vote_count)),
        label:"# TMDB Votes",
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
        pointBackgroundColor: "white",
        borderWidth: 0,
        borderColor: "#911215",  
      },
    ],
  };

  
  const optionsPopularity = {
    responsive: true,
    scales:{
      x:{
        ticks:{
          color:'#C0C2C9',
          font: {
            size:13
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels:{
        color:"#fff",
        rotation:270,
        align: 'center',
        // offset: '10'
      },
      title: {
        display: true,
        text: '007 Trending Score (TMDB) by Movie',
        color:'#fff',
        font:{
          size:24
        }
      },
    },
  };

  const dataPopularity = {
    labels: movies.map(movie=>movie.original_title),
    datasets: [
      {
        data: movies.map(movie=>movie.popularity.toFixed(1)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        label:"Popularity Now 0-100",
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
        pointBackgroundColor: "white",
        borderWidth: 0,
        borderColor: "#911215",  
      },
    ],
  };


// DISPLAY STARTS
  return (
      <>
        <div className="bg-[#161616] p-12 h-full min-h-screen w-full text-white grid grid-cols-12 ">
          <div className="col-span-12"> 
          <Navbar className ="mb-8"/>
          <h1 className={cls(montserrat.className, "text-2xl md:text-5xl font-extrabold mt-8 mb-12 text-center")}  >007 INFOGRAPHICS</h1>

          </div>
          <div className="col-span-0 "> 
          
          </div>

        <div className="grid w-full col-span-12 place-items-center">

          <h3 className={cls(montserrat.className, "text-white text-center mb-2 mvID3:hidden animate-pulse")} > Use Landscape On Smaller Devices </h3>
          <h3 className={cls(montserrat.className, "text-white text-center mb-8 animate-pulse")} > Hover/Touch Graphs For Details </h3>

            <Bar options={optionsRatings} data={dataRatings} className="w-[80%] max-w-[1080px] mb-12"/>
            <Bar options={optionsVotes} data={dataVotes} className="w-[80%] max-w-[1080px] mb-12"/>
            <Bar options={optionsPopularity} data={dataPopularity} className="w-[80%] max-w-[1080px] mb-12"/>

            <Footer />


        </div>

          <div className="col-span-0 "></div>

          
        
        </div>
  </>
)
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
    revalidate: 3600, //in seconds, so once per hour
  };
}

export default Infographics;

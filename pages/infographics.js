import Link from "next/link"
import cls from "classnames"
import Footer from "../components/Footer";
import React from "react";
import Axios from "axios";
// import {DateTime } from "luxon"
// import "chartjs-adapter-luxon"
import { Bar } from "react-chartjs-2";
import { useEffect,  useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Montserrat } from "@next/font/google";
ChartJS.register(ChartDataLabels);

const montserrat = Montserrat({style:"normal"},{subsets:"latin"})

const Infographics = ({ movies }) => {

  useEffect(()=>{
    console.log(movies)
  })

  // const [dates, setDates] = useState([]);

    //converter for datestrings, current strings are YYYY-MM-DD
    // const dateStringToDate = (dateString) => {
    //   const yearStr = dateString.substr(0, 4);
    //   const mthStr = dateString.substr(5, 2);
    //   const dayStr = dateString.substr(8, 2);
  
    //   return format(new Date(yearStr, mthStr, dayStr), "MMMMMMM d, yyyy");
    // };

  const streamlinedData = async () => {
    // setTitles(await movies.map((movie) => { return movie.title; }) );
    // setX(await movies.map((movie) => { return movie.budget} ));
    // setRatings(await movies.map((movie) => { return movie.vote_average} ));

    // const processDates=async()=>{

    //   const movieArr=async ()=>{

    // setDates( await  movies.map((movie) => { return movie.release_date  ; }))

    //  movieArr();

    // console.log(movieArr)

    //  return movieArr.sort((a,b)=>  a-b )

    //   }
    // }
      
    // setDates( processDates() );

    setRatings( await movies.map((movie) => { return movie.vote_average; }) );


      
    // setRatings(movies.map((movie)=>{
    //  ` {title: ${movie.title}, rating: ${movie.vote_average}} `
    // }))

    // console.log(ratings);
    // console.log(titles);
    // console.log(x);

  };

  // const chartRef = useRef(null);

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

  // const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   // // display options below
  //   const chart = chartRef.current;

  //   // if (chart) {
  //   //   console.log('CanvasRenderingContext2D', chart.ctx);
  //   //   console.log('HTMLCanvasElement', chart.canvas);
  //   // }
  //   const getStreamlinedData = async () => {
  //     await streamlinedData();
  //   };

  //   getStreamlinedData();

  //  }, []);



  const optionsRatings = {
    responsive: true,
    scales:{
      x:{
        ticks:
        {
          color:'#C0C2C9',
          font: {
            size:10
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels:{
        color:"#fff"
      },
      title: {
        display: true,
        text: '007 Reviews by Movie',
        color:'#fff'
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
          size:10
        }}
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels:{
        color:"#fff"
      },
      title: {
        display: true,
        text: '007 Votes by Movie (TMDB)',
        color:'#fff'
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
            size:10
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels:{
        color:"#fff"
      },
      title: {
        display: true,
        text: '007 Trending Score (TMDB) by Movie',
        color:'#fff'
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



  return (
      <>
        <div className="bg-[#161616] p-12 h-full min-h-screen text-white grid grid-cols-12">
          <div className="col-span-2"> 
          <Link href="/" className="text-center m-8 col-span-1 bg-slate-600 text-3xl rounded-xl p-2"> &lt; RETURN </Link>
          
          </div>
        {/* <div className="grid place-items-center grid-cols-3 ">
          <Link href="/filmography" className="text-center m-8 col-span-1 bg-slate-600 text-3xl rounded-xl p-2"> &lt; RETURN </Link>
          <h1 className="text-5xl text-center m-8 col-span-1"> {movieFacts.title} </h1>
          <button className="text-center m-8 col-span-1 bg-slate-600 text-3xl rounded-xl p-2" onClick={handleViewClick}> {posterDisplayLabel} </button>
        </div> */}

        <div className="col-span-8">

            <h1 className={cls(montserrat.className, "text-5xl font-extrabold mb-12 text-center")}  >007 INFOGRAPHICS</h1>

            <div className="grid place-items-center grid-cols-3 ">
          
        </div>

            <Bar options={optionsRatings} data={dataRatings} className="max-h-72 mb-12"/>
            <Bar options={optionsVotes} data={dataVotes} className="max-h-72 mb-12"/>
            <Bar options={optionsPopularity} data={dataPopularity} className="max-h-72 mb-12"/>

            <Footer />


        </div>

          <div className="col-span-1"></div>

          
        
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

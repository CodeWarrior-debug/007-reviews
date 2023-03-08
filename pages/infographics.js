// import numeral from "numeral";
import {faker} from "@faker-js/faker"
import React from "react";
import Axios from "axios";
import {DateTime } from "luxon"
import "chartjs-adapter-luxon"
import { Bar, LinearScale, BarElement, Title, Tooltip, Legend, } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

const Infographics = ({ movies }) => {
  const [ratings, setRatings] = useState([]);
  const [titles, setTitles] = useState([]);
  // const [dates, setDates] = useState([]);

    //converter for datestrings, current strings are YYYY-MM-DD
    // const dateStringToDate = (dateString) => {
    //   const yearStr = dateString.substr(0, 4);
    //   const mthStr = dateString.substr(5, 2);
    //   const dayStr = dateString.substr(8, 2);
  
    //   return format(new Date(yearStr, mthStr, dayStr), "MMMMMMM d, yyyy");
    // };

  const streamlinedData = async () => {
    setTitles(await movies.map((movie) => { return movie.title; }) );

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
    // console.log(dates);

  };

  const chartRef = useRef(null);

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

  const [userData, setUserData] = useState({});

  useEffect(() => {
    // // display options below
    const chart = chartRef.current;

    // if (chart) {
    //   console.log('CanvasRenderingContext2D', chart.ctx);
    //   console.log('HTMLCanvasElement', chart.canvas);
    // }
    const getStreamlinedData = async () => {
      await streamlinedData();
    };

    getStreamlinedData();

    setUserData({
      // labels: ["Me", "TMDB Audience", "Differential"],
      labels: `${titles}}`,

      datasets: [
        {
          label: "Rating",
          data: `${ratings}`,

          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            return getGradient(ctx, chartArea);
          },
          // backgroundColor: gradient,
          pointBackgroundColor: "white",
          borderWidth: 0,
          borderColor: "#911215",
        },
      ],
    });
  }, []);

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <div className="bg-[#161616] p-12 h-full">
        <div className="h-96">

        <Bar options={options} data={data}/>
      </div>
      </div>
</>)
}
          {/* <Bar
            ref={chartRef}
            id="chart"
            data={userData}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  type:"linear",
                  // time:{
                  //   min:new Date('01-01-1950').valueOf(),
                  //   max:new Date().valueOf(),
                  //   displayFormats:{
                  //     day: "yyyy-MM-dd"
                  //   },
                  //   unit:"day"
                  },
                  // adapters:{
                  // },
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                    maxTicksLimit: 100,
                    sampleSize: 30,
                  },
                },
                y: {
                  grid: { display: false },
                },
              plugins: {
                legend: {
                  labels: {
                    color: "#FFF",
                  },
                },
                datalabels: {
                  display: true,
                  color: "white",
                  align: "center",
                  padding: 0,
                  textStrokeWidth: 0.5,
                },
              },
            }}
          />
        </div>  */}

      
      {/* <ul> */}

        {/* {dates.map((date,index)=>{
          return <li key={index} className="text-white">{date} </li>
        })}
      </ul>
      <ul> */}

{/* {titles.map((title,index)=>{
  return <li key={index} className="text-white">{title} </li>
})} */}


{/* {ratings.map((rating,index)=>{
  return <li key={index} className="text-white">{rating} </li>
})} */}
{/* </ul> */}

    

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

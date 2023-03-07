import React from 'react'
import Axios  from 'axios'
import { Bar } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

const Infographics = ({movies}) => {

  const [ratings,setRatings]=useState([])
  const [titles,setTitles]=useState([])
  const [dates,setDates]=useState([])
  

  const streamlinedData= async()=>{

    setTitles(movies.map((movie)=>{ return movie.title }))
    setDates(movies.map((movie)=>{ return movie.release_date }))
    setRatings(movies.map((movie)=>{ return movie.vote_average }))

    console.log(titles)
    console.log(ratings)

    // setRatings(movies.map((movie)=>{
    //  ` {title: ${movie.title}, rating: ${movie.vote_average}} `
    // }))

    // console.log(ratings);
  }

  const chartRef = useRef(null);

  let width, height, gradient; 

  const getGradient = (ctx, chartArea)=>{
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render// or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;

      gradient = ctx.createLinearGradient(0, 0, 0, 450);


      gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    }
  
    return gradient;
  }

  const [userData, setUserData] = useState({
    // labels: ["Me", "TMDB Audience", "Some nobody"],
    labels: `${titles}`,
    datasets: [
      {
        label: "Rating",
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
  
          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
        data: `${ratings}`,

      },
    ],
  });

  useEffect(() => {
    // // display options below
    const chart = chartRef.current;
    
    // if (chart) {
    //   console.log('CanvasRenderingContext2D', chart.ctx);
    //   console.log('HTMLCanvasElement', chart.canvas);
    // }
    const getStreamlinedData= async()=>{
      await streamlinedData();
    }

    getStreamlinedData();
  
    setUserData({
      // labels: ["Me", "TMDB Audience", "Differential"],
    labels: `${titles}`,

      datasets: [
        {
          label: "Rating",
        data: `${ratings}`,

          // data: 
          
          // [
          //   4.5,7.8,
          //   Math.abs(7.8 - 4.5),

          //   // userReview.toFixed(1),
          //   // audienceReview.toFixed(1),
          //   // Math.abs(userReview - audienceReview).toFixed(1),
          // ],
          backgroundColor: function(context) {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
    
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

  return (
    <>
    <div className='bg-[#161616] p-12 h-screen'>
      
      <div className='h-96'>

      <Bar
        
        ref = {chartRef}
        id="chart"
        // style={{backgroundColor:'rgba(0,0,0, 0.0)'}}
        data={userData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: { grid: {
               display: false ,
            }, 
ticks:{
  display:true,
  autoSkip:false,     
  maxRotation: 90,
  minRotation: 90,
  maxTicksLimit:100,
  sampleSize:30
}           
          },
            y: {
              // min: 0,
              // max: 10,
              // ticks: { display: false },
              // ticks: { beginAtZero: true },
              grid: { display: false },
            },
          },
          plugins: {
            legend:{
              labels:{
                color:"#FFF"
              }
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
      </div>
    </div>
    </>
  );
};


//   return (
//     <>
//     <div>

// <div>

//       {movies.map((movie,index)=>{
//           return(
//             <>
//             <h2 key={index}>{movie.original_title}</h2>
//             </>
//           )


//       })}
//     </div>
// </div>
//     </>

//   )
// }

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


export default Infographics

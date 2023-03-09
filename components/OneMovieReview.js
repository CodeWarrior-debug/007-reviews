import { Bar } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

const OneMovieReview = ({ userReview, audienceReview }) => {

  

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
    labels: ["Me", "TMDB Audience", "Differential"],
    datasets: [
      {
        label: "Rating (out of 10)",
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
  
          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
        data: [
          userReview | "",
          audienceReview,
          Math.abs(userReview - audienceReview),
        ],

      },
    ],
  });

  useEffect(() => {
    // const chart = chartRef.current;
    // // display options below
      // if (chart) {
      //   console.log('CanvasRenderingContext2D', chart.ctx);
      //   console.log('HTMLCanvasElement', chart.canvas);
      // }

    setUserData({
      labels: ["Me", "TMDB Audience", "Differential"],
      datasets: [
        {
          label: "Rating (out of 10)",
          data: [
            userReview.toFixed(1),
            audienceReview.toFixed(1),
            Math.abs(userReview - audienceReview).toFixed(1),
          ],
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
  }, [userReview, audienceReview]);

  return (
    <>
      <Bar
        ref = {chartRef}
        id="chart"
        data={userData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: { grid: { display: false ,           
            } },
            y: {
              // min: 0,
              // max: 10,
              ticks: { display: false },
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
    </>
  );
};

export default OneMovieReview;

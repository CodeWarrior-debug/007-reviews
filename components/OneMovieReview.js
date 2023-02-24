import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels);


const OneMovieReview = ({ userReview, audienceReview }) => {

  const [userData, setUserData] = useState({
    labels: ["Me", "TMDB Audience", "Differential"],
    datasets: [
      {
        label: "Rating (out of 10)",
        data: [userReview, audienceReview, Math.abs(userReview-audienceReview) ],
      },
    ],
  });

  useEffect(() => {
    setUserData({
      labels: ["Me", "TMDB Audience","Differential"],
      datasets: [
        {
          label: "Rating (out of 10)",
          data:  [userReview, audienceReview, Math.abs(userReview-audienceReview).toFixed(1) ],
          backgroundColor: "#d4af37"
        },
      ],
    });
  }, [userReview,audienceReview]);

  return (
    <>
      <Bar
        data={userData}
       
        
        options={
          { 
            maintainAspectRatio:false,
            scales: { 
              x:{ grid:{display:false}},
              y: { min: 0, max: 10, ticks: { beginAtZero: true}, 
              grid:{display:false}
            }
              , }, 
            plugins:{
              datalabels: {
                display: true,
                color: "black",
                align: "center",
                padding:0,
                textStrokeWidth:.5
            }
            }
        }
      }
          
      
        
      />
    </>
  );
};

export default OneMovieReview;

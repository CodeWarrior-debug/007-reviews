import {Bar} from "react-chartjs-2"
import {useEffect, useState} from "react"
import {Chart as ChartJS} from 'chart.js/auto'


const BarChartBond = ({userReview,audienceReview } ) => {

  // const [userData, setUserData] = useState({})

  const [userData, setUserData] = useState({
        labels: ["Me", "TMDB Audience"], 
        datasets: [{
            label: "Rating (out of 10)",
            data: [userReview,audienceReview]
        }]


    })

    useEffect(()=>{
      setUserData({
        labels: ["Me", "TMDB Audience"], 
        datasets: [{
            label: "Rating (out of 10)",
            data: [userReview,audienceReview]
        }], 


}

  )

    },[userData])
    

  return (
    <>
      <Bar data={userData} 
      options={
        {
          scales:{
            y:{
              min: 0,
              max: 10,

              ticks:{
                beginAtZero: true,
                stepSize:1
              }
            }
            
          }
        }
      }
      />
    </>
  )
}

export default BarChartBond

import {Bar} from "react-chartjs-2"
import {useState} from "react"
import {UserData} from "../lib/data"
import {Chart as ChartJS} from 'chart.js/auto'


const BarChart = () => {

    const [userData, setUserData] = useState({
        labels: UserData.map((data=>data.year)), 
        datasets: [{
            label: "Users Gained",
            data: UserData.map((data)=>data.userGain)
        }]


    })


  return (
    <>
      <Bar data={userData} style={{width:250,height:250}}/>
    </>
  )
}

export default BarChart

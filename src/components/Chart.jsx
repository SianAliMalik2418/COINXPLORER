import React, { useContext } from 'react'
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CryptoContext } from './Context';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)



function Chart({ arr = [], days }) {

  const { selectedCurrency } = useContext(CryptoContext)

  var prices = []
  var date = [];


  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${selectedCurrency}`,
        data: prices,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(255,99,132,0.5)",

      }
    ]
  }



  return (
    <Line options={
      { responsive: true }
    }
      data={data}
    />


  )
}

export default Chart
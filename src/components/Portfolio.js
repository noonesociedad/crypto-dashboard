import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { portfolioFetch } from '../redux/action/action';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


export default function Portfolio() {
  //data fetching
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(portfolioFetch());
  }, []);
  const portfolioData = useSelector((state) => state.portfolio);
  // console.log(portfolioData.portfolioData)
  const data = portfolioData.portfolioData

  //taking top 5 major crypto values 
  let labelArray = [];
  let marketCapArray = [];
  for (let i = 0; i < 5; i++) {
    const object = data[i];
    for (const j in object) {
      if (j === "name") {
        labelArray.push(object[j]);
      }
      if (j === "market_cap") {
        marketCapArray.push(object[j]);
      }
    }
  }
  // console.log(labelArray)
  // console.log(marketCapArray)

  return (
    <div className="bg-white m-6 p-6 rounded-md">
      <div className="flex justify-center items-center">
        <h1>MAJOR 5 <p>Crypto Currency</p> </h1>
        {(data.length !== 0) ? (
          
            <div className="">
              <Pie
                data={{
                  labels: labelArray,
                  datasets: [
                    {
                      label: "PortFolio",
                      data: marketCapArray,
                      backgroundColor: [
                        "#14C38E",
                        "rgb(54, 162, 235)",
                        "rgb(255, 99, 132)",
                        "#fcc203",
                        "#f01111",
                      ],
                      borderColor: [
                        "#14C38E",
                        "rgb(54, 162, 235)",
                        "rgb(255, 99, 132)",
                        "#fcc203",
                        "#f01111",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                plugins={[ChartDataLabels]}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: "right",
                      labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                        //boxWidth: 5
                      },
                    },
                    datalabels: {
                      display: false,
                      color: "white",
                      align: "center",
                      padding: {
                        right: 2,
                      },
                      labels: {
                        title: {
                          font: {
                            weight: "bold",
                            size: 20,
                          },
                        },
                      },
                    }
                  },
                }}
              />
            </div>
          ) : (<div>loading......</div>)}
      </div>
    </div>
  )
}
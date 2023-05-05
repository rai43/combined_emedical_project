import { Chart as ChartJS, registerables } from "chart.js";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from "chart.js";
// import { Line } from 'react-chartjs-2';
import TitleCard from "../../../components/Cards/TitleCard";
import { createEffect } from "solid-js";

ChartJS.register(...registerables);

function LineChart() {
  let lineChartRef;

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "MAU",
        data: labels.map(() => {
          return Math.random() * 100 + 500;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  // const data = {
  //   React: 185134,
  //   Vue: 195514,
  //   Angular: 80460,
  //   Svelte: 57022,
  //   "Ember.js": 22165,
  //   "Backbone.js": 27862,
  // };

  createEffect(() => {
    const ctx = lineChartRef.getContext("2d");
    const myLineChart = new ChartJS(ctx, {
      type: "line",
      data: data,
    });
  });

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //   },
  // };

  return (
    <TitleCard title={"Montly Active Users (in K)"}>
      {/* <Line data={data} options={options}/> */}
      {/* <canvas id="myChart" width="1000" height="600"> */}
      <canvas ref={lineChartRef}></canvas>
    </TitleCard>
  );
}

export default LineChart;

import { Chart as ChartJS, registerables } from "chart.js";

import TitleCard from "../../../components/Cards/TitleCard";
import { createEffect } from "solid-js";

ChartJS.register(...registerables);

function BarChart() {
  let barChartRef;

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
        label: "Store 1",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Store 2",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //   },
  // };

  createEffect(() => {
    const ctx = barChartRef.getContext("2d");
    const myBarChart = new ChartJS(ctx, {
      type: "bar",
      data: data,
    });
  });

  return (
    <TitleCard title={"Revenue"}>
      {/* <Bar options={options} data={data} /> */}
      <canvas ref={barChartRef}>f</canvas>
    </TitleCard>
  );
}

export default BarChart;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const PieChart = ({ piechart }) => {
  const [state, setState] = useState({
    series: piechart.series,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: piechart.labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: piechart.series,
      options: {
        ...prevState.options,
        labels: piechart.labels,
      },
    }));
  }, [piechart]);

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="pie"
      width={"100%"}
    />
  );
};

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const Barchart = ({ graph }) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Desktops",
        data: graph.data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Daromad statistikasi",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: graph.categories,
      },
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: graph.data,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: graph.categories,
        },
      },
    }));
  }, [graph]);

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="line"
      width={"100%"}
    />
  );
};

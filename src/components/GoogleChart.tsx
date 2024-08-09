import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["1723060800000", "", "", "", ""],
  ["", 20, 28, 38, 45],
  ["", 31, 38, 55, 66],
  ["1723066200000", 50, 55, 77, 80],
  ["", 77, 77, 66, 50],
  ["", 68, 66, 22, 15],
  ["1723069800000", 68, 66, 22, 15],
  ["", 68, 66, 22, 15],
  ["", 68, 66, 22, 15],
  ["1723069800000", 68, 66, 22, 15],
  ["", 68, 66, 22, 15],
  ["", 68, 66, 22, 15],
  ["1723069800000", 68, 66, 22, 15],
  ["", 68, 66, 22, 15],
  ["", 68, 66, 22, 15],
  ["1723069800000", 68, 66, 22, 15],
  ["", 68, 66, 22, 15],
  ["", 68, 66, 22, 15],
  ["1723069800000", 68, 66, 22, 15],
];

export const options = {
  legend: "none",
//   bar: { groupWidth: "100%" }, // Remove space between bars.
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
    risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  },
};

export function GooogleChart() {
  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}

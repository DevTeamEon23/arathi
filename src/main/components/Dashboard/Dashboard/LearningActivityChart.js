import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LearningActivityChart = ({ data }) => {
  console.log("data", data);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      // ... existing options
      xaxis: {
        categories: [], // Will be filled with login dates
        title: {
          text: "User's Name",
          style: {
            fontSize: "16px",
            fontWeight: 400,
          },
        },
        labels: {
          // ... existing labels style
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        title: {
          text: "Points",
          style: {
            fontSize: "14px",
            fontWeight: 400,
          },
        },
      },
    },
  });

  useEffect(() => {
    if (data) {
      const userPointsData = data.map((user) => user.points);
      const loginDates = data.map((user) => user.full_name);

      setChartData((prevChartData) => ({
        ...prevChartData,
        series: [
          {
            name: "Points",
            data: userPointsData,
          },
        ],
        options: {
          ...prevChartData.options,
          xaxis: {
            ...prevChartData.options.xaxis,
            categories: loginDates,
          },
        },
      }));
    }
  }, [data]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={330}
      />
    </div>
  );
};

export default LearningActivityChart;

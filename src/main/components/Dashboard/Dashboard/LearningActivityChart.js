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
          text: "Points/ Levels",
          style: {
            fontSize: "14px",
            fontWeight: 400,
          },
        },
      },
      legend: {
        position: "top", // Set the legend position to top
        offsetY: 5, // Adjust the offset as needed
      },
    },
  });

  useEffect(() => {
    if (data) {
      const userPointsData = data.map((user) => ({
        name: user.full_name,
        points: user.points,
        userLevel: user.user_level, // Add user_level as a separate property
      }));

      const loginDates = data.map((user) => user.full_name);

      setChartData((prevChartData) => ({
        ...prevChartData,
        series: [
          {
            name: "Points",
            data: userPointsData.map((user) => user.points),
          },
          {
            name: "User Level",
            data: userPointsData.map((user) => user.userLevel),
          },
        ],
        options: {
          ...prevChartData.options,
          xaxis: {
            ...prevChartData.options.xaxis,
            categories: loginDates,
          },
          // colors: ["var(--primary)", "#3a9b7e"],
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

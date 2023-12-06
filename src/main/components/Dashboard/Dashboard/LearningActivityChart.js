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
          formatter: function (value) {
            const maxLength = 10;
            if (value?.length > maxLength) {
              return value?.substring(0, maxLength) + "...";
            }
            return value;
          },
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
        position: "top",
        offsetY: 5,
      },
      tooltip: {
        theme: "light",
        style: {
          background: "var(--primary)",
          color: "#fff",
          width: "200px",
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const userData = data[dataPointIndex] || {};
          const userName = userData.full_name || "";
          const points = userData.points || "";
          const userLevel =
            userData.user_level !== undefined ? userData.user_level : "";
          const loginDate = userData.login_date || "";

          return (
            '<div class="apexcharts-tooltip-custom">' +
            '<div class="apexcharts-tooltip-title fw-bold">' +
            userName +
            "</div>" +
            '<div class="mt-2 apexcharts-tooltip-series">Last Login Date - ' +
            loginDate +
            "</div>" +
            '<div class="mt-1 apexcharts-tooltip-series">User Points - ' +
            points +
            ", Level - " +
            userLevel +
            "</div>" +
            "</div>"
          );
        },
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

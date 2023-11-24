import React from "react";
import { Bar } from "react-chartjs-2";

const UserPointsChart = ({ data }) => {
  // Extract user data for chart
  const labels = data.map((user) => user.full_name);
  const points = data.map((user) => user.points);
  const backgroundColors = data.map((user) =>
    user.role === "Instructor" ? "rgba(0,0,139,0.2)" : "rgba(173,216,230,0.2)"
  );
  const borderColors = data.map((user) =>
    user.role === "Instructor" ? "rgba(0,0,139,1)" : "rgba(173,216,230,1)"
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "User Points",
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: points,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default UserPointsChart;

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Bar5 = ({ dataCount }) => {
  // Extract data for the chart
  const labels = dataCount.map((entry) => entry.dept);
  const dataValues = dataCount.map((entry) => entry.learner_count);

  // Trim labels for x-axis
  const truncatedLabels = labels.map((value) =>
    value.length > 5 ? value.substring(0, 5) + "..." : value
  );

  // Prepare data for the chart
  const chartData = {
    labels: truncatedLabels,
    datasets: [
      {
        label: "Learner Count",
        data: dataValues,
        backgroundColor: "rgba(63, 140, 255, 0.8)",
        borderColor: "rgba(63, 140, 255, 1)",
        borderWidth: 1,
        barThickness: 45,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Departments",
          font: {
            color: "#999999",
            size: 16,
            family: "Poppins",
            weight: 400,
          },
        },
        beginAtZero: true,
        stepSize: 1,
      },
      y: {
        title: {
          display: true,
          text: "User Count",
          font: {
            color: "#3E4954",
            size: 14,
            family: "Poppins",
            weight: 200,
          },
        },
        beginAtZero: true,
        stepSize: 1,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const dataIndex = context.dataIndex;
            const originalLabel = labels[dataIndex] || "N/A";
            const learnerCount = dataCount[dataIndex]?.learner_count || "N/A";
            return `${originalLabel}: ${learnerCount}`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Bar5;

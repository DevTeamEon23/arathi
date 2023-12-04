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

const BarChart1 = ({ data }) => {
  // Extract unique course names
  const courseNames = Array.from(
    new Set(data.map((entry) => entry.coursename))
  );

  // Count enrollments for each course
  const enrollmentsByCourse = courseNames.map((courseName) => {
    const enrollments = data.filter((entry) => entry.coursename === courseName);
    return enrollments.length;
  });

  // Truncate course names for the chart labels
  const truncatedCourseNames = courseNames.map((courseName) =>
    courseName.length > 15 ? courseName.substring(0, 15) + "..." : courseName
  );

  // Prepare data for the chart
  const chartData = {
    labels: truncatedCourseNames,
    datasets: [
      {
        label: "Enrollments",
        data: enrollmentsByCourse,
        backgroundColor: "rgba(63, 140, 255, 0.8)",
        borderColor: "rgba(63, 140, 255, 1)",
        borderWidth: 0.5,
        barThickness: 40,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Set to false to explicitly set height
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Courses Name",
          font: {
            color: "#3E4954",
            size: 14,
            family: "Poppins",
            weight: 400,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "User Count",
          font: {
            color: "#3E4954",
            size: 16,
            family: "Poppins",
            weight: 200,
          },
        },
        ticks: { beginAtZero: true, stepSize: 1 },
      },
    },
    plugins: {
      tooltip: {
        theme: "light",
        style: {
          background: "var(--primary)",
          color: "#fff",
          width: "200px",
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const userName = w.globals.labels[dataPointIndex] || "";
          const userData = data[dataPointIndex] || {};
          const points = userData.points || "";
          const userLevel = userData.user_level || "";
          return (
            '<div class="apexcharts-tooltip-custom">' +
            '<span class="apexcharts-tooltip-title">' +
            userName +
            "</span>" +
            '<span class="apexcharts-tooltip-series">Points - ' +
            points +
            ", Level - " +
            userLevel +
            "</span>" +
            "</div>"
          );
        },
      },
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default BarChart1;

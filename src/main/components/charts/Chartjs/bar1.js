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
  console.log(data);

  // Extract unique course names
  const courseNames = Array.from(
    new Set(data.map((entry) => entry.coursename))
  );

  // Count enrollments for each course
  const enrollmentsByCourse = courseNames.map((courseName) => {
    const enrollments = data.filter((entry) => entry.coursename === courseName);
    return enrollments.length;
  });

  // Prepare data for the chart
  const chartData = {
    labels: courseNames,
    datasets: [
      {
        label: "Enrollments",
        data: enrollmentsByCourse,
        backgroundColor: "rgba(63, 140, 255, 0.8)",
        borderColor: "rgba(63, 140, 255, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || ""; // Use context.label to get the actual label
            const fullNameArray = data
              .filter((entry) => entry.coursename === label)
              .map((entry) => entry.full_name);

            const fullName = fullNameArray.join(", ");
            return `${label}: ${context.parsed.y} (User: ${fullName || "N/A"})`;
          },
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

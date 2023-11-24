import React from "react";
import ReactApexChart from "react-apexcharts";

const ScoreActivityChart = ({ data }) => {
  const categories = data.map((item) => item.dept);

  const instructorCountData = data.map((item) => item.instructor_count);
  const learnerCountData = data.map((item) => item.learner_count);

  const chartData = {
    series: [
      {
        name: "Instructor Count",
        data: instructorCountData,
      },
      {
        name: "Learner Count",
        data: learnerCountData,
      },
    ],

    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          endingShape: "rounded",
          borderRadius: 2,
        },
      },
      states: {
        hover: {
          filter: "none",
        },
      },
      colors: ["var(--primary)", "var(--secondary)"],
      dataLabels: {
        enabled: false,
      },
      markers: {
        shape: "circle",
      },
      legend: {
        show: true,
        fontSize: "14px",
        position: "top",
        labels: {
          colors: "#000000",
        },
        markers: {
          width: 18,
          height: 18,
          strokeWidth: 50,
          strokeColor: "#fff",
          fillColors: undefined,
          radius: 12,
        },
      },
      stroke: {
        show: true,
        width: 3,
        curve: "smooth",
        lineCap: "round",
        colors: ["transparent"],
      },
      grid: {
        borderColor: "#eee",
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
          style: {
            colors: "#999999",
            fontSize: "14px",
            fontFamily: "poppins",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          offsetX: -16,
          style: {
            colors: "#787878",
            fontSize: "13px",
            fontFamily: "poppins",
            fontWeight: 100,
            cssClass: "apexcharts-xaxis-label",
          },
          formatter: function (value) {
            return parseInt(value);
          },
        },
      },
      fill: {
        opacity: 1,
        colors: ["var(--secondary)", "var(--primary)"],
      },
      tooltip: {
        theme: "light",
        style: {
          background: "var(--primary)",
          color: "#fff",
          width: "200px",
        },
        formatter: function (val) {
          return parseInt(val);
        },
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const countType = context.seriesName || "";
            return `${label}: ${parseInt(context.parsed.y)} (${countType})`;
          },
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height={285}
    />
  );
};

export default ScoreActivityChart;

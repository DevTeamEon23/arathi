import React from "react";
import ReactApexChart from "react-apexcharts";

const ScoreActivityChart = ({ data, chartType }) => {
  const categories = data.map((item) => item.dept);

  const countDataKeys =
    chartType === "superadmin"
      ? ["superadmin_count", "admin_count", "instructor_count", "learner_count"]
      : ["instructor_count", "learner_count"];

  const seriesData = countDataKeys.map((key, index) => ({
    name:
      chartType === "superadmin"
        ? key.replace("_count", "")
        : key.replace("_count", " Count"),
    data: data.map((item) => item[key]),
    color: `var(--${index % 2 === 0 ? "primary" : "secondary"}${
      index < 2 ? "-dark" : ""
    })`,
  }));

  const chartData = {
    series: seriesData,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          endingShape: "rounded",
          borderRadius: 2,
        },
      },
      states: {
        hover: {
          filter: "none",
        },
      },
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
        title: {
          text: "Departments",
          style: {
            color: "#999999",
            fontSize: "16px",
            fontFamily: "poppins",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        categories: categories.map((value) =>
          value.length > 5 ? value.substring(0, 5) + "..." : value
        ),
        labels: {
          show: true,
          style: {
            colors: "#999999",
            fontSize: "14px",
            fontFamily: "poppins",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label",
          },
          formatter: function (value, timestamp, index) {
            return value;
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
        title: {
          text: "User Counts",
          style: {
            color: "#999999",
            fontSize: "18px",
            fontFamily: "poppins",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label",
          },
        },
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
        max: 4,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: "light",
        style: {
          background: "var(--primary)",
          color: "#fff",
          width: "200px",
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const deptName = data[dataPointIndex].dept || "";
          const countType = chartData.series[seriesIndex].name || "";
          const countValue = series[seriesIndex][dataPointIndex];

          return (
            '<div class="apexcharts-tooltip-custom">' +
            '<div class="apexcharts-tooltip-title fw-bold">' +
            deptName +
            "</div>" +
            '<div class="mt-2 apexcharts-tooltip-series">' +
            `${countValue} (${countType})` +
            "</div>" +
            "</div>"
          );
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height={350}
    />
  );
};

export default ScoreActivityChart;

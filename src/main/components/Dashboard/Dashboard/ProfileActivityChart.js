import React from "react";
import ReactApexChart from "react-apexcharts";

const LearningActivityChart = ({ courseData }) => {
  console.log(courseData, "courseData");
  // Define the months you want to display on the y-axis
  const displayMonths = [
    "January",
    "March",
    "May",
    "July",
    "September",
    "November",
    "December",
  ];

  // Extracting necessary data for the chart
  const categories = courseData.map((data) => data.coursename);

  const enrollmentDates = courseData.map((data) => {
    const monthIndex = new Date(data.enrollment_date).getMonth();
    return monthIndex;
  });

  const state = {
    series: [
      {
        name: "Enrollment Date",
        data: enrollmentDates,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 320,
        group: "social",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
        colors: ["#4CBC9A"],
        curve: "smooth",
      },
      legend: {
        show: false,
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: "#3E4954",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 100,
          },
          offsetX: 2,
          maxHeight: 80, // Adjust the maxHeight as needed
          multiline: true,
        },
        axisBorder: {
          show: true,
        },
      },
      yaxis: {
        title: {
          text: "Months",
          style: {
            color: "#3E4954",
            fontSize: "16px",
            fontFamily: "Poppins",
            fontWeight: 200,
          },
        },
        categories: displayMonths,
        labels: {
          offsetX: -16,
          minWidth: 40,
          style: {
            colors: "#3E4954",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 100,
          },
        },
      },
      fill: {
        colors: ["#fff", "#FF9432"],
        type: "gradient",
        opacity: 1,
        gradient: {
          shade: "light",
          shadeIntensity: 1,
          colorStops: [
            [
              {
                offset: 0,
                color: "#4CBC9A",
                opacity: 0.4,
              },
              {
                offset: 0.6,
                color: "#4CBC9A",
                opacity: 0.4,
              },
              {
                offset: 100,
                color: "#fff",
                opacity: 0.4,
              },
            ],
          ],
        },
      },
      colors: ["#1EA7C5", "#FF9432"],
      grid: {
        borderColor: "#f1f1f1",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            markers: {
              size: [6, 6, 4],
              hover: {
                size: 7,
              },
            },
          },
        },
      ],
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const enrollmentDate = courseData[dataPointIndex].enrollment_date;
          return `<div class="tooltip-custom">Enrollment Date: ${enrollmentDate}</div>`;
        },
      },
    },
  };

  return (
    <div id="chart" className="activity-chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={320}
      />
    </div>
  );
};

export default LearningActivityChart;

import React from "react";
import ReactApexChart from "react-apexcharts";

const LearningActivityChart = ({ courseData }) => {
  // const dataTemp = [
  //   {
  //     course_id: 1,
  //     coursename:
  //       "Accounting & Financial Statement Analysis: Complete Training",
  //     enrollment_date: "28 Jan 2023",
  //     full_name: "Test 18",
  //     user_id: 4,
  //     user_role: "Learner",
  //   },
  //   {
  //     course_id: 2,
  //     coursename: "Financial Training",
  //     enrollment_date: "28 Feb 2023",
  //     full_name: "Test 18",
  //     user_id: 4,
  //     user_role: "Learner",
  //   },
  //   {
  //     course_id: 3,
  //     coursename: "Analysis Training",
  //     enrollment_date: "28 April 2023",
  //     full_name: "Test 18",
  //     user_id: 4,
  //     user_role: "Learner",
  //   },
  //   {
  //     course_id: 4,
  //     coursename: "Bank Training",
  //     enrollment_date: "28 June 2023",
  //     full_name: "Test 18",
  //     user_id: 4,
  //     user_role: "Learner",
  //   },
  //   {
  //     course_id: 5,
  //     coursename: "Management Training",
  //     enrollment_date: "28 Aug 2023",
  //     full_name: "Test 18",
  //     user_id: 4,
  //     user_role: "Learner",
  //   },
  //   {
  //     course_id: 6,
  //     coursename: "Advance Training",
  //     enrollment_date: "28 Sept 2023",
  //     full_name: "Test 18",
  //     user_id: 4,
  //     user_role: "Learner",
  //   },
  //   {
  //     course_id: 7,
  //     coursename: "Computer Training",
  //     enrollment_date: "28 Nov 2023",
  //     full_name: "Test 18",
  //     user_id: 4,
  //     user_role: "Learner",
  //   },
  //   {
  //     course_id: 8,
  //     coursename: "Software Training",
  //     enrollment_date: "28 Dec 2023",
  //     full_name: "Test 18",
  //     user_id: 4,
  //     user_role: "Learner",
  //   },
  // ];
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
          formatter: function (value) {
            const maxLength = 11;
            if (value?.length > maxLength) {
              return value?.substring(0, maxLength) + "...";
            }
            return value;
          },
          style: {
            colors: "#3E4954",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 500,
          },
        },
        title: {
          text: "Course Name",
          style: {
            color: "#3E4954",
            fontSize: "16px",
            fontFamily: "Poppins",
            fontWeight: 200,
          },
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
          const fullCourseName = courseData[dataPointIndex].coursename;
          const enrollmentDate = courseData[dataPointIndex].enrollment_date;

          return `
            <div class="tooltip-custom">
              Course: ${fullCourseName}<br>
              Enrollment Date: ${enrollmentDate}
            </div>`;
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

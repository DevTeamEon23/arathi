import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

class LearningActivityChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartOptions: {
        chart: {
          type: "area",
          height: 300,
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            minWidth: 20,
            offsetX: -16,
          },
        },
        // The series data is moved to chartOptions.series
        series: [
          {
            name: "Points",
            data: [], // Your data for the "Points" series goes here
          },
        ],
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
            width: "100px", // Increase the width as needed
          },
        },
        legend: {
          itemMargin: {
            horizontal: 30, // Increase the horizontal margin as needed
            vertical: 10, // Adjust the vertical margin as needed
          },
        },
        tooltip: {
          style: {
            width: "100px", // Increase the width as needed
          },
        },
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/auth/fetch_userpoints_by_userid")
      .then((response) => {
        const user_ids = response.data.data.user_ids;
        const loginDates = user_ids.map((user) => user.login_date);
        const userIDs = user_ids.map((user) => user.user_id); // Use user_id instead of full_name
        const userLevels = user_ids.map((user) => user.user_level);
        const pointsData = user_ids.map((user) => user.points);
        this.setState({
          data: user_ids,
          chartOptions: {
            ...this.state.chartOptions, // Preserve other chart options
            xaxis: {
              ...this.state.chartOptions.xaxis,
              categories: loginDates,
            },
            // Set the series data with user_id
            series: [
              {
                name: "Points",
                data: pointsData,
              },
              {
                name: "User ID", // Update the label to User ID
                data: userIDs, // Use user_id instead of full_name
              },
              {
                name: "User Level",
                data: userLevels,
              },
            ],
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartOptions.series}
          type="area"
          height={300}
        />
      </div>
    );
  }
}

export default LearningActivityChart;

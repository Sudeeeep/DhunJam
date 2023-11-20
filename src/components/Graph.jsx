import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

export const Graph = ({ graphData }) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        type: "category",
        border: {
          color: "white",
        },
        labels: [
          "Custom",
          "Category 1",
          "Category 2",
          "Category 3",
          "Category 4",
        ],
        ticks: {
          color: "white",
        },
      },
      y: {
        title: {
          text: "₹",
          align: "end",
          color: "white",
          font: { size: 40 },
          display: true,
        },

        ticks: {
          display: false,
        },
        border: {
          color: "white",
        },
      },
    },
  };

  return (
    <div>
      <Bar
        data={{
          datasets: [
            {
              data: Object.values(graphData),
              backgroundColor: "#F0C3F1",
              barThickness: 30,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

Graph.propTypes = {
  graphData: PropTypes.object,
};

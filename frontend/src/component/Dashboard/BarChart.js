import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (Chart.instances.length > 0) {
        Chart.instances.forEach((instance) => {
          if (instance.chart.canvas.id === chartRef.current.id) {
            chartInstance = instance.chart;
          }
        });
      }

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((sale) => sale.productName),
          datasets: [
            {
              label: "Quantity",
              data: data.map((sale) => sale.quantity),
              backgroundColor: "#699C78",
              borderColor: "#699C78",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas className="bg-white" ref={chartRef}></canvas>;
};

export default BarChart;

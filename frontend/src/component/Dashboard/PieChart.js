import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
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
        type: "pie",
        data: {
          labels: data.map((sale) => sale.productName),
          datasets: [
            {
              data: data.map((sale) => sale.quantity),
              backgroundColor: ["#6366F1", "#EC4899", "#F59E0B", "#f4cea5","#bce488","#bff5d3","#9c84f0","#c380fa"],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;

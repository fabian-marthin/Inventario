import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Grafica = ({ categorias, totalCategorias }) => {
  
  const data = {
    labels: categorias,
    datasets: [
      {
        label: "Inventario (%)",
        data: totalCategorias, 
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",  
          "rgba(54, 162, 235, 0.8)",  
          "rgba(255, 206, 86, 0.8)", 
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)", 
          "rgba(255, 159, 64, 0.8)",  
          "rgba(201, 203, 207, 0.8)", 
          "rgba(99, 255, 132, 0.8)",
          "rgba(235, 54, 162, 0.8)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.8)",  
          "rgba(54, 162, 235, 0.8)",  
          "rgba(255, 206, 86, 0.8)", 
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)", 
          "rgba(255, 159, 64, 0.8)",  
          "rgba(201, 203, 207, 0.8)", 
          "rgba(99, 255, 132, 0.8)",
          "rgba(235, 54, 162, 0.8)"  
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuración de opciones
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
        color: "rgba(255, 254, 254, 0.7)", 
          font: {
            size: 14, 
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} unidades`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default Grafica;
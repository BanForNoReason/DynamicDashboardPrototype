import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register components
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

import { Bar } from 'react-chartjs-2';

const AnalyticChart = ({ data }) => {
  const chartData = {
    labels: ['Attempted', 'Not Attempted', 'Correct', 'Incorrect'],
    datasets: [
      {
        label: 'Analytics Data',
        data: [
          data.attempted_count,
          data.not_attempted_count,
          data.correct_percentage,
          data.incorrect_percentage,
        ],
        backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '600px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AnalyticChart;

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Users', 'Scholarships Applied'],
    datasets: [
      {
        label: 'Count',
        data: [0, 0],
        backgroundColor: ['#4CAF50', '#2196F3'],
      },
    ],
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/users'); 
        const appliedResponse = await axios.get('http://localhost:5000/apply-scholarship'); 

        const userCount = userResponse.data.length;
        const appliedCount = appliedResponse.data.length;

        setChartData({
          labels: ['Users', 'Scholarships Applied'],
          datasets: [
            {
              label: 'Count',
              data: [userCount, appliedCount],
              backgroundColor: ['#4CAF50', '#2196F3'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Website Statistics</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Users and Scholarships Statistics',
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BranchChart() {
  const data = {
    labels: ['السالمية', 'حولي', 'الأحمدي', 'الفيلا', '海湾'],
    datasets: [
      {
        label: 'المبيعات',
        data: [12000, 8000, 10000, 6000, 9000],
        backgroundColor: '#D4AF37',
      },
      {
        label: 'الأرباح',
        data: [3000, 2000, 2500, 1500, 2200],
        backgroundColor: '#B8960C',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#D4AF37' } },
    },
    scales: {
      x: { ticks: { color: '#D4AF37' }, grid: { color: '#333' } },
      y: { ticks: { color: '#D4AF37' }, grid: { color: '#333' } },
    },
  };

  return (
    <div className="p-4 border border-gold rounded">
      <h2 className="text-xl mb-2 text-gold">أداء الفروع</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

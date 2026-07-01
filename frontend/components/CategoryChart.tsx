import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart() {
  const data = {
    labels: ['18K', '21K', '22K', '24K'],
    datasets: [
      {
        data: [25, 40, 20, 15],
        backgroundColor: ['#D4AF37', '#B8960C', '#F4D03F', '#8B7500'],
        borderColor: '#000',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#D4AF37' } },
    },
  };

  return (
    <div className="p-4 border border-gold rounded">
      <h2 className="text-xl mb-2 text-gold">توزيع العيارات</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

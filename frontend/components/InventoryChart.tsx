import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = '#FFFFFF';

export default function InventoryChart() {
  const data = {
    labels: ['نشط', 'متوسط', 'راكد'],
    datasets: [
      {
        data: [20000, 15000, 15000],
        backgroundColor: ['#22C55E', '#EAB308', '#EF4444'],
        borderColor: '#111d33',
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    color: '#FFFFFF',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#FFFFFF',
          font: { family: 'Cairo', size: 12 },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
          generateLabels: (chart: any) => {
            const ds = chart.data.datasets[0];
            const total = ds.data.reduce((a: number, b: number) => a + b, 0);
            return chart.data.labels.map((label: string, i: number) => ({
              text: `${label}  جم ${ds.data[i].toLocaleString()}`,
              fillStyle: ds.backgroundColor[i],
              strokeStyle: 'transparent',
              pointStyle: 'circle',
              index: i,
            }));
          },
        },
      },
      tooltip: {
        backgroundColor: '#1a2744',
        titleColor: '#D4AF37',
        bodyColor: '#fff',
        borderColor: '#D4AF37',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx: any) => {
            const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const pct = ((ctx.parsed / total) * 100).toFixed(0);
            return `${ctx.label}: ${ctx.parsed.toLocaleString()} جم (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="card">
      <h3 className="text-gold font-bold mb-4">توزيع المخزون حسب العمر</h3>
      <div style={{ height: '280px' }}>
        <Doughnut data={data} options={options as any} />
      </div>
      <div className="mt-3 text-center text-white text-xs">
        إجمالي المخزون: 50,000 جم
      </div>
    </div>
  );
}

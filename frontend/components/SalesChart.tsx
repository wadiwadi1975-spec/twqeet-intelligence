import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function SalesChart() {
  const [period, setPeriod] = useState('6months');

  const data = {
    labels: ['ديسمبر', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
    datasets: [
      {
        label: 'اتجاه المبيعات',
        data: [8000, 12000, 18000, 22000, 28000, 40000],
        borderColor: '#D4AF37',
        backgroundColor: (ctx: any) => {
          const gradient = ctx.chart?.ctx?.createLinearGradient(0, 0, 0, 300);
          if (gradient) {
            gradient.addColorStop(0, 'rgba(212, 175, 55, 0.25)');
            gradient.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
          }
          return gradient || 'rgba(212, 175, 55, 0.15)';
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointBackgroundColor: '#D4AF37',
        pointBorderColor: '#0a1628',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a2744',
        titleColor: '#D4AF37',
        bodyColor: '#fff',
        borderColor: '#D4AF37',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y.toLocaleString()} د.ك`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#6B7DB3', font: { family: 'Cairo', size: 11 } },
        grid: { color: 'rgba(107, 125, 179, 0.08)' },
        border: { display: false },
      },
      y: {
        ticks: {
          color: '#6B7DB3',
          font: { family: 'Cairo', size: 11 },
          callback: (v: any) => `${(v / 1000).toFixed(0)}K`,
        },
        grid: { color: 'rgba(107, 125, 179, 0.08)' },
        border: { display: false },
      },
    },
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gold font-bold">اتجاه المبيعات</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="text-xs py-1 px-3"
        >
          <option value="6months">آخر 6 أشهر</option>
          <option value="12month">آخر 12 شهر</option>
          <option value="3months">آخر 3 أشهر</option>
        </select>
      </div>
      <div style={{ height: '280px' }}>
        <Line data={data} options={options as any} />
      </div>
    </div>
  );
}

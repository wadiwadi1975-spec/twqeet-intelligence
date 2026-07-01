import React, { useState } from 'react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('sales');

  const generateReport = async (format: string) => {
    const res = await fetch(`/api/reports/${reportType}?format=${format}`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportType}-report.${format}`;
    link.click();
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز التقارير</h1>

      <select
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
        className="mb-4 p-2 text-black"
      >
        <option value="sales">تقارير المبيعات</option>
        <option value="profit">تقارير الأرباح</option>
        <option value="inventory">تقارير المخزون</option>
        <option value="employees">تقارير الموظفين</option>
        <option value="branches">تقارير الفروع</option>
      </select>

      <div className="space-x-4">
        <button onClick={() => generateReport('pdf')} className="bg-gold text-black px-4 py-2 rounded">
          تصدير PDF
        </button>
        <button onClick={() => generateReport('xlsx')} className="bg-gold text-black px-4 py-2 rounded">
          تصدير Excel
        </button>
        <button onClick={() => generateReport('csv')} className="bg-gold text-black px-4 py-2 rounded">
          تصدير CSV
        </button>
      </div>
    </div>
  );
}

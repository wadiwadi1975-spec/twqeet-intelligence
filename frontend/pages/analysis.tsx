import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AnalysisPage() {
  const [kpis, setKpis] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      const totalSales = rows.reduce((sum, r) => sum + (r.salePrice || r.totalAmount || 0), 0);
      const totalProfit = rows.reduce((sum, r) => sum + ((r.salePrice || 0) - (r.purchasePrice || 0)), 0);
      const inventoryValue = rows.reduce((sum, r) => sum + (r.purchasePrice || 0), 0);
      const avgTicketSize = totalSales / (rows.length || 1);

      setKpis({ totalSales, totalProfit, inventoryValue, avgTicketSize });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">تحليل بيانات Excel</h1>
      <input type="file" accept=".xlsx,.csv" onChange={handleFileUpload} className="mb-4 text-gold" />

      {kpis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 border border-gold rounded text-center">
            <h2 className="text-xl text-gold">إجمالي المبيعات</h2>
            <p className="text-2xl text-gold">{kpis.totalSales.toFixed(2)} دينار</p>
          </div>
          <div className="p-4 border border-gold rounded text-center">
            <h2 className="text-xl text-gold">إجمالي الأرباح</h2>
            <p className="text-2xl text-gold">{kpis.totalProfit.toFixed(2)} دينار</p>
          </div>
          <div className="p-4 border border-gold rounded text-center">
            <h2 className="text-xl text-gold">قيمة المخزون</h2>
            <p className="text-2xl text-gold">{kpis.inventoryValue.toFixed(2)} دينار</p>
          </div>
          <div className="p-4 border border-gold rounded text-center">
            <h2 className="text-xl text-gold">متوسط حجم الفاتورة</h2>
            <p className="text-2xl text-gold">{kpis.avgTicketSize.toFixed(2)} دينار</p>
          </div>
        </div>
      )}
    </div>
  );
}

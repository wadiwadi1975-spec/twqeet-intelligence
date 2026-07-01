import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DEFAULT_BRANCHES = [
  { branch: 'فرع الأحمدي', sales: 325000, profit: 81250, inventory: 145000 },
  { branch: 'فرع السالمية', sales: 218000, profit: 48500, inventory: 98000 },
  { branch: 'فرع الفحيحيل', sales: 185000, profit: 41200, inventory: 82000 },
  { branch: 'فرع الكويت city', sales: 117320, profit: 27500, inventory: 65000 },
];

export default function BranchAnalysisPage() {
  const [branchKPIs, setBranchKPIs] = useState<any[]>(DEFAULT_BRANCHES);

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

      const branchMap: Record<string, { sales: number; profit: number; inventory: number }> = {};

      rows.forEach((r) => {
        const branch = r.branch || r.branchName || "غير محدد";
        if (!branchMap[branch]) {
          branchMap[branch] = { sales: 0, profit: 0, inventory: 0 };
        }
        branchMap[branch].sales += r.salePrice || r.totalAmount || 0;
        branchMap[branch].profit += (r.salePrice || 0) - (r.purchasePrice || 0);
        branchMap[branch].inventory += r.purchasePrice || 0;
      });

      const branchData = Object.entries(branchMap).map(([branch, values]) => ({
        branch,
        ...values,
      }));

      if (branchData.length > 0) {
        setBranchKPIs(branchData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">تحليل الفروع</h1>
      <input type="file" accept=".xlsx,.csv" onChange={handleFileUpload} className="mb-4 text-gold" />

      {branchKPIs.length > 0 && (
        <>
          <table className="table-auto border-collapse border border-gold w-full text-sm mb-6">
            <thead>
              <tr>
                <th className="border border-gold px-2 py-1 text-gold">الفرع</th>
                <th className="border border-gold px-2 py-1 text-gold">المبيعات</th>
                <th className="border border-gold px-2 py-1 text-gold">الأرباح</th>
                <th className="border border-gold px-2 py-1 text-gold">المخزون</th>
              </tr>
            </thead>
            <tbody>
              {branchKPIs.map((b, idx) => (
                <tr key={idx}>
                  <td className="border border-gold px-2 py-1 text-gold">{b.branch}</td>
                  <td className="border border-gold px-2 py-1 text-gold">{b.sales.toFixed(2)}</td>
                  <td className="border border-gold px-2 py-1 text-gold">{b.profit.toFixed(2)}</td>
                  <td className="border border-gold px-2 py-1 text-gold">{b.inventory.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 border border-gold rounded">
            <h2 className="text-xl mb-2 text-gold">مقارنة الفروع</h2>
            <Bar data={{
              labels: branchKPIs.map(b => b.branch),
              datasets: [
                { label: 'المبيعات', data: branchKPIs.map(b => b.sales), backgroundColor: '#D4AF37' },
                { label: 'الأرباح', data: branchKPIs.map(b => b.profit), backgroundColor: '#1A1A1A' },
              ]
            }} />
          </div>
        </>
      )}
    </div>
  );
}

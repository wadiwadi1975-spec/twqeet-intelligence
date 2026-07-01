import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function FinancialReportsPage() {
  const [data, setData] = useState<any>(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      let totalRevenue = 0;
      let totalCost = 0;
      let totalProfit = 0;
      const categoryMap: Record<string, { revenue: number; cost: number; count: number }> = {};

      rows.forEach((r) => {
        const revenue = r.total || r.revenue || r.amount || r.price || 0;
        const cost = r.cost || r.expense || 0;
        const profit = revenue - cost;
        const category = r.category || r.type || 'غير محدد';

        totalRevenue += revenue;
        totalCost += cost;
        totalProfit += profit;

        if (!categoryMap[category]) categoryMap[category] = { revenue: 0, cost: 0, count: 0 };
        categoryMap[category].revenue += revenue;
        categoryMap[category].cost += cost;
        categoryMap[category].count += 1;
      });

      setData({
        totalRows: rows.length,
        totalRevenue,
        totalCost,
        totalProfit,
        profitMargin: totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0,
        categories: Object.entries(categoryMap).map(([name, v]) => ({
          name, ...v, profit: v.revenue - v.cost,
          margin: v.revenue > 0 ? (((v.revenue - v.cost) / v.revenue) * 100).toFixed(1) : 0
        })).sort((a, b) => b.revenue - a.revenue),
        rawRows: rows
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const exportToExcel = () => {
    if (!data) return;
    const ws = XLSX.utils.json_to_sheet(data.rawRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, `financial-report-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToCSV = () => {
    if (!data) return;
    const ws = XLSX.utils.json_to_sheet(data.rawRows);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `financial-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    if (!data) return;
    const content = [
      'تقرير مالي - منصتي MINASATI',
      `التاريخ: ${new Date().toLocaleDateString('ar-KW')}`,
      `إجمالي الصفوف: ${data.totalRows}`,
      `إجمالي الإيرادات: ${data.totalRevenue.toLocaleString()} د.ك`,
      `إجمالي التكاليف: ${data.totalCost.toLocaleString()} د.ك`,
      `صافي الربح: ${data.totalProfit.toLocaleString()} د.ك`,
      `هامش الربح: ${data.profitMargin}%`,
      '',
      'تفصيل حسب الفئة:',
      ...data.categories.map((c: any) => `${c.name}: إيراد ${c.revenue.toLocaleString()} | تكلفة ${c.cost.toLocaleString()} | ربح ${c.profit.toLocaleString()} | هامش ${c.margin}%`)
    ].join('\n');
    const blob = new Blob(['\ufeff' + content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `financial-report-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">مركز التقارير المالية</h1>
        <p className="text-gold mt-1">تحليل مالي شامل مع تصدير التقارير</p>
      </div>

      {/* Upload */}
      <div className="card">
        <h3 className="text-gold font-bold mb-3">رفع ملف Excel للتحليل</h3>
        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-gold" style={{ borderColor: '#1c2d4a' }}>
          <input type="file" accept=".xlsx,.csv,.xls" onChange={handleFileUpload} className="hidden" />
          <div className="text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="mx-auto mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <p className="text-gold text-sm font-semibold">{fileName || 'اسحب الملف هنا أو اضغط للرفع'}</p>
            <p className="text-gray-500 text-xs">يدعم Excel, CSV</p>
          </div>
        </label>
      </div>

      {/* Results */}
      {data && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="card">
              <p className="text-gray-400 text-xs">عدد الصفوف</p>
              <p className="text-white text-xl font-bold">{data.totalRows}</p>
            </div>
            <div className="card">
              <p className="text-gray-400 text-xs">إجمالي الإيرادات</p>
              <p className="text-white text-xl font-bold">{data.totalRevenue.toLocaleString()} د.ك</p>
            </div>
            <div className="card">
              <p className="text-gray-400 text-xs">إجمالي التكاليف</p>
              <p className="text-white text-xl font-bold">{data.totalCost.toLocaleString()} د.ك</p>
            </div>
            <div className="card">
              <p className="text-gray-400 text-xs">صافي الربح</p>
              <p className="text-white text-xl font-bold">{data.totalProfit.toLocaleString()} د.ك</p>
            </div>
            <div className="card">
              <p className="text-gray-400 text-xs">هامش الربح</p>
              <p className="text-white text-xl font-bold">{data.profitMargin}%</p>
            </div>
          </div>

          {/* Categories */}
          <div className="card">
            <h3 className="text-gold font-bold mb-4">تفصيل حسب الفئة</h3>
            <div className="table-container overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>الفئة</th>
                    <th>العدد</th>
                    <th>الإيراد</th>
                    <th>التكاليف</th>
                    <th>الربح</th>
                    <th>هامش الربح</th>
                  </tr>
                </thead>
                <tbody>
                  {data.categories.map((cat: any) => (
                    <tr key={cat.name}>
                      <td className="text-gold font-semibold">{cat.name}</td>
                      <td>{cat.count}</td>
                      <td>{cat.revenue.toLocaleString()} د.ك</td>
                      <td>{cat.cost.toLocaleString()} د.ك</td>
                      <td className="font-bold" style={{ color: cat.profit >= 0 ? '#22C55E' : '#EF4444' }}>{cat.profit.toLocaleString()} د.ك</td>
                      <td><span className={`badge ${Number(cat.margin) >= 10 ? 'badge-green' : Number(cat.margin) >= 0 ? 'badge-yellow' : 'badge-red'}`}>{cat.margin}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export */}
          <div className="card">
            <h3 className="text-gold font-bold mb-3">تصدير التقرير</h3>
            <div className="flex gap-3">
              <button onClick={exportToPDF} className="btn-gold px-6 py-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                تصدير PDF
              </button>
              <button onClick={exportToExcel} className="btn-gold px-6 py-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                تصدير Excel
              </button>
              <button onClick={exportToCSV} className="btn-gold px-6 py-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                تصدير CSV
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

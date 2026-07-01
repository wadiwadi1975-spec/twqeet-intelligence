import React, { useState, useEffect } from 'react';

export default function SalesPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/sales?companyId=1').then(r => r.json()),
      fetch('http://localhost:4000/dashboard/summary?companyId=1').then(r => r.json()),
    ]).then(([s, sum]) => {
      setSales(s.value || s.sales || []);
      setSummary(sum);
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "paid": return "badge-green";
      case "pending": return "badge-yellow";
      default: return "badge-red";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "paid": return "مدفوع";
      case "pending": return "مؤجل";
      default: return "ملغى";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">مركز المبيعات</h1>
        <p className="text-gold mt-1">إدارة وتتبع جميع المبيعات</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-gray-400 text-xs">إجمالي المبيعات</p>
          <p className="text-white text-xl font-bold">{summary?.totalSales?.toLocaleString() || 0} د.ك</p>
          <p className="text-green-400 text-xs mt-1">+{summary?.salesGrowth || 0}%</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-xs">عدد الفواتير</p>
          <p className="text-white text-xl font-bold">{summary?.totalInvoices || 0}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-xs">متوسط الفاتورة</p>
          <p className="text-white text-xl font-bold">{summary?.avgInvoice?.toLocaleString() || 0} د.ك</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-xs">العملاء</p>
          <p className="text-white text-xl font-bold">{summary?.customerCount || summary?.totalCustomers || 0}</p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="card">
        <h3 className="text-gold font-bold mb-4">جميع المبيعات</h3>
        <div className="table-container overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>رقم الفاتورة</th>
                <th>الفرع</th>
                <th>الوزن</th>
                <th>المبلغ</th>
                <th>الحالة</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice(0, 20).map((sale: any) => (
                <tr key={sale._id}>
                  <td className="font-mono text-gold text-xs">#{sale.invoiceNumber}</td>
                  <td className="text-white">فرع {sale.branchId}</td>
                  <td className="text-white">{sale.totalWeight} جرام</td>
                  <td className="font-bold text-white">{sale.total?.toLocaleString()} د.ك</td>
                  <td><span className={`badge ${getStatusColor(sale.status)}`}>{getStatusText(sale.status)}</span></td>
                  <td className="text-gray-400 text-xs">{new Date(sale.invoiceDate).toLocaleDateString('ar-KW')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

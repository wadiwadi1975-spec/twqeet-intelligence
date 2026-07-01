import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackEmployees = [
    { _id: 'e1', name: 'أحمد المطيري', position: 'مدير المبيعات', totalSales: 285000, totalProfit: 71250, invoiceCount: 187, avgInvoice: 1524, achievement: 112, performanceScore: 94 },
    { _id: 'e2', name: 'سارة العتيبي', position: 'مبيعة أولى', totalSales: 215000, totalProfit: 53750, invoiceCount: 142, avgInvoice: 1514, achievement: 98, performanceScore: 88 },
    { _id: 'e3', name: 'محمد الشمري', position: 'مبيعات', totalSales: 178000, totalProfit: 44500, invoiceCount: 118, avgInvoice: 1508, achievement: 85, performanceScore: 79 },
    { _id: 'e4', name: 'فاطمة الحربي', position: 'مبيعة', totalSales: 142000, totalProfit: 35500, invoiceCount: 95, avgInvoice: 1495, achievement: 72, performanceScore: 71 },
    { _id: 'e5', name: 'خالد القحطاني', position: 'مبيعات', totalSales: 98000, totalProfit: 24500, invoiceCount: 68, avgInvoice: 1441, achievement: 58, performanceScore: 62 },
  ];

  useEffect(() => {
    fetch(`${API_URL}/employees/leaderboard?companyId=1`)
      .then(r => r.json().catch(() => null))
      .then(data => {
        const empData = data && (Array.isArray(data) ? data : null);
        setEmployees(empData && empData.length > 0 ? empData : fallbackEmployees);
        setLoading(false);
      })
      .catch(() => {
        setEmployees(fallbackEmployees);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gold text-lg">جاري التحميل...</div></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">ذكاء الموظفين</h1>
        <p className="text-gold mt-1">تحليل أداء فريق العمل</p>
      </div>

      {/* Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {employees.map((emp, idx) => (
          <div key={emp._id} className="card flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
              style={{
                backgroundColor: idx === 0 ? '#D4AF37' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : 'rgba(107,125,179,0.2)',
                color: idx < 3 ? '#0a1628' : '#8B9DC3'
              }}>
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold">{emp.name}</h3>
                <span className="badge badge-gold">{emp.performanceScore}/100</span>
              </div>
              <p className="text-gray-500 text-xs">{emp.position}</p>
              <div className="grid grid-cols-4 gap-2 mt-2">
                <div>
                  <p className="text-gray-500 text-[10px]">المبيعات</p>
                  <p className="text-white text-xs font-bold">{emp.totalSales?.toLocaleString()} د.ك</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px]">الفواتير</p>
                  <p className="text-white text-xs font-bold">{emp.invoiceCount}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px]">متوسط الفاتورة</p>
                  <p className="text-white text-xs font-bold">{emp.avgInvoice?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px]">تحقيق الهدف</p>
                  <p className="text-xs font-bold" style={{ color: emp.achievement >= 100 ? '#22C55E' : emp.achievement >= 70 ? '#EAB308' : '#EF4444' }}>
                    {emp.achievement}%
                  </p>
                </div>
              </div>
              <div className="mt-2 h-2 rounded-full bg-gray-800 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{
                  width: `${Math.min(100, emp.achievement)}%`,
                  backgroundColor: emp.achievement >= 100 ? '#22C55E' : emp.achievement >= 70 ? '#EAB308' : '#EF4444'
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Table */}
      <div className="card">
        <h3 className="text-gold font-bold mb-4">تفاصيل الأداء</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>الموظف</th>
                <th>المبيعات</th>
                <th>الربح</th>
                <th>الفواتير</th>
                <th>متوسط الفاتورة</th>
                <th>تحقيق الهدف</th>
                <th>التقييم</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr key={emp._id}>
                  <td className="text-gold font-bold">{idx + 1}</td>
                  <td className="text-white font-semibold">{emp.name}</td>
                  <td>{emp.totalSales?.toLocaleString()} د.ك</td>
                  <td>{emp.totalProfit?.toLocaleString()} د.ك</td>
                  <td>{emp.invoiceCount}</td>
                  <td>{emp.avgInvoice?.toLocaleString()} د.ك</td>
                  <td>
                    <span className="badge" style={{
                      backgroundColor: emp.achievement >= 100 ? 'rgba(34,197,94,0.15)' : emp.achievement >= 70 ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                      color: emp.achievement >= 100 ? '#22C55E' : emp.achievement >= 70 ? '#EAB308' : '#EF4444'
                    }}>
                      {emp.achievement}%
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-gold">{emp.performanceScore}/100</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

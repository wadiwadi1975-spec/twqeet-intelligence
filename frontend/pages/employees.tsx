import React, { useState, useEffect } from 'react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/employees/leaderboard?companyId=1')
      .then(r => r.json())
      .then(data => { setEmployees(data); setLoading(false); })
      .catch(() => setLoading(false));
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

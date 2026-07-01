import React, { useState, useEffect } from 'react';
import SalesChart from '../components/SalesChart';
import InventoryChart from '../components/InventoryChart';
import AlertCard from '../components/AlertCard';
import * as XLSX from 'xlsx';
import { API_URL } from '../config';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);
  const [kpis, setKpis] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [brief, setBrief] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState<any>(null);
  const [excelFileName, setExcelFileName] = useState('');

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExcelFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);
      let total = 0, count = 0;
      rows.forEach(r => { total += r.total || r.amount || r.price || 0; count++; });
      setExcelData({ rows, total, count, fileName: file.name });
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));

    Promise.all([
      fetch(`${API_URL}/dashboard/summary?companyId=1`).then(r => r.json()),
      fetch(`${API_URL}/dashboard/health?companyId=1`).then(r => r.json()),
      fetch(`${API_URL}/dashboard/kpis?companyId=1`).then(r => r.json()),
      fetch(`${API_URL}/alerts?companyId=1`).then(r => r.json()),
      fetch(`${API_URL}/ai/brief?companyId=1`).then(r => r.json()),
    ]).then(([s, h, k, a, b]) => {
      setSummary(s); setHealth(h); setKpis(k); setAlerts(a.value || a.alerts || []); setBrief(b);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gold text-lg">جاري تحميل البيانات...</div></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">لوحة التحكم</h1>
          <p className="text-gold mt-1">نظرة عامة على أداء شركتك</p>
        </div>
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>اليوم: {new Date().toLocaleDateString('ar-KW', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Welcome + Upload */}
      <div className="card flex items-center justify-between">
        <div>
          <p className="text-white text-lg">مرحباً بك، {user?.name || 'مدير النظام'}</p>
          {brief && <p className="text-gold text-sm">{brief.greeting}</p>}
        </div>
        <label className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all" style={{ border: '1px dashed #D4AF37' }}>
          <input type="file" accept=".xlsx,.csv,.xls" onChange={handleExcelUpload} className="hidden" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <div>
            <p className="text-gold text-sm font-semibold">{excelFileName || 'رفع ملف Excel'}</p>
            <p className="text-gray-500 text-[10px]">{excelData ? `${excelData.count} صف | ${excelData.total.toLocaleString()} د.ك` : 'اسحب الملف هنا أو اضغط للرفع'}</p>
          </div>
        </label>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="إجمالي المبيعات" value={summary?.totalSales?.toLocaleString() || '0'} subtitle="دينار كويتي" color="gold" trend="up" trendValue={`+${summary?.salesGrowth || 0}%`}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
        <KPICard title="إجمالي الأرباح" value={summary?.totalProfit?.toLocaleString() || '0'} subtitle="دينار كويتي" color="green" trend="up" trendValue={`+${summary?.profitGrowth || 0}%`}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>} />
        <KPICard title="عدد الفواتير" value={String(summary?.totalInvoices || 0)} subtitle="فاتورة" color="gold"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} />
        <KPICard title="العملاء" value={String(summary?.customerCount || summary?.totalCustomers || 0)} subtitle="عميل نشط" color="green"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>} />
        <KPICard title="Health Score" value={`${health?.score || 0} /100`} subtitle={health?.classification || '—'} color={health?.score >= 70 ? 'green' : health?.score >= 50 ? 'gold' : 'red'}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InventoryChart />
        <SalesChart />
      </div>

      {/* Health Score Breakdown */}
      {health && health.breakdown && (
        <div className="card">
          <h3 className="text-gold font-bold text-lg mb-4">تفصيل Health Score</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(health.breakdown).map(([key, value]: [string, any]) => (
              <div key={key} className="p-3 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-xs">{key}</span>
                  <span className="text-white font-bold">{value}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: value >= 70 ? '#22C55E' : value >= 50 ? '#D4AF37' : '#EF4444' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Recommendation */}
        <div className="card">
          <h3 className="text-gold font-bold text-lg mb-4">التوصية الرئيسية</h3>
          {brief ? (
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <div className="flex items-center gap-2 mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span className="text-red-400 font-bold">{brief.topCategory}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{brief.keyInsight}</p>
              <p className="text-gold text-sm font-semibold mb-4">📌 {brief.topRecommendation}</p>
              <button className="btn-gold text-sm px-6 py-2">عرض التفاصيل</button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">جاري تحميل التوصيات...</p>
          )}
        </div>

        {/* Key Indicators */}
        <div className="card">
          <h3 className="text-gold font-bold text-lg mb-4">ملخص المؤشرات</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>المؤشر</th>
                  <th>القيمة</th>
                  <th>التقييم</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    إجمالي المبيعات
                  </td>
                  <td className="font-bold">{summary?.totalSales?.toLocaleString()} د.ك</td>
                  <td><span className="badge badge-green">● {summary?.salesGrowth}</span></td>
                </tr>
                <tr>
                  <td className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
                    إجمالي الأرباح
                  </td>
                  <td className="font-bold">{summary?.totalProfit?.toLocaleString()} د.ك</td>
                  <td><span className="badge badge-green">● {summary?.profitGrowth}</span></td>
                </tr>
                <tr>
                  <td className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                    عدد الفواتير
                  </td>
                    <td className="font-bold">{summary?.totalInvoices} فاتورة</td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    Health Score
                    </td>
                    <td className="font-bold">{health?.score}/100</td>
                    <td><span className={`badge ${health?.score >= 70 ? 'badge-green' : health?.score >= 50 ? 'badge-gold' : 'badge-red'}`}>● {health?.classification}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gold font-bold text-lg">التنبيهات</h3>
          <button className="text-gold text-sm hover:underline">عرض الكل</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {alerts.slice(0, 3).map((alert: any) => (
            <AlertCard
              key={alert._id}
              message={alert.description || alert.title || alert.message}
              priority={alert.priority}
              time={alert.createdAt || alert.timestamp}
              category={alert.type || alert.category}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-gray-500 text-xs">
        <span>منصتي © 2024</span>
        <span className="mx-2">—</span>
        <span>جميع الحقوق محفوظة</span>
      </div>
    </div>
  );
}

// Inline KPICard for dashboard
function KPICard({ title, value, subtitle, color, trend, trendValue, icon }: any) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-xs">{title}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: color === 'gold' ? 'rgba(212,175,55,0.15)' : color === 'green' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)' }}>
          <div style={{ color: color === 'gold' ? '#D4AF37' : color === 'green' ? '#22C55E' : '#EF4444' }}>{icon}</div>
        </div>
      </div>
      <p className="text-white text-xl font-bold">{value}</p>
      <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs" style={{ color: trend === 'up' ? '#22C55E' : '#EF4444' }}>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import SalesChart from '../components/SalesChart';
import InventoryChart from '../components/InventoryChart';
import KPICard from '../components/KPICard';
import AlertCard from '../components/AlertCard';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

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
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all" style={{ border: '1px dashed #D4AF37' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <div>
            <p className="text-gold text-sm font-semibold">رفع ملف Excel</p>
            <p className="text-gray-500 text-[10px]">اسحب الملف هنا أو اضغط للتصدير</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="سرعة الدوران"
          value="1.25"
          subtitle="مرة"
          color="gold"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>}
        />
        <KPICard
          title="هامش الربح"
          value="15.0%"
          subtitle="جيد"
          color="green"
          trend="up"
          trendValue="+2.1%"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
        />
        <KPICard
          title="إجمالي الأرباح"
          value="18,765"
          subtitle="دينار كويتي"
          color="green"
          trend="up"
          trendValue="+8%"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
        />
        <KPICard
          title="إجمالي المبيعات"
          value="125,430"
          subtitle="دينار كويتي"
          color="gold"
          trend="up"
          trendValue="+12%"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
        />
        <KPICard
          title="Health Score"
          value="72 /100"
          subtitle="وضع جيد"
          color="green"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InventoryChart />
        <SalesChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Recommendation */}
        <div className="card">
          <h3 className="text-gold font-bold text-lg mb-4">التوصية الرئيسية</h3>
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span className="text-red-400 font-bold">تصفية المخزون الراكد</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              نسبة المخزون الراكد لـ 30% وهي عالية وzugwierlich لـ خسارة إذا اتخذت سعر النهب.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              يوصى ببيع 8,000-6,000 جم من المخزون الراكد خلال الأيام القادمة.
            </p>
            <button className="btn-gold text-sm px-6 py-2">عرض التفاصيل</button>
          </div>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
                    سرعة الدوران
                  </td>
                  <td className="font-bold">1.25</td>
                  <td><span className="badge badge-green">● جيد</span></td>
                </tr>
                <tr>
                  <td className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    هامش الربح
                  </td>
                  <td className="font-bold">15.0%</td>
                  <td><span className="badge badge-green">● جيد</span></td>
                </tr>
                <tr>
                  <td className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    نسبة المخزون الراكد
                  </td>
                  <td className="font-bold">30.0%</td>
                  <td><span className="badge badge-red">● مرتعب</span></td>
                </tr>
                <tr>
                  <td className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    اتجاه السوق
                  </td>
                  <td className="font-bold">صاعد</td>
                  <td><span className="badge badge-green">● سلبي</span></td>
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
          <AlertCard
            message="فرصة شراء جيدة في السوق الحالي"
            priority="Low"
            time="منذ يومين"
            category="فرص"
          />
          <AlertCard
            message="لديك 15 فاتورةها أكثر من 120 يوم"
            priority="Medium"
            time="منذ يوم"
            category="تحصيل"
          />
          <AlertCard
            message="انخفاض سعر الذهب عالمياً"
            priority="Critical"
            time="منذ 3 ساعات"
            category="سوق"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-gray-500 text-xs">
        <span>TWQEET Intelligence © 2024</span>
        <span className="mx-2">—</span>
        <span>جميع الحقوق محفوظة</span>
      </div>
    </div>
  );
}

import React from 'react';
import SalesChart from '../components/SalesChart';
import InventoryChart from '../components/InventoryChart';
import BranchChart from '../components/BranchChart';
import CategoryChart from '../components/CategoryChart';
import KPICard from '../components/KPICard';
import AlertCard from '../components/AlertCard';

export default function ExecutiveDashboardPage() {
  const alerts = [
    { message: "انخفاض مبيعات فرع حولي بنسبة 20%", priority: "Critical" as const },
    { message: "نفاد مخزون الخواتم 21K", priority: "High" as const },
    { message: "تأخر المورد 'مجوهرات الشرق' في التسليم", priority: "Medium" as const },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gold">مركز الإدارة العليا</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <KPICard title="المبيعات" value="15,000 دينار" icon="💰" trend="up" trendValue="+12%" />
        <KPICard title="الأرباح" value="5,000 دينار" icon="📈" trend="up" trendValue="+8%" />
        <KPICard title="دوران المخزون" value="4 مرات/سنة" icon="📦" trend="neutral" />
        <KPICard title="أفضل فرع" value="السالمية" icon="🏬" trend="up" trendValue="+15%" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">الإيرادات مقابل المصروفات</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gold">
              <span>الإيرادات:</span>
              <span className="text-green-400">15,000 دينار</span>
            </div>
            <div className="flex justify-between text-gold">
              <span>المصروفات:</span>
              <span className="text-red-400">10,000 دينار</span>
            </div>
            <div className="border-t border-gold pt-2 flex justify-between text-gold font-bold">
              <span>صافي الربح:</span>
              <span>5,000 دينار</span>
            </div>
          </div>
        </div>
        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">التدفقات النقدية</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gold">
              <span>التدفقات الداخلة:</span>
              <span className="text-green-400">12,000 دينار</span>
            </div>
            <div className="flex justify-between text-gold">
              <span>التدفقات الخارجة:</span>
              <span className="text-red-400">9,000 دينار</span>
            </div>
            <div className="border-t border-gold pt-2 flex justify-between text-gold font-bold">
              <span>صافي التدفق النقدي:</span>
              <span>+3,000 دينار</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SalesChart />
        <BranchChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InventoryChart />
        <CategoryChart />
      </div>

      <div className="p-4 border border-gold rounded">
        <h2 className="text-2xl mb-4 text-gold">التنبيهات الحرجة</h2>
        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <AlertCard key={idx} message={alert.message} priority={alert.priority} />
          ))}
        </div>
      </div>
    </div>
  );
}

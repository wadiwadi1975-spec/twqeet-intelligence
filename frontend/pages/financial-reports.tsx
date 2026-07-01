import React from 'react';

export default function FinancialReportsPage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز التقارير المالية</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">الميزانية العمومية</h2>
          <p className="text-gold">الأصول: 50,000 دينار</p>
          <p className="text-gold">الخصوم: 20,000 دينار</p>
          <p className="text-gold">حقوق الملكية: 30,000 دينار</p>
        </div>

        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">الأرباح والخسائر</h2>
          <p className="text-gold">الإيرادات: 15,000 دينار</p>
          <p className="text-gold">المصروفات: 10,000 دينار</p>
          <p className="text-gold">صافي الربح: 5,000 دينار</p>
        </div>

        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">التدفقات النقدية</h2>
          <p className="text-gold">التدفقات الداخلة: 12,000 دينار</p>
          <p className="text-gold">التدفقات الخارجة: 9,000 دينار</p>
          <p className="text-gold">صافي التدفق النقدي: +3,000 دينار</p>
        </div>
      </div>

      <div className="space-x-4">
        <button className="bg-gold text-black px-4 py-2 rounded">تصدير PDF</button>
        <button className="bg-gold text-black px-4 py-2 rounded">تصدير Excel</button>
        <button className="bg-gold text-black px-4 py-2 rounded">تصدير CSV</button>
      </div>
    </div>
  );
}

import React from 'react';

export default function AdvancedAnalyticsPage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز التحليلات المتقدمة</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">تحليل الاتجاهات</h2>
          <ul className="space-y-2 text-gold">
            <li>مبيعات الخواتم 21K ارتفعت بنسبة 15% خلال آخر 6 أشهر.</li>
            <li>الطلب على السلاسل 18K يتراجع تدريجيًا منذ بداية العام.</li>
            <li>الأساور 22K تشهد ارتفاعًا في الطلب خلال فصل الصيف.</li>
          </ul>
        </div>

        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">محاكاة السيناريوهات</h2>
          <ul className="space-y-2 text-gold">
            <li>إذا ارتفع سعر الذهب 10% → الأرباح تنخفض 7%.</li>
            <li>إذا زادت المبيعات 20% → صافي الربح يرتفع 12%.</li>
            <li>إذا انخفض المخزون 30% → المبيعات تتأثر سلباً.</li>
          </ul>
        </div>

        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">مؤشرات الأداء</h2>
          <ul className="space-y-2 text-gold">
            <li>معدل دوران المخزون: 4 مرات/سنة.</li>
            <li>هامش الربح الإجمالي: 35%.</li>
            <li>نسبة السيولة: 1.8.</li>
            <li>متوسط فترة التحصيل: 30 يوم.</li>
          </ul>
        </div>

        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">تحليل الموسمية</h2>
          <ul className="space-y-2 text-gold">
            <li>شهر رمضان: زيادة الطلب على القلائد بنسبة 25%.</li>
            <li>الأعياد: زيادة المبيعات بنسبة 40%.</li>
            <li>الصيف: زيادة الطلب على الأساور بنسبة 20%.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

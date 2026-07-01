import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/categories/intelligence?companyId=1`)
      .then(r => r.json())
      .then(data => { setCategories(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gold text-lg">جاري التحميل...</div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">ذكاء الفئات</h1>
          <p className="text-gold mt-1">تحليل أداء كل فئة من منتجاتك</p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gold font-bold text-lg">{cat.nameAr}</h3>
              <div className="text-2xl font-bold" style={{ color: cat.opportunityScore > 80 ? '#22C55E' : cat.opportunityScore > 60 ? '#EAB308' : '#EF4444' }}>
                {cat.opportunityScore}
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-3">Opportunity Score</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)' }}>
                <p className="text-gray-400 text-[10px]">المبيعات</p>
                <p className="text-white text-sm font-bold">{cat.sales?.toLocaleString()} د.ك</p>
              </div>
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)' }}>
                <p className="text-gray-400 text-[10px]">الربح</p>
                <p className="text-white text-sm font-bold">{cat.profit?.toLocaleString()} د.ك</p>
              </div>
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}>
                <p className="text-gray-400 text-[10px]">النمو</p>
                <p className="text-sm font-bold" style={{ color: cat.growth > 0 ? '#22C55E' : '#EF4444' }}>
                  {cat.growth > 0 ? '+' : ''}{cat.growth}%
                </p>
              </div>
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.08)' }}>
                <p className="text-gray-400 text-[10px]">هامش الربح</p>
                <p className="text-white text-sm font-bold">{cat.profitMargin}%</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>دوران: {cat.turnoverRate}x</span>
              <span>متوسط العمر: {cat.avgDaysInStock} يوم</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-800 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${cat.salesShare}%`, backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-gray-500 text-[10px] mt-1">نسبة المبيعات: {cat.salesShare}%</p>
          </div>
        ))}
      </div>

      {/* Ranking Table */}
      <div className="card">
        <h3 className="text-gold font-bold mb-4">ترتيب الفئات حسب الأداء</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>الفئة</th>
                <th>المبيعات</th>
                <th>الربح</th>
                <th>النمو</th>
                <th>الدوران</th>
                <th>Opportunity</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat._id}>
                  <td className="text-gold font-bold">{idx + 1}</td>
                  <td className="text-white font-semibold">{cat.nameAr}</td>
                  <td>{cat.sales?.toLocaleString()} د.ك</td>
                  <td>{cat.profit?.toLocaleString()} د.ك</td>
                  <td style={{ color: cat.growth > 0 ? '#22C55E' : '#EF4444' }}>
                    {cat.growth > 0 ? '+' : ''}{cat.growth}%
                  </td>
                  <td>{cat.turnoverRate}x</td>
                  <td>
                    <span className="badge" style={{
                      backgroundColor: cat.opportunityScore > 80 ? 'rgba(34,197,94,0.15)' : cat.opportunityScore > 60 ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                      color: cat.opportunityScore > 80 ? '#22C55E' : cat.opportunityScore > 60 ? '#EAB308' : '#EF4444'
                    }}>
                      {cat.opportunityScore}
                    </span>
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

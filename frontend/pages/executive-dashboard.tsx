import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function ExecutiveDashboardPage() {
  const [decisions, setDecisions] = useState<any[]>([]);
  const [brief, setBrief] = useState<any>(null);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [budget, setBudget] = useState<any[]>([]);
  const [radar, setRadar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/executive/decisions?companyId=1`).then(r => r.json()),
      fetch(`${API_URL}/executive/brief?companyId=1`).then(r => r.json()),
      fetch(`${API_URL}/executive/opportunities?companyId=1`).then(r => r.json()),
      fetch(`${API_URL}/executive/budget?companyId=1`).then(r => r.json()),
      fetch(`${API_URL}/executive/radar?companyId=1`).then(r => r.json()),
    ]).then(([d, b, o, bu, ra]) => {
      setDecisions(d); setBrief(b); setOpportunities(o); setBudget(bu); setRadar(ra);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gold text-lg">جاري التحميل...</div></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">لوحة الإدارة التنفيذية</h1>
        <p className="text-gold mt-1">القرارات والتوصيات الفورية</p>
      </div>

      {/* Executive Brief */}
      {brief && (
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(13,22,40,1) 100%)' }}>
          <h3 className="text-gold font-bold mb-3">ملخص المدير التنفيذي</h3>
          <p className="text-white text-lg mb-2">{brief.greeting}، {brief.date}</p>
          <p className="text-gray-300 text-sm leading-relaxed">{brief.keyInsight}</p>
          <p className="text-gold text-sm font-semibold mt-2">📌 {brief.topRecommendation}</p>
        </div>
      )}

      {/* Top 5 Decisions */}
      <div className="card">
        <h3 className="text-gold font-bold mb-4">أهم 5 قرارات يجب اتخاذها</h3>
        <div className="space-y-3">
          {decisions.map((d) => (
            <div key={d._id} className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: d.priority === 'Critical' ? 'rgba(239,68,68,0.15)' : d.priority === 'Medium' ? 'rgba(234,179,8,0.15)' : 'rgba(34,197,94,0.15)',
                  color: d.priority === 'Critical' ? '#EF4444' : d.priority === 'Medium' ? '#EAB308' : '#22C55E'
                }}>
                {d.score}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{d.decision}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-green-400 text-xs">{d.expectedProfit}</span>
                  <span className="text-gray-500 text-xs">المخاطرة: {d.risk}</span>
                  <span className="text-gray-500 text-xs">الثقة: {d.confidence}%</span>
                </div>
              </div>
              <button className="btn-gold text-xs px-4 py-2">تنفيذ</button>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunity Matrix + Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-gold font-bold mb-4">Opportunity Matrix</h3>
          <div className="space-y-2">
            {opportunities.slice(0, 6).map((o, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#0d1628' }}>
                <div className="flex items-center gap-3">
                  <span className="text-gold font-bold text-sm">{i + 1}</span>
                  <div>
                    <p className="text-white text-sm">{o.category}</p>
                    <p className="text-gray-500 text-[10px]">نمو: {o.salesGrowth}% | هامش: {o.profitMargin}%</p>
                  </div>
                </div>
                <span className="badge" style={{
                  backgroundColor: o.opportunityScore > 80 ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
                  color: o.opportunityScore > 80 ? '#22C55E' : '#EAB308'
                }}>{o.opportunityScore}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-gold font-bold mb-4">توزيع الميزانية المقترح</h3>
          <div className="space-y-3">
            {budget.map((b, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm">{b.category}</span>
                  <span className="text-gold text-sm font-bold">{b.percentage}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${b.percentage}%`, backgroundColor: '#D4AF37' }} />
                </div>
                <p className="text-gray-500 text-[10px] mt-0.5">{b.amount?.toLocaleString()} د.ك</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

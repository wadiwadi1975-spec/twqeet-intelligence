import React, { useState, useEffect } from 'react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:4000/alerts?companyId=1')
      .then(r => r.json())
      .then(d => setAlerts(d.alerts || []));
  }, []);

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.priority === filter);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "Critical": return { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#EF4444', badge: 'badge-red' };
      case "High": return { bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', text: '#F97316', badge: 'badge-orange' };
      case "Medium": return { bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.3)', text: '#EAB308', badge: 'badge-yellow' };
      default: return { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', text: '#22C55E', badge: 'badge-green' };
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case "Critical": return '🔴';
      case "High": return '🟠';
      case "Medium": return '🟡';
      default: return '🟢';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">مركز التنبيهات</h1>
          <p className="text-gold mt-1">تنبيهات ذكية مع تحليل AI وتوصيات</p>
        </div>
        <div className="flex items-center gap-2">
          {['all', 'Critical', 'High', 'Medium', 'Low'].map(p => (
            <button key={p} onClick={() => setFilter(p)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === p ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              {p === 'all' ? 'الكل' : p === 'Critical' ? 'حرج' : p === 'High' ? 'مرتفع' : p === 'Medium' ? 'متوسط' : 'منخفض'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredAlerts.map((alert: any) => {
          const colors = getPriorityColor(alert.priority);
          return (
            <div key={alert._id} className="card" style={{ borderLeft: `4px solid ${colors.text}` }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: colors.bg }}>
                  {getPriorityIcon(alert.priority)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge ${colors.badge}`}>{alert.priority}</span>
                    <span className="text-gray-500 text-[10px]">{alert.category}</span>
                    <span className="text-gray-600 text-[10px]">{alert.timestamp}</span>
                  </div>
                  <p className="text-white font-semibold text-sm">{alert.message}</p>
                  {alert.aiAnalysis && (
                    <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)' }}>
                      <p className="text-gold text-xs font-semibold mb-1">AI Analysis:</p>
                      <p className="text-gray-300 text-xs">{alert.aiAnalysis}</p>
                    </div>
                  )}
                  {alert.recommendation && (
                    <div className="mt-2">
                      <p className="text-gold text-xs font-semibold">📌 {alert.recommendation}</p>
                    </div>
                  )}
                </div>
                <button className="btn-gold text-xs px-3 py-1">تنفيذ</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

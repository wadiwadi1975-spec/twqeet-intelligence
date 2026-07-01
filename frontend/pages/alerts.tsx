import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const DEFAULT_ALERTS = [
  { _id: '1', type: 'Sales', title: 'انخفاض مبيعات فرع السالمية', description: 'انخفاض مبيعات فرع السالمية بنسبة 20% مقارنة بالشهر الماضي', priority: 'Critical', status: 'Open', createdAt: '2026-06-30' },
  { _id: '2', type: 'Inventory', title: 'مخزون بطيء', description: 'هناك 5 منتجات بطيئة في المخزون منذ أكثر من 180 يوم', priority: 'Medium', status: 'Open', createdAt: '2026-06-29' },
  { _id: '3', type: 'Inventory', title: 'نقص المخزون', description: 'نقص حاد في مخزون الخواتم 21K في المخزون', priority: 'High', status: 'Open', createdAt: '2026-06-30' },
  { _id: '4', type: 'Profit', title: 'انخفاض هامش الأرباح', description: 'هامش الربح انخفض من 18% إلى 14% في الفرع الرئيسي', priority: 'High', status: 'Open', createdAt: '2026-06-28' },
  { _id: '5', type: 'Market', title: 'تغيّر سعر الذهب', description: 'سعر الذهب العالمي ارتفع 2.5% - يُنصح بمراجعة الأسعار', priority: 'Medium', status: 'Open', createdAt: '2026-07-01' },
  { _id: '6', type: 'Customer', title: 'عميل مهم يحتاج متابعة', description: 'العميل أحمد محمد لم يشتري منذ 45 يوم', priority: 'Medium', status: 'Open', createdAt: '2026-06-25' },
  { _id: '7', type: 'Sales', title: 'فرع الأحمدي يحقق أرقام قياسية', description: 'فرع الأحمدي حقق أعلى مبيعات هذا الشهر', priority: 'Low', status: 'Open', createdAt: '2026-07-01' },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>(DEFAULT_ALERTS);
  const [filter, setFilter] = useState('all');
  const [source, setSource] = useState('افتراضي');

  useEffect(() => {
    fetch(`${API_URL}/alerts?companyId=1`)
      .then(r => r.json().catch(() => null))
      .then(d => {
        const apiAlerts = d && (d.value || d.alerts);
        if (apiAlerts && apiAlerts.length > 0) {
          setAlerts(apiAlerts);
          setSource('خادم');
        }
      })
      .catch(() => {});
  }, []);

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.priority === filter);

  const getPriorityConfig = (priority: string) => {
    switch(priority) {
      case "Critical": return { bg: 'rgba(239,68,68,0.1)', border: '#EF4444', text: '#EF4444', badge: 'badge badge-red', icon: '🔴' };
      case "High": return { bg: 'rgba(249,115,22,0.1)', border: '#F97316', text: '#F97316', badge: 'badge badge-orange', icon: '🟠' };
      case "Medium": return { bg: 'rgba(234,179,8,0.1)', border: '#EAB308', text: '#EAB308', badge: 'badge badge-yellow', icon: '🟡' };
      default: return { bg: 'rgba(34,197,94,0.1)', border: '#22C55E', text: '#22C55E', badge: 'badge badge-green', icon: '🟢' };
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'Sales': return 'مبيعات';
      case 'Inventory': return 'مخزون';
      case 'Profit': return 'أرباح';
      case 'Market': return 'سوق';
      case 'Customer': return 'عملاء';
      default: return type || 'عام';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">مركز التنبيهات</h1>
          <p className="text-gold mt-1">تنبيهات ذكية مع تحليل AI وتوصيات</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-xs">المصدر: {source}</span>
          <div className="flex items-center gap-1">
            {[{v:'all',l:'الكل'},{v:'Critical',l:'حرج'},{v:'High',l:'مرتفع'},{v:'Medium',l:'متوسط'},{v:'Low',l:'منخفض'}].map(f => (
              <button key={f.v} onClick={() => setFilter(f.v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f.v ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {f.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'الكل', count: alerts.length, color: '#D4AF37' },
          { label: 'حرج', count: alerts.filter(a => a.priority === 'Critical').length, color: '#EF4444' },
          { label: 'مرتفع', count: alerts.filter(a => a.priority === 'High').length, color: '#F97316' },
          { label: 'متوسط', count: alerts.filter(a => a.priority === 'Medium').length, color: '#EAB308' },
        ].map(s => (
          <div key={s.label} className="card flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
              {s.count}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{s.label}</p>
              <p className="text-gray-500 text-xs">تنبيه</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const cfg = getPriorityConfig(alert.priority);
          return (
            <div key={alert._id} className="card" style={{ borderLeft: `4px solid ${cfg.border}` }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: cfg.bg }}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={cfg.badge}>{alert.priority}</span>
                    <span className="text-gray-400 text-[11px] px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>{getTypeLabel(alert.type)}</span>
                    <span className="text-gray-600 text-[11px]">{alert.createdAt}</span>
                  </div>
                  <p className="text-white font-semibold text-sm">{alert.title || alert.description}</p>
                  {alert.description && alert.title && (
                    <p className="text-gray-400 text-xs mt-1">{alert.description}</p>
                  )}
                  <div className="mt-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)' }}>
                    <p className="text-gold text-xs">💡 التوصية: قم باتخاذ إجراء فوري بخصوص هذا التنبيه</p>
                  </div>
                </div>
                <button className="btn-gold text-xs px-3 py-1.5 flex-shrink-0">تنفيذ</button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-400 text-lg">لا توجد تنبيهات</p>
          <p className="text-gray-600 text-sm mt-1">لا توجد تنبيهات بهذه الأولوية</p>
        </div>
      )}
    </div>
  );
}

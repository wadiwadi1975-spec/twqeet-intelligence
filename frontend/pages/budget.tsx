import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newBudget, setNewBudget] = useState({ name: '', description: '', duration: 3, startDate: '' });

  const fallbackBudgets = [
    {
      _id: 'b1', name: 'ميزانية الربع الثالث 2026', description: 'تخطيط ميزانية يوليو - سبتمبر', status: 'Active', duration: 3,
      startDate: '2026-07-01', endDate: '2026-09-30', totalBudget: 125000, totalActual: 78500,
      categories: [
        { name: 'مشتريات ذهب', icon: '💰', budgeted: 80000, actual: 52000 },
        { name: 'رواتب', icon: '👥', budgeted: 25000, actual: 24800 },
        { name: 'إيجار', icon: '🏢', budgeted: 12000, actual: 12000 },
        { name: 'تسويق', icon: '📢', budgeted: 5000, actual: 3200 },
        { name: 'أخرى', icon: '📦', budgeted: 3000, actual: 6500 },
      ],
      monthlyBreakdown: [
        { month: 'يوليو', budgeted: 42000, actual: 41500, status: 'actual' },
        { month: 'أغسطس', budgeted: 41500, actual: 37000, status: 'partial' },
        { month: 'سبتمبر', budgeted: 41500, actual: 0, status: 'planned' },
      ],
      branches: [
        { branchName: 'فرع الأحمدي', budgeted: 50000, actual: 32000 },
        { branchName: 'فرع السالمية', budgeted: 35000, actual: 22500 },
        { branchName: 'فرع الفحيحيل', budgeted: 40000, actual: 24000 },
      ],
    },
    {
      _id: 'b2', name: 'ميزانية النصف الثاني 2026', description: 'تخطيط ميزانية يوليو - ديسمبر', status: 'Draft', duration: 6,
      startDate: '2026-07-01', endDate: '2026-12-31', totalBudget: 250000, totalActual: 0,
      categories: [
        { name: 'مشتريات ذهب', icon: '💰', budgeted: 160000, actual: 0 },
        { name: 'رواتب', icon: '👥', budgeted: 50000, actual: 0 },
        { name: 'إيجار', icon: '🏢', budgeted: 24000, actual: 0 },
        { name: 'تسويق', icon: '📢', budgeted: 10000, actual: 0 },
        { name: 'أخرى', icon: '📦', budgeted: 6000, actual: 0 },
      ],
      monthlyBreakdown: [
        { month: 'يوليو', budgeted: 42000, actual: 0, status: 'planned' },
        { month: 'أغسطس', budgeted: 42000, actual: 0, status: 'planned' },
        { month: 'سبتمبر', budgeted: 42000, actual: 0, status: 'planned' },
        { month: 'أكتوبر', budgeted: 42000, actual: 0, status: 'planned' },
        { month: 'نوفمبر', budgeted: 41000, actual: 0, status: 'planned' },
        { month: 'ديسمبر', budgeted: 41000, actual: 0, status: 'planned' },
      ],
      branches: [
        { branchName: 'فرع الأحمدي', budgeted: 100000, actual: 0 },
        { branchName: 'فرع السالمية', budgeted: 75000, actual: 0 },
        { branchName: 'فرع الفحيحيل', budgeted: 75000, actual: 0 },
      ],
    },
  ];
  const fallbackSummary = { totalBudgets: 2, activeBudgets: 1, draftBudgets: 1, totalBudget: 375000, utilization: 21 };

  useEffect(() => {
    fetch(`${API_URL}/budgets?companyId=1`).then(r => r.json().catch(() => null)).then(d => {
      const bData = d && d.value;
      const budgetsArr = bData && bData.length > 0 ? bData : fallbackBudgets;
      setBudgets(budgetsArr);
      if (budgetsArr.length > 0) setSelectedBudget(budgetsArr[0]);
    }).catch(() => {
      setBudgets(fallbackBudgets);
      setSelectedBudget(fallbackBudgets[0]);
    });
    fetch(`${API_URL}/budgets/summary?companyId=1`).then(r => r.json().catch(() => null)).then(d => {
      setSummary(d && d.totalBudgets ? d : fallbackSummary);
    }).catch(() => setSummary(fallbackSummary));
  }, []);

  const handleCreate = async () => {
    if (!newBudget.name || !newBudget.startDate) return;
    const end = new Date(newBudget.startDate);
    end.setMonth(end.getMonth() + newBudget.duration);
    const res = await fetch(`${API_URL}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId: '1',
        name: newBudget.name,
        description: newBudget.description,
        duration: newBudget.duration,
        startDate: newBudget.startDate,
        endDate: end.toISOString().split('T')[0],
        totalBudget: 0,
        currency: 'KWD',
      }),
    });
    const budget = await res.json();
    setBudgets(prev => [...prev, budget]);
    setSelectedBudget(budget);
    setShowCreate(false);
    setNewBudget({ name: '', description: '', duration: 3, startDate: '' });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return 'badge badge-green';
      case 'Draft': return 'badge badge-yellow';
      case 'Completed': return 'badge badge-gold';
      default: return 'badge';
    }
  };

  const getMonthStatus = (status: string) => {
    switch(status) {
      case 'actual': return { color: '#22C55E', label: 'فعلي' };
      case 'partial': return { color: '#EAB308', label: 'جزئي' };
      default: return { color: '#6B7DB3', label: 'مخطط' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">الميزانية المصغرة</h1>
          <p className="text-gold mt-1">تخطيط ومتابعة ميزانية شهرين إلى عدة أشهر</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="btn-gold px-6 py-2">
          + ميزانية جديدة
        </button>
      </div>

      {/* Summary */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="card">
            <p className="text-gray-400 text-xs">إجمالي الميزانيات</p>
            <p className="text-white text-xl font-bold">{summary.totalBudgets}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-xs">نشطة</p>
            <p className="text-green-400 text-xl font-bold">{summary.activeBudgets}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-xs">مسودات</p>
            <p className="text-yellow-400 text-xl font-bold">{summary.draftBudgets}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-xs">إجمالي الميزانية</p>
            <p className="text-gold text-xl font-bold">{Number(summary.totalBudget).toLocaleString()} د.ك</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-xs">نسبة الاستهلاك</p>
            <p className="text-white text-xl font-bold">{summary.utilization}%</p>
          </div>
        </div>
      )}

      {/* Create Form */}
      {showCreate && (
        <div className="card" style={{ border: '1px solid rgba(212,175,55,0.3)' }}>
          <h3 className="text-gold font-bold mb-4">إنشاء ميزانية جديدة</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">اسم الميزانية</label>
              <input value={newBudget.name} onChange={e => setNewBudget({...newBudget, name: e.target.value})} className="w-full" placeholder="مثال: ميزانية الربع" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">الوصف</label>
              <input value={newBudget.description} onChange={e => setNewBudget({...newBudget, description: e.target.value})} className="w-full" placeholder="وصف مختصر" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">المدة (أشهر)</label>
              <select value={newBudget.duration} onChange={e => setNewBudget({...newBudget, duration: Number(e.target.value)})} className="w-full">
                <option value={2}>شهرين</option>
                <option value={3}>3 أشهر</option>
                <option value={4}>4 أشهر</option>
                <option value={6}>6 أشهر</option>
                <option value={12}>12 شهر</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">تاريخ البداية</label>
              <input type="date" value={newBudget.startDate} onChange={e => setNewBudget({...newBudget, startDate: e.target.value})} className="w-full" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleCreate} className="btn-gold px-6 py-2">إنشاء</button>
            <button onClick={() => setShowCreate(false)} className="px-6 py-2 text-gray-400 hover:text-white">إلغاء</button>
          </div>
        </div>
      )}

      {/* Budget List + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Budget List */}
        <div className="card">
          <h3 className="text-gold font-bold mb-3">الميزانيات</h3>
          <div className="space-y-2">
            {budgets.map(b => (
              <div key={b._id} onClick={() => setSelectedBudget(b)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${selectedBudget?._id === b._id ? 'bg-gold/10 border border-gold/30' : 'hover:bg-white/5'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-semibold">{b.name}</span>
                  <span className={getStatusBadge(b.status)}>{b.status}</span>
                </div>
                <p className="text-gray-500 text-xs">{b.duration} أشهر | {b.startDate} إلى {b.endDate}</p>
                <p className="text-gold text-xs mt-1">{Number(b.totalBudget).toLocaleString()} د.ك</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Detail */}
        {selectedBudget && (
          <div className="lg:col-span-2 space-y-4">
            {/* Header */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white text-lg font-bold">{selectedBudget.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedBudget.description}</p>
                </div>
                <span className={getStatusBadge(selectedBudget.status)}>{selectedBudget.status}</span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-xs">نسبة التنفيذ</span>
                  <span className="text-white text-sm font-bold">{selectedBudget.totalBudget > 0 ? ((selectedBudget.totalActual / selectedBudget.totalBudget) * 100).toFixed(1) : 0}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${Math.min(100, selectedBudget.totalBudget > 0 ? (selectedBudget.totalActual / selectedBudget.totalBudget) * 100 : 0)}%`,
                    backgroundColor: (selectedBudget.totalActual / selectedBudget.totalBudget) > 0.9 ? '#EF4444' : (selectedBudget.totalActual / selectedBudget.totalBudget) > 0.7 ? '#EAB308' : '#22C55E'
                  }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(212,175,55,0.08)' }}>
                  <p className="text-gray-400 text-xs">الميزانية</p>
                  <p className="text-gold text-lg font-bold">{Number(selectedBudget.totalBudget).toLocaleString()} د.ك</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(34,197,94,0.08)' }}>
                  <p className="text-gray-400 text-xs">الفعلي</p>
                  <p className="text-green-400 text-lg font-bold">{Number(selectedBudget.totalActual).toLocaleString()} د.ك</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(239,68,68,0.08)' }}>
                  <p className="text-gray-400 text-xs">المتبقي</p>
                  <p className="text-red-400 text-lg font-bold">{Number(selectedBudget.totalBudget - selectedBudget.totalActual).toLocaleString()} د.ك</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="card">
              <h3 className="text-gold font-bold mb-3">تفصيل حسب البند</h3>
              <div className="space-y-3">
                {selectedBudget.categories?.map((cat: any, i: number) => {
                  const pct = cat.budgeted > 0 ? (cat.actual / cat.budgeted) * 100 : 0;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm">{cat.icon} {cat.name}</span>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-gray-400">{Number(cat.actual).toLocaleString()} / {Number(cat.budgeted).toLocaleString()}</span>
                          <span style={{ color: pct > 100 ? '#EF4444' : pct > 80 ? '#EAB308' : '#22C55E' }}>{pct.toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${Math.min(100, pct)}%`,
                          backgroundColor: pct > 100 ? '#EF4444' : pct > 80 ? '#EAB308' : '#22C55E'
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Breakdown */}
            {selectedBudget.monthlyBreakdown?.length > 0 && (
              <div className="card">
                <h3 className="text-gold font-bold mb-3">التوزيع الشهري</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedBudget.monthlyBreakdown.map((m: any, i: number) => {
                    const ms = getMonthStatus(m.status);
                    return (
                      <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-semibold">{m.month}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: `${ms.color}20`, color: ms.color }}>{ms.label}</span>
                        </div>
                        <p className="text-gold text-lg font-bold">{Number(m.budgeted).toLocaleString()} د.ك</p>
                        {m.actual > 0 && <p className="text-green-400 text-xs">فعلي: {Number(m.actual).toLocaleString()} د.ك</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Branches */}
            {selectedBudget.branches?.length > 0 && (
              <div className="card">
                <h3 className="text-gold font-bold mb-3">التوزيع حسب الفرع</h3>
                <div className="grid grid-cols-3 gap-3">
                  {selectedBudget.branches.map((b: any, i: number) => (
                    <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
                      <p className="text-white text-sm font-semibold mb-1">{b.branchName}</p>
                      <p className="text-gold text-lg font-bold">{Number(b.budgeted).toLocaleString()} د.ك</p>
                      {b.actual > 0 && <p className="text-green-400 text-xs">فعلي: {Number(b.actual).toLocaleString()} د.ك</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

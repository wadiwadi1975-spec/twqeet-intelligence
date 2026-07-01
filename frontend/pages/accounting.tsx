import React, { useState } from 'react';

export default function AccountingPage() {
  const [entries] = useState([
    { id: 1, type: "revenue", account: "المبيعات", amount: 5000, date: "2026-06-25" },
    { id: 2, type: "expense", account: "المشتريات", amount: 3000, date: "2026-06-26" },
    { id: 3, type: "revenue", account: "خدمات", amount: 1000, date: "2026-06-27" },
    { id: 4, type: "expense", account: "رواتب", amount: 2000, date: "2026-06-28" },
  ]);

  const totalRevenue = entries.filter(e => e.type === 'revenue').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز الحسابات</h1>

      <table className="table-auto border-collapse border border-gold w-full text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-gold px-2 py-1 text-gold">رقم القيد</th>
            <th className="border border-gold px-2 py-1 text-gold">النوع</th>
            <th className="border border-gold px-2 py-1 text-gold">الحساب</th>
            <th className="border border-gold px-2 py-1 text-gold">المبلغ</th>
            <th className="border border-gold px-2 py-1 text-gold">التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td className="border border-gold px-2 py-1 text-gold">{e.id}</td>
              <td className={`border border-gold px-2 py-1 ${e.type === 'revenue' ? 'bg-green-400' : 'bg-red-400'} text-black`}>
                {e.type === 'revenue' ? 'إيراد' : 'مصروف'}
              </td>
              <td className="border border-gold px-2 py-1 text-gold">{e.account}</td>
              <td className="border border-gold px-2 py-1 text-gold">{e.amount}</td>
              <td className="border border-gold px-2 py-1 text-gold">{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 border border-gold rounded text-center">
          <h2 className="text-xl text-gold">إجمالي الإيرادات</h2>
          <p className="text-2xl text-green-400">{totalRevenue} دينار</p>
        </div>
        <div className="p-4 border border-gold rounded text-center">
          <h2 className="text-xl text-gold">إجمالي المصروفات</h2>
          <p className="text-2xl text-red-400">{totalExpenses} دينار</p>
        </div>
        <div className="p-4 border border-gold rounded text-center">
          <h2 className="text-xl text-gold">صافي الربح</h2>
          <p className="text-2xl text-gold">{totalRevenue - totalExpenses} دينار</p>
        </div>
      </div>
    </div>
  );
}

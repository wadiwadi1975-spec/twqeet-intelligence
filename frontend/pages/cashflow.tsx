import React, { useState } from 'react';

export default function CashFlowPage() {
  const [flows] = useState([
    { id: 1, type: "income", source: "مبيعات", amount: 5000, date: "2026-06-25" },
    { id: 2, type: "expense", source: "مشتريات", amount: 3000, date: "2026-06-26" },
    { id: 3, type: "income", source: "خدمات", amount: 1000, date: "2026-06-27" },
    { id: 4, type: "expense", source: "رواتب", amount: 2000, date: "2026-06-28" },
  ]);

  const totalIncome = flows.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
  const totalExpense = flows.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز التدفقات النقدية</h1>

      <table className="table-auto border-collapse border border-gold w-full text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-gold px-2 py-1 text-gold">رقم العملية</th>
            <th className="border border-gold px-2 py-1 text-gold">النوع</th>
            <th className="border border-gold px-2 py-1 text-gold">المصدر</th>
            <th className="border border-gold px-2 py-1 text-gold">المبلغ</th>
            <th className="border border-gold px-2 py-1 text-gold">التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {flows.map((f) => (
            <tr key={f.id}>
              <td className="border border-gold px-2 py-1 text-gold">{f.id}</td>
              <td className={`border border-gold px-2 py-1 ${f.type === 'income' ? 'bg-green-400' : 'bg-red-400'} text-black`}>
                {f.type === 'income' ? 'إيراد' : 'مصروف'}
              </td>
              <td className="border border-gold px-2 py-1 text-gold">{f.source}</td>
              <td className="border border-gold px-2 py-1 text-gold">{f.amount}</td>
              <td className="border border-gold px-2 py-1 text-gold">{f.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 border border-gold rounded text-center">
          <h2 className="text-xl text-gold">التدفقات الداخلة</h2>
          <p className="text-2xl text-green-400">{totalIncome} دينار</p>
        </div>
        <div className="p-4 border border-gold rounded text-center">
          <h2 className="text-xl text-gold">التدفقات الخارجة</h2>
          <p className="text-2xl text-red-400">{totalExpense} دينار</p>
        </div>
        <div className="p-4 border border-gold rounded text-center">
          <h2 className="text-xl text-gold">صافي التدفق النقدي</h2>
          <p className="text-2xl text-gold">{totalIncome - totalExpense} دينار</p>
        </div>
      </div>
    </div>
  );
}

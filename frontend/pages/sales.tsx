import React, { useState } from 'react';

export default function SalesPage() {
  const [sales] = useState([
    { id: 1, customer: "أحمد", product: "خاتم 21K", qty: 2, price: 500, status: "paid" },
    { id: 2, customer: "سارة", product: "سلسلة 18K", qty: 1, price: 300, status: "pending" },
    { id: 3, customer: "محمد", product: "سوار 22K", qty: 1, price: 450, status: "paid" },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "paid": return "bg-green-400";
      case "pending": return "bg-yellow-400";
      default: return "bg-red-400";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "paid": return "مدفوع";
      case "pending": return "مؤجل";
      default: return "ملغى";
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز المبيعات</h1>

      <table className="table-auto border-collapse border border-gold w-full text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-gold px-2 py-1 text-gold">رقم الفاتورة</th>
            <th className="border border-gold px-2 py-1 text-gold">العميل</th>
            <th className="border border-gold px-2 py-1 text-gold">المنتج</th>
            <th className="border border-gold px-2 py-1 text-gold">الكمية</th>
            <th className="border border-gold px-2 py-1 text-gold">السعر</th>
            <th className="border border-gold px-2 py-1 text-gold">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td className="border border-gold px-2 py-1 text-gold">{s.id}</td>
              <td className="border border-gold px-2 py-1 text-gold">{s.customer}</td>
              <td className="border border-gold px-2 py-1 text-gold">{s.product}</td>
              <td className="border border-gold px-2 py-1 text-gold">{s.qty}</td>
              <td className="border border-gold px-2 py-1 text-gold">{s.price}</td>
              <td className={`border border-gold px-2 py-1 ${getStatusColor(s.status)} text-black`}>
                {getStatusText(s.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border border-gold rounded">
        <h2 className="text-2xl mb-4 text-gold">تحليل المبيعات</h2>
        <ul className="list-disc pl-6 text-gold">
          <li>الخواتم 21K هي الأكثر مبيعًا هذا الأسبوع.</li>
          <li>العميل أحمد هو الأكثر شراءً.</li>
          <li>فرع السالمية حقق أعلى مبيعات.</li>
        </ul>
      </div>
    </div>
  );
}

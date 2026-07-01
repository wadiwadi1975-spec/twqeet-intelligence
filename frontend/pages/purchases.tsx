import React, { useState } from 'react';

export default function PurchasesPage() {
  const [orders] = useState([
    { id: 1, supplier: "شركة الذهب العالمية", product: "خواتم 21K", qty: 50, status: "pending" },
    { id: 2, supplier: "مجوهرات الشرق", product: "سلاسل 18K", qty: 30, status: "received" },
    { id: 3, supplier: "مجموعة الكويت للمجوهرات", product: "أساور 22K", qty: 40, status: "shipped" },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-400";
      case "shipped": return "bg-blue-400";
      case "received": return "bg-green-400";
      default: return "bg-red-400";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "pending": return "قيد التنفيذ";
      case "shipped": return "تم الشحن";
      case "received": return "تم الاستلام";
      default: return "ملغى";
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز المشتريات</h1>

      <table className="table-auto border-collapse border border-gold w-full text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-gold px-2 py-1 text-gold">رقم الطلب</th>
            <th className="border border-gold px-2 py-1 text-gold">المورد</th>
            <th className="border border-gold px-2 py-1 text-gold">المنتج</th>
            <th className="border border-gold px-2 py-1 text-gold">الكمية</th>
            <th className="border border-gold px-2 py-1 text-gold">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="border border-gold px-2 py-1 text-gold">{o.id}</td>
              <td className="border border-gold px-2 py-1 text-gold">{o.supplier}</td>
              <td className="border border-gold px-2 py-1 text-gold">{o.product}</td>
              <td className="border border-gold px-2 py-1 text-gold">{o.qty}</td>
              <td className={`border border-gold px-2 py-1 ${getStatusColor(o.status)} text-black`}>
                {getStatusText(o.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border border-gold rounded">
        <h2 className="text-2xl mb-4 text-gold">توصيات المشتريات</h2>
        <ul className="list-disc pl-6 text-gold">
          <li>قم بإنشاء طلب جديد لزيادة مخزون الخواتم 21K.</li>
          <li>راجع المورد "مجوهرات الشرق" لأنه تأخر في التسليم مرتين.</li>
        </ul>
      </div>
    </div>
  );
}

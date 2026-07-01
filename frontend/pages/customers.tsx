import React, { useState } from 'react';

export default function CustomersPage() {
  const [customers] = useState([
    { name: "أحمد", phone: "55512345", email: "ahmed@example.com", purchases: 12, favorite: "21K خواتم" },
    { name: "سارة", phone: "55567890", email: "sara@example.com", purchases: 8, favorite: "18K سلاسل" },
    { name: "محمد", phone: "55598765", email: "mohammed@example.com", purchases: 15, favorite: "22K أساور" },
  ]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز العملاء</h1>

      <table className="table-auto border-collapse border border-gold w-full text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-gold px-2 py-1 text-gold">الاسم</th>
            <th className="border border-gold px-2 py-1 text-gold">الهاتف</th>
            <th className="border border-gold px-2 py-1 text-gold">البريد الإلكتروني</th>
            <th className="border border-gold px-2 py-1 text-gold">عدد المشتريات</th>
            <th className="border border-gold px-2 py-1 text-gold">المفضل</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, idx) => (
            <tr key={idx}>
              <td className="border border-gold px-2 py-1 text-gold">{c.name}</td>
              <td className="border border-gold px-2 py-1 text-gold">{c.phone}</td>
              <td className="border border-gold px-2 py-1 text-gold">{c.email}</td>
              <td className="border border-gold px-2 py-1 text-gold">{c.purchases}</td>
              <td className="border border-gold px-2 py-1 text-gold">{c.favorite}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border border-gold rounded">
        <h2 className="text-2xl mb-4 text-gold">توصيات تسويقية</h2>
        <ul className="list-disc pl-6 text-gold">
          <li>أرسل عرضًا خاصًا لأحمد على خواتم 21K.</li>
          <li>اقترح على سارة مجموعة جديدة من السلاسل 18K.</li>
          <li>أرسل لمحمد عرضًا على الأساور 22K.</li>
        </ul>
      </div>
    </div>
  );
}

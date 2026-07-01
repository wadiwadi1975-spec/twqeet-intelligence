import React, { useState } from 'react';

export default function SuppliersPage() {
  const [suppliers] = useState([
    { name: "شركة الذهب العالمية", phone: "55511111", email: "gold@example.com", invoices: 12, rating: 4 },
    { name: "مجوهرات الشرق", phone: "55522222", email: "east@example.com", invoices: 8, rating: 3 },
    { name: "مجموعة الكويت للمجوهرات", phone: "55533333", email: "kuwait@example.com", invoices: 15, rating: 5 },
  ]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز الموردين</h1>

      <table className="table-auto border-collapse border border-gold w-full text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-gold px-2 py-1 text-gold">الاسم</th>
            <th className="border border-gold px-2 py-1 text-gold">الهاتف</th>
            <th className="border border-gold px-2 py-1 text-gold">البريد الإلكتروني</th>
            <th className="border border-gold px-2 py-1 text-gold">عدد الفواتير</th>
            <th className="border border-gold px-2 py-1 text-gold">التقييم</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s, idx) => (
            <tr key={idx}>
              <td className="border border-gold px-2 py-1 text-gold">{s.name}</td>
              <td className="border border-gold px-2 py-1 text-gold">{s.phone}</td>
              <td className="border border-gold px-2 py-1 text-gold">{s.email}</td>
              <td className="border border-gold px-2 py-1 text-gold">{s.invoices}</td>
              <td className="border border-gold px-2 py-1 text-gold">{"⭐".repeat(s.rating)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border border-gold rounded">
        <h2 className="text-2xl mb-4 text-gold">توصيات الموردين</h2>
        <ul className="list-disc pl-6 text-gold">
          <li>اعتمد أكثر على "مجموعة الكويت للمجوهرات" لأنها الأعلى تقييمًا.</li>
          <li>راجع أسعار "مجوهرات الشرق" لأنها أعلى من المتوسط.</li>
        </ul>
      </div>
    </div>
  );
}

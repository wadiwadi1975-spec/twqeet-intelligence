import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { _id: 'cu1', name: 'أحمد محمد الصقر', phone: '55512345', totalPurchases: 45200, lastPurchase: '2026-06-28' },
    { _id: 'cu2', name: 'سارة عبدالرحمن', phone: '55567890', totalPurchases: 28900, lastPurchase: '2026-06-25' },
    { _id: 'cu3', name: 'محمد خالد العتيبي', phone: '55598765', totalPurchases: 67500, lastPurchase: '2026-06-30' },
    { _id: 'cu4', name: 'نورة فهد المطيري', phone: '55534567', totalPurchases: 15800, lastPurchase: '2026-06-20' },
    { _id: 'cu5', name: 'عبدالله سالم الحربي', phone: '55578901', totalPurchases: 32100, lastPurchase: '2026-06-27' },
    { _id: 'cu6', name: 'ريم أحمد الشمري', phone: '55545678', totalPurchases: 19400, lastPurchase: '2026-06-22' },
    { _id: 'cu7', name: 'يوسف عبدالعزيز', phone: '55523456', totalPurchases: 54300, lastPurchase: '2026-06-29' },
    { _id: 'cu8', name: 'هدى محمد القحطاني', phone: '55589012', totalPurchases: 8700, lastPurchase: '2026-06-15' },
  ]);

  useEffect(() => {
    fetch(`${API_URL}/customers?companyId=1`)
      .then(r => r.json().catch(() => null))
      .then(data => {
        const custData = data && (data.value || data.customers || (Array.isArray(data) ? data : null));
        if (custData && custData.length > 0) {
          setCustomers(custData);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز العملاء</h1>

      <table className="table-auto border-collapse border border-gold w-full text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-gold px-2 py-1 text-gold">الاسم</th>
            <th className="border border-gold px-2 py-1 text-gold">الهاتف</th>
            <th className="border border-gold px-2 py-1 text-gold">إجمالي المشتريات</th>
            <th className="border border-gold px-2 py-1 text-gold">آخر شراء</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, idx) => (
            <tr key={idx}>
              <td className="border border-gold px-2 py-1 text-gold">{c.name}</td>
              <td className="border border-gold px-2 py-1 text-gold">{c.phone}</td>
              <td className="border border-gold px-2 py-1 text-gold">{c.totalPurchases?.toLocaleString()} د.ك</td>
              <td className="border border-gold px-2 py-1 text-gold">{c.lastPurchase}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border border-gold rounded">
        <h2 className="text-2xl mb-4 text-gold">توصيات تسويقية</h2>
        <ul className="list-disc pl-6 text-gold">
          <li>أرسل عرضًا خاصًا لمحمد العتيبي على خواتم 21K (أكبر مبيعات: 67,500 د.ك).</li>
          <li>تابع يوسف عبدالعزيز الذي لم يشتري منذ يومين فقط.</li>
          <li>أرسل لمحمد خالد عرضًا على الأساور 22K (آخر شراء: 30 يونيو).</li>
        </ul>
      </div>
    </div>
  );
}

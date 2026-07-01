import React, { useState } from 'react';

export default function AICenterPage() {
  const [recommendations] = useState([
    { text: "قم بزيادة مخزون الأساور بنسبة 15% لأنها الأسرع مبيعًا.", priority: "Critical" },
    { text: "اعرض خصومات على القلائد لتسريع حركتها.", priority: "Medium" },
    { text: "ركز على عيار 21K لأنه الأكثر طلبًا هذا الشهر.", priority: "High" },
    { text: "أعد طلب سبائك الذهب قبل نهاية الأسبوع لتجنب نفاد المخزون.", priority: "Low" },
  ]);

  const [forecasts] = useState([
    { period: "الشهر القادم", prediction: "ارتفاع مبيعات الخواتم بنسبة 10%" },
    { period: "الربع القادم", prediction: "فرع السالمية سيحقق أرباحًا أعلى بنسبة 12%" },
    { period: "نهاية السنة", prediction: "الطلب على 21K سيزداد بنسبة 20%" },
  ]);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-400";
      default: return "bg-green-400";
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز الذكاء الصناعي</h1>

      <div className="p-4 border border-gold rounded mb-6">
        <h2 className="text-2xl mb-4 text-gold">التوصيات الذكية</h2>
        <ul className="space-y-2">
          {recommendations.map((rec, idx) => (
            <li key={idx} className={`p-3 rounded ${getPriorityColor(rec.priority)} text-black`}>
              <strong>({rec.priority})</strong> {rec.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border border-gold rounded">
        <h2 className="text-2xl mb-4 text-gold">التوقعات المستقبلية</h2>
        <ul className="space-y-2">
          {forecasts.map((f, idx) => (
            <li key={idx} className="p-3 rounded bg-gray-800 text-gold">
              <strong>{f.period}:</strong> {f.prediction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

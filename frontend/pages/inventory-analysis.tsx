import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function InventoryAnalysisPage() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<{text:string,priority:string}[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      const categoryMap: Record<string, number> = {};
      const karatMap: Record<string, number> = {};

      rows.forEach((r) => {
        const category = r.category || r.type || "غير محدد";
        const karat = r.karat || r.purity || "غير محدد";
        const qty = r.quantity || 1;

        categoryMap[category] = (categoryMap[category] || 0) + qty;
        karatMap[karat] = (karatMap[karat] || 0) + qty;
      });

      const bestCategory = Object.entries(categoryMap).sort((a,b)=>b[1]-a[1])[0];
      const worstCategory = Object.entries(categoryMap).sort((a,b)=>a[1]-b[1])[0];
      const bestKarat = Object.entries(karatMap).sort((a,b)=>b[1]-a[1])[0];
      const worstKarat = Object.entries(karatMap).sort((a,b)=>a[1]-b[1])[0];

      const recs = [
        { text:`قم بزيادة مخزون ${bestCategory[0]} لأنها الأسرع مبيعًا.`, priority:"Critical" },
        { text:`اعرض ${worstCategory[0]} في عروض ترويجية أو صفقات تصفية.`, priority:"Medium" },
        { text:`ركز على عيار ${bestKarat[0]} لأنه الأكثر شعبية.`, priority:"High" },
        { text:`أعد تقييم تسويق عيار ${worstKarat[0]} لأنه الأقل مبيعًا.`, priority:"Low" },
      ];

      setAnalysis({ categoryMap, karatMap });
      setRecommendations(recs);
    };
    reader.readAsArrayBuffer(file);
  };

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
      <h1 className="text-3xl font-bold mb-6 text-gold">تحليل المخزون</h1>
      <input type="file" accept=".xlsx,.csv" onChange={handleFileUpload} className="mb-4 text-gold" />

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 border border-gold rounded">
            <h2 className="text-xl mb-2 text-gold">المغوّلات الأكثر مبيعًا</h2>
            <Bar data={{
              labels: Object.keys(analysis.categoryMap),
              datasets: [{ label: 'الكمية المباعة', data: Object.values(analysis.categoryMap), backgroundColor: '#D4AF37' }]
            }} />
          </div>
          <div className="p-4 border border-gold rounded">
            <h2 className="text-xl mb-2 text-gold">العيارات الأكثر مبيعًا</h2>
            <Pie data={{
              labels: Object.keys(analysis.karatMap),
              datasets: [{ data: Object.values(analysis.karatMap), backgroundColor: ['#D4AF37','#1A1A1A','#444','#888'] }]
            }} />
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="p-4 border border-gold rounded">
          <h2 className="text-2xl mb-4 text-gold">النصائح الذكية</h2>
          <ul className="space-y-2">
            {recommendations.map((rec, idx) => (
              <li key={idx} className={`p-3 rounded ${getPriorityColor(rec.priority)} text-black`}>
                <strong>({rec.priority})</strong> {rec.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<{message:string,priority:string}[]>([]);

  useEffect(() => {
    setAlerts([
      { message: "انخفاض المبيعات في فرع السالمية بنسبة 20%", priority: "Critical" },
      { message: "وجود مخزون راكد في قسم القلائد", priority: "Medium" },
      { message: "انخفاض أرباح فرع حولي", priority: "High" },
      { message: "أفضل أداء في فرع الأحمدي", priority: "Low" },
    ]);
  }, []);

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
      <h1 className="text-3xl font-bold mb-6 text-gold">مركز التنبيهات</h1>
      <div className="space-y-4">
        {alerts.map((alert, idx) => (
          <div key={idx} className={`p-4 rounded ${getPriorityColor(alert.priority)} text-black`}>
            <strong>{alert.priority}</strong>: {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
}

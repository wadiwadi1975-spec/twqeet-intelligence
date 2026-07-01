import React from 'react';

interface AlertProps {
  message: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  time?: string;
  category?: string;
}

export default function AlertCard({ message, priority, time, category }: AlertProps) {
  const config: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    Critical: {
      bg: 'rgba(239, 68, 68, 0.08)',
      text: '#EF4444',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    },
    High: {
      bg: 'rgba(249, 115, 22, 0.08)',
      text: '#F97316',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    },
    Medium: {
      bg: 'rgba(234, 179, 8, 0.08)',
      text: '#EAB308',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    },
    Low: {
      bg: 'rgba(34, 197, 94, 0.08)',
      text: '#22C55E',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    },
  };

  const { bg, text, icon } = config[priority] || config.Low;

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl"
      style={{ backgroundColor: bg, border: `1px solid ${text}20` }}
    >
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-sm" style={{ color: text }}>{message}</p>
        <div className="flex items-center gap-3 mt-1.5">
          {time && <span className="text-gray-500 text-[11px]">{time}</span>}
          {category && <span className="text-gray-500 text-[11px]">{category}</span>}
        </div>
      </div>
    </div>
  );
}
